import { css } from "@/components/dc/css"

/**
 * hero section for Proyecto1.
 */
export function Proyecto1HeroSection() {
  return (
        <section style={css("max-width:1240px;margin:0 auto;padding:56px 22px 30px")}>

          <div style={css("display:inline-block;background:#C6FF3D;border:4px solid #120720;box-shadow:7px 7px 0 #120720;padding:6px 14px;font-size:13px;font-weight:700;letter-spacing:2px")}>
            {"USAC · FIUSAC · ESCUELA DE CIENCIAS Y SISTEMAS"}
          </div>

          <h1 style={css("font-family:'Archivo Black',sans-serif;font-size:clamp(52px,10vw,148px);line-height:.86;letter-spacing:-5px;margin:22px 0 0;text-transform:uppercase;color:#120720;text-shadow:8px 8px 0 #7C3AED")}>
            {"Proyecto"}
            <br />
            {"Uno"}
          </h1>

          <div style={css("display:flex;flex-wrap:wrap;gap:20px;margin-top:26px;align-items:stretch")}>

            <div style={css("flex:2 1 420px;background:#FFFFFF;border:5px solid #120720;box-shadow:12px 12px 0 #120720;padding:24px")}>

              <div style={css("font-family:'Archivo Black',sans-serif;font-size:26px;line-height:1.05;text-transform:uppercase")}>
                {"Sistema de control"}
                <br />
                {"Chapín Warriors, S.A."}
              </div>

              <p style={css("font-size:15px;line-height:1.6;margin:14px 0 0;text-wrap:pretty")}>
                {"Recibe la malla de celdas que construye el dron "}
                <strong>
                  {"ChapinEyes"}
                </strong>
                {", define misiones de "}
                <strong>
                  {"rescate"}
                </strong>
                {" y "}
                <strong>
                  {"extracción de recursos"}
                </strong>
                {", e indica qué robot puede completarlas y el camino exacto que debe seguir sobre la matriz."}
              </p>

              <div style={css("display:flex;flex-wrap:wrap;gap:8px;margin-top:18px")}>

                <span style={css("background:#7C3AED;color:#fff;border:3px solid #120720;padding:5px 10px;font-size:12px;font-weight:700")}>
                  {"C#"}
                </span>

                <span style={css("background:#FF6FD8;border:3px solid #120720;padding:5px 10px;font-size:12px;font-weight:700")}>
                  {"XML"}
                </span>

                <span style={css("background:#C6FF3D;border:3px solid #120720;padding:5px 10px;font-size:12px;font-weight:700")}>
                  {"GRAPHVIZ"}
                </span>

                <span style={css("background:#120720;color:#C6FF3D;border:3px solid #120720;padding:5px 10px;font-size:12px;font-weight:700")}>
                  {"TDA PROPIOS"}
                </span>

                <span style={css("background:#fff;border:3px solid #120720;padding:5px 10px;font-size:12px;font-weight:700")}>
                  {"POO"}
                </span>

              </div>

            </div>

            <div style={css("flex:1 1 260px;background:#3B0764;color:#EDE4FF;border:5px solid #120720;box-shadow:12px 12px 0 #120720;padding:24px;display:flex;flex-direction:column;justify-content:space-between;gap:16px")}>

              <div>

                <div style={css("font-size:12px;letter-spacing:2px;font-weight:700;color:#C6FF3D")}>
                  {"ENTREGA"}
                </div>

                <div style={css("font-family:'Archivo Black',sans-serif;font-size:44px;line-height:1;margin-top:6px")}>
                  {"27 AGO"}
                </div>

                <div style={css("font-size:13px;margin-top:4px")}>
                  {"11:59 pm · UEDI · sin prórroga"}
                </div>

              </div>

              <div style={css("border-top:3px dashed #7C3AED;padding-top:14px;font-size:13px;line-height:1.5")}>

                <div>
                  <strong style={css("color:#C6FF3D")}>
                    {"4"}
                  </strong>
                  {" releases mínimo (1 por semana)"}
                </div>

                <div style={css("margin-top:6px")}>
                  <strong style={css("color:#C6FF3D")}>
                    {"4–7"}
                  </strong>
                  {" páginas de ensayo + anexos"}
                </div>

              </div>

            </div>

          </div>

        </section>
  )
}
