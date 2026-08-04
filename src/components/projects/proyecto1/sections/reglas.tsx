import { css } from "@/components/dc/css"

/**
 * reglas section for Proyecto1.
 */
export function Proyecto1ReglasSection() {
  return (
        <section id="reglas" style={css("max-width:1240px;margin:0 auto;padding:56px 22px")}>

          <div style={css("display:flex;align-items:baseline;gap:14px;flex-wrap:wrap")}>

            <div style={css("font-family:'Archivo Black',sans-serif;font-size:15px;background:#120720;color:#C6FF3D;padding:4px 10px")}>
              {"10"}
            </div>

            <h2 style={css("font-family:'Archivo Black',sans-serif;font-size:clamp(30px,5vw,54px);margin:0;text-transform:uppercase;letter-spacing:-2px")}>
              {"Reglas de misión"}
            </h2>

          </div>

          <div style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:20px;margin-top:26px")}>

            <div style={css("background:#7C3AED;color:#fff;border:5px solid #120720;box-shadow:10px 10px 0 #120720;padding:22px")}>

              <div style={css("font-family:'Archivo Black',sans-serif;font-size:26px;text-transform:uppercase")}>
                {"Misión de rescate"}
              </div>

              <ol style={css("margin:12px 0 0;padding-left:22px;font-size:15px;line-height:1.65")}>

                <li>
                  {"La realiza un "}
                  <strong>
                    {"ChapinRescue"}
                  </strong>
                  {". Si hay varios, el usuario elige; si no hay ninguno, la misión no se puede llevar a cabo."}
                </li>

                <li>
                  {"Solo ciudades con "}
                  <strong>
                    {"unidades civiles"}
                  </strong>
                  {" admiten rescate."}
                </li>

                <li>
                  {"Inicia siempre en un "}
                  <strong>
                    {"punto de entrada"}
                  </strong>
                  {"."}
                </li>

                <li>
                  {"Si hay varias unidades civiles, el usuario selecciona a cuál rescatar; con una sola no se solicita elección."}
                </li>

                <li>
                  {"El camino debe ser "}
                  <strong>
                    {"seguro"}
                  </strong>
                  {": evita toda unidad militar."}
                </li>

              </ol>

            </div>

            <div style={css("background:#FF6FD8;border:5px solid #120720;box-shadow:10px 10px 0 #120720;padding:22px")}>

              <div style={css("font-family:'Archivo Black',sans-serif;font-size:26px;text-transform:uppercase")}>
                {"Extracción de recursos"}
              </div>

              <ol style={css("margin:12px 0 0;padding-left:22px;font-size:15px;line-height:1.65")}>

                <li>
                  {"La realiza un "}
                  <strong>
                    {"ChapinFighter"}
                  </strong>
                  {". Si hay varios, el usuario elige "}
                  <strong>
                    {"viendo su capacidad de combate"}
                  </strong>
                  {"."}
                </li>

                <li>
                  {"Solo ciudades con "}
                  <strong>
                    {"recursos"}
                  </strong>
                  {" admiten extracción."}
                </li>

                <li>
                  {"Inicia siempre en un "}
                  <strong>
                    {"punto de entrada"}
                  </strong>
                  {"."}
                </li>

                <li>
                  {"Si hay varios recursos, el usuario selecciona cuál extraer; con uno solo no se solicita elección."}
                </li>

                <li>
                  {"Puede pasar por militares si su capacidad es mayor, "}
                  <strong>
                    {"restando"}
                  </strong>
                  {" la capacidad vencida."}
                </li>

              </ol>

            </div>

          </div>

          <div style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px;margin-top:26px")}>

            <div style={css("background:#120720;color:#EDE4FF;border:5px solid #120720;box-shadow:10px 10px 0 #C6FF3D;padding:20px")}>

              <div style={css("font-family:'Archivo Black',sans-serif;font-size:20px;color:#C6FF3D;text-transform:uppercase")}>
                {"Requisitos del sistema"}
              </div>

              <ul style={css("margin:10px 0 0;padding-left:20px;font-size:14.5px;line-height:1.6")}>

                <li>
                  {"Ser amigable y fácil de utilizar."}
                </li>

                <li>
                  {"Cargar archivos de configuración (y actualizar duplicados)."}
                </li>

                <li>
                  {"Ejecutar misiones mostrando gráficamente el camino y los datos resultantes."}
                </li>

                <li>
                  {"Si no es posible: "}
                  <strong style={css("color:#FF6FD8")}>
                    {"“Misión Imposible”"}
                  </strong>
                  {"."}
                </li>

                <li>
                  {"Usar "}
                  <strong style={css("color:#C6FF3D")}>
                    {"Graphviz"}
                  </strong>
                  {" para la presentación gráfica."}
                </li>

              </ul>

            </div>

            <div style={css("background:#fff;border:5px solid #120720;box-shadow:10px 10px 0 #FF6FD8;padding:20px")}>

              <div style={css("font-family:'Archivo Black',sans-serif;font-size:20px;text-transform:uppercase")}>
                {"TDA obligatorios"}
              </div>

              <p style={css("font-size:14.5px;line-height:1.6;margin:10px 0 0")}>
                {"Estructuras implementadas por usted sobre memoria dinámica: "}
                <strong>
                  {"pilas, colas, listas simples, dobles, circulares o listas de listas"}
                </strong>
                {". La abstracción de los datos queda a su criterio, pero todo el XML debe quedar cargado antes de ejecutar misiones."}
              </p>

              <div style={css("margin-top:14px;background:#120720;color:#FF6FD8;border:3px solid #120720;padding:12px;font-size:13.5px;font-weight:700;animation:blink 1.8s steps(1,end) infinite")}>
                {"NO PERMITIDO: List · LinkedList · Queue · Stack de C# → penalización del 100%"}
              </div>

            </div>

            <div style={css("background:#C6FF3D;border:5px solid #120720;box-shadow:10px 10px 0 #120720;padding:20px")}>

              <div style={css("font-family:'Archivo Black',sans-serif;font-size:20px;text-transform:uppercase")}>
                {"Restricciones"}
              </div>

              <ul style={css("margin:10px 0 0;padding-left:20px;font-size:14.5px;line-height:1.6")}>

                <li>
                  {"Solo los IDEs discutidos en laboratorio."}
                </li>

                <li>
                  <strong>
                    {"POO"}
                  </strong>
                  {" propia obligatoria, o no hay derecho a calificación."}
                </li>

                <li>
                  {"Los archivos de entrada no se modifican."}
                </li>

                <li>
                  {"Se califica desde el último release hasta la entrega."}
                </li>

                <li>
                  {"Copia parcial o total = 0 y reporte a Escuela de Sistemas."}
                </li>

                <li>
                  {"Dudas por los foros de UEDI."}
                </li>

              </ul>

            </div>

          </div>

        </section>
  )
}
