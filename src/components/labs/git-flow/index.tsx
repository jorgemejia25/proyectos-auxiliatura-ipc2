// @ts-nocheck
"use client"

import { Fragment } from "react"

import { useDcLogic } from "@/components/dc/use-dc-logic"
import { css } from "@/components/dc/css"
import { GitFlowLogic } from "@/components/labs/git-flow/logic"

const ARTIFACT_CSS = `
.dc-artifact--git-flow,.dc-artifact--git-flow *{ box-sizing: border-box; }
.dc-artifact--git-flow{
  margin: 0;
  color: #12161F;
  background-color: #DDE5F0;
  background-image:
    linear-gradient(rgba(18,22,31,0.06) 1px, transparent 1px),
    linear-gradient(90deg, rgba(18,22,31,0.06) 1px, transparent 1px),
    radial-gradient(ellipse 80% 50% at 0% 0%, rgba(225,29,72,0.14), transparent 55%),
    radial-gradient(ellipse 60% 40% at 100% 0%, rgba(255,183,3,0.18), transparent 50%),
    linear-gradient(180deg, #D5DEEC 0%, #E8EEF7 42%, #DDE5F0 100%);
  background-size: 28px 28px, 28px 28px, auto, auto, auto;
  background-attachment: fixed;
}
.dc-artifact--git-flow a{ color: #12161F; text-decoration: underline 3px #E11D48; }
.dc-artifact--git-flow a:hover{ background: #FFB703; color: #12161F; }
.dc-artifact--git-flow button:hover{ filter: brightness(0.97); }
.dc-artifact--git-flow ::selection{ background: #FFB703; color: #12161F; }
.dc-artifact--git-flow textarea:focus,
.dc-artifact--git-flow input:focus{ outline: 4px solid #E11D48; }
.dc-artifact--git-flow > *{ position: relative; z-index: 1; }
`

/**
 * Native React rendering of the GitFlow laboratorio artifact.
 */
export function GitFlowView() {
  const v = useDcLogic(GitFlowLogic, {
    showAscii: true,
  })

  return (
    <div className="dc-artifact dc-artifact--git-flow">
      <style>{`${ARTIFACT_CSS}
.dc-artifact--git-flow { min-height: 100%; font-family: var(--font-lab-mono), ui-monospace, monospace; }
.dc-artifact--git-flow h1, .dc-artifact--git-flow h2, .dc-artifact--git-flow .lab-display {
  font-family: var(--font-display), sans-serif;
}
@keyframes fadeUp { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: none; } }
@keyframes slideInLeft { from { opacity: 0; transform: translateX(-40px); } to { opacity: 1; transform: none; } }
@keyframes popIn { 0% { opacity: 0; transform: scale(0.2); } 60% { transform: scale(1.25); } 100% { opacity: 1; transform: scale(1); } }
@keyframes draw { to { stroke-dashoffset: 0; } }
@keyframes growX { from { transform: scaleX(0); } to { transform: scaleX(1); } }
@keyframes travel { 0% { transform: translateX(0); } 100% { transform: translateX(var(--dist, 180px)); } }
@keyframes blink { 0%, 55% { opacity: 1; } 56%, 100% { opacity: 0.15; } }
@keyframes nudge { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(8px); } }
@keyframes shake { 0%, 100% { transform: rotate(-1.5deg); } 50% { transform: rotate(1.5deg); } }
`}</style>
      <div style={css("font-family: 'JetBrains Mono', ui-monospace, monospace; color: #12161F; background: transparent; padding: 0 0 120px 0; overflow-x: hidden;")}>

        <div style={css("display: flex; gap: 0; align-items: stretch; border-bottom: 6px solid #12161F; background: #12161F; color: #E8EEF7; font-weight: 800; font-size: 15px; letter-spacing: 0.18em; text-transform: uppercase;")}>

          <div style={css("padding: 12px 20px; border-right: 6px solid #E8EEF7;")}>
            {"MANUAL DE RAMAS"}
          </div>

          <div style={css("padding: 12px 20px; border-right: 6px solid #E8EEF7; background: #E11D48; color: #FFFFFF;")}>
            {"GIT FLOW"}
          </div>

          <div style={css("padding: 12px 20px; flex: 1;")}>
            {"VINCENT DRIESSEN · 2010 → HOY"}
          </div>

        </div>

        <header style={css("padding: 72px 40px 56px 40px; border-bottom: 6px solid #12161F;")}>

          <h1 style={css("font-family: 'Archivo Black', sans-serif; font-size: clamp(56px, 12vw, 190px); line-height: 0.84; margin: 0; letter-spacing: -0.04em; text-transform: uppercase; animation: fadeUp 0.7s cubic-bezier(0.2,0.8,0.2,1) both;")}>
            {"GIT"}
            <br />
            {"FLOW"}
            <span style={css("color: #FF3B30;")}>
              {"."}
            </span>
          </h1>

          <div style={css("display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 24px; margin-top: 48px; animation: fadeUp 0.7s cubic-bezier(0.2,0.8,0.2,1) both 0.25s;")}>

            <p style={css("margin: 0; font-size: 20px; line-height: 1.5; font-weight: 700; max-width: 46ch;")}>
              {"Modelo de ramificación con roles fijos. Cada rama tiene un responsable, un tiempo de vida y un propósito único. Las integraciones quedan explícitas y controladas."}
            </p>

            <div style={css("border: 6px solid #12161F; background: #FFF; padding: 20px; box-shadow: 10px 10px 0 #12161F;")}>

              <div style={css("font-size: 13px; font-weight: 800; letter-spacing: 0.14em; border-bottom: 4px solid #12161F; padding-bottom: 8px; margin-bottom: 12px;")}>
                {"APLICABLE CUANDO"}
              </div>

              <ul style={css("margin: 0; padding-left: 20px; font-size: 16px; line-height: 1.7;")}>

                <li>
                  {"Software con versiones (v1.2.3)"}
                </li>

                <li>
                  {"Releases planificadas, QA formal"}
                </li>

                <li>
                  {"Equipos medianos/grandes"}
                </li>

              </ul>

            </div>

            <div style={css("border: 6px solid #12161F; background: #FF3B30; color: #FFF; padding: 20px; box-shadow: 10px 10px 0 #12161F;")}>

              <div style={css("font-size: 13px; font-weight: 800; letter-spacing: 0.14em; border-bottom: 4px solid #FFF; padding-bottom: 8px; margin-bottom: 12px;")}>
                {"NO APLICABLE CUANDO"}
              </div>

              <ul style={css("margin: 0; padding-left: 20px; font-size: 16px; line-height: 1.7;")}>

                <li>
                  {"Deploy continuo 20 veces al día"}
                </li>

                <li>
                  {"SaaS de una sola versión viva"}
                </li>

                <li>
                  {"Equipos de 1–3 personas"}
                </li>

              </ul>

            </div>

          </div>

        </header>

        <section style={css("border-bottom: 6px solid #12161F; background: #12161F; color: #E8EEF7; padding: 40px;")}>

          <div style={css("display: flex; align-items: baseline; justify-content: space-between; gap: 20px; flex-wrap: wrap; margin-bottom: 24px;")}>

            <h2 style={css("font-family: 'Archivo Black', sans-serif; font-size: clamp(32px, 5vw, 64px); margin: 0; text-transform: uppercase; letter-spacing: -0.02em;")}>
              {"00 · CONTROL DE VERSIONES Y GIT"}
            </h2>

            <div style={css("font-size: 14px; font-weight: 800; letter-spacing: 0.14em; border: 4px solid #FFB703; color: #FFB703; padding: 8px 12px;")}>
              {"AUTOAVANCE"}
            </div>

          </div>

          <div style={css("border: 6px solid #12161F; background: #F4F7FC; color: #12161F; box-shadow: 14px 14px 0 #E11D48;")}>

            <div style={css("display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 0.9fr); min-height: 460px; border-bottom: 6px solid #12161F;")}>

              <div style={css("padding: 30px; border-right: 6px solid #12161F; display: grid; align-content: start; gap: 18px; min-width: 0; overflow: hidden;")}>

                {!!(v.isS1) ? (
                  <>

                    <div key="s1" style={css("display: grid; gap: 16px; animation: slideInLeft 0.5s ease both;")}>

                      <div style={css("font-size: 13px; font-weight: 800; letter-spacing: 0.2em;")}>
                        {"PANTALLA 01 / 06"}
                      </div>

                      <h3 style={css("font-family: 'Archivo Black', sans-serif; font-size: clamp(26px, 3.6vw, 46px); margin: 0; line-height: 0.95; text-transform: uppercase;")}>
                        {"CONTROL DE"}
                        <br />
                        {"VERSIONES"}
                      </h3>

                      <p style={css("margin: 0; font-size: 17px; line-height: 1.55; font-weight: 700; max-width: 46ch;")}>
                        {"Es llevar un historial de cada cambio en un proyecto: quién lo hizo, cuándo y por qué, con la posibilidad de volver a cualquier punto anterior. Antes se gestionaba con copias de carpetas; hoy se gestiona con Git."}
                      </p>

                      <pre style={css("margin: 0; background: #12161F; color: #E8EEF7; border: 5px solid #12161F; padding: 12px 14px; font-size: 13.5px; line-height: 1.7; font-family: 'JetBrains Mono', monospace;")}>
                        {"# iniciar el historial de un proyecto real\ncd tienda-api\ngit init\ngit add .\ngit commit -m \"chore: proyecto inicial de tienda-api\""}
                      </pre>

                      <div style={css("border: 5px solid #12161F; background: #FFB703; padding: 12px 14px; font-size: 14px; font-weight: 700;")}>
                        <strong style={css("letter-spacing:0.12em;")}>
                          {"SIN CONTROL DE VERSIONES ·"}
                        </strong>
                        {" antes de Git se duplicaban carpetas como "}
                        <code>
                          {"api_final_v2_bueno"}
                        </code>
                        {". Con Git, esa carpeta es un solo repositorio con historia completa."}
                      </div>

                    </div>

                  </>
                ) : null}

                {!!(v.isS2) ? (
                  <>

                    <div key="s2" style={css("display: grid; gap: 16px; animation: slideInLeft 0.5s ease both;")}>

                      <div style={css("font-size: 13px; font-weight: 800; letter-spacing: 0.2em;")}>
                        {"PANTALLA 02 / 06"}
                      </div>

                      <h3 style={css("font-family: 'Archivo Black', sans-serif; font-size: clamp(26px, 3.6vw, 46px); margin: 0; line-height: 0.95; text-transform: uppercase;")}>
                        {"EL COMMIT"}
                        <br />
                        {"ES UNA FOTO"}
                      </h3>

                      <p style={css("margin: 0; font-size: 17px; line-height: 1.55; font-weight: 700; max-width: 46ch;")}>
                        {"Un commit no guarda “los cambios”: guarda el estado completo del proyecto, más un puntero a su padre. Su nombre es un hash de 40 caracteres y no se puede alterar."}
                      </p>

                      <pre style={css("margin: 0; background: #12161F; color: #E8EEF7; border: 5px solid #12161F; padding: 12px 14px; font-size: 13.5px; line-height: 1.7; font-family: 'JetBrains Mono', monospace;")}>
                        {"# en tienda-api: agregar la ruta de productos\ngit add src/routes/products.js\ngit commit -m \"feat(productos): endpoint GET /products\"\ngit log --oneline -3\n# e04a1c2 feat(productos): endpoint GET /products\n# 9c28f30 feat(auth): login con JWT\n# a1f00d1 chore: proyecto inicial de tienda-api"}
                      </pre>

                      <div style={css("border: 5px solid #12161F; background: #FFB703; padding: 12px 14px; font-size: 14px; font-weight: 700;")}>
                        <strong style={css("letter-spacing:0.12em;")}>
                          {"NOTA ·"}
                        </strong>
                        {" Linus Torvalds escribió Git en 10 días de 2005, tras perder el equipo del kernel el acceso a BitKeeper."}
                      </div>

                    </div>

                  </>
                ) : null}

                {!!(v.isS3) ? (
                  <>

                    <div key="s3" style={css("display: grid; gap: 16px; animation: slideInLeft 0.5s ease both;")}>

                      <div style={css("font-size: 13px; font-weight: 800; letter-spacing: 0.2em;")}>
                        {"PANTALLA 03 / 06"}
                      </div>

                      <h3 style={css("font-family: 'Archivo Black', sans-serif; font-size: clamp(26px, 3.6vw, 46px); margin: 0; line-height: 0.95; text-transform: uppercase;")}>
                        {"UNA RAMA ES"}
                        <br />
                        {"UNA REFERENCIA"}
                      </h3>

                      <p style={css("margin: 0; font-size: 17px; line-height: 1.55; font-weight: 700; max-width: 46ch;")}>
                        {"No es una copia del código: es un archivo diminuto con el hash del último commit. Al crear un commit, la referencia se actualiza al nuevo identificador. "}
                        <code>
                          {"HEAD"}
                        </code>
                        {" indica la referencia activa (el commit actual)."}
                      </p>

                      <pre style={css("margin: 0; background: #12161F; color: #E8EEF7; border: 5px solid #12161F; padding: 12px 14px; font-size: 13.5px; line-height: 1.7; font-family: 'JetBrains Mono', monospace;")}>
                        {"# en tienda-api: aislar el trabajo de inventario\ngit branch                 # * main\ngit switch -c feature/inventario\ngit commit -am \"feat(inventario): descuenta stock al vender\"\ngit switch main            # main sigue intacta"}
                      </pre>

                      <div style={css("border: 5px solid #12161F; background: #FFB703; padding: 12px 14px; font-size: 14px; font-weight: 700;")}>
                        <strong style={css("letter-spacing:0.12em;")}>
                          {"NOTA ·"}
                        </strong>
                        {" Crear una rama pesa 41 bytes y es instantáneo. Por eso Git favorece el uso frecuente de ramas."}
                      </div>

                    </div>

                  </>
                ) : null}

                {!!(v.isS4) ? (
                  <>

                    <div key="s4" style={css("display: grid; gap: 16px; animation: slideInLeft 0.5s ease both;")}>

                      <div style={css("font-size: 13px; font-weight: 800; letter-spacing: 0.2em;")}>
                        {"PANTALLA 04 / 06"}
                      </div>

                      <h3 style={css("font-family: 'Archivo Black', sans-serif; font-size: clamp(26px, 3.6vw, 46px); margin: 0; line-height: 0.95; text-transform: uppercase;")}>
                        {"MERGE"}
                        <br />
                        {"VS REBASE"}
                      </h3>

                      <p style={css("margin: 0; font-size: 17px; line-height: 1.55; font-weight: 700; max-width: 46ch;")}>
                        <strong>
                          {"Merge"}
                        </strong>
                        {" une dos historias y deja constancia con un commit extra. "}
                        <strong>
                          {"Rebase"}
                        </strong>
                        {" reescribe los commits propios encima de otra rama: historia limpia, pero hashes nuevos."}
                      </p>

                      <pre style={css("margin: 0; background: #12161F; color: #E8EEF7; border: 5px solid #12161F; padding: 12px 14px; font-size: 13.5px; line-height: 1.7; font-family: 'JetBrains Mono', monospace;")}>
                        {"# cerrar feature/inventario ya lista\ngit switch main\ngit merge --no-ff feature/inventario\n# o, mientras trabaja, mantener su rama actualizada:\ngit switch feature/inventario\ngit rebase main"}
                      </pre>

                      <div style={css("border: 5px solid #12161F; background: #FFB703; padding: 12px 14px; font-size: 14px; font-weight: 700;")}>
                        <strong style={css("letter-spacing:0.12em;")}>
                          {"REGLA DE ORO ·"}
                        </strong>
                        {" Utilice rebase únicamente en ramas personales. No reescriba historial que otras personas ya hayan descargado."}
                      </div>

                    </div>

                  </>
                ) : null}

                {!!(v.isS5) ? (
                  <>

                    <div key="s5" style={css("display: grid; gap: 16px; animation: slideInLeft 0.5s ease both;")}>

                      <div style={css("font-size: 13px; font-weight: 800; letter-spacing: 0.2em;")}>
                        {"PANTALLA 05 / 06"}
                      </div>

                      <h3 style={css("font-family: 'Archivo Black', sans-serif; font-size: clamp(26px, 3.6vw, 46px); margin: 0; line-height: 0.95; text-transform: uppercase;")}>
                        {"EL TAG"}
                        <br />
                        {"ES LA FIRMA"}
                      </h3>

                      <p style={css("margin: 0; font-size: 17px; line-height: 1.55; font-weight: 700; max-width: 46ch;")}>
                        {"Las ramas se mueven; los tags no. Un tag "}
                        <code>
                          {"v1.1.0"}
                        </code>
                        {" apunta para siempre al commit exacto que salió a producción. Permite recuperar con certeza el estado publicado."}
                      </p>

                      <pre style={css("margin: 0; background: #12161F; color: #E8EEF7; border: 5px solid #12161F; padding: 12px 14px; font-size: 13.5px; line-height: 1.7; font-family: 'JetBrains Mono', monospace;")}>
                        {"# marcar la versión que sale a producción\ngit tag -a v1.1.0 -m \"Release 1.1.0: inventario\"\ngit push origin v1.1.0\ngit checkout v1.1.0        # ver el proyecto exacto de esa release"}
                      </pre>

                      <div style={css("border: 5px solid #12161F; background: #FFB703; padding: 12px 14px; font-size: 14px; font-weight: 700;")}>
                        <strong style={css("letter-spacing:0.12em;")}>
                          {"NOTA ·"}
                        </strong>
                        {" El hash sale de SHA-1 (Git ya soporta SHA-256): cambia una coma y el identificador cambia por completo."}
                      </div>

                    </div>

                  </>
                ) : null}

                {!!(v.isS6) ? (
                  <>

                    <div key="s6" style={css("display: grid; gap: 16px; animation: slideInLeft 0.5s ease both;")}>

                      <div style={css("font-size: 13px; font-weight: 800; letter-spacing: 0.2em;")}>
                        {"PANTALLA 06 / 06"}
                      </div>

                      <h3 style={css("font-family: 'Archivo Black', sans-serif; font-size: clamp(26px, 3.6vw, 46px); margin: 0; line-height: 0.95; text-transform: uppercase;")}>
                        {"TODO ES"}
                        <br />
                        {"UN GRAFO"}
                      </h3>

                      <p style={css("margin: 0; font-size: 17px; line-height: 1.55; font-weight: 700; max-width: 46ch;")}>
                        {"Los commits forman un grafo dirigido acíclico: cada uno referencia a su padre y nunca al futuro. Git Flow es un convenio de equipo sobre cómo organizar ese grafo."}
                      </p>

                      <pre style={css("margin: 0; background: #12161F; color: #E8EEF7; border: 5px solid #12161F; padding: 12px 14px; font-size: 13.5px; line-height: 1.7; font-family: 'JetBrains Mono', monospace;")}>
                        {"git log --graph --oneline --all --decorate"}
                      </pre>

                      <div style={css("border: 5px solid #12161F; background: #FFB703; padding: 12px 14px; font-size: 14px; font-weight: 700;")}>
                        <strong style={css("letter-spacing:0.12em;")}>
                          {"NOTA ·"}
                        </strong>
                        {" Casi ninguna operación es irreversible de inmediato: "}
                        <code>
                          {"git reflog"}
                        </code>
                        {" registra los movimientos recientes ~90 días. Funciona como historial de recuperación de operaciones recientes."}
                      </div>

                    </div>

                  </>
                ) : null}

              </div>

              <div style={css("padding: 30px; display: grid; place-items: center; background: #FFF; overflow: hidden; min-width: 0;")}>

                {!!(v.isS1) ? (
                  <>

                    <div style={css("display: grid; gap: 20px; justify-items: start; width: 100%; max-width: 320px;")}>

                      <div style={css("display: flex; flex-wrap: wrap; align-items: center; gap: 8px; row-gap: 12px;")}>

                        <div style={css("border: 4px solid #12161F; background: #FFF; padding: 8px 10px; font-size: 12px; font-weight: 800; animation: popIn 0.5s ease both;")}>
                          {"index.js v1"}
                        </div>

                        <div style={css("width: 16px; height: 6px; background: #12161F; flex-shrink: 0;")} />

                        <div style={css("border: 4px solid #12161F; background: #FFF; padding: 8px 10px; font-size: 12px; font-weight: 800; animation: popIn 0.5s ease both 0.25s;")}>
                          {"index.js v2"}
                        </div>

                        <div style={css("width: 16px; height: 6px; background: #12161F; flex-shrink: 0;")} />

                        <div style={css("border: 4px solid #FFB703; background: #FFB703; padding: 8px 10px; font-size: 12px; font-weight: 800; animation: popIn 0.5s ease both 0.5s;")}>
                          {"index.js v3"}
                        </div>

                      </div>

                      <div style={css("font-size: 13px; font-weight: 700; text-decoration: line-through; opacity: 0.5; margin-top: 4px;")}>
                        {"index_final_v2_bueno.js"}
                      </div>

                      <div style={css("border: 5px solid #12161F; padding: 12px 16px; font-size: 13px; font-weight: 800; animation: popIn 0.5s ease both 0.8s;")}>
                        {"Git = un historial, no una carpeta con copias"}
                      </div>

                    </div>

                  </>
                ) : null}

                {!!(v.isS2) ? (
                  <>

                    <div style={css("display: flex; align-items: center; gap: 0;")}>

                      <div style={css("width: 66px; height: 66px; border: 6px solid #12161F; background: #FFF; display: grid; place-items: center; font-size: 12px; font-weight: 800; animation: popIn 0.5s ease both;")}>
                        {"a1f"}
                      </div>

                      <div style={css("width: 34px; height: 8px; background: #12161F; transform-origin: left; animation: growX 0.3s ease both 0.3s;")} />

                      <div style={css("width: 66px; height: 66px; border: 6px solid #12161F; background: #FFF; display: grid; place-items: center; font-size: 12px; font-weight: 800; animation: popIn 0.5s ease both 0.5s;")}>
                        {"9c2"}
                      </div>

                      <div style={css("width: 34px; height: 8px; background: #12161F; transform-origin: left; animation: growX 0.3s ease both 0.8s;")} />

                      <div style={css("width: 66px; height: 66px; border: 6px solid #12161F; background: #FFB703; display: grid; place-items: center; font-size: 12px; font-weight: 800; animation: popIn 0.5s ease both 1s;")}>
                        {"e04"}
                      </div>

                      <div style={css("width: 34px; height: 8px; background: #12161F; transform-origin: left; animation: growX 0.3s ease both 1.3s;")} />

                      <div style={css("width: 66px; height: 66px; border: 6px solid #FF3B30; background: #FF3B30; color: #FFF; display: grid; place-items: center; font-size: 12px; font-weight: 800; animation: popIn 0.5s ease both 1.5s;")}>
                        {"7b5"}
                      </div>

                    </div>

                  </>
                ) : null}

                {!!(v.isS3) ? (
                  <>

                    <div style={css("display: grid; gap: 26px; justify-items: start;")}>

                      <div style={css("display: flex; align-items: center; gap: 12px;")}>

                        <div style={css("width: 54px; height: 54px; border-radius: 50%; border: 6px solid #12161F; background: #FFF;")} />

                        <div style={css("width: 40px; height: 8px; background: #12161F;")} />

                        <div style={css("width: 54px; height: 54px; border-radius: 50%; border: 6px solid #12161F; background: #FFF;")} />

                        <div style={css("width: 40px; height: 8px; background: #12161F;")} />

                        <div style={css("width: 54px; height: 54px; border-radius: 50%; border: 6px solid #12161F; background: #FFF;")} />

                      </div>

                      <div style={css("--dist: 212px; border: 5px solid #12161F; background: #00A64F; color: #FFF; padding: 8px 12px; font-size: 15px; font-weight: 800; animation: travel 1.2s ease both;")}>
                        {"develop →"}
                      </div>

                      <div style={css("border: 5px dashed #12161F; padding: 8px 12px; font-size: 14px; font-weight: 700;")}>
                        {"HEAD sigue a la referencia activa"}
                      </div>

                    </div>

                  </>
                ) : null}

                {!!(v.isS4) ? (
                  <>

                    <div style={css("display: grid; gap: 28px; width: 100%; max-width: 340px;")}>

                      <div style={css("border: 5px solid #12161F; padding: 14px;")}>

                        <div style={css("font-size: 13px; font-weight: 800; letter-spacing: 0.14em; margin-bottom: 10px;")}>
                          {"MERGE"}
                        </div>

                        <div style={css("display: flex; align-items: center; gap: 8px;")}>

                          <div style={css("width: 26px; height: 26px; background: #12161F;")} />

                          <div style={css("width: 26px; height: 26px; background: #0047FF;")} />

                          <div style={css("width: 26px; height: 26px; background: #0047FF;")} />

                          <div style={css("width: 38px; height: 8px; background: #12161F; transform-origin: left; animation: growX 0.5s ease both;")} />

                          <div style={css("width: 34px; height: 34px; background: #FFB703; border: 5px solid #12161F; animation: popIn 0.5s ease both 0.4s;")} />

                        </div>

                      </div>

                      <div style={css("border: 5px solid #12161F; padding: 14px;")}>

                        <div style={css("font-size: 13px; font-weight: 800; letter-spacing: 0.14em; margin-bottom: 10px;")}>
                          {"REBASE"}
                        </div>

                        <div style={css("display: flex; align-items: center; gap: 8px;")}>

                          <div style={css("width: 26px; height: 26px; background: #12161F;")} />

                          <div style={css("width: 26px; height: 26px; background: #12161F;")} />

                          <div style={css("--dist: 20px; width: 26px; height: 26px; background: #0047FF; animation: travel 0.8s ease both 0.3s;")} />

                          <div style={css("--dist: 20px; width: 26px; height: 26px; background: #0047FF; animation: travel 0.8s ease both 0.5s;")} />

                        </div>

                      </div>

                    </div>

                  </>
                ) : null}

                {!!(v.isS5) ? (
                  <>

                    <div style={css("display: grid; gap: 18px; justify-items: center;")}>

                      <div style={css("display: flex; align-items: center; gap: 10px;")}>

                        <div style={css("width: 44px; height: 44px; border: 6px solid #12161F;")} />

                        <div style={css("width: 30px; height: 8px; background: #12161F;")} />

                        <div style={css("width: 60px; height: 60px; border: 6px solid #12161F; background: #FF3B30;")} />

                        <div style={css("width: 30px; height: 8px; background: #12161F; transform-origin: left; animation: growX 0.5s ease both;")} />

                        <div style={css("width: 44px; height: 44px; border: 6px solid #12161F; animation: popIn 0.5s ease both 0.4s;")} />

                      </div>

                      <div style={css("border: 6px solid #12161F; background: #FFB703; padding: 10px 16px; font-size: 18px; font-weight: 800;")}>
                        {"📌 tag v1.1.0 · inmóvil"}
                      </div>

                    </div>

                  </>
                ) : null}

                {!!(v.isS6) ? (
                  <>

                    <svg viewBox="0 0 300 200" width="300" style={css("display: block;")}>

                      <g fill="none" strokeWidth="8" strokeLinecap="round" strokeDasharray="300" strokeDashoffset="300">

                        <path d="M20,100 L280,100" stroke="#12161F" style={css("animation: draw 1.6s ease forwards;")} />

                        <path d="M90,100 C130,100 130,40 170,40" stroke="#0047FF" style={css("animation: draw 1.2s ease forwards 1.2s;")} />

                        <path d="M170,40 L240,40" stroke="#0047FF" style={css("animation: draw 0.8s ease forwards 2s;")} />

                        <path d="M120,100 C160,100 160,165 200,165" stroke="#8B2FE0" style={css("animation: draw 1.2s ease forwards 1.8s;")} />

                      </g>

                      <g fill="#FFF" stroke="#12161F" strokeWidth="6">

                        <circle cx="20" cy="100" r="11" />

                        <circle cx="150" cy="100" r="11" />

                        <circle cx="280" cy="100" r="11" />

                        <circle cx="240" cy="40" r="11" />

                        <circle cx="200" cy="165" r="11" />

                      </g>

                    </svg>

                  </>
                ) : null}

              </div>

            </div>

            <div style={css("display: flex; flex-wrap: wrap; align-items: stretch; background: #12161F;")}>

              <button type="button" onClick={v.prevSlide} style={typeof v.navBtnStyle === "string" ? css(v.navBtnStyle) : v.navBtnStyle}>
                {"← ANTES"}
              </button>

              <button type="button" onClick={v.nextSlide} style={typeof v.navBtnStyle === "string" ? css(v.navBtnStyle) : v.navBtnStyle}>
                {"DESPUÉS →"}
              </button>

              <div style={css("flex: 1; display: flex; align-items: center; gap: 10px; padding: 12px 18px;")}>

                <button type="button" onClick={v.go1} style={typeof v.dot1Style === "string" ? css(v.dot1Style) : v.dot1Style}>
                  {"1"}
                </button>

                <button type="button" onClick={v.go2} style={typeof v.dot2Style === "string" ? css(v.dot2Style) : v.dot2Style}>
                  {"2"}
                </button>

                <button type="button" onClick={v.go3} style={typeof v.dot3Style === "string" ? css(v.dot3Style) : v.dot3Style}>
                  {"3"}
                </button>

                <button type="button" onClick={v.go4} style={typeof v.dot4Style === "string" ? css(v.dot4Style) : v.dot4Style}>
                  {"4"}
                </button>

                <button type="button" onClick={v.go5} style={typeof v.dot5Style === "string" ? css(v.dot5Style) : v.dot5Style}>
                  {"5"}
                </button>

                <button type="button" onClick={v.go6} style={typeof v.dot6Style === "string" ? css(v.dot6Style) : v.dot6Style}>
                  {"6"}
                </button>

              </div>

            </div>

          </div>

        </section>

        <section style={css("border-bottom: 6px solid #12161F;")}>

          <div style={css("display: flex; align-items: baseline; justify-content: space-between; gap: 20px; flex-wrap: wrap; padding: 40px 40px 16px 40px;")}>

            <h2 style={css("font-family: 'Archivo Black', sans-serif; font-size: clamp(32px, 5vw, 64px); margin: 0; text-transform: uppercase; letter-spacing: -0.02em;")}>
              {"01 · EL ÁRBOL"}
            </h2>

            <div style={css("font-size: 14px; font-weight: 800; letter-spacing: 0.14em; background: #FFB703; border: 4px solid #12161F; padding: 8px 12px;")}>
              {"DESLIZA →"}
            </div>

          </div>

          <p style={css("margin: 0 40px 24px 40px; font-size: 18px; font-weight: 700; max-width: 80ch;")}>
            {"Ya viste ramas, commits, merge y tags sueltos. "}
            <strong>
              {"Git Flow"}
            </strong>
            {" es solo la convención que le da un rol fijo a cada uno: cinco tipos de rama, cada una con su origen y su destino."}
          </p>

          <div style={css("overflow-x: auto; padding: 0 40px 40px 40px;")}>

            <svg viewBox="0 0 2000 640" width="1940" style={css("display: block; min-width: 1940px; font-family: 'JetBrains Mono', monospace;")}>

              <g stroke="#12161F" strokeWidth="2" strokeDasharray="8 10" opacity="0.35">

                <line x1="60" y1="60" x2="1960" y2="60" />

                <line x1="60" y1="170" x2="1960" y2="170" />

                <line x1="60" y1="290" x2="1960" y2="290" />

                <line x1="60" y1="420" x2="1960" y2="420" />

                <line x1="60" y1="540" x2="1960" y2="540" />

              </g>

              <g fontSize="21" fontWeight="800" fill="#12161F">

                <text x="60" y="34">
                  {"main"}
                </text>

                <text x="60" y="144">
                  {"hotfix/*"}
                </text>

                <text x="60" y="264">
                  {"release/*"}
                </text>

                <text x="60" y="394">
                  {"develop"}
                </text>

                <text x="60" y="514">
                  {"feature/*"}
                </text>

              </g>

              <g fill="none" strokeWidth="9" strokeLinecap="round" strokeDasharray="2200" strokeDashoffset="2200" data-anim="tree" style={css("animation: draw 2.6s ease forwards; animation-play-state: paused;")}>

                <path d="M200,60 L1920,60" stroke="#FF3B30" />

                <path d="M380,420 L1920,420" stroke="#00A64F" />

                <path d="M620,540 L800,540" stroke="#0047FF" />

                <path d="M1160,290 L1280,290" stroke="#8B2FE0" />

                <path d="M1620,170 L1740,170" stroke="#FF7A00" />

                <path d="M260,60 C320,60 320,420 380,420" stroke="#00A64F" />

                <path d="M500,420 C560,420 560,540 620,540" stroke="#0047FF" />

                <path d="M800,540 C860,540 860,420 920,420" stroke="#0047FF" />

                <path d="M1040,420 C1100,420 1100,290 1160,290" stroke="#8B2FE0" />

                <path d="M1280,290 C1340,290 1340,60 1400,60" stroke="#8B2FE0" />

                <path d="M1280,290 C1340,290 1340,420 1400,420" stroke="#8B2FE0" />

                <path d="M1500,60 C1560,60 1560,170 1620,170" stroke="#FF7A00" />

                <path d="M1740,170 C1800,170 1800,60 1860,60" stroke="#FF7A00" />

                <path d="M1740,170 C1820,170 1820,420 1900,420" stroke="#FF7A00" />

              </g>

              <g fill="#FFFFFF" stroke="#12161F" strokeWidth="6" data-anim="tree" style={css("animation: popIn 0.7s ease both 2.2s; animation-play-state: paused; transform-origin: center;")}>

                <circle cx="200" cy="60" r="15" />

                <circle cx="1400" cy="60" r="15" />

                <circle cx="1860" cy="60" r="15" />

                <circle cx="440" cy="420" r="15" />

                <circle cx="920" cy="420" r="15" />

                <circle cx="1000" cy="420" r="15" />

                <circle cx="1400" cy="420" r="15" />

                <circle cx="1900" cy="420" r="15" />

                <circle cx="680" cy="540" r="15" />

                <circle cx="740" cy="540" r="15" />

                <circle cx="1220" cy="290" r="15" />

                <circle cx="1680" cy="170" r="15" />

              </g>

              <g fontSize="19" fontWeight="700" fill="#12161F" textAnchor="middle">

                <text x="200" y="618" fontSize="16">
                  {"crea repo"}
                </text>

                <text x="710" y="618" fontSize="16">
                  {"se construye la feature"}
                </text>

                <text x="1220" y="618" fontSize="16">
                  {"se estabiliza y se prueba"}
                </text>

                <text x="1680" y="618" fontSize="16">
                  {"urgencia en producción"}
                </text>

              </g>

              <g fontSize="18" fontWeight="800">

                <rect x="1330" y="6" width="140" height="34" fill="#FFB703" stroke="#12161F" strokeWidth="4" />

                <text x="1345" y="31" fill="#12161F">
                  {"tag v1.0.0"}
                </text>

                <rect x="1790" y="6" width="140" height="34" fill="#FFB703" stroke="#12161F" strokeWidth="4" />

                <text x="1805" y="31" fill="#12161F">
                  {"tag v1.0.1"}
                </text>

                <text x="600" y="500" fill="#0047FF">
                  {"feature/checkout"}
                </text>

                <text x="1140" y="250" fill="#8B2FE0">
                  {"release/1.0.0"}
                </text>

                <text x="1600" y="130" fill="#FF7A00">
                  {"hotfix/1.0.1"}
                </text>

              </g>

            </svg>

          </div>

          <div style={css("display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); border-top: 6px solid #12161F;")}>

            <div style={css("padding: 18px 20px; border-right: 6px solid #12161F; font-size: 16px; font-weight: 700;")}>
              <span style={css("color:#00A64F;")}>
                {"▮"}
              </span>
              {" develop nace de main una sola vez y no muere."}
            </div>

            <div style={css("padding: 18px 20px; border-right: 6px solid #12161F; font-size: 16px; font-weight: 700;")}>
              <span style={css("color:#0047FF;")}>
                {"▮"}
              </span>
              {" feature nace y muere en develop."}
            </div>

            <div style={css("padding: 18px 20px; border-right: 6px solid #12161F; font-size: 16px; font-weight: 700;")}>
              <span style={css("color:#8B2FE0;")}>
                {"▮"}
              </span>
              {" release cierra en main "}
              <em>
                {"y"}
              </em>
              {" vuelve a develop."}
            </div>

            <div style={css("padding: 18px 20px; font-size: 16px; font-weight: 700;")}>
              <span style={css("color:#FF7A00;")}>
                {"▮"}
              </span>
              {" hotfix nace de main y vuelve a los dos."}
            </div>

          </div>

        </section>

        <section style={css("padding: 40px 40px 56px 40px; border-bottom: 6px solid #12161F;")}>

          <h2 style={css("font-family: 'Archivo Black', sans-serif; font-size: clamp(32px, 5vw, 64px); margin: 0 0 32px 0; text-transform: uppercase; letter-spacing: -0.02em;")}>
            {"02 · LAS RAMAS"}
          </h2>

          <div style={css("display: grid; grid-template-columns: repeat(auto-fit, minmax(320px, 1fr)); gap: 28px;")}>

            <article style={css("border: 6px solid #12161F; background: #FFF; box-shadow: 12px 12px 0 #FF3B30;")}>

              <div style={css("background: #FF3B30; color: #FFF; padding: 14px 18px; border-bottom: 6px solid #12161F; display: flex; justify-content: space-between; gap: 12px; align-items: center;")}>

                <span style={css("font-family: 'Archivo Black', sans-serif; font-size: 26px;")}>
                  {"main"}
                </span>

                <span style={css("font-size: 12px; font-weight: 800; letter-spacing: 0.12em; border: 3px solid #FFF; padding: 4px 8px;")}>
                  {"ETERNA"}
                </span>

              </div>

              <div style={css("padding: 18px; display: grid; gap: 12px; font-size: 16px; line-height: 1.6;")}>

                <p style={css("margin: 0;")}>
                  <strong>
                    {"Es producción."}
                  </strong>
                  {" Cada commit aquí es una versión desplegada y etiquetada."}
                </p>

                <div style={css("border-top: 4px solid #12161F; padding-top: 10px; font-size: 14px;")}>
                  {"RECIBE DE → "}
                  <strong>
                    {"release/*"}
                  </strong>
                  {", "}
                  <strong>
                    {"hotfix/*"}
                  </strong>
                </div>

                <div style={css("font-size: 14px;")}>
                  {"NUNCA → commits directos, merges de feature"}
                </div>

                <div style={css("background: #FFB703; border: 4px solid #12161F; padding: 8px 10px; font-size: 14px; font-weight: 700;")}>
                  {"Protegida: PR obligatorio + 2 aprobaciones + CI verde."}
                </div>

              </div>

            </article>

            <article style={css("border: 6px solid #12161F; background: #FFF; box-shadow: 12px 12px 0 #00A64F;")}>

              <div style={css("background: #00A64F; color: #FFF; padding: 14px 18px; border-bottom: 6px solid #12161F; display: flex; justify-content: space-between; gap: 12px; align-items: center;")}>

                <span style={css("font-family: 'Archivo Black', sans-serif; font-size: 26px;")}>
                  {"develop"}
                </span>

                <span style={css("font-size: 12px; font-weight: 800; letter-spacing: 0.12em; border: 3px solid #FFF; padding: 4px 8px;")}>
                  {"ETERNA"}
                </span>

              </div>

              <div style={css("padding: 18px; display: grid; gap: 12px; font-size: 16px; line-height: 1.6;")}>

                <p style={css("margin: 0;")}>
                  <strong>
                    {"Es el futuro."}
                  </strong>
                  {" Integra todo lo terminado que aún no se publica. Debe compilar siempre."}
                </p>

                <div style={css("border-top: 4px solid #12161F; padding-top: 10px; font-size: 14px;")}>
                  {"RECIBE DE → "}
                  <strong>
                    {"feature/*"}
                  </strong>
                  {", "}
                  <strong>
                    {"release/*"}
                  </strong>
                  {", "}
                  <strong>
                    {"hotfix/*"}
                  </strong>
                </div>

                <div style={css("font-size: 14px;")}>
                  {"SE DESPLIEGA EN → entorno de "}
                  <em>
                    {"staging"}
                  </em>
                  {" / dev"}
                </div>

                <div style={css("background: #FFB703; border: 4px solid #12161F; padding: 8px 10px; font-size: 14px; font-weight: 700;")}>
                  {"Si develop está roto, el equipo entero está bloqueado."}
                </div>

              </div>

            </article>

            <article style={css("border: 6px solid #12161F; background: #FFF; box-shadow: 12px 12px 0 #0047FF;")}>

              <div style={css("background: #0047FF; color: #FFF; padding: 14px 18px; border-bottom: 6px solid #12161F; display: flex; justify-content: space-between; gap: 12px; align-items: center;")}>

                <span style={css("font-family: 'Archivo Black', sans-serif; font-size: 24px;")}>
                  {"feature/*"}
                </span>

                <span style={css("font-size: 12px; font-weight: 800; letter-spacing: 0.12em; border: 3px solid #FFF; padding: 4px 8px;")}>
                  {"TEMPORAL"}
                </span>

              </div>

              <div style={css("padding: 18px; display: grid; gap: 12px; font-size: 16px; line-height: 1.6;")}>

                <p style={css("margin: 0;")}>
                  <strong>
                    {"Una función, una rama."}
                  </strong>
                  {" Vive días, no semanas. Cuanto más vieja, más doloroso el merge."}
                </p>

                <div style={css("border-top: 4px solid #12161F; padding-top: 10px; font-size: 14px;")}>
                  {"NACE DE → develop · MUERE EN → develop"}
                </div>

                <div style={css("font-size: 14px;")}>
                  {"NOMBRE → "}
                  <code style={css("background: #FFB703;border:3px solid #12161F;padding:1px 5px;")}>
                    {"feature/PROJ-142-checkout"}
                  </code>
                </div>

                <div style={css("background: #FFB703; border: 4px solid #12161F; padding: 8px 10px; font-size: 14px; font-weight: 700;")}>
                  {"Sincroniza con develop a diario: "}
                  <code>
                    {"git rebase develop"}
                  </code>
                  {"."}
                </div>

              </div>

            </article>

            <article style={css("border: 6px solid #12161F; background: #FFF; box-shadow: 12px 12px 0 #8B2FE0;")}>

              <div style={css("background: #8B2FE0; color: #FFF; padding: 14px 18px; border-bottom: 6px solid #12161F; display: flex; justify-content: space-between; gap: 12px; align-items: center;")}>

                <span style={css("font-family: 'Archivo Black', sans-serif; font-size: 24px;")}>
                  {"release/*"}
                </span>

                <span style={css("font-size: 12px; font-weight: 800; letter-spacing: 0.12em; border: 3px solid #FFF; padding: 4px 8px;")}>
                  {"TEMPORAL"}
                </span>

              </div>

              <div style={css("padding: 18px; display: grid; gap: 12px; font-size: 16px; line-height: 1.6;")}>

                <p style={css("margin: 0;")}>
                  <strong>
                    {"Congela el alcance."}
                  </strong>
                  {" Aquí solo entran correcciones, changelog y número de versión. Mientras existe, develop ya recibe la versión siguiente."}
                </p>

                <div style={css("border-top: 4px solid #12161F; padding-top: 10px; font-size: 14px;")}>
                  {"NACE DE → develop · MUERE EN → main "}
                  <strong>
                    {"+"}
                  </strong>
                  {" develop"}
                </div>

                <div style={css("font-size: 14px;")}>
                  {"NOMBRE → "}
                  <code style={css("background: #FFB703;border:3px solid #12161F;padding:1px 5px;")}>
                    {"release/1.4.0"}
                  </code>
                </div>

                <div style={css("background: #FFB703; border: 4px solid #12161F; padding: 8px 10px; font-size: 14px; font-weight: 700;")}>
                  {"No se admiten funcionalidades nuevas. Sin excepciones."}
                </div>

              </div>

            </article>

            <article style={css("border: 6px solid #12161F; background: #FFF; box-shadow: 12px 12px 0 #FF7A00;")}>

              <div style={css("background: #FF7A00; color: #12161F; padding: 14px 18px; border-bottom: 6px solid #12161F; display: flex; justify-content: space-between; gap: 12px; align-items: center;")}>

                <span style={css("font-family: 'Archivo Black', sans-serif; font-size: 24px;")}>
                  {"hotfix/*"}
                </span>

                <span style={css("font-size: 12px; font-weight: 800; letter-spacing: 0.12em; border: 3px solid #12161F; padding: 4px 8px;")}>
                  {"URGENTE"}
                </span>

              </div>

              <div style={css("padding: 18px; display: grid; gap: 12px; font-size: 16px; line-height: 1.6;")}>

                <p style={css("margin: 0;")}>
                  <strong>
                    {"Incidente crítico en producción."}
                  </strong>
                  {" Es la única rama que nace de main: no incorpora cambios pendientes de develop."}
                </p>

                <div style={css("border-top: 4px solid #12161F; padding-top: 10px; font-size: 14px;")}>
                  {"NACE DE → main · MUERE EN → main "}
                  <strong>
                    {"+"}
                  </strong>
                  {" develop"}
                </div>

                <div style={css("font-size: 14px;")}>
                  {"VERSIÓN → sube el "}
                  <em>
                    {"patch"}
                  </em>
                  {": 1.0.0 → 1.0.1"}
                </div>

                <div style={css("background: #FFB703; border: 4px solid #12161F; padding: 8px 10px; font-size: 14px; font-weight: 700;")}>
                  {"Si se omite el merge a develop, el defecto reaparece en la siguiente release."}
                </div>

              </div>

            </article>

            <article style={css("border: 6px solid #12161F; background: #12161F; color: #E8EEF7; box-shadow: 12px 12px 0 #12161F;")}>

              <div style={css("padding: 14px 18px; border-bottom: 6px solid #E8EEF7;")}>

                <span style={css("font-family: 'Archivo Black', sans-serif; font-size: 24px;")}>
                  {"support/*"}
                </span>

              </div>

              <div style={css("padding: 18px; display: grid; gap: 12px; font-size: 16px; line-height: 1.6;")}>

                <p style={css("margin: 0;")}>
                  {"La rama opcional. Mantiene vivas versiones antiguas que un cliente aún usa ("}
                  <code>
                    {"support/1.x"}
                  </code>
                  {") mientras main ya va en 2.x."}
                </p>

                <div style={css("border-top: 4px solid #E8EEF7; padding-top: 10px; font-size: 14px;")}>
                  {"NACE DE → un tag de main · NO vuelve a develop"}
                </div>

                <div style={css("border: 4px solid #FFB703; color: #FFB703; padding: 8px 10px; font-size: 14px; font-weight: 700;")}>
                  {"Solo aplica cuando se ofrecen versiones con soporte a largo plazo."}
                </div>

              </div>

            </article>

          </div>

        </section>

        <section style={css("padding: 40px 40px 56px 40px; border-bottom: 6px solid #12161F;")}>

          <h2 style={css("font-family: 'Archivo Black', sans-serif; font-size: clamp(32px, 5vw, 64px); margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: -0.02em;")}>
            {"03 · EJEMPLO REAL"}
          </h2>

          <p style={css("margin: 0 0 28px 0; font-size: 18px; font-weight: 700;")}>
            {"Proyecto "}
            <code style={css("background:#FFB703;border:4px solid #12161F;padding:2px 8px;")}>
              {"tienda-api"}
            </code>
            {" en v1.0.0. Seleccione el escenario."}
          </p>

          <div style={css("display: flex; flex-wrap: wrap; gap: 0; border: 6px solid #12161F; background: #FFF;")}>

            <button type="button" onClick={v.pickFeature} style={typeof v.tabFeatureStyle === "string" ? css(v.tabFeatureStyle) : v.tabFeatureStyle}>
              {"A · NUEVA FEATURE"}
            </button>

            <button type="button" onClick={v.pickRelease} style={typeof v.tabReleaseStyle === "string" ? css(v.tabReleaseStyle) : v.tabReleaseStyle}>
              {"B · PUBLICAR 1.1.0"}
            </button>

            <button type="button" onClick={v.pickHotfix} style={typeof v.tabHotfixStyle === "string" ? css(v.tabHotfixStyle) : v.tabHotfixStyle}>
              {"C · HOTFIX 1.1.1"}
            </button>

          </div>

          <div style={css("border: 6px solid #12161F; border-top: 0; background: #FFF; padding: 28px; box-shadow: 12px 12px 0 #12161F;")}>

            {!!(v.isFeature) ? (
              <>

                <div style={css("display: grid; gap: 22px;")}>

                  <p style={css("margin: 0; font-size: 19px; font-weight: 700; max-width: 70ch;")}>
                    {"Ana toma el ticket PROJ-142 “cupones en el checkout”. Trabaja de forma aislada en su rama, sin bloquear al resto del equipo."}
                  </p>

                  <pre style={css("margin: 0; background: #12161F; color: #E8EEF7; border: 6px solid #12161F; padding: 20px; overflow-x: auto; font-size: 15px; line-height: 1.85; font-family: 'JetBrains Mono', monospace;")}>
                    {"# 1. partir SIEMPRE de develop actualizado\ngit switch develop\ngit pull --ff-only origin develop\n\n# 2. abrir la rama con el ticket en el nombre\ngit switch -c feature/PROJ-142-cupones-checkout\n\n# 3. commits pequeños y descriptivos (Conventional Commits)\ngit commit -m \"feat(checkout): aplicar cupón porcentual al total\"\ngit commit -m \"test(checkout): casos de cupón expirado\"\n\n# 4. cada mañana: traer develop y mantener historia limpia\ngit fetch origin\ngit rebase origin/develop\n\n# 5. publicar y abrir Pull Request → develop\ngit push -u origin feature/PROJ-142-cupones-checkout\n\n# 6. tras aprobar el PR: squash merge y borrar la rama\ngit switch develop && git pull\ngit branch -d feature/PROJ-142-cupones-checkout"}
                  </pre>

                  <div style={css("display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px;")}>

                    <div style={css("border: 5px solid #12161F; padding: 14px; font-size: 15px; font-weight: 700; background: #F4F7FC;")}>
                      {"Se recomienda un máximo aproximado de 400 líneas por PR. Un tamaño mayor dificulta una revisión efectiva."}
                    </div>

                    <div style={css("border: 5px solid #12161F; padding: 14px; font-size: 15px; font-weight: 700; background: #F4F7FC;")}>
                      {"La feature entra a develop solo con CI verde y 1 aprobación."}
                    </div>

                    <div style={css("border: 5px solid #12161F; padding: 14px; font-size: 15px; font-weight: 700; background: #F4F7FC;")}>
                      {"¿No concluirá la funcionalidad en esta semana? Almacénela detrás de un feature flag."}
                    </div>

                  </div>

                </div>

              </>
            ) : null}

            {!!(v.isRelease) ? (
              <>

                <div style={css("display: grid; gap: 22px;")}>

                  <p style={css("margin: 0; font-size: 19px; font-weight: 700; max-width: 70ch;")}>
                    {"develop tiene 8 features listas. Se congela el alcance en "}
                    <strong>
                      {"release/1.1.0"}
                    </strong>
                    {": QA valida en esa rama mientras el equipo inicia la 1.2.0 en develop."}
                  </p>

                  <pre style={css("margin: 0; background: #12161F; color: #E8EEF7; border: 6px solid #12161F; padding: 20px; overflow-x: auto; font-size: 15px; line-height: 1.85; font-family: 'JetBrains Mono', monospace;")}>
                    {"# 1. cortar la release desde develop\ngit switch develop && git pull\ngit switch -c release/1.1.0\n\n# 2. subir versión y changelog (único cambio \"no bug\" permitido)\nnpm version 1.1.0 --no-git-tag-version\ngit commit -am \"chore(release): 1.1.0 + changelog\"\ngit push -u origin release/1.1.0\n# → CI despliega esta rama al entorno de STAGING para QA\n\n# 3. QA reporta fallos: se corrigen AQUÍ, no en develop\ngit commit -m \"fix(cupones): redondeo de descuento en centavos\"\n\n# 4. aprobada → merge a main SIN squash y etiquetar\ngit switch main && git pull\ngit merge --no-ff release/1.1.0\ngit tag -a v1.1.0 -m \"Release 1.1.0\"\ngit push origin main --follow-tags   # → deploy a PRODUCCIÓN\n\n# 5. devolver las correcciones a develop\ngit switch develop\ngit merge --no-ff release/1.1.0\ngit push origin develop\n\n# 6. cerrar la rama\ngit branch -d release/1.1.0\ngit push origin --delete release/1.1.0"}
                  </pre>

                  <div style={css("display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px;")}>

                    <div style={css("border: 5px solid #12161F; padding: 14px; font-size: 15px; font-weight: 700; background: #F4F7FC;")}>
                      {"Utilice "}
                      <code>
                        {"--no-ff"}
                      </code>
                      {": el merge commit es el registro de qué se publicó."}
                    </div>

                    <div style={css("border: 5px solid #12161F; padding: 14px; font-size: 15px; font-weight: 700; background: #F4F7FC;")}>
                      {"El tag es el contrato: cualquiera puede volver a v1.1.0 exacta."}
                    </div>

                    <div style={css("border: 5px solid #FF3B30; padding: 14px; font-size: 15px; font-weight: 700; background: #FFF;")}>
                      {"Deben realizarse ambos merges (main y develop); un merge parcial produce divergencia."}
                    </div>

                  </div>

                </div>

              </>
            ) : null}

            {!!(v.isHotfix) ? (
              <>

                <div style={css("display: grid; gap: 22px;")}>

                  <p style={css("margin: 0; font-size: 19px; font-weight: 700; max-width: 70ch;")}>
                    {"Incidente en producción (pagos fuera de servicio). develop contiene trabajo incompleto, por lo que se parte del tag "}
                    <strong>
                      {"v1.1.0"}
                    </strong>
                    {"."}
                  </p>

                  <pre style={css("margin: 0; background: #12161F; color: #E8EEF7; border: 6px solid #12161F; padding: 20px; overflow-x: auto; font-size: 15px; line-height: 1.85; font-family: 'JetBrains Mono', monospace;")}>
                    {"# 1. nacer del código que ESTÁ en producción\ngit switch main && git pull\ngit switch -c hotfix/1.1.1\n\n# 2. el mínimo cambio posible + su test de regresión\ngit commit -am \"fix(pagos): reintentar timeout del gateway\"\nnpm version 1.1.1 --no-git-tag-version\ngit commit -am \"chore(release): 1.1.1\"\n\n# 3. a main, etiquetar y desplegar\ngit switch main\ngit merge --no-ff hotfix/1.1.1\ngit tag -a v1.1.1 -m \"Hotfix 1.1.1\"\ngit push origin main --follow-tags\n\n# 4. IMPRESCINDIBLE: propagar a develop\ngit switch develop\ngit merge --no-ff hotfix/1.1.1   # y a release/* si hay una abierta\ngit push origin develop\n\ngit branch -d hotfix/1.1.1"}
                  </pre>

                  <div style={css("display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 16px;")}>

                    <div style={css("border: 5px solid #12161F; padding: 14px; font-size: 15px; font-weight: 700; background: #F4F7FC;")}>
                      {"Un hotfix corrige un único defecto; no debe ampliar el alcance."}
                    </div>

                    <div style={css("border: 5px solid #12161F; padding: 14px; font-size: 15px; font-weight: 700; background: #F4F7FC;")}>
                      {"Si hay una release abierta, también recibe el merge."}
                    </div>

                    <div style={css("border: 5px solid #12161F; padding: 14px; font-size: 15px; font-weight: 700; background: #F4F7FC;")}>
                      {"El análisis post-incidente se realiza después de estabilizar el servicio."}
                    </div>

                  </div>

                </div>

              </>
            ) : null}

          </div>

        </section>

        {!!(v.showAscii) ? (
          <>

            <section style={css("padding: 40px 40px 56px 40px; border-bottom: 6px solid #12161F;")}>

              <h2 style={css("font-family: 'Archivo Black', sans-serif; font-size: clamp(32px, 5vw, 64px); margin: 0 0 8px 0; text-transform: uppercase; letter-spacing: -0.02em;")}>
                {"04 · EL HISTORIAL"}
              </h2>

              <p style={css("margin: 0 0 24px 0; font-size: 18px; font-weight: 700;")}>
                {"Cómo se ve todo lo anterior en "}
                <code style={css("background:#FFB703;border:4px solid #12161F;padding:2px 8px;")}>
                  {"git log --graph --oneline --all"}
                </code>
              </p>

              <pre style={css("margin: 0; background: #12161F; color: #E8EEF7; border: 6px solid #12161F; box-shadow: 12px 12px 0 #FFB703; padding: 24px; overflow-x: auto; font-size: 15px; line-height: 1.7; font-family: 'JetBrains Mono', monospace;")}>
                {"*   a91f0c2 (HEAD -> develop, origin/develop) Merge branch 'hotfix/1.1.1' into develop\n|\\\n| * 7d3e1b8 chore(release): 1.1.1\n| * 4c8a005 fix(pagos): reintentar timeout del gateway\n* | 2f6b9de Merge branch 'feature/PROJ-160-envios' into develop   <- ya es la 1.2.0\n|\\ \\\n| * | e0d47a1 feat(envios): tarifas por peso\n| |/\n* / 55c1aa9 Merge branch 'release/1.1.0' into develop\n|/\n| *   b73f902 (tag: v1.1.1, main, origin/main) Merge branch 'hotfix/1.1.1'\n| |\\\n| |/\n|/|\n* |   9ae4d10 (tag: v1.1.0) Merge branch 'release/1.1.0'\n|\\ \\\n| * | 1c05f77 fix(cupones): redondeo de descuento en centavos\n| * | 6b21e39 chore(release): 1.1.0 + changelog\n| |/\n| * 3fd8c14 Merge branch 'feature/PROJ-142-cupones-checkout' into develop\n|/\n* d40b7a5 (tag: v1.0.0) Merge branch 'release/1.0.0'"}
              </pre>

              <div style={css("display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 16px; margin-top: 24px;")}>

                <div style={css("border: 6px solid #12161F; background: #FFF; padding: 16px; font-size: 16px; font-weight: 700;")}>
                  {"Los merges de main son la lista de versiones publicadas."}
                </div>

                <div style={css("border: 6px solid #12161F; background: #FFF; padding: 16px; font-size: 16px; font-weight: 700;")}>
                  {"Cada burbuja es una rama que existió, hizo su trabajo y se cerró."}
                </div>

                <div style={css("border: 6px solid #12161F; background: #FFF; padding: 16px; font-size: 16px; font-weight: 700;")}>
                  {"develop siempre va por delante de main. Eso es correcto."}
                </div>

              </div>

            </section>

          </>
        ) : null}

        <section style={css("padding: 40px 40px 56px 40px; border-bottom: 6px solid #12161F; background: #12161F; color: #E8EEF7;")}>

          <h2 style={css("font-family: 'Archivo Black', sans-serif; font-size: clamp(32px, 5vw, 64px); margin: 0 0 32px 0; text-transform: uppercase; letter-spacing: -0.02em;")}>
            {"05 · USO PROFESIONAL"}
          </h2>

          <div style={css("display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 28px;")}>

            <div style={css("border: 6px solid #E8EEF7; padding: 20px;")}>

              <div style={css("font-family: 'Archivo Black', sans-serif; font-size: 20px; color: #FFB703; margin-bottom: 12px;")}>
                {"NOMBRES"}
              </div>

              <ul style={css("margin: 0; padding-left: 20px; font-size: 16px; line-height: 1.9;")}>

                <li>
                  <code>
                    {"feature/<TICKET>-slug"}
                  </code>
                </li>

                <li>
                  <code>
                    {"release/<semver>"}
                  </code>
                </li>

                <li>
                  <code>
                    {"hotfix/<semver>"}
                  </code>
                </li>

                <li>
                  {"minúsculas, guiones, sin ñ ni acentos"}
                </li>

              </ul>

            </div>

            <div style={css("border: 6px solid #E8EEF7; padding: 20px;")}>

              <div style={css("font-family: 'Archivo Black', sans-serif; font-size: 20px; color: #FFB703; margin-bottom: 12px;")}>
                {"VERSIONADO"}
              </div>

              <ul style={css("margin: 0; padding-left: 20px; font-size: 16px; line-height: 1.9;")}>

                <li>
                  {"MAJOR: introduce incompatibilidad"}
                </li>

                <li>
                  {"MINOR: release con features"}
                </li>

                <li>
                  {"PATCH: hotfix"}
                </li>

                <li>
                  {"el tag vive solo en main"}
                </li>

              </ul>

            </div>

            <div style={css("border: 6px solid #E8EEF7; padding: 20px;")}>

              <div style={css("font-family: 'Archivo Black', sans-serif; font-size: 20px; color: #FFB703; margin-bottom: 12px;")}>
                {"PROTECCIONES"}
              </div>

              <ul style={css("margin: 0; padding-left: 20px; font-size: 16px; line-height: 1.9;")}>

                <li>
                  {"main y develop: push directo bloqueado"}
                </li>

                <li>
                  {"CI + lint + tests obligatorios"}
                </li>

                <li>
                  {"CODEOWNERS por carpeta"}
                </li>

                <li>
                  {"historia lineal en develop (squash)"}
                </li>

              </ul>

            </div>

            <div style={css("border: 6px solid #E8EEF7; padding: 20px;")}>

              <div style={css("font-family: 'Archivo Black', sans-serif; font-size: 20px; color: #FFB703; margin-bottom: 12px;")}>
                {"ENTORNOS"}
              </div>

              <ul style={css("margin: 0; padding-left: 20px; font-size: 16px; line-height: 1.9;")}>

                <li>
                  {"develop → dev / integración"}
                </li>

                <li>
                  {"release/* → staging + QA"}
                </li>

                <li>
                  {"main + tag → producción"}
                </li>

                <li>
                  {"un pipeline por rama, sin deploys manuales"}
                </li>

              </ul>

            </div>

          </div>

          <div style={css("margin-top: 32px; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;")}>

            <div style={css("background: #FF3B30; color: #FFF; border: 6px solid #E8EEF7; padding: 18px; font-size: 16px; font-weight: 700;")}>
              <span style={css("display:block; font-family:'Archivo Black',sans-serif; font-size:15px; letter-spacing:0.12em; margin-bottom:8px;")}>
                {"ANTIPATRÓN"}
              </span>
              {"Ramas feature de tres semanas. Al final el merge es un proyecto aparte."}
            </div>

            <div style={css("background: #FF3B30; color: #FFF; border: 6px solid #E8EEF7; padding: 18px; font-size: 16px; font-weight: 700;")}>
              <span style={css("display:block; font-family:'Archivo Black',sans-serif; font-size:15px; letter-spacing:0.12em; margin-bottom:8px;")}>
                {"ANTIPATRÓN"}
              </span>
              {"Meter una feature “chiquita” en release/*. Ahí empieza el retraso."}
            </div>

            <div style={css("background: #FF3B30; color: #FFF; border: 6px solid #E8EEF7; padding: 18px; font-size: 16px; font-weight: 700;")}>
              <span style={css("display:block; font-family:'Archivo Black',sans-serif; font-size:15px; letter-spacing:0.12em; margin-bottom:8px;")}>
                {"ANTIPATRÓN"}
              </span>
              {"Hotfix que nunca vuelve a develop. El bug reaparece en la próxima versión."}
            </div>

          </div>

        </section>

        <section style={css("padding: 40px 40px 0 40px;")}>

          <div style={css("display: flex; align-items: baseline; justify-content: space-between; gap: 20px; flex-wrap: wrap; margin-bottom: 24px;")}>

            <h2 style={css("font-family: 'Archivo Black', sans-serif; font-size: clamp(32px, 5vw, 64px); margin: 0; text-transform: uppercase; letter-spacing: -0.02em;")}>
              {"06 · REFERENCIA RÁPIDA"}
            </h2>

            <div style={css("font-size: 15px; font-weight: 800; border: 4px solid #12161F; background: #FFF;")}>

              <button type="button" onClick={v.pickRaw} style={typeof v.rawBtnStyle === "string" ? css(v.rawBtnStyle) : v.rawBtnStyle}>
                {"GIT PURO"}
              </button>

              <button type="button" onClick={v.pickFlow} style={typeof v.flowBtnStyle === "string" ? css(v.flowBtnStyle) : v.flowBtnStyle}>
                {"git-flow (CLI)"}
              </button>

            </div>

          </div>

          {!!(v.isRaw) ? (
            <>

              <div style={css("display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 0; border: 6px solid #12161F; background: #FFF;")}>

                <div style={css("border-right: 6px solid #12161F; border-bottom: 6px solid #12161F; padding: 16px 18px;")}>
                  <strong style={css("display:block;margin-bottom:6px;")}>
                    {"Abrir feature"}
                  </strong>
                  <code>
                    {"git switch -c feature/X develop"}
                  </code>
                </div>

                <div style={css("border-right: 6px solid #12161F; border-bottom: 6px solid #12161F; padding: 16px 18px;")}>
                  <strong style={css("display:block;margin-bottom:6px;")}>
                    {"Cerrar feature"}
                  </strong>
                  <code>
                    {"git switch develop && git merge --squash feature/X"}
                  </code>
                </div>

                <div style={css("border-bottom: 6px solid #12161F; padding: 16px 18px;")}>
                  <strong style={css("display:block;margin-bottom:6px;")}>
                    {"Abrir release"}
                  </strong>
                  <code>
                    {"git switch -c release/1.1.0 develop"}
                  </code>
                </div>

                <div style={css("border-right: 6px solid #12161F; border-bottom: 6px solid #12161F; padding: 16px 18px;")}>
                  <strong style={css("display:block;margin-bottom:6px;")}>
                    {"Cerrar release"}
                  </strong>
                  <code>
                    {"git merge --no-ff release/1.1.0 && git tag -a v1.1.0"}
                  </code>
                </div>

                <div style={css("border-right: 6px solid #12161F; border-bottom: 6px solid #12161F; padding: 16px 18px;")}>
                  <strong style={css("display:block;margin-bottom:6px;")}>
                    {"Abrir hotfix"}
                  </strong>
                  <code>
                    {"git switch -c hotfix/1.1.1 main"}
                  </code>
                </div>

                <div style={css("border-bottom: 6px solid #12161F; padding: 16px 18px;")}>
                  <strong style={css("display:block;margin-bottom:6px;")}>
                    {"Ver el árbol"}
                  </strong>
                  <code>
                    {"git log --graph --oneline --all --decorate"}
                  </code>
                </div>

                <div style={css("border-right: 6px solid #12161F; padding: 16px 18px;")}>
                  <strong style={css("display:block;margin-bottom:6px;")}>
                    {"Actualizar rama"}
                  </strong>
                  <code>
                    {"git fetch origin && git rebase origin/develop"}
                  </code>
                </div>

                <div style={css("border-right: 6px solid #12161F; padding: 16px 18px;")}>
                  <strong style={css("display:block;margin-bottom:6px;")}>
                    {"Traer un commit suelto"}
                  </strong>
                  <code>
                    {"git cherry-pick <sha>"}
                  </code>
                </div>

                <div style={css("padding: 16px 18px;")}>
                  <strong style={css("display:block;margin-bottom:6px;")}>
                    {"Borrar rama remota"}
                  </strong>
                  <code>
                    {"git push origin --delete feature/X"}
                  </code>
                </div>

              </div>

            </>
          ) : null}

          {!!(v.isFlow) ? (
            <>

              <div style={css("display: grid; grid-template-columns: repeat(auto-fit, minmax(340px, 1fr)); gap: 0; border: 6px solid #12161F; background: #FFF;")}>

                <div style={css("border-right: 6px solid #12161F; border-bottom: 6px solid #12161F; padding: 16px 18px;")}>
                  <strong style={css("display:block;margin-bottom:6px;")}>
                    {"Inicializar"}
                  </strong>
                  <code>
                    {"git flow init -d"}
                  </code>
                </div>

                <div style={css("border-right: 6px solid #12161F; border-bottom: 6px solid #12161F; padding: 16px 18px;")}>
                  <strong style={css("display:block;margin-bottom:6px;")}>
                    {"Feature"}
                  </strong>
                  <code>
                    {"git flow feature start PROJ-142"}
                  </code>
                </div>

                <div style={css("border-bottom: 6px solid #12161F; padding: 16px 18px;")}>
                  <strong style={css("display:block;margin-bottom:6px;")}>
                    {"Cerrar feature"}
                  </strong>
                  <code>
                    {"git flow feature finish PROJ-142"}
                  </code>
                </div>

                <div style={css("border-right: 6px solid #12161F; border-bottom: 6px solid #12161F; padding: 16px 18px;")}>
                  <strong style={css("display:block;margin-bottom:6px;")}>
                    {"Release"}
                  </strong>
                  <code>
                    {"git flow release start 1.1.0"}
                  </code>
                </div>

                <div style={css("border-right: 6px solid #12161F; border-bottom: 6px solid #12161F; padding: 16px 18px;")}>
                  <strong style={css("display:block;margin-bottom:6px;")}>
                    {"Cerrar release"}
                  </strong>
                  <code>
                    {"git flow release finish 1.1.0"}
                  </code>
                  <em>
                    {"(merge + tag + back-merge)"}
                  </em>
                </div>

                <div style={css("border-bottom: 6px solid #12161F; padding: 16px 18px;")}>
                  <strong style={css("display:block;margin-bottom:6px;")}>
                    {"Hotfix"}
                  </strong>
                  <code>
                    {"git flow hotfix start 1.1.1"}
                  </code>
                </div>

                <div style={css("border-right: 6px solid #12161F; padding: 16px 18px;")}>
                  <strong style={css("display:block;margin-bottom:6px;")}>
                    {"Cerrar hotfix"}
                  </strong>
                  <code>
                    {"git flow hotfix finish 1.1.1"}
                  </code>
                </div>

                <div style={css("border-right: 6px solid #12161F; padding: 16px 18px;")}>
                  <strong style={css("display:block;margin-bottom:6px;")}>
                    {"Publicar rama"}
                  </strong>
                  <code>
                    {"git flow feature publish PROJ-142"}
                  </code>
                </div>

                <div style={css("padding: 16px 18px;")}>
                  <strong style={css("display:block;margin-bottom:6px;")}>
                    {"Importante"}
                  </strong>
                  {"La CLI realiza merges locales: revise las reglas de pull request del equipo antes de usar "}
                  <code>
                    {"finish"}
                  </code>
                  {"."}
                </div>

              </div>

            </>
          ) : null}

        </section>

        <footer style={css("margin: 56px 40px 0 40px; border: 6px solid #12161F; background: #FFB703; padding: 28px; box-shadow: 14px 14px 0 #12161F;")}>

          <p style={css("margin: 0; font-family: 'Archivo Black', sans-serif; font-size: clamp(22px, 3.4vw, 44px); line-height: 1.1; text-transform: uppercase;")}>
            {"Git Flow no es burocracia:"}
            <br />
            {"es saber exactamente qué hay en producción."}
          </p>

        </footer>

      </div>
    </div>
  )
}
