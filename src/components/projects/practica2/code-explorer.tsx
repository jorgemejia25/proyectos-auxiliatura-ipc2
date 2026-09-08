"use client"

import { CheckIcon, CopyIcon } from "lucide-react"
import { useState } from "react"

import { CODE_EXAMPLES } from "@/components/projects/practica2/data"

export function CodeExplorer() {
  const [activeId, setActiveId] = useState<(typeof CODE_EXAMPLES)[number]["id"]>("modelo")
  const [copied, setCopied] = useState(false)
  const active = CODE_EXAMPLES.find((example) => example.id === activeId) ?? CODE_EXAMPLES[0]

  async function copyCode() {
    await navigator.clipboard.writeText(active.code)
    setCopied(true)
    window.setTimeout(() => setCopied(false), 1400)
  }

  return (
    <section id="codigo" className="scroll-mt-28 bg-[#0B0B0D] py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex items-center gap-3 font-mono text-[10px] font-bold tracking-[0.18em] uppercase">
          <span className="bg-[#006FEE] px-2 py-1 text-black">08</span>
          <span className="text-[#A1A1AA]">Guía de código</span>
        </div>
        <div className="mt-4 grid gap-5 lg:grid-cols-[0.75fr_1.25fr] lg:items-end">
        <h2 className="text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">Ejemplos de código</h2>
          <p className="max-w-2xl text-sm leading-7 text-[#A1A1AA] lg:justify-self-end">
            Los ejemplos muestran responsabilidades, enlaces y eventos. Complete validaciones, el DOT del árbol y el manejo de errores en su propia solución.
          </p>
        </div>

        <div className="mt-9 overflow-hidden border border-white/10 bg-[#050505]">
          <div className="flex overflow-x-auto border-b border-white/10 bg-[#18181B] p-2" role="tablist" aria-label="Archivos de ejemplo">
            {CODE_EXAMPLES.map((example) => (
              <button
                key={example.id}
                type="button"
                role="tab"
                aria-selected={active.id === example.id}
                onClick={() => setActiveId(example.id)}
                className={`shrink-0 border px-3 py-2 font-mono text-[11px] font-bold transition ${
                  active.id === example.id
                    ? "border-[#006FEE] bg-[#006FEE] text-black"
                    : "border-transparent text-[#A1A1AA] hover:border-white/15 hover:text-white"
                }`}
              >
                {example.label}
              </button>
            ))}
          </div>

          <div className="flex items-start justify-between gap-5 border-b border-white/10 px-4 py-4 sm:px-6">
            <p className="max-w-3xl text-xs leading-6 text-[#A1A1AA]">{active.note}</p>
            <button
              type="button"
              onClick={copyCode}
              className="inline-flex shrink-0 items-center gap-2 border border-white/15 px-3 py-2 font-mono text-[10px] font-bold text-white transition hover:border-[#006FEE] hover:text-[#006FEE]"
            >
              {copied ? <CheckIcon className="size-3.5" /> : <CopyIcon className="size-3.5" />}
              {copied ? "Copiado" : "Copiar"}
            </button>
          </div>

          <pre className="max-h-[720px] overflow-auto p-5 font-mono text-[12px] leading-6 text-[#D4D4D8] sm:p-7">
            <code>{active.code}</code>
          </pre>
        </div>
      </div>
    </section>
  )
}
