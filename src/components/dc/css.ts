import type { CSSProperties } from "react"

/**
 * Parses a CSS declaration string into a React style object.
 */
export function css(value: string | CSSProperties): CSSProperties {
  if (typeof value !== "string") return value

  const style: CSSProperties = {}
  for (const part of value.split(";")) {
    const trimmed = part.trim()
    if (!trimmed) continue
    const colon = trimmed.indexOf(":")
    if (colon === -1) continue
    const prop = trimmed.slice(0, colon).trim()
    const val = trimmed.slice(colon + 1).trim()
    if (!prop || !val) continue
    const camel = prop.replace(/-([a-z])/g, (_, char: string) => char.toUpperCase())
    ;(style as Record<string, string>)[camel] = val
  }
  return style
}
