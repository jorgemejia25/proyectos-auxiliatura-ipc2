import { css } from "@/components/dc/css"

/**
 * clases section for Practica1.
 */
export function Practica1ClasesSection() {
  return (
        <section id="clases" style={css("background:#06142E;color:#E4EEFF;border-top:5px solid #06142E;border-bottom:5px solid #06142E;padding:56px 0")}>

          <div style={css("max-width:1240px;margin:0 auto;padding:0 22px")}>

            <div style={css("display:flex;align-items:baseline;gap:14px;flex-wrap:wrap")}>

              <div style={css("font-family:'Archivo Black',sans-serif;font-size:15px;background:#35E0FF;color:#06142E;padding:4px 10px")}>
                {"02"}
              </div>

              <h2 style={css("font-family:'Archivo Black',sans-serif;font-size:clamp(30px,5vw,54px);margin:0;text-transform:uppercase;letter-spacing:-2px;color:#fff")}>
                {"Jerarquía de clases"}
              </h2>

            </div>

            <p style={css("font-size:15px;line-height:1.6;margin:16px 0 0;max-width:760px")}>
              {"Cada clase derivada hereda de "}
              <strong style={css("color:#35E0FF")}>
                {"Mascota"}
              </strong>
              {", agrega sus atributos propios y sobrescribe el cálculo de dosis con su factor de ajuste."}
            </p>

            <div style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));gap:18px;margin-top:28px")}>

              <div style={css("background:#1E4FD8;border:4px solid #35E0FF;box-shadow:9px 9px 0 #35E0FF;padding:20px")}>

                <div style={css("display:flex;justify-content:space-between;align-items:baseline")}>
                  <div style={css("font-family:'Archivo Black',sans-serif;font-size:26px;text-transform:uppercase;color:#fff")}>
                    {"Perro"}
                  </div>
                  <div style={css("background:#35E0FF;color:#06142E;font-weight:700;font-size:13px;padding:3px 8px;border:3px solid #06142E")}>
                    {"100 %"}
                  </div>
                </div>

                <div style={css("font-size:13px;margin-top:10px;line-height:1.6;color:#E4EEFF")}>
                  {"Atributos adicionales: "}
                  <strong>
                    {"raza"}
                  </strong>
                  {", "}
                  <strong>
                    {"tamaño"}
                  </strong>
                  {", etc."}
                </div>

                <div style={css("font-size:13px;margin-top:10px;line-height:1.6;color:#E4EEFF")}>
                  {"Dosis estándar: peso × mg/kg, sin ajuste adicional."}
                </div>

                <div style={css("margin-top:14px;background:#06142E;color:#35E0FF;border:3px solid #06142E;padding:8px;font-size:12.5px")}>
                  {"peso * dosisPorKg"}
                </div>

              </div>

              <div style={css("background:#1E4FD8;border:4px solid #35E0FF;box-shadow:9px 9px 0 #35E0FF;padding:20px")}>

                <div style={css("display:flex;justify-content:space-between;align-items:baseline")}>
                  <div style={css("font-family:'Archivo Black',sans-serif;font-size:26px;text-transform:uppercase;color:#fff")}>
                    {"Gato"}
                  </div>
                  <div style={css("background:#35E0FF;color:#06142E;font-weight:700;font-size:13px;padding:3px 8px;border:3px solid #06142E")}>
                    {"90 %"}
                  </div>
                </div>

                <div style={css("font-size:13px;margin-top:10px;line-height:1.6;color:#E4EEFF")}>
                  {"Atributos adicionales: "}
                  <strong>
                    {"raza"}
                  </strong>
                  {", "}
                  <strong>
                    {"esterilizado"}
                  </strong>
                  {", etc."}
                </div>

                <div style={css("font-size:13px;margin-top:10px;line-height:1.6;color:#E4EEFF")}>
                  {"Misma dosis base con factor de ajuste del 90 %."}
                </div>

                <div style={css("margin-top:14px;background:#06142E;color:#35E0FF;border:3px solid #06142E;padding:8px;font-size:12.5px")}>
                  {"peso * dosisPorKg * 0.90"}
                </div>

              </div>

              <div style={css("background:#1E4FD8;border:4px solid #35E0FF;box-shadow:9px 9px 0 #35E0FF;padding:20px")}>

                <div style={css("display:flex;justify-content:space-between;align-items:baseline")}>
                  <div style={css("font-family:'Archivo Black',sans-serif;font-size:26px;text-transform:uppercase;color:#fff")}>
                    {"Ave"}
                  </div>
                  <div style={css("background:#35E0FF;color:#06142E;font-weight:700;font-size:13px;padding:3px 8px;border:3px solid #06142E")}>
                    {"50 %"}
                  </div>
                </div>

                <div style={css("font-size:13px;margin-top:10px;line-height:1.6;color:#E4EEFF")}>
                  {"Atributos adicionales: "}
                  <strong>
                    {"envergadura de alas"}
                  </strong>
                  {", "}
                  <strong>
                    {"puede volar"}
                  </strong>
                  {", etc."}
                </div>

                <div style={css("font-size:13px;margin-top:10px;line-height:1.6;color:#E4EEFF")}>
                  {"Factor del 50 % por sus características fisiológicas."}
                </div>

                <div style={css("margin-top:14px;background:#06142E;color:#35E0FF;border:3px solid #06142E;padding:8px;font-size:12.5px")}>
                  {"peso * dosisPorKg * 0.50"}
                </div>

              </div>

              <div style={css("background:#1E4FD8;border:4px solid #35E0FF;box-shadow:9px 9px 0 #35E0FF;padding:20px")}>

                <div style={css("display:flex;justify-content:space-between;align-items:baseline")}>
                  <div style={css("font-family:'Archivo Black',sans-serif;font-size:26px;text-transform:uppercase;color:#fff")}>
                    {"Tortuga"}
                  </div>
                  <div style={css("background:#35E0FF;color:#06142E;font-weight:700;font-size:13px;padding:3px 8px;border:3px solid #06142E")}>
                    {"80 %"}
                  </div>
                </div>

                <div style={css("font-size:13px;margin-top:10px;line-height:1.6;color:#E4EEFF")}>
                  {"Atributos adicionales: "}
                  <strong>
                    {"tipo de caparazón"}
                  </strong>
                  {", "}
                  <strong>
                    {"es acuática"}
                  </strong>
                  {", etc."}
                </div>

                <div style={css("font-size:13px;margin-top:10px;line-height:1.6;color:#E4EEFF")}>
                  {"Factor del 80 %, dosis ligeramente inferior a la estándar."}
                </div>

                <div style={css("margin-top:14px;background:#06142E;color:#35E0FF;border:3px solid #06142E;padding:8px;font-size:12.5px")}>
                  {"peso * dosisPorKg * 0.80"}
                </div>

              </div>

            </div>

          </div>

        </section>
  )
}
