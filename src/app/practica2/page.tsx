import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ProjectView } from "@/components/project-view"
import { getProject } from "@/lib/projects"

export const metadata: Metadata = {
  title: "Práctica 2 · Reproductor de música",
  description:
    "Guía de IPC2 para implementar un reproductor con cola, árbol binario, JSON, Windows Forms y Graphviz.",
}

export default function Practica2Page() {
  const project = getProject("practica2")
  if (!project) notFound()
  return <ProjectView project={project} />
}
