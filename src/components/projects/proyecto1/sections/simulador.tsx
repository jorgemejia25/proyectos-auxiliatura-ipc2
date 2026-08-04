// @ts-nocheck
"use client"

import { css } from "@/components/dc/css"
import { Proyecto1MissionControls } from "@/components/projects/proyecto1/sections/mission-controls"
import { Proyecto1MissionGrid } from "@/components/projects/proyecto1/sections/mission-grid"

type Props = { v: Record<string, unknown> }

/**
 * Simulador section for Proyecto1 (client composition).
 */
export function Proyecto1SimuladorPanel({ v }: Props) {
  return (
    <section id="simulador" style={css("max-width:1240px;margin:0 auto;padding:56px 22px")}>
      <div style={css("display:flex;align-items:baseline;gap:14px;flex-wrap:wrap")}>
        <div style={css("font-family:'Archivo Black',sans-serif;font-size:15px;background:#120720;color:#C6FF3D;padding:4px 10px")}>{"04"}</div>
        <h2 style={css("font-family:'Archivo Black',sans-serif;font-size:clamp(30px,5vw,54px);margin:0;text-transform:uppercase;letter-spacing:-2px")}>{"Simulador de misiones"}</h2>
      </div>
      <p style={css("margin:14px 0 0;font-size:14px;max-width:760px;line-height:1.55;text-wrap:pretty")}>
        {"Seleccione ciudad, misión, robot, entrada y objetivo. Ejecute para animar el camino sobre la matriz y generar el reporte."}
      </p>
      <div style={css("display:flex;flex-wrap:wrap;gap:20px;margin-top:24px;align-items:flex-start")}>
        <Proyecto1MissionGrid v={v} />
        <Proyecto1MissionControls v={v} />
      </div>
    </section>
  )
}
