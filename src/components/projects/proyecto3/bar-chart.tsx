"use client"

import { useState } from "react"

export type Serie = { name: string; color: string; values: number[] }

type BarChartProps = {
  categories: string[]
  series: Serie[]
  format: (n: number) => string
  label: string
}

const W = 640
const H = 260
const PAD = { top: 16, right: 12, bottom: 34, left: 64 }

/** Barras agrupadas en SVG: un eje, marcas delgadas, tooltip al pasar el cursor. */
export function BarChart({ categories, series, format, label }: BarChartProps) {
  const [hover, setHover] = useState<number | null>(null)
  const max = Math.max(1, ...series.flatMap((s) => s.values))
  const ticks = niceTicks(max)
  const top = ticks[ticks.length - 1]
  const plotW = W - PAD.left - PAD.right
  const plotH = H - PAD.top - PAD.bottom
  const band = plotW / Math.max(1, categories.length)
  const barW = Math.min(36, (band * 0.6) / series.length)
  const y = (v: number) => PAD.top + plotH - (v / top) * plotH

  if (categories.length === 0) {
    return <div className="grid h-48 place-items-center border border-dashed border-white/15 text-xs text-[#71717A]">Sin datos para graficar</div>
  }

  return (
    <div className="relative">
      {series.length > 1 ? (
        <div className="mb-3 flex flex-wrap gap-4 text-xs text-[#A1A1AA]">
          {series.map((s) => (
            <span key={s.name} className="inline-flex items-center gap-2"><span className="size-2.5 rounded-sm" style={{ backgroundColor: s.color }} />{s.name}</span>
          ))}
        </div>
      ) : null}
      <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={label} className="h-auto w-full" onMouseLeave={() => setHover(null)}>
        {ticks.map((t) => (
          <g key={t}>
            <line x1={PAD.left} x2={W - PAD.right} y1={y(t)} y2={y(t)} stroke={t === 0 ? "#52525B" : "#27272A"} strokeWidth="1" />
            <text x={PAD.left - 8} y={y(t) + 3} textAnchor="end" fill="#71717A" fontSize="10">{compact(t)}</text>
          </g>
        ))}
        {categories.map((cat, i) => {
          const cx = PAD.left + band * i + band / 2
          const groupW = barW * series.length + 2 * (series.length - 1)
          return (
            <g key={cat}>
              <rect x={PAD.left + band * i} y={PAD.top} width={band} height={plotH} fill={hover === i ? "rgba(255,255,255,.04)" : "transparent"} onMouseEnter={() => setHover(i)} />
              {series.map((s, si) => {
                const v = s.values[i] ?? 0
                const x = cx - groupW / 2 + si * (barW + 2)
                return <path key={s.name} d={roundedTop(x, y(v), barW, y(0) - y(v))} fill={s.color} pointerEvents="none" />
              })}
              <text x={cx} y={H - PAD.bottom + 16} textAnchor="middle" fill="#A1A1AA" fontSize="10">{cat}</text>
            </g>
          )
        })}
      </svg>
      {hover !== null ? (
        <div
          className="pointer-events-none absolute top-8 z-10 min-w-40 border border-white/15 bg-[#09090B] px-3 py-2 text-xs shadow-xl"
          style={{ left: `${Math.min(70, ((PAD.left + band * hover + band / 2) / W) * 100)}%` }}
        >
          <strong className="block text-white">{categories[hover]}</strong>
          {series.map((s) => (
            <div key={s.name} className="mt-1 flex items-center justify-between gap-4 text-[#A1A1AA]">
              <span className="inline-flex items-center gap-1.5"><span className="size-2 rounded-sm" style={{ backgroundColor: s.color }} />{s.name}</span>
              <span className="font-mono text-white">{format(s.values[hover] ?? 0)}</span>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

function roundedTop(x: number, y: number, w: number, h: number) {
  if (h <= 0) return ""
  const r = Math.min(4, w / 2, h)
  return `M${x},${y + h} V${y + r} Q${x},${y} ${x + r},${y} H${x + w - r} Q${x + w},${y} ${x + w},${y + r} V${y + h} Z`
}

function niceTicks(max: number) {
  const step0 = max / 4
  const mag = 10 ** Math.floor(Math.log10(step0))
  const step = [1, 2, 2.5, 5, 10].map((m) => m * mag).find((s) => s >= step0) ?? 10 * mag
  const ticks: number[] = []
  for (let t = 0; t <= max + step * 0.999; t += step) ticks.push(Math.round(t * 100) / 100)
  return ticks
}

function compact(n: number) {
  return n >= 1000 ? `${(n / 1000).toLocaleString("es-GT", { maximumFractionDigits: 1 })}k` : n.toLocaleString("es-GT")
}
