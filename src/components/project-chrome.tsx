import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"

import { GithubIcon } from "@/components/github-icon"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { GITHUB_URL, type Project } from "@/lib/projects"
import { cn } from "@/lib/utils"

type ProjectChromeProps = {
  project: Project
}

/**
 * Compact top bar shared by project routes: back to hub, label, GitHub.
 * Fixed at the top of the viewport; project navs sit below via --project-chrome-h.
 */
export function ProjectChrome({ project }: ProjectChromeProps) {
  return (
    <header className="fixed inset-x-0 top-0 z-[60] flex min-h-[58px] shrink-0 flex-wrap items-center justify-between gap-3 border-b border-white/15 bg-black/90 px-4 py-3 text-white backdrop-blur-xl">
      <div className="flex min-w-0 flex-wrap items-center gap-3">
        <Link
          href="/"
          className={cn(
            buttonVariants({ variant: "outline", size: "sm" }),
            "rounded-lg border border-white/15 bg-[#18181B] text-white shadow-none hover:bg-[#27272A] hover:text-white"
          )}
        >
          <ArrowLeftIcon data-icon="inline-start" />
          Hub
        </Link>

        <Badge className="rounded-full border border-[#006FEE]/40 bg-[#006FEE]/15 px-3 font-mono text-[10px] tracking-widest text-[#66AAF9] uppercase">
          {project.label}
        </Badge>
      </div>

      <a
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "rounded-lg border border-[#006FEE] bg-[#006FEE] font-mono text-xs font-bold tracking-wide text-white shadow-none hover:bg-[#338EF7]"
        )}
      >
        <GithubIcon data-icon="inline-start" />
        jorgemejia25
      </a>
    </header>
  )
}
