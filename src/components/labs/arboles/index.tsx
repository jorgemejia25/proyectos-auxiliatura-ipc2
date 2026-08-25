"use client"

import { useEffect, useMemo, useState } from "react"
import { Button, Card, Chip, Input, Table } from "@heroui/react"
import {
  ArrowDownIcon,
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

const courseUnits = [
  ["definicion", "Definición"], ["terminologia", "Terminología"], ["clasificacion", "Clasificación"],
  ["tda", "TDA"], ["representacion", "Representación"], ["abb", "ABB interactivo"],
  ["recorridos", "Recorridos"], ["complejidad", "Complejidad"], ["avl", "AVL"],
  ["proyecto", "C# para Proyecto 2"],
] as const

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

function insertionPath(root: TreeNode | null, value: number) {
  const path: string[] = []
  let current = root
  while (current) {
    if (value === current.value) return [...path, `${value} ya existe`]
    const direction = value < current.value ? "izquierda" : "derecha"
    path.push(`${current.value}: ${direction}`)
    current = value < current.value ? current.left : current.right
  }
  return [...path, `${value}: nueva hoja`]
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

const listCode = `public sealed class NodoLista<T>
{
    public T Dato { get; }
    public NodoLista<T>? Siguiente { get; set; }
    public NodoLista(T dato) => Dato = dato;
}

public sealed class ListaSimple<T>
{
    private NodoLista<T>? cabeza;
    private NodoLista<T>? cola;
    public int Cantidad { get; private set; }

    public void AgregarFinal(T dato)
    {
        var nuevo = new NodoLista<T>(dato);
        if (cabeza == null) cabeza = nuevo;
        else cola!.Siguiente = nuevo;
        cola = nuevo;
        Cantidad++;
    }

    public bool EliminarPrimero(Func<T, bool> coincide)
    {
        NodoLista<T>? anterior = null;
        NodoLista<T>? actual = cabeza;
        while (actual != null)
        {
            if (coincide(actual.Dato))
            {
                if (anterior == null) cabeza = actual.Siguiente;
                else anterior.Siguiente = actual.Siguiente;
                if (actual == cola) cola = anterior;
                Cantidad--;
                return true;
            }
            anterior = actual;
            actual = actual.Siguiente;
        }
        return false;
    }
}`

const categoryCode = `public sealed class NodoCategoria
{
    public string Nombre { get; }
    public NodoCategoria? PrimerHijo { get; set; }
    public NodoCategoria? SiguienteHermano { get; set; }
    public ListaSimple<Libro> Libros { get; } = new();

    public NodoCategoria(string nombre) => Nombre = nombre;
}

public sealed class ArbolCategorias
{
    public NodoCategoria Raiz { get; } = new("Catálogo");

    public NodoCategoria? Buscar(string nombre) => Buscar(Raiz, nombre);

    private NodoCategoria? Buscar(NodoCategoria? nodo, string nombre)
    {
        if (nodo == null) return null;
        if (string.Equals(nodo.Nombre, nombre,
            StringComparison.OrdinalIgnoreCase)) return nodo;

        var encontrado = Buscar(nodo.PrimerHijo, nombre);
        return encontrado ?? Buscar(nodo.SiguienteHermano, nombre);
    }

    public bool Agregar(string nombre, string padre)
    {
        var nodoPadre = Buscar(padre);
        if (nodoPadre == null || Buscar(nombre) != null) return false;

        var nuevo = new NodoCategoria(nombre);
        nuevo.SiguienteHermano = nodoPadre.PrimerHijo;
        nodoPadre.PrimerHijo = nuevo;
        return true;
    }
}`

const bookCode = `public sealed class Libro
{
    public int Isbn { get; init; }
    public string Titulo { get; init; } = "";
    public string Autor { get; init; } = "";
    public string Categoria { get; init; } = "";
}

public sealed class NodoLibro
{
    public Libro Dato { get; set; }
    public NodoLibro? Izquierdo { get; set; }
    public NodoLibro? Derecho { get; set; }
    public NodoLibro(Libro dato) => Dato = dato;
}

public sealed class ArbolLibros
{
    private NodoLibro? raiz;

    public bool Insertar(Libro libro)
    {
        if (raiz == null) { raiz = new(libro); return true; }
        NodoLibro actual = raiz;

        while (true)
        {
            if (libro.Isbn == actual.Dato.Isbn) return false;
            if (libro.Isbn < actual.Dato.Isbn)
            {
                if (actual.Izquierdo == null)
                { actual.Izquierdo = new(libro); return true; }
                actual = actual.Izquierdo;
            }
            else
            {
                if (actual.Derecho == null)
                { actual.Derecho = new(libro); return true; }
                actual = actual.Derecho;
            }
        }
    }

    public Libro? Buscar(int isbn)
    {
        NodoLibro? actual = raiz;
        while (actual != null)
        {
            if (isbn == actual.Dato.Isbn) return actual.Dato;
            actual = isbn < actual.Dato.Isbn
                ? actual.Izquierdo : actual.Derecho;
        }
        return null;
    }

    public bool Eliminar(int isbn)
    {
        bool eliminado = false;
        raiz = Eliminar(raiz, isbn, ref eliminado);
        return eliminado;
    }

    private NodoLibro? Eliminar(NodoLibro? nodo, int isbn, ref bool eliminado)
    {
        if (nodo == null) return null;
        if (isbn < nodo.Dato.Isbn)
            nodo.Izquierdo = Eliminar(nodo.Izquierdo, isbn, ref eliminado);
        else if (isbn > nodo.Dato.Isbn)
            nodo.Derecho = Eliminar(nodo.Derecho, isbn, ref eliminado);
        else
        {
            eliminado = true;
            if (nodo.Izquierdo == null) return nodo.Derecho;
            if (nodo.Derecho == null) return nodo.Izquierdo;
            NodoLibro sucesor = nodo.Derecho;
            while (sucesor.Izquierdo != null) sucesor = sucesor.Izquierdo;
            nodo.Dato = sucesor.Dato;
            bool auxiliar = false;
            nodo.Derecho = Eliminar(nodo.Derecho, sucesor.Dato.Isbn, ref auxiliar);
        }
        return nodo;
    }

    public void InOrden(ListaSimple<Libro> salida) => InOrden(raiz, salida);
    private void InOrden(NodoLibro? nodo, ListaSimple<Libro> salida)
    {
        if (nodo == null) return;
        InOrden(nodo.Izquierdo, salida);
        salida.AgregarFinal(nodo.Dato);
        InOrden(nodo.Derecho, salida);
    }
}`

const serviceCode = `public sealed class Catalogo
{
    public ArbolCategorias Categorias { get; } = new();
    public ArbolLibros LibrosPorIsbn { get; } = new();

    public bool RegistrarLibro(Libro libro)
    {
        NodoCategoria? categoria = Categorias.Buscar(libro.Categoria);
        if (categoria == null) return false;
        if (!LibrosPorIsbn.Insertar(libro)) return false;

        // La misma instancia queda accesible desde ambos TDAs.
        categoria.Libros.AgregarFinal(libro);
        return true;
    }

    public bool EliminarLibro(int isbn)
    {
        Libro? libro = LibrosPorIsbn.Buscar(isbn);
        if (libro == null) return false;
        NodoCategoria? categoria = Categorias.Buscar(libro.Categoria);
        if (categoria == null) return false;

        if (!LibrosPorIsbn.Eliminar(isbn)) return false;
        return categoria.Libros.EliminarPrimero(x => x.Isbn == isbn);
    }

}`

export function TreesLabView() {
  const [values, setValues] = useState(INITIAL_VALUES)
  const [input, setInput] = useState(45)
  const [nodeCount, setNodeCount] = useState(15)
  const [activeUnit, setActiveUnit] = useState("definicion")
  const [lastInserted, setLastInserted] = useState<number | null>(null)
  const [path, setPath] = useState<string[]>([])
  const [codeView, setCodeView] = useState<"lista" | "categorias" | "libros" | "coordinacion">("lista")
  const root = useMemo(() => buildTree(values), [values])
  const positioned = useMemo(() => positionTree(root), [root])
  const treeHeight = height(root)
  const minHeight = nodeCount > 0 ? Math.floor(Math.log2(nodeCount)) : 0

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setActiveUnit(visible.target.id)
      },
      { rootMargin: "-25% 0px -60%", threshold: 0.05 }
    )
    courseUnits.forEach(([id]) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [])

  const addValue = () => {
    if (!Number.isFinite(input) || values.includes(input)) return
    setPath(insertionPath(root, input))
    setLastInserted(input)
    setValues((current) => [...current, input])
  }

  const goToUnit = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })

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

      <style>{`
        @keyframes tree-rise { from { opacity: 0; transform: translateY(22px) } to { opacity: 1; transform: translateY(0) } }
        @keyframes node-pop { 0% { opacity: 0; transform: scale(.35) } 70% { transform: scale(1.16) } 100% { opacity: 1; transform: scale(1) } }
        @keyframes edge-draw { from { stroke-dashoffset: 120 } to { stroke-dashoffset: 0 } }
        .tree-unit { animation: tree-rise .65s ease-out both; scroll-margin-top: 7rem }
        .tree-node-pop { transform-box: fill-box; transform-origin: center; animation: node-pop .55s cubic-bezier(.2,.8,.2,1) both }
        .tree-edge { stroke-dasharray: 120; animation: edge-draw .7s ease-out both }
        .tree-course-nav { scrollbar-width: none }
        .tree-course-nav::-webkit-scrollbar { display: none }
        @media (prefers-reduced-motion: reduce) { .tree-unit,.tree-node-pop,.tree-edge { animation: none } }
      `}</style>

      <section className="sticky top-0 z-40 border-b border-white/10 bg-black/90 px-5 py-3 backdrop-blur-xl sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="tree-course-nav flex gap-2 overflow-x-auto pb-1">
            {courseUnits.map(([id, lesson], index) => (
              <Button key={id} size="sm" variant="secondary" className={`shrink-0 border ${activeUnit === id ? "!border-[#006FEE] !bg-[#006FEE] !text-white" : "!border-white/10 !bg-[#111113] !text-[#A1A1AA] hover:!border-white/20 hover:!bg-[#18181B] hover:!text-white"}`} onPress={() => goToUnit(id)}>
                <span className="font-mono text-[10px] opacity-70">{String(index + 1).padStart(2, "0")}</span> {lesson}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section id="definicion" className="tree-unit mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
        <SectionTitle number="01" title="Definición de árbol" subtitle="Concepto fundamental" />
        <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <Card className="border border-[#006FEE]/30 bg-[#0B1730]"><Card.Content className="p-7"><p className="font-mono text-xs text-[#66AAF9]">DEFINICIÓN</p><p className="mt-4 text-xl font-semibold leading-8 text-white">Un árbol es una estructura formada por un conjunto finito de nodos conectados mediante aristas. Existe un único nodo raíz y cada nodo restante tiene exactamente un padre.</p></Card.Content></Card>
          <Card className="border border-white/10 bg-[#09090B]"><Card.Content className="p-7"><p className="font-mono text-xs text-[#F31260]">CONDICIONES</p><ul className="mt-4 grid gap-3 text-sm leading-6 text-[#D4D4D8]"><li>• Es una estructura conectada.</li><li>• No contiene ciclos.</li><li>• Entre dos nodos existe un único camino.</li><li>• Con n nodos contiene n − 1 aristas.</li></ul></Card.Content></Card>
        </div>
        <Card className="mt-5 border border-white/10 bg-[#09090B]"><Card.Content className="grid gap-6 p-6 md:grid-cols-[.35fr_1fr]"><div><p className="text-sm font-bold text-[#66AAF9]">Ejemplo</p><p className="mt-2 font-mono text-2xl text-white">A → {`{ B, C }`}</p></div><p className="text-sm leading-7 text-[#A1A1AA]">A es la raíz. B y C son hijos directos de A. El árbol tiene 3 nodos y 2 aristas. Los caminos desde A hacia B y C tienen longitud 1.</p></Card.Content></Card>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {["DOM: cada elemento es un nodo.", "Sistema de archivos: directorios y archivos forman nodos.", "Compilador: un AST representa la sintaxis del programa.", "Base de datos: índices B y B+ organizan claves."].map((example) => <Card key={example} className="border border-white/10 bg-[#09090B]"><Card.Content className="p-4 text-sm leading-6 text-[#A1A1AA]">{example}</Card.Content></Card>)}
        </div>
      </section>

      <section id="terminologia" className="tree-unit border-y border-white/10 bg-[#050505]">
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

      <section id="clasificacion" className="tree-unit mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
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

      <section id="tda" className="tree-unit border-y border-white/10 bg-[#050505]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
          <SectionTitle number="04" title="Tipo de dato abstracto" subtitle="Contrato y encapsulamiento" />
          <div className="grid gap-5 lg:grid-cols-[1fr_.9fr]">
            <Card className="border border-[#006FEE]/30 bg-[#0B1730]"><Card.Content className="p-6"><p className="font-mono text-xs text-[#66AAF9]">DEFINICIÓN</p><p className="mt-4 text-lg font-semibold leading-8 text-white">Un tipo de dato abstracto especifica los valores permitidos y las operaciones válidas sin definir cómo se almacenan internamente.</p><p className="mt-4 text-sm leading-6 text-[#A1A1AA]">El TDA define qué hace cada operación, sus precondiciones y sus resultados.</p></Card.Content></Card>
            <Card className="border border-white/10 bg-[#09090B]"><Card.Content className="p-6"><h3 className="font-bold text-white">Operaciones del TDA árbol</h3><div className="mt-4 grid gap-2 font-mono text-sm text-[#D4D4D8]"><p>insertar(valor)</p><p>buscar(valor)</p><p>eliminar(valor)</p><p>recorrer(orden)</p><p>altura() · tamaño() · estaVacio()</p></div></Card.Content></Card>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <ConceptExample title="Contrato de inserción" definition="Después de insertar x, buscar x debe devolver un resultado exitoso." example="insertar(45) ⇒ buscar(45) ≠ null" />
            <ConceptExample title="Invariante" definition="Toda operación debe conservar la regla de orden del ABB." example="inorden() produce una secuencia creciente" />
            <ConceptExample title="Encapsulamiento" definition="La raíz y los enlaces se modifican únicamente desde la clase árbol." example="Raiz tiene acceso privado" />
          </div>
          <Card className="mt-5 border border-white/10 bg-[#09090B]"><Card.Content className="grid gap-6 p-6 lg:grid-cols-3"><div><p className="font-bold text-white">Nodo&lt;T&gt;</p><p className="mt-2 text-sm leading-6 text-[#A1A1AA]">Guarda el dato, los enlaces izquierdo y derecho, y la altura cuando se implementa AVL.</p></div><div><p className="font-bold text-white">ArbolBinarioBusqueda&lt;T&gt;</p><p className="mt-2 text-sm leading-6 text-[#A1A1AA]">Mantiene la raíz y el tamaño. Expone las operaciones del TDA.</p></div><div><p className="font-bold text-white">ArbolAVL&lt;T&gt;</p><p className="mt-2 text-sm leading-6 text-[#A1A1AA]">Añade actualización de alturas y rotaciones a inserción y eliminación.</p></div></Card.Content></Card>
        </div>
      </section>

      <section id="representacion" className="tree-unit mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
          <SectionTitle number="05" title="Representación" subtitle="Memoria y arreglo" />
          <div className="grid gap-5 lg:grid-cols-2">
            <Card className="border border-white/10 bg-[#09090B]"><Card.Content className="p-6"><h3 className="text-xl font-bold text-white">Nodos enlazados</h3><p className="mt-3 text-sm leading-6 text-[#A1A1AA]">Cada nodo almacena un valor y referencias a sus hijos. Una referencia nula indica que el hijo no existe.</p><pre className="mt-5 overflow-auto rounded-xl bg-black p-4 font-mono text-sm leading-6 text-[#66AAF9]">{nodeCode}</pre><p className="mt-4 text-xs text-[#71717A]">Ejemplo: el nodo 30 referencia a 20 por Izquierdo y a 40 por Derecho.</p></Card.Content></Card>
            <Card className="border border-white/10 bg-[#09090B]"><Card.Content className="p-6"><h3 className="text-xl font-bold text-white">Representación en arreglo</h3><p className="mt-3 text-sm leading-6 text-[#A1A1AA]">Se utiliza principalmente en árboles completos. Para un nodo situado en el índice i:</p><div className="mt-5 grid gap-3 font-mono text-sm"><p className="rounded-xl bg-[#0B1730] p-4 text-[#66AAF9]">izquierdo(i) = 2i + 1</p><p className="rounded-xl bg-[#0B1730] p-4 text-[#66AAF9]">derecho(i) = 2i + 2</p><p className="rounded-xl bg-[#0B1730] p-4 text-[#66AAF9]">padre(i) = ⌊(i − 1) / 2⌋</p></div><p className="mt-4 text-xs leading-5 text-[#71717A]">Ejemplo: para i = 2, sus hijos ocupan los índices 5 y 6; su padre ocupa el índice 0.</p></Card.Content></Card>
          </div>
      </section>

      <section id="abb" className="tree-unit border-b border-white/10 bg-black">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
          <SectionTitle number="06" title="Árbol binario de búsqueda" subtitle="Orden e interacción" />
          <Card className="mb-6 border border-[#006FEE]/30 bg-[#0B1730]"><Card.Content className="grid gap-5 p-6 lg:grid-cols-[1fr_.8fr]"><div><p className="font-mono text-xs text-[#66AAF9]">DEFINICIÓN</p><p className="mt-3 leading-7 text-white">Un árbol binario de búsqueda es un árbol binario que mantiene una relación de orden global en cada nodo.</p></div><div className="font-mono text-sm leading-7 text-[#D4D4D8]"><p>claves(izquierda) &lt; nodo</p><p>claves(derecha) &gt; nodo</p><p className="mt-2 text-[#71717A]">Ejemplo: para la raíz 50, 30 pertenece al subárbol izquierdo y 70 al derecho.</p></div></Card.Content></Card>
          <div className="grid gap-6 lg:grid-cols-[1.45fr_.55fr]">
            <Card className="overflow-hidden border border-white/15 bg-[#000000]">
              <Card.Header className="flex flex-wrap items-center gap-3 border-b border-white/10 p-5">
                <div><Card.Title className="text-xl text-white">Visualizador ABB</Card.Title><Card.Description className="text-[#71717A]">Menores a la izquierda; mayores a la derecha.</Card.Description></div>
                <div className="ml-auto flex gap-2">
                  <Input aria-label="Valor del nodo" type="number" value={String(input)} onChange={(event) => setInput(Number(event.target.value))} onKeyDown={(event) => event.key === "Enter" && addValue()} className="w-24 border-white/15 bg-black font-mono text-sm text-white" />
                  <Button className="bg-[#006FEE] font-bold text-white hover:bg-[#338EF7]" onPress={addValue}>Insertar</Button>
                  <Button isIconOnly variant="secondary" aria-label="Reiniciar árbol" onPress={() => { setValues(INITIAL_VALUES); setLastInserted(null); setPath([]) }}><RotateCcwIcon className="size-4" /></Button>
                </div>
              </Card.Header>
              <Card.Content className="p-3 sm:p-6">
                <svg viewBox={`0 0 800 ${Math.max(330, (treeHeight + 1) * 100)}`} role="img" aria-label="Árbol binario de búsqueda interactivo" className="min-h-80 w-full">
                  {positioned.map((node, index) => node.parentX === undefined ? null : <line className="tree-edge" key={`e-${index}`} x1={node.parentX} y1={node.parentY! + 24} x2={node.x} y2={node.y - 24} stroke="#27272A" strokeWidth="3" />)}
                  {positioned.map((node) => <g className={node.value === lastInserted ? "tree-node-pop" : undefined} key={node.value}><circle cx={node.x} cy={node.y} r="26" fill={node.value === lastInserted ? "#006FEE" : "#0B1730"} stroke={node.value === lastInserted ? "#99C7FB" : "#006FEE"} strokeWidth="3" /><text x={node.x} y={node.y + 6} textAnchor="middle" fill="white" fontSize="17" fontWeight="800">{node.value}</text></g>)}
                </svg>
                <div className="border-t border-white/10 px-3 pt-4">
                  <p className="mb-3 text-xs font-bold tracking-wider text-[#71717A] uppercase">Camino de la última inserción</p>
                  <div className="flex min-h-8 flex-wrap items-center gap-2">{path.length ? path.map((step, index) => <span key={`${step}-${index}`} className="flex items-center gap-2"><Chip color={index === path.length - 1 ? "success" : "accent"} variant="soft">{step}</Chip>{index < path.length - 1 && <span className="text-[#52525B]">→</span>}</span>) : <span className="text-sm text-[#52525B]">Inserta una clave para observar cada decisión.</span>}</div>
                </div>
              </Card.Content>
            </Card>

            <div className="grid content-start gap-4">
              <Metric label="Nodos" value={values.length} detail={`Aristas: ${Math.max(0, values.length - 1)}`} />
              <Metric label="Altura actual" value={treeHeight} detail={`${treeHeight + 1} niveles`} />
              <Metric label="Altura mínima" value={values.length ? Math.floor(Math.log2(values.length)) : 0} detail={treeHeight === Math.floor(Math.log2(values.length)) ? "Altura óptima" : "Puede balancearse mejor"} />
              <Card className="border border-[#006FEE]/30 bg-[#0B1730]"><Card.Content className="p-5"><p className="font-mono text-xs text-[#66AAF9]">INVARIANTE</p><p className="mt-2 text-sm font-semibold leading-6 text-white">izquierda &lt; nodo &lt; derecha, para todos los descendientes.</p></Card.Content></Card>
            </div>
          </div>

        </div>
      </section>

      <section id="recorridos" className="tree-unit mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
        <SectionTitle number="07" title="Recorridos y cálculos" subtitle="Orden, altura, niveles y capacidad" />
        <Card className="mb-6 border border-[#006FEE]/30 bg-[#0B1730]"><Card.Content className="p-6"><p className="font-mono text-xs text-[#66AAF9]">REGLA DE LECTURA</p><p className="mt-3 text-sm leading-7 text-[#D4D4D8]">Cada recorrido define en qué momento se procesa la raíz respecto de sus subárboles. En el Proyecto 2, el inorden del ABB produce los libros ordenados por ISBN; el recorrido del árbol N-ario visita cada categoría y después continúa con sus hijos y hermanos.</p></Card.Content></Card>
        <div className="mb-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Traversal title="Preorden" rule="raíz · izq · der" values={traverse(root, "pre")} use="Serializar la estructura" />
          <Traversal title="Inorden" rule="izq · raíz · der" values={traverse(root, "in")} use="Ordenar libros por ISBN" />
          <Traversal title="Posorden" rule="izq · der · raíz" values={traverse(root, "post")} use="Eliminar subárboles" />
          <Traversal title="Por niveles" rule="BFS · cola" values={levels(root)} use="Mostrar la jerarquía por nivel" />
        </div>
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

      <section id="complejidad" className="tree-unit border-y border-white/10 bg-[#050505]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
          <SectionTitle number="08" title="Operaciones y complejidad" subtitle="Búsqueda, inserción y eliminación" />
          <div className="mb-6 grid gap-4 md:grid-cols-3">
            {[
              ["Búsqueda", "Se compara la clave con el nodo actual. Si es menor, se continúa a la izquierda; si es mayor, a la derecha.", "Buscar 60: 50 → 70 → 60."],
              ["Inserción", "Se ejecuta el mismo descenso que una búsqueda hasta encontrar una referencia nula. El nuevo nodo se inserta como hoja.", "Insertar 45: 50 → 30 → 40 → derecha."],
              ["Eliminación", "La operación depende de si el nodo tiene cero, uno o dos hijos. Después de eliminar, debe conservarse el orden del ABB.", "Eliminar 50: puede sustituirse por el sucesor 60."],
            ].map(([title, definition, example]) => <Card key={title} className="border border-white/10 bg-[#09090B]"><Card.Content className="p-5"><h3 className="font-bold text-white">{title}</h3><p className="mt-3 text-sm leading-6 text-[#D4D4D8]">{definition}</p><p className="mt-4 font-mono text-xs leading-5 text-[#66AAF9]">{example}</p></Card.Content></Card>)}
          </div>
          <Card className="overflow-hidden border border-white/10 bg-[#09090B]">
            <Card.Header className="flex flex-wrap items-start justify-between gap-4 border-b border-white/10 p-5">
              <div><Card.Title className="text-xl text-white">Costos de los TDAs del Proyecto 2</Card.Title><Card.Description className="mt-1 text-[#71717A]">El costo depende de la estructura utilizada y de su altura.</Card.Description></div>
              <div className="flex flex-wrap gap-2"><Chip variant="soft">c = categorías</Chip><Chip variant="soft">b = libros</Chip><Chip variant="soft">h = altura</Chip><Chip variant="soft">k = libros de una categoría</Chip></div>
            </Card.Header>
          <Table className="!bg-[#09090B] text-[#ECEDEE]">
            <Table.ScrollContainer className="!bg-[#09090B]">
              <Table.Content className="!bg-[#09090B]" aria-label="Complejidad de los TDAs utilizados en el Proyecto 2">
                <Table.Header className="!bg-[#0B1730] text-xs uppercase tracking-wider text-[#66AAF9]">
                  <Table.Column className="!bg-[#0B1730] !text-[#66AAF9]" isRowHeader>Operación</Table.Column><Table.Column className="!bg-[#0B1730] !text-[#66AAF9]">Estructura</Table.Column><Table.Column className="!bg-[#0B1730] !text-[#66AAF9]">Tiempo</Table.Column><Table.Column className="!bg-[#0B1730] !text-[#66AAF9]">Motivo</Table.Column>
                </Table.Header>
                <Table.Body className="!bg-[#09090B]">
                  <Table.Row className="!bg-[#09090B] text-white hover:!bg-[#111827]"><Table.Cell className="font-bold">Buscar categoría</Table.Cell><Table.Cell>Árbol N-ario</Table.Cell><Table.Cell><Chip color="warning" variant="soft">O(c)</Chip></Table.Cell><Table.Cell className="text-[#A1A1AA]">Sin índice auxiliar puede visitar todas las categorías.</Table.Cell></Table.Row>
                  <Table.Row className="!bg-[#09090B] text-white hover:!bg-[#111827]"><Table.Cell className="font-bold">Agregar categoría</Table.Cell><Table.Cell>Árbol N-ario</Table.Cell><Table.Cell><Chip color="warning" variant="soft">O(c)</Chip></Table.Cell><Table.Cell className="text-[#A1A1AA]">Primero busca el padre; enlazar el nuevo hijo cuesta O(1).</Table.Cell></Table.Row>
                  <Table.Row className="!bg-[#09090B] text-white hover:!bg-[#111827]"><Table.Cell className="font-bold">Buscar / insertar libro</Table.Cell><Table.Cell>ABB por ISBN</Table.Cell><Table.Cell><Chip color="success" variant="soft">O(log b) promedio</Chip></Table.Cell><Table.Cell className="text-[#A1A1AA]">Recorre un solo camino cuando la altura es logarítmica.</Table.Cell></Table.Row>
                  <Table.Row className="!bg-[#09090B] text-white hover:!bg-[#111827]"><Table.Cell className="font-bold">Peor caso del ABB</Table.Cell><Table.Cell>ABB degenerado</Table.Cell><Table.Cell><Chip color="danger" variant="soft">O(b)</Chip></Table.Cell><Table.Cell className="text-[#A1A1AA]">Las claves ordenadas pueden formar una cadena.</Table.Cell></Table.Row>
                  <Table.Row className="!bg-[#09090B] text-white hover:!bg-[#111827]"><Table.Cell className="font-bold">Mínimo / máximo ISBN</Table.Cell><Table.Cell>ABB por ISBN</Table.Cell><Table.Cell><Chip variant="soft">O(h)</Chip></Table.Cell><Table.Cell className="text-[#A1A1AA]">Desciende siempre a la izquierda o a la derecha.</Table.Cell></Table.Row>
                  <Table.Row className="!bg-[#09090B] text-white hover:!bg-[#111827]"><Table.Cell className="font-bold">Libros ordenados</Table.Cell><Table.Cell>Recorrido inorden</Table.Cell><Table.Cell><Chip variant="soft">O(b)</Chip></Table.Cell><Table.Cell className="text-[#A1A1AA]">Cada libro se procesa exactamente una vez.</Table.Cell></Table.Row>
                  <Table.Row className="!bg-[#09090B] text-white hover:!bg-[#111827]"><Table.Cell className="font-bold">Libros de categoría</Table.Cell><Table.Cell>Lista simple propia</Table.Cell><Table.Cell><Chip variant="soft">O(k)</Chip></Table.Cell><Table.Cell className="text-[#A1A1AA]">La salida recorre solo la lista enlazada de esa categoría.</Table.Cell></Table.Row>
                </Table.Body>
              </Table.Content>
            </Table.ScrollContainer>
          </Table>
          </Card>
          <div className="mt-6 grid gap-4 md:grid-cols-3">{[["Eliminar hoja", "Se anula la referencia del padre."], ["Eliminar con un hijo", "El padre adopta al único hijo."], ["Eliminar con dos hijos", "Se reemplaza por el sucesor inorden y luego se elimina ese sucesor."]].map(([title, body], index) => <Card key={title} className="border border-white/10 bg-[#09090B]"><Card.Content className="p-5"><span className="font-mono text-xs text-[#006FEE]">CASO {index + 1}</span><h3 className="mt-2 text-lg font-bold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-[#A1A1AA]">{body}</p></Card.Content></Card>)}</div>
        </div>
      </section>

      <section id="avl" className="tree-unit mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
        <SectionTitle number="09" title="Balance AVL" subtitle="Factor de balance y rotaciones" />
        <div className="grid gap-6 lg:grid-cols-[.7fr_1.3fr]">
          <Card className="border border-[#006FEE]/30 bg-[#0B1730]"><Card.Content className="p-7"><ScaleIcon className="size-7 text-[#66AAF9]" /><p className="mt-5 font-mono text-2xl font-bold text-white">FB(v) = h(izq) − h(der)</p><p className="mt-4 leading-7 text-[#D4D4D8]">Un AVL exige que el factor de cada nodo sea −1, 0 o 1. Si llega a ±2 después de insertar o eliminar, se aplica una rotación.</p></Card.Content></Card>
          <div className="grid gap-3 sm:grid-cols-2">{[["LL", "Rotación simple a la derecha", "+2 y el nuevo nodo está a la izquierda"], ["RR", "Rotación simple a la izquierda", "−2 y el nuevo nodo está a la derecha"], ["LR", "Izquierda y luego derecha", "+2 con inserción derecha-izquierda"], ["RL", "Derecha y luego izquierda", "−2 con inserción izquierda-derecha"]].map(([code, title, note]) => <Card key={code} className="border border-white/10 bg-[#09090B]"><Card.Content className="flex gap-4 p-5"><span className="grid size-12 shrink-0 place-items-center rounded-full bg-[#006FEE] font-mono font-black text-white">{code}</span><div><h3 className="font-bold text-white">{title}</h3><p className="mt-1 text-sm leading-5 text-[#A1A1AA]">{note}</p></div></Card.Content></Card>)}</div>
        </div>
        <Card className="mt-6 border border-white/10 bg-[#09090B]"><Card.Content className="p-6"><h3 className="font-bold text-white">Proceso de rebalanceo</h3><ol className="mt-4 grid gap-3 text-sm leading-6 text-[#D4D4D8] md:grid-cols-4"><li><span className="mr-2 font-mono text-[#006FEE]">1.</span>Insertar como en un ABB.</li><li><span className="mr-2 font-mono text-[#006FEE]">2.</span>Actualizar alturas desde el nodo insertado.</li><li><span className="mr-2 font-mono text-[#006FEE]">3.</span>Calcular el factor de balance.</li><li><span className="mr-2 font-mono text-[#006FEE]">4.</span>Aplicar LL, RR, LR o RL si |FB| = 2.</li></ol><p className="mt-5 border-t border-white/10 pt-4 text-xs leading-5 text-[#71717A]">Ejemplo LL: insertar 30, 20 y 10 produce FB(30) = +2. Una rotación derecha deja 20 como raíz, 10 a la izquierda y 30 a la derecha.</p></Card.Content></Card>
        <div className="mt-5 grid gap-4 lg:grid-cols-3">
          <ConceptExample title="Altura AVL" definition="La altura está acotada por una función logarítmica." example="h ≤ 1.4405 log₂(n + 2) − 0.3277" />
          <ConceptExample title="Inserción AVL" definition="Una rotación simple o doble repara el primer nodo desbalanceado del camino de retorno." example="30, 20, 10 ⇒ caso LL" />
          <ConceptExample title="Eliminación AVL" definition="La reducción de altura puede propagar el desbalance hacia la raíz." example="Puede requerir una rotación por nivel" />
        </div>
        <Card className="mt-5 border border-[#006FEE]/30 bg-[#0B1730]"><Card.Content className="p-6"><h3 className="font-bold text-white">Propiedad de las rotaciones</h3><p className="mt-3 text-sm leading-7 text-[#D4D4D8]">Una rotación reasigna referencias entre tres nodos y sus subárboles. El recorrido inorden no cambia. La clave intermedia queda como raíz del subárbol reparado y cada rotación cuesta O(1).</p><p className="mt-4 font-mono text-xs text-[#66AAF9]">LL: z.izquierdo = y.derecho; y.derecho = z</p><p className="mt-2 font-mono text-xs text-[#66AAF9]">RR: z.derecho = y.izquierdo; y.izquierdo = z</p></Card.Content></Card>
      </section>

      <section id="proyecto" className="tree-unit border-y border-white/10 bg-[#050505]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
          <SectionTitle number="10" title="TDAs en C# para el Proyecto 2" subtitle="Categorías N-arias y libros por ISBN" />
          <Card className="border border-[#006FEE]/30 bg-[#0B1730]"><Card.Content className="p-6"><p className="font-mono text-xs text-[#66AAF9]">ARQUITECTURA REQUERIDA</p><p className="mt-3 text-lg font-semibold leading-8 text-white">El proyecto utiliza dos árboles con responsabilidades distintas: un árbol N-ario representa la jerarquía de categorías y un ABB indexa todos los libros por su ISBN entero único.</p><div className="mt-5 grid gap-3 md:grid-cols-3"><ProjectStep number="1" title="Ubicar categoría" body="Se recorre el árbol N-ario para validar la categoría indicada por el XML." /><ProjectStep number="2" title="Indexar por ISBN" body="El libro se inserta en el ABB. Un ISBN repetido se rechaza." /><ProjectStep number="3" title="Enlazar el libro" body="La misma instancia se agrega a la lista simple de su categoría." /></div></Card.Content></Card>

          <div className="my-6 flex flex-wrap gap-2" role="tablist" aria-label="Implementaciones en C#">
            {([
              ["lista", "01 · Lista propia"], ["categorias", "02 · Árbol N-ario"],
              ["libros", "03 · ABB de libros"], ["coordinacion", "04 · Coordinación"],
            ] as const).map(([key, label]) => <Button key={key} aria-pressed={codeView === key} variant={codeView === key ? "primary" : "secondary"} onPress={() => setCodeView(key)}>{label}</Button>)}
          </div>

          <Card className="overflow-hidden border border-white/10 bg-[#09090B]">
            <Card.Header className="border-b border-white/10 p-5"><Card.Title className="text-white">{{ lista: "ListaSimple<T>", categorias: "ArbolCategorias", libros: "ArbolLibros", coordinacion: "Catalogo" }[codeView]}</Card.Title><Card.Description className="mt-1 text-[#71717A]">{{ lista: "Sustituye List<T>; mantiene referencias a cabeza y cola.", categorias: "Primer hijo y siguiente hermano representan cualquier cantidad de hijos.", libros: "La clave de comparación es exclusivamente el ISBN.", coordinacion: "Mantiene consistencia entre el índice global y cada categoría." }[codeView]}</Card.Description></Card.Header>
            <Card.Content className="p-0"><pre className="max-h-[38rem] overflow-auto p-5 font-mono text-[13px] leading-6 text-[#66AAF9]">{{ lista: listCode, categorias: categoryCode, libros: bookCode, coordinacion: serviceCode }[codeView]}</pre></Card.Content>
          </Card>

          <div className="mt-6 grid gap-4 lg:grid-cols-2">
            <Card className="border border-white/10 bg-[#09090B]"><Card.Content className="p-6"><h3 className="font-bold text-white">Por qué primer hijo / siguiente hermano</h3><p className="mt-3 text-sm leading-7 text-[#A1A1AA]">Cada categoría conserva dos referencias: <strong className="text-white">PrimerHijo</strong> entra en su lista de subcategorías y <strong className="text-white">SiguienteHermano</strong> avanza entre categorías del mismo nivel. Así se representa un árbol N-ario sin usar <span className="font-mono text-[#66AAF9]">List&lt;T&gt;</span>.</p><p className="mt-4 font-mono text-xs text-[#66AAF9]">Catálogo → Ficción → Fantasía → Ciencia ficción</p></Card.Content></Card>
            <Card className="border border-white/10 bg-[#09090B]"><Card.Content className="p-6"><h3 className="font-bold text-white">Invariantes que debes conservar</h3><ul className="mt-3 grid gap-2 text-sm leading-6 text-[#A1A1AA]"><li>• Cada ISBN aparece una sola vez en el ABB.</li><li>• Todo libro pertenece a una categoría existente.</li><li>• El subárbol izquierdo contiene ISBN menores.</li><li>• El subárbol derecho contiene ISBN mayores.</li><li>• Al eliminar un libro, se retira del ABB y de su lista de categoría.</li></ul></Card.Content></Card>
          </div>

          <Card className="mt-5 border border-[#17C964]/30 bg-[#071A12]"><Card.Content className="p-6"><p className="font-bold text-white">Cómo extender esta base</p><p className="mt-3 text-sm leading-7 text-[#A1A1AA]">La inserción, búsqueda, recorrido inorden y eliminación coordinada ya conservan los índices principales. Agrega <span className="text-white">Minimo</span> y <span className="text-white">Maximo</span> siguiendo un extremo del ABB, y genera Graphviz recorriendo primer hijo y siguiente hermano. La carga XML debe llamar a los métodos públicos del catálogo; no debe modificar nodos directamente.</p></Card.Content></Card>
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

function ConceptExample({ title, definition, example }: { title: string; definition: string; example: string }) {
  return <Card className="border border-white/10 bg-[#09090B]"><Card.Content className="p-5"><h3 className="font-bold text-white">{title}</h3><p className="mt-3 text-sm leading-6 text-[#D4D4D8]">{definition}</p><p className="mt-4 font-mono text-xs leading-5 text-[#66AAF9]">Ejemplo: {example}</p></Card.Content></Card>
}

function ProjectStep({ number, title, body }: { number: string; title: string; body: string }) {
  return <Card className="border border-white/10 bg-black/30"><Card.Content className="p-5"><span className="font-mono text-xs font-bold text-[#66AAF9]">PASO {number}</span><h3 className="mt-2 font-bold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-[#A1A1AA]">{body}</p></Card.Content></Card>
}
