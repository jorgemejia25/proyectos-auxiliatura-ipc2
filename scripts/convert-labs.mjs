/**
 * Extracts and converts laboratorio .dc.html files into React modules.
 */
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import * as cheerio from "cheerio"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const root = path.resolve(__dirname, "..")
const srcDir = path.join(root, "_extract_tmp", "laboratorios")

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

const LABS = [
  {
    file: "Git Flow Brutalista.dc.html",
    name: "git-flow",
    componentName: "GitFlow",
    kind: "dc",
    propsInit: "showAscii: true,",
  },
  {
    file: "JSON con System.Text.Json.dc.html",
    name: "json-lab",
    componentName: "JsonLab",
    kind: "dc",
    propsInit: "",
  },
  {
    file: "XML con XDocument.dc.html",
    name: "xml-lab",
    componentName: "XmlLab",
    kind: "dc",
    propsInit: "",
  },
]

/**
 * Extracts body HTML, style CSS and DC script from a .dc.html file.
 */
function extractDc(html) {
  const open = /<x-dc(?:\s[^>]*)?>/.exec(html)
  if (!open) throw new Error("missing <x-dc>")
  const close = html.lastIndexOf("</x-dc>")
  const inner = html.slice(open.index + open[0].length, close)

  const styleMatch = inner.match(/<style>([\s\S]*?)<\/style>/)
  const style = styleMatch ? styleMatch[1].trim() : ""

  const helmetEnd = inner.indexOf("</helmet>")
  let body = helmetEnd >= 0 ? inner.slice(helmetEnd + "</helmet>".length) : inner
  body = body.replace(/<script[\s\S]*$/i, "").trim()

  const scriptMatch = html.match(
    /<script type="text\/x-dc"[^>]*>([\s\S]*?)<\/script>/
  )
  const logic = scriptMatch ? scriptMatch[1].trim() : ""

  return { body, style, logic }
}

/**
 * Extracts slide sections from a deck-stage x-import document.
 */
function extractSlides(html) {
  const open = /<x-import\b[^>]*>/.exec(html)
  if (!open) throw new Error("missing <x-import>")
  const close = html.lastIndexOf("</x-import>")
  const inner = html.slice(open.index + open[0].length, close).trim()
  const styleMatch = html.match(/<style>([\s\S]*?)<\/style>/)
  const style = styleMatch ? styleMatch[1].trim() : ""
  return { body: inner, style, logic: "" }
}

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
 * Decodes HTML entities that DC source escapes for browser text nodes.
 */
function decodeHtmlEntities(text) {
  return text
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
}

/**
 * Converts mustache text into JSX children expressions.
 */
function toJsxChildren(text, scopeStack) {
  const decoded = decodeHtmlEntities(text)
  const re = /\{\{\s*([^}]+?)\s*\}\}/g
  const parts = []
  let last = 0
  let match = re.exec(decoded)
  while (match) {
    if (match.index > last) {
      parts.push(`{${JSON.stringify(decoded.slice(last, match.index))}}`)
    }
    parts.push(`{${expr(match[1], scopeStack)}}`)
    last = match.index + match[0].length
    match = re.exec(decoded)
  }
  if (last < decoded.length) {
    parts.push(`{${JSON.stringify(decoded.slice(last))}}`)
  }
  return parts.join("")
}

/**
 * Converts an HTML attribute value into a JSX attribute value.
 */
function convertAttrValue(val, attrName, scopeStack) {
  const fullBind = val.trim().match(/^\{\{\s*([^}]+?)\s*\}\}$/)
  if (fullBind) {
    const e = expr(fullBind[1], scopeStack)
    if (attrName === "style") return `{typeof ${e} === "string" ? css(${e}) : ${e}}`
    return `{${e}}`
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
  const special = {
    class: "className",
    for: "htmlFor",
    tabindex: "tabIndex",
    onclick: "onClick",
    onchange: "onChange",
    onmouseenter: "onMouseEnter",
    onmouseleave: "onMouseLeave",
    oninput: "onInput",
    onkeydown: "onKeyDown",
    onkeyup: "onKeyUp",
    viewbox: "viewBox",
    "stroke-width": "strokeWidth",
    "stroke-linecap": "strokeLinecap",
    "stroke-linejoin": "strokeLinejoin",
    "stroke-dasharray": "strokeDasharray",
    "stroke-dashoffset": "strokeDashoffset",
    "clip-path": "clipPath",
    "fill-rule": "fillRule",
    "stroke-miterlimit": "strokeMiterlimit",
    "text-anchor": "textAnchor",
  }
  if (special[lower]) return special[lower]
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
    if (rawName === "style-hover") continue
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
 * Converts DC script body into an exported Logic class.
 */
function toLogicTs(logic, componentName) {
  let body = logic
    .replace(/class Component extends DCLogic\s*\{/, `export class ${componentName}Logic {`)
    .replace(/class Component extends DCLogic/, `export class ${componentName}Logic`)

  // Top-level const helpers stay as-is above the class.
  return `// @ts-nocheck
/**
 * Interactive logic ported from the native ${componentName} DC artifact.
 */

${body}
`
}

/**
 * Builds a client artifact module for a DC lab.
 */
function buildDcModule(name, componentName, styleCss, bodyHtml, propsInit) {
  const $ = cheerio.load(`<div id="__root">${bodyHtml}</div>`, {
    xml: { xmlMode: false },
    decodeEntities: false,
  })
  const rootEl = $("#__root").get(0)
  const jsx = $(rootEl)
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
import { ${componentName}Logic } from "@/components/labs/${name}/logic"

const ARTIFACT_CSS = ${JSON.stringify(scoped)}

/**
 * Native React rendering of the ${componentName} laboratorio artifact.
 */
export function ${componentName}View() {
  const v = useDcLogic(${componentName}Logic, {
    ${propsInit}
  })

  return (
    <div className="dc-artifact dc-artifact--${name}">
      <style>{\`\${ARTIFACT_CSS}
.dc-artifact--${name} { min-height: 100%; font-family: var(--font-lab-mono), ui-monospace, monospace; }
.dc-artifact--${name} h1, .dc-artifact--${name} h2, .dc-artifact--${name} .lab-display {
  font-family: var(--font-display), sans-serif;
}
\`}</style>
${jsx}    </div>
  )
}
`
}

/**
 * Builds a React slideshow from deck-stage slide sections.
 */
function buildSlidesModule(name, componentName, styleCss, bodyHtml) {
  const $ = cheerio.load(`<div id="__root">${bodyHtml}</div>`, {
    xml: { xmlMode: false },
    decodeEntities: false,
  })
  const sections = $("#__root > section").toArray()
  const slidesJsx = sections
    .map((section, index) => {
      const label = section.attribs["data-label"] || `Slide ${index + 1}`
      const kids = $(section)
        .contents()
        .toArray()
        .map((child) => convertNode($, child, [], 5))
        .join("")
      const styleVal = section.attribs.style || ""
      return `      {
        label: ${JSON.stringify(label)},
        node: (
          <section
            key={${index}}
            data-label={${JSON.stringify(label)}}
            style={css(${JSON.stringify(styleVal)})}
          >
${kids}          </section>
        ),
      }`
    })
    .join(",\n")

  const scoped = scopeCss(styleCss, name)

  return `"use client"

import { useCallback, useEffect, useMemo, useState } from "react"

import { css } from "@/components/dc/css"

const ARTIFACT_CSS = ${JSON.stringify(scoped)}

/**
 * Keyboard-driven slideshow ported from the Git Flow deck-stage artifact.
 */
export function ${componentName}View() {
  const slides = useMemo(
    () => [
${slidesJsx}
    ],
    []
  )
  const [index, setIndex] = useState(0)
  const total = slides.length

  const go = useCallback(
    (next: number) => {
      setIndex(((next % total) + total) % total)
    },
    [total]
  )

  useEffect(() => {
    /**
     * Handles arrow / space navigation for the deck.
     */
    function onKey(event: KeyboardEvent) {
      if (event.key === "ArrowRight" || event.key === " " || event.key === "PageDown") {
        event.preventDefault()
        go(index + 1)
      } else if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault()
        go(index - 1)
      } else if (event.key === "Home") {
        event.preventDefault()
        go(0)
      } else if (event.key === "End") {
        event.preventDefault()
        go(total - 1)
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [go, index, total])

  const current = slides[index]

  return (
    <div className="dc-artifact dc-artifact--${name}" style={css("min-height:100%;background:#0B0B0B;color:#F4F1E8")}>
      <style>{\`\${ARTIFACT_CSS}
.dc-artifact--${name} { min-height: 100%; font-family: var(--font-lab-mono), ui-monospace, monospace; }
.dc-artifact--${name} h1, .dc-artifact--${name} h2 {
  font-family: var(--font-display), sans-serif;
}
\`}</style>
      <div style={css("position:sticky;top:0;z-index:20;display:flex;align-items:center;justify-content:space-between;gap:12px;padding:10px 16px;background:#0B0B0B;border-bottom:4px solid #FFDD00;font-family:var(--font-lab-mono),monospace;font-size:12px;font-weight:800;letter-spacing:0.12em;text-transform:uppercase")}>
        <div style={css("display:flex;gap:10px;align-items:center;flex-wrap:wrap")}>
          <span style={css("background:#FFDD00;color:#0B0B0B;padding:6px 10px")}>{"Git Flow Slides"}</span>
          <span style={css("color:#F4F1E8")}>{current.label}</span>
        </div>
        <div style={css("display:flex;gap:8px;align-items:center")}>
          <button
            type="button"
            onClick={() => go(index - 1)}
            style={css("border:3px solid #F4F1E8;background:transparent;color:#F4F1E8;padding:6px 12px;font:inherit;font-weight:800;cursor:pointer")}
          >
            {"←"}
          </button>
          <span style={css("min-width:72px;text-align:center;color:#FFDD00")}>
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </span>
          <button
            type="button"
            onClick={() => go(index + 1)}
            style={css("border:3px solid #FFDD00;background:#FFDD00;color:#0B0B0B;padding:6px 12px;font:inherit;font-weight:800;cursor:pointer")}
          >
            {"→"}
          </button>
        </div>
      </div>
      <div style={css("min-height:calc(100dvh - 58px - 52px);display:flex;align-items:stretch")}>
        <div style={css("width:100%;aspect-ratio:16/9;max-height:calc(100dvh - 58px - 52px);margin:0 auto;overflow:hidden")}>
          {current.node}
        </div>
      </div>
    </div>
  )
}
`
}

/**
 * Rewrites cross-lab HTML links to Next.js routes.
 */
function rewriteLabLinks(body) {
  return body
    .replace(/href="JSON%20con%20System\.Text\.Json\.dc\.html"/g, 'href="/laboratorios/json-lab"')
    .replace(/href="XML%20con%20XDocument\.dc\.html"/g, 'href="/laboratorios/xml-lab"')
    .replace(/href="Git%20Flow%20Brutalista\.dc\.html"/g, 'href="/laboratorios/git-flow"')
    .replace(/href="Git%20Flow%20Slides\.dc\.html"/g, 'href="/laboratorios/git-flow-slides"')
}

for (const lab of LABS) {
  const html = fs.readFileSync(path.join(srcDir, lab.file), "utf8")
  const extracted = lab.kind === "slides" ? extractSlides(html) : extractDc(html)
  const extractOut = path.join(root, "_extract_tmp", lab.name)
  fs.mkdirSync(extractOut, { recursive: true })
  const body = rewriteLabLinks(extracted.body)
  fs.writeFileSync(path.join(extractOut, "body.html"), body)
  fs.writeFileSync(path.join(extractOut, "style.css"), extracted.style)
  if (extracted.logic) {
    fs.writeFileSync(path.join(extractOut, "logic.js"), extracted.logic)
  }

  const outDir = path.join(root, "src/components/labs", lab.name)
  fs.mkdirSync(outDir, { recursive: true })

  if (lab.kind === "slides") {
    const mod = buildSlidesModule(lab.name, lab.componentName, extracted.style, body)
    fs.writeFileSync(path.join(outDir, "index.tsx"), mod)
    console.log("wrote slides", lab.name, mod.length)
    continue
  }

  const logicTs = toLogicTs(extracted.logic, lab.componentName)
  fs.writeFileSync(path.join(outDir, "logic.ts"), logicTs)
  const mod = buildDcModule(
    lab.name,
    lab.componentName,
    extracted.style,
    body,
    lab.propsInit
  )
  fs.writeFileSync(path.join(outDir, "index.tsx"), mod)
  console.log("wrote", lab.name, "view", mod.length, "logic", logicTs.length)
}
