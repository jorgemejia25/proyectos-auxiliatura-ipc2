"use client"

import { CodeBlock } from "@/components/code-block"
import { getLabPalette } from "@/lib/lab-palettes"
import type { Lab } from "@/lib/labs"
import type { CSSProperties, MouseEvent, MouseEventHandler, ReactNode } from "react"

export type TreeSeg = {
  t: string
  c: string
  w: number | string
}

export type TreeLine = {
  pad: string
  guia: string
  icono: string
  cursorT: string
  colorT: string
  bg: string
  marca: string
  segs: TreeSeg[]
  nota: string
  pick: () => void
  toggle: (event: MouseEvent<HTMLSpanElement>) => void
}

type Chip = {
  label: string
}

type TreeViewerProps = {
  /** Laboratory theme used for chrome accents. */
  theme?: Lab["theme"]
  /** Section eyebrow above the title. */
  eyebrow: string
  /** Main section title. */
  title: string
  /** Supporting copy under the title. */
  description: ReactNode
  /** Optional declaration line above the tree (XML prologue). */
  prologue?: string
  /** Flattened interactive tree rows. */
  lines: TreeLine[]
  /** Expand-all handler. */
  onExpand: MouseEventHandler<HTMLButtonElement>
  /** Collapse-all handler. */
  onCollapse: MouseEventHandler<HTMLButtonElement>
  /** Footer stats under the tree. */
  stats: string[]
  /** Selected node title. */
  selectedName: string
  /** Chips for the selected node metadata. */
  selectedChips: Chip[]
  /** C# expression for the selected node. */
  selectedCode: string
  /** Help panel title. */
  helpTitle: string
  /** Help rows under the selected node. */
  help: ReactNode[]
  /** Empty-state message when the tree cannot be built. */
  emptyMessage: string
}

/**
 * Interactive document tree used by JSON / XML laboratories.
 */
export function TreeViewer({
  theme = "blue",
  eyebrow,
  title,
  description,
  prologue,
  lines,
  onExpand,
  onCollapse,
  stats,
  selectedName,
  selectedChips,
  selectedCode,
  helpTitle,
  help,
  emptyMessage,
}: TreeViewerProps) {
  const palette = getLabPalette(theme)
  const safeLines = Array.isArray(lines) ? lines : []

  const ghostBtn: CSSProperties = {
    border: `2px solid ${palette.inkSoft}`,
    background: "transparent",
    color: palette.inkSoft,
    padding: "5px 10px",
    fontFamily: "inherit",
    fontSize: 12,
    fontWeight: 800,
    cursor: "pointer",
  }

  return (
    <section
      id="arbol"
      style={{
        padding: "70px 48px",
        borderBottom: `10px solid ${palette.ink}`,
        maxWidth: 1500,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          fontSize: 15,
          fontWeight: 800,
          letterSpacing: "0.2em",
          borderBottom: `6px solid ${palette.ink}`,
          paddingBottom: 12,
          marginBottom: 30,
        }}
      >
        {eyebrow}
      </div>

      <h2
        style={{
          fontFamily: "var(--font-display), 'Archivo Black', sans-serif",
          fontSize: "clamp(36px, 6vw, 62px)",
          margin: "0 0 12px 0",
          lineHeight: 0.94,
          textTransform: "uppercase",
          letterSpacing: "-0.03em",
        }}
      >
        {title}
      </h2>

      <p
        style={{
          margin: "0 0 26px 0",
          fontSize: 20,
          fontWeight: 700,
          maxWidth: "78ch",
          lineHeight: 1.5,
        }}
      >
        {description}
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1fr)",
          gap: 28,
          alignItems: "start",
        }}
      >
        <div
          style={{
            border: `8px solid ${palette.ink}`,
            background: "#FFF",
            minWidth: 0,
            display: "flex",
            flexDirection: "column",
            boxShadow: `12px 12px 0 ${palette.accent}`,
          }}
        >
          <div
            style={{
              background: palette.chrome,
              color: palette.inkSoft,
              padding: "12px 16px",
              display: "flex",
              alignItems: "center",
              gap: 14,
              fontSize: 14,
              fontWeight: 800,
              letterSpacing: "0.14em",
              flexWrap: "wrap",
              borderBottom: `4px solid ${palette.accent}`,
            }}
          >
            <span>VISOR DEL ÁRBOL</span>
            <span style={{ marginLeft: "auto", display: "flex", gap: 8 }}>
              <button type="button" onClick={onExpand} style={ghostBtn}>
                expandir
              </button>
              <button type="button" onClick={onCollapse} style={ghostBtn}>
                colapsar
              </button>
            </span>
          </div>

          <div
            style={{
              padding: "16px 12px",
              display: "grid",
              gap: 0,
              alignContent: "start",
              minHeight: 420,
              maxHeight: 560,
              overflow: "auto",
              fontFamily: "var(--font-lab-mono), 'JetBrains Mono', ui-monospace, monospace",
              background: palette.surface,
            }}
          >
            {prologue ? (
              <div
                style={{
                  fontSize: 16,
                  color: "#8A9A90",
                  padding: "3px 10px 8px 42px",
                  whiteSpace: "pre",
                }}
              >
                {prologue}
              </div>
            ) : null}

            {safeLines.length === 0 ? (
              <div
                style={{
                  margin: 16,
                  border: "5px solid #FF3B30",
                  background: "#FFF6F5",
                  color: "#FF3B30",
                  padding: 18,
                  fontSize: 16,
                  fontWeight: 700,
                  lineHeight: 1.5,
                }}
              >
                {emptyMessage}
              </div>
            ) : (
              safeLines.map((line, index) => (
                <div
                  key={index}
                  role="button"
                  tabIndex={0}
                  onClick={line.pick}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault()
                      line.pick()
                    }
                  }}
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    cursor: "pointer",
                    background: line.bg || "transparent",
                    borderLeft: `4px solid ${line.marca || "transparent"}`,
                  }}
                >
                  <span
                    onClick={(event) => {
                      event.stopPropagation()
                      line.toggle(event)
                    }}
                    style={{
                      width: 26,
                      flex: "none",
                      textAlign: "center",
                      fontFamily: "var(--font-display), 'Archivo Black', sans-serif",
                      fontSize: 14,
                      color: line.colorT,
                      cursor: line.cursorT as CSSProperties["cursor"],
                      userSelect: "none",
                      padding: "3px 0",
                    }}
                  >
                    {line.icono}
                  </span>

                  <span
                    style={{
                      width: line.pad,
                      flex: "none",
                      alignSelf: "stretch",
                      borderRight: `2px dotted ${line.guia}`,
                    }}
                  />

                  <span
                    style={{
                      padding: "3px 10px",
                      whiteSpace: "pre",
                      fontSize: 16,
                      lineHeight: 1.6,
                    }}
                  >
                    {(line.segs || []).map((seg, segIndex) => (
                      <span
                        key={segIndex}
                        style={{
                          color: seg.c,
                          fontWeight: Number(seg.w) || 400,
                        }}
                      >
                        {seg.t}
                      </span>
                    ))}
                  </span>

                  <span
                    style={{
                      marginLeft: "auto",
                      padding: "3px 10px",
                      fontSize: 12,
                      fontWeight: 800,
                      letterSpacing: "0.08em",
                      color: "#9AA3B2",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {line.nota}
                  </span>
                </div>
              ))
            )}
          </div>

          <div
            style={{
              borderTop: `4px solid ${palette.ink}`,
              padding: "12px 16px",
              display: "flex",
              gap: 20,
              fontSize: 14,
              fontWeight: 700,
              flexWrap: "wrap",
              background: palette.wash,
            }}
          >
            {stats.map((stat) => (
              <span key={stat}>{stat}</span>
            ))}
          </div>
        </div>

        <div style={{ display: "grid", gap: 18, minWidth: 0 }}>
          <div
            style={{
              border: `8px solid ${palette.accent}`,
              background: "#FFF",
              padding: 24,
              display: "grid",
              gap: 14,
              minWidth: 0,
              boxShadow: `10px 10px 0 ${palette.highlight}`,
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 800,
                letterSpacing: "0.2em",
                color: palette.accent,
              }}
            >
              NODO SELECCIONADO
            </div>

            <div
              style={{
                fontFamily: "var(--font-display), 'Archivo Black', sans-serif",
                fontSize: 34,
                lineHeight: 1,
                wordBreak: "break-word",
              }}
            >
              {selectedName}
            </div>

            <div
              style={{
                display: "flex",
                gap: 10,
                flexWrap: "wrap",
                fontSize: 13,
                fontWeight: 800,
                letterSpacing: "0.1em",
                lineHeight: 1.4,
              }}
            >
              {selectedChips.map((chip) => (
                <span
                  key={chip.label}
                  style={{
                    border: `3px solid ${palette.ink}`,
                    background: palette.highlight,
                    color: palette.highlightInk,
                    padding: "5px 10px",
                    whiteSpace: "nowrap",
                  }}
                >
                  {chip.label}
                </span>
              ))}
            </div>

            <div
              style={{
                border: `8px solid ${palette.ink}`,
                background: palette.chrome,
                overflow: "hidden",
              }}
            >
              <CodeBlock
                code={selectedCode || ""}
                language="csharp"
                variant="dark"
                style={{
                  padding: 18,
                  fontSize: 15,
                  lineHeight: 1.65,
                  overflow: "auto",
                  maxHeight: 280,
                }}
              />
            </div>
          </div>

          <div
            style={{
              border: `8px solid ${palette.ink}`,
              background: palette.surface,
              padding: 24,
              display: "grid",
              gap: 12,
            }}
          >
            <div
              style={{
                fontSize: 14,
                fontWeight: 800,
                letterSpacing: "0.2em",
                color: palette.accent,
              }}
            >
              {helpTitle}
            </div>
            {help.map((row, index) => (
              <div
                key={index}
                style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.5 }}
              >
                {row}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
