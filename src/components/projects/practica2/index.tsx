import {
  AlertTriangleIcon,
  ArrowDownIcon,
  BinaryIcon,
  BracesIcon,
  CheckCircle2Icon,
  CircleDotIcon,
  Clock3Icon,
  DownloadIcon,
  FileJsonIcon,
  GitBranchIcon,
  ListEndIcon,
  MonitorPlayIcon,
  NetworkIcon,
  SearchIcon,
} from "lucide-react"

import { CodeExplorer } from "@/components/projects/practica2/code-explorer"
import {
  GRADE_ROWS,
  PROJECT_TREE,
  QUEUE_DOT,
  SAMPLE_JSON,
  TREE_DOT,
} from "@/components/projects/practica2/data"
import { MusicPlayerSimulator } from "@/components/projects/practica2/simulator"

const NAV_ITEMS = [
  ["flujo", "Flujo"],
  ["json", "JSON"],
  ["estructuras", "TDA"],
  ["simulador", "Simulador"],
  ["graphviz", "Graphviz"],
  ["interfaz", "Interfaz"],
  ["codigo", "Código"],
  ["ruta", "Pasos"],
  ["rubrica", "Calificación"],
] as const

export function Practica2View() {
  return (
    <div className="min-h-full bg-[#09090B] text-[#ECEDEE] [--p2-accent:#006FEE] [--p2-amber:#F31260]">
      <nav className="sticky top-0 z-50 border-b border-white/10 bg-[#09090B]/95 backdrop-blur-xl" aria-label="Contenido de la práctica">
        <div className="mx-auto flex max-w-7xl items-center gap-1 overflow-x-auto px-5 py-3 sm:px-8">
          <span className="mr-4 hidden shrink-0 font-mono text-[10px] font-black tracking-[0.18em] text-[#006FEE] uppercase lg:inline">Práctica 02 / Guía</span>
          {NAV_ITEMS.map(([id, label]) => (
            <a key={id} href={`#${id}`} className="shrink-0 border border-transparent px-3 py-2 font-mono text-[10px] font-bold tracking-wide text-[#A1A1AA] uppercase transition hover:border-white/15 hover:bg-white/5 hover:text-white">
              {label}
            </a>
          ))}
        </div>
      </nav>

      <main>
        <header className="relative isolate overflow-hidden border-b border-white/10">
          <div aria-hidden="true" className="absolute inset-0 bg-[linear-gradient(rgba(183,243,74,.045)_1px,transparent_1px),linear-gradient(90deg,rgba(183,243,74,.045)_1px,transparent_1px)] bg-[size:38px_38px] [mask-image:linear-gradient(to_bottom,black,transparent_90%)]" />
          <div aria-hidden="true" className="absolute -top-56 right-[8%] size-[34rem] rounded-full bg-[#006FEE]/10 blur-[120px]" />
          <div aria-hidden="true" className="absolute bottom-[-16rem] left-[-8rem] size-[30rem] rounded-full bg-[#F31260]/10 blur-[120px]" />

          <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24 lg:py-28">
            <div className="flex flex-wrap items-center gap-2 font-mono text-[10px] font-bold tracking-[0.16em] uppercase">
              <span className="bg-[#006FEE] px-3 py-1.5 text-black">IPC2 · 2S 2026</span>
              <span className="border border-white/15 px-3 py-1.5 text-[#A1A1AA]">100 puntos</span>
              <span className="border border-white/15 px-3 py-1.5 text-[#A1A1AA]">10 horas aproximadas</span>
            </div>

            <div className="mt-9 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
              <div>
                <p className="mb-5 font-mono text-xs font-bold tracking-[0.2em] text-[#F31260] uppercase">Práctica 2 · Reproductor de música</p>
                <h1 className="text-[clamp(3rem,6vw,5.6rem)] font-black leading-[0.9] tracking-[-0.055em] text-white">
                  COLA<br /><span className="text-[#006FEE]">+ ÁRBOL</span>
                </h1>
                <p className="mt-8 max-w-2xl text-base leading-8 text-[#A1A1AA] sm:text-lg">
                  Una aplicación Windows Forms que carga canciones desde JSON, reproduce en orden FIFO, busca por título en un árbol binario y actualiza dos reportes Graphviz.
                </p>
              </div>

              <div className="border border-white/10 bg-[#18181B]/90 p-5 shadow-[14px_14px_0_#006FEE] sm:p-7">
                <p className="font-mono text-[10px] font-black tracking-[0.18em] text-[#006FEE] uppercase">Resumen técnico</p>
                <div className="mt-5 space-y-4">
                  <Metric label="Entrada" value="canciones.json" />
                  <Metric label="Orden de cola" value="Primero en entrar, primero en salir" />
                  <Metric label="Clave del árbol" value="Título de la canción" />
                  <Metric label="Salida visual" value="cola.png + arbol.png" />
                </div>
              </div>
            </div>

            <div className="mt-16 grid gap-4 md:grid-cols-2">
              <div className="border border-[#F31260]/40 bg-[#F31260]/8 p-5">
                <div className="flex items-start gap-3">
                  <AlertTriangleIcon className="mt-0.5 size-5 shrink-0 text-[#F31260]" />
                  <div>
                    <strong className="text-sm text-white">Fecha de entrega</strong>
                    <p className="mt-1 text-xs leading-6 text-[#A1A1AA]">Jueves 17 de septiembre de 2026, 23:59. Entrega por UEDI.</p>
                  </div>
                </div>
              </div>
              <div className="border border-[#338EF7]/35 bg-[#338EF7]/8 p-5">
                <div className="flex items-start gap-3">
                  <FileJsonIcon className="mt-0.5 size-5 shrink-0 text-[#338EF7]" />
                  <div>
                    <strong className="text-sm text-white">Duración de las canciones</strong>
                    <p className="mt-1 text-xs leading-6 text-[#A1A1AA]">Incluya duración en JSON como pide la hoja. Si falta, use el promedio del género: Pop 3, Rock 4, Jazz 5 y Clásica 8 minutos.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <section id="flujo" className="scroll-mt-28 py-20">
          <SectionHeading number="01" eyebrow="Arquitectura" title="Flujo de datos" description="Cada canción se inserta en la cola y en el árbol. La interfaz consulta y actualiza esas estructuras." />
          <div className="mx-auto mt-10 max-w-7xl px-5 sm:px-8">
            <div className="grid gap-px overflow-hidden border border-white/10 bg-white/10 lg:grid-cols-5">
              <FlowCard icon={<FileJsonIcon />} label="01 / Entrada" title="JSON" text="Lee título, artista, género y duración." />
              <FlowCard icon={<CircleDotIcon />} label="02 / Modelo" title="Canción" text="Normaliza y valida los datos una sola vez." />
              <FlowCard icon={<ListEndIcon />} label="03 / Reproducción" title="Cola FIFO" text="Controla qué canción sale primero." />
              <FlowCard icon={<BinaryIcon />} label="04 / Biblioteca" title="ABB" text="Busca por título con comparaciones alfabéticas." />
              <FlowCard icon={<MonitorPlayIcon />} label="05 / Salida" title="Forms + DOT" text="Muestra acciones y refresca reportes." />
            </div>
            <div className="mt-5 flex items-center gap-3 border-l-2 border-[#006FEE] bg-[#006FEE]/7 px-5 py-4 font-mono text-xs leading-6 text-[#A1A1AA]">
              <ArrowDownIcon className="size-4 shrink-0 text-[#006FEE]" />
              Al iniciar: leer → validar → crear Cancion → encolar → insertar en ABB → generar Graphviz → refrescar interfaz.
            </div>
          </div>
        </section>

        <section id="json" className="scroll-mt-28 border-y border-white/10 bg-[#0B0B0D] py-20">
          <SectionHeading number="02" eyebrow="Archivo de entrada" title="Diseñe el JSON antes de programar" description="La carga inicial vale 10 puntos. Use nombres estables, tipos previsibles y pruebe también un archivo vacío o inválido." />
          <div className="mx-auto mt-10 grid max-w-7xl gap-5 px-5 sm:px-8 lg:grid-cols-[1.15fr_0.85fr]">
            <CodeCard title="Datos/canciones.json" code={SAMPLE_JSON} accent="lime" />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <RuleCard icon={<BracesIcon />} title="Campos" text="titulo, artista y genero son texto; duracion es un entero en minutos." />
              <RuleCard icon={<CheckCircle2Icon />} title="Validación" text="Rechace títulos vacíos, duraciones menores que 1 y géneros fuera de la tabla." />
              <div className="border border-white/10 bg-[#18181B] p-5">
                <p className="font-mono text-[10px] font-black tracking-[0.16em] text-[#F31260] uppercase">Duración por género</p>
                <div className="mt-4 grid grid-cols-2 gap-2">
                  {[['Pop','3 min'],['Rock','4 min'],['Jazz','5 min'],['Clásica','8 min']].map(([genre, duration]) => (
                    <div key={genre} className="flex items-center justify-between border border-white/10 px-3 py-2 text-xs"><span>{genre}</span><strong className="text-[#F31260]">{duration}</strong></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="estructuras" className="scroll-mt-28 py-20">
          <SectionHeading number="03—04" eyebrow="TDA propios" title="Cola y árbol binario" description="La hoja prohíbe usar estructuras nativas de C# para resolver la cola y el árbol. Implemente nodos y referencias propios." />
          <div className="mx-auto mt-10 grid max-w-7xl gap-5 px-5 sm:px-8 lg:grid-cols-2">
            <article className="border border-[#006FEE]/35 bg-[#18181B] p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div className="grid size-12 place-items-center bg-[#006FEE] text-black"><ListEndIcon className="size-6" /></div>
                <span className="font-mono text-xs font-black text-[#006FEE]">10 + 25 pts relacionados</span>
              </div>
              <h3 className="mt-8 text-3xl font-black tracking-tight text-white">Cola de reproducción</h3>
              <p className="mt-3 text-sm leading-7 text-[#A1A1AA]">Mantenga referencias al frente y al final. Encolar agrega al final; reproducir desencola desde el frente.</p>
              <div className="mt-7 flex items-center gap-2 overflow-x-auto pb-2">
                <span className="shrink-0 font-mono text-[10px] font-bold text-[#006FEE]">FRENTE →</span>
                {["Here Comes The Sun", "Whole Lotta Love", "Comfortably Numb"].map((title, index) => (
                  <div key={title} className="flex shrink-0 items-center gap-2">
                    <div className="border border-[#006FEE]/50 bg-[#18181B] px-4 py-3 text-xs font-bold text-white">{title}</div>
                    {index < 2 ? <span className="text-[#71717A]">→</span> : null}
                  </div>
                ))}
              </div>
              <div className="mt-6 grid grid-cols-3 gap-px bg-white/10 text-center font-mono text-[10px]">
                <Complexity action="Encolar" value="O(1)" />
                <Complexity action="Desencolar" value="O(1)" />
                <Complexity action="Tiempo total" value="O(n)" />
              </div>
            </article>

            <article className="border border-[#F31260]/35 bg-[#18181B] p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <div className="grid size-12 place-items-center bg-[#F31260] text-black"><BinaryIcon className="size-6" /></div>
                <span className="font-mono text-xs font-black text-[#F31260]">10 + 15 pts relacionados</span>
              </div>
              <h3 className="mt-8 text-3xl font-black tracking-tight text-white">Árbol binario de búsqueda</h3>
              <p className="mt-3 text-sm leading-7 text-[#A1A1AA]">Compare títulos sin distinguir mayúsculas. Menores van a la izquierda, mayores a la derecha y los repetidos requieren una política explícita.</p>
              <div className="mt-7 grid grid-cols-[1fr_auto_1fr] items-center gap-3 text-center">
                <div className="border border-white/10 p-3"><span className="font-mono text-[9px] text-[#71717A]">MENOR</span><strong className="mt-1 block text-xs text-white">izquierda</strong></div>
                <GitBranchIcon className="size-6 rotate-90 text-[#F31260]" />
                <div className="border border-white/10 p-3"><span className="font-mono text-[9px] text-[#71717A]">MAYOR</span><strong className="mt-1 block text-xs text-white">derecha</strong></div>
              </div>
              <div className="mt-6 grid grid-cols-2 gap-px bg-white/10 text-center font-mono text-[10px]">
                <Complexity action="Promedio" value="O(log n)" />
                <Complexity action="Peor caso" value="O(n)" />
              </div>
            </article>
          </div>
        </section>

        <MusicPlayerSimulator />

        <section id="graphviz" className="scroll-mt-28 py-20">
          <SectionHeading number="06" eyebrow="Visualización" title="Graphviz refleja el estado real" description="Genere un DOT para la cola y otro para el árbol. Vuelva a renderizar después de cargar, encolar o reproducir." />
          <div className="mx-auto mt-10 grid max-w-7xl gap-5 px-5 sm:px-8 lg:grid-cols-2">
            <div>
              <CodeCard title="Reportes/cola.dot" code={QUEUE_DOT} accent="lime" />
              <GraphvizPreview kind="queue" />
            </div>
            <div>
              <CodeCard title="Reportes/arbol.dot" code={TREE_DOT} accent="amber" />
              <GraphvizPreview kind="tree" />
            </div>
          </div>
          <div className="mx-auto mt-5 max-w-7xl px-5 sm:px-8">
            <div className="border border-white/10 bg-[#18181B] p-5 font-mono text-xs text-[#A1A1AA]">
              <span className="text-[#006FEE]">$</span> dot -Tpng Reportes/cola.dot -o Reportes/cola.png
              <br /><span className="text-[#F31260]">$</span> dot -Tpng Reportes/arbol.dot -o Reportes/arbol.png
            </div>
          </div>
        </section>

        <section id="interfaz" className="scroll-mt-28 border-y border-white/10 bg-[#0B0B0D] py-20">
          <SectionHeading number="07" eyebrow="Windows Forms" title="Vista principal" description="La cola, el árbol y el tiempo total deben estar visibles en la ventana principal." />
          <div className="mx-auto mt-10 max-w-7xl px-5 sm:px-8">
            <div className="overflow-hidden border border-white/15 bg-[#18181B] shadow-[14px_14px_0_rgba(245,158,11,.8)]">
              <div className="flex items-center gap-2 border-b border-white/10 bg-[#27272A] px-4 py-3">
                <span className="size-2.5 rounded-full bg-[#17C964]" /><span className="size-2.5 rounded-full bg-[#F31260]" /><span className="size-2.5 rounded-full bg-[#17C964]" />
                <span className="ml-3 font-mono text-[10px] text-[#A1A1AA]">Reproductor de Música — MainForm</span>
              </div>
              <div className="grid gap-4 p-4 sm:p-6 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="space-y-4">
                  <MockPanel title="Biblioteca / Buscar">
                    <div className="flex gap-2"><div className="h-9 flex-1 border border-white/15 bg-[#09090B] px-3 py-2 text-xs text-[#71717A]">Título exacto...</div><div className="grid size-9 place-items-center bg-[#F31260] text-black"><SearchIcon className="size-4" /></div></div>
                    <div className="mt-3 border border-white/10 bg-[#09090B] p-3 text-xs text-[#A1A1AA]">Resultado de búsqueda</div>
                  </MockPanel>
                  <MockPanel title="Reproduciendo ahora">
                    <strong className="text-lg text-white">Here Comes The Sun</strong><p className="mt-1 text-xs text-[#A1A1AA]">The Beatles · Rock · 3 min</p>
                  </MockPanel>
                  <div className="grid grid-cols-2 gap-3"><MockStat label="En cola" value="3" /><MockStat label="Tiempo" value="16 min" /></div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <MockPanel title="Reporte de cola"><GraphvizPreview kind="queue" compact /></MockPanel>
                  <MockPanel title="Reporte del árbol"><GraphvizPreview kind="tree" compact /></MockPanel>
                  <button type="button" className="h-11 bg-[#006FEE] text-sm font-black text-black">Agregar a la cola</button>
                  <button type="button" className="h-11 bg-[#F31260] text-sm font-black text-black">Reproducir siguiente</button>
                </div>
              </div>
            </div>

            <div className="mt-8 grid gap-4 md:grid-cols-3">
              <RuleCard icon={<MonitorPlayIcon />} title="Controles mínimos" text="Carga inicial, selector o formulario, agregar, reproducir, buscar y mensajes de estado." />
              <RuleCard icon={<NetworkIcon />} title="Reportes visibles" text="PictureBox para cola y árbol; refresque la imagen sin bloquear la interfaz." />
              <RuleCard icon={<Clock3Icon />} title="Tiempo siempre actual" text="Recalcule después de cada Encolar y Desencolar, no solo al iniciar." />
            </div>
          </div>
        </section>

        <CodeExplorer />

        <section id="ruta" className="scroll-mt-28 border-y border-white/10 bg-[#0B0B0D] py-20">
          <SectionHeading number="09" eyebrow="Plan de trabajo" title="Pasos de implementación" description="Cada paso incluye una prueba concreta." />
          <div className="mx-auto mt-10 grid max-w-7xl gap-px border border-white/10 bg-white/10 px-0 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["01", "Modelo + JSON", "Cargue tres canciones y valide datos faltantes."],
              ["02", "Cola propia", "Encole A, B, C y compruebe que salen A, B, C."],
              ["03", "ABB propio", "Inserte títulos desordenados y busque raíz, hoja y ausente."],
              ["04", "Graphviz", "Genere ambos PNG y abra archivos válidos."],
              ["05", "Windows Forms", "Conecte controles a servicios, no a colecciones nativas."],
              ["06", "Integración", "Cargue una vez y alimente cola y árbol con los mismos objetos."],
              ["07", "Casos límite", "Pruebe cola vacía, JSON vacío, repetidos y Graphviz ausente."],
              ["08", "Entrega", "Limpie bin/obj, documente ejecución y agregue al auxiliar."],
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
                  "JSON válido construye ambos TDA",
                  "JSON vacío no bloquea la ventana",
                  "FIFO conserva el orden de llegada",
                  "Desencolar vacío muestra el mensaje",
                  "Búsqueda distingue título, no mayúsculas",
                  "Tiempo baja después de reproducir",
                  "DOT escapa comillas y diagonales",
                  "Ambas imágenes cambian en tiempo real",
                ].map((test) => <div key={test} className="flex items-start gap-2 border border-white/10 p-3 text-xs leading-5 text-[#A1A1AA]"><CheckCircle2Icon className="mt-0.5 size-4 shrink-0 text-[#006FEE]" />{test}</div>)}
              </div>
            </div>
          </div>
        </section>

        <section id="rubrica" className="scroll-mt-28 py-20">
          <SectionHeading number="10" eyebrow="Hoja de calificación" title="Ponderación: 100 puntos" description="Tabla basada en la hoja de calificación recibida." />
          <div className="mx-auto mt-10 max-w-6xl px-5 sm:px-8">
            <div className="border border-white/10 bg-[#0B0B0D]">
              <div className="grid gap-5 border-b border-white/10 p-5 sm:grid-cols-3">
                <FieldLine label="Fecha de calificación" />
                <FieldLine label="Nombre" />
                <FieldLine label="Carné" />
              </div>
              <div className="overflow-x-auto">
                <table className="w-full min-w-[680px] border-collapse text-left">
                  <thead><tr className="border-b border-white/10 font-mono text-[10px] tracking-[0.14em] text-[#71717A] uppercase"><th className="px-5 py-4">Descripción de ponderación</th><th className="px-5 py-4">Detalle</th><th className="w-24 px-5 py-4 text-right">Valor</th></tr></thead>
                  <tbody>
                    {GRADE_ROWS.map((row, index) => (
                      <tr key={`${row.criterio}-${index}`} className={row.group ? "border-y border-white/10 bg-white/[0.055]" : "border-b border-white/[0.06]"}>
                        <td className={`px-5 py-3 text-sm ${row.group ? "font-extrabold text-white" : "pl-9 text-[#A1A1AA]"}`}>{row.criterio}</td>
                        <td className="px-5 py-3 text-xs text-[#71717A]">{row.detalle ?? (row.group ? "Subtotal" : "Evidencia funcional")}</td>
                        <td className={`px-5 py-3 text-right font-mono text-sm font-black ${row.group ? "text-[#006FEE]" : "text-white"}`}>{row.puntos}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot><tr className="bg-[#006FEE] text-black"><td colSpan={2} className="px-5 py-4 text-lg font-black">TOTAL</td><td className="px-5 py-4 text-right font-mono text-lg font-black">100</td></tr></tfoot>
                </table>
              </div>
              <div className="grid gap-8 p-8 text-center text-xs text-[#A1A1AA] sm:grid-cols-2">
                <div><div className="mx-auto mb-2 h-px max-w-64 bg-white/25" />Firma del alumno</div>
                <div><div className="mx-auto mb-2 h-px max-w-64 bg-white/25" />Firma del auxiliar</div>
              </div>
            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 bg-[#050505] py-16">
          <div className="mx-auto grid max-w-7xl gap-8 px-5 sm:px-8 lg:grid-cols-[1fr_auto] lg:items-end">
            <div>
              <p className="font-mono text-[10px] font-black tracking-[0.18em] text-[#006FEE] uppercase">Entrega</p>
              <h2 className="mt-3 text-3xl font-black tracking-tight text-white">UEDI · repositorio con auxiliar</h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-[#A1A1AA]">C# + Windows Forms. La copia parcial o total implica nota 0. Use los foros de UEDI para confirmar la fecha y cualquier criterio ambiguo.</p>
            </div>
            <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
              <a href="/uploads/practica2/enunciado-practica2.pdf" target="_blank" rel="noreferrer" className="inline-flex h-11 items-center justify-center gap-2 bg-[#006FEE] px-5 text-xs font-black text-black transition hover:bg-[#338EF7]"><DownloadIcon className="size-4" /> Ver enunciado PDF</a>
              <a href="/uploads/practica2/hoja-calificacion-practica2.pdf" target="_blank" rel="noreferrer" className="inline-flex h-11 items-center justify-center gap-2 border border-white/15 px-5 text-xs font-black text-white transition hover:border-[#F31260] hover:text-[#F31260]"><DownloadIcon className="size-4" /> Ver hoja de calificación</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  )
}

function SectionHeading({ number, eyebrow, title, description }: { number: string; eyebrow: string; title: string; description: string }) {
  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="flex items-center gap-3 font-mono text-[10px] font-bold tracking-[0.18em] uppercase"><span className="bg-[#006FEE] px-2 py-1 text-black">{number}</span><span className="text-[#A1A1AA]">{eyebrow}</span></div>
      <div className="mt-4 grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <h2 className="text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">{title}</h2>
        <p className="max-w-2xl text-sm leading-7 text-[#A1A1AA] lg:justify-self-end">{description}</p>
      </div>
    </div>
  )
}

function Metric({ label, value }: { label: string; value: string }) {
  return <div className="grid grid-cols-[7rem_1fr] gap-4 border-t border-white/10 pt-3 text-xs"><span className="font-mono text-[#71717A] uppercase">{label}</span><strong className="text-white">{value}</strong></div>
}

function FlowCard({ icon, label, title, text }: { icon: React.ReactNode; label: string; title: string; text: string }) {
  return <article className="min-h-60 bg-[#09090B] p-5 transition hover:bg-[#18181B]"><div className="text-[#006FEE] [&_svg]:size-5">{icon}</div><p className="mt-12 font-mono text-[9px] font-bold tracking-[0.14em] text-[#71717A] uppercase">{label}</p><h3 className="mt-2 text-xl font-black text-white">{title}</h3><p className="mt-3 text-xs leading-6 text-[#A1A1AA]">{text}</p></article>
}

function RuleCard({ icon, title, text }: { icon: React.ReactNode; title: string; text: string }) {
  return <article className="border border-white/10 bg-[#18181B] p-5"><div className="text-[#006FEE] [&_svg]:size-5">{icon}</div><h3 className="mt-7 text-lg font-black text-white">{title}</h3><p className="mt-2 text-xs leading-6 text-[#A1A1AA]">{text}</p></article>
}

function CodeCard({ title, code, accent }: { title: string; code: string; accent: "lime" | "amber" }) {
  const color = accent === "lime" ? "text-[#006FEE]" : "text-[#F31260]"
  return <div className="overflow-hidden border border-white/10 bg-[#050505]"><div className="flex items-center justify-between border-b border-white/10 bg-[#18181B] px-4 py-3"><span className="font-mono text-[10px] font-bold text-white">{title}</span><span className={`font-mono text-[9px] font-black ${color}`}>EJEMPLO</span></div><pre className="max-h-[430px] overflow-auto p-5 font-mono text-[11px] leading-6 text-[#A1A1AA]"><code>{code}</code></pre></div>
}

function Complexity({ action, value }: { action: string; value: string }) {
  return <div className="bg-[#09090B] p-3"><span className="block text-[#71717A]">{action}</span><strong className="mt-1 block text-sm text-white">{value}</strong></div>
}

function GraphvizPreview({ kind, compact = false }: { kind: "queue" | "tree"; compact?: boolean }) {
  if (kind === "queue") return (
    <div className={`${compact ? "mt-3 min-h-32" : "mt-3 min-h-40 border border-white/10 bg-[#18181B]"} flex items-center justify-center overflow-hidden p-4`}>
      <div className="flex items-center gap-1.5 text-center font-mono text-[9px]">
        {["Here Comes", "Whole Lotta", "Comfortably"].map((title, index) => <div key={title} className="flex items-center gap-1.5"><span className="border border-[#006FEE]/60 bg-[#18181B] px-2 py-3 text-white">{title}</span>{index < 2 ? <span className="text-[#006FEE]">→</span> : null}</div>)}
      </div>
    </div>
  )
  return (
    <div className={`${compact ? "mt-3 min-h-32" : "mt-3 min-h-40 border border-white/10 bg-[#18181B]"} grid place-items-center overflow-hidden p-3`}>
      <div className="grid grid-cols-2 gap-x-8 gap-y-2 text-center font-mono text-[8px]">
        <span className="col-span-2 justify-self-center border border-[#F31260]/60 bg-[#18181B] px-2 py-1.5 text-white">Here Comes The Sun</span>
        <span className="border border-[#F31260]/40 px-2 py-1.5 text-white">Comfortably Numb</span><span className="border border-[#F31260]/40 px-2 py-1.5 text-white">Whole Lotta Love</span>
        <span className="border border-white/15 px-2 py-1.5 text-[#A1A1AA]">Ace of Spades</span><span className="border border-white/15 px-2 py-1.5 text-[#A1A1AA]">I Wanna Be Sedated</span>
      </div>
    </div>
  )
}

function MockPanel({ title, children }: { title: string; children: React.ReactNode }) {
  return <div className="border border-white/10 bg-[#18181B] p-4"><p className="mb-4 font-mono text-[9px] font-black tracking-[0.14em] text-[#F31260] uppercase">{title}</p>{children}</div>
}

function MockStat({ label, value }: { label: string; value: string }) {
  return <div className="border border-white/10 bg-[#18181B] p-4"><span className="font-mono text-[9px] text-[#71717A] uppercase">{label}</span><strong className="mt-2 block text-xl text-white">{value}</strong></div>
}

function FieldLine({ label }: { label: string }) {
  return <div><span className="font-mono text-[9px] text-[#71717A] uppercase">{label}</span><div className="mt-4 h-px bg-white/20" /></div>
}
