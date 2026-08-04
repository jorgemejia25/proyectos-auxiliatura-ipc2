"use client"

import {
  useCallback,
  useEffect,
  useId,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react"
import { createPortal } from "react-dom"
import { Maximize2Icon, Minimize2Icon, XIcon, ZoomInIcon, ZoomOutIcon } from "lucide-react"
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"
import csharp from "react-syntax-highlighter/dist/esm/languages/prism/csharp"
import json from "react-syntax-highlighter/dist/esm/languages/prism/json"
import markup from "react-syntax-highlighter/dist/esm/languages/prism/markup"
import oneDark from "react-syntax-highlighter/dist/esm/styles/prism/one-dark"
import oneLight from "react-syntax-highlighter/dist/esm/styles/prism/one-light"

SyntaxHighlighter.registerLanguage("csharp", csharp)
SyntaxHighlighter.registerLanguage("json", json)
SyntaxHighlighter.registerLanguage("xml", markup)
SyntaxHighlighter.registerLanguage("markup", markup)

export type CodeBlockLanguage = "csharp" | "json" | "xml" | "markup"
export type CodeBlockVariant = "light" | "dark"

type CodeBlockProps = {
  /** Source code to highlight. */
  code: string
  /** Prism language id used for tokenization. */
  language?: CodeBlockLanguage
  /** Color scheme matched to the surrounding panel. */
  variant?: CodeBlockVariant
  /** Extra styles applied to the highlighted `<pre>`. */
  style?: CSSProperties
}

const LIGHT_THEME = {
  ...oneLight,
  'pre[class*="language-"]': {
    ...oneLight['pre[class*="language-"]'],
    background: "transparent",
    margin: 0,
    padding: 0,
    textShadow: "none",
  },
  'code[class*="language-"]': {
    ...oneLight['code[class*="language-"]'],
    background: "transparent",
    textShadow: "none",
    fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
  },
}

const DARK_THEME = {
  ...oneDark,
  'pre[class*="language-"]': {
    ...oneDark['pre[class*="language-"]'],
    background: "transparent",
    margin: 0,
    padding: 0,
    textShadow: "none",
  },
  'code[class*="language-"]': {
    ...oneDark['code[class*="language-"]'],
    background: "transparent",
    textShadow: "none",
    fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
  },
}

const ZOOM_LEVELS = [100, 125, 150, 175, 200] as const
const DEFAULT_ZOOM_INDEX = 1

type HighlightedCodeProps = {
  code: string
  language: CodeBlockLanguage
  variant: CodeBlockVariant
  style?: CSSProperties
  fontSizePx?: number
}

/**
 * Shared syntax-highlighter shell used by the inline block and the zoom overlay.
 */
function HighlightedCode({
  code,
  language,
  variant,
  style,
  fontSizePx,
}: HighlightedCodeProps) {
  const theme = variant === "dark" ? DARK_THEME : LIGHT_THEME

  return (
    <SyntaxHighlighter
      language={language}
      style={theme}
      showLineNumbers
      wrapLongLines={false}
      customStyle={{
        margin: 0,
        background: "transparent",
        fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
        fontSize: fontSizePx ? `${fontSizePx}px` : undefined,
        ...style,
      }}
      lineNumberStyle={{
        minWidth: "2.5em",
        paddingRight: "1em",
        color: variant === "dark" ? "#5B7BB8" : "#9B87C7",
        userSelect: "none",
      }}
      codeTagProps={{
        style: {
          fontFamily: "'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace",
          fontSize: fontSizePx ? `${fontSizePx}px` : undefined,
        },
      }}
    >
      {code}
    </SyntaxHighlighter>
  )
}

type ToolbarButtonProps = {
  onClick: () => void
  label: string
  children: ReactNode
  disabled?: boolean
}

/**
 * Compact toolbar control for the code zoom UI.
 */
function ToolbarButton({ onClick, label, children, disabled }: ToolbarButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      className="inline-flex size-9 items-center justify-center border-2 border-[#C6FF3D] bg-[#120720] text-[#C6FF3D] transition-colors hover:bg-[#C6FF3D] hover:text-[#120720] disabled:cursor-not-allowed disabled:opacity-40"
    >
      {children}
    </button>
  )
}

type ZoomOverlayProps = {
  code: string
  language: CodeBlockLanguage
  variant: CodeBlockVariant
  titleId: string
  onClose: () => void
}

/**
 * Full-viewport overlay with scalable highlighted code.
 * Closes with Escape, the close button, or a backdrop click.
 */
function ZoomOverlay({ code, language, variant, titleId, onClose }: ZoomOverlayProps) {
  const [zoomIndex, setZoomIndex] = useState(DEFAULT_ZOOM_INDEX)
  const zoom = ZOOM_LEVELS[zoomIndex]
  const baseFontSize = 14
  const fontSizePx = (baseFontSize * zoom) / 100

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault()
        onClose()
        return
      }
      if (event.key === "+" || event.key === "=") {
        event.preventDefault()
        setZoomIndex((current) => Math.min(current + 1, ZOOM_LEVELS.length - 1))
      }
      if (event.key === "-" || event.key === "_") {
        event.preventDefault()
        setZoomIndex((current) => Math.max(current - 1, 0))
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [onClose])

  return createPortal(
    <div
      className="fixed inset-0 z-[100] flex flex-col bg-[#0b0714]/92 backdrop-blur-[2px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby={titleId}
      onClick={onClose}
    >
      <div
        className="mx-auto flex h-full w-full max-w-[1400px] flex-col gap-3 p-3 sm:p-5"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-4 border-[#C6FF3D] bg-[#120720] px-3 py-2 text-[#EDE4FF] shadow-[6px_6px_0_#7C3AED]">
          <div className="min-w-0">
            <h2
              id={titleId}
              className="font-[family-name:var(--font-display)] text-lg tracking-tight uppercase sm:text-xl"
            >
              Vista ampliada
            </h2>
            <p className="font-mono text-[11px] text-white/60">
              Esc / clic fuera para cerrar · + / − para zoom
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <ToolbarButton
              label="Reducir zoom"
              disabled={zoomIndex === 0}
              onClick={() => setZoomIndex((current) => Math.max(current - 1, 0))}
            >
              <ZoomOutIcon className="size-4" />
            </ToolbarButton>

            <span className="min-w-[3.5rem] text-center font-mono text-sm font-bold tabular-nums text-[#C6FF3D]">
              {zoom}%
            </span>

            <ToolbarButton
              label="Aumentar zoom"
              disabled={zoomIndex === ZOOM_LEVELS.length - 1}
              onClick={() =>
                setZoomIndex((current) => Math.min(current + 1, ZOOM_LEVELS.length - 1))
              }
            >
              <ZoomInIcon className="size-4" />
            </ToolbarButton>

            <ToolbarButton
              label="Restablecer zoom"
              onClick={() => setZoomIndex(DEFAULT_ZOOM_INDEX)}
            >
              <Minimize2Icon className="size-4" />
            </ToolbarButton>

            <ToolbarButton label="Cerrar vista ampliada" onClick={onClose}>
              <XIcon className="size-4" />
            </ToolbarButton>
          </div>
        </div>

        <div className="min-h-0 flex-1 overflow-auto border-4 border-[#C6FF3D] bg-[#1A0B2E] shadow-[8px_8px_0_#7C3AED]">
          <HighlightedCode
            code={code}
            language={language}
            variant={variant}
            fontSizePx={fontSizePx}
            style={{
              padding: 20,
              lineHeight: 1.65,
              maxHeight: "none",
            }}
          />
        </div>
      </div>
    </div>,
    document.body
  )
}

/**
 * Renders a syntax-highlighted code block with a light or dark theme
 * and a zoom control that opens a full-viewport reader.
 *
 * @param code - Source text to highlight.
 * @param language - Language grammar (defaults to csharp).
 * @param variant - Theme matched to light or dark panels.
 * @param style - Container styles (borders, max-height, padding, etc.).
 */
export function CodeBlock({
  code,
  language = "csharp",
  variant = "dark",
  style,
}: CodeBlockProps) {
  const [open, setOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const titleId = useId()

  useEffect(() => {
    setMounted(true)
  }, [])

  const close = useCallback(() => {
    setOpen(false)
  }, [])

  return (
    <div className="group relative">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Ampliar código"
        title="Ampliar código"
        className="absolute top-3 right-3 z-10 inline-flex items-center gap-1.5 border-2 border-[#C6FF3D] bg-[#120720] px-2.5 py-1.5 font-mono text-[11px] font-bold tracking-wide text-[#C6FF3D] uppercase shadow-[3px_3px_0_#7C3AED] transition-colors hover:bg-[#C6FF3D] hover:text-[#120720]"
      >
        <Maximize2Icon className="size-3.5" />
        Zoom
      </button>

      <HighlightedCode code={code} language={language} variant={variant} style={style} />

      {mounted && open ? (
        <ZoomOverlay
          code={code}
          language={language}
          variant={variant}
          titleId={titleId}
          onClose={close}
        />
      ) : null}
    </div>
  )
}
