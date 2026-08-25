"use client"

import { Button, Card, Chip } from "@heroui/react"
import { ArrowUpRightIcon, BookOpenIcon, BoxesIcon, FlaskConicalIcon } from "lucide-react"
import Link from "next/link"

import { GithubIcon } from "@/components/github-icon"
import { labs } from "@/lib/labs"
import { GITHUB_URL, GITHUB_USER, projects } from "@/lib/projects"

const labAccents = {
  ink: "#F31260",
  blue: "#006FEE",
  green: "#17C964",
  violet: "#9353D3",
  orange: "#F5A524",
  rose: "#F31260",
  yellow: "#F5A524",
} as const

/** Dark HeroUI-inspired landing page for projects and laboratory material. */
export function ProjectSelector() {
  return (
    <main className="hub-shell relative min-h-dvh overflow-hidden bg-black text-[#ECEDEE]">
      <div aria-hidden="true" className="hub-grid pointer-events-none absolute inset-0" />
      <div aria-hidden="true" className="hub-glow hub-glow-primary" />
      <div aria-hidden="true" className="hub-glow hub-glow-secondary" />

      <div className="relative mx-auto w-full max-w-[1400px] px-5 py-7 sm:px-8 lg:px-10">
        <nav className="animate-hub-rise flex items-center justify-between border-b border-white/10 pb-6">
          <div className="flex items-center gap-3">
            <span className="size-2.5 animate-pulse bg-[#006FEE]" />
            <span className="text-xs font-extrabold tracking-[0.2em] uppercase">IPC2 / Hub</span>
          </div>
          <Button
            size="sm"
            variant="primary"
            onPress={() => window.open(GITHUB_URL, "_blank", "noopener,noreferrer")}
            className="bg-[#006FEE] font-mono text-xs font-semibold text-white hover:bg-[#338EF7]"
          >
            <GithubIcon className="size-4" />
            {GITHUB_USER}
          </Button>
        </nav>

        <header className="grid gap-10 py-14 lg:grid-cols-[1.2fr_.8fr] lg:items-end lg:py-20">
          <div className="animate-hub-rise [animation-delay:80ms]">
            <div className="mb-6 flex flex-wrap gap-2">
              <Chip color="accent" size="sm" variant="soft">C#</Chip>
              <Chip color="default" size="sm" variant="soft">Estructuras de datos</Chip>
              <Chip color="success" size="sm" variant="soft">Material interactivo</Chip>
            </div>
            <p className="mb-4 text-xs font-bold tracking-[0.2em] text-[#006FEE] uppercase">
              Introducción a la Programación y Computación 2
            </p>
            <h1 className="max-w-4xl text-[clamp(2.7rem,7vw,6.8rem)] font-extrabold leading-[0.9] tracking-[-0.055em] text-white">
              Proyectos y laboratorios, en un solo lugar.
            </h1>
          </div>
          <div className="animate-hub-rise border-l border-white/15 pl-6 [animation-delay:150ms]">
            <p className="max-w-lg text-base leading-7 text-[#A1A1AA]">
              Consulta los enunciados, explora conceptos y utiliza simuladores preparados
              para acompañar el curso durante el semestre.
            </p>
            <div className="mt-7 flex items-center gap-7 text-sm text-[#71717A]">
              <span><strong className="mr-2 text-2xl text-white">{projects.length}</strong>proyectos</span>
              <span><strong className="mr-2 text-2xl text-white">{labs.length}</strong>laboratorios</span>
            </div>
          </div>
        </header>

        <section aria-labelledby="projects-heading" className="pb-20">
          <SectionHeading icon={<BoxesIcon className="size-4" />} eyebrow="Evaluaciones" title="Proyectos" id="projects-heading" />
          <div className="grid gap-4 lg:grid-cols-3">
            {projects.map((project, index) => (
              <Link key={project.slug} href={`/${project.slug}`} className="group outline-none">
                <Card
                  variant="default"
                  className="hub-card h-full min-h-72 border border-white/10 bg-[#09090B]/90 transition-all duration-300 group-hover:-translate-y-1 group-hover:border-[#006FEE]/70 group-hover:bg-[#0d111b] group-focus-visible:ring-2 group-focus-visible:ring-[#006FEE]"
                  style={{ animationDelay: `${220 + index * 70}ms` }}
                >
                  <Card.Header className="flex items-start justify-between gap-4 p-6 pb-3">
                    <div>
                      <p className="mb-3 text-[10px] font-bold tracking-[0.2em] text-[#71717A] uppercase">
                        {String(index + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                      </p>
                      <Card.Title className="text-3xl font-extrabold tracking-[-0.035em] text-white">{project.label}</Card.Title>
                      <p className="mt-1 text-sm font-semibold text-[#338EF7]">{project.title}</p>
                    </div>
                    <span className="grid size-10 place-items-center rounded-xl bg-[#006FEE]/10 text-[#338EF7] transition-colors group-hover:bg-[#006FEE] group-hover:text-white">
                      <ArrowUpRightIcon className="size-5" />
                    </span>
                  </Card.Header>
                  <Card.Content className="flex flex-1 flex-col p-6 pt-3">
                    <p className="text-sm leading-6 text-[#A1A1AA]">{project.summary}</p>
                    <div className="mt-6 flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Chip key={tag} size="sm" variant="soft" color="default">{tag}</Chip>
                      ))}
                    </div>
                  </Card.Content>
                  <Card.Footer className="border-t border-white/10 p-6 py-4">
                    <span className="text-[11px] font-bold tracking-[0.12em] text-[#F31260] uppercase">
                      Entrega · {project.delivery}
                    </span>
                  </Card.Footer>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        <section aria-labelledby="labs-heading" className="pb-16">
          <SectionHeading icon={<FlaskConicalIcon className="size-4" />} eyebrow="Material de clase" title="Laboratorios" id="labs-heading" />
          <div className="grid gap-px overflow-hidden rounded-2xl border border-white/10 bg-white/10 sm:grid-cols-2 lg:grid-cols-3">
            {labs.map((lab, index) => (
              <Link key={lab.slug} href={`/laboratorios/${lab.slug}`} className="group relative min-h-52 bg-[#09090B] p-6 outline-none transition-colors hover:bg-[#111114] focus-visible:z-10 focus-visible:ring-2 focus-visible:ring-[#006FEE]">
                <span className="mb-8 block h-1 w-10 rounded-full transition-all duration-300 group-hover:w-20" style={{ backgroundColor: labAccents[lab.theme] }} />
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-[10px] font-bold tracking-[0.18em] text-[#71717A] uppercase">Lab {String(index + 1).padStart(2, "0")}</p>
                    <h3 className="mt-2 text-2xl font-bold tracking-tight text-white">{lab.label}</h3>
                    <p className="mt-1 text-xs font-semibold" style={{ color: labAccents[lab.theme] }}>{lab.title}</p>
                  </div>
                  <ArrowUpRightIcon className="size-5 text-[#52525B] transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white" />
                </div>
                <p className="mt-5 text-sm leading-6 text-[#A1A1AA]">{lab.summary}</p>
              </Link>
            ))}
          </div>
        </section>

        <footer className="flex flex-col gap-3 border-t border-white/10 py-8 text-xs text-[#71717A] sm:flex-row sm:items-center sm:justify-between">
          <span>Universidad de San Carlos de Guatemala · Facultad de Ingeniería</span>
          <span className="inline-flex items-center gap-2"><BookOpenIcon className="size-4" /> IPC2 · 2026</span>
        </footer>
      </div>
    </main>
  )
}

function SectionHeading({ icon, eyebrow, title, id }: { icon: React.ReactNode; eyebrow: string; title: string; id: string }) {
  return (
    <div className="mb-6 flex items-end justify-between gap-6 border-b border-white/10 pb-5">
      <div>
        <p className="mb-2 flex items-center gap-2 text-[10px] font-bold tracking-[0.2em] text-[#71717A] uppercase">{icon} {eyebrow}</p>
        <h2 id={id} className="text-4xl font-extrabold tracking-[-0.04em] text-white sm:text-5xl">{title}</h2>
      </div>
      <span className="hidden text-xs font-semibold text-[#52525B] sm:block">Explora →</span>
    </div>
  )
}
