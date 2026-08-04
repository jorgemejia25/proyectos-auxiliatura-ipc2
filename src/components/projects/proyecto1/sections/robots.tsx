import { css } from "@/components/dc/css"

/**
 * robots section for Proyecto1.
 */
export function Proyecto1RobotsSection() {
  return (
        <section id="robots" style={css("max-width:1240px;margin:0 auto;padding:56px 22px")}>

          <div style={css("display:flex;align-items:baseline;gap:14px;flex-wrap:wrap")}>

            <div style={css("font-family:'Archivo Black',sans-serif;font-size:15px;background:#120720;color:#C6FF3D;padding:4px 10px")}>
              {"02"}
            </div>

            <h2 style={css("font-family:'Archivo Black',sans-serif;font-size:clamp(30px,5vw,54px);margin:0;text-transform:uppercase;letter-spacing:-2px")}>
              {"Unidades robóticas"}
            </h2>

          </div>

          <div style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:20px;margin-top:26px")}>

            <div style={css("background:#fff;border:5px solid #120720;box-shadow:12px 12px 0 #7C3AED;padding:24px")}>

              <div style={css("display:inline-block;background:#7C3AED;color:#fff;border:3px solid #120720;padding:4px 10px;font-size:12px;font-weight:700;letter-spacing:1.5px")}>
                {"TIPO A"}
              </div>

              <div style={css("font-family:'Archivo Black',sans-serif;font-size:34px;margin-top:10px;letter-spacing:-1px")}>
                {"ChapinRescue"}
              </div>

              <ul style={css("margin:12px 0 0;padding-left:20px;font-size:15px;line-height:1.6")}>

                <li>
                  {"Ingresa por un punto de entrada y sigue un "}
                  <strong>
                    {"camino seguro"}
                  </strong>
                  {"."}
                </li>

                <li>
                  {"Rescata la unidad civil seleccionada."}
                </li>

                <li>
                  <strong>
                    {"No puede enfrentar"}
                  </strong>
                  {" unidades militares: cualquier camino con militares queda descartado."}
                </li>

                <li>
                  {"Sin capacidad de combate."}
                </li>

              </ul>

            </div>

            <div style={css("background:#fff;border:5px solid #120720;box-shadow:12px 12px 0 #FF6FD8;padding:24px")}>

              <div style={css("display:inline-block;background:#FF6FD8;border:3px solid #120720;padding:4px 10px;font-size:12px;font-weight:700;letter-spacing:1.5px")}>
                {"TIPO B"}
              </div>

              <div style={css("font-family:'Archivo Black',sans-serif;font-size:34px;margin-top:10px;letter-spacing:-1px")}>
                {"ChapinFighter"}
              </div>

              <ul style={css("margin:12px 0 0;padding-left:20px;font-size:15px;line-height:1.6")}>

                <li>
                  {"Ingresa por un punto de entrada y llega hasta un "}
                  <strong>
                    {"recurso"}
                  </strong>
                  {" para extraerlo."}
                </li>

                <li>
                  {"Tiene "}
                  <strong>
                    {"capacidad de combate"}
                  </strong>
                  {" (entero)."}
                </li>

                <li>
                  {"Derrota a una unidad militar solo si su capacidad es "}
                  <strong>
                    {"mayor"}
                  </strong>
                  {"."}
                </li>

                <li>
                  {"Al vencerla, resta la capacidad de la unidad militar a la propia."}
                </li>

              </ul>

              <div style={css("margin-top:16px;background:#120720;color:#C6FF3D;border:3px solid #120720;padding:14px;font-size:15px;font-weight:700;display:flex;flex-wrap:wrap;gap:10px;align-items:center")}>

                <span>
                  {"100"}
                </span>
                <span style={css("color:#FF6FD8")}>
                  {"−"}
                </span>
                <span>
                  {"20"}
                </span>
                <span style={css("color:#FF6FD8")}>
                  {"="}
                </span>
                <span style={css("background:#C6FF3D;color:#120720;padding:2px 8px")}>
                  {"80"}
                </span>

                <span style={css("font-weight:400;font-size:12px;color:#EDE4FF")}>
                  {"capacidad inicial − militar vencida = capacidad final"}
                </span>

              </div>

            </div>

          </div>

        </section>
  )
}
