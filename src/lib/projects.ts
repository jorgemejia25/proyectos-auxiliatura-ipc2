/**
 * Catalog of IPC2 auxiliary projects exposed by the hub.
 */
export type ProjectSlug = "practica1" | "proyecto1" | "proyecto2"

export type Project = {
  /** URL segment used by App Router. */
  slug: ProjectSlug
  /** Short label shown in navigation. */
  label: string
  /** Full academic title. */
  title: string
  /** One-line summary for the selector. */
  summary: string
  /** Delivery highlight. */
  delivery: string
  /**
   * Absolute delivery deadline in ISO-8601 with Guatemala offset (−06:00).
   * Prefer this form over bare date strings so Safari/iOS parse it correctly.
   */
  deadlineAt: string
  /** Accent theme for chrome and selector tiles. */
  theme: "cyan" | "violet"
  /** Tech tags for the selector. */
  tags: string[]
}

export const GITHUB_USER = "jorgemejia25"
export const GITHUB_URL = `https://github.com/${GITHUB_USER}`

export const projects: Project[] = [
  {
    slug: "practica1",
    label: "Practica 1",
    title: "Veterinaria POO",
    summary:
      "Sistema de citas en C# con herencia, encapsulamiento y polimorfismo sobre una clase base Mascota.",
    delivery: "14 AGO · 11:59 pm · UEDI",
    deadlineAt: "2026-08-14T23:59:59-06:00",
    theme: "cyan",
    tags: ["C#", "Consola", "POO", "Herencia"],
  },
  {
    slug: "proyecto1",
    label: "Proyecto 1",
    title: "Chapín Warriors",
    summary:
      "Control de misiones sobre matriz, XML, Graphviz y TDA propios para rescate y extracción de recursos.",
    delivery: "27 AGO · 11:59 pm · UEDI",
    deadlineAt: "2026-08-27T23:59:59-06:00",
    theme: "violet",
    tags: ["C#", "XML", "Graphviz", "TDA"],
  },
  {
    slug: "proyecto2",
    label: "Proyecto 2",
    title: "Catálogo de libros",
    summary:
      "Catálogo jerárquico con árbol N-ario, árbol binario de búsqueda, XML, Graphviz y TDA propios.",
    delivery: "24 SEP · 11:59 pm · UEDI",
    deadlineAt: "2026-09-24T23:59:00-06:00",
    theme: "violet",
    tags: ["C#", "Árbol N-ario", "ABB", "Graphviz", "XML"],
  },
]

/**
 * Resolves a project by its route slug.
 */
export function getProject(slug: string): Project | undefined {
  return projects.find((project) => project.slug === slug)
}
