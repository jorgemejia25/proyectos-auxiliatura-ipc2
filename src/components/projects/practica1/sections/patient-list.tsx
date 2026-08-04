// @ts-nocheck
"use client"

import { Fragment } from "react"

import { css } from "@/components/dc/css"

type Props = { v: Record<string, unknown> }

/**
 * Registered patients list with dose/info actions.
 */
export function Practica1PatientList({ v }: Props) {
  return (
<div style={css("margin-top:34px")}>

            <div style={css("font-family:'Archivo Black',sans-serif;font-size:20px;text-transform:uppercase")}>
              {"2 · Gestionar pacientes registrados"}
            </div>

            {!!(v.vacio) ? (
              <>

                <div style={css("margin-top:14px;background:#E4EEFF;border:4px dashed #06142E;padding:26px;text-align:center;font-size:14px;font-weight:700;color:#082A63")}>
                  {"Sin pacientes registrados. Registra uno arriba o carga los ejemplos."}
                </div>

              </>
            ) : null}

            <div style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:18px;margin-top:16px")}>

              {v.pacientes.map((p, pIdx) => (
                <Fragment key={pIdx}>

                  <div style={css("background:#fff;border:5px solid #06142E;box-shadow:9px 9px 0 #06142E;padding:18px;animation:rise .22s ease-out")}>

                    <div style={css("display:flex;justify-content:space-between;align-items:flex-start;gap:10px")}>

                      <div>

                        <div style={css("font-family:'Archivo Black',sans-serif;font-size:22px;text-transform:uppercase;line-height:1")}>
                          {p.nombre}
                        </div>

                        <div style={css("font-size:12px;font-weight:700;letter-spacing:1px;color:#1E4FD8;margin-top:4px")}>
                          {p.tipo}{" · FACTOR "}{p.factorTxt}
                        </div>

                      </div>

                      <div style={css("background:#06142E;color:#35E0FF;padding:5px 8px;font-size:12px;font-weight:700;letter-spacing:1px")}>
                        {p.codigo}
                      </div>

                    </div>

                    <div style={css("display:grid;grid-template-columns:1fr 1fr;gap:6px;margin-top:14px;font-size:13px")}>

                      <div style={css("background:#E4EEFF;border:3px solid #06142E;padding:6px 8px")}>
                        {"Peso: "}
                        <strong>
                          {p.pesoTxt}
                        </strong>
                      </div>

                      <div style={css("background:#E4EEFF;border:3px solid #06142E;padding:6px 8px")}>
                        {"Edad: "}
                        <strong>
                          {p.edadTxt}
                        </strong>
                      </div>

                      <div style={css("background:#E4EEFF;border:3px solid #06142E;padding:6px 8px")}>
                        {"Sexo: "}
                        <strong>
                          {p.sexo}
                        </strong>
                      </div>

                      <div style={css("background:#E4EEFF;border:3px solid #06142E;padding:6px 8px")}>
                        {"Dueño: "}
                        <strong>
                          {p.propietario}
                        </strong>
                      </div>

                      <div style={css("grid-column:1/-1;background:#E4EEFF;border:3px solid #06142E;padding:6px 8px")}>
                        {p.extraTxt}
                      </div>

                      <div style={css(`grid-column:1/-1;background:${p.estadoBg};color:${p.estadoFg};border:3px solid #06142E;padding:6px 8px;font-weight:700`)}>
                        {"Estado: "}{p.estado}
                      </div>

                    </div>

                    <div style={css("display:flex;gap:8px;flex-wrap:wrap;margin-top:14px")}>

                      <button onClick={p.onEstado} style={css("flex:1 1 130px;background:#35E0FF;border:4px solid #06142E;box-shadow:4px 4px 0 #06142E;padding:10px;font-size:12.5px;font-weight:700;cursor:pointer")}>
                        {"CAMBIAR ESTADO"}
                      </button>

                      <button onClick={p.onDosis} style={css("flex:1 1 130px;background:#1E4FD8;color:#fff;border:4px solid #06142E;box-shadow:4px 4px 0 #06142E;padding:10px;font-size:12.5px;font-weight:700;cursor:pointer")}>
                        {"CALCULAR DOSIS"}
                      </button>

                      <button onClick={p.onInfo} style={css("flex:1 1 130px;background:#fff;border:4px solid #06142E;box-shadow:4px 4px 0 #06142E;padding:10px;font-size:12.5px;font-weight:700;cursor:pointer")}>
                        {"VER INFORMACIÓN"}
                      </button>

                    </div>

                    <div style={css("margin-top:12px;background:#06142E;color:#35E0FF;padding:10px;font-size:13px;border:3px solid #06142E")}>
                      {p.dosisTxt}
                    </div>

                  </div>

                </Fragment>
              ))}

            </div>

          </div>
  )
}
