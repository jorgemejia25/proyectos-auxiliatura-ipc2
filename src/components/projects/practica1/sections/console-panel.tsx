// @ts-nocheck
"use client"

import { Fragment } from "react"

import { css } from "@/components/dc/css"

type Props = { v: Record<string, unknown> }

/**
 * Live console output for the veterinarian simulator.
 */
export function Practica1ConsolePanel({ v }: Props) {
  return (
<div style={css("flex:1 1 340px;background:#06142E;border:5px solid #06142E;box-shadow:12px 12px 0 #1E4FD8;padding:0;display:flex;flex-direction:column;min-height:520px")}>

              <div style={css("display:flex;align-items:center;gap:8px;padding:12px 16px;background:#082A63;border-bottom:4px solid #35E0FF")}>

                <div style={css("width:12px;height:12px;background:#35E0FF;animation:blink 1.2s steps(1) infinite")} />

                <div style={css("font-size:12px;font-weight:700;letter-spacing:2px;color:#35E0FF")}>
                  {"VeterinariaApp.exe"}
                </div>

                <div style={css("margin-left:auto;font-size:11.5px;color:#7FB2FF")}>
                  {v.totalPacientes}{" pacientes"}
                </div>

              </div>

              <div style={css("flex:1;padding:16px;overflow:auto;max-height:520px")}>

                {v.consola.map((linea, lineaIdx) => (
                  <Fragment key={lineaIdx}>

                    <div style={css("font-size:13px;line-height:1.6;color:#E4EEFF;white-space:pre-wrap;animation:rise .18s ease-out")}>
                      {linea}
                    </div>

                  </Fragment>
                ))}

              </div>

              <div style={css("padding:12px 16px;border-top:4px solid #1E4FD8;display:flex;gap:10px;align-items:center;flex-wrap:wrap")}>

                <div style={css("font-size:11.5px;font-weight:700;letter-spacing:1px;color:#35E0FF")}>
                  {"DOSIS MG/KG"}
                </div>

                <input value={v.dosisKg} onChange={v.onDosisKg} style={css("width:80px;border:3px solid #35E0FF;background:#06142E;color:#35E0FF;padding:7px;font-size:13px")} />

                <button onClick={v.limpiar} style={css("margin-left:auto;background:#1E4FD8;color:#fff;border:3px solid #35E0FF;padding:7px 12px;font-size:12px;font-weight:700;cursor:pointer")}>
                  {"LIMPIAR"}
                </button>

              </div>

            </div>
  )
}
