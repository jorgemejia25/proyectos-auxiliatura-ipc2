"use client"

import { DatabaseIcon, FileJsonIcon, RotateCcwIcon, SendIcon } from "lucide-react"
import { useState } from "react"

import { BarChart } from "@/components/projects/proyecto3/bar-chart"
import { SAMPLE_AUTORIZACIONES, SAMPLE_RTU } from "@/components/projects/proyecto3/data"
import {
  consultarContribuyente,
  ERROR_LABELS,
  ESTADO_INICIAL,
  type Estado,
  fechaGt,
  procesarAutorizaciones,
  procesarRtu,
  quetzales,
  REPORT_ERRORS,
  reporteErrores,
  resumenIva,
  resumenRango,
} from "@/components/projects/proyecto3/logic"
import { Heading } from "@/components/projects/proyecto3/validaciones"

type Mensaje = "rtu" | "autorizaciones"
type Peticion = "errores" | "contribuyente" | "iva" | "rango"

const BLUE = "#338EF7"
const PINK = "#F31260"

/** Simulación en vivo de la API: POST /Procesar, almacenamiento y peticiones GET. */
export function ApiSimulator() {
  const [estado, setEstado] = useState<Estado>(ESTADO_INICIAL)
  const [tipo, setTipo] = useState<Mensaje>("rtu")
  const [textos, setTextos] = useState<Record<Mensaje, string>>({ rtu: SAMPLE_RTU, autorizaciones: SAMPLE_AUTORIZACIONES })
  const [fechaServidor, setFechaServidor] = useState("2026-09-21")
  const [respuesta, setRespuesta] = useState<{ ok: boolean; body: string; tipo: Mensaje } | null>(null)

  function enviar() {
    try {
      const json = JSON.parse(textos[tipo])
      if (tipo === "rtu") {
        const r = procesarRtu(estado, json)
        setEstado(r.estado)
        setRespuesta({ ok: true, body: JSON.stringify(r.respuesta, null, 2), tipo })
        setTipo("autorizaciones")
      } else {
        const r = procesarAutorizaciones(estado, json, fechaServidor)
        setEstado(r.estado)
        setRespuesta({ ok: true, body: JSON.stringify(r.respuesta, null, 2), tipo })
      }
    } catch (error) {
      setRespuesta({ ok: false, body: JSON.stringify({ error: error instanceof Error ? error.message : "JSON inválido" }, null, 2), tipo })
    }
  }

  function inicializar() {
    setEstado(ESTADO_INICIAL)
    setRespuesta({ ok: true, body: JSON.stringify({ mensaje: "Sistema inicializado" }, null, 2), tipo })
    setTipo("rtu")
  }

  const rtuEntries = Object.entries(estado.rtu)

  return (
    <section id="simulador" className="scroll-mt-28 border-y border-white/10 bg-[#09090B] py-20">
      <Heading number="04" eyebrow="Ejemplo en vivo" title="Simulador de la API" description="Paso 1: envíe el RTU. Paso 2: envíe las autorizaciones. Paso 3: haga las peticiones. Puede editar los JSON y repetir; así se comporta su API." />

      <div className="mx-auto mt-10 max-w-7xl space-y-5 px-5 sm:px-8">
        <div className="flex flex-wrap items-center justify-between gap-3 border border-white/10 bg-[#18181B] px-4 py-3">
          <label className="flex items-center gap-3 font-mono text-[11px] text-[#A1A1AA]">
            FECHA DEL SERVIDOR
            <input type="date" value={fechaServidor} onChange={(e) => e.target.value && setFechaServidor(e.target.value)} className="h-9 border border-white/15 bg-[#09090B] px-2 text-white [color-scheme:dark] outline-none focus:border-[#006FEE]" />
          </label>
          <div className="flex flex-wrap items-center gap-3 font-mono text-[11px] text-[#71717A]">
            <span>RTU: <strong className="text-white">{rtuEntries.length}</strong></span>
            <span>Facturas: <strong className="text-white">{estado.facturas.length}</strong></span>
            <button type="button" onClick={inicializar} className="inline-flex h-9 items-center gap-2 border border-white/15 px-3 font-bold text-white transition hover:border-[#F31260] hover:text-[#F31260]">
              <RotateCcwIcon className="size-3.5" /> POST /api/Inicializar
            </button>
          </div>
        </div>

        <div className="grid gap-5 xl:grid-cols-2">
          <div className="flex flex-col border border-white/10 bg-[#18181B]">
            <div className="flex border-b border-white/10 p-2">
              {(["rtu", "autorizaciones"] as const).map((t, i) => (
                <button key={t} type="button" onClick={() => setTipo(t)} className={`border px-3 py-2 font-mono text-[11px] font-bold transition ${tipo === t ? "border-[#006FEE] bg-[#006FEE] text-black" : "border-transparent text-[#A1A1AA] hover:text-white"}`}>
                  {i + 1}. {t === "rtu" ? "rtu.json" : "autorizaciones.json"}
                </button>
              ))}
              <button type="button" onClick={() => setTextos((c) => ({ ...c, [tipo]: tipo === "rtu" ? SAMPLE_RTU : SAMPLE_AUTORIZACIONES }))} className="ml-auto px-3 font-mono text-[10px] text-[#71717A] hover:text-white">Restaurar ejemplo</button>
            </div>
            <textarea
              value={textos[tipo]}
              onChange={(e) => setTextos((c) => ({ ...c, [tipo]: e.target.value }))}
              spellCheck={false}
              aria-label="Cuerpo del mensaje JSON"
              className="block min-h-80 w-full flex-1 resize-y bg-[#050505] p-4 font-mono text-[11px] leading-5 text-[#D4D4D8] outline-none"
            />
            <button type="button" onClick={enviar} className="flex h-12 w-full items-center justify-center gap-2 bg-[#006FEE] text-sm font-black text-black transition hover:bg-[#338EF7]">
              <SendIcon className="size-4" /> POST /api/Procesar
            </button>
          </div>

          <div className="flex flex-col border border-white/10 bg-[#18181B]">
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
              <span className="font-mono text-[10px] font-black tracking-[0.16em] text-[#F31260] uppercase">Respuesta</span>
              {respuesta ? <span className={`font-mono text-[10px] font-bold ${respuesta.ok ? "text-[#17C964]" : "text-[#F31260]"}`}>{respuesta.ok ? "200 OK" : "400 Bad Request"}</span> : null}
            </div>
            <pre aria-live="polite" className="max-h-96 min-h-48 flex-1 overflow-auto bg-[#050505] p-4 font-mono text-[11px] leading-5 text-[#D4D4D8]">
              {respuesta?.body ?? "// Presione POST /api/Procesar"}
            </pre>
            <div className="border-t border-white/10 p-4">
              <p className="mb-3 flex items-center gap-2 font-mono text-[10px] font-black tracking-[0.16em] text-[#A1A1AA] uppercase"><DatabaseIcon className="size-3.5" /> Almacen/rtu.json</p>
              {rtuEntries.length ? (
                <div className="grid gap-1.5 sm:grid-cols-2">
                  {rtuEntries.map(([nit, nombre]) => (
                    <div key={nit} className="flex justify-between gap-3 border border-white/10 bg-[#09090B] px-3 py-2 text-xs"><span className="font-mono text-[#338EF7]">{nit}</span><span className="truncate text-[#A1A1AA]">{nombre}</span></div>
                  ))}
                </div>
              ) : <p className="text-xs text-[#71717A]">Vacío. Envíe primero el RTU.</p>}
            </div>
          </div>
        </div>

        <FacturasTable estado={estado} />
        <Peticiones estado={estado} />
      </div>
    </section>
  )
}

function FacturasTable({ estado }: { estado: Estado }) {
  return (
    <div className="border border-white/10 bg-[#18181B]">
      <p className="flex items-center gap-2 border-b border-white/10 px-4 py-3 font-mono text-[10px] font-black tracking-[0.16em] text-[#A1A1AA] uppercase"><FileJsonIcon className="size-3.5" /> Almacen/facturas.json · aprobadas y rechazadas</p>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[860px] text-left text-xs">
          <thead className="font-mono text-[10px] text-[#71717A] uppercase">
            <tr className="border-b border-white/10">
              {["Ref.", "Fecha", "Emisor", "Receptor", "Valor", "IVA", "Total", "Resultado"].map((h) => <th key={h} className="px-4 py-3">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {estado.facturas.length === 0 ? (
              <tr><td colSpan={8} className="px-4 py-8 text-center text-[#71717A]">Sin facturas. Envíe autorizaciones.json.</td></tr>
            ) : estado.facturas.map((f, i) => (
              <tr key={i} className="border-b border-white/[0.06] align-top">
                <td className="px-4 py-2.5 font-mono text-white">{f.referencia}</td>
                <td className="px-4 py-2.5 text-[#A1A1AA]">{fechaGt(f.fecha)} {f.hora}</td>
                <td className="px-4 py-2.5 font-mono text-[#A1A1AA]">{f.emisor}</td>
                <td className="px-4 py-2.5 font-mono text-[#A1A1AA]">{f.receptor}</td>
                <td className="px-4 py-2.5 font-mono text-[#A1A1AA]">{f.valor.toFixed(2)}</td>
                <td className="px-4 py-2.5 font-mono text-[#A1A1AA]">{f.iva.toFixed(2)}</td>
                <td className="px-4 py-2.5 font-mono text-[#A1A1AA]">{f.total.toFixed(2)}</td>
                <td className="px-4 py-2.5">
                  {f.codigo ? (
                    <span className="border border-[#17C964]/40 bg-[#17C964]/10 px-2 py-1 font-mono text-[10px] font-bold text-[#17C964]">✓ {f.codigo}</span>
                  ) : (
                    <div className="flex flex-wrap gap-1">
                      {f.errores.map((e) => <span key={e} className="border border-[#F31260]/40 bg-[#F31260]/10 px-2 py-1 text-[10px] font-bold text-[#F31260]">✕ {ERROR_LABELS[e]}</span>)}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function Peticiones({ estado }: { estado: Estado }) {
  const [tab, setTab] = useState<Peticion>("errores")
  const [desde, setDesde] = useState("2025-01-15")
  const [hasta, setHasta] = useState("2025-01-16")
  const [fecha, setFecha] = useState("2025-01-16")
  const [nit, setNit] = useState("7378106")
  const [tipoC, setTipoC] = useState<"emitidas" | "recibidas">("emitidas")
  const [tipoR, setTipoR] = useState<"total" | "sinIva">("total")

  const nits = Object.keys(estado.rtu)
  const url = {
    errores: `GET /api/ReporteErrores?desde=${desde}&hasta=${hasta}`,
    contribuyente: `GET /api/ConsultaDatos?nit=${nit}&tipo=${tipoC}&desde=${desde}&hasta=${hasta}`,
    iva: `GET /api/ResumenIva?fecha=${fecha}`,
    rango: `GET /api/ResumenRango?desde=${desde}&hasta=${hasta}&tipo=${tipoR}`,
  }[tab]

  return (
    <div className="border border-white/10 bg-[#0B0B0D]">
      <div className="flex flex-wrap gap-1 border-b border-white/10 bg-[#18181B] p-2">
        {([
          ["errores", "Reporte por fecha"],
          ["contribuyente", "Consultar contribuyente"],
          ["iva", "Resumen IVA"],
          ["rango", "Resumen por rango"],
        ] as const).map(([id, label]) => (
          <button key={id} type="button" onClick={() => setTab(id)} className={`border px-3 py-2 font-mono text-[11px] font-bold transition ${tab === id ? "border-[#F31260] bg-[#F31260] text-black" : "border-transparent text-[#A1A1AA] hover:text-white"}`}>{label}</button>
        ))}
      </div>

      <div className="flex flex-wrap items-end gap-3 border-b border-white/10 p-4">
        {tab === "iva" ? <DateField label="Fecha" value={fecha} onChange={setFecha} /> : <><DateField label="Desde" value={desde} onChange={setDesde} /><DateField label="Hasta" value={hasta} onChange={setHasta} /></>}
        {tab === "contribuyente" ? (
          <>
            <Field label="NIT">
              <select value={nit} onChange={(e) => setNit(e.target.value)} className="h-9 border border-white/15 bg-[#09090B] px-2 font-mono text-xs text-white outline-none">
                {(nits.length ? nits : [nit]).map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </Field>
            <Toggle value={tipoC} onChange={setTipoC} options={[["emitidas", "Emitidas"], ["recibidas", "Recibidas"]]} />
          </>
        ) : null}
        {tab === "rango" ? <Toggle value={tipoR} onChange={setTipoR} options={[["total", "Total"], ["sinIva", "Sin IVA"]]} /> : null}
      </div>
      <p className="border-b border-white/10 px-4 py-2.5 font-mono text-[11px] break-all text-[#338EF7]">{url}</p>

      <div className="p-4 sm:p-6">
        {estado.facturas.length === 0 ? <p className="py-8 text-center text-xs text-[#71717A]">Sin datos. Complete los pasos 1 y 2.</p> : null}
        {estado.facturas.length > 0 && tab === "errores" ? <ReporteErrores estado={estado} desde={desde} hasta={hasta} /> : null}
        {estado.facturas.length > 0 && tab === "contribuyente" ? <Contribuyente estado={estado} nit={nit} tipo={tipoC} desde={desde} hasta={hasta} /> : null}
        {estado.facturas.length > 0 && tab === "iva" ? <ResumenIva estado={estado} fecha={fecha} /> : null}
        {estado.facturas.length > 0 && tab === "rango" ? <ResumenRango estado={estado} desde={desde} hasta={hasta} tipo={tipoR} /> : null}
      </div>
    </div>
  )
}

function ReporteErrores({ estado, desde, hasta }: { estado: Estado; desde: string; hasta: string }) {
  const filas = reporteErrores(estado, desde, hasta)
  if (!filas.length) return <Empty />
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {filas.map((f) => (
        <div key={f.fecha} className="border border-white/10 bg-[#18181B] p-5 font-mono text-xs">
          <p className="text-sm font-black text-white">FECHA: {fechaGt(f.fecha)}</p>
          <Row label="Cantidad total de facturas recibidas" value={f.recibidas} strong />
          <p className="mt-3 text-[10px] text-[#71717A] uppercase">Listado de errores</p>
          {REPORT_ERRORS.map((e) => <Row key={e} label={ERROR_LABELS[e]} value={f.errores[e]} warn={f.errores[e] > 0} indent />)}
          <Row label="Facturas sin errores" value={f.sinErrores} strong />
          <Row label="Emisores distintos" value={f.emisores} />
          <Row label="Receptores distintos" value={f.receptores} />
        </div>
      ))}
    </div>
  )
}

function Contribuyente({ estado, nit, tipo, desde, hasta }: { estado: Estado; nit: string; tipo: "emitidas" | "recibidas"; desde: string; hasta: string }) {
  const { filas, total } = consultarContribuyente(estado, nit, tipo, desde, hasta)
  return (
    <div>
      <p className="mb-4 text-sm text-white">{estado.rtu[nit] ?? nit} · facturas {tipo}</p>
      <SimpleTable head={["Fecha", "Facturas autorizadas", "Monto facturado"]} rows={filas.map((f) => [fechaGt(f.fecha), String(f.cantidad), quetzales(f.monto)])} foot={["Total del rango", "", quetzales(total)]} />
    </div>
  )
}

function ResumenIva({ estado, fecha }: { estado: Estado; fecha: string }) {
  const filas = resumenIva(estado, fecha)
  if (!filas.length) return <Empty />
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <SimpleTable head={["NIT", "Nombre", "IVA emitido", "IVA recibido"]} rows={filas.map((f) => [f.nit, f.nombre, quetzales(f.emitido), quetzales(f.recibido)])} />
      <BarChart
        label={`IVA emitido y recibido por NIT el ${fechaGt(fecha)}`}
        categories={filas.map((f) => f.nit)}
        series={[
          { name: "IVA emitido", color: BLUE, values: filas.map((f) => f.emitido) },
          { name: "IVA recibido", color: PINK, values: filas.map((f) => f.recibido) },
        ]}
        format={quetzales}
      />
    </div>
  )
}

function ResumenRango({ estado, desde, hasta, tipo }: { estado: Estado; desde: string; hasta: string; tipo: "total" | "sinIva" }) {
  const filas = resumenRango(estado, desde, hasta, tipo)
  if (!filas.length) return <Empty />
  const nombre = tipo === "total" ? "Valor total autorizado" : "Valor sin IVA autorizado"
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <SimpleTable head={["Fecha", nombre]} rows={filas.map((f) => [fechaGt(f.fecha), quetzales(f.valor)])} />
      <div>
        <p className="mb-3 text-xs text-[#A1A1AA]">{nombre} por fecha</p>
        <BarChart label={`${nombre} por fecha`} categories={filas.map((f) => fechaGt(f.fecha))} series={[{ name: nombre, color: BLUE, values: filas.map((f) => f.valor) }]} format={quetzales} />
      </div>
    </div>
  )
}

function SimpleTable({ head, rows, foot }: { head: string[]; rows: string[][]; foot?: string[] }) {
  return (
    <div className="overflow-x-auto border border-white/10">
      <table className="w-full text-left text-xs">
        <thead className="bg-[#18181B] font-mono text-[10px] text-[#71717A] uppercase"><tr>{head.map((h) => <th key={h} className="px-4 py-3">{h}</th>)}</tr></thead>
        <tbody>
          {rows.length === 0 ? <tr><td colSpan={head.length} className="px-4 py-6 text-center text-[#71717A]">Sin resultados</td></tr> : rows.map((r, i) => (
            <tr key={i} className="border-t border-white/[0.06]">{r.map((c, j) => <td key={j} className={`px-4 py-2.5 ${j === 0 ? "font-mono text-white" : "text-[#A1A1AA]"}`}>{c}</td>)}</tr>
          ))}
        </tbody>
        {foot ? <tfoot><tr className="border-t border-white/15 bg-[#006FEE]/10">{foot.map((c, j) => <td key={j} className="px-4 py-3 font-bold text-white">{c}</td>)}</tr></tfoot> : null}
      </table>
    </div>
  )
}

function Row({ label, value, strong, warn, indent }: { label: string; value: number; strong?: boolean; warn?: boolean; indent?: boolean }) {
  return (
    <div className={`mt-1.5 flex justify-between gap-4 ${indent ? "pl-4" : ""}`}>
      <span className={strong ? "text-white" : "text-[#A1A1AA]"}>{label}</span>
      <span className={warn ? "font-bold text-[#F31260]" : strong ? "font-bold text-white" : "text-[#A1A1AA]"}>{value}</span>
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="flex flex-col gap-1 font-mono text-[10px] text-[#71717A] uppercase">{label}{children}</label>
}

function DateField({ label, value, onChange }: { label: string; value: string; onChange: (v: string) => void }) {
  return (
    <Field label={label}>
      <input type="date" value={value} onChange={(e) => e.target.value && onChange(e.target.value)} className="h-9 border border-white/15 bg-[#09090B] px-2 text-xs text-white [color-scheme:dark] outline-none focus:border-[#006FEE]" />
    </Field>
  )
}

function Toggle<T extends string>({ value, onChange, options }: { value: T; onChange: (v: T) => void; options: [T, string][] }) {
  return (
    <div className="flex border border-white/15">
      {options.map(([v, label]) => (
        <button key={v} type="button" onClick={() => onChange(v)} className={`h-9 px-3 font-mono text-[11px] font-bold ${value === v ? "bg-white text-black" : "text-[#A1A1AA] hover:text-white"}`}>{label}</button>
      ))}
    </div>
  )
}

function Empty() {
  return <p className="py-6 text-center text-xs text-[#71717A]">Sin resultados en ese rango.</p>
}
