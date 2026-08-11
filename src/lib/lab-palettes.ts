import type { Lab } from "@/lib/labs"

/**
 * Visual tokens for each laboratory theme.
 * Keeps hub chrome, selector tiles and in-lab accents aligned.
 */
export type LabPalette = {
  /** Page / canvas background. */
  bg: string
  /** Primary text and borders. */
  ink: string
  /** Soft text on dark chrome. */
  inkSoft: string
  /** Brand accent (headers, dots, CTAs). */
  accent: string
  /** Text on accent fills. */
  accentInk: string
  /** Secondary highlight (selection, pills). */
  highlight: string
  /** Text on highlight fills. */
  highlightInk: string
  /** Raised card / panel surface. */
  surface: string
  /** Alternating section wash. */
  wash: string
  /** Dark chrome background. */
  chrome: string
}

export const labPalettes = {
  /** Git Flow — cool graph paper + crimson ember. */
  ink: {
    bg: "#DDE5F0",
    ink: "#12161F",
    inkSoft: "#E8EEF7",
    accent: "#E11D48",
    accentInk: "#FFFFFF",
    highlight: "#FFB703",
    highlightInk: "#12161F",
    surface: "#F4F7FC",
    wash: "#C9D5E8",
    chrome: "#12161F",
  },
  /** C# Básico — raspberry notebook + lime marker. */
  rose: {
    bg: "#FFEAF1",
    ink: "#260914",
    inkSoft: "#FFF1F6",
    accent: "#C2185B",
    accentInk: "#FFFFFF",
    highlight: "#B9F227",
    highlightInk: "#162000",
    surface: "#FFF8FA",
    wash: "#FFD0E0",
    chrome: "#260914",
  },
  /** Graphviz + C# — drafting paper + royal blue. */
  yellow: {
    bg: "#FFF6CC",
    ink: "#171810",
    inkSoft: "#FFF9DF",
    accent: "#2639D4",
    accentInk: "#FFFFFF",
    highlight: "#FF5D00",
    highlightInk: "#FFFFFF",
    surface: "#FFFBEB",
    wash: "#FFE68A",
    chrome: "#171810",
  },
  /** JSON Lab — ice field + signal blue. */
  blue: {
    bg: "#E8F0FF",
    ink: "#06142E",
    inkSoft: "#E8F0FF",
    accent: "#0047FF",
    accentInk: "#FFFFFF",
    highlight: "#35E0FF",
    highlightInk: "#06142E",
    surface: "#F5F8FF",
    wash: "#D6E4FF",
    chrome: "#06142E",
  },
  /** XML Lab — mist forest + leaf green. */
  green: {
    bg: "#E6F5EC",
    ink: "#0A1F14",
    inkSoft: "#E6F5EC",
    accent: "#00A64F",
    accentInk: "#FFFFFF",
    highlight: "#D4F567",
    highlightInk: "#0A1F14",
    surface: "#F3FBF6",
    wash: "#CDEAD8",
    chrome: "#0A1F14",
  },
  /** TDA Lab — circuit paper + lime spark. */
  violet: {
    bg: "#E4DCFF",
    ink: "#160B2E",
    inkSoft: "#EDE6FF",
    accent: "#7C3AED",
    accentInk: "#FFFFFF",
    highlight: "#C6FF3D",
    highlightInk: "#160B2E",
    surface: "#F4EFFF",
    wash: "#D2C4FF",
    chrome: "#160B2E",
  },
  /** POO Lab — forge peach + molten orange. */
  orange: {
    bg: "#FFF1E8",
    ink: "#1A0F0A",
    inkSoft: "#FFF1E8",
    accent: "#FF4D00",
    accentInk: "#FFFFFF",
    highlight: "#FFC14A",
    highlightInk: "#1A0F0A",
    surface: "#FFF7F0",
    wash: "#FFD8BE",
    chrome: "#1A0F0A",
  },
} as const satisfies Record<Lab["theme"], LabPalette>

/**
 * Resolves the palette for a laboratory theme key.
 */
export function getLabPalette(theme: Lab["theme"]): LabPalette {
  return labPalettes[theme]
}

/**
 * Builds CSS custom properties for a laboratory artifact root.
 */
export function labPaletteCssVars(theme: Lab["theme"]): string {
  const p = getLabPalette(theme)
  return [
    `--lab-bg:${p.bg}`,
    `--lab-ink:${p.ink}`,
    `--lab-ink-soft:${p.inkSoft}`,
    `--lab-accent:${p.accent}`,
    `--lab-accent-ink:${p.accentInk}`,
    `--lab-highlight:${p.highlight}`,
    `--lab-highlight-ink:${p.highlightInk}`,
    `--lab-surface:${p.surface}`,
    `--lab-wash:${p.wash}`,
    `--lab-chrome:${p.chrome}`,
  ].join(";")
}
