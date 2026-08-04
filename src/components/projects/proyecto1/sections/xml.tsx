// @ts-nocheck
"use client"

import { CodeBlock } from "@/components/code-block"
import { css } from "@/components/dc/css"

type Props = {
  v: Record<string, unknown>
}

/**
 * Interactive xml panel for Proyecto1.
 */
export function Proyecto1XmlPanel({ v }: Props) {
  return (
        <section id="xml" style={css("background:#120720;color:#EDE4FF;border-top:5px solid #120720;border-bottom:5px solid #120720;padding:56px 0")}>

          <div style={css("max-width:1240px;margin:0 auto;padding:0 22px")}>

            <div style={css("display:flex;align-items:baseline;gap:14px;flex-wrap:wrap")}>

              <div style={css("font-family:'Archivo Black',sans-serif;font-size:15px;background:#C6FF3D;color:#120720;padding:4px 10px")}>
                {"05"}
              </div>

              <h2 style={css("font-family:'Archivo Black',sans-serif;font-size:clamp(30px,5vw,54px);margin:0;text-transform:uppercase;letter-spacing:-2px;color:#C6FF3D")}>
                {"Archivo XML"}
              </h2>

            </div>

            <div style={css("display:flex;flex-wrap:wrap;gap:22px;margin-top:24px;align-items:flex-start")}>

              <div style={css("flex:1 1 540px;min-width:300px")}>

                <div style={css("display:flex;gap:8px;flex-wrap:wrap")}>

                  <button onClick={v.onTabEstructura} style={v.tabEstructura}>
                    {"estructura.xml"}
                  </button>

                  <button onClick={v.onTabAlfa} style={v.tabAlfa}>
                    {"config_ciudadAlfa.xml"}
                  </button>

                  <button onClick={v.onTabBeta} style={v.tabBeta}>
                    {"config_ciudadBeta.xml"}
                  </button>

                </div>

                <div style={css("margin:12px 0 0;background:#1A0B2E;border:5px solid #C6FF3D;box-shadow:10px 10px 0 #7C3AED")}>
                  <CodeBlock
                    code={String(v.xmlText ?? "")}
                    language="xml"
                    variant="dark"
                    style={css("padding:18px;font-size:12px;line-height:1.55;overflow:auto;max-height:560px")}
                  />
                </div>

                <div style={css("margin-top:12px;background:#C6FF3D;color:#120720;border:4px solid #120720;padding:12px;font-size:13px;font-weight:700")}>
                  {v.xmlCaption}
                </div>

              </div>

              <div style={css("flex:1 1 300px;min-width:280px;display:flex;flex-direction:column;gap:12px")}>

                <div style={css("background:#3B0764;border:4px solid #C6FF3D;padding:14px")}>
                  <div style={css("font-weight:700;color:#C6FF3D;font-size:13px")}>
                    {"1 · n etiquetas fila"}
                  </div>
                  <div style={css("font-size:13.5px;line-height:1.5;margin-top:4px")}>
                    {"Hay tantas etiquetas "}
                    <code>
                      {"fila"}
                    </code>
                    {" como indique el atributo "}
                    <code>
                      {"filas"}
                    </code>
                    {" de "}
                    <code>
                      {"nombre"}
                    </code>
                    {"."}
                  </div>
                </div>

                <div style={css("background:#3B0764;border:4px solid #C6FF3D;padding:14px")}>
                  <div style={css("font-weight:700;color:#C6FF3D;font-size:13px")}>
                    {"2 · valor de fila"}
                  </div>
                  <div style={css("font-size:13.5px;line-height:1.5;margin-top:4px")}>
                    {"Cadena entre comillas con "}
                    <em>
                      {"m"}
                    </em>
                    {" caracteres = atributo "}
                    <code>
                      {"columnas"}
                    </code>
                    {". Válidos: "}
                    <code>
                      {"*"}
                    </code>
                    {" intransitable, "}
                    <code>
                      {"espacio"}
                    </code>
                    {" camino, "}
                    <code>
                      {"E"}
                    </code>
                    {" entrada, "}
                    <code>
                      {"C"}
                    </code>
                    {" civil, "}
                    <code>
                      {"R"}
                    </code>
                    {" recurso."}
                  </div>
                </div>

                <div style={css("background:#3B0764;border:4px solid #C6FF3D;padding:14px")}>
                  <div style={css("font-weight:700;color:#C6FF3D;font-size:13px")}>
                    {"3 · unidadMilitar"}
                  </div>
                  <div style={css("font-size:13.5px;line-height:1.5;margin-top:4px")}>
                    {"Su valor es la "}
                    <strong>
                      {"capacidad de combate"}
                    </strong>
                    {" y se ubica por fila y columna."}
                  </div>
                </div>

                <div style={css("background:#3B0764;border:4px solid #C6FF3D;padding:14px")}>
                  <div style={css("font-weight:700;color:#C6FF3D;font-size:13px")}>
                    {"4 · tipo de robot"}
                  </div>
                  <div style={css("font-size:13.5px;line-height:1.5;margin-top:4px")}>
                    {"Solo "}
                    <code>
                      {"ChapinRescue"}
                    </code>
                    {" o "}
                    <code>
                      {"ChapinFighter"}
                    </code>
                    {"."}
                  </div>
                </div>

                <div style={css("background:#3B0764;border:4px solid #C6FF3D;padding:14px")}>
                  <div style={css("font-weight:700;color:#C6FF3D;font-size:13px")}>
                    {"5 · capacidad"}
                  </div>
                  <div style={css("font-size:13.5px;line-height:1.5;margin-top:4px")}>
                    {"El atributo "}
                    <code>
                      {"capacidad"}
                    </code>
                    {" existe "}
                    <strong>
                      {"solo"}
                    </strong>
                    {" si el tipo es "}
                    <code>
                      {"ChapinFighter"}
                    </code>
                    {"."}
                  </div>
                </div>

                <div style={css("background:#C6FF3D;color:#120720;border:4px solid #C6FF3D;padding:14px")}>
                  <div style={css("font-weight:700;font-size:13px")}>
                    {"CARGA MÚLTIPLE"}
                  </div>
                  <div style={css("font-size:13.5px;line-height:1.5;margin-top:4px")}>
                    {"Si se cargan varios archivos y se repiten nombres de ciudades o robots, los datos se "}
                    <strong>
                      {"actualizan"}
                    </strong>
                    {" en el sistema de control."}
                  </div>
                </div>

              </div>

            </div>

          </div>

        </section>
  )
}
