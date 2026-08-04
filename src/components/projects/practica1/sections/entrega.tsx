import { css } from "@/components/dc/css"

/**
 * entrega section for Practica1.
 */
export function Practica1EntregaSection() {
  return (
        <section id="entrega" style={css("max-width:1240px;margin:0 auto;padding:56px 22px")}>

          <div style={css("display:flex;align-items:baseline;gap:14px;flex-wrap:wrap")}>

            <div style={css("font-family:'Archivo Black',sans-serif;font-size:15px;background:#06142E;color:#35E0FF;padding:4px 10px")}>
              {"07"}
            </div>

            <h2 style={css("font-family:'Archivo Black',sans-serif;font-size:clamp(30px,5vw,54px);margin:0;text-transform:uppercase;letter-spacing:-2px")}>
              {"Entrega y reglas"}
            </h2>

          </div>

          <div style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:18px;margin-top:26px")}>

            <div style={css("background:#fff;border:5px solid #06142E;box-shadow:10px 10px 0 #06142E;padding:20px")}>

              <div style={css("font-size:12px;letter-spacing:2px;font-weight:700;color:#1E4FD8")}>
                {"CRONOGRAMA"}
              </div>

              <div style={css("display:flex;flex-direction:column;gap:8px;margin-top:12px;font-size:13.5px")}>

                <div style={css("display:flex;justify-content:space-between;gap:10px;background:#E4EEFF;border:3px solid #06142E;padding:8px 10px")}>
                  <span>
                    {"Asignación / enunciado"}
                  </span>
                  <strong>
                    {"04 AGO 2026"}
                  </strong>
                </div>

                <div style={css("display:flex;justify-content:space-between;gap:10px;background:#35E0FF;border:3px solid #06142E;padding:8px 10px")}>
                  <span>
                    {"Entrega"}
                  </span>
                  <strong>
                    {"14 AGO 11:59 PM"}
                  </strong>
                </div>

                <div style={css("display:flex;justify-content:space-between;gap:10px;background:#E4EEFF;border:3px solid #06142E;padding:8px 10px")}>
                  <span>
                    {"Calificación"}
                  </span>
                  <strong>
                    {"15 AGO 2026"}
                  </strong>
                </div>

              </div>

            </div>

            <div style={css("background:#fff;border:5px solid #06142E;box-shadow:10px 10px 0 #06142E;padding:20px")}>

              <div style={css("font-size:12px;letter-spacing:2px;font-weight:700;color:#1E4FD8")}>
                {"ENTREGABLES"}
              </div>

              <ul style={css("font-size:14px;line-height:1.7;margin:10px 0 0;padding-left:20px")}>

                <li>
                  {"Entrega el viernes 14 de agosto a más tardar a las 11:59 pm."}
                </li>

                <li>
                  {"La entrega será por medio de la plataforma UEDI."}
                </li>

                <li>
                  {"Agregar al auxiliar como colaborador al repositorio: "}
                  <strong>
                    {"jorgemejia25"}
                  </strong>
                  {" (Sección N)."}
                </li>

              </ul>

            </div>

            <div style={css("background:#082A63;color:#E4EEFF;border:5px solid #06142E;box-shadow:10px 10px 0 #06142E;padding:20px")}>

              <div style={css("font-size:12px;letter-spacing:2px;font-weight:700;color:#35E0FF")}>
                {"CONSIDERACIONES"}
              </div>

              <ul style={css("font-size:14px;line-height:1.7;margin:10px 0 0;padding-left:20px")}>

                <li>
                  {"La aplicación será ejecutada en consola."}
                </li>

                <li>
                  {"El lenguaje será C#."}
                </li>

                <li>
                  {"El código debe cumplir con los principios de POO."}
                </li>

                <li>
                  {"Se evalúa el uso de clases, herencia, encapsulamiento y polimorfismo."}
                </li>

                <li>
                  {"Cualquier caso de copia parcial o total tendrá nota de 0 y será reportada."}
                </li>

                <li>
                  {"Las dudas se resuelven en los foros de UEDI."}
                </li>

              </ul>

            </div>

            <div style={css("background:#1E4FD8;color:#fff;border:5px solid #06142E;box-shadow:10px 10px 0 #06142E;padding:20px")}>

              <div style={css("font-size:12px;letter-spacing:2px;font-weight:700;color:#35E0FF")}>
                {"VALORES"}
              </div>

              <ol style={css("font-size:14px;line-height:1.7;margin:10px 0 0;padding-left:20px")}>

                <li>
                  <strong>
                    {"Originalidad del trabajo:"}
                  </strong>
                  {" cada estudiante desarrolla su propio código y documentación."}
                </li>

                <li>
                  <strong>
                    {"Prohibición de copias y plagio:"}
                  </strong>
                  {" copia total o parcial equivale a 0 puntos, incluida la reutilización de proyectos anteriores o código externo sin referencia."}
                </li>

                <li>
                  <strong>
                    {"Uso responsable de recursos externos:"}
                  </strong>
                  {" bibliotecas y ejemplos permitidos si se referencian y se comprenden."}
                </li>

                <li>
                  <strong>
                    {"Revisión y detección de plagio:"}
                  </strong>
                  {" se podrán usar herramientas automatizadas y revisiones manuales; el estudiante deberá justificar su código."}
                </li>

              </ol>

            </div>

            <div style={css("grid-column:1/-1;background:#fff;border:5px solid #06142E;box-shadow:10px 10px 0 #06142E;padding:20px")}>

              <div style={css("font-size:12px;letter-spacing:2px;font-weight:700;color:#1E4FD8")}>
                {"REFERENCIAS"}
              </div>

              <div style={css("display:flex;flex-wrap:wrap;gap:14px;margin-top:10px;font-size:14px")}>

                <a href="https://learn.microsoft.com/dotnet/csharp/" target="_blank">
                  {"C# Guide · Microsoft Learn"}
                </a>

                <a href="https://learn.microsoft.com/dotnet/csharp/fundamentals/object-oriented/" target="_blank">
                  {"Object-Oriented Programming in C#"}
                </a>

              </div>

            </div>

          </div>

        </section>
  )
}
