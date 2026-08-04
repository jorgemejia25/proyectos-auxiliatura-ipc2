"use client"

import { useEffect, useState } from "react"

import {
  formatDeadlineGuatemala,
  getCountdownParts,
  padUnit,
  parseDeadlineMs,
  type CountdownParts,
} from "@/lib/guatemala-time"
import { cn } from "@/lib/utils"

type DeliveryCountdownProps = {
  /** ISO-8601 deadline with Guatemala offset (−06:00). */
  deadlineAt: string
  /** Visual accent matching the project theme. */
  theme?: "cyan" | "violet"
}

type UnitProps = {
  value: string
  label: string
  boxClass: string
  valueClass: string
  labelClass: string
}

/**
 * Renders one large countdown unit block.
 */
function Unit({ value, label, boxClass, valueClass, labelClass }: UnitProps) {
  return (
    <div className={cn("flex min-w-[4.5rem] flex-1 flex-col items-center border-4 px-3 py-3 sm:min-w-[5.5rem]", boxClass)}>
      <span
        className={cn(
          "font-[family-name:var(--font-display)] text-4xl leading-none tracking-tight tabular-nums sm:text-5xl",
          valueClass
        )}
      >
        {value}
      </span>
      <span className={cn("mt-2 font-mono text-[10px] font-bold tracking-[0.2em] uppercase", labelClass)}>
        {label}
      </span>
    </div>
  )
}

/**
 * Full-width delivery countdown section in America/Guatemala time.
 *
 * Safari / iOS notes:
 * - Deadline must be ISO with an explicit offset (no `YYYY-MM-DD` parsing).
 * - Ticks align to the next second boundary to limit drift.
 * - Refreshes on `visibilitychange`, `pageshow`, and `focus` because iOS
 *   throttles timers in background tabs and restores bfcache pages.
 *
 * @param deadlineAt - Absolute ISO deadline with −06:00 offset.
 * @param theme - Accent palette for the section.
 */
export function DeliveryCountdown({ deadlineAt, theme = "cyan" }: DeliveryCountdownProps) {
  const deadlineMs = parseDeadlineMs(deadlineAt)
  const [parts, setParts] = useState<CountdownParts | null>(null)

  useEffect(() => {
    if (!Number.isFinite(deadlineMs)) return

    let timeoutId = 0
    let cancelled = false

    const sync = () => {
      if (cancelled) return
      setParts(getCountdownParts(deadlineMs, Date.now()))
    }

    const schedule = () => {
      if (cancelled) return
      sync()
      const delay = Math.max(50, 1000 - (Date.now() % 1000))
      timeoutId = window.setTimeout(schedule, delay)
    }

    const onResume = () => {
      window.clearTimeout(timeoutId)
      schedule()
    }

    schedule()
    document.addEventListener("visibilitychange", onResume)
    window.addEventListener("pageshow", onResume)
    window.addEventListener("focus", onResume)

    return () => {
      cancelled = true
      window.clearTimeout(timeoutId)
      document.removeEventListener("visibilitychange", onResume)
      window.removeEventListener("pageshow", onResume)
      window.removeEventListener("focus", onResume)
    }
  }, [deadlineMs])

  if (!Number.isFinite(deadlineMs)) {
    return null
  }

  const isViolet = theme === "violet"
  const sectionClass = isViolet
    ? "border-[#C6FF3D] bg-[#120720] text-[#EDE4FF]"
    : "border-[#35E0FF] bg-[#06142E] text-[#E4EEFF]"
  const boxClass = isViolet
    ? "border-[#C6FF3D] bg-[#1A0B2E] shadow-[6px_6px_0_#7C3AED]"
    : "border-[#35E0FF] bg-[#082A63] shadow-[6px_6px_0_#1E4FD8]"
  const valueClass = isViolet ? "text-[#C6FF3D]" : "text-[#35E0FF]"
  const labelClass = isViolet ? "text-[#EDE4FF]/70" : "text-[#E4EEFF]/70"
  const deadlineLabel = formatDeadlineGuatemala(deadlineAt)

  return (
    <section
      id="cuenta-regresiva"
      className={cn("border-b-5 border-t-0", sectionClass)}
      style={{ borderBottomWidth: 5 }}
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-5 px-[22px] py-7 sm:flex-row sm:items-end sm:justify-between">
        <div className="flex min-w-0 flex-col gap-2">
          <h2 className="font-[family-name:var(--font-display)] text-3xl leading-none tracking-tight uppercase sm:text-4xl">
            {parts?.expired ? "Plazo cerrado" : "Tiempo restante"}
          </h2>
          <p className="font-mono text-sm text-white/75">
            Entrega: {deadlineLabel}
          </p>
        </div>

        {parts === null ? (
          <div className="flex flex-wrap gap-3">
            {["días", "hrs", "min", "seg"].map((label) => (
              <Unit
                key={label}
                value="--"
                label={label}
                boxClass={boxClass}
                valueClass={valueClass}
                labelClass={labelClass}
              />
            ))}
          </div>
        ) : parts.expired ? (
          <div className={cn("border-4 px-5 py-4 font-mono text-sm font-bold tracking-wide uppercase", boxClass, valueClass)}>
            La fecha límite ya pasó
          </div>
        ) : (
          <div className="flex flex-wrap gap-3">
            <Unit
              value={String(parts.days)}
              label="días"
              boxClass={boxClass}
              valueClass={valueClass}
              labelClass={labelClass}
            />
            <Unit
              value={padUnit(parts.hours)}
              label="hrs"
              boxClass={boxClass}
              valueClass={valueClass}
              labelClass={labelClass}
            />
            <Unit
              value={padUnit(parts.minutes)}
              label="min"
              boxClass={boxClass}
              valueClass={valueClass}
              labelClass={labelClass}
            />
            <Unit
              value={padUnit(parts.seconds)}
              label="seg"
              boxClass={boxClass}
              valueClass={valueClass}
              labelClass={labelClass}
            />
          </div>
        )}
      </div>
    </section>
  )
}
