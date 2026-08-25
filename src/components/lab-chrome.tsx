"use client"

import { Button, Chip } from "@heroui/react"
import { ArrowLeftIcon } from "lucide-react"
import { useRouter } from "next/navigation"

import { GithubIcon } from "@/components/github-icon"
import { getLabPalette } from "@/lib/lab-palettes"
import type { Lab } from "@/lib/labs"
import { GITHUB_URL } from "@/lib/projects"

type LabChromeProps = {
  lab: Lab
}

/** HeroUI navigation shared by every laboratory route. */
export function LabChrome({ lab }: LabChromeProps) {
  const router = useRouter()
  const palette = getLabPalette(lab.theme)

  return (
    <header className="fixed inset-x-0 top-0 z-[60] flex min-h-[58px] shrink-0 flex-wrap items-center justify-between gap-3 border-b border-white/15 bg-black/90 px-4 py-3 text-white backdrop-blur-xl">
      <div className="flex min-w-0 flex-wrap items-center gap-3">
        <Button
          size="sm"
          variant="secondary"
          onPress={() => router.push("/")}
          className="border border-white/15 bg-[#18181B] text-white hover:bg-[#27272A]"
        >
          <ArrowLeftIcon className="size-4" />
          Hub
        </Button>

        <Chip
          size="sm"
          variant="soft"
          className="font-mono text-[10px] tracking-widest uppercase"
          style={{ backgroundColor: `${palette.highlight}22`, color: palette.highlight }}
        >
          Lab · {lab.label}
        </Chip>
      </div>

      <Button
        size="sm"
        onPress={() => window.open(GITHUB_URL, "_blank", "noopener,noreferrer")}
        className="bg-[#006FEE] font-mono text-xs font-bold text-white hover:bg-[#338EF7]"
      >
        <GithubIcon className="size-4" />
        jorgemejia25
      </Button>
    </header>
  )
}
