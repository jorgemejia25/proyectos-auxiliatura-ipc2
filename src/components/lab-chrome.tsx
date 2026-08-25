import Link from "next/link"
import { ArrowLeftIcon } from "lucide-react"

import { GithubIcon } from "@/components/github-icon"
import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import { getLabPalette } from "@/lib/lab-palettes"
import { GITHUB_URL } from "@/lib/projects"
import type { Lab } from "@/lib/labs"
import { cn } from "@/lib/utils"

type LabChromeProps = {
  lab: Lab
}

/**
 * Compact top bar shared by laboratory routes: back to hub, label, GitHub.
 * Accent colors follow the active laboratory palette.
 */
export function LabChrome({ lab }: LabChromeProps) {
  const palette = getLabPalette(lab.theme)

  return (
    <header
      className="fixed inset-x-0 top-0 z-[60] flex min-h-[58px] shrink-0 flex-wrap items-center justify-between gap-3 border-b border-white/15 bg-black/90 px-4 py-3 text-white backdrop-blur-xl"
      style={{
        color: "#ECEDEE",
      }}
    >
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

        <Badge
          className="rounded-full border bg-transparent px-3 font-mono text-[10px] tracking-widest uppercase"
          style={{
            borderColor: palette.highlight,
            color: palette.highlight,
          }}
        >
          Lab · {lab.label}
        </Badge>
      </div>

      <a
        href={GITHUB_URL}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          buttonVariants({ variant: "outline", size: "sm" }),
          "rounded-lg border font-mono text-xs font-bold tracking-wide shadow-none hover:brightness-110"
        )}
        style={{
          borderColor: palette.highlight,
          background: palette.highlight,
          color: palette.highlightInk,
        }}
      >
        <GithubIcon data-icon="inline-start" />
        jorgemejia25
      </a>
    </header>
  )
}
