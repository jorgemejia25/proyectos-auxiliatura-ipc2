// @ts-nocheck
"use client"

import { css } from "@/components/dc/css"
import { Practica1ConsolePanel } from "@/components/projects/practica1/sections/console-panel"
import { Practica1PatientForm } from "@/components/projects/practica1/sections/patient-form"
import { Practica1PatientList } from "@/components/projects/practica1/sections/patient-list"

type Props = { v: Record<string, unknown> }

/**
 * Simulador section for Practica1 (client composition).
 */
export function Practica1SimuladorPanel({ v }: Props) {
  return (
    <section id="simulador" style={css("max-width:1240px;margin:0 auto;padding:56px 22px")}>
      <div style={css("display:flex;align-items:baseline;gap:14px;flex-wrap:wrap")}>
        <div style={css("font-family:'Archivo Black',sans-serif;font-size:15px;background:#06142E;color:#35E0FF;padding:4px 10px")}>{"03"}</div>
        <h2 style={css("font-family:'Archivo Black',sans-serif;font-size:clamp(30px,5vw,54px);margin:0;text-transform:uppercase;letter-spacing:-2px")}>{"Simulador de consola"}</h2>
      </div>
      <p style={css("margin:14px 0 0;font-size:14px;max-width:720px;line-height:1.55;text-wrap:pretty")}>
        {"Prueba el flujo del menú en consola: registra un paciente (opción 1) y luego gestiona su estado, dosis e información (opción 2)."}
      </p>
      <div style={css("display:flex;flex-wrap:wrap;gap:22px;margin-top:26px")}>
        <Practica1PatientForm v={v} />
        <Practica1ConsolePanel v={v} />
      </div>
      <Practica1PatientList v={v} />
    </section>
  )
}
