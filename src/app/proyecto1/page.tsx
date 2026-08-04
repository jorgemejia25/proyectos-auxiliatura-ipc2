import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ProjectView } from "@/components/project-view"
import { getProject } from "@/lib/projects"

export const metadata: Metadata = {
  title: "Proyecto1 · Chapín Warriors",
  description:
    "Proyecto 1 de IPC2: sistema de control Chapín Warriors con XML y TDA propios.",
}

/**
 * Route for Proyecto1 (Chapín Warriors).
 */
export default function Proyecto1Page() {
  const project = getProject("proyecto1")
  if (!project) notFound()
  return <ProjectView project={project} />
}
