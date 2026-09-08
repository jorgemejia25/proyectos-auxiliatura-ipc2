import { ProjectChrome } from "@/components/project-chrome"
import { Practica1View } from "@/components/projects/practica1"
import { Practica2View } from "@/components/projects/practica2"
import { Proyecto1View } from "@/components/projects/proyecto1"
import { Proyecto2View } from "@/components/projects/proyecto2"
import type { Project } from "@/lib/projects"

type ProjectViewProps = {
  project: Project
}

/**
 * Full-viewport project shell with atomized Next.js project views.
 * Chrome is fixed; content scrolls underneath with top offset for chrome height.
 */
export function ProjectView({ project }: ProjectViewProps) {
  return (
    <div className="flex min-h-dvh flex-col [--project-chrome-h:58px] [--project-nav-h:58px]">
      <ProjectChrome project={project} />
      <div className="min-h-0 flex-1 overflow-auto pt-[58px]">
        {project.slug === "practica1" ? <Practica1View /> : null}
        {project.slug === "practica2" ? <Practica2View /> : null}
        {project.slug === "proyecto1" ? <Proyecto1View /> : null}
        {project.slug === "proyecto2" ? <Proyecto2View /> : null}
      </div>
    </div>
  )
}
