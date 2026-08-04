// @ts-nocheck
"use client"

import { Fragment } from "react"

import { css } from "@/components/dc/css"

type Props = { v: Record<string, unknown> }

/**
 * Registration form for the veterinarian console simulator.
 */
export function Practica1PatientForm({ v }: Props) {
  return (
<div style={css("flex:1 1 380px;background:#fff;border:5px solid #06142E;box-shadow:12px 12px 0 #06142E;padding:22px")}>

              <div style={css("font-family:'Archivo Black',sans-serif;font-size:20px;text-transform:uppercase")}>
                {"1 · Registrar mascota"}
              </div>

              <div style={css("display:flex;gap:8px;margin-top:14px;flex-wrap:wrap")}>

                <button onClick={v.pickPerro} style={css(`flex:1 1 80px;background:${v.bgPerro};color:${v.fgPerro};border:4px solid #06142E;box-shadow:4px 4px 0 #06142E;padding:10px 6px;font-size:13px;font-weight:700;cursor:pointer`)}>
                  {"PERRO"}
                </button>

                <button onClick={v.pickGato} style={css(`flex:1 1 80px;background:${v.bgGato};color:${v.fgGato};border:4px solid #06142E;box-shadow:4px 4px 0 #06142E;padding:10px 6px;font-size:13px;font-weight:700;cursor:pointer`)}>
                  {"GATO"}
                </button>

                <button onClick={v.pickAve} style={css(`flex:1 1 80px;background:${v.bgAve};color:${v.fgAve};border:4px solid #06142E;box-shadow:4px 4px 0 #06142E;padding:10px 6px;font-size:13px;font-weight:700;cursor:pointer`)}>
                  {"AVE"}
                </button>

                <button onClick={v.pickTortuga} style={css(`flex:1 1 80px;background:${v.bgTortuga};color:${v.fgTortuga};border:4px solid #06142E;box-shadow:4px 4px 0 #06142E;padding:10px 6px;font-size:13px;font-weight:700;cursor:pointer`)}>
                  {"TORTUGA"}
                </button>

              </div>

              <div style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;margin-top:18px")}>

                <label style={css("display:flex;flex-direction:column;gap:5px;font-size:11.5px;font-weight:700;letter-spacing:1px")}>
                  {"NOMBRE\n          "}
                  <input value={v.nombre} onChange={v.onNombre} placeholder="Firulais" style={css("border:4px solid #06142E;background:#E4EEFF;padding:9px;font-size:14px")} />

                </label>

                <label style={css("display:flex;flex-direction:column;gap:5px;font-size:11.5px;font-weight:700;letter-spacing:1px")}>
                  {"PESO (KG)\n          "}
                  <input value={v.peso} onChange={v.onPeso} placeholder="12.5" style={css("border:4px solid #06142E;background:#E4EEFF;padding:9px;font-size:14px")} />

                </label>

                <label style={css("display:flex;flex-direction:column;gap:5px;font-size:11.5px;font-weight:700;letter-spacing:1px")}>
                  {"EDAD (AÑOS)\n          "}
                  <input value={v.edad} onChange={v.onEdad} placeholder="3" style={css("border:4px solid #06142E;background:#E4EEFF;padding:9px;font-size:14px")} />

                </label>

                <label style={css("display:flex;flex-direction:column;gap:5px;font-size:11.5px;font-weight:700;letter-spacing:1px")}>
                  {"SEXO\n          "}
                  <select value={v.sexo} onChange={v.onSexo} style={css("border:4px solid #06142E;background:#E4EEFF;padding:9px;font-size:14px")}>

                    <option value="Macho">
                      {"Macho"}
                    </option>

                    <option value="Hembra">
                      {"Hembra"}
                    </option>

                  </select>

                </label>

                <label style={css("display:flex;flex-direction:column;gap:5px;font-size:11.5px;font-weight:700;letter-spacing:1px")}>
                  {"PROPIETARIO\n          "}
                  <input value={v.propietario} onChange={v.onPropietario} placeholder="Ana López" style={css("border:4px solid #06142E;background:#E4EEFF;padding:9px;font-size:14px")} />

                </label>

                <label style={css("display:flex;flex-direction:column;gap:5px;font-size:11.5px;font-weight:700;letter-spacing:1px")}>
                  {"ESTADO\n          "}
                  <select value={v.estado} onChange={v.onEstado} style={css("border:4px solid #06142E;background:#E4EEFF;padding:9px;font-size:14px")}>

                    <option value="Enfermo">
                      {"Enfermo"}
                    </option>

                    <option value="Sano">
                      {"Sano"}
                    </option>

                  </select>

                </label>

              </div>

              <div style={css("margin-top:16px;border:4px dashed #1E4FD8;padding:14px;background:#E4EEFF")}>

                <div style={css("font-size:11.5px;font-weight:700;letter-spacing:1.5px;color:#082A63")}>
                  {"ATRIBUTOS DE "}{v.tipoUpper}
                </div>

                <div style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px;margin-top:10px")}>

                  <label style={css("display:flex;flex-direction:column;gap:5px;font-size:11.5px;font-weight:700;letter-spacing:1px")}>
                    {v.extraALabel}{"\n            "}
                    <input value={v.extraA} onChange={v.onExtraA} placeholder={v.extraAPlaceholder} style={css("border:4px solid #06142E;background:#fff;padding:9px;font-size:14px")} />

                  </label>

                  <label style={css("display:flex;flex-direction:column;gap:5px;font-size:11.5px;font-weight:700;letter-spacing:1px")}>
                    {v.extraBLabel}{"\n            "}
                    <select value={v.extraB} onChange={v.onExtraB} style={css("border:4px solid #06142E;background:#fff;padding:9px;font-size:14px")}>

                      <option value="Sí">
                        {"Sí"}
                      </option>

                      <option value="No">
                        {"No"}
                      </option>

                    </select>

                  </label>

                </div>

              </div>

              <div style={css("display:flex;gap:10px;flex-wrap:wrap;margin-top:18px")}>

                <button onClick={v.registrar} style={css("flex:1 1 160px;background:#06142E;color:#35E0FF;border:4px solid #06142E;box-shadow:6px 6px 0 #1E4FD8;padding:14px;font-family:'Archivo Black',sans-serif;font-size:15px;text-transform:uppercase;cursor:pointer")}>
                  {"Registrar paciente"}
                </button>

                <button onClick={v.demo} style={css("background:#35E0FF;border:4px solid #06142E;box-shadow:6px 6px 0 #06142E;padding:14px;font-size:13px;font-weight:700;cursor:pointer")}>
                  {"CARGAR EJEMPLOS"}
                </button>

              </div>

              <div style={css("margin-top:12px;font-size:13px;font-weight:700;color:#1E4FD8;min-height:18px")}>
                {v.aviso}
              </div>

            </div>
  )
}
