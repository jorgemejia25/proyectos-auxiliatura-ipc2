import { css } from "@/components/dc/css"

/**
 * matriz section for Proyecto1.
 */
export function Proyecto1MatrizSection() {
  return (
        <section id="matriz" style={css("background:#7C3AED;border-top:5px solid #120720;border-bottom:5px solid #120720;padding:56px 0")}>

          <div style={css("max-width:1240px;margin:0 auto;padding:0 22px")}>

            <div style={css("display:flex;align-items:baseline;gap:14px;flex-wrap:wrap")}>

              <div style={css("font-family:'Archivo Black',sans-serif;font-size:15px;background:#120720;color:#C6FF3D;padding:4px 10px")}>
                {"03"}
              </div>

              <h2 style={css("font-family:'Archivo Black',sans-serif;font-size:clamp(30px,5vw,54px);margin:0;text-transform:uppercase;letter-spacing:-2px;color:#fff;text-shadow:5px 5px 0 #120720")}>
                {"La matriz"}
              </h2>

            </div>

            <p style={css("max-width:840px;font-size:17px;line-height:1.65;color:#fff;margin:18px 0 0;text-wrap:pretty")}>
              {"La malla es una matriz de "}
              <strong>
                {"filas × columnas"}
              </strong>
              {". Cada etiqueta "}
              <code style={css("background:#120720;color:#C6FF3D;padding:2px 6px")}>
                {"fila"}
              </code>
              {" del XML aporta una cadena de "}
              <em>
                {"m"}
              </em>
              {" caracteres, y cada carácter es una celda. Las coordenadas se leen "}
              <strong>
                {"(fila, columna)"}
              </strong>
              {" empezando en 1 — igual que en la salida esperada: "}
              <em>
                {"“Unidad civil rescatada: 14,19”"}
              </em>
              {"."}
            </p>

            <div style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:16px;margin-top:24px")}>

              <div style={css("background:#EDE4FF;border:4px solid #120720;box-shadow:8px 8px 0 #120720;padding:18px")}>
                <div style={css("font-family:'Archivo Black',sans-serif;font-size:20px")}>
                  {"Recorrido"}
                </div>
                <p style={css("font-size:14px;line-height:1.55;margin:8px 0 0")}>
                  {"Desde una celda solo se avanza a sus vecinas "}
                  <strong>
                    {"arriba, abajo, izquierda y derecha"}
                  </strong>
                  {"."}
                </p>
              </div>

              <div style={css("background:#EDE4FF;border:4px solid #120720;box-shadow:8px 8px 0 #120720;padding:18px")}>
                <div style={css("font-family:'Archivo Black',sans-serif;font-size:20px")}>
                  {"Un camino basta"}
                </div>
                <p style={css("font-size:14px;line-height:1.55;margin:8px 0 0")}>
                  {"Puede haber varias rutas válidas; el proyecto solo exige "}
                  <strong>
                    {"identificar una"}
                  </strong>
                  {" que complete la misión."}
                </p>
              </div>

              <div style={css("background:#EDE4FF;border:4px solid #120720;box-shadow:8px 8px 0 #120720;padding:18px")}>
                <div style={css("font-family:'Archivo Black',sans-serif;font-size:20px")}>
                  {"Sin salida"}
                </div>
                <p style={css("font-size:14px;line-height:1.55;margin:8px 0 0")}>
                  {"Si ninguna ruta es posible, la salida del sistema es "}
                  <strong>
                    {"“Misión Imposible”"}
                  </strong>
                  {"."}
                </p>
              </div>

              <div style={css("background:#EDE4FF;border:4px solid #120720;box-shadow:8px 8px 0 #120720;padding:18px")}>
                <div style={css("font-family:'Archivo Black',sans-serif;font-size:20px")}>
                  {"Almacenamiento"}
                </div>
                <p style={css("font-size:14px;line-height:1.55;margin:8px 0 0")}>
                  {"La matriz vive en "}
                  <strong>
                    {"TDA propios"}
                  </strong>
                  {" (listas de listas, pilas, colas) sobre memoria dinámica."}
                </p>
              </div>

            </div>

          </div>

        </section>
  )
}
