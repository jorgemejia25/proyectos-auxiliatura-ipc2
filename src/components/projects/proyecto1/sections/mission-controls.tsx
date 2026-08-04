// @ts-nocheck
"use client"

import { Fragment } from "react"

import { css } from "@/components/dc/css"

type Props = { v: Record<string, unknown> }

/**
 * Mission configuration controls and result panels.
 */
export function Proyecto1MissionControls({ v }: Props) {
  return (
<div style={css("flex:1 1 340px;min-width:300px;display:flex;flex-direction:column;gap:16px")}>

              <div style={css("background:#fff;border:5px solid #120720;box-shadow:10px 10px 0 #120720;padding:18px")}>

                <div style={css("font-family:'Archivo Black',sans-serif;font-size:19px;text-transform:uppercase")}>
                  {"Configurar misión"}
                </div>

                <div style={css("margin-top:12px;font-size:11px;font-weight:700;letter-spacing:1.5px")}>
                  {"PRUEBAS RÁPIDAS"}
                </div>

                <div style={css("display:flex;flex-wrap:wrap;gap:6px;margin-top:6px")}>

                  <button onClick={v.onPresetOk} style={css("flex:1 1 0;min-width:96px;padding:8px 6px;background:#C6FF3D;border:3px solid #120720;box-shadow:3px 3px 0 #120720;font-size:11px;font-weight:700;cursor:pointer")}>
                    {"RESCATE OK"}
                  </button>

                  <button onClick={v.onPresetFight} style={css("flex:1 1 0;min-width:96px;padding:8px 6px;background:#FF6FD8;border:3px solid #120720;box-shadow:3px 3px 0 #120720;font-size:11px;font-weight:700;cursor:pointer")}>
                    {"CON COMBATE"}
                  </button>

                  <button onClick={v.onPresetBad} style={css("flex:1 1 0;min-width:96px;padding:8px 6px;background:#120720;color:#FF6FD8;border:3px solid #120720;box-shadow:3px 3px 0 #7C3AED;font-size:11px;font-weight:700;cursor:pointer")}>
                    {"IMPOSIBLE"}
                  </button>

                </div>

                <div style={css("margin-top:14px;font-size:11px;font-weight:700;letter-spacing:1.5px")}>
                  {"CIUDAD"}
                </div>

                <select value={v.cityId} onChange={v.onCity} style={css("width:100%;margin-top:6px;padding:9px;border:4px solid #120720;background:#EDE4FF;font-size:14px;font-weight:700")}>

                  {v.cityOptions.map((c, cIdx) => (
                    <Fragment key={cIdx}>
                      <option value={c.id}>
                        {c.name}
                      </option>
                    </Fragment>
                  ))}

                </select>

                <div style={css("margin-top:14px;font-size:11px;font-weight:700;letter-spacing:1.5px")}>
                  {"TIPO DE MISIÓN"}
                </div>

                <div style={css("display:flex;gap:8px;margin-top:6px")}>

                  <button onClick={v.onRescate} style={v.btnRescate}>
                    {"RESCATE"}
                  </button>

                  <button onClick={v.onExtraccion} style={v.btnExtraccion}>
                    {"EXTRACCIÓN"}
                  </button>

                </div>

                <div style={css("margin-top:14px;font-size:11px;font-weight:700;letter-spacing:1.5px")}>
                  {"ROBOT"}
                </div>

                <select value={v.robotId} onChange={v.onRobot} style={css("width:100%;margin-top:6px;padding:9px;border:4px solid #120720;background:#EDE4FF;font-size:14px;font-weight:700")}>

                  {v.robotOptions.map((r, rIdx) => (
                    <Fragment key={rIdx}>
                      <option value={r.id}>
                        {r.label}
                      </option>
                    </Fragment>
                  ))}

                </select>

                <div style={css("margin-top:14px;font-size:11px;font-weight:700;letter-spacing:1.5px")}>
                  {"PUNTO DE ENTRADA"}
                </div>

                <select value={v.entryIdx} onChange={v.onEntry} style={css("width:100%;margin-top:6px;padding:9px;border:4px solid #120720;background:#EDE4FF;font-size:14px;font-weight:700")}>

                  {v.entryOptions.map((e, eIdx) => (
                    <Fragment key={eIdx}>
                      <option value={e.idx}>
                        {e.label}
                      </option>
                    </Fragment>
                  ))}

                </select>

                <div style={css("margin-top:14px;font-size:11px;font-weight:700;letter-spacing:1.5px")}>
                  {v.targetLabel}
                </div>

                <select value={v.targetIdx} onChange={v.onTarget} style={css("width:100%;margin-top:6px;padding:9px;border:4px solid #120720;background:#EDE4FF;font-size:14px;font-weight:700")}>

                  {v.targetOptions.map((t, tIdx) => (
                    <Fragment key={tIdx}>
                      <option value={t.idx}>
                        {t.label}
                      </option>
                    </Fragment>
                  ))}

                </select>

                <div style={css("display:flex;gap:8px;margin-top:18px")}>

                  <button onClick={v.onRun} style={v.runStyle}>
                    {v.runLabel}
                  </button>

                  <button onClick={v.onReset} style={css("flex:0 0 auto;padding:12px 14px;background:#fff;border:4px solid #120720;box-shadow:4px 4px 0 #120720;font-size:13px;font-weight:700;cursor:pointer")}>
                    {"RESET"}
                  </button>

                </div>

                {!!(v.notice) ? (
                  <>

                    <div style={css("margin-top:12px;background:#C6FF3D;border:3px solid #120720;padding:10px;font-size:13px;font-weight:700")}>
                      {v.notice}
                    </div>

                  </>
                ) : null}

              </div>

              {!!(v.hasResult) ? (
                <>

                  <div style={v.resultStyle}>

                    <div style={css("font-family:'Archivo Black',sans-serif;font-size:20px;text-transform:uppercase")}>
                      {v.resultTitle}
                    </div>

                    <div style={css("margin-top:12px;display:flex;flex-direction:column;gap:8px;font-size:14px")}>

                      {v.resultLines.map((l, lIdx) => (
                        <Fragment key={lIdx}>

                          <div style={css("display:flex;gap:8px;border-bottom:2px dashed rgba(18,7,32,.35);padding-bottom:6px")}>

                            <span style={css("flex:0 0 44%;font-weight:700;opacity:.75")}>
                              {l.k}
                            </span>

                            <span style={css("font-weight:700")}>
                              {l.v}
                            </span>

                          </div>

                        </Fragment>
                      ))}

                    </div>

                  </div>

                </>
              ) : null}

              {!!(v.hasLog) ? (
                <>

                  <div style={css("background:#120720;color:#EDE4FF;border:5px solid #120720;box-shadow:10px 10px 0 #7C3AED;padding:16px")}>

                    <div style={css("font-size:11px;font-weight:700;letter-spacing:2px;color:#C6FF3D")}>
                      {"BITÁCORA DE RECORRIDO"}
                    </div>

                    <div style={css("margin-top:10px;max-height:230px;overflow:auto;display:flex;flex-direction:column;gap:4px;font-size:12px;line-height:1.4")}>

                      {v.logLines.map((l, lIdx) => (
                        <Fragment key={lIdx}>

                          <div style={l.style}>
                            {l.text}
                          </div>

                        </Fragment>
                      ))}

                    </div>

                  </div>

                </>
              ) : null}

              {!!(v.showDotPanel) ? (
                <>

                  <div style={css("background:#EDE4FF;border:5px solid #120720;box-shadow:10px 10px 0 #FF6FD8;padding:16px")}>

                    <div style={css("font-size:11px;font-weight:700;letter-spacing:2px")}>
                      {"SALIDA GRAPHVIZ (.dot)"}
                    </div>

                    <pre style={css("margin:10px 0 0;max-height:210px;overflow:auto;font-size:11px;line-height:1.5;background:#fff;border:3px solid #120720;padding:10px;white-space:pre")}>
                      {v.dotText}
                    </pre>

                  </div>

                </>
              ) : null}

            </div>
  )
}
