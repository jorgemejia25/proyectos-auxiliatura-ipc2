import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { LabView } from "@/components/lab-view"
import { getLab, labs } from "@/lib/labs"

type LabPageProps = {
  params: Promise<{ slug: string }>
}

/**
 * Builds static params for every laboratory slug.
 */
export function generateStaticParams() {
  return labs.map((lab) => ({ slug: lab.slug }))
}

/**
 * Per-laboratory metadata for the App Router.
 */
export async function generateMetadata({
  params,
}: LabPageProps): Promise<Metadata> {
  const { slug } = await params
  const lab = getLab(slug)
  if (!lab) return { title: "Laboratorio" }
  return {
    title: `${lab.label} · ${lab.title}`,
    description: lab.summary,
  }
}

/**
 * Route for a single IPC2 laboratory artifact.
 */
export default async function LabPage({ params }: LabPageProps) {
  const { slug } = await params
  const lab = getLab(slug)
  if (!lab) notFound()
  return <LabView lab={lab} />
}
