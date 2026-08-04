import { css } from "@/components/dc/css"

/**
 * Fixed in-page navigation for Practica1.
 * Stays pinned below the project chrome while the page scrolls.
 */
export function Practica1Nav() {
  return (
    <>
      <div
        style={css(
          "position:fixed;top:var(--project-chrome-h,58px);left:0;right:0;z-index:50;display:flex;flex-wrap:wrap;align-items:center;gap:18px;padding:12px 22px;background:#06142E;border-bottom:5px solid #35E0FF"
        )}
      >
        <div style={css("display:flex;flex-wrap:wrap;gap:14px;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase")}>
          <a href="#enunciado" style={css("color:#E4EEFF;border-bottom:3px solid #1E4FD8")}>
            {"Enunciado"}
          </a>

          <a href="#clases" style={css("color:#E4EEFF;border-bottom:3px solid #1E4FD8")}>
            {"Clases"}
          </a>

          <a href="#simulador" style={css("color:#E4EEFF;border-bottom:3px solid #1E4FD8")}>
            {"Simulador"}
          </a>

          <a href="#codigo" style={css("color:#E4EEFF;border-bottom:3px solid #1E4FD8")}>
            {"Código"}
          </a>

          <a href="#ruta" style={css("color:#E4EEFF;border-bottom:3px solid #1E4FD8")}>
            {"Fases"}
          </a>

          <a href="#hc" style={css("color:#E4EEFF;border-bottom:3px solid #1E4FD8")}>
            {"Hoja de calificación"}
          </a>

          <a href="#entrega" style={css("color:#E4EEFF;border-bottom:3px solid #1E4FD8")}>
            {"Entrega"}
          </a>
        </div>
      </div>

      {/* Reserves vertical space so content does not sit under the fixed nav. */}
      <div aria-hidden="true" style={css("height:var(--project-nav-h,58px)")} />
    </>
  )
}
