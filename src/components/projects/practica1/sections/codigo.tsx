// @ts-nocheck
"use client"

import { CodeBlock } from "@/components/code-block"
import { css } from "@/components/dc/css"

type Props = {
  v: Record<string, unknown>
}

/**
 * Interactive codigo panel for Practica1.
 */
export function Practica1CodigoPanel({ v }: Props) {
  return (
            <section id="codigo" style={css("max-width:1240px;margin:0 auto;padding:20px 22px 56px")}>

              <div style={css("display:flex;align-items:baseline;gap:14px;flex-wrap:wrap")}>

                <div style={css("font-family:'Archivo Black',sans-serif;font-size:15px;background:#06142E;color:#35E0FF;padding:4px 10px")}>
                  {"04"}
                </div>

                <h2 style={css("font-family:'Archivo Black',sans-serif;font-size:clamp(30px,5vw,54px);margin:0;text-transform:uppercase;letter-spacing:-2px")}>
                  {"Esqueleto en C#"}
                </h2>

              </div>

              <div style={css("display:flex;gap:8px;flex-wrap:wrap;margin-top:22px")}>

                <button onClick={v.tabMascota} style={css(`background:${v.bgTabMascota};color:${v.fgTabMascota};border:4px solid #06142E;box-shadow:5px 5px 0 #06142E;padding:10px 14px;font-size:13px;font-weight:700;cursor:pointer`)}>
                  {"Mascota.cs"}
                </button>

                <button onClick={v.tabPerro} style={css(`background:${v.bgTabPerro};color:${v.fgTabPerro};border:4px solid #06142E;box-shadow:5px 5px 0 #06142E;padding:10px 14px;font-size:13px;font-weight:700;cursor:pointer`)}>
                  {"Perro.cs"}
                </button>

                <button onClick={v.tabOtras} style={css(`background:${v.bgTabOtras};color:${v.fgTabOtras};border:4px solid #06142E;box-shadow:5px 5px 0 #06142E;padding:10px 14px;font-size:13px;font-weight:700;cursor:pointer`)}>
                  {"Gato · Ave · Tortuga"}
                </button>

                <button onClick={v.tabProgram} style={css(`background:${v.bgTabProgram};color:${v.fgTabProgram};border:4px solid #06142E;box-shadow:5px 5px 0 #06142E;padding:10px 14px;font-size:13px;font-weight:700;cursor:pointer`)}>
                  {"Program.cs"}
                </button>

              </div>

              <div style={css("margin-top:18px;background:#06142E;border:5px solid #06142E;box-shadow:12px 12px 0 #1E4FD8;overflow:auto")}>
                <CodeBlock
                  code={String(v.codigo ?? "")}
                  language="csharp"
                  variant="dark"
                  style={css("padding:20px;font-size:13px;line-height:1.65;max-height:none")}
                />
              </div>

            </section>
  )
}
