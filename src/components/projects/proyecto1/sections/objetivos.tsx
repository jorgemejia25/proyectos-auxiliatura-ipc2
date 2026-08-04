import { css } from "@/components/dc/css"

/**
 * objetivos section for Proyecto1.
 */
export function Proyecto1ObjetivosSection() {
  return (
        <section style={css("max-width:1240px;margin:0 auto;padding:56px 22px")}>

          <div style={css("display:flex;align-items:baseline;gap:14px;flex-wrap:wrap")}>

            <div style={css("font-family:'Archivo Black',sans-serif;font-size:15px;background:#120720;color:#C6FF3D;padding:4px 10px")}>
              {"00"}
            </div>

            <h2 style={css("font-family:'Archivo Black',sans-serif;font-size:clamp(30px,5vw,54px);margin:0;text-transform:uppercase;letter-spacing:-2px")}>
              {"Objetivos"}
            </h2>

          </div>

          <div style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:18px;margin-top:26px")}>

            <div style={css("grid-column:1/-1;background:#7C3AED;color:#fff;border:5px solid #120720;box-shadow:10px 10px 0 #120720;padding:22px")}>

              <div style={css("font-size:12px;letter-spacing:2px;font-weight:700;color:#C6FF3D")}>
                {"OBJETIVO GENERAL"}
              </div>

              <p style={css("margin:8px 0 0;font-size:19px;line-height:1.45;font-weight:500;text-wrap:pretty")}>
                {"Modelar, documentar e implementar una solución al problema planteado utilizando las herramientas de desarrollo presentadas en clase y laboratorio."}
              </p>

            </div>

            <div style={css("background:#fff;border:4px solid #120720;box-shadow:8px 8px 0 #120720;padding:18px")}>
              <div style={css("font-family:'Archivo Black',sans-serif;font-size:28px;color:#7C3AED")}>
                {"01"}
              </div>
              <div style={css("font-size:15px;line-height:1.5;margin-top:4px")}>
                {"Implementar la solución en "}
                <strong>
                  {"C#"}
                </strong>
                {"."}
              </div>
            </div>

            <div style={css("background:#fff;border:4px solid #120720;box-shadow:8px 8px 0 #120720;padding:18px")}>
              <div style={css("font-family:'Archivo Black',sans-serif;font-size:28px;color:#7C3AED")}>
                {"02"}
              </div>
              <div style={css("font-size:15px;line-height:1.5;margin-top:4px")}>
                {"Estructuras "}
                <strong>
                  {"secuenciales, cíclicas y condicionales"}
                </strong>
                {"."}
              </div>
            </div>

            <div style={css("background:#fff;border:4px solid #120720;box-shadow:8px 8px 0 #120720;padding:18px")}>
              <div style={css("font-family:'Archivo Black',sans-serif;font-size:28px;color:#7C3AED")}>
                {"03"}
              </div>
              <div style={css("font-size:15px;line-height:1.5;margin-top:4px")}>
                {"Generar reportes con "}
                <strong>
                  {"Graphviz"}
                </strong>
                {"."}
              </div>
            </div>

            <div style={css("background:#fff;border:4px solid #120720;box-shadow:8px 8px 0 #120720;padding:18px")}>
              <div style={css("font-family:'Archivo Black',sans-serif;font-size:28px;color:#7C3AED")}>
                {"04"}
              </div>
              <div style={css("font-size:15px;line-height:1.5;margin-top:4px")}>
                {"Manipular archivos "}
                <strong>
                  {"XML"}
                </strong>
                {"."}
              </div>
            </div>

            <div style={css("background:#fff;border:4px solid #120720;box-shadow:8px 8px 0 #120720;padding:18px")}>
              <div style={css("font-family:'Archivo Black',sans-serif;font-size:28px;color:#7C3AED")}>
                {"05"}
              </div>
              <div style={css("font-size:15px;line-height:1.5;margin-top:4px")}>
                {"Aplicar "}
                <strong>
                  {"TDA"}
                </strong>
                {" sobre memoria dinámica."}
              </div>
            </div>

            <div style={css("background:#fff;border:4px solid #120720;box-shadow:8px 8px 0 #120720;padding:18px")}>
              <div style={css("font-family:'Archivo Black',sans-serif;font-size:28px;color:#7C3AED")}>
                {"06"}
              </div>
              <div style={css("font-size:15px;line-height:1.5;margin-top:4px")}>
                {"Usar "}
                <strong>
                  {"estructuras propias"}
                </strong>
                {", no las de C#."}
              </div>
            </div>

            <div style={css("background:#fff;border:4px solid #120720;box-shadow:8px 8px 0 #120720;padding:18px")}>
              <div style={css("font-family:'Archivo Black',sans-serif;font-size:28px;color:#7C3AED")}>
                {"07"}
              </div>
              <div style={css("font-size:15px;line-height:1.5;margin-top:4px")}>
                {"Aplicar el paradigma "}
                <strong>
                  {"orientado a objetos"}
                </strong>
                {"."}
              </div>
            </div>

          </div>

        </section>
  )
}
