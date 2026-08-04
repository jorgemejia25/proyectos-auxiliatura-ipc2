import { css } from "@/components/dc/css"

/**
 * estructuras section for Proyecto1.
 */
export function Proyecto1EstructurasSection() {
  return (
        <section id="estructuras" style={css("max-width:1240px;margin:0 auto;padding:56px 22px")}>

          <div style={css("display:flex;align-items:baseline;gap:14px;flex-wrap:wrap")}>

            <div style={css("font-family:'Archivo Black',sans-serif;font-size:15px;background:#120720;color:#C6FF3D;padding:4px 10px")}>
              {"06"}
            </div>

            <h2 style={css("font-family:'Archivo Black',sans-serif;font-size:clamp(30px,5vw,54px);margin:0;text-transform:uppercase;letter-spacing:-2px")}>
              {"Estructuras a utilizar"}
            </h2>

          </div>

          <p style={css("max-width:840px;font-size:17px;line-height:1.65;margin:18px 0 0;text-wrap:pretty")}>
            {"El enunciado prohíbe las colecciones del lenguaje: toda la información se guarda en "}
            <strong>
              {"TDA propios"}
            </strong>
            {" sobre memoria dinámica. Estas son las cuatro estructuras que sostienen el sistema y el papel exacto de cada una."}
          </p>

          <div style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:20px;margin-top:28px")}>

            <div style={css("background:#fff;border:5px solid #120720;box-shadow:12px 12px 0 #7C3AED;padding:22px")}>

              <div style={css("display:flex;justify-content:space-between;align-items:baseline;gap:10px;flex-wrap:wrap")}>

                <div style={css("font-family:'Archivo Black',sans-serif;font-size:26px;letter-spacing:-1px")}>
                  {"Matriz enlazada"}
                </div>

                <div style={css("background:#7C3AED;color:#fff;border:3px solid #120720;padding:3px 8px;font-size:11.5px;font-weight:700")}>
                  {"LA CIUDAD"}
                </div>

              </div>

              <p style={css("font-size:14.5px;line-height:1.6;margin:10px 0 0")}>
                {"Lista de listas: cada celda es un nodo con enlaces "}
                <strong>
                  {"arriba, abajo, izquierda y derecha"}
                </strong>
                {". El recorrido nunca calcula índices, solo salta de vecino en vecino."}
              </p>

              <div style={css("display:grid;grid-template-columns:repeat(3,44px);gap:10px;margin-top:16px;justify-content:center")}>

                <div style={css("height:34px;background:#EDE4FF;border:3px solid #120720")} />

                <div style={css("height:34px;background:#EDE4FF;border:3px solid #120720;position:relative")}>
                  <div style={css("position:absolute;left:50%;bottom:-12px;width:3px;height:12px;background:#120720")} />
                </div>

                <div style={css("height:34px;background:#EDE4FF;border:3px solid #120720")} />

                <div style={css("height:34px;background:#EDE4FF;border:3px solid #120720;position:relative")}>
                  <div style={css("position:absolute;right:-12px;top:50%;height:3px;width:12px;background:#120720")} />
                </div>

                <div style={css("height:34px;background:#C6FF3D;border:3px solid #120720;position:relative")}>
                  <div style={css("position:absolute;right:-12px;top:50%;height:3px;width:12px;background:#120720")} />
                  <div style={css("position:absolute;left:50%;bottom:-12px;width:3px;height:12px;background:#120720")} />
                </div>

                <div style={css("height:34px;background:#EDE4FF;border:3px solid #120720")} />

                <div style={css("height:34px;background:#EDE4FF;border:3px solid #120720")} />

                <div style={css("height:34px;background:#EDE4FF;border:3px solid #120720")} />

                <div style={css("height:34px;background:#EDE4FF;border:3px solid #120720")} />

              </div>

              <div style={css("margin-top:16px;background:#120720;color:#C6FF3D;border:3px solid #120720;padding:10px;font-size:12.5px")}>
                {"NodoCelda { contenido, fila, columna, capacidadMilitar }"}
              </div>

            </div>

            <div style={css("background:#fff;border:5px solid #120720;box-shadow:12px 12px 0 #FF6FD8;padding:22px")}>

              <div style={css("display:flex;justify-content:space-between;align-items:baseline;gap:10px;flex-wrap:wrap")}>

                <div style={css("font-family:'Archivo Black',sans-serif;font-size:26px;letter-spacing:-1px")}>
                  {"Lista simple"}
                </div>

                <div style={css("background:#FF6FD8;border:3px solid #120720;padding:3px 8px;font-size:11.5px;font-weight:700")}>
                  {"CATÁLOGOS"}
                </div>

              </div>

              <p style={css("font-size:14.5px;line-height:1.6;margin:10px 0 0")}>
                {"Guarda las colecciones del sistema: ciudades cargadas, robots, puntos de entrada, unidades militares y la ruta resultante."}
              </p>

              <div style={css("display:flex;align-items:center;gap:6px;margin-top:16px;flex-wrap:wrap")}>

                <div style={css("background:#EDE4FF;border:3px solid #120720;padding:8px 10px;font-size:12px;font-weight:700")}>
                  {"ciudad"}
                </div>

                <div style={css("font-weight:700;color:#7C3AED")}>
                  {"→"}
                </div>

                <div style={css("background:#EDE4FF;border:3px solid #120720;padding:8px 10px;font-size:12px;font-weight:700")}>
                  {"robot"}
                </div>

                <div style={css("font-weight:700;color:#7C3AED")}>
                  {"→"}
                </div>

                <div style={css("background:#EDE4FF;border:3px solid #120720;padding:8px 10px;font-size:12px;font-weight:700")}>
                  {"robot"}
                </div>

                <div style={css("font-weight:700;color:#7C3AED")}>
                  {"→"}
                </div>

                <div style={css("background:#120720;color:#C6FF3D;border:3px solid #120720;padding:8px 10px;font-size:12px;font-weight:700")}>
                  {"null"}
                </div>

              </div>

              <div style={css("margin-top:16px;background:#120720;color:#C6FF3D;border:3px solid #120720;padding:10px;font-size:12.5px")}>
                {"Insertar · Buscar · ObtenerEn · Cantidad"}
              </div>

            </div>

            <div style={css("background:#fff;border:5px solid #120720;box-shadow:12px 12px 0 #C6FF3D;padding:22px")}>

              <div style={css("display:flex;justify-content:space-between;align-items:baseline;gap:10px;flex-wrap:wrap")}>

                <div style={css("font-family:'Archivo Black',sans-serif;font-size:26px;letter-spacing:-1px")}>
                  {"Pila"}
                </div>

                <div style={css("background:#C6FF3D;border:3px solid #120720;padding:3px 8px;font-size:11.5px;font-weight:700")}>
                  {"EL CAMINO"}
                </div>

              </div>

              <p style={css("font-size:14.5px;line-height:1.6;margin:10px 0 0")}>
                {"Sostiene las celdas del camino durante el backtracking. Cuando una rama se agota, "}
                <strong>
                  {"Desapilar"}
                </strong>
                {" deshace el paso y se prueba otra dirección."}
              </p>

              <div style={css("display:flex;flex-direction:column;gap:5px;margin-top:16px;align-items:center")}>

                <div style={css("width:150px;background:#C6FF3D;border:3px solid #120720;padding:7px;font-size:12px;font-weight:700;text-align:center")}>
                  {"tope · 8,7"}
                </div>

                <div style={css("width:150px;background:#EDE4FF;border:3px solid #120720;padding:7px;font-size:12px;text-align:center")}>
                  {"8,6"}
                </div>

                <div style={css("width:150px;background:#EDE4FF;border:3px solid #120720;padding:7px;font-size:12px;text-align:center")}>
                  {"8,5"}
                </div>

                <div style={css("width:150px;background:#EDE4FF;border:3px solid #120720;padding:7px;font-size:12px;text-align:center")}>
                  {"base · E"}
                </div>

              </div>

              <div style={css("margin-top:16px;background:#120720;color:#C6FF3D;border:3px solid #120720;padding:10px;font-size:12.5px")}>
                {"Apilar · Desapilar · EstaVacia"}
              </div>

            </div>

            <div style={css("background:#fff;border:5px solid #120720;box-shadow:12px 12px 0 #3B0764;padding:22px")}>

              <div style={css("display:flex;justify-content:space-between;align-items:baseline;gap:10px;flex-wrap:wrap")}>

                <div style={css("font-family:'Archivo Black',sans-serif;font-size:26px;letter-spacing:-1px")}>
                  {"Cola"}
                </div>

                <div style={css("background:#3B0764;color:#C6FF3D;border:3px solid #120720;padding:3px 8px;font-size:11.5px;font-weight:700")}>
                  {"RECORRIDO"}
                </div>

              </div>

              <p style={css("font-size:14.5px;line-height:1.6;margin:10px 0 0")}>
                {"Recorrido por niveles (BFS) cuando conviene la ruta más corta, y para procesar en orden las celdas pendientes de revisar."}
              </p>

              <div style={css("display:flex;align-items:center;gap:6px;margin-top:16px;flex-wrap:wrap")}>

                <div style={css("font-size:11px;font-weight:700;color:#7C3AED")}>
                  {"FRENTE"}
                </div>

                <div style={css("background:#EDE4FF;border:3px solid #120720;padding:8px 10px;font-size:12px;font-weight:700")}>
                  {"8,5"}
                </div>

                <div style={css("background:#EDE4FF;border:3px solid #120720;padding:8px 10px;font-size:12px;font-weight:700")}>
                  {"8,6"}
                </div>

                <div style={css("background:#EDE4FF;border:3px solid #120720;padding:8px 10px;font-size:12px;font-weight:700")}>
                  {"9,5"}
                </div>

                <div style={css("font-size:11px;font-weight:700;color:#7C3AED")}>
                  {"FINAL"}
                </div>

              </div>

              <div style={css("margin-top:16px;background:#120720;color:#C6FF3D;border:3px solid #120720;padding:10px;font-size:12.5px")}>
                {"Encolar · Desencolar · EstaVacia"}
              </div>

            </div>

          </div>

          <div style={css("margin-top:26px;background:#120720;color:#EDE4FF;border:5px solid #120720;box-shadow:12px 12px 0 #7C3AED;padding:24px")}>

            <div style={css("font-size:12px;letter-spacing:2px;font-weight:700;color:#C6FF3D")}>
              {"CLASES DEL SISTEMA"}
            </div>

            <div style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:14px;margin-top:14px")}>

              <div style={css("background:#3B0764;border:4px solid #C6FF3D;padding:14px")}>
                <div style={css("font-weight:700;font-size:15px;color:#C6FF3D")}>
                  {"SistemaControl"}
                </div>
                <div style={css("font-size:13px;line-height:1.5;margin-top:4px")}>
                  {"Guarda ciudades y robots, atiende el menú y coordina cada misión."}
                </div>
              </div>

              <div style={css("background:#3B0764;border:4px solid #C6FF3D;padding:14px")}>
                <div style={css("font-weight:700;font-size:15px;color:#C6FF3D")}>
                  {"MatrizCiudad"}
                </div>
                <div style={css("font-size:13px;line-height:1.5;margin-top:4px")}>
                  {"TDA de la malla: inserta celdas, coloca militares y entrega vecinos."}
                </div>
              </div>

              <div style={css("background:#3B0764;border:4px solid #C6FF3D;padding:14px")}>
                <div style={css("font-weight:700;font-size:15px;color:#C6FF3D")}>
                  {"Robot · abstracta"}
                </div>
                <div style={css("font-size:13px;line-height:1.5;margin-top:4px")}>
                  {"Base de ChapinRescue y ChapinFighter; define PuedeTransitar e Ingresar."}
                </div>
              </div>

              <div style={css("background:#3B0764;border:4px solid #C6FF3D;padding:14px")}>
                <div style={css("font-weight:700;font-size:15px;color:#C6FF3D")}>
                  {"BuscadorRuta"}
                </div>
                <div style={css("font-size:13px;line-height:1.5;margin-top:4px")}>
                  {"Backtracking sobre la matriz; devuelve una ruta válida o nada."}
                </div>
              </div>

              <div style={css("background:#3B0764;border:4px solid #C6FF3D;padding:14px")}>
                <div style={css("font-weight:700;font-size:15px;color:#C6FF3D")}>
                  {"LectorConfiguracion"}
                </div>
                <div style={css("font-size:13px;line-height:1.5;margin-top:4px")}>
                  {"Lee el XML y actualiza los datos existentes si el nombre se repite."}
                </div>
              </div>

              <div style={css("background:#3B0764;border:4px solid #C6FF3D;padding:14px")}>
                <div style={css("font-weight:700;font-size:15px;color:#C6FF3D")}>
                  {"ReporteRuta"}
                </div>
                <div style={css("font-size:13px;line-height:1.5;margin-top:4px")}>
                  {"Escribe el archivo .dot y lo compila con Graphviz."}
                </div>
              </div>

            </div>

          </div>

        </section>
  )
}
