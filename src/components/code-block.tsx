"use client"

import type { CSSProperties } from "react"
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter"
import csharp from "react-syntax-highlighter/dist/esm/languages/prism/csharp"
import markup from "react-syntax-highlighter/dist/esm/languages/prism/markup"
import oneDark from "react-syntax-highlighter/dist/esm/styles/prism/one-dark"
import oneLight from "react-syntax-highlighter/dist/esm/styles/prism/one-light"

SyntaxHighlighter.registerLanguage("csharp", csharp)
SyntaxHighlighter.registerLanguage("xml", markup)
SyntaxHighlighter.registerLanguage("markup", markup)

export type CodeBlockLanguage = "csharp" | "xml" | "markup"
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

/**
 * Renders a syntax-highlighted code block with a light or dark theme.
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
        },
      }}
    >
      {code}
    </SyntaxHighlighter>
  )
}
