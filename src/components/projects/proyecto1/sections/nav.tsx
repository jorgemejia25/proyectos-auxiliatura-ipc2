import { css } from "@/components/dc/css"

/**
 * Fixed in-page navigation for Proyecto1.
 * Stays pinned below the project chrome while the page scrolls.
 */
export function Proyecto1Nav() {
  return (
    <>
      <div
        style={css(
          "position:fixed;top:var(--project-chrome-h,58px);left:0;right:0;z-index:50;display:flex;flex-wrap:wrap;align-items:center;gap:18px;padding:12px 22px;background:#120720;border-bottom:5px solid #C6FF3D"
        )}
      >
        <div style={css("display:flex;flex-wrap:wrap;gap:14px;font-size:12px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase")}>
          <a href="#problema" style={css("color:#EDE4FF;border-bottom:3px solid #7C3AED")}>
            {"Problema"}
          </a>

          <a href="#robots" style={css("color:#EDE4FF;border-bottom:3px solid #7C3AED")}>
            {"Robots"}
          </a>

          <a href="#matriz" style={css("color:#EDE4FF;border-bottom:3px solid #7C3AED")}>
            {"Matriz"}
          </a>

          <a href="#simulador" style={css("color:#EDE4FF;border-bottom:3px solid #7C3AED")}>
            {"Simulador"}
          </a>

          <a href="#xml" style={css("color:#EDE4FF;border-bottom:3px solid #7C3AED")}>
            {"XML"}
          </a>

          <a href="#estructuras" style={css("color:#EDE4FF;border-bottom:3px solid #7C3AED")}>
            {"Estructuras"}
          </a>

          <a href="#codigo" style={css("color:#EDE4FF;border-bottom:3px solid #7C3AED")}>
            {"Código"}
          </a>

          <a href="#ruta" style={css("color:#EDE4FF;border-bottom:3px solid #7C3AED")}>
            {"Fases"}
          </a>

          <a href="#versionamiento" style={css("color:#EDE4FF;border-bottom:3px solid #7C3AED")}>
            {"Git"}
          </a>

          <a href="#reglas" style={css("color:#EDE4FF;border-bottom:3px solid #7C3AED")}>
            {"Reglas"}
          </a>

          <a href="#entrega" style={css("color:#EDE4FF;border-bottom:3px solid #7C3AED")}>
            {"Entrega"}
          </a>
        </div>
      </div>

      {/* Reserves vertical space so content does not sit under the fixed nav. */}
      <div aria-hidden="true" style={css("height:var(--project-nav-h,58px)")} />
    </>
  )
}
