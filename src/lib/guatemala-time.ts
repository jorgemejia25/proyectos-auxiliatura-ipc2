/** IANA zone for Guatemala (UTC−06:00 year-round, no DST). */
export const GUATEMALA_TZ = "America/Guatemala"

export type CountdownParts = {
  days: number
  hours: number
  minutes: number
  seconds: number
  /** True when the deadline has already passed. */
  expired: boolean
  /** Non-negative remaining milliseconds. */
  remainingMs: number
}

/**
 * Parses an ISO-8601 deadline into a UTC epoch ms value.
 * Requires an explicit offset (e.g. `2026-08-14T23:59:59-06:00`) so Safari/iOS
 * does not mis-parse ambiguous date strings.
 *
 * @param isoWithOffset - Absolute ISO timestamp with timezone offset.
 * @returns Epoch milliseconds, or NaN if the value is not a valid date.
 */
export function parseDeadlineMs(isoWithOffset: string): number {
  const ms = Date.parse(isoWithOffset)
  return Number.isFinite(ms) ? ms : Number.NaN
}

/**
 * Splits a remaining duration into countdown units.
 *
 * @param deadlineMs - Deadline as UTC epoch milliseconds.
 * @param nowMs - Current instant as UTC epoch milliseconds.
 */
export function getCountdownParts(deadlineMs: number, nowMs: number): CountdownParts {
  const remainingMs = Math.max(0, deadlineMs - nowMs)
  const totalSec = Math.floor(remainingMs / 1000)
  const days = Math.floor(totalSec / 86_400)
  const hours = Math.floor((totalSec % 86_400) / 3_600)
  const minutes = Math.floor((totalSec % 3_600) / 60)
  const seconds = totalSec % 60

  return {
    days,
    hours,
    minutes,
    seconds,
    expired: remainingMs <= 0,
    remainingMs,
  }
}

/**
 * Formats a deadline for display in Guatemala local time.
 * Uses `Intl` so the zone is correct across browsers, including Safari iOS.
 *
 * @param isoWithOffset - Absolute ISO timestamp with timezone offset.
 * @returns Localized label such as `14 ago 2026, 11:59 p. m.`.
 */
export function formatDeadlineGuatemala(isoWithOffset: string): string {
  const ms = parseDeadlineMs(isoWithOffset)
  if (!Number.isFinite(ms)) return isoWithOffset

  return new Intl.DateTimeFormat("es-GT", {
    timeZone: GUATEMALA_TZ,
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  }).format(new Date(ms))
}

/**
 * Pads a countdown unit to two digits for stable layout.
 *
 * @param value - Non-negative integer unit.
 */
export function padUnit(value: number): string {
  return String(Math.max(0, value)).padStart(2, "0")
}
