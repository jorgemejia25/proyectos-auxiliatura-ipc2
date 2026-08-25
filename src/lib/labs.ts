/**
 * Catalog of IPC2 auxiliary laboratories exposed by the hub.
 */
export type LabSlug =
  | "git-flow"
  | "csharp-basico"
  | "graphviz-csharp"
  | "arboles"
  | "json-lab"
  | "xml-lab"
  | "tda-lab"
  | "poo-lab"

export type Lab = {
  /** URL segment under /laboratorios. */
  slug: LabSlug
  /** Short label shown in navigation. */
  label: string
  /** Full laboratory title. */
  title: string
  /** One-line summary for the selector. */
  summary: string
  /** Accent theme for chrome and selector tiles. */
  theme: "ink" | "rose" | "yellow" | "blue" | "green" | "violet" | "orange"
  /** Tech tags for the selector. */
  tags: string[]
}

export const labs: Lab[] = [
  {
    slug: "git-flow",
    label: "Git Flow",
    title: "Manual de ramas",
    summary:
      "Modelo de ramificación con roles fijos: main, develop, feature, release y hotfix.",
    theme: "ink",
    tags: ["Git", "Ramas", "Flujo"],
  },
  {
    slug: "csharp-basico",
    label: "C# Básico",
    title: "Fundamentos desde cero",
    summary:
      "Sintaxis, tipos, entrada y salida, decisiones, ciclos, colecciones, métodos y excepciones con práctica guiada.",
    theme: "rose",
    tags: ["C#", "Fundamentos", "Consola", "Métodos"],
  },
  {
    slug: "graphviz-csharp",
    label: "Graphviz + C#",
    title: "Grafos con DOT",
    summary:
      "Sintaxis DOT, atributos, posicionamiento, estructuras de datos, generación desde C# y visor SVG interactivo.",
    theme: "yellow",
    tags: ["C#", "Graphviz", "DOT", "SVG"],
  },
  {
    slug: "arboles",
    label: "Árboles",
    title: "ABB y AVL",
    summary:
      "Guía visual de terminología, recorridos, cálculos de altura, complejidad, operaciones y balance AVL.",
    theme: "blue",
    tags: ["Árboles", "ABB", "AVL", "Recorridos"],
  },
  {
    slug: "poo-lab",
    label: "POO Lab",
    title: "Orientación a objetos en C#",
    summary:
      "Clases, encapsulación, herencia, polimorfismo, abstracción e interfaces con demos animados.",
    theme: "orange",
    tags: ["C#", "POO", "Clases", "Herencia"],
  },
  {
    slug: "tda-lab",
    label: "TDA Lab",
    title: "Tipos de dato abstracto",
    summary:
      "Nodo, lista, pila, cola y matriz enlazada: teoría, usos y demostraciones interactivas animadas.",
    theme: "violet",
    tags: ["C#", "TDA", "Lista", "Pila", "Cola"],
  },
  {
    slug: "json-lab",
    label: "JSON Lab",
    title: "System.Text.Json",
    summary:
      "Tipos, árbol, consultas y serialización de objetos con System.Text.Json.",
    theme: "blue",
    tags: ["C#", "JSON", "System.Text.Json"],
  },
  {
    slug: "xml-lab",
    label: "XML Lab",
    title: "XDocument",
    summary:
      "Anatomía XML, LINQ to XML, construcción de nodos y serialización con XDocument.",
    theme: "green",
    tags: ["C#", "XML", "XDocument"],
  },
]

/**
 * Resolves a laboratory by its route slug.
 */
export function getLab(slug: string): Lab | undefined {
  return labs.find((lab) => lab.slug === slug)
}
