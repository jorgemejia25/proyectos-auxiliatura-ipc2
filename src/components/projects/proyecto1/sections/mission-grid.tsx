// @ts-nocheck
"use client"

import { Fragment } from "react"

import { css } from "@/components/dc/css"

type Props = { v: Record<string, unknown> }

/**
 * Mission matrix grid and hover readout.
 */
export function Proyecto1MissionGrid({ v }: Props) {
  return (
<div style={css("flex:1 1 560px;min-width:320px")}>

              <div style={css("background:#120720;border:5px solid #120720;box-shadow:12px 12px 0 #FF6FD8;padding:14px;overflow-x:auto")}>

                <div style={css("display:flex;justify-content:space-between;align-items:flex-end;gap:12px;padding:2px 2px 12px;flex-wrap:wrap;border-bottom:3px solid #3B0764;margin-bottom:12px")}>

                  <div>

                    <div style={css("font-size:10px;letter-spacing:2px;font-weight:700;color:#7C3AED")}>
                      {"MALLA CHAPINEYES"}
                    </div>

                    <div style={css("font-family:'Archivo Black',sans-serif;font-size:22px;color:#C6FF3D;line-height:1.1")}>
                      {v.cityName}
                    </div>

                  </div>

                  <div style={css("display:flex;gap:8px;flex-wrap:wrap")}>

                    <div style={css("background:#3B0764;border:2px solid #7C3AED;padding:5px 9px;font-size:11px;font-weight:700;color:#EDE4FF")}>
                      {v.cityDims}
                    </div>

                    <div style={css("background:#3B0764;border:2px solid #7C3AED;padding:5px 9px;font-size:11px;font-weight:700;color:#FF6FD8")}>
                      {v.milCount}
                    </div>

                    <div style={v.stepBadgeStyle}>
                      {v.stepBadge}
                    </div>

                  </div>

                </div>

                <div style={css("display:flex;gap:2px;margin-bottom:3px")}>

                  <div style={css("flex:0 0 26px")} />

                  {v.colNums.map((n, nIdx) => (
                    <Fragment key={nIdx}>

                      <div style={n.style}>
                        {n.n}
                      </div>

                    </Fragment>
                  ))}

                </div>

                {v.gridRows.map((row, rowIdx) => (
                  <Fragment key={rowIdx}>

                    <div style={css("display:flex;gap:2px;margin-bottom:2px")}>

                      <div style={row.numStyle}>
                        {row.num}
                      </div>

                      {row.cells.map((cell, cellIdx) => (
                        <Fragment key={cellIdx}>

                          <div style={cell.style} onClick={cell.onClick} onMouseEnter={cell.onHover} title={cell.title}>
                            {cell.label}
                          </div>

                        </Fragment>
                      ))}

                    </div>

                  </Fragment>
                ))}

                <div style={css("display:flex;align-items:center;gap:10px;margin-top:12px;padding-top:12px;border-top:3px solid #3B0764;flex-wrap:wrap")}>

                  <div style={css("flex:1 1 220px;min-width:180px;background:#3B0764;border:2px solid #7C3AED;padding:7px 10px;font-size:11.5px;font-weight:700;color:#EDE4FF")}>
                    {v.hoverText}
                  </div>

                  <div style={css("flex:1 1 160px;min-width:140px;height:16px;background:#241338;border:2px solid #7C3AED;padding:2px")}>

                    <div style={v.progressStyle} />

                  </div>

                </div>

              </div>

              <div style={css("display:flex;flex-wrap:wrap;gap:10px;margin-top:18px;font-size:11px;font-weight:700")}>

                <span style={css("display:flex;align-items:center;gap:6px")}>
                  <span style={css("width:16px;height:16px;background:#C6FF3D;border:2px solid #120720")} />
                  {"ENTRADA"}
                </span>

                <span style={css("display:flex;align-items:center;gap:6px")}>
                  <span style={css("width:16px;height:16px;background:#fff;border:2px solid #120720")} />
                  {"CAMINO"}
                </span>

                <span style={css("display:flex;align-items:center;gap:6px")}>
                  <span style={css("width:16px;height:16px;background:#241338;border:2px solid #120720")} />
                  {"INTRANSITABLE"}
                </span>

                <span style={css("display:flex;align-items:center;gap:6px")}>
                  <span style={css("width:16px;height:16px;background:#3B0764;border:2px solid #C6FF3D")} />
                  {"MILITAR"}
                </span>

                <span style={css("display:flex;align-items:center;gap:6px")}>
                  <span style={css("width:16px;height:16px;background:#FF6FD8;border:2px solid #120720")} />
                  {"RECURSO"}
                </span>

                <span style={css("display:flex;align-items:center;gap:6px")}>
                  <span style={css("width:16px;height:16px;background:#7C3AED;border:2px solid #120720")} />
                  {"RUTA"}
                </span>

              </div>

            </div>
  )
}
