/**
 * Splits monolithic artifact.tsx files into section modules.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..")

/**
 * @param {string} name
 * @param {string} componentName
 * @param {{ interactive: string[], dataBound: Record<string, string[]> }} config
 */
function atomize(name, componentName, config) {
  const artifactPath = path.join(
    root,
    "src/components/projects",
    name,
    "artifact.tsx"
  )
  const lines = fs.readFileSync(artifactPath, "utf8").split("\n")
  const outDir = path.join(root, "src/components/projects", name)
  const sectionsDir = path.join(outDir, "sections")
  fs.mkdirSync(sectionsDir, { recursive: true })

  const cssLine = lines.find((line) => line.startsWith("const ARTIFACT_CSS"))
  if (!cssLine) throw new Error(`ARTIFACT_CSS missing in ${name}`)

  // Outer wrapper opens at first min-height div after return
  let outerStart = -1
  let navStart = -1
  let navEnd = -1
  for (let i = 0; i < lines.length; i += 1) {
    if (outerStart === -1 && lines[i].includes("min-height:100vh")) {
      outerStart = i
    }
    if (
      navStart === -1 &&
      lines[i].includes("position:sticky") &&
      lines[i].includes("z-index:50")
    ) {
      navStart = i
    }
    if (navStart !== -1 && navEnd === -1 && i > navStart && /^\s*<\/div>\s*$/.test(lines[i])) {
      // first closing div after sticky open may be inner; track depth from navStart
    }
  }

  // Parse nav by depth from sticky div
  if (navStart === -1) throw new Error("nav not found")
  let depth = 0
  for (let i = navStart; i < lines.length; i += 1) {
    const opens = (lines[i].match(/<div\b/g) || []).length
    const closes = (lines[i].match(/<\/div>/g) || []).length
    depth += opens - closes
    if (i > navStart && depth === 0) {
      navEnd = i
      break
    }
  }

  // Parse top-level sections
  const ranges = []
  let current = null
  let sectionDepth = 0
  for (let i = navEnd + 1; i < lines.length; i += 1) {
    const line = lines[i]
    if (/<section\b/.test(line)) {
      if (sectionDepth === 0) {
        const idMatch =
          line.match(/id=\{?"([^"}]+)"\}?/) || line.match(/id="([^"]+)"/)
        const fallback =
          ranges.length === 0
            ? "hero"
            : name === "proyecto1" && ranges.length === 1
              ? "objetivos"
              : `section_${ranges.length}`
        current = {
          start: i,
          id: idMatch ? idMatch[1] : fallback,
        }
      }
      sectionDepth += (line.match(/<section\b/g) || []).length
      sectionDepth -= (line.match(/<\/section>/g) || []).length
      if (sectionDepth === 0 && current) {
        current.end = i
        ranges.push(current)
        current = null
      }
    } else if (current && /<\/section>/.test(line)) {
      sectionDepth -= (line.match(/<\/section>/g) || []).length
      if (sectionDepth <= 0) {
        current.end = i
        ranges.push(current)
        current = null
        sectionDepth = 0
      }
    }
  }

  // styles.ts
  fs.writeFileSync(
    path.join(outDir, "styles.ts"),
    `/**
 * Scoped styles for the ${componentName} artifact shell.
 */
export const ARTIFACT_CSS = ${cssLine.replace(/^const ARTIFACT_CSS = /, "")}

/**
 * Injects artifact CSS into the document.
 */
export function ArtifactStyles() {
  return (
    <style>{\`\${ARTIFACT_CSS}
.dc-artifact--${name} { min-height: 100%; }
\`}</style>
  )
}
`
      .replace('export function ArtifactStyles()', 'export function ArtifactStyles(): React.JSX.Element')
  )

  // Fix styles.ts to import React type properly - write cleaner version
  const cssValue = cssLine.replace(/^const ARTIFACT_CSS = /, "").replace(/;$/, "")
  fs.writeFileSync(
    path.join(outDir, "styles.tsx"),
    `/**
 * Scoped styles for the ${componentName} artifact shell.
 */
export const ARTIFACT_CSS = ${cssValue}

/**
 * Injects artifact CSS into the document.
 */
export function ArtifactStyles() {
  return (
    <style>{\`\${ARTIFACT_CSS}
.dc-artifact--${name} { min-height: 100%; }
\`}</style>
  )
}
`
  )

  // nav
  const navJsx = lines.slice(navStart, navEnd + 1).join("\n")
  fs.writeFileSync(
    path.join(outDir, "sections", "nav.tsx"),
    `import { css } from "@/components/dc/css"

/**
 * Sticky in-page navigation for ${componentName}.
 */
export function ${componentName}Nav() {
  return (
${navJsx}
  )
}
`
  )

  const interactiveSet = new Set(config.interactive)
  const written = []

  for (const range of ranges) {
    const chunk = lines.slice(range.start, range.end + 1).join("\n")
    const isInteractive = interactiveSet.has(range.id)
    const fileBase = toFileName(range.id)
    const exportName = `${componentName}${toPascal(range.id)}Section`
    const vRefs = [
      ...new Set([...chunk.matchAll(/\bv\.([A-Za-z0-9_]+)/g)].map((m) => m[1])),
    ]

    if (isInteractive) {
      // Will be assembled later into interactive.tsx — store raw chunk
      fs.writeFileSync(
        path.join(sectionsDir, `${fileBase}.chunk.tsx.txt`),
        chunk
      )
      written.push({ id: range.id, fileBase, exportName, kind: "interactive", vRefs })
      continue
    }

    // Static or data-bound server section
    let body = chunk
    const dataKeys = config.dataBound[range.id] || []
    const props = dataKeys.map((key) => {
      // replace v.key with prop
      const re = new RegExp(`\\bv\\.${key}\\b`, "g")
      body = body.replace(re, key)
      return key
    })

    // remaining v. refs would be a problem
    const leftover = [...body.matchAll(/\bv\.([A-Za-z0-9_]+)/g)].map((m) => m[1])
    if (leftover.length) {
      console.warn(name, range.id, "leftover v refs", leftover)
    }

    const propType =
      props.length === 0
        ? ""
        : `\ntype ${exportName}Props = {\n${props
            .map((p) => {
              if (p === "hcFilas" || p === "treeText" || p === "repoName") {
                if (p === "hcFilas") {
                  return `  hcFilas: Array<{ nombre: string; valor: number; peso: number; sangria: string; bg: string }>`
                }
                return `  ${p}: string`
              }
              return `  ${p}: unknown`
            })
            .join("\n")}\n}\n`

    const propArg =
      props.length === 0
        ? ""
        : `{ ${props.join(", ")} }: ${exportName}Props`

    const file = `import { Fragment } from "react"

import { css } from "@/components/dc/css"
${propType}
/**
 * ${range.id} section for ${componentName}.
 */
export function ${exportName}(${propArg}) {
  return (
${body}
  )
}
`
    fs.writeFileSync(path.join(sectionsDir, `${fileBase}.tsx`), file)
    written.push({
      id: range.id,
      fileBase,
      exportName,
      kind: props.length ? "data" : "static",
      props,
      vRefs,
    })
  }

  // Save interactive chunks metadata
  fs.writeFileSync(
    path.join(outDir, "atomize-meta.json"),
    JSON.stringify({ ranges: written, navStart, navEnd, outerStart }, null, 2)
  )

  // Remove temp styles.ts if created
  const badStyles = path.join(outDir, "styles.ts")
  if (fs.existsSync(badStyles)) fs.unlinkSync(badStyles)

  console.log(
    name,
    "sections:",
    written.map((w) => `${w.id}:${w.kind}`).join(", ")
  )
}

/**
 * @param {string} id
 */
function toFileName(id) {
  return id.replace(/_/g, "-")
}

/**
 * @param {string} id
 */
function toPascal(id) {
  return id
    .split(/[_-]/)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("")
}

atomize("practica1", "Practica1", {
  interactive: ["simulador", "codigo"],
  dataBound: {
    ruta: ["treeText"],
    hc: ["hcFilas"],
  },
})

atomize("proyecto1", "Proyecto1", {
  interactive: ["simulador", "xml", "codigo"],
  dataBound: {
    ruta: ["treeText"],
    entrega: ["repoName"],
  },
})
