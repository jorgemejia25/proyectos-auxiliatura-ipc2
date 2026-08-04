import { css } from "@/components/dc/css"
import { Proyecto1GitTree } from "@/components/projects/proyecto1/sections/git-tree"

/**
 * Commit convention and recommended GitFlow for Proyecto1.
 * Aligns with the PDF requirement of continuous versioning and 4 weekly releases.
 */
export function Proyecto1VersionamientoSection() {
  return (
    <section
      id="versionamiento"
      style={css(
        "background:#120720;color:#EDE4FF;border-top:5px solid #120720;border-bottom:5px solid #120720;padding:56px 0"
      )}
    >
      <div style={css("max-width:1240px;margin:0 auto;padding:0 22px")}>
        <div style={css("display:flex;align-items:baseline;gap:14px;flex-wrap:wrap")}>
          <div
            style={css(
              "font-family:'Archivo Black',sans-serif;font-size:15px;background:#C6FF3D;color:#120720;padding:4px 10px"
            )}
          >
            {"09"}
          </div>

          <h2
            style={css(
              "font-family:'Archivo Black',sans-serif;font-size:clamp(30px,5vw,54px);margin:0;text-transform:uppercase;letter-spacing:-2px;color:#C6FF3D"
            )}
          >
            {"Commits y GitFlow"}
          </h2>
        </div>

        <p style={css("max-width:840px;font-size:17px;line-height:1.65;margin:18px 0 0;text-wrap:pretty")}>
          {"El enunciado exige versionamiento en GitHub y "}
          <strong style={css("color:#C6FF3D")}>{"4 releases mínimo"}</strong>
          {" (uno por semana). El último release es el final y se califica desde ese tag hasta la entrega. Esta guía define cómo nombrar commits y cómo organizar las ramas para que el avance quede demostrable."}
        </p>

        <div
          style={css(
            "display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:18px;margin-top:28px"
          )}
        >
          <div style={css("background:#1A0B2E;border:4px solid #C6FF3D;padding:20px")}>
            <div style={css("font-size:12px;letter-spacing:2px;font-weight:700;color:#FF6FD8")}>
              {"CONVENCIÓN DE COMMITS"}
            </div>
            <div
              style={css(
                "font-family:'Archivo Black',sans-serif;font-size:22px;margin-top:8px;text-transform:uppercase"
              )}
            >
              {"Conventional Commits"}
            </div>
            <p style={css("font-size:14px;line-height:1.55;margin:10px 0 0")}>
              {"Formato: "}
              <code style={css("background:#120720;color:#C6FF3D;padding:2px 6px")}>
                {"tipo(alcance): descripción"}
              </code>
              {". En imperativo, en español o inglés, y un commit = un cambio coherente."}
            </p>
          </div>

          <div style={css("background:#1A0B2E;border:4px solid #C6FF3D;padding:20px")}>
            <div style={css("font-size:12px;letter-spacing:2px;font-weight:700;color:#FF6FD8")}>
              {"GITFLOW RECOMENDADO"}
            </div>
            <div
              style={css(
                "font-family:'Archivo Black',sans-serif;font-size:22px;margin-top:8px;text-transform:uppercase"
              )}
            >
              {"Trunk + features + tags"}
            </div>
            <p style={css("font-size:14px;line-height:1.55;margin:10px 0 0")}>
              {"GitFlow clásico con "}
              <code style={css("background:#120720;color:#C6FF3D;padding:2px 6px")}>{"develop"}</code>
              {" es innecesario para un proyecto individual. Use "}
              <strong style={css("color:#C6FF3D")}>{"main"}</strong>
              {" estable, ramas "}
              <code style={css("background:#120720;color:#C6FF3D;padding:2px 6px")}>{"feature/*"}</code>
              {" y tags de release semanales."}
            </p>
          </div>
        </div>

        <h3
          style={css(
            "font-family:'Archivo Black',sans-serif;font-size:24px;margin:42px 0 0;text-transform:uppercase;color:#C6FF3D"
          )}
        >
          {"Tipos de commit permitidos"}
        </h3>

        <div
          style={css(
            "display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px;margin-top:18px"
          )}
        >
          {[
            ["feat", "Nueva funcionalidad", "feat(tda): agregar ListaSimple con Insertar y Recorrer"],
            ["fix", "Corrección de error", "fix(ruta): evitar revisitar celdas en backtracking"],
            ["docs", "Documentación", "docs(ensayo): agregar diagrama de clases al anexo"],
            ["refactor", "Mejora sin cambiar comportamiento", "refactor(xml): separar parseo de ciudad y robots"],
            ["test", "Pruebas o escenarios de consola", "test(mision): validar rescate en ciudadAlfa"],
            ["chore", "Repo, build, ignores", "chore: agregar .gitignore y README inicial"],
          ].map(([tipo, uso, ejemplo]) => (
            <div
              key={tipo}
              style={css("background:#EDE4FF;color:#120720;border:4px solid #C6FF3D;padding:16px")}
            >
              <div
                style={css(
                  "display:inline-block;background:#120720;color:#C6FF3D;padding:3px 8px;font-size:12px;font-weight:700"
                )}
              >
                {tipo}
              </div>
              <div style={css("font-weight:700;font-size:14px;margin-top:10px")}>{uso}</div>
              <div
                style={css(
                  "margin-top:8px;font-size:12px;line-height:1.5;font-family:'IBM Plex Mono',monospace;background:#fff;border:3px solid #120720;padding:8px"
                )}
              >
                {ejemplo}
              </div>
            </div>
          ))}
        </div>

        <div
          style={css(
            "margin-top:18px;background:#3B0764;border:4px solid #FF6FD8;padding:18px;font-size:14px;line-height:1.6"
          )}
        >
          <strong style={css("color:#FF6FD8")}>{"Evite:"}</strong>
          {" mensajes vagos ("}
          <code style={css("background:#120720;color:#C6FF3D;padding:2px 6px")}>{"update"}</code>
          {", "}
          <code style={css("background:#120720;color:#C6FF3D;padding:2px 6px")}>{"cambios"}</code>
          {", "}
          <code style={css("background:#120720;color:#C6FF3D;padding:2px 6px")}>{"asdf"}</code>
          {"), commits gigantes de toda la semana y mezclar docs + lógica en el mismo commit."}
        </div>

        <h3
          style={css(
            "font-family:'Archivo Black',sans-serif;font-size:24px;margin:42px 0 0;text-transform:uppercase;color:#C6FF3D"
          )}
        >
          {"GitFlow del proyecto"}
        </h3>

        <p style={css("max-width:840px;font-size:15px;line-height:1.65;margin:14px 0 0")}>
          {"Flujo corto pensado para 4 semanas y un solo desarrollador. Cumple el versionamiento del enunciado sin overhead de release branches."}
        </p>

        <Proyecto1GitTree />

        <div
          style={css(
            "display:flex;flex-direction:column;gap:12px;margin-top:22px;background:#1A0B2E;border:5px solid #C6FF3D;box-shadow:12px 12px 0 #7C3AED;padding:22px"
          )}
        >
          {[
            [
              "1",
              "main",
              "Rama principal siempre compilable. Solo recibe merges de features terminadas. Aquí viven los tags de release.",
            ],
            [
              "2",
              "feature/<nombre>",
              "Una rama por entrega parcial: feature/tda, feature/matriz, feature/xml, feature/ruta, feature/graphviz, feature/docs.",
            ],
            [
              "3",
              "merge → main",
              "Cuando la feature compila y se puede demostrar, haga merge a main (PR o merge local) y borre la rama feature.",
            ],
            [
              "4",
              "tag vX.Y.Z + Release",
              "Al cerrar cada semana cree un tag anotado y un GitHub Release. Ese es el evidencia de avance continuo.",
            ],
          ].map(([n, title, body]) => (
            <div
              key={n}
              style={css(
                "display:flex;gap:14px;flex-wrap:wrap;align-items:flex-start;background:#120720;border:3px solid #7C3AED;padding:14px"
              )}
            >
              <div
                style={css(
                  "flex:0 0 48px;height:48px;background:#C6FF3D;color:#120720;border:3px solid #120720;display:grid;place-items:center;font-family:'Archivo Black',sans-serif;font-size:22px"
                )}
              >
                {n}
              </div>
              <div style={css("flex:1 1 260px")}>
                <div
                  style={css(
                    "font-family:'IBM Plex Mono',monospace;font-size:14px;font-weight:700;color:#C6FF3D"
                  )}
                >
                  {title}
                </div>
                <div style={css("font-size:14px;line-height:1.55;margin-top:4px")}>{body}</div>
              </div>
            </div>
          ))}
        </div>

        <h3
          style={css(
            "font-family:'Archivo Black',sans-serif;font-size:24px;margin:42px 0 0;text-transform:uppercase;color:#C6FF3D"
          )}
        >
          {"Plan de 4 releases"}
        </h3>

        <div
          style={css(
            "display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:14px;margin-top:18px"
          )}
        >
          {[
            [
              "v1.0.0",
              "Semana 1",
              "Repo, .gitignore, README, TDA (Lista/Pila/Cola) y esqueleto de clases. Tag cuando compile el menú vacío.",
            ],
            [
              "v2.0.0",
              "Semana 2",
              "MatrizCiudad, robots y carga XML. Tag cuando pueda listar ciudades/robots desde el archivo de configuración.",
            ],
            [
              "v3.0.0",
              "Semana 3",
              "Misiones de rescate y extracción con camino válido (o Misión Imposible). Tag con al menos un caso feliz.",
            ],
            [
              "v4.0.0",
              "Semana 4 · FINAL",
              "Graphviz (.dot/.png), pulido del menú y docs/ con el ensayo. Este release es el que se califica.",
            ],
          ].map(([tag, week, body]) => (
            <div
              key={tag}
              style={css(
                "background:#EDE4FF;color:#120720;border:4px solid #120720;box-shadow:8px 8px 0 #7C3AED;padding:18px"
              )}
            >
              <div
                style={css(
                  "font-family:'Archivo Black',sans-serif;font-size:22px;color:#3B0764;line-height:1"
                )}
              >
                {tag}
              </div>
              <div
                style={css(
                  "margin-top:6px;font-size:11px;font-weight:700;letter-spacing:1.5px;color:#7C3AED"
                )}
              >
                {week}
              </div>
              <p style={css("font-size:13.5px;line-height:1.55;margin:10px 0 0")}>{body}</p>
            </div>
          ))}
        </div>

        <div
          style={css(
            "margin-top:28px;display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px"
          )}
        >
          <div style={css("background:#C6FF3D;color:#120720;border:4px solid #120720;padding:18px")}>
            <div style={css("font-weight:700;font-size:13px;letter-spacing:1.5px")}>
              {"COMANDOS ÚTILES"}
            </div>
            <div
              style={css(
                "margin-top:10px;font-size:12px;line-height:1.7;font-family:'IBM Plex Mono',monospace;white-space:pre-wrap"
              )}
            >
              {"git checkout -b feature/xml\n"}
              {"git commit -m \"feat(xml): cargar ciudades y robots\"\n"}
              {"git checkout main && git merge feature/xml\n"}
              {"git tag -a v2.0.0 -m \"Release 2: XML y modelo\"\n"}
              {"git push origin main --tags"}
            </div>
          </div>

          <div style={css("background:#FF6FD8;color:#120720;border:4px solid #120720;padding:18px")}>
            <div style={css("font-weight:700;font-size:13px;letter-spacing:1.5px")}>
              {"REGLAS DEL ENUNCIADO"}
            </div>
            <ul style={css("margin:10px 0 0;padding-left:18px;font-size:14px;line-height:1.6")}>
              <li>{"Repo: IPC2_Proy01_202602_#Carnet"}</li>
              <li>{"4 releases mínimo, uno por semana"}</li>
              <li>{"El último release es el final, antes de la entrega"}</li>
              <li>{"Se califica desde ese release hasta la fecha límite"}</li>
              <li>{"Agregar auxiliares como colaboradores (jorgemejia25)"}</li>
              <li>{"Documentación en carpeta separada del código"}</li>
            </ul>
          </div>

          <div style={css("background:#7C3AED;color:#fff;border:4px solid #120720;padding:18px")}>
            <div
              style={css("font-weight:700;font-size:13px;letter-spacing:1.5px;color:#C6FF3D")}
            >
              {"POR QUÉ ESTE FLUJO"}
            </div>
            <p style={css("font-size:14px;line-height:1.6;margin:10px 0 0")}>
              {"Demuestra avance continuo, deja historial legible para revisión y evita perder trabajo ante fallos o regresiones. No necesita hotfix/release branches: con tags semanales basta para este curso."}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
