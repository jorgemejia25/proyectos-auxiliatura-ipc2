/**
 * Converts extracted DC HTML bodies into React JSX modules.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import * as cheerio from "cheerio"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, "..")
const VOID = new Set([
  "area",
  "base",
  "br",
  "col",
  "embed",
  "hr",
  "img",
  "input",
  "link",
  "meta",
  "param",
  "source",
  "track",
  "wbr",
])

/**
 * Resolves a template token against the current loop scopes.
 */
function expr(token, scopeStack) {
  const parts = token.trim().split(".")
  const rootName = parts[0]
  for (let i = scopeStack.length - 1; i >= 0; i -= 1) {
    if (scopeStack[i] === rootName) {
      return parts.length === 1 ? rootName : `${rootName}.${parts.slice(1).join(".")}`
    }
  }
  return parts.length === 1 ? `v.${rootName}` : `v.${parts.join(".")}`
}

/**
 * Converts mustache text into JSX children expressions.
 */
function toJsxChildren(text, scopeStack) {
  const re = /\{\{\s*([^}]+?)\s*\}\}/g
  const parts = []
  let last = 0
  let match = re.exec(text)
  while (match) {
    if (match.index > last) {
      parts.push(`{${JSON.stringify(text.slice(last, match.index))}}`)
    }
    parts.push(`{${expr(match[1], scopeStack)}}`)
    last = match.index + match[0].length
    match = re.exec(text)
  }
  if (last < text.length) {
    parts.push(`{${JSON.stringify(text.slice(last))}}`)
  }
  return parts.join("")
}

/**
 * Converts an HTML attribute value into a JSX attribute value.
 */
function convertAttrValue(val, attrName, scopeStack) {
  const fullBind = val.trim().match(/^\{\{\s*([^}]+?)\s*\}\}$/)
  if (fullBind) {
    return `{${expr(fullBind[1], scopeStack)}}`
  }
  if (/\{\{/.test(val)) {
    let out = "`"
    const re = /\{\{\s*([^}]+?)\s*\}\}/g
    let last = 0
    let match = re.exec(val)
    while (match) {
      out += val.slice(last, match.index).replace(/`/g, "\\`").replace(/\$/g, "\\$")
      out += "${" + expr(match[1], scopeStack) + "}"
      last = match.index + match[0].length
      match = re.exec(val)
    }
    out += val.slice(last).replace(/`/g, "\\`").replace(/\$/g, "\\$") + "`"
    if (attrName === "style") return `{css(${out})}`
    return `{${out}}`
  }
  if (attrName === "style") return `{css(${JSON.stringify(val)})}`
  if (val === "" || val === attrName) return ""
  return JSON.stringify(val)
}

/**
 * Maps HTML attribute names to React equivalents.
 */
function jsxAttrName(name) {
  const lower = name.toLowerCase()
  if (lower === "class") return "className"
  if (lower === "for") return "htmlFor"
  if (lower === "tabindex") return "tabIndex"
  if (lower === "onclick") return "onClick"
  if (lower === "onchange") return "onChange"
  if (lower === "onmouseenter") return "onMouseEnter"
  if (lower === "onmouseleave") return "onMouseLeave"
  if (lower === "oninput") return "onInput"
  if (name.includes("-") && !name.startsWith("data-") && !name.startsWith("aria-")) {
    return name.replace(/-([a-z])/g, (_, c) => c.toUpperCase())
  }
  return name
}

/**
 * Recursively converts a cheerio DOM node into JSX source.
 */
function convertNode($, el, scopeStack, indent) {
  const pad = "  ".repeat(indent)
  if (el.type === "text") {
    const text = el.data
    if (!text || !text.trim()) return text && text.includes("\n") ? "\n" : ""
    return `${pad}${toJsxChildren(text, scopeStack)}\n`
  }
  if (el.type !== "tag") return ""

  const tag = el.name.toLowerCase()

  if (tag === "sc-for") {
    const listRaw = el.attribs.list || ""
    const as = el.attribs.as || "item"
    const listExpr = listRaw.match(/\{\{\s*([^}]+)\s*\}\}/)
    const list = listExpr ? expr(listExpr[1], scopeStack) : listRaw
    const childScope = scopeStack.concat([as])
    const kids = $(el)
      .contents()
      .toArray()
      .map((child) => convertNode($, child, childScope, indent + 2))
      .join("")
    return (
      `${pad}{${list}.map((${as}, ${as}Idx) => (\n` +
      `${pad}  <Fragment key={${as}Idx}>\n` +
      `${kids}` +
      `${pad}  </Fragment>\n` +
      `${pad}))}\n`
    )
  }

  if (tag === "sc-if") {
    const valRaw = el.attribs.value || ""
    const valExpr = valRaw.match(/\{\{\s*([^}]+)\s*\}\}/)
    const cond = valExpr ? expr(valExpr[1], scopeStack) : valRaw
    const kids = $(el)
      .contents()
      .toArray()
      .map((child) => convertNode($, child, scopeStack, indent + 2))
      .join("")
    return (
      `${pad}{!!(${cond}) ? (\n` +
      `${pad}  <>\n` +
      `${kids}` +
      `${pad}  </>\n` +
      `${pad}) : null}\n`
    )
  }

  const attrs = []
  for (const [rawName, rawVal] of Object.entries(el.attribs || {})) {
    if (rawName.startsWith("hint-")) continue
    const name = jsxAttrName(rawName)
    const value = convertAttrValue(rawVal, name, scopeStack)
    if (value === "") attrs.push(name)
    else attrs.push(`${name}=${value}`)
  }
  const attrStr = attrs.length ? ` ${attrs.join(" ")}` : ""
  const children = $(el).contents().toArray()
  if (VOID.has(tag) && children.length === 0) {
    return `${pad}<${tag}${attrStr} />\n`
  }
  const kids = children.map((child) => convertNode($, child, scopeStack, indent + 1)).join("")
  if (!kids.trim()) return `${pad}<${tag}${attrStr} />\n`
  return `${pad}<${tag}${attrStr}>\n${kids}${pad}</${tag}>\n`
}

/**
 * Scopes artifact CSS so it does not restyle the Next.js document shell.
 */
function scopeCss(styleCss, name) {
  const scope = `.dc-artifact--${name}`
  return styleCss
    .replace(/\*\s*\{/g, `${scope},${scope} *{`)
    .replace(/\bbody\s*\{/g, `${scope}{`)
    .replace(/\ba\s*\{/g, `${scope} a{`)
    .replace(/\ba:hover\s*\{/g, `${scope} a:hover{`)
    .replace(/select,button,input\s*\{/g, `${scope} select,${scope} button,${scope} input{`)
    .replace(/::selection\s*\{/g, `${scope} ::selection{`)
}

/**
 * Builds the full TSX module for one artifact.
 */
function buildModule(name, componentName, styleCss, bodyHtml) {
  const $ = cheerio.load(`<div id="__root">${bodyHtml}</div>`, {
    xml: { xmlMode: false },
    decodeEntities: false,
  })
  const root = $("#__root").get(0)
  const jsx = $(root)
    .contents()
    .toArray()
    .map((child) => convertNode($, child, [], 3))
    .join("")
  const scoped = scopeCss(styleCss, name)

  return `// @ts-nocheck
"use client"

import { Fragment } from "react"

import { useDcLogic } from "@/components/dc/use-dc-logic"
import { css } from "@/components/dc/css"
import { ${componentName}Logic } from "@/components/projects/${name}/logic"

const ARTIFACT_CSS = ${JSON.stringify(scoped)}

/**
 * Native React rendering of the ${componentName} DC artifact.
 */
export function ${componentName}Artifact() {
  const v = useDcLogic(${componentName}Logic, {
    ${name === "practica1" ? "mostrarCodigo: true,\n    pacientesDemo: false,\n    dosisPorKgDefault: 5," : 'accent: "#7C3AED",\n    stepMs: 110,\n    showDot: true,\n    carnet: "#Carnet",'}
  })

  return (
    <div className="dc-artifact dc-artifact--${name}">
      <style>{\`\${ARTIFACT_CSS}
.dc-artifact--${name} { min-height: 100%; }
\`}</style>
${jsx}    </div>
  )
}
`
}

for (const item of [
  { name: "practica1", componentName: "Practica1" },
  { name: "proyecto1", componentName: "Proyecto1" },
]) {
  const base = path.join(root, "_extract_tmp", item.name)
  const body = fs.readFileSync(path.join(base, "body.html"), "utf8")
  const style = fs.readFileSync(path.join(base, "style.css"), "utf8")
  const outDir = path.join(root, "src/components/projects", item.name)
  fs.mkdirSync(outDir, { recursive: true })
  const mod = buildModule(item.name, item.componentName, style, body)
  fs.writeFileSync(path.join(outDir, "artifact.tsx"), mod)
  console.log("wrote", item.name, "artifact.tsx", mod.length)
}
