import { css } from "@/components/dc/css"

type Practica1RutaSectionProps = {
  treeText: string
}

/**
 * ruta section for Practica1.
 */
export function Practica1RutaSection({ treeText }: Practica1RutaSectionProps) {
  return (
        <section id="ruta" style={css("max-width:1240px;margin:0 auto;padding:20px 22px 56px")}>

          <div style={css("display:flex;align-items:baseline;gap:14px;flex-wrap:wrap")}>

            <div style={css("font-family:'Archivo Black',sans-serif;font-size:15px;background:#06142E;color:#35E0FF;padding:4px 10px")}>
              {"05"}
            </div>

            <h2 style={css("font-family:'Archivo Black',sans-serif;font-size:clamp(30px,5vw,54px);margin:0;text-transform:uppercase;letter-spacing:-2px")}>
              {"Ruta de trabajo"}
            </h2>

          </div>

          <p style={css("max-width:840px;font-size:17px;line-height:1.65;margin:18px 0 0;text-wrap:pretty")}>
            {"Seis fases en orden de dependencia. Cada una se prueba en consola antes de pasar a la siguiente, y el orden sigue la hoja de calificación: primero lo que vale puntos de POO, al final la funcionalidad completa."}
          </p>

          <div style={css("display:flex;flex-direction:column;gap:16px;margin-top:28px")}>

            <div style={css("display:flex;gap:18px;flex-wrap:wrap;background:#fff;border:5px solid #06142E;box-shadow:10px 10px 0 #06142E;padding:20px")}>

              <div style={css("flex:0 0 84px;background:#35E0FF;border:4px solid #06142E;display:grid;place-items:center;font-family:'Archivo Black',sans-serif;font-size:34px;min-height:84px")}>
                {"01"}
              </div>

              <div style={css("flex:1 1 320px")}>

                <div style={css("font-family:'Archivo Black',sans-serif;font-size:22px;text-transform:uppercase")}>
                  {"Proyecto y repositorio"}
                </div>

                <p style={css("font-size:14.5px;line-height:1.6;margin:6px 0 0")}>
                  {"Aplicación de consola en C#, repositorio creado y el auxiliar agregado como colaborador desde el primer día. Primer commit con README y .gitignore."}
                </p>

                <div style={css("display:flex;gap:8px;flex-wrap:wrap;margin-top:10px")}>
                  <span style={css("background:#E4EEFF;border:3px solid #06142E;padding:3px 8px;font-size:11.5px;font-weight:700")}>
                    {"SE PRUEBA: COMPILA Y CORRE"}
                  </span>
                </div>

              </div>

            </div>

            <div style={css("display:flex;gap:18px;flex-wrap:wrap;background:#fff;border:5px solid #06142E;box-shadow:10px 10px 0 #06142E;padding:20px")}>

              <div style={css("flex:0 0 84px;background:#1E4FD8;color:#fff;border:4px solid #06142E;display:grid;place-items:center;font-family:'Archivo Black',sans-serif;font-size:34px;min-height:84px")}>
                {"02"}
              </div>

              <div style={css("flex:1 1 320px")}>

                <div style={css("font-family:'Archivo Black',sans-serif;font-size:22px;text-transform:uppercase")}>
                  {"Clase abstracta Mascota"}
                </div>

                <p style={css("font-size:14.5px;line-height:1.6;margin:6px 0 0")}>
                  {"Atributos "}
                  <strong>
                    {"privados"}
                  </strong>
                  {", constructor, getters y setters, y el generador del código único de 8 caracteres alfanuméricos. Aquí se ganan abstracción y encapsulamiento."}
                </p>

                <div style={css("display:flex;gap:8px;flex-wrap:wrap;margin-top:10px")}>
                  <span style={css("background:#E4EEFF;border:3px solid #06142E;padding:3px 8px;font-size:11.5px;font-weight:700")}>
                    {"35 PTS DE LA HOJA"}
                  </span>
                  <span style={css("background:#E4EEFF;border:3px solid #06142E;padding:3px 8px;font-size:11.5px;font-weight:700")}>
                    {"NADA PÚBLICO"}
                  </span>
                </div>

              </div>

            </div>

            <div style={css("display:flex;gap:18px;flex-wrap:wrap;background:#fff;border:5px solid #06142E;box-shadow:10px 10px 0 #06142E;padding:20px")}>

              <div style={css("flex:0 0 84px;background:#1E4FD8;color:#fff;border:4px solid #06142E;display:grid;place-items:center;font-family:'Archivo Black',sans-serif;font-size:34px;min-height:84px")}>
                {"03"}
              </div>

              <div style={css("flex:1 1 320px")}>

                <div style={css("font-family:'Archivo Black',sans-serif;font-size:22px;text-transform:uppercase")}>
                  {"Métodos de la clase base"}
                </div>

                <p style={css("font-size:14.5px;line-height:1.6;margin:6px 0 0")}>
                  {"CalcularDosis con "}
                  <code>
                    {"dosis_por_Kg"}
                  </code>
                  {", CambiarEstado y MostrarInformacion. Declare como "}
                  <code>
                    {"virtual"}
                  </code>
                  {" lo que las especies van a sobrescribir."}
                </p>

                <div style={css("display:flex;gap:8px;flex-wrap:wrap;margin-top:10px")}>
                  <span style={css("background:#E4EEFF;border:3px solid #06142E;padding:3px 8px;font-size:11.5px;font-weight:700")}>
                    {"PROBAR CON UN OBJETO SUELTO"}
                  </span>
                </div>

              </div>

            </div>

            <div style={css("display:flex;gap:18px;flex-wrap:wrap;background:#fff;border:5px solid #06142E;box-shadow:10px 10px 0 #06142E;padding:20px")}>

              <div style={css("flex:0 0 84px;background:#1E4FD8;color:#fff;border:4px solid #06142E;display:grid;place-items:center;font-family:'Archivo Black',sans-serif;font-size:34px;min-height:84px")}>
                {"04"}
              </div>

              <div style={css("flex:1 1 320px")}>

                <div style={css("font-family:'Archivo Black',sans-serif;font-size:22px;text-transform:uppercase")}>
                  {"Las cuatro especies"}
                </div>

                <p style={css("font-size:14.5px;line-height:1.6;margin:6px 0 0")}>
                  {"Perro, Gato, Ave y Tortuga con sus atributos propios y el "}
                  <code>
                    {"override"}
                  </code>
                  {" de la dosis: 100 %, 90 %, 50 % y 80 %. Aquí entran herencia y polimorfismo."}
                </p>

                <div style={css("display:flex;gap:8px;flex-wrap:wrap;margin-top:10px")}>
                  <span style={css("background:#E4EEFF;border:3px solid #06142E;padding:3px 8px;font-size:11.5px;font-weight:700")}>
                    {"30 PTS DE LA HOJA"}
                  </span>
                  <span style={css("background:#E4EEFF;border:3px solid #06142E;padding:3px 8px;font-size:11.5px;font-weight:700")}>
                    {"base.CalcularDosis"}
                  </span>
                </div>

              </div>

            </div>

            <div style={css("display:flex;gap:18px;flex-wrap:wrap;background:#fff;border:5px solid #06142E;box-shadow:10px 10px 0 #06142E;padding:20px")}>

              <div style={css("flex:0 0 84px;background:#082A63;color:#35E0FF;border:4px solid #06142E;display:grid;place-items:center;font-family:'Archivo Black',sans-serif;font-size:34px;min-height:84px")}>
                {"05"}
              </div>

              <div style={css("flex:1 1 320px")}>

                <div style={css("font-family:'Archivo Black',sans-serif;font-size:22px;text-transform:uppercase")}>
                  {"Menú interactivo"}
                </div>

                <p style={css("font-size:14.5px;line-height:1.6;margin:6px 0 0")}>
                  {"Registrar mascota (una opción por especie) y gestionar pacientes: cambiar estado, calcular dosis y consultar información. En bucle hasta que el usuario decida salir."}
                </p>

                <div style={css("display:flex;gap:8px;flex-wrap:wrap;margin-top:10px")}>
                  <span style={css("background:#E4EEFF;border:3px solid #06142E;padding:3px 8px;font-size:11.5px;font-weight:700")}>
                    {"30 PTS DE LA HOJA"}
                  </span>
                  <span style={css("background:#E4EEFF;border:3px solid #06142E;padding:3px 8px;font-size:11.5px;font-weight:700")}>
                    {"BUSCAR POR CÓDIGO"}
                  </span>
                </div>

              </div>

            </div>

            <div style={css("display:flex;gap:18px;flex-wrap:wrap;background:#fff;border:5px solid #06142E;box-shadow:10px 10px 0 #06142E;padding:20px")}>

              <div style={css("flex:0 0 84px;background:#082A63;color:#35E0FF;border:4px solid #06142E;display:grid;place-items:center;font-family:'Archivo Black',sans-serif;font-size:34px;min-height:84px")}>
                {"06"}
              </div>

              <div style={css("flex:1 1 320px")}>

                <div style={css("font-family:'Archivo Black',sans-serif;font-size:22px;text-transform:uppercase")}>
                  {"Pruebas y entrega"}
                </div>

                <p style={css("font-size:14.5px;line-height:1.6;margin:6px 0 0")}>
                  {"Recorra la hoja de calificación fila por fila con el programa corriendo: registre las cuatro especies, cambie estados, calcule dosis y valide entradas inválidas. Suba a UEDI antes del cierre."}
                </p>

                <div style={css("display:flex;gap:8px;flex-wrap:wrap;margin-top:10px")}>
                  <span style={css("background:#35E0FF;border:3px solid #06142E;padding:3px 8px;font-size:11.5px;font-weight:700")}>
                    {"14 AGO · 11:59 PM"}
                  </span>
                  <span style={css("background:#E4EEFF;border:3px solid #06142E;padding:3px 8px;font-size:11.5px;font-weight:700")}>
                    {"PREPARAR LA PREGUNTA · 5 PTS"}
                  </span>
                </div>

              </div>

            </div>

          </div>

          <div style={css("display:flex;flex-wrap:wrap;gap:20px;margin-top:34px;align-items:stretch")}>

            <div style={css("flex:1 1 400px;background:#06142E;color:#E4EEFF;border:5px solid #06142E;box-shadow:12px 12px 0 #1E4FD8;padding:24px")}>

              <div style={css("font-size:12px;letter-spacing:2px;font-weight:700;color:#35E0FF")}>
                {"ESTRUCTURA RECOMENDADA DEL PROYECTO"}
              </div>

              <div style={css("margin-top:14px;font-size:13px;line-height:1.75;white-space:pre;overflow:auto")}>
                {treeText}
              </div>

            </div>

            <div style={css("flex:1 1 280px;display:flex;flex-direction:column;gap:14px")}>

              <div style={css("background:#35E0FF;border:5px solid #06142E;box-shadow:8px 8px 0 #06142E;padding:18px")}>

                <div style={css("font-weight:700;font-size:13px;letter-spacing:1.5px")}>
                  {"UNA CLASE POR ARCHIVO"}
                </div>

                <div style={css("font-size:13.5px;line-height:1.55;margin-top:6px")}>
                  {"El archivo se llama igual que la clase. Cinco archivos en Modelos, no un Program.cs de mil líneas."}
                </div>

              </div>

              <div style={css("background:#fff;border:5px solid #06142E;box-shadow:8px 8px 0 #06142E;padding:18px")}>

                <div style={css("font-weight:700;font-size:13px;letter-spacing:1.5px")}>
                  {"LA CONSOLA NO CALCULA"}
                </div>

                <div style={css("font-size:13.5px;line-height:1.55;margin-top:6px")}>
                  {"Program.cs solo pide datos y muestra resultados. La dosis y el estado viven dentro de las clases: eso es lo que se califica."}
                </div>

              </div>

              <div style={css("background:#1E4FD8;color:#fff;border:5px solid #06142E;box-shadow:8px 8px 0 #06142E;padding:18px")}>

                <div style={css("font-weight:700;font-size:13px;letter-spacing:1.5px;color:#35E0FF")}>
                  {"UN COMMIT POR FASE"}
                </div>

                <div style={css("font-size:13.5px;line-height:1.55;margin-top:6px")}>
                  {"Mensaje que diga qué quedó funcionando. Sirve de respaldo si algo se rompe y demuestra autoría del código."}
                </div>

              </div>

            </div>

          </div>

        </section>
  )
}
