import { Fragment } from "react"

import { css } from "@/components/dc/css"

type Practica1HcSectionProps = {
  hcFilas: Array<{ nombre: string; valor: number; peso: number; sangria: string; bg: string }>
}

/**
 * hc section for Practica1.
 */
export function Practica1HcSection({ hcFilas }: Practica1HcSectionProps) {
  return (
        <section id="hc" style={css("background:#06142E;color:#E4EEFF;border-top:5px solid #06142E;border-bottom:5px solid #06142E;padding:56px 0")}>

          <div style={css("max-width:1240px;margin:0 auto;padding:0 22px")}>

            <div style={css("display:flex;align-items:baseline;gap:14px;flex-wrap:wrap")}>

              <div style={css("font-family:'Archivo Black',sans-serif;font-size:15px;background:#35E0FF;color:#06142E;padding:4px 10px")}>
                {"06"}
              </div>

              <h2 style={css("font-family:'Archivo Black',sans-serif;font-size:clamp(30px,5vw,54px);margin:0;text-transform:uppercase;letter-spacing:-2px;color:#fff")}>
                {"Hoja de calificación"}
              </h2>

            </div>

            <div style={css("display:flex;flex-wrap:wrap;gap:14px;margin-top:18px;font-size:13px")}>

              <div style={css("background:#082A63;border:3px solid #35E0FF;padding:8px 12px")}>
                {"Introducción a la Programación y Computación 2"}
              </div>

              <div style={css("background:#082A63;border:3px solid #35E0FF;padding:8px 12px")}>
                {"Fecha calificación: ___ / ___ / ______"}
              </div>

              <div style={css("background:#082A63;border:3px solid #35E0FF;padding:8px 12px")}>
                {"Nombre: ______________________"}
              </div>

              <div style={css("background:#082A63;border:3px solid #35E0FF;padding:8px 12px")}>
                {"Carné: ______________"}
              </div>

            </div>

            <div style={css("margin-top:24px;background:#fff;color:#06142E;border:5px solid #35E0FF;box-shadow:12px 12px 0 #1E4FD8;overflow:auto")}>

              <div style={css("display:grid;grid-template-columns:minmax(220px,3fr) 70px 1fr 80px;min-width:640px")}>

                <div style={css("background:#06142E;color:#35E0FF;padding:12px;font-size:12px;font-weight:700;letter-spacing:1.5px")}>
                  {"DESCRIPCIÓN DE PONDERACIÓN"}
                </div>

                <div style={css("background:#06142E;color:#35E0FF;padding:12px;font-size:12px;font-weight:700;letter-spacing:1.5px")}>
                  {"VALOR"}
                </div>

                <div style={css("background:#06142E;color:#35E0FF;padding:12px;font-size:12px;font-weight:700;letter-spacing:1.5px")}>
                  {"OBSERVACIÓN"}
                </div>

                <div style={css("background:#06142E;color:#35E0FF;padding:12px;font-size:12px;font-weight:700;letter-spacing:1.5px")}>
                  {"PUNTEO"}
                </div>

                {hcFilas.map((f, fIdx) => (
                  <Fragment key={fIdx}>

                    <div style={css(`padding:10px 12px;font-size:13.5px;font-weight:${f.peso};background:${f.bg};outline:2px solid #06142E;padding-left:${f.sangria}`)}>
                      {f.nombre}
                    </div>

                    <div style={css(`padding:10px 12px;font-size:13.5px;font-weight:700;background:${f.bg};outline:2px solid #06142E`)}>
                      {f.valor}
                    </div>

                    <div style={css(`background:${f.bg};outline:2px solid #06142E`)} />

                    <div style={css(`background:${f.bg};outline:2px solid #06142E`)} />

                  </Fragment>
                ))}

              </div>

            </div>

            <div style={css("display:flex;flex-wrap:wrap;gap:20px;margin-top:26px")}>

              <div style={css("flex:1 1 300px;background:#082A63;border:4px solid #35E0FF;padding:20px")}>

                <div style={css("font-size:12px;letter-spacing:2px;font-weight:700;color:#35E0FF")}>
                  {"CONFORMIDAD"}
                </div>

                <p style={css("font-size:14px;line-height:1.6;margin:8px 0 22px")}>
                  {"Estoy conforme con la nota obtenida."}
                </p>

                <div style={css("display:flex;gap:20px;flex-wrap:wrap;font-size:12px")}>

                  <div style={css("flex:1 1 120px;border-top:3px solid #35E0FF;padding-top:6px")}>
                    {"Firma del Alumno"}
                  </div>

                  <div style={css("flex:1 1 120px;border-top:3px solid #35E0FF;padding-top:6px")}>
                    {"Firma del Auxiliar"}
                  </div>

                </div>

              </div>

              <div style={css("flex:1 1 300px;background:#1E4FD8;border:4px solid #35E0FF;padding:20px")}>

                <div style={css("font-size:12px;letter-spacing:2px;font-weight:700;color:#35E0FF")}>
                  {"RÚBRICA DEL ENUNCIADO"}
                </div>

                <div style={css("display:flex;flex-direction:column;gap:7px;margin-top:12px;font-size:13.5px")}>

                  <div style={css("display:flex;justify-content:space-between;gap:10px;background:#06142E;padding:7px 10px")}>
                    <span>
                      {"Abstracción · clase abstracta"}
                    </span>
                    <strong style={css("color:#35E0FF")}>
                      {"10"}
                    </strong>
                  </div>

                  <div style={css("display:flex;justify-content:space-between;gap:10px;background:#06142E;padding:7px 10px")}>
                    <span>
                      {"Herencia en atributos y métodos"}
                    </span>
                    <strong style={css("color:#35E0FF")}>
                      {"20"}
                    </strong>
                  </div>

                  <div style={css("display:flex;justify-content:space-between;gap:10px;background:#06142E;padding:7px 10px")}>
                    <span>
                      {"Encapsulamiento · privados, get/set"}
                    </span>
                    <strong style={css("color:#35E0FF")}>
                      {"25"}
                    </strong>
                  </div>

                  <div style={css("display:flex;justify-content:space-between;gap:10px;background:#06142E;padding:7px 10px")}>
                    <span>
                      {"Polimorfismo · sobrescritura"}
                    </span>
                    <strong style={css("color:#35E0FF")}>
                      {"10"}
                    </strong>
                  </div>

                  <div style={css("display:flex;justify-content:space-between;gap:10px;background:#06142E;padding:7px 10px")}>
                    <span>
                      {"Funcionalidad del sistema"}
                    </span>
                    <strong style={css("color:#35E0FF")}>
                      {"30"}
                    </strong>
                  </div>

                  <div style={css("display:flex;justify-content:space-between;gap:10px;background:#06142E;padding:7px 10px")}>
                    <span>
                      {"Preguntas · autoría"}
                    </span>
                    <strong style={css("color:#35E0FF")}>
                      {"5"}
                    </strong>
                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>
  )
}
