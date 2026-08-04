import { css } from "@/components/dc/css"

/**
 * hero section for Practica1.
 */
export function Practica1HeroSection() {
  return (
        <section style={css("max-width:1240px;margin:0 auto;padding:56px 22px 30px")}>

          <div style={css("display:inline-block;background:#35E0FF;border:4px solid #06142E;box-shadow:7px 7px 0 #06142E;padding:6px 14px;font-size:13px;font-weight:700;letter-spacing:2px")}>
            {"USAC · FIUSAC · ESCUELA DE CIENCIAS Y SISTEMAS"}
          </div>

          <h1 style={css("font-family:'Archivo Black',sans-serif;font-size:clamp(48px,9.4vw,140px);line-height:.86;letter-spacing:-5px;margin:22px 0 0;text-transform:uppercase;color:#06142E;text-shadow:8px 8px 0 #1E4FD8")}>
            {"Veterinaria"}
            <br />
            {"POO en C#"}
          </h1>

          <div style={css("display:flex;flex-wrap:wrap;gap:20px;margin-top:26px;align-items:stretch")}>

            <div style={css("flex:2 1 420px;background:#FFFFFF;border:5px solid #06142E;box-shadow:12px 12px 0 #06142E;padding:24px")}>

              <div style={css("font-family:'Archivo Black',sans-serif;font-size:26px;line-height:1.05;text-transform:uppercase")}>
                {"Sistema de citas"}
                <br />
                {"para una veterinaria"}
              </div>

              <p style={css("font-size:15px;line-height:1.6;margin:14px 0 0;text-wrap:pretty")}>
                {"Una veterinaria necesita una aplicación que permita registrar y gestionar las citas de sus pacientes de manera ordenada. El sistema modela cuatro tipos de mascotas: "}
                <strong>
                  {"perros"}
                </strong>
                {", "}
                <strong>
                  {"gatos"}
                </strong>
                {", "}
                <strong>
                  {"aves"}
                </strong>
                {" y "}
                <strong>
                  {"tortugas"}
                </strong>
                {", cada uno con características y comportamientos específicos, sobre una clase base "}
                <strong>
                  {"Mascota"}
                </strong>
                {" y un menú interactivo en consola."}
              </p>

              <div style={css("display:flex;flex-wrap:wrap;gap:8px;margin-top:18px")}>

                <span style={css("background:#1E4FD8;color:#fff;border:3px solid #06142E;padding:5px 10px;font-size:12px;font-weight:700")}>
                  {"C#"}
                </span>

                <span style={css("background:#35E0FF;border:3px solid #06142E;padding:5px 10px;font-size:12px;font-weight:700")}>
                  {"CONSOLA"}
                </span>

                <span style={css("background:#7FB2FF;border:3px solid #06142E;padding:5px 10px;font-size:12px;font-weight:700")}>
                  {"POO"}
                </span>

                <span style={css("background:#06142E;color:#35E0FF;border:3px solid #06142E;padding:5px 10px;font-size:12px;font-weight:700")}>
                  {"HERENCIA"}
                </span>

                <span style={css("background:#fff;border:3px solid #06142E;padding:5px 10px;font-size:12px;font-weight:700")}>
                  {"POLIMORFISMO"}
                </span>

              </div>

            </div>

            <div style={css("flex:1 1 260px;background:#082A63;color:#E4EEFF;border:5px solid #06142E;box-shadow:12px 12px 0 #06142E;padding:24px;display:flex;flex-direction:column;justify-content:space-between;gap:18px")}>

              <div>

                <div style={css("font-size:12px;letter-spacing:2px;font-weight:700;color:#35E0FF")}>
                  {"ENTREGA"}
                </div>

                <div style={css("font-family:'Archivo Black',sans-serif;font-size:44px;line-height:1;margin-top:6px")}>
                  {"14 AGO"}
                </div>

                <div style={css("font-size:13px;margin-top:4px")}>
                  {"viernes · 11:59 pm · UEDI"}
                </div>

              </div>

              <div style={css("border-top:3px dashed #1E4FD8;padding-top:14px;font-size:13px;line-height:1.6")}>

                <div>
                  <strong style={css("color:#35E0FF")}>
                    {"100"}
                  </strong>
                  {" puntos de ponderación"}
                </div>

                <div style={css("margin-top:6px")}>
                  <strong style={css("color:#35E0FF")}>
                    {"10"}
                  </strong>
                  {" horas aproximadas"}
                </div>

                <div style={css("margin-top:6px")}>
                  {"Auxiliar como colaborador: "}
                  <strong style={css("color:#35E0FF")}>
                    {"jorgemejia25"}
                  </strong>
                </div>

              </div>

            </div>

          </div>

        </section>
  )
}
