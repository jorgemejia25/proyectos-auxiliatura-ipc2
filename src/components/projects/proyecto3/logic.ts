/**
 * Simulación en TypeScript de la lógica que el estudiante implementa en la API de C#.
 * Montos en centavos (enteros) para evitar errores de punto flotante.
 */

export type ErrorFactura =
  | "NIT_EMISOR_INVALIDO"
  | "NIT_RECEPTOR_INVALIDO"
  | "NIT_EMISOR_INEXISTENTE"
  | "NIT_RECEPTOR_INEXISTENTE"
  | "IVA_MAL_CALCULADO"
  | "TOTAL_MAL_CALCULADO"
  | "REFERENCIA_DUPLICADA"
  | "TIEMPO_INVALIDO"

export const ERROR_LABELS: Record<ErrorFactura, string> = {
  NIT_EMISOR_INVALIDO: "NIT emisor inválido",
  NIT_RECEPTOR_INVALIDO: "NIT receptor inválido",
  NIT_EMISOR_INEXISTENTE: "NIT emisor inexistente",
  NIT_RECEPTOR_INEXISTENTE: "NIT receptor inexistente",
  IVA_MAL_CALCULADO: "IVA mal calculado",
  TOTAL_MAL_CALCULADO: "TOTAL mal calculado",
  REFERENCIA_DUPLICADA: "REFERENCIA duplicada",
  TIEMPO_INVALIDO: "TIEMPO sin fecha válida",
}

/** Errores que exige el reporte, en el orden del enunciado. */
export const REPORT_ERRORS: ErrorFactura[] = [
  "NIT_EMISOR_INVALIDO",
  "NIT_RECEPTOR_INVALIDO",
  "NIT_EMISOR_INEXISTENTE",
  "NIT_RECEPTOR_INEXISTENTE",
  "IVA_MAL_CALCULADO",
  "TOTAL_MAL_CALCULADO",
  "REFERENCIA_DUPLICADA",
]

export type Factura = {
  referencia: string
  /** Fecha de la factura (de TIEMPO) en formato yyyy-mm-dd; vacío si no se pudo extraer. */
  fecha: string
  hora: string
  emisor: string
  receptor: string
  valor: number
  iva: number
  total: number
  errores: ErrorFactura[]
  codigo: string | null
}

export type Estado = {
  rtu: Record<string, string>
  facturas: Factura[]
  /** Último correlativo usado por día del servidor (yyyymmdd → n). */
  correlativos: Record<string, number>
}

export const ESTADO_INICIAL: Estado = { rtu: {}, facturas: [], correlativos: {} }

/* ───────────── NIT ───────────── */

export type PasoNit = { digito: number; posicion: number; producto: number }

export type ResultadoNit = {
  normalizado: string
  formatoValido: boolean
  cuerpo: string
  verificadorRecibido: string
  pasos: PasoNit[]
  suma: number
  modulo: number
  resta: number
  resultado: number
  verificadorEsperado: string
  valido: boolean
}

const NIT_REGEX = /^(\d{1,20})([0-9K])$/

export function normalizarNit(nit: unknown) {
  return String(nit ?? "").trim().replace(/-/g, "").toUpperCase()
}

export function analizarNit(nit: unknown): ResultadoNit {
  const normalizado = normalizarNit(nit)
  const match = NIT_REGEX.exec(normalizado)
  const cuerpo = match?.[1] ?? ""
  const pasos: PasoNit[] = []
  let suma = 0
  for (let i = cuerpo.length - 1, posicion = 2; i >= 0; i--, posicion++) {
    const digito = Number(cuerpo[i])
    pasos.push({ digito, posicion, producto: digito * posicion })
    suma += digito * posicion
  }
  const modulo = suma % 11
  const resta = 11 - modulo
  const resultado = resta % 11
  const verificadorEsperado = match ? (resultado === 10 ? "K" : String(resultado)) : ""
  return {
    normalizado,
    formatoValido: Boolean(match),
    cuerpo,
    verificadorRecibido: match?.[2] ?? "",
    pasos: pasos.reverse(),
    suma,
    modulo,
    resta,
    resultado,
    verificadorEsperado,
    valido: Boolean(match) && match![2] === verificadorEsperado,
  }
}

export const esNitValido = (nit: unknown) => analizarNit(nit).valido

/* ───────────── TIEMPO (regex) ───────────── */

export const TIEMPO_REGEX = /(\d{1,2})\/(\d{1,2})\/(\d{4})\s+(\d{1,2}):(\d{2})/

export type Tiempo = { fecha: string; hora: string } | null

export function extraerTiempo(texto: unknown): Tiempo {
  const m = TIEMPO_REGEX.exec(String(texto ?? ""))
  if (!m) return null
  const [dia, mes, anio, hora, minuto] = m.slice(1).map(Number)
  if (hora > 23 || minuto > 59 || mes < 1 || mes > 12 || dia < 1) return null
  const diasMes = new Date(Date.UTC(anio, mes, 0)).getUTCDate()
  if (dia > diasMes) return null
  return {
    fecha: `${anio}-${pad(mes, 2)}-${pad(dia, 2)}`,
    hora: `${pad(hora, 2)}:${pad(minuto, 2)}`,
  }
}

/* ───────────── Montos ───────────── */

const aCentavos = (n: number) => Math.round(n * 100)
/** REDONDEAR(VALOR * 0.12, 2). */
export const ivaEsperado = (valor: number) => Math.round((aCentavos(valor) * 12) / 100) / 100
export const totalEsperado = (valor: number) => (aCentavos(valor) + aCentavos(ivaEsperado(valor))) / 100

/* ───────────── Procesamiento ───────────── */

export type RespuestaRtu = {
  CONTRIBUYENTES_NUEVOS: number
  CONTRIBUYENTES_ACTUALIZADOS: number
  NITS_INVALIDOS: number
}

export function procesarRtu(estado: Estado, entrada: unknown): { estado: Estado; respuesta: RespuestaRtu } {
  if (!Array.isArray(entrada)) throw new Error("El mensaje RTU debe ser un arreglo JSON.")
  const rtu = { ...estado.rtu }
  const respuesta: RespuestaRtu = { CONTRIBUYENTES_NUEVOS: 0, CONTRIBUYENTES_ACTUALIZADOS: 0, NITS_INVALIDOS: 0 }
  for (const item of entrada) {
    const nit = normalizarNit(item?.NIT)
    if (!esNitValido(nit)) {
      respuesta.NITS_INVALIDOS++
      continue
    }
    if (nit in rtu) respuesta.CONTRIBUYENTES_ACTUALIZADOS++
    else respuesta.CONTRIBUYENTES_NUEVOS++
    rtu[nit] = String(item?.nombre ?? "").trim()
  }
  return { estado: { ...estado, rtu }, respuesta }
}

export type RespuestaAutorizaciones = {
  resultadoAutorizaciones: {
    cantidadAutorizacionesAprobadas: number
    cantidadAutorizacionesRechazadasPorNitEmisorInexistente: number
    cantidadAutorizacionesRechazadasPorNitReceptorInexistente: number
    detalleAprobaciones: { referencia: string; codigoAprobacion: number }[]
  }
}

/**
 * Valida cada solicitud, asigna el código yyyymmdd######## a las aprobadas
 * usando la fecha del servidor y guarda todas (aprobadas y rechazadas) para los reportes.
 */
export function procesarAutorizaciones(
  estado: Estado,
  entrada: unknown,
  fechaServidor: string
): { estado: Estado; respuesta: RespuestaAutorizaciones; nuevas: Factura[] } {
  if (!Array.isArray(entrada)) throw new Error("El mensaje de autorizaciones debe ser un arreglo JSON.")
  const correlativos = { ...estado.correlativos }
  const aprobadas = new Set(estado.facturas.filter((f) => f.codigo).map((f) => f.referencia))
  const prefijo = fechaServidor.replaceAll("-", "")
  const nuevas: Factura[] = []
  const r: RespuestaAutorizaciones["resultadoAutorizaciones"] = {
    cantidadAutorizacionesAprobadas: 0,
    cantidadAutorizacionesRechazadasPorNitEmisorInexistente: 0,
    cantidadAutorizacionesRechazadasPorNitReceptorInexistente: 0,
    detalleAprobaciones: [],
  }

  for (const s of entrada) {
    const tiempo = extraerTiempo(s?.TIEMPO)
    const emisor = normalizarNit(s?.NIT_EMISOR)
    const receptor = normalizarNit(s?.NIT_RECEPTOR)
    const referencia = String(s?.REFERENCIA ?? "").trim()
    const valor = Number(s?.VALOR)
    const iva = Number(s?.IVA)
    const total = Number(s?.TOTAL)
    const errores: ErrorFactura[] = []

    if (!tiempo) errores.push("TIEMPO_INVALIDO")
    if (!esNitValido(emisor)) errores.push("NIT_EMISOR_INVALIDO")
    else if (!(emisor in estado.rtu)) errores.push("NIT_EMISOR_INEXISTENTE")
    if (!esNitValido(receptor)) errores.push("NIT_RECEPTOR_INVALIDO")
    else if (!(receptor in estado.rtu)) errores.push("NIT_RECEPTOR_INEXISTENTE")
    if (aCentavos(iva) !== aCentavos(ivaEsperado(valor))) errores.push("IVA_MAL_CALCULADO")
    if (aCentavos(total) !== aCentavos(totalEsperado(valor))) errores.push("TOTAL_MAL_CALCULADO")
    if (aprobadas.has(referencia)) errores.push("REFERENCIA_DUPLICADA")

    let codigo: string | null = null
    if (errores.length === 0) {
      const n = (correlativos[prefijo] ?? 0) + 1
      correlativos[prefijo] = n
      codigo = `${prefijo}${pad(n, 8)}`
      aprobadas.add(referencia)
      r.cantidadAutorizacionesAprobadas++
      r.detalleAprobaciones.push({ referencia, codigoAprobacion: Number(codigo) })
    }
    if (errores.includes("NIT_EMISOR_INEXISTENTE")) r.cantidadAutorizacionesRechazadasPorNitEmisorInexistente++
    if (errores.includes("NIT_RECEPTOR_INEXISTENTE")) r.cantidadAutorizacionesRechazadasPorNitReceptorInexistente++

    nuevas.push({
      referencia,
      fecha: tiempo?.fecha ?? "",
      hora: tiempo?.hora ?? "",
      emisor,
      receptor,
      valor,
      iva,
      total,
      errores,
      codigo,
    })
  }

  return {
    estado: { ...estado, correlativos, facturas: [...estado.facturas, ...nuevas] },
    respuesta: { resultadoAutorizaciones: r },
    nuevas,
  }
}

/* ───────────── Consultas ───────────── */

const enRango = (fecha: string, desde: string, hasta: string) => fecha >= desde && fecha <= hasta

export type FilaErrores = {
  fecha: string
  recibidas: number
  errores: Record<ErrorFactura, number>
  sinErrores: number
  emisores: number
  receptores: number
}

export function reporteErrores(estado: Estado, desde: string, hasta: string): FilaErrores[] {
  return agruparPorFecha(estado.facturas.filter((f) => f.fecha && enRango(f.fecha, desde, hasta))).map(
    ([fecha, lista]) => {
      const errores = Object.fromEntries(REPORT_ERRORS.map((e) => [e, 0])) as Record<ErrorFactura, number>
      for (const f of lista) for (const e of f.errores) if (e in errores) errores[e]++
      return {
        fecha,
        recibidas: lista.length,
        errores,
        sinErrores: lista.filter((f) => f.errores.length === 0).length,
        emisores: new Set(lista.map((f) => f.emisor)).size,
        receptores: new Set(lista.map((f) => f.receptor)).size,
      }
    }
  )
}

export type FilaContribuyente = { fecha: string; cantidad: number; monto: number }

export function consultarContribuyente(
  estado: Estado,
  nit: string,
  tipo: "emitidas" | "recibidas",
  desde: string,
  hasta: string
) {
  const n = normalizarNit(nit)
  const lista = aprobadasEn(estado, desde, hasta).filter((f) => (tipo === "emitidas" ? f.emisor : f.receptor) === n)
  const filas: FilaContribuyente[] = agruparPorFecha(lista).map(([fecha, fs]) => ({
    fecha,
    cantidad: fs.length,
    monto: sumar(fs.map((f) => f.total)),
  }))
  return { filas, total: sumar(filas.map((f) => f.monto)) }
}

export type FilaIva = { nit: string; nombre: string; emitido: number; recibido: number }

export function resumenIva(estado: Estado, fecha: string): FilaIva[] {
  const mapa = new Map<string, FilaIva>()
  const fila = (nit: string) => {
    if (!mapa.has(nit)) mapa.set(nit, { nit, nombre: estado.rtu[nit] ?? "", emitido: 0, recibido: 0 })
    return mapa.get(nit)!
  }
  for (const f of aprobadasEn(estado, fecha, fecha)) {
    fila(f.emisor).emitido = sumar([fila(f.emisor).emitido, f.iva])
    fila(f.receptor).recibido = sumar([fila(f.receptor).recibido, f.iva])
  }
  return [...mapa.values()].sort((a, b) => a.nit.localeCompare(b.nit))
}

export function resumenRango(estado: Estado, desde: string, hasta: string, tipo: "total" | "sinIva") {
  return agruparPorFecha(aprobadasEn(estado, desde, hasta)).map(([fecha, fs]) => ({
    fecha,
    valor: sumar(fs.map((f) => (tipo === "total" ? f.total : f.valor))),
  }))
}

/* ───────────── Utilidades ───────────── */

function aprobadasEn(estado: Estado, desde: string, hasta: string) {
  return estado.facturas.filter((f) => f.codigo && enRango(f.fecha, desde, hasta))
}

function agruparPorFecha(lista: Factura[]): [string, Factura[]][] {
  const mapa = new Map<string, Factura[]>()
  for (const f of lista) mapa.set(f.fecha, [...(mapa.get(f.fecha) ?? []), f])
  return [...mapa.entries()].sort(([a], [b]) => a.localeCompare(b))
}

const sumar = (valores: number[]) => valores.reduce((acc, v) => acc + aCentavos(v), 0) / 100

function pad(n: number, size: number) {
  return String(n).padStart(size, "0")
}

/** yyyy-mm-dd → dd/mm/yyyy */
export function fechaGt(iso: string) {
  const [y, m, d] = iso.split("-")
  return iso ? `${d}/${m}/${y}` : "—"
}

export function quetzales(n: number) {
  return `Q ${n.toLocaleString("es-GT", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`
}
