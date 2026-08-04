"use client"

import dynamic from "next/dynamic"

import { LabChrome } from "@/components/lab-chrome"
import type { Lab } from "@/lib/labs"

const GitFlowView = dynamic(
  () => import("@/components/labs/git-flow").then((mod) => mod.GitFlowView),
  { ssr: false }
)
const TdaLabView = dynamic(
  () => import("@/components/labs/tda-lab").then((mod) => mod.TdaLabView),
  { ssr: false }
)
const JsonLabView = dynamic(
  () => import("@/components/labs/json-lab").then((mod) => mod.JsonLabView),
  { ssr: false }
)
const XmlLabView = dynamic(
  () => import("@/components/labs/xml-lab").then((mod) => mod.XmlLabView),
  { ssr: false }
)
const PooLabView = dynamic(
  () => import("@/components/labs/poo-lab").then((mod) => mod.PooLabView),
  { ssr: false }
)

type LabViewProps = {
  lab: Lab
}

/**
 * Full-viewport laboratory shell with chrome + client-only React lab view.
 * Labs that touch browser APIs (DOMParser, document) mount after hydration.
 */
export function LabView({ lab }: LabViewProps) {
  return (
    <div className="flex min-h-dvh flex-col [--project-chrome-h:58px]">
      <LabChrome lab={lab} />
      <div className="min-h-0 flex-1 overflow-auto pt-[58px]">
        {lab.slug === "git-flow" ? <GitFlowView /> : null}
        {lab.slug === "poo-lab" ? <PooLabView /> : null}
        {lab.slug === "tda-lab" ? <TdaLabView /> : null}
        {lab.slug === "json-lab" ? <JsonLabView /> : null}
        {lab.slug === "xml-lab" ? <XmlLabView /> : null}
      </div>
    </div>
  )
}
