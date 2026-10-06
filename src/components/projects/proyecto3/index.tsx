import {
  AlertTriangleIcon,
  ArrowDownIcon,
  CheckCircle2Icon,
  DatabaseIcon,
  DownloadIcon,
  FileJsonIcon,
  GlobeIcon,
  HelpCircleIcon,
  LayoutPanelLeftIcon,
  RefreshCwIcon,
  SendIcon,
  ServerIcon,
  ShieldCheckIcon,
} from "lucide-react"

import { CodeExplorer } from "@/components/projects/proyecto3/code-explorer"
import { ENDPOINTS, PROJECT_TREE } from "@/components/projects/proyecto3/data"
import { ApiSimulator } from "@/components/projects/proyecto3/simulator"
import { Heading, Validaciones } from "@/components/projects/proyecto3/validaciones"

const NAV_ITEMS = [
  ["flujo", "Arquitectura"],
  ["mensajes", "Mensajes"],
  ["validaciones", "Validaciones"],
  ["simulador", "Simulador"],
  ["api", "API"],
  ["frontend", "Frontend"],
  ["claves", "Claves"],
  ["codigo", "Código"],
  ["ruta", "Pasos"],
  ["entrega", "Entrega"],
] as const

const RTU_REQ = `[
  {"NIT": "7378106", "nombre": "Empresa ABC, S.A."},
  {"NIT": "8338817", "nombre": "Comercial XYZ, S.A."},
  {"NIT": "5123456", "nombre": "Servicios Integrales del Norte"}
]`

const RTU_RES = `{
  "CONTRIBUYENTES_NUEVOS": 2,
  "CONTRIBUYENTES_ACTUALIZADOS": 0,
  "NITS_INVALIDOS": 1
}`

const AUT_REQ = `[
  {
    "TIEMPO": "Guatemala, 15/01/2025 15:25 hrs.",
    "REFERENCIA": "A1990",
    "NIT_EMISOR": "7378106",
    "NIT_RECEPTOR": "8338817",
    "VALOR": 100.00,
    "IVA": 12.00,
    "TOTAL": 112.00
  },
  {
    "TIEMPO": "Guatemala, 15/01/2025 15:25 hrs.",
    "REFERENCIA": "A1991",
    "NIT_EMISOR": "7378106",
    "NIT_RECEPTOR": "8338817",
    "VALOR": 200.00,
    "IVA": 24.00,
    "TOTAL": 224.00
  }
]`

const AUT_RES = `{
  "resultadoAutorizaciones": {
    "cantidadAutorizacionesAprobadas": 2,
    "cantidadAutorizacionesRechazadasPorNitEmisorInexistente": 0,
    "cantidadAutorizacionesRechazadasPorNitReceptorInexistente": 0,
    "detalleAprobaciones": [
      {"referencia": "A1990", "codigoAprobacion": 2026092100000001},
      {"referencia": "A1991", "codigoAprobacion": 2026092100000002}
    ]
  }
}`

export function Proyecto3View() {
  return (
    <div className="min-h-full bg-[#09090B] text-[#ECEDEE]">
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#09090B]/95 backdrop-blur-xl" aria-label="Contenido del proyecto">
        <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-5 py-3 sm:px-8">
          <span className="mr-4 hidden shrink-0 font-mono text-[10px] font-black tracking-[0.18em] text-[#006FEE] uppercase lg:inline">Proyecto 03 / Guía</span>
          {NAV_ITEMS.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="shrink-0 border border-transparent px-3 py-2 font-mono text-[10px] font-bold tracking-wide text-[#A1A1AA] uppercase transition hover:border-white/15 hover:bg-white/5 hover:text-white">
              {label}
            </a>
          ))}
        </div>
      </nav>

      <main>
        <header className="relative isolate overflow-hidden border-b border-white/10">
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgba(0,111,238,.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,111,238,.05)_1px,transparent_1px)] bg-[size:38px_38px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
          <div aria-hidden="true" className="absolute -top-56 right-[8%] size-[34rem] rounded-full bg-[#006FEE]/10 blur-[120px]" />
          <div aria-hidden="true" className="absolute bottom-[-16rem] left-[-8rem] size-[30rem] rounded-full bg-[#F31260]/10 blur-[120px]" />

          <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
            <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] font-bold tracking-[0.16em] uppercase">
              <span className="bg-[#006FEE] px-3 py-1.5 text-black">IPC2 · 2S 2026</span>
              <span className="border border-white/15 px-3 py-1.5 text-[#A1A1AA]">C# · .NET</span>
              <span className="border border-white/15 px-3 py-1.5 text-[#A1A1AA]">API HTTP + Razor Pages</span>
              <span className="border border-white/15 px-3 py-1.5 text-[#A1A1AA]">4 releases</span>
            </div>

            <div className="mt-9 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div>
                <p className="mb-5 font-mono text-xs font-bold tracking-[0.2em] text-[#F31260] uppercase">Proyecto 3 · Autorización de DTE · SAT</p>
                <h1 className="text-[clamp(3rem,6vw,5.6rem)] font-black leading-[0.9] tracking-[-0.055em] text-white">
                  API<br /><span className="text-[#006FEE]">+ FACTURAS</span>
                </h1>
                <p className="mt-8 max-w-2xl text-base leading-8 text-[#A1A1AA] sm:text-lg">
                  Una API en .NET recibe JSON, valida NIT, IVA y TOTAL, autoriza facturas con un código único por día y guarda todo en archivos. Una app Razor Pages la consume y muestra reportes, gráficas y PDF.
                </p>
              </div>

              <div className="border border-white/10 bg-[#18181B]/90 p-5 shadow-[14px_14px_0_#006FEE] sm:p-7">
                <p className="font-mono text-[10px] font-black tracking-[0.18em] text-[#006FEE] uppercase">Resumen técnico</p>
                <div className="mt-5 space-y-4">
                  <Metric label="Entrada" value="JSON: RTU y autorizaciones" />
                  <Metric label="Backend" value="Web API .NET (HTTP)" />
                  <Metric label="Frontend" value="Razor Pages" />
                  <Metric label="Persistencia" value="Archivos (JSON o XML)" />
                  <Metric label="Salida" value="yyyymmdd######## + reportes" />
                </div>
              </div>
            </div>

            <div className="mt-16 grid gap-4 md:grid-cols-2">
              <div className="border border-[#F31260]/40 bg-[#F31260]/8 p-5">
                <div className="flex items-start gap-3">
                  <AlertTriangleIcon className="mt-0.5 size-5 shrink-0 text-[#F31260]" />
                  <div>
                    <strong className="text-sm text-white">Fecha de entrega</strong>
                    <p className="mt-1 text-xs leading-6 text-[#A1A1AA]">Jueves 22 de octubre de 2026, 23:59. Por UEDI: un .txt con el link del repositorio. No hay prórroga.</p>
                  </div>
                </div>
              </div>
              <div className="border border-[#338EF7]/35 bg-[#338EF7]/8 p-5">
                <div className="flex items-start gap-3">
                  <ShieldCheckIcon className="mt-0.5 size-5 shrink-0 text-[#338EF7]" />
                  <div>
                    <strong className="text-sm text-white">Se califica la API, no solo la web</strong>
                    <p className="mt-1 text-xs leading-6 text-[#A1A1AA]">El auxiliar puede consumir su API desde Postman. Los mensajes de salida deben tener exactamente la estructura del enunciado.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section id="flujo" className="scroll-mt-28 py-20">
          <Heading number="01" eyebrow="Arquitectura" title="Dos programas, un protocolo" description="El frontend no procesa nada: solo envía y muestra. Toda la lógica, validación y almacenamiento vive en la API." />
          <div className="mx-auto mt-10 max-w-7xl px-5 sm:px-8">
            <div className="grid items-stretch gap-5 lg:grid-cols-[1fr_auto_1fr]">
              <ProgramCard tone="blue" label="Programa 1 · Frontend" title="Razor Pages" items={["Resetear datos", "Enviar solicitud (RTU / autorización)", "Información del estudiante", "Recibir y mostrar respuesta"]} />
              <div className="flex flex-row items-center justify-center gap-3 lg:flex-col">
                <span className="h-px w-10 bg-white/25 lg:h-10 lg:w-px" />
                <span className="border border-white/15 bg-[#18181B] px-4 py-2 font-mono text-xs font-black text-white">HTTP + JSON</span>
                <span className="h-px w-10 bg-white/25 lg:h-10 lg:w-px" />
              </div>
              <ProgramCard tone="pink" label="Servicio 2 · Backend" title="API .NET" items={["Recibir datos", "Procesar datos", "Almacenar datos", "Enviar respuesta"]} />
            </div>

            <div className="mt-8 grid gap-px overflow-hidden border border-white/10 bg-white/10 lg:grid-cols-5">
              <FlowCard icon={<FileJsonIcon />} label="01 / Archivo" title=".json" text="El usuario elige un archivo con RTU o con autorizaciones." />
              <FlowCard icon={<LayoutPanelLeftIcon />} label="02 / Frontend" title="Razor Page" text="Lee el archivo y lo envía con HttpClient." />
              <FlowCard icon={<SendIcon />} label="03 / HTTP" title="POST /Procesar" text="La API recibe el arreglo JSON." />
              <FlowCard icon={<ServerIcon />} label="04 / API" title="Validar" text="NIT, RTU, IVA, TOTAL, REFERENCIA y fecha." />
              <FlowCard icon={<DatabaseIcon />} label="05 / Datos" title="Archivos" text="Guarda RTU, facturas y correlativos. Responde JSON." />
            </div>
            <div className="mt-5 flex items-center gap-3 border-l-2 border-[#006FEE] bg-[#006FEE]/7 px-5 py-4 font-mono text-xs leading-6 text-[#A1A1AA]">
              <ArrowDownIcon className="size-4 shrink-0 text-[#006FEE]" />
              Orden obligatorio de uso: 1) cargar RTU → 2) enviar autorizaciones → 3) consultar reportes. Sin RTU, todos los NIT son inexistentes.
            </div>
          </div>
        </section>

        <section id="mensajes" className="scroll-mt-28 border-y border-white/10 bg-[#0B0B0D] py-20">
          <Heading number="02" eyebrow="Contrato de la API" title="Mensajes de entrada y salida" description="No se pueden modificar. Respete nombres, mayúsculas y anidamiento tal como aparecen." />
          <div className="mx-auto mt-10 grid max-w-7xl gap-5 px-5 sm:px-8 lg:grid-cols-2">
            <CodeCard title="Entrada · actualizar RTU" code={RTU_REQ} tag="REQUEST" accent="blue" />
            <div className="grid gap-5">
              <CodeCard title="Salida · RTU" code={RTU_RES} tag="RESPONSE" accent="pink" />
              <div className="grid gap-3 sm:grid-cols-3">
                <MiniRule title="Válido + nuevo" text="Se crea el contribuyente." />
                <MiniRule title="Válido + existe" text="Se actualiza el nombre." />
                <MiniRule title="NIT inválido" text="Sin efecto en el RTU. Se cuenta." />
              </div>
            </div>
            <CodeCard title="Entrada · solicitar autorizaciones" code={AUT_REQ} tag="REQUEST" accent="blue" />
            <CodeCard title="Salida · autorizaciones" code={AUT_RES} tag="RESPONSE" accent="pink" />
          </div>

          <div className="mx-auto mt-8 max-w-7xl px-5 sm:px-8">
            <div className="border border-white/10 bg-[#18181B] p-6 sm:p-8">
              <p className="font-mono text-[10px] font-black tracking-[0.18em] text-[#006FEE] uppercase">Número de autorización</p>
              <div className="mt-5 flex flex-wrap items-end gap-1 font-mono text-2xl font-black sm:text-4xl">
                <CodePart value="2026" label="yyyy" color="text-[#338EF7]" />
                <CodePart value="09" label="mm" color="text-[#338EF7]" />
                <CodePart value="21" label="dd" color="text-[#338EF7]" />
                <CodePart value="00000001" label="correlativo (8)" color="text-[#F31260]" />
              </div>
              <p className="mt-5 max-w-3xl text-xs leading-6 text-[#A1A1AA]">La fecha es la del día en que se solicita la autorización. El correlativo inicia en 1 cada día y nunca se repite ese día, aunque la API se reinicie: guárdelo en archivo. Se envía como número (long), no como texto.</p>
            </div>
          </div>
        </section>

        <Validaciones />

        <ApiSimulator />

        <section id="api" className="scroll-mt-28 py-20">
          <Heading number="05" eyebrow="Servicio 2" title="Endpoints sugeridos" description="El enunciado deja los métodos a su criterio. Esta propuesta sigue la Fig. 2 (/Procesar, /ConsultaDatos, /ResumenIva, /ResumenRango, /Grafica) y agrega reporte e inicializar." />
          <div className="mx-auto mt-10 max-w-7xl px-5 sm:px-8">
            <div className="overflow-x-auto border border-white/10 bg-[#0B0B0D]">
              <table className="w-full min-w-[860px] text-left text-xs">
                <thead className="font-mono text-[10px] tracking-[0.14em] text-[#71717A] uppercase"><tr className="border-b border-white/10"><th className="px-5 py-4">Método</th><th className="px-5 py-4">Ruta</th><th className="px-5 py-4">Devuelve</th><th className="px-5 py-4">Lo usa</th></tr></thead>
                <tbody>
                  {ENDPOINTS.map((e) => (
                    <tr key={e.path} className="border-b border-white/[0.06]">
                      <td className="px-5 py-3"><span className={`px-2 py-1 font-mono text-[10px] font-black text-black ${e.method === "GET" ? "bg-[#17C964]" : "bg-[#F5A524]"}`}>{e.method}</span></td>
                      <td className="px-5 py-3 font-mono text-[11px] break-all text-white">{e.path}</td>
                      <td className="px-5 py-3 text-[#A1A1AA]">{e.returns}</td>
                      <td className="px-5 py-3 text-[#A1A1AA]">{e.use}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              <RuleCard icon={<ServerIcon />} title="Proyecto" text="dotnet new webapi -n SatApi. Controladores con [ApiController]. Repositorio y servicios como Singleton." />
              <RuleCard icon={<DatabaseIcon />} title="Capa de datos" text="Archivos JSON o XML en una carpeta Almacen. Se leen al iniciar y se reescriben después de cada cambio." />
              <RuleCard icon={<GlobeIcon />} title="Pruebe con Postman" text="Body → raw → JSON. Si funciona en Postman, funciona en la calificación." />
            </div>
          </div>
        </section>

        <section id="frontend" className="scroll-mt-28 border-y border-white/10 bg-[#0B0B0D] py-20">
          <Heading number="06" eyebrow="Programa 1" title="Frontend en Razor Pages" description="Solo lo necesario para probar la API. Cada opción del menú es una página que llama a un endpoint." />
          <div className="mx-auto mt-10 max-w-7xl px-5 sm:px-8">
            <div className="overflow-hidden border border-white/15 bg-[#18181B] shadow-[14px_14px_0_rgba(243,18,96,.7)]">
              <div className="flex items-center gap-2 border-b border-white/10 bg-[#27272A] px-4 py-3">
                <span className="size-2.5 rounded-full bg-[#F31260]" /><span className="size-2.5 rounded-full bg-[#F5A524]" /><span className="size-2.5 rounded-full bg-[#17C964]" />
                <span className="ml-3 font-mono text-[10px] text-[#A1A1AA]">localhost:5001 — SatWeb</span>
              </div>
              <div className="flex flex-wrap gap-1 border-b border-white/10 bg-[#09090B] px-4 py-2 text-xs">
                {["Enviar mensaje", "Peticiones ▾", "Ayuda ▾", "Inicializar"].map((m, i) => <span key={m} className={`px-3 py-2 font-bold ${i === 0 ? "bg-[#006FEE] text-black" : "text-[#A1A1AA]"}`}>{m}</span>)}
              </div>
              <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-2">
                <MockPanel title="Entrada · autorizaciones.json"><div className="h-28 border border-white/10 bg-[#09090B] p-3 font-mono text-[10px] leading-5 text-[#71717A]">{`[ {"TIEMPO": "Guatemala, 15/01/2025…",`}<br />{`   "REFERENCIA": "A1990", …} ]`}</div></MockPanel>
                <MockPanel title="Respuesta de la API"><div className="h-28 border border-white/10 bg-[#09090B] p-3 font-mono text-[10px] leading-5 text-[#71717A]">{`{"resultadoAutorizaciones": {`}<br />{`  "cantidadAutorizacionesAprobadas": 2, …}}`}</div></MockPanel>
                <div className="flex gap-3 lg:col-span-2"><div className="h-11 flex-1 border border-white/15 bg-[#09090B] px-3 py-3 text-xs text-[#71717A]">Seleccionar archivo .json…</div><div className="grid h-11 place-items-center bg-[#006FEE] px-6 text-sm font-black text-black">Enviar</div></div>
              </div>
            </div>

            <div className="mt-8 grid gap-px overflow-hidden border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
              <MenuCard icon={<SendIcon />} title="Enviar mensaje" items={["Elegir archivo .json", "RTU o autorizaciones", "Mostrar entrada y respuesta"]} />
              <MenuCard icon={<LayoutPanelLeftIcon />} title="Peticiones" items={["Consultar contribuyente (emitidas/recibidas + rango)", "Resumen de IVA por fecha y NIT", "Resumen por rango (total o sin IVA)", "Gráficas de ambos resúmenes", "Reporte PDF de todas"]} />
              <MenuCard icon={<HelpCircleIcon />} title="Ayuda" items={["Información del estudiante", "Documentación del programa"]} />
              <MenuCard icon={<RefreshCwIcon />} title="Inicializar" items={["POST /api/Inicializar", "Deja el sistema sin datos", "Pida confirmación antes"]} />
            </div>
            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <RuleCard icon={<LayoutPanelLeftIcon />} title="Gráficas" text="Pida los datos al endpoint y dibuje con Chart.js en el .cshtml (wwwroot/js). Una gráfica para Resumen IVA y otra para Resumen por rango." />
              <RuleCard icon={<DownloadIcon />} title="Reporte en PDF" text="Genere el PDF de cada petición con una librería de C# o con la impresión del navegador. Confirme en el foro qué librería es permitida." />
            </div>
          </div>
        </section>

        <section id="claves" className="scroll-mt-28 py-20">
          <Heading number="07" eyebrow="Detalles que bajan nota" title="Puntos clave" description="Lo que dice el enunciado y los criterios que usa esta guía donde el enunciado no es explícito." />
          <div className="mx-auto mt-10 grid max-w-7xl gap-4 px-5 sm:px-8 md:grid-cols-2">
            <KeyPoint kind="enunciado" title="El código usa la fecha de la solicitud" text="En el ejemplo, TIEMPO es 15/01/2025 y el código es 20260921…: se usa la fecha del servidor al autorizar. Los reportes usan la fecha de TIEMPO." />
            <KeyPoint kind="enunciado" title="5123456 es un NIT inválido" text="El verificador correcto es 3. Con el ejemplo del RTU, la respuesta correcta es 2 nuevos y 1 inválido." />
            <KeyPoint kind="enunciado" title="Texto extra en TIEMPO no es error" text="Lugar, coma y “hrs.” se descartan. Solo importa dd/mm/yyyy hh:mi, extraído con regex." />
            <KeyPoint kind="enunciado" title="La respuesta solo cuenta inexistentes" text="IVA, TOTAL, NIT inválido y REFERENCIA duplicada también rechazan la factura, pero se ven en el reporte por fecha, no en la respuesta." />
            <KeyPoint kind="criterio" title="NIT inválido no se busca en el RTU" text="Si el NIT falla el algoritmo, se cuenta como inválido y no además como inexistente." />
            <KeyPoint kind="criterio" title="TOTAL se compara con el correcto" text="TOTAL esperado = VALOR + REDONDEAR(VALOR × 0.12, 2). Una factura puede tener varios errores a la vez." />
            <KeyPoint kind="criterio" title="REFERENCIA duplicada" text="Es duplicada si ya existe una factura aprobada con esa referencia, en este u otro mensaje anterior." />
            <KeyPoint kind="criterio" title="Guarde también las rechazadas" text="El reporte necesita total recibidas, errores por tipo y NIT distintos. Las consultas de montos solo usan aprobadas." />
          </div>
        </section>

        <CodeExplorer />

        <section id="ruta" className="scroll-mt-28 border-y border-white/10 bg-[#0B0B0D] py-20">
          <Heading number="09" eyebrow="Plan de trabajo" title="Pasos y releases" description="Mínimo 4 releases, uno por semana. Se califica el cuarto; lo que suba después no cuenta." />
          <div className="mx-auto mt-10 grid max-w-7xl gap-px border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["v1", "API + RTU", "Proyecto webapi, ValidadorNit con pruebas, POST /Procesar para RTU y persistencia en archivo."],
              ["v2", "Autorizaciones", "Regex de TIEMPO, validaciones, correlativo diario, respuesta exacta y facturas guardadas."],
              ["v3", "Frontend + consultas", "Razor Pages: enviar mensaje, consultar contribuyente, resumen IVA y por rango."],
              ["v4", "Gráficas + PDF + docs", "Gráficas, reporte PDF, Ayuda, Inicializar, ensayo y diagramas. Release final."],
            ].map(([number, title, text]) => (
              <article key={number} className="min-h-52 bg-[#0B0B0D] p-6">
                <span className="font-mono text-3xl font-black text-[#006FEE]">{number}</span>
                <h3 className="mt-8 text-lg font-extrabold text-white">{title}</h3>
                <p className="mt-3 text-xs leading-6 text-[#A1A1AA]">{text}</p>
              </article>
            ))}
          </div>
          <div className="mx-auto mt-8 grid max-w-7xl gap-5 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
            <div className="border border-white/10 bg-black/25 p-6">
              <p className="font-mono text-[10px] font-black tracking-[0.16em] text-[#006FEE] uppercase">Estructura sugerida</p>
              <pre className="mt-5 overflow-auto font-mono text-[11px] leading-6 text-[#A1A1AA]"><code>{PROJECT_TREE}</code></pre>
            </div>
            <div className="border border-white/10 bg-black/25 p-6">
              <p className="font-mono text-[10px] font-black tracking-[0.16em] text-[#F31260] uppercase">Pruebas antes de entregar</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {[
                  "7378106 y 8338817 válidos; 5123456 inválido",
                  "Un NIT con verificador K se valida",
                  "RTU repetido actualiza, no duplica",
                  "Primer código del día termina en 00000001",
                  "Reiniciar la API no reinicia el correlativo",
                  "Cambiar de día reinicia el correlativo en 1",
                  "IVA y TOTAL incorrectos se detectan",
                  "Referencia aprobada repetida se rechaza",
                  "TIEMPO con texto extra se acepta",
                  "Respuestas idénticas al enunciado en Postman",
                  "Inicializar deja RTU y facturas vacíos",
                  "Gráficas y PDF con datos del rango elegido",
                ].map((test) => <div key={test} className="flex items-start gap-2 border border-white/10 p-3 text-xs leading-5 text-[#A1A1AA]"><CheckCircle2Icon className="mt-0.5 size-4 shrink-0 text-[#006FEE]" />{test}</div>)}
              </div>
            </div>
          </div>
        </section>

        <section id="entrega" className="scroll-mt-28 py-20">
          <Heading number="10" eyebrow="Requisitos" title="Documentación y restricciones" description="Sin documentación no hay calificación." />
          <div className="mx-auto mt-10 grid max-w-7xl gap-5 px-5 sm:px-8 lg:grid-cols-2">
            <div className="border border-white/10 bg-[#18181B] p-6">
              <p className="font-mono text-[10px] font-black tracking-[0.16em] text-[#006FEE] uppercase">Documentación</p>
              <ul className="mt-5 space-y-3 text-sm text-[#A1A1AA]">
                <Li>Ensayo con el formato del curso: 4 a 7 páginas (sin contar apéndices).</Li>
                <Li>Diagrama de clases de la solución (obligatorio).</Li>
                <Li>Diagramas de actividades de los algoritmos principales (validar NIT, autorizar, reportes).</Li>
                <Li>Diagrama de despliegue: navegador → Razor Pages → API → archivos.</Li>
                <Li>Todo en una carpeta separada dentro del repositorio.</Li>
              </ul>
            </div>
            <div className="border border-white/10 bg-[#18181B] p-6">
              <p className="font-mono text-[10px] font-black tracking-[0.16em] text-[#F31260] uppercase">Restricciones</p>
              <ul className="mt-5 space-y-3 text-sm text-[#A1A1AA]">
                <Li>POO en C# obligatoria. Sin POO no hay calificación.</Li>
                <Li>Solo los IDE y frameworks indicados: .NET para la API, Razor Pages para el frontend.</Li>
                <Li>Repositorio: <code className="font-mono text-white">IPC2_Proy03_202602_#Carnet</code>, con su auxiliar como colaborador.</Li>
                <Li>Sí se permiten estructuras de C# (List, Dictionary, Queue, Stack…).</Li>
                <Li>Mensajes de entrada intactos; salida con la estructura exacta.</Li>
                <Li>Copia parcial o total: nota 0 y reporte a la Escuela.</Li>
              </ul>
            </div>
          </div>
          <div className="mx-auto mt-5 max-w-7xl px-5 sm:px-8">
            <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 text-center font-mono text-[11px] sm:grid-cols-3 lg:grid-cols-6">
              {[["A", "Eddy2109"], ["B", "EliezerGG"], ["C", "DanielVelAv"], ["D", "javiermatg"], ["N", "jorgemejia25"], ["P", "manuelimal25-dotcom"]].map(([s, u]) => (
                <div key={s} className="bg-[#0B0B0D] p-4"><span className="block text-[10px] text-[#71717A]">SECCIÓN {s}</span><strong className="mt-1 block break-all text-white">{u}</strong></div>
              ))}
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 bg-[#050505] py-16">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="font-mono text-[10px] font-black tracking-[0.18em] text-[#006FEE] uppercase">Entrega</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-white">22 OCT · 23:59 · UEDI</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#A1A1AA]">Suba un archivo de texto con el link del repositorio. Use los foros de UEDI para cualquier duda; las respuestas aplican para todos.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a href="/uploads/proyecto3/enunciado-proyecto3.pdf" target="_blank" rel="noreferrer" className="inline-flex h-11 items-center justify-center gap-2 bg-[#006FEE] px-5 text-xs font-black text-black transition hover:bg-[#338EF7]"><DownloadIcon className="size-4" /> Ver enunciado PDF</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="grid grid-cols-[7rem_1fr] gap-4 border-t border-white/10 pt-3 text-xs"><span className="font-mono text-[#71717A] uppercase">{label}</span><strong className="text-white">{value}</strong></div>
}

function FlowCard({ icon, label, title, text }: { icon: React.ReactNode; label: string; title: string; text: string }) {
  return <article className="min-h-56 bg-[#09090B] p-5 transition hover:bg-[#18181B]"><div className="text-[#006FEE] [&_svg]:size-5">{icon}</div><p className="mt-10 font-mono text-[9px] font-bold tracking-[0.14em] text-[#71717A] uppercase">{label}</p><h3 className="mt-2 text-xl font-black text-white">{title}</h3><p className="mt-3 text-xs leading-6 text-[#A1A1AA]">{text}</p></article>
}

function ProgramCard({ tone, label, title, items }: { tone: "blue" | "pink"; label: string; title: string; items: string[] }) {
  const color = tone === "blue" ? "#006FEE" : "#F31260"
  return (
    <article className="border bg-[#18181B] p-6" style={{ borderColor: `${color}66` }}>
      <p className="font-mono text-[10px] font-black tracking-[0.16em] uppercase" style={{ color }}>{label}</p>
      <h3 className="mt-2 text-2xl font-black text-white">{title}</h3>
      <div className="mt-5 grid gap-2">
        {items.map((i) => <div key={i} className="border border-white/10 bg-[#09090B] px-4 py-3 text-xs font-bold text-white">{i}</div>)}
      </div>
    </article>
  )
}

function RuleCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return <article className="border border-white/10 bg-[#18181B] p-5"><div className="text-[#006FEE] [&_svg]:size-5">{icon}</div><h3 className="mt-7 text-lg font-black text-white">{title}</h3><p className="mt-2 text-xs leading-6 text-[#A1A1AA]">{text}</p></article>
}

function MiniRule({ title, text }: { title: string; text: string }) {
  return <div className="border border-white/10 bg-[#18181B] p-4"><strong className="text-xs text-white">{title}</strong><p className="mt-1 text-[11px] leading-5 text-[#A1A1AA]">{text}</p></div>
}

function CodeCard({ title, code, tag, accent }: { title: string; code: string; tag: string; accent: "blue" | "pink" }) {
  const color = accent === "blue" ? "text-[#006FEE]" : "text-[#F31260]"
  return <div className="overflow-hidden border border-white/10 bg-[#050505]"><div className="flex items-center justify-between border-b border-white/10 bg-[#18181B] px-4 py-3"><span className="font-mono text-[10px] font-bold text-white">{title}</span><span className={`font-mono text-[9px] font-black ${color}`}>{tag}</span></div><pre className="max-h-[430px] overflow-auto p-5 font-mono text-[11px] leading-6 text-[#A1A1AA]"><code>{code}</code></pre></div>
}

function CodePart({ value, label, color }: { value: string; label: string; color: string }) {
  return <div className="text-center"><span className={`block border-b-2 border-current px-1 ${color}`}>{value}</span><span className="mt-2 block text-[10px] font-bold text-[#71717A]">{label}</span></div>
}

function MockPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="border border-white/10 bg-[#18181B] p-4"><p className="mb-3 font-mono text-[9px] font-black tracking-[0.14em] text-[#F31260] uppercase">{title}</p>{children}</div>
}

function MenuCard({ icon, title, items }: { icon: React.ReactNode; title: string; items: string[] }) {
  return (
    <article className="bg-[#0B0B0D] p-6">
      <div className="text-[#006FEE] [&_svg]:size-5">{icon}</div>
      <h3 className="mt-6 text-lg font-black text-white">{title}</h3>
      <ul className="mt-3 space-y-2">{items.map((i) => <li key={i} className="text-xs leading-5 text-[#A1A1AA]">— {i}</li>)}</ul>
    </article>
  )
}

function KeyPoint({ kind, title, text }: { kind: "enunciado" | "criterio"; title: string; text: string }) {
  const enunciado = kind === "enunciado"
  return (
    <article className="border border-white/10 bg-[#18181B] p-5">
      <span className={`font-mono text-[9px] font-black tracking-[0.14em] uppercase ${enunciado ? "text-[#006FEE]" : "text-[#F5A524]"}`}>{enunciado ? "Según el enunciado" : "Criterio sugerido · confirme en UEDI"}</span>
      <h3 className="mt-3 text-lg font-black text-white">{title}</h3>
      <p className="mt-2 text-xs leading-6 text-[#A1A1AA]">{text}</p>
    </article>
  )
}

function Li({ children }: { children: React.ReactNode }) {
  return <li className="flex gap-2 text-xs leading-6"><CheckCircle2Icon className="mt-1 size-3.5 shrink-0 text-[#71717A]" /><span>{children}</span></li>
}
