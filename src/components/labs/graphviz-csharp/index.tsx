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
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

const COLORS = {
  bg: "#FFF6CC",
  ink: "#171810",
  accent: "#2639D4",
  orange: "#FF5D00",
  surface: "#FFFBEB",
  wash: "#FFE68A",
}

const dotArray = `digraph Arreglo {
  graph [bgcolor="transparent", pad=0.25];
  node [shape=plain];

  arreglo [label=<
    <TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="10">
      <TR>
        <TD BGCOLOR="#2639D4"><FONT COLOR="white"><B>índice</B></FONT></TD>
        <TD>0</TD><TD>1</TD><TD>2</TD><TD>3</TD><TD>4</TD>
      </TR>
      <TR>
        <TD BGCOLOR="#FF5D00"><FONT COLOR="white"><B>valor</B></FONT></TD>
        <TD PORT="i0">12</TD><TD PORT="i1">7</TD><TD PORT="i2">25</TD>
        <TD PORT="i3">4</TD><TD PORT="i4">18</TD>
      </TR>
    </TABLE>
  >];
}`

const dotMatrix = `digraph Matriz {
  graph [bgcolor="transparent", pad=0.25];
  node [shape=plain];

  matriz [label=<
    <TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0" CELLPADDING="10">
      <TR><TD BGCOLOR="#171810"><FONT COLOR="white"><B>f/c</B></FONT></TD><TD BGCOLOR="#FFE68A">0</TD><TD BGCOLOR="#FFE68A">1</TD><TD BGCOLOR="#FFE68A">2</TD></TR>
      <TR><TD BGCOLOR="#FFE68A">0</TD><TD PORT="f0c0">5</TD><TD PORT="f0c1">8</TD><TD PORT="f0c2">2</TD></TR>
      <TR><TD BGCOLOR="#FFE68A">1</TD><TD PORT="f1c0">0</TD><TD PORT="f1c1">7</TD><TD PORT="f1c2">4</TD></TR>
      <TR><TD BGCOLOR="#FFE68A">2</TD><TD PORT="f2c0">9</TD><TD PORT="f2c1">1</TD><TD PORT="f2c2">6</TD></TR>
    </TABLE>
  >];
}`

const dotSparseMatrix = `digraph MatrizDispersa {
  graph [bgcolor="transparent", pad=0.35, nodesep=0.45, ranksep=0.55];
  node [shape=box, style=filled, color="#171810", penwidth=2];
  edge [penwidth=2, arrowsize=0.7];

  raiz [label="M", fillcolor="#171810", fontcolor="white"];
  c0 [label="C0", fillcolor="#2639D4", fontcolor="white"];
  c1 [label="C1", fillcolor="#2639D4", fontcolor="white"];
  c2 [label="C2", fillcolor="#2639D4", fontcolor="white"];
  f0 [label="F0", fillcolor="#FF5D00", fontcolor="white"];
  f1 [label="F1", fillcolor="#FF5D00", fontcolor="white"];
  f2 [label="F2", fillcolor="#FF5D00", fontcolor="white"];
  a02 [label="8", fillcolor="#FFF6CC"];
  a11 [label="7", fillcolor="#FFF6CC"];
  a20 [label="9", fillcolor="#FFF6CC"];
  a22 [label="6", fillcolor="#FFF6CC"];

  { rank=same; raiz; c0; c1; c2; }
  { rank=same; f0; a02; }
  { rank=same; f1; a11; }
  { rank=same; f2; a20; a22; }

  raiz -> c0 -> c1 -> c2 [color="#2639D4"];
  raiz -> f0 -> f1 -> f2 [color="#FF5D00"];
  c0 -> a20 [color="#2639D4"];
  c1 -> a11 [color="#2639D4"];
  c2 -> a02 -> a22 [color="#2639D4"];
  f0 -> a02 [color="#FF5D00"];
  f1 -> a11 [color="#FF5D00"];
  f2 -> a20 -> a22 [color="#FF5D00"];
}`

const dotSinglyLinkedList = `digraph ListaSimple {
  rankdir=LR;
  graph [bgcolor="transparent", pad=0.3];
  node [shape=record, style=filled, fillcolor="#FFF6CC", penwidth=2];
  edge [color="#2639D4", penwidth=2];

  cabeza [shape=plaintext, label="CABEZA"];
  n1 [label="{<dato> 10|<sig> sig}"];
  n2 [label="{<dato> 20|<sig> sig}"];
  n3 [label="{<dato> 30|<sig> sig}"];
  nulo [shape=plaintext, label="NULL"];

  cabeza -> n1:dato;
  n1:sig -> n2:dato;
  n2:sig -> n3:dato;
  n3:sig -> nulo;
}`

const dotDoublyLinkedList = `digraph ListaDoble {
  rankdir=LR;
  graph [bgcolor="transparent", pad=0.3, splines=spline];
  node [shape=plain];
  edge [penwidth=2, arrowsize=0.7];

  n1 [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0"><TR><TD PORT="ant" BGCOLOR="#FFE68A">ant</TD><TD PORT="dato" CELLPADDING="10">10</TD><TD PORT="sig" BGCOLOR="#FFF6CC">sig</TD></TR></TABLE>>];
  n2 [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0"><TR><TD PORT="ant" BGCOLOR="#FFE68A">ant</TD><TD PORT="dato" CELLPADDING="10">20</TD><TD PORT="sig" BGCOLOR="#FFF6CC">sig</TD></TR></TABLE>>];
  n3 [label=<<TABLE BORDER="0" CELLBORDER="1" CELLSPACING="0"><TR><TD PORT="ant" BGCOLOR="#FFE68A">ant</TD><TD PORT="dato" CELLPADDING="10">30</TD><TD PORT="sig" BGCOLOR="#FFF6CC">sig</TD></TR></TABLE>>];

  n1:sig:e -> n2:dato:w [color="#2639D4"];
  n2:sig:e -> n3:dato:w [color="#2639D4"];
  n2:ant:w -> n1:dato:e [color="#FF5D00", constraint=false];
  n3:ant:w -> n2:dato:e [color="#FF5D00", constraint=false];
}`

const dotCircularLinkedList = `digraph ListaCircular {
  rankdir=LR;
  graph [bgcolor="transparent", pad=0.4, splines=spline];
  node [shape=record, style=filled, fillcolor="#FFF6CC", penwidth=2];
  edge [color="#2639D4", penwidth=2];

  cabeza [shape=plaintext, label="CABEZA"];
  n1 [label="{<dato> 10|<sig> sig}"];
  n2 [label="{<dato> 20|<sig> sig}"];
  n3 [label="{<dato> 30|<sig> sig}"];

  cabeza -> n1:dato;
  n1:sig -> n2:dato;
  n2:sig -> n3:dato;
  n3:sig -> n1:dato [constraint=false, color="#FF5D00", label=" retorno"];
}`

const dotStack = `digraph Pila {
  rankdir=TB;
  graph [bgcolor="transparent", pad=0.3, ranksep=0.2];
  node [shape=box, style=filled, fillcolor="#FFF6CC", width=2, penwidth=2];
  edge [color="#2639D4", penwidth=2];

  tope [shape=plaintext, label="TOPE"];
  n30 [label="30"];
  n20 [label="20"];
  n10 [label="10"];

  tope -> n30 [label=" pop / push", color="#FF5D00"];
  n30 -> n20 -> n10 [arrowhead=none];
}`

const dotQueue = `digraph Cola {
  rankdir=LR;
  graph [bgcolor="transparent", pad=0.3];
  node [shape=box, style=filled, fillcolor="#FFF6CC", penwidth=2];
  edge [color="#2639D4", penwidth=2];

  frente [shape=plaintext, label="FRENTE"];
  n10 [label="10"];
  n20 [label="20"];
  n30 [label="30"];
  final [shape=plaintext, label="FINAL"];

  frente -> n10 [label=" desencolar", color="#FF5D00"];
  n10 -> n20 -> n30;
  final -> n30 [label=" encolar", color="#FF5D00", dir=back];
}`

const dotBinarySearchTree = `digraph ArbolBinarioBusqueda {
  graph [bgcolor="transparent", pad=0.3, nodesep=0.45, ranksep=0.55];
  node [shape=circle, style=filled, fillcolor="#FFF6CC", penwidth=2];
  edge [color="#2639D4", penwidth=2];

  n8 [label="8"];
  n4 [label="4"];
  n12 [label="12"];
  n2 [label="2"];
  n6 [label="6"];
  n10 [label="10"];
  n14 [label="14"];

  n8 -> n4 [label=" <"];
  n8 -> n12 [label=" >"];
  n4 -> n2;
  n4 -> n6;
  n12 -> n10;
  n12 -> n14;
}`

const dotHeap = `digraph HeapMaximo {
  graph [bgcolor="transparent", pad=0.3, nodesep=0.45, ranksep=0.55];
  node [shape=circle, style=filled, fillcolor="#FFE68A", penwidth=2];
  edge [color="#2639D4", penwidth=2];

  i0 [label="50\n[0]"];
  i1 [label="30\n[1]"];
  i2 [label="40\n[2]"];
  i3 [label="10\n[3]"];
  i4 [label="20\n[4]"];
  i5 [label="35\n[5]"];

  i0 -> i1;
  i0 -> i2;
  i1 -> i3;
  i1 -> i4;
  i2 -> i5;
}`

const dotHashTable = `digraph TablaHash {
  rankdir=LR;
  graph [bgcolor="transparent", pad=0.35, nodesep=0.35];
  node [shape=record, style=filled, fillcolor="#FFF6CC", penwidth=2];
  edge [color="#2639D4", penwidth=2];

  tabla [label="{<b0> 0|<b1> 1|<b2> 2|<b3> 3|<b4> 4}", fillcolor="#FFE68A"];
  ana [label="Ana | 25"];
  luis [label="Luis | 31"];
  eva [label="Eva | 19"];
  mario [label="Mario | 42"];

  tabla:b0 -> ana;
  tabla:b2 -> luis -> eva;
  tabla:b4 -> mario;
}`

const dotAdjacencyList = `graph ListaAdyacencia {
  rankdir=LR;
  graph [bgcolor="transparent", pad=0.35, nodesep=0.35];
  node [shape=record, style=filled, fillcolor="#FFF6CC", penwidth=2];
  edge [color="#2639D4", penwidth=2];

  vertices [label="{<a> A|<b> B|<c> C|<d> D}", fillcolor="#FFE68A"];
  a1 [label="B"];
  a2 [label="C"];
  b1 [label="A"];
  b2 [label="D"];
  c1 [label="A"];
  c2 [label="D"];
  d1 [label="B"];
  d2 [label="C"];

  vertices:a -- a1 -- a2;
  vertices:b -- b1 -- b2;
  vertices:c -- c1 -- c2;
  vertices:d -- d1 -- d2;
}`

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
  clusters: `digraph Sistema {
  compound=true;
  rankdir=LR;
  graph [bgcolor="transparent", nodesep=0.45, ranksep=0.8];
  node [shape=box, style="rounded,filled", fillcolor="#FFF6CC"];

  subgraph cluster_cliente {
    label="Cliente";
    color="#2639D4";
    navegador;
  }

  subgraph cluster_servidor {
    label="Servidor";
    color="#FF5D00";
    api -> servicio -> base_datos;
  }

  navegador -> api [ltail=cluster_cliente, lhead=cluster_servidor];
}`,
  posicion: `graph Posiciones {
  layout=neato;
  graph [bgcolor="transparent", overlap=false, splines=true];
  node [shape=circle, style=filled, fillcolor="#FFE68A", pin=true];

  A [pos="0,2!"];
  B [pos="2,3!"];
  C [pos="4,2!"];
  D [pos="2,0!"];

  A -- B -- C -- D -- A;
  A -- C;
}`,
  arreglo: dotArray,
  matriz: dotMatrix,
  matrizDispersa: dotSparseMatrix,
  listaSimple: dotSinglyLinkedList,
  listaDoble: dotDoublyLinkedList,
  listaCircular: dotCircularLinkedList,
  pila: dotStack,
  cola: dotQueue,
  arbolBusqueda: dotBinarySearchTree,
  heap: dotHeap,
  tablaHash: dotHashTable,
  listaAdyacencia: dotAdjacencyList,
} as const

const dotBasic = `digraph Cursos {
  IPC1 -> IPC2;
  IPC2 -> EDD;
  IPC2 -> Bases1;
}`

const dotScopes = `digraph Ambitos {
  // Atributos del lienzo y posicionamiento
  graph [rankdir=LR, bgcolor="transparent", nodesep=0.5];

  // Valores predeterminados para nodos posteriores
  node [shape=box, style="rounded,filled", fillcolor="#FFF6CC"];

  // Valores predeterminados para aristas posteriores
  edge [color="#2639D4", penwidth=2, arrowsize=0.8];

  A [label="Usa valores por defecto"];
  B [label="Sobrescribe fillcolor", fillcolor="#FFE68A"];
  A -> B [label="sobrescribe label"];
}`

const dotShapes = `digraph Formas {
  rankdir=LR;
  graph [bgcolor="transparent"];
  node [style=filled, fillcolor="#FFF6CC", color="#171810"];

  inicio [shape=circle, label="Inicio"];
  entrada [shape=parallelogram, label="Entrada"];
  decision [shape=diamond, label="¿Válido?"];
  proceso [shape=box, label="Proceso"];
  documento [shape=note, label="Archivo"];
  fin [shape=doublecircle, label="Fin"];

  inicio -> entrada -> decision -> proceso -> documento -> fin;
}`

const dotLabels = `digraph Etiquetas {
  rankdir=LR;
  graph [bgcolor="transparent"];

  registro [
    shape=record,
    label="<id> Usuario | <nombre> Nombre: Ana | <rol> Rol: admin"
  ];

  html [
    shape=plain,
    label=<<TABLE BORDER="1" CELLBORDER="1" CELLSPACING="0">
      <TR><TD COLSPAN="2"><B>Producto</B></TD></TR>
      <TR><TD PORT="codigo">Código</TD><TD>P-001</TD></TR>
      <TR><TD>Stock</TD><TD BGCOLOR="#FFE68A">12</TD></TR>
    </TABLE>>
  ];

  registro:rol:e -> html:codigo:w [label=" consulta"];
}`

const dotEdges = `digraph Aristas {
  rankdir=LR;
  graph [bgcolor="transparent", splines=polyline];
  node [shape=box, style=rounded];

  A -> B [label="normal", arrowhead=normal];
  A -> C [label="vacía", arrowhead=empty, style=dashed];
  B -> D [label="doble", dir=both, arrowtail=diamond];
  C -> D [label="sin flecha", dir=none, color="#FF5D00"];
}`

const dotPositioning = `digraph Posicionamiento {
  rankdir=TB;
  graph [bgcolor="transparent", nodesep=0.5, ranksep="0.8 equally"];
  node [shape=box, style="rounded,filled", fillcolor="#FFF6CC"];

  inicio -> validar [minlen=2, weight=3];
  validar -> guardar;
  validar -> error;

  // Fuerza nodos al mismo nivel en dot
  { rank=same; guardar; error; }

  // Se dibuja, pero no cambia los niveles
  guardar -> auditoria [constraint=false, style=dashed];
}`

const dotClusters = `digraph Arquitectura {
  compound=true;
  rankdir=LR;
  graph [bgcolor="transparent", splines=true];

  subgraph cluster_frontend {
    label="Frontend";
    color="#2639D4";
    style=rounded;
    web -> formulario;
  }

  subgraph cluster_backend {
    label="Backend";
    color="#FF5D00";
    style=rounded;
    api -> servicio -> db;
  }

  formulario -> api [
    ltail=cluster_frontend,
    lhead=cluster_backend,
    label=" HTTP"
  ];
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

const csharpMatrix = `using System.Net;
using System.Text;

static string MatrizADot(int[,] matriz)
{
    var dot = new StringBuilder();
    dot.AppendLine("digraph Matriz {");
    dot.AppendLine("  node [shape=plain];");
    dot.AppendLine("  matriz [label=<");
    dot.AppendLine("    <TABLE BORDER=\"0\" CELLBORDER=\"1\" CELLSPACING=\"0\">");

    for (int fila = 0; fila < matriz.GetLength(0); fila++)
    {
        dot.AppendLine("      <TR>");
        for (int columna = 0; columna < matriz.GetLength(1); columna++)
        {
            string valor = WebUtility.HtmlEncode(matriz[fila, columna].ToString());
            dot.AppendLine($"        <TD PORT=\"f{fila}c{columna}\">{valor}</TD>");
        }
        dot.AppendLine("      </TR>");
    }

    dot.AppendLine("    </TABLE>");
    dot.AppendLine("  >];");
    dot.AppendLine("}");
    return dot.ToString();
}

int[,] datos = { { 5, 8, 2 }, { 0, 7, 4 }, { 9, 1, 6 } };
File.WriteAllText("matriz.dot", MatrizADot(datos));`

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

const commandExamples = `# Comprobar instalación
dot -V

# Motor + formato + entrada + salida
dot -Tsvg grafo.dot -o grafo.svg
dot -Tpng grafo.dot -o grafo.png
neato -Tsvg red.dot -o red.svg
circo -Tpdf ciclo.dot -o ciclo.pdf

# Sobrescribir atributos desde la terminal
dot -Grankdir=LR -Nshape=box -Ecolor=blue -Tsvg grafo.dot -o grafo.svg`

type ViewerStatus = "idle" | "loading" | "ready" | "error"
type LayoutEngine = "dot" | "neato" | "fdp" | "sfdp" | "circo" | "twopi"

const layoutEngines: Array<{
  id: LayoutEngine
  use: string
  detail: string
}> = [
  { id: "dot", use: "Jerarquías", detail: "Capas para flujos, árboles y dependencias dirigidas." },
  { id: "neato", use: "Redes pequeñas", detail: "Distribución por resortes; admite pos y pin." },
  { id: "fdp", use: "Redes", detail: "Distribución dirigida por fuerzas para grafos no dirigidos." },
  { id: "sfdp", use: "Redes grandes", detail: "Versión escalable de fdp para muchos nodos." },
  { id: "circo", use: "Ciclos", detail: "Distribución circular para estructuras cíclicas." },
  { id: "twopi", use: "Radiales", detail: "Niveles concéntricos alrededor de un nodo raíz." },
]

const guideViewerExamples: Array<{
  label: string
  source: string
  engine?: LayoutEngine
}> = [
  { label: "Flujo", source: examples.flujo },
  { label: "Árbol", source: examples.arbol },
  { label: "Clases", source: examples.clases },
  { label: "Clústeres", source: examples.clusters },
  { label: "Posiciones", source: examples.posicion, engine: "neato" },
]

const structureViewerExamples: Array<{
  label: string
  source: string
}> = [
  { label: "Arreglo", source: examples.arreglo },
  { label: "Matriz", source: examples.matriz },
  { label: "Matriz dispersa", source: examples.matrizDispersa },
  { label: "Lista simple", source: examples.listaSimple },
  { label: "Lista doble", source: examples.listaDoble },
  { label: "Lista circular", source: examples.listaCircular },
  { label: "Pila", source: examples.pila },
  { label: "Cola", source: examples.cola },
  { label: "Árbol BST", source: examples.arbolBusqueda },
  { label: "Heap", source: examples.heap },
  { label: "Tabla hash", source: examples.tablaHash },
  { label: "Lista de adyacencia", source: examples.listaAdyacencia },
]

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
  const [engine, setEngine] = useState<LayoutEngine>("dot")
  const [status, setStatus] = useState<ViewerStatus>("idle")
  const [message, setMessage] = useState("Seleccione Renderizar para generar el SVG.")
  const [svgMarkup, setSvgMarkup] = useState("")
  const outputRef = useRef<HTMLDivElement>(null)

  const renderGraph = async () => {
    setStatus("loading")
    setMessage("Cargando Graphviz y procesando DOT…")

    try {
      const viz = await loadViz()
      const svg = viz.renderSVGElement(source, { engine })
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
      setMessage(`SVG generado correctamente con ${engine}.`)
    } catch (error) {
      outputRef.current?.replaceChildren()
      setSvgMarkup("")
      setStatus("error")
      setMessage(error instanceof Error ? error.message : "No se pudo procesar el código DOT.")
    }
  }

  const loadExample = (dot: string, nextEngine: LayoutEngine = "dot") => {
    setSource(dot)
    setEngine(nextEngine)
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
            ["#nodos", "NODOS"],
            ["#aristas", "ARISTAS"],
            ["#posicion", "POSICIÓN"],
            ["#clusters", "CLÚSTERES"],
            ["#motores", "MOTORES"],
            ["#estructuras", "ESTRUCTURAS"],
            ["#csharp", "C#"],
            ["#visor", "VISOR"],
            ["#referencia", "SALIDA"],
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
              Definición de grafos con DOT, estructuras de datos, generación desde C# y exportación a SVG, PNG o PDF.
            </p>
          </div>
          <div className="flex min-w-0 flex-col justify-center gap-5">
            <DotBlock code={dotBasic} label="cursos.dot" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {["Nodos", "Atributos", "Estructuras", "Exportación"].map((item, index) => (
                <div key={item} className={cn("border-4 border-[var(--gv-ink)] p-3 text-center text-xs font-extrabold uppercase", index === 3 ? "bg-[var(--gv-orange)] text-white" : "bg-[var(--gv-surface)]")}>{item}</div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section id="dot" className="bg-[var(--gv-surface)]">
        <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-10 lg:px-12">
          <SectionTitle number="01" title="Sintaxis y tipos" description="DOT define grafos, nodos, aristas, subgrafos y atributos. graph utiliza aristas sin dirección; digraph utiliza aristas dirigidas." />
          <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
            <DotBlock code={dotBasic} label="grafo dirigido" />
            <div className="grid gap-4">
              {[
                ["digraph", "Declara un grafo dirigido."],
                ["A -> B", "Crea una arista con dirección."],
                ["graph", "Declara un grafo no dirigido."],
                ["A -- B", "Crea una arista sin dirección."],
                ["strict", "Impide aristas duplicadas entre el mismo par de nodos."],
                ["subgraph", "Agrupa sentencias, atributos o restricciones de rango."],
              ].map(([term, detail]) => (
                <article key={term} className="grid grid-cols-[7rem_1fr] gap-4 border-4 border-[var(--gv-ink)] bg-white p-4">
                  <code className="font-extrabold text-[var(--gv-accent)]">{term}</code>
                  <p className="text-sm font-semibold">{detail}</p>
                </article>
              ))}
            </div>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["Identificadores", "Pueden ser nombres simples, números o cadenas entre comillas. Use comillas si contienen espacios o símbolos."],
              ["Comentarios", "DOT acepta // línea, /* bloque */ y líneas iniciadas con # para preprocesador."],
              ["Sentencias", "El punto y coma y la coma son separadores opcionales; utilizarlos mejora la lectura."],
            ].map(([title, detail]) => <article key={title} className="border-4 border-[var(--gv-ink)] bg-[var(--gv-wash)] p-5"><h3 className="font-extrabold uppercase">{title}</h3><p className="mt-3 text-sm leading-relaxed font-semibold">{detail}</p></article>)}
          </div>
        </div>
      </section>

      <section id="atributos" className="bg-[var(--gv-wash)]">
        <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-10 lg:px-12">
          <SectionTitle number="02" title="Atributos y ámbitos" description="Los atributos son pares nombre=valor. graph, node y edge definen valores predeterminados; una sentencia individual puede sobrescribirlos." />
          <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr]">
            <DotBlock code={dotScopes} label="ámbitos.dot" />
            <div className="grid gap-4">
              {[
                ["graph [ ]", "Lienzo, motor, dirección, separación, rutas y fondo."],
                ["node [ ]", "Valores predeterminados para los nodos declarados después."],
                ["edge [ ]", "Valores predeterminados para las aristas declaradas después."],
                ["A [ ]", "Atributos exclusivos del nodo A."],
                ["A -> B [ ]", "Atributos exclusivos de esa arista."],
                ["subgraph [ ]", "Ámbito local para declaraciones y valores predeterminados."],
              ].map(([scope, detail]) => <article key={scope} className="grid grid-cols-[8rem_1fr] gap-4 border-4 border-[var(--gv-ink)] bg-white p-4"><code className="font-extrabold text-[var(--gv-accent)]">{scope}</code><p className="text-sm font-semibold">{detail}</p></article>)}
            </div>
          </div>
          <div className="mt-10 overflow-x-auto border-4 border-[var(--gv-ink)] bg-white">
            <table className="w-full min-w-[760px] border-collapse text-left text-sm">
              <thead className="bg-[var(--gv-ink)] text-[var(--gv-bg)]"><tr><th className="p-4">Ámbito</th><th className="p-4">Atributos frecuentes</th><th className="p-4">Función</th></tr></thead>
              <tbody className="[&_tr:not(:last-child)]:border-b-2 [&_tr]:border-[var(--gv-ink)]">
                {[
                  ["Grafo", "rankdir, nodesep, ranksep, splines, overlap, bgcolor, pad, dpi", "Distribución general y salida"],
                  ["Nodo", "label, shape, style, color, fillcolor, fontcolor, width, height, margin", "Contenido y apariencia"],
                  ["Arista", "label, color, style, penwidth, dir, arrowhead, arrowtail, minlen, weight", "Conexión y restricciones"],
                  ["Clúster", "label, color, bgcolor, style, margin, labelloc, labeljust", "Agrupación visual"],
                ].map(([scope, attrs, use]) => <tr key={scope}><th className="p-4 font-extrabold text-[var(--gv-accent)]">{scope}</th><td className="p-4 font-mono text-xs">{attrs}</td><td className="p-4 font-semibold">{use}</td></tr>)}
              </tbody>
            </table>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              ["Colores", "color modifica el trazo, fillcolor el relleno y fontcolor el texto. Aceptan nombres, hexadecimal y esquemas mediante colorscheme."],
              ["Tipografía", "fontname, fontsize y fontcolor existen en grafos, nodos, aristas y clústeres. El resultado depende de las fuentes disponibles."],
              ["Unidades", "La mayoría de dimensiones independientes del dispositivo utilizan pulgadas o puntos. dpi modifica la resolución de salidas ráster."],
            ].map(([title, detail]) => <article key={title} className="border-4 border-[var(--gv-ink)] bg-[var(--gv-surface)] p-5"><h3 className="font-extrabold uppercase">{title}</h3><p className="mt-3 text-sm leading-relaxed font-semibold">{detail}</p></article>)}
          </div>
        </div>
      </section>

      <section id="nodos" className="bg-[var(--gv-surface)]">
        <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-10 lg:px-12">
          <SectionTitle number="03" title="Nodos, formas y etiquetas" description="Los nodos se crean al declarar su identificador o al utilizarlos en una arista. shape define su geometría; label define su contenido visible." />
          <div className="grid gap-10 lg:grid-cols-2">
            <DotBlock code={dotShapes} label="formas.dot" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              {[
                ["box", "Proceso"], ["ellipse", "Elemento general"], ["circle", "Estado"],
                ["diamond", "Decisión"], ["parallelogram", "Entrada/salida"], ["note", "Documento"],
                ["cylinder", "Base de datos"], ["component", "Componente"], ["doublecircle", "Estado final"],
              ].map(([shape, use]) => <article key={shape} className="border-4 border-[var(--gv-ink)] bg-white p-4"><code className="font-extrabold text-[var(--gv-accent)]">{shape}</code><p className="mt-2 text-xs font-semibold">{use}</p></article>)}
            </div>
          </div>
          <div className="mt-10 grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
            <div><h3 className="mb-4 font-[family-name:var(--font-display)] text-3xl uppercase">Etiquetas estructuradas</h3><DotBlock code={dotLabels} label="etiquetas.dot" /></div>
            <div className="flex flex-col gap-4">
              {[
                ["Texto", "label=\"línea 1\\nlínea 2\" admite saltos y alineación con \\n, \\l y \\r."],
                ["Record", "shape=record divide el nodo con | y permite puertos mediante <nombre>."],
                ["HTML-like", "label=<...> admite TABLE, TR, TD, estilos de texto y puertos."],
                ["Tamaño", "width y height son mínimos; fixedsize=true impide ajustar la forma al texto."],
                ["Estilo", "filled, rounded, dashed, dotted, bold e invis pueden combinarse."],
              ].map(([title, detail]) => <article key={title} className="border-l-[8px] border-[var(--gv-orange)] bg-[var(--gv-wash)] p-5"><h4 className="font-extrabold uppercase">{title}</h4><p className="mt-2 text-sm leading-relaxed font-semibold">{detail}</p></article>)}
            </div>
          </div>
        </div>
      </section>

      <section id="aristas">
        <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-10 lg:px-12">
          <SectionTitle number="04" title="Aristas, flechas y puertos" description="Las aristas conectan nodos. Sus atributos controlan dirección visual, puntas, etiquetas, grosor, ruta y punto exacto de conexión." />
          <div className="grid gap-10 lg:grid-cols-[1.05fr_.95fr]">
            <DotBlock code={dotEdges} label="aristas.dot" />
            <div className="grid gap-3 sm:grid-cols-2">
              {[
                ["dir", "forward · back · both · none"],
                ["arrowhead", "normal · empty · diamond · vee · dot"],
                ["arrowtail", "Punta en el origen; requiere dir=back o both"],
                ["arrowsize", "Escala de las puntas"],
                ["penwidth", "Grosor del trazo"],
                ["label", "Texto centrado en la arista"],
                ["headlabel", "Texto próximo al destino"],
                ["taillabel", "Texto próximo al origen"],
                ["headport", "Puerto o punto cardinal del destino"],
                ["tailport", "Puerto o punto cardinal del origen"],
              ].map(([name, detail]) => <article key={name} className="border-4 border-[var(--gv-ink)] bg-[var(--gv-surface)] p-4"><code className="font-extrabold text-[var(--gv-accent)]">{name}</code><p className="mt-2 text-xs leading-relaxed font-semibold">{detail}</p></article>)}
            </div>
          </div>
          <div className="mt-8 border-4 border-[var(--gv-ink)] bg-[var(--gv-orange)] p-5 font-mono text-sm font-bold text-white">
            Los puntos cardinales válidos son n, ne, e, se, s, sw, w, nw y c. Un puerto se usa como nodo:puerto:punto, por ejemplo registro:rol:e.
          </div>
        </div>
      </section>

      <section id="posicion" className="bg-[var(--gv-wash)]">
        <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-10 lg:px-12">
          <SectionTitle number="05" title="Posicionamiento" description="Graphviz calcula posiciones según el motor. En dot se controlan niveles y restricciones; en neato y fdp pueden proporcionarse coordenadas iniciales o fijas." />
          <div className="grid gap-10 lg:grid-cols-[1.1fr_.9fr]">
            <DotBlock code={dotPositioning} label="posicionamiento-dot.dot" />
            <div className="grid gap-3">
              {[
                ["rankdir", "TB, BT, LR o RL define la dirección de los niveles en dot."],
                ["rank=same", "Coloca nodos de un subgrafo en el mismo nivel."],
                ["nodesep", "Separación mínima entre nodos del mismo nivel, en pulgadas."],
                ["ranksep", "Separación mínima entre niveles; equally iguala distancias entre centros."],
                ["minlen", "Número mínimo de niveles que ocupa una arista en dot."],
                ["weight", "Un peso mayor favorece aristas más cortas y rectas en dot."],
                ["constraint=false", "La arista se dibuja pero no participa en la asignación de niveles."],
                ["ordering", "Conserva el orden de aristas entrantes o salientes."],
                ["group", "Agrupa nodos para alinear aristas y reducir cruces."],
              ].map(([name, detail]) => <article key={name} className="grid grid-cols-[9rem_1fr] gap-4 border-4 border-[var(--gv-ink)] bg-white p-4"><code className="font-extrabold text-[var(--gv-accent)]">{name}</code><p className="text-sm font-semibold">{detail}</p></article>)}
            </div>
          </div>
          <div className="mt-10 grid gap-6 lg:grid-cols-2">
            <div className="border-4 border-[var(--gv-ink)] bg-[var(--gv-surface)] p-6"><h3 className="font-[family-name:var(--font-display)] text-2xl uppercase">Rutas de aristas</h3><p className="mt-3 text-sm leading-relaxed font-semibold"><code>splines</code> acepta spline, line, polyline, ortho, curved o none. <code>ortho</code> no maneja correctamente puertos ni etiquetas de arista en algunos casos.</p></div>
            <div className="border-4 border-[var(--gv-ink)] bg-[var(--gv-surface)] p-6"><h3 className="font-[family-name:var(--font-display)] text-2xl uppercase">Posiciones manuales</h3><p className="mt-3 text-sm leading-relaxed font-semibold"><code>{'pos="x,y!"'}</code> con <code>pin=true</code> fija nodos en neato o fdp. <code>overlap=false</code> puede modificar coordenadas para evitar superposición.</p></div>
          </div>
        </div>
      </section>

      <section id="clusters" className="bg-[var(--gv-surface)]">
        <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-20 sm:px-10 lg:grid-cols-[.9fr_1.1fr] lg:px-12">
          <div>
            <SectionTitle number="06" title="Subgrafos y clústeres" description="Un subgrafo agrupa declaraciones y restricciones. Un subgrafo cuyo nombre inicia con cluster recibe tratamiento visual especial en motores compatibles." />
            <div className="grid gap-3">
              {[
                ["subgraph", "Agrupación lógica, ámbito de atributos o restricción de rango."],
                ["cluster_*", "Convención que crea una región visual alrededor de sus nodos."],
                ["compound=true", "Permite enrutar aristas hacia los límites de clústeres en dot."],
                ["lhead", "Clúster lógico de destino para una arista."],
                ["ltail", "Clúster lógico de origen para una arista."],
              ].map(([name, detail]) => <article key={name} className="border-l-[8px] border-[var(--gv-accent)] bg-[var(--gv-wash)] p-4"><code className="font-extrabold">{name}</code><p className="mt-2 text-sm font-semibold">{detail}</p></article>)}
            </div>
          </div>
          <DotBlock code={dotClusters} label="clusters.dot" />
        </div>
      </section>

      <section id="motores" className="bg-[var(--gv-ink)] text-[var(--gv-bg)]">
        <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-10 lg:px-12">
          <SectionTitle number="07" title="Motores de layout" description="Cada motor aplica un algoritmo distinto. La elección depende de la estructura y del objetivo del diagrama." />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {layoutEngines.map(({ id, use, detail }) => <article key={id} className="border-4 border-[var(--gv-bg)] bg-[var(--gv-bg)] p-5 text-[var(--gv-ink)] shadow-[6px_6px_0_var(--gv-orange)]"><code className="text-xl font-extrabold text-[var(--gv-accent)]">{id}</code><h3 className="mt-3 font-extrabold uppercase">{use}</h3><p className="mt-2 text-sm leading-relaxed font-semibold">{detail}</p></article>)}
          </div>
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {[["osage", "Clústeres organizados en arreglos"], ["patchwork", "Mapa de áreas tipo treemap"], ["nop / nop2", "Salida con posiciones ya calculadas"]].map(([engineName, use]) => <div key={engineName} className="border-2 border-white/30 p-4"><code className="font-extrabold text-[var(--gv-orange)]">{engineName}</code><p className="mt-2 text-xs font-semibold">{use}</p></div>)}
          </div>
        </div>
      </section>

      <section id="estructuras" className="bg-[var(--gv-wash)]">
        <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-10 lg:px-12">
          <SectionTitle number="08" title="Estructuras de datos" description="Graphviz representa la estructura y sus referencias. Las etiquetas HTML muestran celdas; los puertos identifican campos; las aristas modelan enlaces, índices y relaciones." />

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[
              ["Arreglo", "Tabla de una fila", "shape=plain + TABLE", "dot"],
              ["Matriz", "Filas y columnas", "TABLE + puertos fNcN", "dot"],
              ["Matriz dispersa", "Cabeceras y celdas ocupadas", "rank=same + dos colores", "dot"],
              ["Lista simple", "Dato y siguiente", "record + puertos", "dot"],
              ["Lista doble", "Anterior, dato y siguiente", "TABLE + constraint=false", "dot"],
              ["Lista circular", "Último enlaza al primero", "constraint=false", "dot / circo"],
              ["Pila", "Acceso LIFO desde el tope", "rankdir=TB", "dot"],
              ["Cola", "Frente y final FIFO", "rankdir=LR", "dot"],
              ["Árbol BST", "Hijos menores y mayores", "jerarquía dirigida", "dot"],
              ["Heap", "Árbol completo e índices", "niveles jerárquicos", "dot"],
              ["Tabla hash", "Cubetas y colisiones", "record + encadenamiento", "dot"],
              ["Lista de adyacencia", "Vértices y vecinos", "record + listas", "dot"],
            ].map(([name, model, technique, recommendedEngine]) => (
              <article key={name} className="border-4 border-[var(--gv-ink)] bg-[var(--gv-surface)] p-5 shadow-[5px_5px_0_var(--gv-accent)]">
                <h3 className="font-[family-name:var(--font-display)] text-2xl uppercase">{name}</h3>
                <p className="mt-2 text-sm leading-relaxed font-semibold">{model}</p>
                <code className="mt-4 block border-t-2 border-[var(--gv-ink)] pt-3 text-xs font-extrabold text-[var(--gv-accent)]">{technique}</code>
                <Badge className="mt-3 h-auto rounded-none bg-[var(--gv-orange)] font-mono text-[10px] uppercase">Motor: {recommendedEngine}</Badge>
              </article>
            ))}
          </div>

          <div className="mt-14 grid gap-10 xl:grid-cols-2">
            <div>
              <h3 className="mb-4 font-[family-name:var(--font-display)] text-3xl uppercase">Arreglo</h3>
              <DotBlock code={dotArray} label="arreglo.dot" />
            </div>
            <div>
              <h3 className="mb-4 font-[family-name:var(--font-display)] text-3xl uppercase">Matriz</h3>
              <DotBlock code={dotMatrix} label="matriz.dot" />
            </div>
            <div>
              <h3 className="mb-4 font-[family-name:var(--font-display)] text-3xl uppercase">Lista circular</h3>
              <DotBlock code={dotCircularLinkedList} label="lista-circular.dot" />
            </div>
            <div>
              <h3 className="mb-4 font-[family-name:var(--font-display)] text-3xl uppercase">Tabla hash</h3>
              <DotBlock code={dotHashTable} label="tabla-hash.dot" />
            </div>
          </div>

          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {[
              ["Identidad", "Use identificadores DOT estables y únicos. El texto visible debe ir en label; no utilice valores repetidos como identificadores."],
              ["Referencias", "Asigne un puerto a cada campo que almacena una referencia. Conecte sig, ant, hijo, cubeta o vecino desde ese puerto."],
              ["Nulos y ciclos", "Represente null con un nodo de texto. En ciclos, constraint=false evita que el enlace de retorno altere el orden principal."],
              ["Índices", "Incluya índices en arreglos, matrices y heaps. En una matriz use puertos como f2c1 para localizar cada celda."],
              ["Orden", "dot es adecuado cuando importa el orden. circo puede destacar el ciclo, pero no conserva una lectura lineal de la lista."],
              ["Escala", "En estructuras grandes muestre una porción, agrupe niveles o cambie a sfdp. Demasiadas etiquetas reducen la legibilidad."],
            ].map(([title, detail]) => (
              <article key={title} className="border-l-[8px] border-[var(--gv-orange)] bg-white p-5">
                <h4 className="font-extrabold uppercase">{title}</h4>
                <p className="mt-2 text-sm leading-relaxed font-semibold">{detail}</p>
              </article>
            ))}
          </div>

          <div className="mt-10 border-4 border-[var(--gv-ink)] bg-[var(--gv-ink)] p-6 text-[var(--gv-bg)]">
            <h3 className="font-[family-name:var(--font-display)] text-3xl uppercase">Galería interactiva</h3>
            <p className="mt-3 max-w-4xl text-sm leading-relaxed font-semibold">Los doce ejemplos completos están disponibles en el visor. Seleccione una estructura, edite valores o conexiones y renderice el resultado.</p>
            <a href="#visor" className="mt-5 inline-block border-4 border-[var(--gv-bg)] bg-[var(--gv-orange)] px-5 py-3 font-mono text-sm font-extrabold text-white no-underline hover:bg-[var(--gv-accent)]">Abrir visor</a>
          </div>
        </div>
      </section>

      <section id="csharp">
        <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-10 lg:px-12">
          <SectionTitle number="09" title="Generación desde C#" description="C# puede construir el texto DOT, convertir estructuras de datos, guardar archivos y ejecutar Graphviz mediante el comando dot instalado en el sistema." />
          <div className="grid gap-10 xl:grid-cols-2">
            <div className="min-w-0"><h3 className="mb-4 font-[family-name:var(--font-display)] text-3xl uppercase">Construcción del archivo</h3><div className="border-[6px] border-[var(--gv-ink)] bg-[var(--gv-ink)]"><CodeBlock code={csharpBuilder} language="csharp" variant="dark" style={{ padding: 20, fontSize: 14, lineHeight: 1.7, overflow: "auto" }} /></div></div>
            <div className="min-w-0"><h3 className="mb-4 font-[family-name:var(--font-display)] text-3xl uppercase">Ejecución de Graphviz</h3><div className="border-[6px] border-[var(--gv-ink)] bg-[var(--gv-ink)]"><CodeBlock code={csharpProcess} language="csharp" variant="dark" style={{ padding: 20, fontSize: 14, lineHeight: 1.7, overflow: "auto" }} /></div></div>
          </div>
          <div className="mt-10 min-w-0">
            <h3 className="mb-4 font-[family-name:var(--font-display)] text-3xl uppercase">Matriz desde C#</h3>
            <div className="border-[6px] border-[var(--gv-ink)] bg-[var(--gv-ink)]"><CodeBlock code={csharpMatrix} language="csharp" variant="dark" style={{ padding: 20, fontSize: 14, lineHeight: 1.7, overflow: "auto" }} /></div>
          </div>
          <div className="mt-8 border-4 border-[var(--gv-ink)] bg-[var(--gv-orange)] p-5 font-mono text-sm font-bold text-white">
            Valide identificadores y escape comillas y barras invertidas antes de incluir datos externos en DOT. No concatene texto sin validar dentro de los argumentos del proceso.
          </div>
        </div>
      </section>

      <section id="visor" className="bg-[var(--gv-surface)]">
        <div className="mx-auto max-w-[1600px] px-5 py-20 sm:px-10 lg:px-12">
          <SectionTitle number="10" title="Visor DOT" description="Edite el código, seleccione el motor, procese el grafo con Graphviz WebAssembly y descargue el resultado en SVG." />
          <div className="mb-7 grid gap-5">
            <div>
              <h3 className="mb-3 font-mono text-xs font-extrabold tracking-wider uppercase">Ejemplos generales</h3>
              <div className="flex flex-wrap gap-3">
                {guideViewerExamples.map(({ label, source: exampleSource, engine: exampleEngine }) => (
                  <Button key={label} type="button" variant="outline" onClick={() => loadExample(exampleSource, exampleEngine)} className="rounded-none border-4 border-[var(--gv-ink)] font-mono font-extrabold">{label}</Button>
                ))}
              </div>
            </div>
            <div>
              <h3 className="mb-3 font-mono text-xs font-extrabold tracking-wider uppercase">Estructuras de datos</h3>
              <div className="flex flex-wrap gap-3">
                {structureViewerExamples.map(({ label, source: exampleSource }) => (
                  <Button key={label} type="button" variant="outline" onClick={() => loadExample(exampleSource)} className="rounded-none border-4 border-[var(--gv-ink)] bg-[var(--gv-wash)] font-mono font-extrabold">{label}</Button>
                ))}
              </div>
            </div>
          </div>
          <div className="grid gap-8 xl:grid-cols-2">
            <FieldGroup>
              <Field>
                <FieldLabel className="font-mono text-sm font-extrabold tracking-wider uppercase">Motor de layout</FieldLabel>
                <FieldDescription>dot para jerarquías; neato, fdp y sfdp para redes; circo para ciclos; twopi para diagramas radiales.</FieldDescription>
                <ToggleGroup
                  value={[engine]}
                  onValueChange={(values) => {
                    const nextEngine = values[0] as LayoutEngine | undefined
                    if (!nextEngine) return
                    setEngine(nextEngine)
                    setStatus("idle")
                    setMessage(`Motor ${nextEngine} seleccionado. Seleccione Renderizar.`)
                    setSvgMarkup("")
                    outputRef.current?.replaceChildren()
                  }}
                  variant="outline"
                  size="sm"
                  className="flex w-full flex-wrap justify-start"
                >
                  {layoutEngines.map(({ id }) => (
                    <ToggleGroupItem key={id} value={id} aria-label={`Usar motor ${id}`} className="rounded-none border-2 border-[var(--gv-ink)] font-mono font-extrabold data-pressed:bg-[var(--gv-orange)] data-pressed:text-white">
                      {id}
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </Field>
              <Field data-invalid={status === "error"}>
                <FieldLabel htmlFor="dot-source" className="font-mono text-sm font-extrabold tracking-wider uppercase">Código DOT</FieldLabel>
                <FieldDescription>El visor genera el SVG localmente. Algunos atributos solo funcionan con motores específicos.</FieldDescription>
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
        <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-10 lg:px-12">
          <SectionTitle number="11" title="Instalación y salida" description="La línea de comandos selecciona el motor, el formato de salida y los archivos. -G, -N y -E permiten sobrescribir atributos de grafo, nodo y arista." />
          <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
            <div className="flex flex-col gap-5 text-[var(--gv-ink)]">
              <div className="bg-[var(--gv-bg)] p-5"><h3 className="font-extrabold uppercase">Instalación</h3><div className="mt-3 grid gap-2 font-mono text-xs"><code>brew install graphviz</code><code>sudo apt install graphviz</code><code>winget install graphviz</code></div></div>
              <div className="bg-[var(--gv-bg)] p-5"><h3 className="font-extrabold uppercase">Formatos vectoriales</h3><p className="mt-2 text-sm font-semibold">svg, svgz, pdf, ps, eps</p></div>
              <div className="bg-[var(--gv-bg)] p-5"><h3 className="font-extrabold uppercase">Formatos ráster</h3><p className="mt-2 text-sm font-semibold">png, jpg, gif, webp</p></div>
              <div className="bg-[var(--gv-bg)] p-5"><h3 className="font-extrabold uppercase">Formatos de datos</h3><p className="mt-2 text-sm font-semibold">dot, xdot, plain, json, cmap</p></div>
            </div>
            <DotBlock code={commandExamples} label="terminal" />
          </div>
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              ["-T", "Formato de salida: -Tsvg, -Tpng, -Tpdf."],
              ["-K", "Motor de layout: -Kdot, -Kneato, -Kcirco."],
              ["-o", "Archivo de salida; sin -o, el resultado se escribe en stdout."],
              ["-O", "Genera el nombre de salida a partir del archivo de entrada."],
            ].map(([flag, detail]) => <article key={flag} className="border-2 border-white/30 p-4"><code className="text-lg font-extrabold text-[var(--gv-orange)]">{flag}</code><p className="mt-2 text-xs leading-relaxed font-semibold">{detail}</p></article>)}
          </div>
        </div>
      </section>
    </main>
  )
}
