import { css } from "@/components/dc/css"

/**
 * enunciado section for Practica1.
 */
export function Practica1EnunciadoSection() {
  return (
        <section id="enunciado" style={css("max-width:1240px;margin:0 auto;padding:20px 22px 56px")}>

          <div style={css("display:flex;align-items:baseline;gap:14px;flex-wrap:wrap")}>

            <div style={css("font-family:'Archivo Black',sans-serif;font-size:15px;background:#06142E;color:#35E0FF;padding:4px 10px")}>
              {"01"}
            </div>

            <h2 style={css("font-family:'Archivo Black',sans-serif;font-size:clamp(30px,5vw,54px);margin:0;text-transform:uppercase;letter-spacing:-2px")}>
              {"Enunciado"}
            </h2>

          </div>

          <div style={css("display:flex;flex-wrap:wrap;gap:20px;margin-top:26px")}>

            <div style={css("flex:1 1 420px;background:#fff;border:5px solid #06142E;box-shadow:12px 12px 0 #06142E;padding:24px")}>

              <div style={css("font-size:12px;letter-spacing:2px;font-weight:700;color:#1E4FD8")}>
                {"CLASE BASE · MASCOTA"}
              </div>

              <p style={css("font-size:15px;line-height:1.6;margin:10px 0 0")}>
                {"El sistema debe contar con una clase base llamada "}
                <strong>
                  {"Mascota"}
                </strong>
                {", que representará un paciente genérico de la veterinaria, con los atributos comunes:"}
              </p>

              <div style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:8px;margin-top:14px")}>

                <div style={css("background:#E4EEFF;border:3px solid #06142E;padding:8px 10px;font-size:13px;font-weight:700")}>
                  {"Nombre"}
                </div>

                <div style={css("background:#E4EEFF;border:3px solid #06142E;padding:8px 10px;font-size:13px;font-weight:700")}>
                  {"Peso (kg)"}
                </div>

                <div style={css("background:#E4EEFF;border:3px solid #06142E;padding:8px 10px;font-size:13px;font-weight:700")}>
                  {"Sexo"}
                </div>

                <div style={css("background:#E4EEFF;border:3px solid #06142E;padding:8px 10px;font-size:13px;font-weight:700")}>
                  {"Edad"}
                </div>

                <div style={css("background:#E4EEFF;border:3px solid #06142E;padding:8px 10px;font-size:13px;font-weight:700")}>
                  {"Propietario"}
                </div>

                <div style={css("background:#E4EEFF;border:3px solid #06142E;padding:8px 10px;font-size:13px;font-weight:700")}>
                  {"Código (8 alfanum.)"}
                </div>

                <div style={css("background:#E4EEFF;border:3px solid #06142E;padding:8px 10px;font-size:13px;font-weight:700")}>
                  {"Estado: enfermo / sano"}
                </div>

              </div>

              <p style={css("font-size:15px;line-height:1.6;margin:16px 0 0")}>
                {"También debe incluir métodos para:"}
              </p>

              <div style={css("display:flex;flex-direction:column;gap:8px;margin-top:10px")}>

                <div style={css("background:#35E0FF;border:3px solid #06142E;padding:10px;font-size:13.5px")}>
                  <strong>
                    {"Calcular dosis de medicamento"}
                  </strong>
                  {" — recibe "}
                  <code>
                    {"dosis_por_Kg"}
                  </code>
                  {" (double), los miligramos que deben administrarse por cada kilogramo de peso (mg/kg)."}
                </div>

                <div style={css("background:#35E0FF;border:3px solid #06142E;padding:10px;font-size:13.5px")}>
                  <strong>
                    {"Cambiar estado del paciente"}
                  </strong>
                </div>

                <div style={css("background:#35E0FF;border:3px solid #06142E;padding:10px;font-size:13.5px")}>
                  <strong>
                    {"Mostrar su información general"}
                  </strong>
                </div>

              </div>

            </div>

            <div style={css("flex:1 1 300px;background:#082A63;color:#E4EEFF;border:5px solid #06142E;box-shadow:12px 12px 0 #06142E;padding:24px")}>

              <div style={css("font-size:12px;letter-spacing:2px;font-weight:700;color:#35E0FF")}>
                {"MENÚ INTERACTIVO EN CONSOLA"}
              </div>

              <p style={css("font-size:15px;line-height:1.6;margin:10px 0 0")}>
                {"Para que el sistema sea operable, debe implementarse un menú que permita al usuario:"}
              </p>

              <ul style={css("font-size:14.5px;line-height:1.65;margin:12px 0 0;padding-left:20px")}>

                <li>
                  {"Registrar nuevas mascotas en la veterinaria."}
                </li>

                <li>
                  {"Gestionar los pacientes ya registrados: cambiar estado del paciente, calcular la dosis del medicamento, devolver o consultar información de cada uno."}
                </li>

              </ul>

              <p style={css("font-size:14.5px;line-height:1.6;margin:14px 0 0;border-top:3px dashed #1E4FD8;padding-top:14px")}>
                {"El programa debe estar diseñado de manera que se mantenga en ejecución hasta que el usuario decida salir."}
              </p>

            </div>

          </div>

        </section>
  )
}
