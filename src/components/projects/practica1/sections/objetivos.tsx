import { css } from "@/components/dc/css"

/**
 * objetivos section for Practica1.
 */
export function Practica1ObjetivosSection() {
  return (
        <section id="objetivos" style={css("max-width:1240px;margin:0 auto;padding:56px 22px")}>

          <div style={css("display:flex;align-items:baseline;gap:14px;flex-wrap:wrap")}>

            <div style={css("font-family:'Archivo Black',sans-serif;font-size:15px;background:#06142E;color:#35E0FF;padding:4px 10px")}>
              {"00"}
            </div>

            <h2 style={css("font-family:'Archivo Black',sans-serif;font-size:clamp(30px,5vw,54px);margin:0;text-transform:uppercase;letter-spacing:-2px")}>
              {"Objetivos"}
            </h2>

          </div>

          <div style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px;margin-top:26px")}>

            <div style={css("grid-column:1/-1;background:#1E4FD8;color:#fff;border:5px solid #06142E;box-shadow:10px 10px 0 #06142E;padding:22px")}>

              <div style={css("font-size:12px;letter-spacing:2px;font-weight:700;color:#35E0FF")}>
                {"OBJETIVO GENERAL"}
              </div>

              <p style={css("margin:8px 0 0;font-size:19px;line-height:1.45;font-weight:500;text-wrap:pretty")}>
                {"Aplicar los conceptos de Programación Orientada a Objetos en C# desarrollando un sistema que gestione la administración del sistema de citas de una veterinaria, diferenciando entre especies de mascotas."}
              </p>

            </div>

            <div style={css("background:#fff;border:4px solid #06142E;box-shadow:8px 8px 0 #06142E;padding:18px")}>
              <div style={css("font-family:'Archivo Black',sans-serif;font-size:28px;color:#1E4FD8")}>
                {"01"}
              </div>
              <div style={css("font-size:14px;line-height:1.55;margin-top:6px")}>
                {"Comprender la "}
                <strong>
                  {"abstracción"}
                </strong>
                {" al modelar un sistema de veterinaria real."}
              </div>
            </div>

            <div style={css("background:#fff;border:4px solid #06142E;box-shadow:8px 8px 0 #06142E;padding:18px")}>
              <div style={css("font-family:'Archivo Black',sans-serif;font-size:28px;color:#1E4FD8")}>
                {"02"}
              </div>
              <div style={css("font-size:14px;line-height:1.55;margin-top:6px")}>
                {"Utilizar "}
                <strong>
                  {"herencia"}
                </strong>
                {" para definir diferentes tipos de animales."}
              </div>
            </div>

            <div style={css("background:#fff;border:4px solid #06142E;box-shadow:8px 8px 0 #06142E;padding:18px")}>
              <div style={css("font-family:'Archivo Black',sans-serif;font-size:28px;color:#1E4FD8")}>
                {"03"}
              </div>
              <div style={css("font-size:14px;line-height:1.55;margin-top:6px")}>
                {"Implementar una clase base que permita "}
                <strong>
                  {"encapsular"}
                </strong>
                {" la información de los animales."}
              </div>
            </div>

            <div style={css("background:#fff;border:4px solid #06142E;box-shadow:8px 8px 0 #06142E;padding:18px")}>
              <div style={css("font-family:'Archivo Black',sans-serif;font-size:28px;color:#1E4FD8")}>
                {"04"}
              </div>
              <div style={css("font-size:14px;line-height:1.55;margin-top:6px")}>
                {"Aplicar "}
                <strong>
                  {"polimorfismo"}
                </strong>
                {" para personalizar el comportamiento según el tipo de animal."}
              </div>
            </div>

          </div>

        </section>
  )
}
