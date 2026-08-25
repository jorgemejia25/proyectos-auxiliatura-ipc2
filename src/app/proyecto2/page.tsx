import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ProjectView } from "@/components/project-view"
import { getProject } from "@/lib/projects"

export const metadata: Metadata = {
  title: "Proyecto 2 · Catálogo de libros",
  description:
    "Proyecto 2 de IPC2: catálogo de libros con árbol N-ario, árbol binario de búsqueda y TDA propios.",
}

/**
 * Route for Proyecto 2 (catalog of books).
 */
export default function Proyecto2Page() {
  const project = getProject("proyecto2")
  if (!project) notFound()
  return <ProjectView project={project} />
}
