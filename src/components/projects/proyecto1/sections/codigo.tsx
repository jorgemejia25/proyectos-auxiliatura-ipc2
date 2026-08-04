// @ts-nocheck
"use client"

import { CodeBlock } from "@/components/code-block"
import { css } from "@/components/dc/css"

type Props = {
  v: Record<string, unknown>
}

/**
 * Interactive codigo panel for Proyecto1.
 */
export function Proyecto1CodigoPanel({ v }: Props) {
  return (
        <section id="codigo" style={css("background:#120720;color:#EDE4FF;border-top:5px solid #120720;border-bottom:5px solid #120720;padding:56px 0")}>

          <div style={css("max-width:1240px;margin:0 auto;padding:0 22px")}>

            <div style={css("display:flex;align-items:baseline;gap:14px;flex-wrap:wrap")}>

              <div style={css("font-family:'Archivo Black',sans-serif;font-size:15px;background:#C6FF3D;color:#120720;padding:4px 10px")}>
                {"07"}
              </div>

              <h2 style={css("font-family:'Archivo Black',sans-serif;font-size:clamp(30px,5vw,54px);margin:0;text-transform:uppercase;letter-spacing:-2px;color:#C6FF3D")}>
                {"Guía de código"}
              </h2>

            </div>

            <p style={css("max-width:840px;font-size:17px;line-height:1.65;margin:18px 0 0;text-wrap:pretty")}>
              {"Esqueleto en C# de cada pieza. No es la solución completa: son las firmas, los enlaces entre nodos y la regla de negocio de cada clase para que usted implemente el resto."}
            </p>

            <div style={css("display:flex;gap:8px;flex-wrap:wrap;margin-top:24px")}>

              <button onClick={v.onCodeMatriz} style={v.tabCodeMatriz}>
                {"MatrizCiudad.cs"}
              </button>

              <button onClick={v.onCodeListas} style={v.tabCodeListas}>
                {"Lista · Pila · Cola"}
              </button>

              <button onClick={v.onCodeRobots} style={v.tabCodeRobots}>
                {"Robot.cs"}
              </button>

              <button onClick={v.onCodeRuta} style={v.tabCodeRuta}>
                {"BuscadorRuta.cs"}
              </button>

              <button onClick={v.onCodeXml} style={v.tabCodeXml}>
                {"LectorConfiguracion.cs"}
              </button>

              <button onClick={v.onCodeDot} style={v.tabCodeDot}>
                {"ReporteRuta.cs"}
              </button>

              <button onClick={v.onCodeMenu} style={v.tabCodeMenu}>
                {"Program.cs"}
              </button>

            </div>

            <div style={css("margin:14px 0 0;background:#1A0B2E;border:5px solid #C6FF3D;box-shadow:12px 12px 0 #7C3AED")}>
              <CodeBlock
                code={String(v.codeText ?? "")}
                language="csharp"
                variant="dark"
                style={css("padding:20px;font-size:12.5px;line-height:1.6;overflow:auto;max-height:620px")}
              />
            </div>

            <div style={css("margin-top:14px;background:#C6FF3D;color:#120720;border:4px solid #C6FF3D;padding:14px;font-size:13.5px;font-weight:700;text-wrap:pretty")}>
              {v.codeCaption}
            </div>

          </div>

        </section>
  )
}
