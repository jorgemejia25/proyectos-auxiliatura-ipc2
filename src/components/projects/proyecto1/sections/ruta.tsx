import { css } from "@/components/dc/css"

type Proyecto1RutaSectionProps = {
  treeText: string
}

/**
 * ruta section for Proyecto1.
 */
export function Proyecto1RutaSection({ treeText }: Proyecto1RutaSectionProps) {
  return (
        <section id="ruta" style={css("max-width:1240px;margin:0 auto;padding:56px 22px")}>

          <div style={css("display:flex;align-items:baseline;gap:14px;flex-wrap:wrap")}>

            <div style={css("font-family:'Archivo Black',sans-serif;font-size:15px;background:#120720;color:#C6FF3D;padding:4px 10px")}>
              {"08"}
            </div>

            <h2 style={css("font-family:'Archivo Black',sans-serif;font-size:clamp(30px,5vw,54px);margin:0;text-transform:uppercase;letter-spacing:-2px")}>
              {"Ruta de trabajo"}
            </h2>

          </div>

          <p style={css("max-width:840px;font-size:17px;line-height:1.65;margin:18px 0 0;text-wrap:pretty")}>
            {"Siete fases en orden de dependencia: cada una se puede probar sola antes de empezar la siguiente, y cada bloque cierra con un "}
            <strong>
              {"release"}
            </strong>
            {" en el repositorio."}
          </p>

          <div style={css("display:flex;flex-direction:column;gap:16px;margin-top:28px")}>

            <div style={css("display:flex;gap:18px;flex-wrap:wrap;background:#fff;border:5px solid #120720;box-shadow:10px 10px 0 #120720;padding:20px")}>

              <div style={css("flex:0 0 84px;background:#C6FF3D;border:4px solid #120720;display:grid;place-items:center;font-family:'Archivo Black',sans-serif;font-size:34px;min-height:84px")}>
                {"00"}
              </div>

              <div style={css("flex:1 1 320px")}>

                <div style={css("font-family:'Archivo Black',sans-serif;font-size:22px;text-transform:uppercase")}>
                  {"Repositorio y esqueleto"}
                </div>

                <p style={css("font-size:14.5px;line-height:1.6;margin:6px 0 0")}>
                  {"Cree el repositorio con el nombre exigido, la solución de consola en C# y las carpetas vacías. Primer commit con README y .gitignore."}
                </p>

                <div style={css("display:flex;gap:8px;flex-wrap:wrap;margin-top:10px")}>
                  <span style={css("background:#EDE4FF;border:3px solid #120720;padding:3px 8px;font-size:11.5px;font-weight:700")}>
                    {"RELEASE 1"}
                  </span>
                  <span style={css("background:#EDE4FF;border:3px solid #120720;padding:3px 8px;font-size:11.5px;font-weight:700")}>
                    {"SE PRUEBA: COMPILA Y CORRE"}
                  </span>
                </div>

              </div>

            </div>

            <div style={css("display:flex;gap:18px;flex-wrap:wrap;background:#fff;border:5px solid #120720;box-shadow:10px 10px 0 #120720;padding:20px")}>

              <div style={css("flex:0 0 84px;background:#7C3AED;color:#fff;border:4px solid #120720;display:grid;place-items:center;font-family:'Archivo Black',sans-serif;font-size:34px;min-height:84px")}>
                {"01"}
              </div>

              <div style={css("flex:1 1 320px")}>

                <div style={css("font-family:'Archivo Black',sans-serif;font-size:22px;text-transform:uppercase")}>
                  {"TDA propios"}
                </div>

                <p style={css("font-size:14.5px;line-height:1.6;margin:6px 0 0")}>
                  {"Nodo genérico, lista simple, pila y cola. Escriba un pequeño método de prueba que inserte, recorra e imprima antes de usarlos en el resto del sistema."}
                </p>

                <div style={css("display:flex;gap:8px;flex-wrap:wrap;margin-top:10px")}>
                  <span style={css("background:#EDE4FF;border:3px solid #120720;padding:3px 8px;font-size:11.5px;font-weight:700")}>
                    {"RELEASE 1"}
                  </span>
                  <span style={css("background:#EDE4FF;border:3px solid #120720;padding:3px 8px;font-size:11.5px;font-weight:700")}>
                    {"SIN List NI ARRAYS"}
                  </span>
                </div>

              </div>

            </div>

            <div style={css("display:flex;gap:18px;flex-wrap:wrap;background:#fff;border:5px solid #120720;box-shadow:10px 10px 0 #120720;padding:20px")}>

              <div style={css("flex:0 0 84px;background:#7C3AED;color:#fff;border:4px solid #120720;display:grid;place-items:center;font-family:'Archivo Black',sans-serif;font-size:34px;min-height:84px")}>
                {"02"}
              </div>

              <div style={css("flex:1 1 320px")}>

                <div style={css("font-family:'Archivo Black',sans-serif;font-size:22px;text-transform:uppercase")}>
                  {"Matriz de la ciudad"}
                </div>

                <p style={css("font-size:14.5px;line-height:1.6;margin:6px 0 0")}>
                  {"NodoCelda con cuatro enlaces y MatrizCiudad para insertar y obtener celdas. Imprima la matriz en consola: si se dibuja igual que el XML, los enlaces están bien."}
                </p>

                <div style={css("display:flex;gap:8px;flex-wrap:wrap;margin-top:10px")}>
                  <span style={css("background:#EDE4FF;border:3px solid #120720;padding:3px 8px;font-size:11.5px;font-weight:700")}>
                    {"RELEASE 2"}
                  </span>
                  <span style={css("background:#EDE4FF;border:3px solid #120720;padding:3px 8px;font-size:11.5px;font-weight:700")}>
                    {"COORDENADAS DESDE 1"}
                  </span>
                </div>

              </div>

            </div>

            <div style={css("display:flex;gap:18px;flex-wrap:wrap;background:#fff;border:5px solid #120720;box-shadow:10px 10px 0 #120720;padding:20px")}>

              <div style={css("flex:0 0 84px;background:#7C3AED;color:#fff;border:4px solid #120720;display:grid;place-items:center;font-family:'Archivo Black',sans-serif;font-size:34px;min-height:84px")}>
                {"03"}
              </div>

              <div style={css("flex:1 1 320px")}>

                <div style={css("font-family:'Archivo Black',sans-serif;font-size:22px;text-transform:uppercase")}>
                  {"Carga del XML"}
                </div>

                <p style={css("font-size:14.5px;line-height:1.6;margin:6px 0 0")}>
                  {"Lector que llena la matriz, coloca las unidades militares y registra robots. Pruebe la carga de dos archivos seguidos: nombres repetidos deben actualizar, no duplicar."}
                </p>

                <div style={css("display:flex;gap:8px;flex-wrap:wrap;margin-top:10px")}>
                  <span style={css("background:#EDE4FF;border:3px solid #120720;padding:3px 8px;font-size:11.5px;font-weight:700")}>
                    {"RELEASE 2"}
                  </span>
                  <span style={css("background:#EDE4FF;border:3px solid #120720;padding:3px 8px;font-size:11.5px;font-weight:700")}>
                    {"CAPACIDAD SOLO EN FIGHTER"}
                  </span>
                </div>

              </div>

            </div>

            <div style={css("display:flex;gap:18px;flex-wrap:wrap;background:#fff;border:5px solid #120720;box-shadow:10px 10px 0 #120720;padding:20px")}>

              <div style={css("flex:0 0 84px;background:#FF6FD8;border:4px solid #120720;display:grid;place-items:center;font-family:'Archivo Black',sans-serif;font-size:34px;min-height:84px")}>
                {"04"}
              </div>

              <div style={css("flex:1 1 320px")}>

                <div style={css("font-family:'Archivo Black',sans-serif;font-size:22px;text-transform:uppercase")}>
                  {"Robots y búsqueda de ruta"}
                </div>

                <p style={css("font-size:14.5px;line-height:1.6;margin:6px 0 0")}>
                  {"Robot abstracto, ChapinRescue y ChapinFighter, y el backtracking que usa "}
                  <code>
                    {"PuedeTransitar"}
                  </code>
                  {". El corazón de la práctica: pruebe rescate, combate y un objetivo rodeado."}
                </p>

                <div style={css("display:flex;gap:8px;flex-wrap:wrap;margin-top:10px")}>
                  <span style={css("background:#EDE4FF;border:3px solid #120720;padding:3px 8px;font-size:11.5px;font-weight:700")}>
                    {"RELEASE 3"}
                  </span>
                  <span style={css("background:#EDE4FF;border:3px solid #120720;padding:3px 8px;font-size:11.5px;font-weight:700")}>
                    {"CASO “MISIÓN IMPOSIBLE”"}
                  </span>
                </div>

              </div>

            </div>

            <div style={css("display:flex;gap:18px;flex-wrap:wrap;background:#fff;border:5px solid #120720;box-shadow:10px 10px 0 #120720;padding:20px")}>

              <div style={css("flex:0 0 84px;background:#FF6FD8;border:4px solid #120720;display:grid;place-items:center;font-family:'Archivo Black',sans-serif;font-size:34px;min-height:84px")}>
                {"05"}
              </div>

              <div style={css("flex:1 1 320px")}>

                <div style={css("font-family:'Archivo Black',sans-serif;font-size:22px;text-transform:uppercase")}>
                  {"Menú y salidas"}
                </div>

                <p style={css("font-size:14.5px;line-height:1.6;margin:6px 0 0")}>
                  {"Menú en bucle hasta salir: cargar archivo, listar, planificar rescate, planificar extracción. Imprima el detalle de la misión con el formato del enunciado."}
                </p>

                <div style={css("display:flex;gap:8px;flex-wrap:wrap;margin-top:10px")}>
                  <span style={css("background:#EDE4FF;border:3px solid #120720;padding:3px 8px;font-size:11.5px;font-weight:700")}>
                    {"RELEASE 3"}
                  </span>
                  <span style={css("background:#EDE4FF;border:3px solid #120720;padding:3px 8px;font-size:11.5px;font-weight:700")}>
                    {"VALIDAR ENTRADAS"}
                  </span>
                </div>

              </div>

            </div>

            <div style={css("display:flex;gap:18px;flex-wrap:wrap;background:#fff;border:5px solid #120720;box-shadow:10px 10px 0 #120720;padding:20px")}>

              <div style={css("flex:0 0 84px;background:#3B0764;color:#C6FF3D;border:4px solid #120720;display:grid;place-items:center;font-family:'Archivo Black',sans-serif;font-size:34px;min-height:84px")}>
                {"06"}
              </div>

              <div style={css("flex:1 1 320px")}>

                <div style={css("font-family:'Archivo Black',sans-serif;font-size:22px;text-transform:uppercase")}>
                  {"Graphviz y documentación"}
                </div>

                <p style={css("font-size:14.5px;line-height:1.6;margin:6px 0 0")}>
                  {"Genere el .dot de la última ruta, compílelo a imagen y escriba el ensayo con los anexos. Deje capturas de cada misión de prueba dentro de la documentación."}
                </p>

                <div style={css("display:flex;gap:8px;flex-wrap:wrap;margin-top:10px")}>
                  <span style={css("background:#EDE4FF;border:3px solid #120720;padding:3px 8px;font-size:11.5px;font-weight:700")}>
                    {"RELEASE 4"}
                  </span>
                  <span style={css("background:#EDE4FF;border:3px solid #120720;padding:3px 8px;font-size:11.5px;font-weight:700")}>
                    {"4–7 PÁGINAS"}
                  </span>
                </div>

              </div>

            </div>

          </div>

          <div style={css("display:flex;flex-wrap:wrap;gap:20px;margin-top:34px;align-items:stretch")}>

            <div style={css("flex:1 1 420px;background:#120720;color:#EDE4FF;border:5px solid #120720;box-shadow:12px 12px 0 #7C3AED;padding:24px")}>

              <div style={css("font-size:12px;letter-spacing:2px;font-weight:700;color:#C6FF3D")}>
                {"ESTRUCTURA RECOMENDADA DEL REPOSITORIO"}
              </div>

              <div style={css("margin-top:14px;font-size:13px;line-height:1.75;white-space:pre;overflow:auto;color:#EDE4FF")}>
                {treeText}
              </div>

            </div>

            <div style={css("flex:1 1 280px;display:flex;flex-direction:column;gap:14px")}>

              <div style={css("background:#C6FF3D;border:5px solid #120720;box-shadow:8px 8px 0 #120720;padding:18px")}>

                <div style={css("font-weight:700;font-size:13px;letter-spacing:1.5px")}>
                  {"UNA CLASE POR ARCHIVO"}
                </div>

                <div style={css("font-size:13.5px;line-height:1.55;margin-top:6px")}>
                  {"El nombre del archivo es el nombre de la clase. Facilita la revisión y evita conflictos al hacer merge."}
                </div>

              </div>

              <div style={css("background:#fff;border:5px solid #120720;box-shadow:8px 8px 0 #120720;padding:18px")}>

                <div style={css("font-weight:700;font-size:13px;letter-spacing:1.5px")}>
                  {"CARPETAS POR RESPONSABILIDAD"}
                </div>

                <div style={css("font-size:13.5px;line-height:1.55;margin-top:6px")}>
                  {"TDA no conoce el dominio, Modelo no conoce la consola, Program solo orquesta. Si una carpeta necesita otra hacia arriba, la separación está mal."}
                </div>

              </div>

              <div style={css("background:#7C3AED;color:#fff;border:5px solid #120720;box-shadow:8px 8px 0 #120720;padding:18px")}>

                <div style={css("font-weight:700;font-size:13px;letter-spacing:1.5px;color:#C6FF3D")}>
                  {"COMMITS PEQUEÑOS"}
                </div>

                <div style={css("font-size:13.5px;line-height:1.55;margin-top:6px")}>
                  {"Use Conventional Commits y tags semanales. Detalle completo en "}
                  <a href="#versionamiento" style={css("color:#120720;border-bottom:3px solid #120720;font-weight:700")}>
                    {"Commits y GitFlow"}
                  </a>
                  {"."}
                </div>

              </div>

            </div>

          </div>

        </section>
  )
}
