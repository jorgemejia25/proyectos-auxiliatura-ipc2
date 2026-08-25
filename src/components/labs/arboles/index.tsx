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
          <p className="mt-8 max-w-3xl text-lg leading-8 text-[#A1A1AA]">Conceptos, medidas, operaciones y balance explicados con cálculos verificables y un árbol que puedes modificar.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
        <SectionTitle number="01" title="Anatomía del árbol" subtitle="Relaciones y medidas" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[
            ["Raíz", "Único nodo sin padre. Es el punto de entrada."],
            ["Hoja", "Nodo sin hijos; su grado y su altura son 0."],
            ["Profundidad", "Número de aristas desde la raíz hasta el nodo."],
            ["Altura", "Camino más largo desde el nodo hasta una hoja."],
            ["Grado", "Cantidad de hijos directos de un nodo."],
            ["Subárbol", "Un nodo junto con todos sus descendientes."],
            ["Ancestro", "Nodo presente en el camino hacia la raíz."],
            ["Bosque", "Conjunto de árboles disjuntos."],
          ].map(([title, body]) => (
            <Card key={title} className="border border-white/10 bg-[#09090B]">
              <Card.Content className="p-5"><h3 className="text-lg font-bold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-[#A1A1AA]">{body}</p></Card.Content>
            </Card>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#050505]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
          <SectionTitle number="02" title="Árbol binario de búsqueda" subtitle="Laboratorio interactivo" />
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
        <SectionTitle number="03" title="Fórmulas y cálculos" subtitle="Altura, niveles y capacidad" />
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
          <SectionTitle number="04" title="Operaciones y complejidad" subtitle="La altura determina el costo" />
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
        <SectionTitle number="05" title="Balance AVL" subtitle="Factor de balance y rotaciones" />
        <div className="grid gap-6 lg:grid-cols-[.7fr_1.3fr]">
          <Card className="border border-[#006FEE]/30 bg-[#0B1730]"><Card.Content className="p-7"><ScaleIcon className="size-7 text-[#66AAF9]" /><p className="mt-5 font-mono text-2xl font-bold text-white">FB(v) = h(izq) − h(der)</p><p className="mt-4 leading-7 text-[#D4D4D8]">Un AVL exige que el factor de cada nodo sea −1, 0 o 1. Si llega a ±2 después de insertar o eliminar, se aplica una rotación.</p></Card.Content></Card>
          <div className="grid gap-3 sm:grid-cols-2">{[["LL", "Rotación simple a la derecha", "+2 y el nuevo nodo está a la izquierda"], ["RR", "Rotación simple a la izquierda", "−2 y el nuevo nodo está a la derecha"], ["LR", "Izquierda y luego derecha", "+2 con inserción derecha-izquierda"], ["RL", "Derecha y luego izquierda", "−2 con inserción izquierda-derecha"]].map(([code, title, note]) => <Card key={code} className="border border-white/10 bg-[#09090B]"><Card.Content className="flex gap-4 p-5"><span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#006FEE] font-mono font-black text-white">{code}</span><div><h3 className="font-bold text-white">{title}</h3><p className="mt-1 text-sm leading-5 text-[#A1A1AA]">{note}</p></div></Card.Content></Card>)}</div>
        </div>
      </section>

      <section className="border-t border-white/10 bg-black px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <SectionTitle number="06" title="Guía visual completa" subtitle="Lámina adjunta" />
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
