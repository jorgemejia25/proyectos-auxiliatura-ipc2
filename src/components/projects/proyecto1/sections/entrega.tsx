import { css } from "@/components/dc/css"

type Proyecto1EntregaSectionProps = {
  repoName: string
}

/**
 * entrega section for Proyecto1.
 */
export function Proyecto1EntregaSection({ repoName }: Proyecto1EntregaSectionProps) {
  return (
        <section id="entrega" style={css("background:#3B0764;color:#EDE4FF;border-top:5px solid #120720;padding:56px 0")}>

          <div style={css("max-width:1240px;margin:0 auto;padding:0 22px")}>

            <div style={css("display:flex;align-items:baseline;gap:14px;flex-wrap:wrap")}>

              <div style={css("font-family:'Archivo Black',sans-serif;font-size:15px;background:#C6FF3D;color:#120720;padding:4px 10px")}>
                {"11"}
              </div>

              <h2 style={css("font-family:'Archivo Black',sans-serif;font-size:clamp(30px,5vw,54px);margin:0;text-transform:uppercase;letter-spacing:-2px;color:#fff")}>
                {"Entrega y documentación"}
              </h2>

            </div>

            <div style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(270px,1fr));gap:18px;margin-top:26px")}>

              <div style={css("background:#120720;border:4px solid #C6FF3D;padding:20px")}>

                <div style={css("font-size:12px;letter-spacing:2px;font-weight:700;color:#FF6FD8")}>
                  {"REPOSITORIO"}
                </div>

                <div style={css("font-family:'Archivo Black',sans-serif;font-size:19px;margin-top:8px;word-break:break-all;color:#C6FF3D")}>
                  {repoName}
                </div>

                <p style={css("font-size:14px;line-height:1.55;margin:10px 0 0")}>
                  {"GitHub, con los auxiliares como colaboradores y "}
                  <strong>
                    {"4 releases"}
                  </strong>
                  {" (uno por semana). El último es el release final, antes de la entrega. Favor incluirme como colaborador: jorgemejia25"}
                  <br />
                  <br />
                </p>

              </div>

              <div style={css("background:#120720;border:4px solid #C6FF3D;padding:20px")}>

                <div style={css("font-size:12px;letter-spacing:2px;font-weight:700;color:#FF6FD8")}>
                  {"DOCUMENTACIÓN"}
                </div>

                <div style={css("font-family:'Archivo Black',sans-serif;font-size:19px;margin-top:8px")}>
                  {"Ensayo de 4 a 7 páginas"}
                </div>

                <p style={css("font-size:14px;line-height:1.55;margin:10px 0 0")}>
                  {"Formato de ensayo del curso. Obligatorio el "}
                  <strong>
                    {"diagrama de clases"}
                  </strong>
                  {" y los algoritmos o diagramas de actividades que modelan la solución. Apéndices y anexos no cuentan al máximo."}
                </p>

              </div>

              <div style={css("background:#C6FF3D;color:#120720;border:4px solid #120720;padding:20px")}>

                <div style={css("font-size:12px;letter-spacing:2px;font-weight:700")}>
                  {"FECHA LÍMITE"}
                </div>

                <div style={css("font-family:'Archivo Black',sans-serif;font-size:34px;margin-top:8px;line-height:1")}>
                  {"27 AGO · 11:59 PM"}
                </div>

                <p style={css("font-size:14px;line-height:1.55;margin:10px 0 0")}>
                  {"Entrega por UEDI: archivo de texto con el link del repositorio. La documentación va en una carpeta separada del repo. "}
                  <strong>
                    {"NO habrá prórroga."}
                  </strong>
                </p>

              </div>

            </div>

          </div>

        </section>
  )
}
