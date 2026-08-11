"use client"

import { useRef, useState } from "react"
import {
  DownloadIcon,
  FileCode2Icon,
  LoaderCircleIcon,
  PlayIcon,
  RotateCcwIcon,
} from "lucide-react"

import { CodeBlock } from "@/components/code-block"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"

const COLORS = {
  bg: "#FFF6CC",
  ink: "#171810",
  accent: "#2639D4",
  orange: "#FF5D00",
  surface: "#FFFBEB",
  wash: "#FFE68A",
}

const examples = {
  flujo: `digraph Flujo {
  rankdir=LR;
  graph [bgcolor="transparent", pad="0.35"];
  node [shape=box, style="rounded,filled", fontname="Arial"];
  edge [color="#2639D4", penwidth=2];

  inicio [shape=circle, label="Inicio", fillcolor="#FF5D00", fontcolor="white"];
  leer [label="Leer nota", fillcolor="#FFF6CC"];
  validar [shape=diamond, label="¿Nota válida?", fillcolor="#FFE68A"];
  guardar [label="Guardar", fillcolor="#C8F7DC"];
  error [label="Mostrar error", fillcolor="#FFD3C2"];
  fin [shape=doublecircle, label="Fin", fillcolor="#2639D4", fontcolor="white"];

  inicio -> leer -> validar;
  validar -> guardar [label=" sí"];
  validar -> error [label=" no"];
  guardar -> fin;
  error -> leer;
}`,
  arbol: `digraph Arbol {
  graph [bgcolor="transparent", nodesep=0.45, ranksep=0.6];
  node [shape=circle, style=filled, fillcolor="#FFF6CC", color="#171810", penwidth=2];
  edge [color="#2639D4", penwidth=2];

  8 -> 4;
  8 -> 12;
  4 -> 2;
  4 -> 6;
  12 -> 10;
  12 -> 14;
}`,
  clases: `digraph Clases {
  rankdir=BT;
  graph [bgcolor="transparent"];
  node [shape=record, style=filled, fillcolor="#FFFBEB", color="#171810", penwidth=2];
  edge [arrowhead=empty, color="#2639D4", penwidth=2];

  Animal [label="{Animal|+ Nombre: string|+ Hablar(): string}"];
  Perro [label="{Perro|+ Raza: string|+ Hablar(): string}"];
  Gato [label="{Gato|+ Vidas: int|+ Hablar(): string}"];

  Perro -> Animal;
  Gato -> Animal;
}`,
} as const

const dotBasic = `digraph Cursos {
  IPC1 -> IPC2;
  IPC2 -> EDD;
  IPC2 -> Bases1;
}`

const dotAttributes = `digraph G {
  rankdir=LR;

  graph [bgcolor="transparent"];
  node [shape=box, style=filled, fillcolor="#FFF6CC"];
  edge [color="#2639D4", label="siguiente"];

  A [label="Entrada", shape=oval];
  B [label="Proceso"];
  C [label="Salida", shape=doublecircle];

  A -> B -> C;
}`

const csharpBuilder = `using System.Text;

static string Escapar(string texto)
    => texto.Replace("\\\\", "\\\\\\\\").Replace("\\\"", "\\\\\\\"");

var dot = new StringBuilder();
dot.AppendLine("digraph Usuarios {");
dot.AppendLine("  rankdir=LR;");

foreach (Usuario usuario in usuarios)
{
    string id = $"u{usuario.Id}";
    dot.AppendLine($"  {id} [label=\\\"{Escapar(usuario.Nombre)}\\\"];");
}

foreach (Relacion relacion in relaciones)
    dot.AppendLine($"  u{relacion.OrigenId} -> u{relacion.DestinoId};");

dot.AppendLine("}");
File.WriteAllText("usuarios.dot", dot.ToString());`

const csharpProcess = `using System.Diagnostics;

var proceso = new ProcessStartInfo
{
    FileName = "dot",
    Arguments = "-Tsvg usuarios.dot -o usuarios.svg",
    RedirectStandardError = true,
    UseShellExecute = false,
    CreateNoWindow = true
};

using Process? dot = Process.Start(proceso);
if (dot is null) throw new InvalidOperationException("No se inició Graphviz");

await dot.WaitForExitAsync();
string error = await dot.StandardError.ReadToEndAsync();

if (dot.ExitCode != 0)
    throw new InvalidOperationException(error);`

const commandExamples = `dot -Tsvg grafo.dot -o grafo.svg
dot -Tpng grafo.dot -o grafo.png
neato -Tsvg red.dot -o red.svg
circo -Tpdf ciclo.dot -o ciclo.pdf`

type ViewerStatus = "idle" | "loading" | "ready" | "error"

let vizPromise: ReturnType<typeof import("@viz-js/viz")["instance"]> | undefined

async function loadViz() {
  if (!vizPromise) {
    vizPromise = import("@viz-js/viz").then(({ instance }) => instance())
  }
  return vizPromise
}

function SectionTitle({
  number,
  title,
  description,
}: {
  number: string
  title: string
  description: string
}) {
  return (
    <div className="mb-9 flex flex-col gap-4">
      <div className="border-b-[6px] border-[var(--gv-ink)] pb-3 font-mono text-xs font-extrabold tracking-[0.2em] uppercase">
        {number} · GUÍA GRAPHVIZ
      </div>
      <h2 className="font-[family-name:var(--font-display)] text-4xl leading-none tracking-[-0.04em] uppercase sm:text-6xl">
        {title}
      </h2>
      <p className="max-w-3xl text-base leading-relaxed font-semibold sm:text-lg">
        {description}
      </p>
    </div>
  )
}

function DotBlock({ code, label }: { code: string; label: string }) {
  return (
    <div className="min-w-0 border-[6px] border-[var(--gv-ink)] bg-[var(--gv-ink)] shadow-[8px_8px_0_var(--gv-accent)]">
      <div className="border-b-2 border-white/20 px-4 py-3 font-mono text-xs font-extrabold tracking-wider text-[var(--gv-bg)] uppercase">
        {label}
      </div>
      <pre className="max-h-[32rem] overflow-auto p-5 font-mono text-sm leading-7 text-[#FFF9DF]">
        <code>{code}</code>
      </pre>
    </div>
  )
}

export function GraphvizCsharpView() {
  const [source, setSource] = useState<string>(examples.flujo)
  const [status, setStatus] = useState<ViewerStatus>("idle")
  const [message, setMessage] = useState("Seleccione Renderizar para generar el SVG.")
  const [svgMarkup, setSvgMarkup] = useState("")
  const outputRef = useRef<HTMLDivElement>(null)

  const renderGraph = async () => {
    setStatus("loading")
    setMessage("Cargando Graphviz y procesando DOT…")

    try {
      const viz = await loadViz()
      const svg = viz.renderSVGElement(source, { engine: "dot" })
      svg.removeAttribute("width")
      svg.removeAttribute("height")
      svg.setAttribute("role", "img")
      svg.setAttribute("aria-label", "Diagrama generado desde el código DOT")
      svg.style.width = "100%"
      svg.style.height = "auto"
      svg.style.maxHeight = "680px"

      const markup = new XMLSerializer().serializeToString(svg)
      outputRef.current?.replaceChildren(svg)
      setSvgMarkup(markup)
      setStatus("ready")
      setMessage("SVG generado correctamente.")
    } catch (error) {
      outputRef.current?.replaceChildren()
      setSvgMarkup("")
      setStatus("error")
      setMessage(error instanceof Error ? error.message : "No se pudo procesar el código DOT.")
    }
  }

  const loadExample = (dot: string) => {
    setSource(dot)
    setStatus("idle")
    setMessage("Ejemplo cargado. Seleccione Renderizar.")
    setSvgMarkup("")
    outputRef.current?.replaceChildren()
  }

  const downloadSvg = () => {
    if (!svgMarkup) return
    const url = URL.createObjectURL(new Blob([svgMarkup], { type: "image/svg+xml" }))
    const link = document.createElement("a")
    link.href = url
    link.download = "graphviz-diagrama.svg"
    link.click()
    URL.revokeObjectURL(url)
  }

  return (
    <main
      className="graphviz-guide min-h-full overflow-hidden bg-[var(--gv-bg)] text-[var(--gv-ink)]"
      style={
        {
          "--gv-bg": COLORS.bg,
          "--gv-ink": COLORS.ink,
          "--gv-accent": COLORS.accent,
          "--gv-orange": COLORS.orange,
          "--gv-surface": COLORS.surface,
          "--gv-wash": COLORS.wash,
        } as React.CSSProperties
      }
    >
      <style>{`
        .graphviz-guide {
          font-family: var(--font-lab-mono), ui-monospace, monospace;
          background-image:
            linear-gradient(rgba(23,24,16,.08) 1px, transparent 1px),
            linear-gradient(90deg, rgba(23,24,16,.08) 1px, transparent 1px);
          background-size: 24px 24px;
        }
        .graphviz-guide ::selection { background: var(--gv-orange); color: white; }
        .graphviz-guide section { scroll-margin-top: 88px; border-bottom: 10px solid var(--gv-ink); }
        .graphviz-guide svg text { font-family: var(--font-lab-mono), ui-monospace, monospace; }
      `}</style>

      <header className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-3 border-b-[6px] border-[var(--gv-orange)] bg-[var(--gv-ink)] px-4 py-3 text-[var(--gv-bg)] sm:px-8">
        <a href="#graphviz" className="font-[family-name:var(--font-display)] text-xl no-underline sm:text-2xl">
          GRAPHVIZ<span className="text-[var(--gv-orange)]">.</span>C#
        </a>
        <nav aria-label="Temas de Graphviz" className="flex max-w-full gap-2 overflow-x-auto pb-1 text-[10px] font-extrabold tracking-wider sm:text-xs">
          {[
            ["#dot", "DOT"],
            ["#atributos", "ATRIBUTOS"],
            ["#csharp", "C#"],
            ["#visor", "VISOR"],
            ["#referencia", "REFERENCIA"],
          ].map(([href, label]) => (
            <a key={href} href={href} className="shrink-0 border-2 border-white/25 px-2.5 py-1.5 no-underline hover:border-[var(--gv-orange)] hover:bg-[var(--gv-orange)]">
              {label}
            </a>
          ))}
        </nav>
      </header>

      <section id="graphviz">
        <div className="mx-auto grid max-w-[1500px] gap-12 px-5 py-20 sm:px-10 lg:grid-cols-[1.1fr_.9fr] lg:px-12 lg:py-28">
          <div className="flex flex-col items-start gap-7">
            <div className="flex flex-wrap gap-0">
              <Badge className="h-auto rounded-none border-0 bg-[var(--gv-ink)] px-4 py-2 font-mono text-xs tracking-wider text-[var(--gv-bg)] uppercase">IPC2 · Guía</Badge>
              <Badge className="h-auto rounded-none border-0 bg-[var(--gv-orange)] px-4 py-2 font-mono text-xs tracking-wider text-white uppercase">DOT + SVG</Badge>
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(4rem,10vw,9rem)] leading-[0.82] tracking-[-0.06em] uppercase">
              Graphviz<br /><span className="text-[var(--gv-accent)]">y C#</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed font-bold sm:text-2xl">
              Definición de grafos con DOT, generación desde C# y exportación a SVG, PNG o PDF.
            </p>
          </div>
          <div className="flex min-w-0 flex-col justify-center gap-5">
            <DotBlock code={dotBasic} label="cursos.dot" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {["Nodos", "Aristas", "Atributos", "Exportación"].map((item, index) => (
                <div key={item} className={cn("border-4 border-[var(--gv-ink)] p-3 text-center text-xs font-extrabold uppercase", index === 3 ? "bg-[var(--gv-orange)] text-white" : "bg-[var(--gv-surface)]")}>{item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="dot" className="bg-[var(--gv-surface)]">
        <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-10 lg:px-12">
          <SectionTitle number="01" title="Sintaxis DOT" description="DOT es el lenguaje de texto que Graphviz procesa. Un archivo declara el tipo de grafo, sus nodos, sus conexiones y sus atributos." />
          <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
            <DotBlock code={dotBasic} label="grafo dirigido" />
            <div className="grid gap-4">
              {[
                ["digraph", "Declara un grafo dirigido."],
                ["A -> B", "Crea una arista con dirección."],
                ["graph", "Declara un grafo no dirigido."],
                ["A -- B", "Crea una arista sin dirección."],
                [";", "Separa sentencias; es recomendable aunque algunas sean opcionales."],
              ].map(([term, detail]) => (
                <article key={term} className="grid grid-cols-[7rem_1fr] gap-4 border-4 border-[var(--gv-ink)] bg-white p-4">
                  <code className="font-extrabold text-[var(--gv-accent)]">{term}</code>
                  <p className="text-sm font-semibold">{detail}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="atributos" className="bg-[var(--gv-wash)]">
        <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-20 sm:px-10 lg:grid-cols-[.9fr_1.1fr] lg:px-12">
          <div>
            <SectionTitle number="02" title="Atributos" description="Los atributos controlan dirección, texto, forma, color, separación y estilo. Pueden aplicarse al grafo completo o a elementos individuales." />
            <div className="grid grid-cols-2 gap-3">
              {[
                ["rankdir", "TB · LR · BT · RL"],
                ["shape", "box · circle · record"],
                ["label", "Texto visible"],
                ["style", "filled · rounded · dashed"],
                ["color", "Borde o arista"],
                ["fillcolor", "Relleno del nodo"],
              ].map(([name, value]) => <div key={name} className="border-4 border-[var(--gv-ink)] bg-white p-4"><code className="font-extrabold text-[var(--gv-accent)]">{name}</code><p className="mt-2 text-xs font-semibold">{value}</p></div>)}
            </div>
          </div>
          <DotBlock code={dotAttributes} label="atributos.dot" />
        </div>
      </section>

      <section id="csharp">
        <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-10 lg:px-12">
          <SectionTitle number="03" title="Generación desde C#" description="C# puede construir el texto DOT, guardarlo en un archivo y ejecutar Graphviz mediante el comando dot instalado en el sistema." />
          <div className="grid gap-10 xl:grid-cols-2">
            <div className="min-w-0"><h3 className="mb-4 font-[family-name:var(--font-display)] text-3xl uppercase">Construcción del archivo</h3><div className="border-[6px] border-[var(--gv-ink)] bg-[var(--gv-ink)]"><CodeBlock code={csharpBuilder} language="csharp" variant="dark" style={{ padding: 20, fontSize: 14, lineHeight: 1.7, overflow: "auto" }} /></div></div>
            <div className="min-w-0"><h3 className="mb-4 font-[family-name:var(--font-display)] text-3xl uppercase">Ejecución de Graphviz</h3><div className="border-[6px] border-[var(--gv-ink)] bg-[var(--gv-ink)]"><CodeBlock code={csharpProcess} language="csharp" variant="dark" style={{ padding: 20, fontSize: 14, lineHeight: 1.7, overflow: "auto" }} /></div></div>
          </div>
          <div className="mt-8 border-4 border-[var(--gv-ink)] bg-[var(--gv-orange)] p-5 font-mono text-sm font-bold text-white">
            Valide identificadores y escape comillas y barras invertidas antes de incluir datos externos en DOT. No concatene texto sin validar dentro de los argumentos del proceso.
          </div>
        </div>
      </section>

      <section id="visor" className="bg-[var(--gv-surface)]">
        <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-10 lg:px-12">
          <SectionTitle number="04" title="Visor DOT" description="Edite el código, procese el grafo con Graphviz WebAssembly y descargue el resultado en SVG." />
          <div className="mb-5 flex flex-wrap gap-3">
            <Button type="button" variant="outline" onClick={() => loadExample(examples.flujo)} className="rounded-none border-4 border-[var(--gv-ink)] font-mono font-extrabold">Flujo</Button>
            <Button type="button" variant="outline" onClick={() => loadExample(examples.arbol)} className="rounded-none border-4 border-[var(--gv-ink)] font-mono font-extrabold">Árbol</Button>
            <Button type="button" variant="outline" onClick={() => loadExample(examples.clases)} className="rounded-none border-4 border-[var(--gv-ink)] font-mono font-extrabold">Clases</Button>
          </div>
          <div className="grid gap-8 xl:grid-cols-2">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="dot-source" className="font-mono text-sm font-extrabold tracking-wider uppercase">Código DOT</FieldLabel>
                <FieldDescription>El visor utiliza el motor dot y genera un SVG localmente en el navegador.</FieldDescription>
                <Textarea id="dot-source" value={source} onChange={(event) => setSource(event.target.value)} spellCheck={false} aria-invalid={status === "error"} className="min-h-[34rem] resize-y rounded-none border-4 border-[var(--gv-ink)] bg-[var(--gv-ink)] p-5 font-mono text-sm leading-7 text-[var(--gv-bg)] focus-visible:border-[var(--gv-accent)] focus-visible:ring-[var(--gv-accent)]" />
              </Field>
              <div className="flex flex-wrap gap-3">
                <Button type="button" onClick={renderGraph} disabled={status === "loading"} className="h-auto rounded-none border-4 border-[var(--gv-ink)] bg-[var(--gv-orange)] px-5 py-3 font-mono font-extrabold text-white hover:bg-[var(--gv-accent)]">
                  {status === "loading" ? <LoaderCircleIcon data-icon="inline-start" className="animate-spin" /> : <PlayIcon data-icon="inline-start" />}
                  Renderizar
                </Button>
                <Button type="button" variant="outline" onClick={() => loadExample(examples.flujo)} className="h-auto rounded-none border-4 border-[var(--gv-ink)] px-5 py-3 font-mono font-extrabold"><RotateCcwIcon data-icon="inline-start" />Restablecer</Button>
                <Button type="button" variant="outline" onClick={downloadSvg} disabled={!svgMarkup} className="h-auto rounded-none border-4 border-[var(--gv-ink)] px-5 py-3 font-mono font-extrabold"><DownloadIcon data-icon="inline-start" />Descargar SVG</Button>
              </div>
            </FieldGroup>

            <div className="flex min-w-0 flex-col gap-3">
              <div className="flex min-h-[34rem] items-center justify-center overflow-auto border-[6px] border-[var(--gv-ink)] bg-white p-5 shadow-[8px_8px_0_var(--gv-accent)]">
                <div ref={outputRef} className="w-full">
                  {status === "idle" ? <div className="flex flex-col items-center gap-4 text-center opacity-55"><FileCode2Icon className="size-14" /><p className="max-w-sm font-mono text-sm font-bold">La vista previa aparecerá después de renderizar el código DOT.</p></div> : null}
                </div>
              </div>
              <div role={status === "error" ? "alert" : "status"} className={cn("border-4 border-[var(--gv-ink)] px-4 py-3 font-mono text-xs font-bold", status === "error" ? "bg-[var(--gv-orange)] text-white" : status === "ready" ? "bg-[#C8F7DC]" : "bg-[var(--gv-wash)]")}>
                {message}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="referencia" className="bg-[var(--gv-ink)] text-[var(--gv-bg)]">
        <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-20 sm:px-10 lg:grid-cols-[.8fr_1.2fr] lg:px-12">
          <div>
            <SectionTitle number="05" title="Referencia" description="dot organiza jerarquías; neato y fdp distribuyen redes; circo organiza estructuras circulares. El formato se define con -T." />
            <div className="grid gap-3 text-[var(--gv-ink)]">
              {[["dot", "Diagramas dirigidos y jerárquicos"], ["neato", "Grafos con distribución por fuerzas"], ["fdp", "Redes grandes no dirigidas"], ["circo", "Estructuras circulares"]].map(([engine, use]) => <div key={engine} className="grid grid-cols-[6rem_1fr] gap-3 bg-[var(--gv-bg)] p-4"><code className="font-extrabold text-[var(--gv-accent)]">{engine}</code><p className="text-sm font-semibold">{use}</p></div>)}
            </div>
          </div>
          <DotBlock code={commandExamples} label="terminal" />
        </div>
      </section>
    </main>
  )
}
