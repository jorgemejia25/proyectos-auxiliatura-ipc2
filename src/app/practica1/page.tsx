import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ProjectView } from "@/components/project-view"
import { getProject } from "@/lib/projects"

export const metadata: Metadata = {
  title: "Practica1 · Veterinaria POO",
  description:
    "Práctica 1 de IPC2: sistema de citas veterinarias con POO en C#.",
}

/**
 * Route for Practica1 (Veterinaria POO).
 */
export default function Practica1Page() {
  const project = getProject("practica1")
  if (!project) notFound()
  return <ProjectView project={project} />
}
