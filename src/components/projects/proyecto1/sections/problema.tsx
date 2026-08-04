import { css } from "@/components/dc/css"

/**
 * problema section for Proyecto1.
 */
export function Proyecto1ProblemaSection() {
  return (
        <section id="problema" style={css("background:#120720;color:#EDE4FF;border-top:5px solid #120720;border-bottom:5px solid #120720;padding:56px 0")}>

          <div style={css("max-width:1240px;margin:0 auto;padding:0 22px")}>

            <div style={css("display:flex;align-items:baseline;gap:14px;flex-wrap:wrap")}>

              <div style={css("font-family:'Archivo Black',sans-serif;font-size:15px;background:#C6FF3D;color:#120720;padding:4px 10px")}>
                {"01"}
              </div>

              <h2 style={css("font-family:'Archivo Black',sans-serif;font-size:clamp(30px,5vw,54px);margin:0;text-transform:uppercase;letter-spacing:-2px;color:#C6FF3D")}>
                {"El problema"}
              </h2>

            </div>

            <p style={css("max-width:820px;font-size:17px;line-height:1.65;margin:18px 0 0;text-wrap:pretty")}>
              {"Chapín Warriors, S.A. rescata civiles y extrae recursos de ciudades en conflicto bélico. Sus drones "}
              <strong style={css("color:#C6FF3D")}>
                {"ChapinEyes"}
              </strong>
              {" —autónomos e invisibles al radar— sobrevuelan la ciudad y devuelven un "}
              <strong style={css("color:#C6FF3D")}>
                {"mapa bidimensional"}
              </strong>
              {": una malla de celdas. Usted construye el sistema de control que lee esa malla y planifica las misiones."}
            </p>

            <div style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px;margin-top:28px")}>

              <div style={css("background:#3B0764;border:4px solid #C6FF3D;padding:20px")}>
                <div style={css("font-size:12px;letter-spacing:2px;font-weight:700;color:#FF6FD8")}>
                  {"PASO 1"}
                </div>
                <div style={css("font-family:'Archivo Black',sans-serif;font-size:22px;margin-top:6px")}>
                  {"ChapinEyes sobrevuela"}
                </div>
                <p style={css("font-size:14px;line-height:1.55;margin:8px 0 0")}>
                  {"El dron mapea la ciudad y clasifica cada celda de la malla."}
                </p>
              </div>

              <div style={css("background:#3B0764;border:4px solid #C6FF3D;padding:20px")}>
                <div style={css("font-size:12px;letter-spacing:2px;font-weight:700;color:#FF6FD8")}>
                  {"PASO 2"}
                </div>
                <div style={css("font-family:'Archivo Black',sans-serif;font-size:22px;margin-top:6px")}>
                  {"XML de configuración"}
                </div>
                <p style={css("font-size:14px;line-height:1.55;margin:8px 0 0")}>
                  {"Ciudades, filas, unidades militares y robots entran al sistema por archivo."}
                </p>
              </div>

              <div style={css("background:#3B0764;border:4px solid #C6FF3D;padding:20px")}>
                <div style={css("font-size:12px;letter-spacing:2px;font-weight:700;color:#FF6FD8")}>
                  {"PASO 3"}
                </div>
                <div style={css("font-family:'Archivo Black',sans-serif;font-size:22px;margin-top:6px")}>
                  {"Estrategia de misión"}
                </div>
                <p style={css("font-size:14px;line-height:1.55;margin:8px 0 0")}>
                  {"El sistema elige robot, calcula un camino válido y lo grafica con Graphviz."}
                </p>
              </div>

            </div>

            <h3 style={css("font-family:'Archivo Black',sans-serif;font-size:24px;margin:42px 0 0;text-transform:uppercase;color:#C6FF3D")}>
              {"Leyenda de celdas"}
            </h3>

            <div style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:14px;margin-top:16px")}>

              <div style={css("display:flex;gap:14px;align-items:flex-start;background:#EDE4FF;color:#120720;border:4px solid #C6FF3D;padding:14px")}>

                <div style={css("flex:0 0 48px;height:48px;background:#C6FF3D;border:3px solid #120720;display:grid;place-items:center;font-family:'Archivo Black',sans-serif;font-size:22px")}>
                  {"E"}
                </div>

                <div>
                  <div style={css("font-weight:700;font-size:15px")}>
                    {"Punto de entrada"}
                  </div>
                  <div style={css("font-size:13px;line-height:1.45")}>
                    {"Inicia toda misión. "}
                    <strong>
                      {"Transitable."}
                    </strong>
                  </div>
                </div>

              </div>

              <div style={css("display:flex;gap:14px;align-items:flex-start;background:#EDE4FF;color:#120720;border:4px solid #C6FF3D;padding:14px")}>

                <div style={css("flex:0 0 48px;height:48px;background:#241338;border:3px solid #120720")} />

                <div>
                  <div style={css("font-weight:700;font-size:15px")}>
                    {"Intransitable "}
                    <span style={css("opacity:.6")}>
                      {"( * )"}
                    </span>
                  </div>
                  <div style={css("font-size:13px;line-height:1.45")}>
                    {"No es posible transitar."}
                  </div>
                </div>

              </div>

              <div style={css("display:flex;gap:14px;align-items:flex-start;background:#EDE4FF;color:#120720;border:4px solid #C6FF3D;padding:14px")}>

                <div style={css("flex:0 0 48px;height:48px;background:#fff;border:3px solid #120720")} />

                <div>
                  <div style={css("font-weight:700;font-size:15px")}>
                    {"Camino "}
                    <span style={css("opacity:.6")}>
                      {"( espacio )"}
                    </span>
                  </div>
                  <div style={css("font-size:13px;line-height:1.45")}>
                    {"Celda libre, siempre transitable."}
                  </div>
                </div>

              </div>

              <div style={css("display:flex;gap:14px;align-items:flex-start;background:#EDE4FF;color:#120720;border:4px solid #C6FF3D;padding:14px")}>

                <div style={css("flex:0 0 48px;height:48px;background:#3B0764;color:#C6FF3D;border:3px solid #120720;display:grid;place-items:center;font-weight:700;font-size:15px")}>
                  {"20"}
                </div>

                <div>
                  <div style={css("font-weight:700;font-size:15px")}>
                    {"Unidad militar"}
                  </div>
                  <div style={css("font-size:13px;line-height:1.45")}>
                    {"Transitable "}
                    <strong>
                      {"solo"}
                    </strong>
                    {" si se supera su capacidad de combate."}
                  </div>
                </div>

              </div>

              <div style={css("display:flex;gap:14px;align-items:flex-start;background:#EDE4FF;color:#120720;border:4px solid #C6FF3D;padding:14px")}>

                <div style={css("flex:0 0 48px;height:48px;background:#fff;border:3px solid #120720;display:grid;place-items:center;font-family:'Archivo Black',sans-serif;font-size:22px;color:#7C3AED")}>
                  {"C"}
                </div>

                <div>
                  <div style={css("font-weight:700;font-size:15px")}>
                    {"Unidad civil"}
                  </div>
                  <div style={css("font-size:13px;line-height:1.45")}>
                    {"Objetivo de rescate. "}
                    <strong>
                      {"Siempre transitable."}
                    </strong>
                  </div>
                </div>

              </div>

              <div style={css("display:flex;gap:14px;align-items:flex-start;background:#EDE4FF;color:#120720;border:4px solid #C6FF3D;padding:14px")}>

                <div style={css("flex:0 0 48px;height:48px;background:#FF6FD8;border:3px solid #120720;display:grid;place-items:center;font-family:'Archivo Black',sans-serif;font-size:22px")}>
                  {"R"}
                </div>

                <div>
                  <div style={css("font-weight:700;font-size:15px")}>
                    {"Recurso"}
                  </div>
                  <div style={css("font-size:13px;line-height:1.45")}>
                    {"Objetivo de extracción. "}
                    <strong>
                      {"No puede ser transitado."}
                    </strong>
                  </div>
                </div>

              </div>

            </div>

          </div>

        </section>
  )
}
