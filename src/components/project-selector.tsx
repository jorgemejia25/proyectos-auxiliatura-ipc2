import Link from "next/link"
import { ArrowUpRightIcon } from "lucide-react"

import { GithubIcon } from "@/components/github-icon"
import { buttonVariants } from "@/components/ui/button"
import { getLabPalette } from "@/lib/lab-palettes"
import { labs } from "@/lib/labs"
import { GITHUB_URL, GITHUB_USER, projects } from "@/lib/projects"
import { cn } from "@/lib/utils"

/**
 * Inline tile styles for laboratory themes (aligned with lab palettes).
 */
function labThemeStyles(theme: (typeof labs)[number]["theme"]) {
  const p = getLabPalette(theme)
  return {
    card: { background: p.accent, color: p.accentInk },
    title: { color: p.accentInk },
    body: { color: `${p.accentInk}D9` },
    accent: { color: p.highlight },
    icon: { color: p.highlight },
  }
}

/**
 * Landing hub: GitHub identity + project tiles + laboratories.
 */
export function ProjectSelector() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-[#E8F0FF] text-[#06142E]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-80 hub-grid"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-[-10%] size-[420px] rounded-full bg-[#35E0FF]/30 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-[-120px] left-[-80px] size-[380px] rounded-full bg-[#7C3AED]/20 blur-3xl"
      />

      <div className="relative mx-auto flex min-h-dvh w-full max-w-5xl flex-col justify-center gap-12 px-5 py-16 sm:px-8">
        <header className="flex flex-col gap-6 animate-hub-rise">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-fit items-center gap-3 border-4 border-[#06142E] bg-[#06142E] px-4 py-3 text-[#35E0FF] shadow-[8px_8px_0_#1E4FD8] transition-transform duration-200 hover:-translate-y-0.5"
          >
            <GithubIcon className="size-6" />
            <span className="font-[family-name:var(--font-display)] text-2xl tracking-tight sm:text-3xl">
              {GITHUB_USER}
            </span>
          </a>

          <h1 className="max-w-3xl font-[family-name:var(--font-display)] text-5xl leading-[0.9] tracking-[-0.04em] text-[#06142E] uppercase sm:text-7xl">
            Selector de
            <br />
            proyectos
          </h1>
        </header>

        <section aria-label="Proyectos disponibles" className="grid gap-5 md:grid-cols-2">
          {projects.map((project, index) => {
            const isCyan = project.theme === "cyan"
            return (
              <Link
                key={project.slug}
                href={`/${project.slug}`}
                className={cn(
                  "group relative flex flex-col gap-5 border-4 border-[#06142E] p-6 shadow-[10px_10px_0_#06142E] transition-all duration-200",
                  "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[14px_14px_0_#06142E]",
                  "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#35E0FF]",
                  "animate-hub-rise",
                  isCyan ? "bg-white" : "bg-[#120720] text-[#EDE4FF]"
                )}
                style={{ animationDelay: `${120 + index * 90}ms` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <h2
                    className={cn(
                      "font-[family-name:var(--font-display)] text-3xl leading-none tracking-tight uppercase sm:text-4xl",
                      isCyan ? "text-[#06142E]" : "text-white"
                    )}
                  >
                    {project.label}
                  </h2>
                  <ArrowUpRightIcon
                    className={cn(
                      "size-5 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5",
                      isCyan ? "text-[#1E4FD8]" : "text-[#C6FF3D]"
                    )}
                  />
                </div>

                <div className="mt-auto flex flex-col gap-3">
                  <p
                    className={cn(
                      "font-mono text-sm leading-relaxed",
                      isCyan ? "text-[#082A63]" : "text-[#D8C7FF]"
                    )}
                  >
                    {project.summary}
                  </p>
                  <p
                    className={cn(
                      "font-mono text-xs font-semibold tracking-wide uppercase",
                      isCyan ? "text-[#1E4FD8]" : "text-[#C6FF3D]"
                    )}
                  >
                    Entrega · {project.delivery}
                  </p>
                </div>
              </Link>
            )
          })}
        </section>

        <section aria-labelledby="labs-heading" className="flex flex-col gap-5">
          <div className="animate-hub-rise [animation-delay:280ms]">
            <p className="font-mono text-xs font-bold tracking-[0.2em] text-[#1E4FD8] uppercase">
              Material de clase
            </p>
            <h2
              id="labs-heading"
              className="mt-2 font-[family-name:var(--font-display)] text-4xl leading-none tracking-tight text-[#06142E] uppercase sm:text-5xl"
            >
              Laboratorios
            </h2>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            {labs.map((lab, index) => {
              const theme = labThemeStyles(lab.theme)
              return (
                <Link
                  key={lab.slug}
                  href={`/laboratorios/${lab.slug}`}
                  className={cn(
                    "group relative flex flex-col gap-4 border-4 border-[#06142E] p-5 shadow-[10px_10px_0_#06142E] transition-all duration-200",
                    "hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[14px_14px_0_#06142E]",
                    "focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#35E0FF]",
                    "animate-hub-rise"
                  )}
                  style={{
                    animationDelay: `${360 + index * 80}ms`,
                    ...theme.card,
                  }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex flex-col gap-1">
                      <h3
                        className="font-[family-name:var(--font-display)] text-2xl leading-none tracking-tight uppercase sm:text-3xl"
                        style={theme.title}
                      >
                        {lab.label}
                      </h3>
                      <p
                        className="font-mono text-xs font-bold tracking-wide uppercase"
                        style={theme.accent}
                      >
                        {lab.title}
                      </p>
                    </div>
                    <ArrowUpRightIcon
                      className="size-5 shrink-0 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                      style={theme.icon}
                    />
                  </div>

                  <p
                    className="font-mono text-sm leading-relaxed"
                    style={theme.body}
                  >
                    {lab.summary}
                  </p>
                </Link>
              )
            })}
          </div>
        </section>

        <footer className="flex flex-wrap items-center gap-3 animate-hub-rise [animation-delay:680ms]">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants({ variant: "outline", size: "sm" }),
              "rounded-none border-2 border-[#06142E] bg-white font-mono text-xs font-bold tracking-wide text-[#06142E] shadow-[4px_4px_0_#06142E] hover:bg-[#35E0FF]"
            )}
          >
            <GithubIcon data-icon="inline-start" />
            github.com/{GITHUB_USER}
          </a>
        </footer>
      </div>
    </main>
  )
}
