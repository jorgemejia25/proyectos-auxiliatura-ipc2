import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { ProjectView } from "@/components/project-view"
import { getProject } from "@/lib/projects"

export const metadata: Metadata = {
  title: "Proyecto 3 · API de autorización de facturas",
  description:
    "Proyecto 3 de IPC2: API HTTP en .NET para autorizar DTE, validar NIT, persistir datos y consumirla con Razor Pages.",
}

/**
 * Route for Proyecto 3 (SAT invoice authorization API).
 */
export default function Proyecto3Page() {
  const project = getProject("proyecto3")
  if (!project) notFound()
  return <ProjectView project={project} />
}
