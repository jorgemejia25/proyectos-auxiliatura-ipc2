"use client"

import { useMemo, useState } from "react"
import { Button, Card, Chip, Input, Table } from "@heroui/react"
import {
  ArrowDownIcon,
  BookOpenIcon,
  CalculatorIcon,
  GitBranchIcon,
  RotateCcwIcon,
  ScaleIcon,
} from "lucide-react"

type TreeNode = {
  value: number
  left: TreeNode | null
  right: TreeNode | null
}

type PositionedNode = {
  value: number
  x: number
  y: number
  parentX?: number
  parentY?: number
}

const INITIAL_VALUES = [50, 30, 70, 20, 40, 60, 80]

function insert(root: TreeNode | null, value: number): TreeNode {
  if (!root) return { value, left: null, right: null }
  if (value < root.value) return { ...root, left: insert(root.left, value) }
  if (value > root.value) return { ...root, right: insert(root.right, value) }
  return root
}

function buildTree(values: number[]) {
  return values.reduce<TreeNode | null>((tree, value) => insert(tree, value), null)
}

function height(node: TreeNode | null): number {
  return node ? 1 + Math.max(height(node.left), height(node.right)) : -1
}

function traverse(node: TreeNode | null, mode: "pre" | "in" | "post", result: number[] = []) {
  if (!node) return result
  if (mode === "pre") result.push(node.value)
  traverse(node.left, mode, result)
  if (mode === "in") result.push(node.value)
  traverse(node.right, mode, result)
  if (mode === "post") result.push(node.value)
  return result
}

function levels(root: TreeNode | null) {
  if (!root) return []
  const result: number[] = []
  const queue = [root]
  while (queue.length) {
    const node = queue.shift()!
    result.push(node.value)
    if (node.left) queue.push(node.left)
    if (node.right) queue.push(node.right)
  }
  return result
}

function positionTree(root: TreeNode | null) {
  const nodes: PositionedNode[] = []
  const walk = (
    node: TreeNode | null,
    depth: number,
    minX: number,
    maxX: number,
    parent?: { x: number; y: number }
  ) => {
    if (!node) return
    const x = (minX + maxX) / 2
    const y = 48 + depth * 88
    nodes.push({ value: node.value, x, y, parentX: parent?.x, parentY: parent?.y })
    walk(node.left, depth + 1, minX, x, { x, y })
    walk(node.right, depth + 1, x, maxX, { x, y })
  }
  walk(root, 0, 30, 770)
  return nodes
}

const formulas = [
  { title: "Aristas", formula: "e = n − 1", note: "Todo árbol conectado con n nodos tiene exactamente n − 1 aristas." },
  { title: "Máximo por nivel", formula: "Nₖ = 2ᵏ", note: "En un árbol binario, el nivel k admite como máximo 2ᵏ nodos." },
  { title: "Máximo con altura h", formula: "N = 2ʰ⁺¹ − 1", note: "Se alcanza cuando todos los niveles están completos." },
  { title: "Altura mínima", formula: "hₘᵢₙ = ⌊log₂ n⌋", note: "La mejor altura posible para n nodos, usando raíz en el nivel 0." },
]

const nodeCode = `public class Nodo
{
    public int Valor { get; }
    public Nodo? Izquierdo { get; set; }
    public Nodo? Derecho { get; set; }

    public Nodo(int valor) => Valor = valor;
}`

const searchCode = `public Nodo? Buscar(int valor)
{
    Nodo? actual = Raiz;

    while (actual != null)
    {
        if (valor == actual.Valor) return actual;
        actual = valor < actual.Valor
            ? actual.Izquierdo
            : actual.Derecho;
    }

    return null;
}`

export function TreesLabView() {
  const [values, setValues] = useState(INITIAL_VALUES)
  const [input, setInput] = useState(45)
  const [nodeCount, setNodeCount] = useState(15)
  const root = useMemo(() => buildTree(values), [values])
  const positioned = useMemo(() => positionTree(root), [root])
  const treeHeight = height(root)
  const minHeight = nodeCount > 0 ? Math.floor(Math.log2(nodeCount)) : 0

  const addValue = () => {
    if (!Number.isFinite(input) || values.includes(input)) return
    setValues((current) => [...current, input])
  }

  return (
    <main className="min-h-screen bg-[#000000] text-[#ECEDEE]">
      <section className="relative overflow-hidden border-b border-white/15 px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(0,111,238,.18),transparent_36%),linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:auto,36px_36px,36px_36px]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-7 flex flex-wrap gap-2">
            <Chip color="success" variant="soft">Árboles</Chip>
            <Chip variant="soft">ABB</Chip>
            <Chip variant="soft">AVL</Chip>
            <Chip variant="soft">O(h)</Chip>
          </div>
          <p className="mb-4 font-mono text-xs font-bold tracking-[.2em] text-[#006FEE] uppercase">Estructuras no lineales</p>
          <h1 className="max-w-5xl text-[clamp(3rem,8vw,7rem)] font-black leading-[.88] tracking-[-.06em] text-white">Árboles, ABB y AVL</h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-[#A1A1AA]">Curso progresivo de árboles: definición, estructura, representación, recorridos, árboles binarios de búsqueda y balance AVL.</p>
        </div>
      </section>

      <section className="border-b border-white/10 bg-[#050505] px-5 py-10 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <p className="mb-5 font-mono text-xs font-bold tracking-[.18em] text-[#006FEE] uppercase">Contenido del curso</p>
          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-5">
            {["Definición", "Terminología", "Clasificación", "Representación", "ABB", "Recorridos", "Cálculos", "Operaciones", "AVL", "C#"].map((lesson, index) => (
              <div key={lesson} className="bg-[#09090B] p-4"><span className="font-mono text-xs text-[#52525B]">{String(index + 1).padStart(2, "0")}</span><p className="mt-2 font-bold text-white">{lesson}</p></div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
        <SectionTitle number="01" title="Definición de árbol" subtitle="Concepto fundamental" />
        <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <Card className="border border-[#006FEE]/30 bg-[#0B1730]"><Card.Content className="p-7"><p className="font-mono text-xs text-[#66AAF9]">DEFINICIÓN</p><p className="mt-4 text-xl font-semibold leading-8 text-white">Un árbol es una estructura formada por un conjunto finito de nodos conectados mediante aristas. Existe un único nodo raíz y cada nodo restante tiene exactamente un padre.</p></Card.Content></Card>
          <Card className="border border-white/10 bg-[#09090B]"><Card.Content className="p-7"><p className="font-mono text-xs text-[#F31260]">CONDICIONES</p><ul className="mt-4 grid gap-3 text-sm leading-6 text-[#D4D4D8]"><li>• Es una estructura conectada.</li><li>• No contiene ciclos.</li><li>• Entre dos nodos existe un único camino.</li><li>• Con n nodos contiene n − 1 aristas.</li></ul></Card.Content></Card>
        </div>
        <Card className="mt-5 border border-white/10 bg-[#09090B]"><Card.Content className="grid gap-6 p-6 md:grid-cols-[.35fr_1fr]"><div><p className="text-sm font-bold text-[#66AAF9]">Ejemplo</p><p className="mt-2 font-mono text-2xl text-white">A → {`{ B, C }`}</p></div><p className="text-sm leading-7 text-[#A1A1AA]">A es la raíz. B y C son hijos directos de A. El árbol tiene 3 nodos y 2 aristas. Los caminos desde A hacia B y C tienen longitud 1.</p></Card.Content></Card>
      </section>

      <section className="border-y border-white/10 bg-[#050505]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
        <SectionTitle number="02" title="Terminología" subtitle="Relaciones y medidas" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["Raíz", "Único nodo sin padre.", "En 50 → {30, 70}, la raíz es 50."],
            ["Hoja", "Nodo que no tiene hijos.", "20, 40, 60 y 80 son hojas."],
            ["Nodo interno", "Nodo que tiene al menos un hijo.", "50, 30 y 70 son internos."],
            ["Grado", "Cantidad de hijos directos.", "El grado de 50 es 2."],
            ["Nivel", "Cantidad de aristas desde la raíz.", "30 está en el nivel 1."],
            ["Profundidad", "Distancia desde la raíz hasta un nodo.", "La profundidad de 20 es 2."],
            ["Altura", "Camino más largo hasta una hoja.", "La altura del árbol de ejemplo es 2."],
            ["Subárbol", "Nodo y todos sus descendientes.", "El subárbol de 30 contiene 30, 20 y 40."],
          ].map(([title, body, example]) => (
            <Card key={title} className="border border-white/10 bg-[#09090B]">
              <Card.Content className="p-5"><h3 className="text-lg font-bold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-[#D4D4D8]">{body}</p><p className="mt-4 border-t border-white/10 pt-3 text-xs leading-5 text-[#71717A]">Ejemplo: {example}</p></Card.Content>
            </Card>
          ))}
        </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
        <SectionTitle number="03" title="Clasificación" subtitle="Tipos de árboles" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            ["Árbol general", "Cada nodo puede tener cualquier cantidad de hijos.", "A tiene tres hijos: B, C y D."],
            ["Árbol N-ario", "Cada nodo puede tener como máximo N hijos.", "En un árbol ternario, el máximo es 3."],
            ["Árbol binario", "Cada nodo tiene como máximo dos hijos diferenciados: izquierdo y derecho.", "50 tiene hijo izquierdo 30 y derecho 70."],
            ["Árbol lleno", "Todo nodo tiene exactamente cero o dos hijos.", "Ningún nodo interno posee un solo hijo."],
            ["Árbol completo", "Todos los niveles están llenos salvo quizá el último, ocupado de izquierda a derecha.", "Un heap binario mantiene esta forma."],
            ["Árbol perfecto", "Todos los nodos internos tienen dos hijos y todas las hojas están al mismo nivel.", "Con altura 2 contiene 7 nodos."],
            ["Árbol balanceado", "Las alturas de los subárboles permanecen cercanas.", "Un AVL limita la diferencia a 1."],
            ["Árbol degenerado", "Cada nodo tiene un único hijo.", "Insertar 10, 20, 30 y 40 en un ABB produce altura 3."],
            ["Árbol de búsqueda", "Mantiene una regla de orden entre los subárboles y cada nodo.", "En un ABB: izquierda < nodo < derecha."],
          ].map(([title, definition, example]) => <Card key={title} className="border border-white/10 bg-[#09090B]"><Card.Content className="p-5"><h3 className="font-bold text-white">{title}</h3><p className="mt-3 text-sm leading-6 text-[#D4D4D8]">{definition}</p><p className="mt-4 text-xs leading-5 text-[#71717A]">Ejemplo: {example}</p></Card.Content></Card>)}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#050505]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
          <SectionTitle number="04" title="Representación" subtitle="Memoria y arreglo" />
          <div className="grid gap-5 lg:grid-cols-2">
            <Card className="border border-white/10 bg-[#09090B]"><Card.Content className="p-6"><h3 className="text-xl font-bold text-white">Nodos enlazados</h3><p className="mt-3 text-sm leading-6 text-[#A1A1AA]">Cada nodo almacena un valor y referencias a sus hijos. Una referencia nula indica que el hijo no existe.</p><pre className="mt-5 overflow-auto rounded-xl bg-black p-4 font-mono text-sm leading-6 text-[#66AAF9]">{nodeCode}</pre><p className="mt-4 text-xs text-[#71717A]">Ejemplo: el nodo 30 referencia a 20 por Izquierdo y a 40 por Derecho.</p></Card.Content></Card>
            <Card className="border border-white/10 bg-[#09090B]"><Card.Content className="p-6"><h3 className="text-xl font-bold text-white">Representación en arreglo</h3><p className="mt-3 text-sm leading-6 text-[#A1A1AA]">Se utiliza principalmente en árboles completos. Para un nodo situado en el índice i:</p><div className="mt-5 grid gap-3 font-mono text-sm"><p className="rounded-xl bg-[#0B1730] p-4 text-[#66AAF9]">izquierdo(i) = 2i + 1</p><p className="rounded-xl bg-[#0B1730] p-4 text-[#66AAF9]">derecho(i) = 2i + 2</p><p className="rounded-xl bg-[#0B1730] p-4 text-[#66AAF9]">padre(i) = ⌊(i − 1) / 2⌋</p></div><p className="mt-4 text-xs leading-5 text-[#71717A]">Ejemplo: para i = 2, sus hijos ocupan los índices 5 y 6; su padre ocupa el índice 0.</p></Card.Content></Card>
          </div>
        </div>
      </section>

      <section className="border-b border-white/10 bg-black">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
          <SectionTitle number="05" title="Árbol binario de búsqueda" subtitle="Orden e interacción" />
          <Card className="mb-6 border border-[#006FEE]/30 bg-[#0B1730]"><Card.Content className="grid gap-5 p-6 lg:grid-cols-[1fr_.8fr]"><div><p className="font-mono text-xs text-[#66AAF9]">DEFINICIÓN</p><p className="mt-3 leading-7 text-white">Un árbol binario de búsqueda es un árbol binario que mantiene una relación de orden global en cada nodo.</p></div><div className="font-mono text-sm leading-7 text-[#D4D4D8]"><p>claves(izquierda) &lt; nodo</p><p>claves(derecha) &gt; nodo</p><p className="mt-2 text-[#71717A]">Ejemplo: para la raíz 50, 30 pertenece al subárbol izquierdo y 70 al derecho.</p></div></Card.Content></Card>
          <div className="grid gap-6 lg:grid-cols-[1.45fr_.55fr]">
            <Card className="overflow-hidden border border-white/15 bg-[#000000]">
              <Card.Header className="flex flex-wrap items-center gap-3 border-b border-white/10 p-5">
                <div><Card.Title className="text-xl text-white">Visualizador ABB</Card.Title><Card.Description className="text-[#71717A]">Menores a la izquierda; mayores a la derecha.</Card.Description></div>
                <div className="ml-auto flex gap-2">
                  <Input aria-label="Valor del nodo" type="number" value={String(input)} onChange={(event) => setInput(Number(event.target.value))} onKeyDown={(event) => event.key === "Enter" && addValue()} className="w-24 border-white/15 bg-black font-mono text-sm text-white" />
                  <Button className="bg-[#006FEE] font-bold text-white hover:bg-[#338EF7]" onPress={addValue}>Insertar</Button>
                  <Button isIconOnly variant="secondary" aria-label="Reiniciar árbol" onPress={() => setValues(INITIAL_VALUES)}><RotateCcwIcon className="size-4" /></Button>
                </div>
              </Card.Header>
              <Card.Content className="p-3 sm:p-6">
                <svg viewBox={`0 0 800 ${Math.max(330, (treeHeight + 1) * 100)}`} role="img" aria-label="Árbol binario de búsqueda interactivo" className="min-h-80 w-full">
                  {positioned.map((node, index) => node.parentX === undefined ? null : <line key={`e-${index}`} x1={node.parentX} y1={node.parentY! + 24} x2={node.x} y2={node.y - 24} stroke="#27272A" strokeWidth="3" />)}
                  {positioned.map((node) => <g key={node.value}><circle cx={node.x} cy={node.y} r="26" fill="#0B1730" stroke="#006FEE" strokeWidth="3" /><text x={node.x} y={node.y + 6} textAnchor="middle" fill="white" fontSize="17" fontWeight="800">{node.value}</text></g>)}
                </svg>
              </Card.Content>
            </Card>

            <div className="grid content-start gap-4">
              <Metric label="Nodos" value={values.length} detail={`Aristas: ${Math.max(0, values.length - 1)}`} />
              <Metric label="Altura actual" value={treeHeight} detail={`${treeHeight + 1} niveles`} />
              <Metric label="Altura mínima" value={values.length ? Math.floor(Math.log2(values.length)) : 0} detail={treeHeight === Math.floor(Math.log2(values.length)) ? "Altura óptima" : "Puede balancearse mejor"} />
              <Card className="border border-[#006FEE]/30 bg-[#0B1730]"><Card.Content className="p-5"><p className="font-mono text-xs text-[#66AAF9]">INVARIANTE</p><p className="mt-2 text-sm font-semibold leading-6 text-white">izquierda &lt; nodo &lt; derecha, para todos los descendientes.</p></Card.Content></Card>
            </div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Traversal title="Preorden" rule="raíz · izq · der" values={traverse(root, "pre")} use="Clonar o serializar" />
            <Traversal title="Inorden" rule="izq · raíz · der" values={traverse(root, "in")} use="Obtener claves ordenadas" />
            <Traversal title="Posorden" rule="izq · der · raíz" values={traverse(root, "post")} use="Liberar o evaluar" />
            <Traversal title="Por niveles" rule="BFS · cola" values={levels(root)} use="Medir anchura" />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
        <SectionTitle number="06" title="Fórmulas y cálculos" subtitle="Altura, niveles y capacidad" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {formulas.map((item) => <Card key={item.title} className="border border-white/10 bg-[#09090B]"><Card.Content className="p-6"><p className="text-sm font-bold text-[#66AAF9]">{item.title}</p><p className="my-5 font-mono text-2xl font-bold text-white">{item.formula}</p><p className="text-sm leading-6 text-[#A1A1AA]">{item.note}</p></Card.Content></Card>)}
        </div>
        <Card className="mt-6 border border-[#006FEE]/30 bg-[#111113]">
          <Card.Content className="grid gap-8 p-6 lg:grid-cols-[.45fr_1fr] lg:items-center">
            <div><div className="mb-4 flex items-center gap-2 text-[#66AAF9]"><CalculatorIcon className="size-5" /><strong>Calculadora</strong></div><label className="text-sm text-[#A1A1AA]">Cantidad de nodos</label><Input aria-label="Cantidad de nodos" type="number" min={1} value={String(nodeCount)} onChange={(event) => setNodeCount(Math.max(1, Number(event.target.value)))} className="mt-2 w-full border-white/15 bg-black font-mono text-xl text-white" /></div>
            <div className="grid gap-3 sm:grid-cols-3"><Metric label="Aristas" value={nodeCount - 1} detail="n − 1" /><Metric label="Altura mínima" value={minHeight} detail={`⌊log₂ ${nodeCount}⌋`} /><Metric label="Altura máxima" value={nodeCount - 1} detail="Árbol degenerado" /></div>
          </Card.Content>
        </Card>
      </section>

      <section className="border-y border-white/10 bg-[#050505]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
          <SectionTitle number="07" title="Operaciones y complejidad" subtitle="Búsqueda, inserción y eliminación" />
          <div className="mb-6 grid gap-4 md:grid-cols-3">
            {[
              ["Búsqueda", "Se compara la clave con el nodo actual. Si es menor, se continúa a la izquierda; si es mayor, a la derecha.", "Buscar 60: 50 → 70 → 60."],
              ["Inserción", "Se ejecuta el mismo descenso que una búsqueda hasta encontrar una referencia nula. El nuevo nodo se inserta como hoja.", "Insertar 45: 50 → 30 → 40 → derecha."],
              ["Eliminación", "La operación depende de si el nodo tiene cero, uno o dos hijos. Después de eliminar, debe conservarse el orden del ABB.", "Eliminar 50: puede sustituirse por el sucesor 60."],
            ].map(([title, definition, example]) => <Card key={title} className="border border-white/10 bg-[#09090B]"><Card.Content className="p-5"><h3 className="font-bold text-white">{title}</h3><p className="mt-3 text-sm leading-6 text-[#D4D4D8]">{definition}</p><p className="mt-4 font-mono text-xs leading-5 text-[#66AAF9]">{example}</p></Card.Content></Card>)}
          </div>
          <Table className="overflow-hidden border border-white/10 bg-[#09090B]">
            <Table.ScrollContainer>
              <Table.Content aria-label="Complejidad de operaciones con árboles">
                <Table.Header className="bg-[#0B1730] text-xs uppercase tracking-wider text-[#66AAF9]">
                  <Table.Column isRowHeader>Operación</Table.Column><Table.Column>ABB equilibrado</Table.Column><Table.Column>ABB degenerado</Table.Column><Table.Column>AVL</Table.Column>
                </Table.Header>
                <Table.Body>
                  <Table.Row><Table.Cell className="font-bold">Buscar / insertar / eliminar</Table.Cell><Table.Cell className="font-mono">O(log n)</Table.Cell><Table.Cell className="font-mono text-[#F31260]">O(n)</Table.Cell><Table.Cell className="font-mono text-[#66AAF9]">O(log n) garantizado</Table.Cell></Table.Row>
                  <Table.Row><Table.Cell className="font-bold">Recorrer</Table.Cell><Table.Cell className="font-mono">O(n)</Table.Cell><Table.Cell className="font-mono">O(n)</Table.Cell><Table.Cell className="font-mono">O(n)</Table.Cell></Table.Row>
                  <Table.Row><Table.Cell className="font-bold">Memoria de recursión</Table.Cell><Table.Cell className="font-mono">O(log n)</Table.Cell><Table.Cell className="font-mono text-[#F31260]">O(n)</Table.Cell><Table.Cell className="font-mono">O(log n)</Table.Cell></Table.Row>
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
          <div className="mt-6 grid gap-4 md:grid-cols-3">{[["Eliminar hoja", "Se anula la referencia del padre."], ["Eliminar con un hijo", "El padre adopta al único hijo."], ["Eliminar con dos hijos", "Se reemplaza por el sucesor inorden y luego se elimina ese sucesor."]].map(([title, body], index) => <Card key={title} className="border border-white/10 bg-[#09090B]"><Card.Content className="p-5"><span className="font-mono text-xs text-[#006FEE]">CASO {index + 1}</span><h3 className="mt-2 text-lg font-bold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-[#A1A1AA]">{body}</p></Card.Content></Card>)}</div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
        <SectionTitle number="08" title="Balance AVL" subtitle="Factor de balance y rotaciones" />
        <div className="grid gap-6 lg:grid-cols-[.7fr_1.3fr]">
          <Card className="border border-[#006FEE]/30 bg-[#0B1730]"><Card.Content className="p-7"><ScaleIcon className="size-7 text-[#66AAF9]" /><p className="mt-5 font-mono text-2xl font-bold text-white">FB(v) = h(izq) − h(der)</p><p className="mt-4 leading-7 text-[#D4D4D8]">Un AVL exige que el factor de cada nodo sea −1, 0 o 1. Si llega a ±2 después de insertar o eliminar, se aplica una rotación.</p></Card.Content></Card>
          <div className="grid gap-3 sm:grid-cols-2">{[["LL", "Rotación simple a la derecha", "+2 y el nuevo nodo está a la izquierda"], ["RR", "Rotación simple a la izquierda", "−2 y el nuevo nodo está a la derecha"], ["LR", "Izquierda y luego derecha", "+2 con inserción derecha-izquierda"], ["RL", "Derecha y luego izquierda", "−2 con inserción izquierda-derecha"]].map(([code, title, note]) => <Card key={code} className="border border-white/10 bg-[#09090B]"><Card.Content className="flex gap-4 p-5"><span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#006FEE] font-mono font-black text-white">{code}</span><div><h3 className="font-bold text-white">{title}</h3><p className="mt-1 text-sm leading-5 text-[#A1A1AA]">{note}</p></div></Card.Content></Card>)}</div>
        </div>
        <Card className="mt-6 border border-white/10 bg-[#09090B]"><Card.Content className="p-6"><h3 className="font-bold text-white">Proceso de rebalanceo</h3><ol className="mt-4 grid gap-3 text-sm leading-6 text-[#D4D4D8] md:grid-cols-4"><li><span className="mr-2 font-mono text-[#006FEE]">1.</span>Insertar como en un ABB.</li><li><span className="mr-2 font-mono text-[#006FEE]">2.</span>Actualizar alturas desde el nodo insertado.</li><li><span className="mr-2 font-mono text-[#006FEE]">3.</span>Calcular el factor de balance.</li><li><span className="mr-2 font-mono text-[#006FEE]">4.</span>Aplicar LL, RR, LR o RL si |FB| = 2.</li></ol><p className="mt-5 border-t border-white/10 pt-4 text-xs leading-5 text-[#71717A]">Ejemplo LL: insertar 30, 20 y 10 produce FB(30) = +2. Una rotación derecha deja 20 como raíz, 10 a la izquierda y 30 a la derecha.</p></Card.Content></Card>
      </section>

      <section className="border-y border-white/10 bg-[#050505]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
          <SectionTitle number="09" title="Implementación en C#" subtitle="Nodo y búsqueda iterativa" />
          <div className="grid gap-5 lg:grid-cols-2">
            <Card className="border border-white/10 bg-[#09090B]"><Card.Header className="border-b border-white/10 p-5"><Card.Title className="text-white">Clase Nodo</Card.Title><Card.Description className="text-[#71717A]">Valor y dos referencias opcionales.</Card.Description></Card.Header><Card.Content className="p-0"><pre className="overflow-auto p-5 font-mono text-sm leading-6 text-[#66AAF9]">{nodeCode}</pre></Card.Content></Card>
            <Card className="border border-white/10 bg-[#09090B]"><Card.Header className="border-b border-white/10 p-5"><Card.Title className="text-white">Buscar</Card.Title><Card.Description className="text-[#71717A]">Desciende por un único camino.</Card.Description></Card.Header><Card.Content className="p-0"><pre className="overflow-auto p-5 font-mono text-sm leading-6 text-[#66AAF9]">{searchCode}</pre></Card.Content></Card>
          </div>
          <Card className="mt-5 border border-[#006FEE]/30 bg-[#0B1730]"><Card.Content className="p-6"><p className="font-bold text-white">Traza: Buscar(60)</p><div className="mt-4 flex flex-wrap items-center gap-2 font-mono text-sm"><Chip variant="soft">actual = 50</Chip><span>→</span><Chip variant="soft">60 &gt; 50</Chip><span>→</span><Chip variant="soft">actual = 70</Chip><span>→</span><Chip variant="soft">60 &lt; 70</Chip><span>→</span><Chip color="success" variant="soft">actual = 60</Chip></div><p className="mt-4 text-sm text-[#A1A1AA]">Resultado: el nodo existe. Se recorrieron tres nodos y se realizaron tres comparaciones de igualdad.</p></Card.Content></Card>
        </div>
      </section>

      <section className="border-t border-white/10 bg-black px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionTitle number="10" title="Guía visual completa" subtitle="Lámina adjunta" />
          <Card className="overflow-hidden border border-white/15 bg-[#09090B]"><Card.Content className="p-3 sm:p-6"><div className="max-h-[75vh] overflow-auto rounded-xl bg-white"><img src="/labs/arboles/guia-arboles.svg" alt="Guía completa de árboles, árboles binarios de búsqueda y AVL" className="h-auto min-w-[900px] w-full" /></div></Card.Content><Card.Footer className="flex flex-wrap items-center gap-3 border-t border-white/10 p-5"><BookOpenIcon className="size-5 text-[#006FEE]" /><p className="mr-auto text-sm text-[#A1A1AA]">Usa el desplazamiento para recorrer la lámina completa.</p><Button variant="secondary" onPress={() => window.open("/labs/arboles/guia-arboles.svg", "_blank")}>Abrir en tamaño completo</Button></Card.Footer></Card>
        </div>
      </section>
    </main>
  )
}

function SectionTitle({ number, title, subtitle }: { number: string; title: string; subtitle: string }) {
  return <div className="mb-8 flex items-end gap-4 border-b border-white/10 pb-5"><span className="font-mono text-sm font-bold text-[#006FEE]">{number}</span><div><p className="text-xs font-semibold tracking-[.16em] text-[#71717A] uppercase">{subtitle}</p><h2 className="mt-1 text-3xl font-black tracking-[-.04em] text-white sm:text-5xl">{title}</h2></div><ArrowDownIcon className="ml-auto hidden size-5 text-[#27272A] sm:block" /></div>
}

function Metric({ label, value, detail }: { label: string; value: number; detail: string }) {
  return <Card className="border border-white/10 bg-[#09090B]"><Card.Content className="p-5"><p className="text-xs font-bold tracking-wider text-[#71717A] uppercase">{label}</p><p className="my-2 font-mono text-4xl font-black text-white">{value}</p><p className="text-xs text-[#71717A]">{detail}</p></Card.Content></Card>
}

function Traversal({ title, rule, values, use }: { title: string; rule: string; values: number[]; use: string }) {
  return <Card className="border border-white/10 bg-[#09090B]"><Card.Content className="p-5"><div className="flex items-center gap-2 text-[#66AAF9]"><GitBranchIcon className="size-4" /><h3 className="font-bold">{title}</h3></div><p className="mt-2 font-mono text-xs text-[#71717A]">{rule}</p><p className="my-4 break-words font-mono text-sm font-bold leading-6 text-white">{values.join(" → ")}</p><p className="text-xs text-[#A1A1AA]">{use}</p></Card.Content></Card>
}
