// @ts-nocheck
"use client"

import { CodeBlock } from "@/components/code-block"
import { css } from "@/components/dc/css"
import { useDcLogic } from "@/components/dc/use-dc-logic"
import { TdaLabLogic } from "@/components/labs/tda-lab/logic"

const ARTIFACT_CSS = `
.dc-artifact--tda-lab,.dc-artifact--tda-lab *{ box-sizing: border-box; }
.dc-artifact--tda-lab{
  margin: 0;
  color: #160B2E;
  background-color: #E4DCFF;
  background-image:
    radial-gradient(circle at 1px 1px, rgba(22,11,46,0.16) 1.2px, transparent 0),
    radial-gradient(ellipse 75% 50% at 8% -8%, rgba(124,58,237,0.28), transparent 55%),
    radial-gradient(ellipse 55% 40% at 100% 0%, rgba(198,255,61,0.22), transparent 50%),
    linear-gradient(165deg, #D8CCFF 0%, #EDE6FF 45%, #E4DCFF 100%);
  background-size: 24px 24px, auto, auto, auto;
  background-attachment: fixed;
}
.dc-artifact--tda-lab a{ color: #160B2E; text-decoration: underline 3px #7C3AED; }
.dc-artifact--tda-lab a:hover{ background: #C6FF3D; color: #160B2E; }
.dc-artifact--tda-lab button:hover{ filter: brightness(0.97); }
.dc-artifact--tda-lab ::selection{ background: #C6FF3D; color: #160B2E; }
.dc-artifact--tda-lab textarea:focus,
.dc-artifact--tda-lab input:focus{ outline: 4px solid #7C3AED; }
.dc-artifact--tda-lab > *{ position: relative; z-index: 1; }
@keyframes tdaPop { from { opacity: 0; transform: translateY(12px) scale(0.96); } to { opacity: 1; transform: none; } }
@keyframes tdaPulse { 0%,100% { transform: scale(1); } 50% { transform: scale(1.06); } }
@keyframes tdaSlideIn { from { opacity: 0; transform: translateX(-18px); } to { opacity: 1; transform: none; } }
@keyframes tdaSlideRight { from { opacity: 0; transform: translateX(24px); } to { opacity: 1; transform: none; } }
@keyframes tdaGlow { 0%,100% { box-shadow: 0 0 0 0 rgba(198,255,61,0); } 50% { box-shadow: 0 0 0 6px rgba(198,255,61,0.55); } }
@keyframes tdaArrow { 0%,100% { transform: translateX(0); } 50% { transform: translateX(6px); } }
`

const CODE_NODO = `public class Nodo<T>
{
    private T dato;
    private Nodo<T> siguiente;

    public Nodo(T dato)
    {
        this.dato = dato;
        this.siguiente = null;
    }

    public T Dato { get { return dato; } set { dato = value; } }
    public Nodo<T> Siguiente { get { return siguiente; } set { siguiente = value; } }
}`

const CODE_LISTA = `public class ListaSimple<T>
{
    private Nodo<T> primero;
    private int cantidad;

    public void Insertar(T dato)
    {
        Nodo<T> nuevo = new Nodo<T>(dato);
        if (primero == null) { primero = nuevo; }
        else
        {
            Nodo<T> actual = primero;
            while (actual.Siguiente != null)
                actual = actual.Siguiente;
            actual.Siguiente = nuevo;
        }
        cantidad++;
    }
}`

const CODE_PILA = `public class Pila<T>
{
    private Nodo<T> tope;

    public void Apilar(T dato)
    {
        Nodo<T> nuevo = new Nodo<T>(dato);
        nuevo.Siguiente = tope;
        tope = nuevo;
    }

    public T Desapilar()
    {
        if (EstaVacia()) throw new InvalidOperationException("Pila vacía");
        T dato = tope.Dato;
        tope = tope.Siguiente;
        return dato;
    }

    public bool EstaVacia() { return tope == null; }
}`

const CODE_COLA = `public class Cola<T>
{
    private Nodo<T> frente;
    private Nodo<T> final;

    public void Encolar(T dato)
    {
        Nodo<T> nuevo = new Nodo<T>(dato);
        if (EstaVacia()) { frente = final = nuevo; }
        else { final.Siguiente = nuevo; final = nuevo; }
    }

    public T Desencolar()
    {
        if (EstaVacia()) throw new InvalidOperationException("Cola vacía");
        T dato = frente.Dato;
        frente = frente.Siguiente;
        if (frente == null) final = null;
        return dato;
    }

    public bool EstaVacia() { return frente == null; }
}`

const CODE_MATRIZ = `public class NodoCelda
{
    public string Valor;
    public int Fila, Columna;
    public NodoCelda Arriba, Abajo, Izquierda, Derecha;
}

// Acceso por punteros, no por índices de arreglo:
// Obtener(f,c): partir de inicio, bajar f-1 veces, avanzar c-1 a la derecha.`

type NavLink = { href: string; label: string; accent?: boolean }

const NAV: NavLink[] = [
  { href: "#que-es", label: "QUÉ ES" },
  { href: "#usos", label: "USOS" },
  { href: "#nodo", label: "NODO" },
  { href: "#lista", label: "LISTA" },
  { href: "#pila", label: "PILA" },
  { href: "#cola", label: "COLA" },
  { href: "#matriz", label: "MATRIZ" },
  { href: "#comparar", label: "COMPARAR" },
  { href: "#proyecto", label: "PROYECTO" },
  { href: "#referencia", label: "REFERENCIA" },
  { href: "/proyecto1", label: "PROYECTO 1 →", accent: true },
]

/**
 * Shared section chrome: eyebrow + title + optional lead.
 */
function SectionHead({
  eyebrow,
  title,
  lead,
}: {
  eyebrow: string
  title: string
  lead?: string
}) {
  return (
    <>
      <div
        style={css(
          "font-size:15px;font-weight:800;letter-spacing:0.2em;border-bottom:6px solid #160B2E;padding-bottom:12px;margin-bottom:30px"
        )}
      >
        {eyebrow}
      </div>
      <h2
        style={css(
          "font-family:'Archivo Black',sans-serif;font-size:clamp(36px,6vw,62px);margin:0 0 16px 0;line-height:0.94;text-transform:uppercase;letter-spacing:-0.03em"
        )}
      >
        {title}
      </h2>
      {lead ? (
        <p
          style={css(
            "margin:0 0 28px 0;font-size:20px;font-weight:700;max-width:78ch;line-height:1.5"
          )}
        >
          {lead}
        </p>
      ) : null}
    </>
  )
}

/**
 * Action button for interactive demos.
 */
function DemoBtn({
  label,
  onClick,
  accent = false,
  disabled = false,
}: {
  label: string
  onClick: () => void
  accent?: boolean
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      style={css(
        `border:5px solid #160B2E;background:${accent ? "#C6FF3D" : "#FFF"};padding:10px 16px;font-family:inherit;font-size:14px;font-weight:800;cursor:pointer`
      )}
    >
      {label}
    </button>
  )
}

/**
 * Console strip shared by interactive panels.
 */
function LogBar({ log, lastOp }: { log: string; lastOp: string }) {
  return (
    <div
      style={css(
        "border:5px solid #160B2E;background:#160B2E;color:#EDE6FF;padding:12px 16px;display:flex;gap:14px;align-items:center;flex-wrap:wrap;font-size:14px;font-weight:700"
      )}
    >
      {lastOp ? (
        <span
          style={css(
            "background:#C6FF3D;color:#160B2E;border:3px solid #C6FF3D;padding:3px 10px;letter-spacing:0.08em;font-size:12px;font-weight:800"
          )}
        >
          {lastOp}
        </span>
      ) : null}
      <span style={css("flex:1;min-width:200px")}>{log}</span>
    </div>
  )
}

/**
 * Use-case chip list for a structure.
 */
function UseList({ items }: { items: string[] }) {
  return (
    <ul style={css("margin:0;padding-left:20px;font-size:15px;font-weight:700;line-height:1.7")}>
      {items.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  )
}

/**
 * TDA laboratory: general theory, uses and animated interactive demos.
 */
export function TdaLabView() {
  const v = useDcLogic(TdaLabLogic, {})

  const listaNodos =
    (v.listaNodos as Array<{
      key: string
      dato: string
      esPrimero: boolean
      esUltimo: boolean
      walking: boolean
      pulse: boolean
    }>) || []
  const pilaNodos =
    (v.pilaNodos as Array<{ key: string; label: string; bg: string; esTope: boolean }>) || []
  const colaNodos =
    (v.colaNodos as Array<{
      key: string
      dato: string
      bg: string
      esFrente: boolean
      esFinal: boolean
    }>) || []
  const filas =
    (v.filas as Array<{
      key: number
      celdas: Array<{
        key: number
        label: string
        bg: string
        title: string
        pick: () => void
      }>
    }>) || []
  const vecinos =
    (v.vecinos as Array<{
      key: number
      dir: string
      dest: string
      ok: boolean
      bg: string
      fg: string
    }>) || []

  const listaBusy = Boolean(v.listaBusy)
  const pilaBusy = Boolean(v.pilaBusy)
  const colaBusy = Boolean(v.colaBusy)
  const matrizBusy = Boolean(v.matrizBusy)
  const pilaPulse = String(v.pilaPulse || "")
  const colaPulse = String(v.colaPulse || "")

  return (
    <div className="dc-artifact dc-artifact--tda-lab">
      <style>{`${ARTIFACT_CSS}
.dc-artifact--tda-lab { min-height: 100%; font-family: var(--font-lab-mono), ui-monospace, monospace; }
.dc-artifact--tda-lab h1, .dc-artifact--tda-lab h2 {
  font-family: var(--font-display), sans-serif;
}
`}</style>

      <div
        style={css(
          "font-family:'JetBrains Mono',ui-monospace,monospace;color:#160B2E;background: transparent"
        )}
      >
        <header
          style={css(
            "position:sticky;top:0;z-index:20;background:#160B2E;color:#EDE6FF;border-bottom:8px solid #7C3AED;display:flex;align-items:center;justify-content:space-between;gap:24px;padding:14px 32px;flex-wrap:wrap"
          )}
        >
          <div
            style={css(
              "font-family:'Archivo Black',sans-serif;font-size:24px;letter-spacing:-0.02em"
            )}
          >
            {"TDA"}
            <span style={css("color:#C6FF3D")}>{"."}</span>
            {"LAB"}
          </div>

          <nav
            style={css(
              "display:flex;gap:8px;flex-wrap:wrap;font-size:13px;font-weight:800;letter-spacing:0.1em"
            )}
          >
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                style={css(
                  item.accent
                    ? "color:#160B2E;text-decoration:none;border:2px solid #C6FF3D;background:#C6FF3D;padding:7px 12px"
                    : "color:#EDE6FF;text-decoration:none;border:2px solid #4A4A4A;padding:7px 12px"
                )}
              >
                {item.label}
              </a>
            ))}
          </nav>
        </header>

        {/* HERO */}
        <section
          style={css(
            "padding:90px 48px 70px;border-bottom:10px solid #160B2E;max-width:1500px;margin:0 auto"
          )}
        >
          <div
            style={css(
              "display:flex;gap:0;font-size:15px;font-weight:800;letter-spacing:0.2em;margin-bottom:34px;flex-wrap:wrap"
            )}
          >
            <div style={css("background:#160B2E;color:#EDE6FF;padding:10px 18px")}>
              {"IPC2 · LABORATORIO"}
            </div>
            <div style={css("background:#C6FF3D;color:#160B2E;padding:10px 18px")}>
              {"MEMORIA DINÁMICA"}
            </div>
          </div>

          <h1
            style={css(
              "font-family:'Archivo Black',sans-serif;font-size:clamp(64px,12vw,148px);line-height:0.82;margin:0;letter-spacing:-0.045em;text-transform:uppercase"
            )}
          >
            {"TIPOS DE"}
            <br />
            {"DATO"}
            <br />
            {"ABSTRACTO"}
            <span style={css("color:#7C3AED")}>{"."}</span>
          </h1>

          <p
            style={css(
              "margin:36px 0 0;font-size:22px;font-weight:700;max-width:52ch;line-height:1.45"
            )}
          >
            {
              "Contrato, operaciones y representación interna. Explore nodo, lista, pila, cola y matriz enlazada con demostraciones animadas; al final se muestra su aplicación en el Proyecto 1."
            }
          </p>

          <div
            style={css(
              "display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;margin-top:40px"
            )}
          >
            {[
              ["01", "Nodo", "Pieza enlazada"],
              ["02", "Lista", "Secuencia dinámica"],
              ["03", "Pila", "LIFO"],
              ["04", "Cola", "FIFO"],
              ["05", "Matriz", "Malla por punteros"],
            ].map(([n, t, d]) => (
              <div
                key={n}
                style={css("border:6px solid #160B2E;background:#FFF;padding:18px 20px")}
              >
                <div
                  style={css(
                    "font-size:13px;font-weight:800;letter-spacing:0.16em;color:#7C3AED"
                  )}
                >
                  {n}
                </div>
                <div
                  style={css(
                    "font-family:'Archivo Black',sans-serif;font-size:26px;margin-top:8px;line-height:1"
                  )}
                >
                  {t}
                </div>
                <div style={css("margin-top:8px;font-size:15px;font-weight:700")}>{d}</div>
              </div>
            ))}
          </div>
        </section>

        {/* QUÉ ES */}
        <section
          id="que-es"
          style={css(
            "padding:70px 48px;border-bottom:10px solid #160B2E;max-width:1500px;margin:0 auto"
          )}
        >
          <SectionHead
            eyebrow="01 · FUNDAMENTO"
            title="QUÉ ES UN TDA"
            lead="Un Tipo de Dato Abstracto define qué operaciones existen y qué garantiza cada una, sin fijar aún cómo se guardan los datos en memoria."
          />

          <div
            style={css(
              "display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px"
            )}
          >
            {[
              {
                t: "Contrato",
                d: "Operaciones públicas: Insertar, Apilar, Encolar, Obtener. El cliente del TDA no manipula punteros a mano.",
                bg: "#FFF",
              },
              {
                t: "Representación",
                d: "Nodos, enlaces y referencias internas. Puede cambiarse la implementación si el contrato se mantiene.",
                bg: "#FFF",
              },
              {
                t: "Memoria dinámica",
                d: "Cada operación crea o libera nodos según necesidad. El tamaño crece y se reduce en tiempo de ejecución.",
                bg: "#C6FF3D",
              },
            ].map((card) => (
              <div
                key={card.t}
                style={css(
                  `border:8px solid #160B2E;background:${card.bg};padding:26px;display:grid;gap:12px`
                )}
              >
                <div
                  style={css(
                    "font-family:'Archivo Black',sans-serif;font-size:28px;line-height:1"
                  )}
                >
                  {card.t}
                </div>
                <p style={css("margin:0;font-size:17px;font-weight:700;line-height:1.5")}>
                  {card.d}
                </p>
              </div>
            ))}
          </div>

          <div
            style={css(
              "margin-top:24px;border:8px solid #160B2E;background:#160B2E;color:#EDE6FF;padding:28px;display:grid;gap:12px"
            )}
          >
            <div
              style={css(
                "font-size:14px;font-weight:800;letter-spacing:0.18em;color:#C6FF3D"
              )}
            >
              {"IDEA CENTRAL"}
            </div>
            <p style={css("margin:0;font-size:18px;font-weight:700;line-height:1.55;max-width:70ch")}>
              {
                "Lista, pila y cola pueden construirse sobre el mismo Nodo<T>. Lo que cambia es la política de acceso: dónde se inserta y de dónde se extrae."
              }
            </p>
          </div>
        </section>

        {/* USOS */}
        <section
          id="usos"
          style={css(
            "padding:70px 48px;border-bottom:10px solid #160B2E;max-width:1500px;margin:0 auto"
          )}
        >
          <SectionHead
            eyebrow="02 · CUÁNDO USAR CADA UNO"
            title="USOS FRECUENTES"
            lead="Elija la estructura según el orden de acceso que el problema exige, no según el nombre familiar del lenguaje."
          />

          <div
            style={css(
              "display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:18px"
            )}
          >
            {[
              {
                title: "Lista simple",
                role: "SECUENCIA",
                color: "#FF6BD6",
                items: [
                  "Catálogos y colecciones de tamaño variable",
                  "Historial lineal de eventos",
                  "Recorrido completo desde el primero",
                  "Cuando el orden de inserción importa y se recorre con frecuencia",
                ],
              },
              {
                title: "Pila",
                role: "LIFO",
                color: "#C6FF3D",
                items: [
                  "Deshacer / rehacer (Ctrl+Z)",
                  "Evaluación de expresiones y llamados a función",
                  "Backtracking: explorar y retroceder",
                  "Inversión del orden de una secuencia",
                ],
              },
              {
                title: "Cola",
                role: "FIFO",
                color: "#6BE3FF",
                items: [
                  "Turnos y colas de atención",
                  "Buffers de impresión o mensajes",
                  "BFS / recorrido por niveles en grafos",
                  "Planificación justa: el primero en llegar es atendido primero",
                ],
              },
              {
                title: "Matriz enlazada",
                role: "MALLA",
                color: "#7C3AED",
                items: [
                  "Mapas y tableros con vecinos ortogonales",
                  "Grillas donde moverse es seguir punteros",
                  "Cuando no se desea un arreglo bidimensional fijo",
                  "Simulaciones espaciales celda a celda",
                ],
              },
            ].map((card) => (
              <div
                key={card.title}
                style={css(
                  `border:6px solid #160B2E;background:#FFF;box-shadow:10px 10px 0 ${card.color};padding:22px;display:grid;gap:12px`
                )}
              >
                <div style={css("display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap")}>
                  <div
                    style={css(
                      "font-family:'Archivo Black',sans-serif;font-size:26px;line-height:1"
                    )}
                  >
                    {card.title}
                  </div>
                  <div
                    style={css(
                      `background:${card.color};color:#160B2E;border:3px solid #160B2E;padding:4px 10px;font-size:12px;font-weight:800`
                    )}
                  >
                    {card.role}
                  </div>
                </div>
                <UseList items={card.items} />
              </div>
            ))}
          </div>
        </section>

        {/* NODO */}
        <section
          id="nodo"
          style={css(
            "padding:70px 48px;border-bottom:10px solid #160B2E;max-width:1500px;margin:0 auto"
          )}
        >
          <SectionHead
            eyebrow="03 · PIEZA BASE"
            title="EL NODO"
            lead="Unidad mínima de memoria dinámica: un valor y uno o más enlaces. Toda lista, pila o cola es una cadena de nodos."
          />

          <div
            style={css(
              "display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.1fr);gap:28px;align-items:start"
            )}
          >
            <div
              style={css(
                "border:8px solid #160B2E;background:#FFF;padding:28px;display:grid;gap:22px;justify-items:center"
              )}
            >
              <div
                style={css(
                  "display:flex;align-items:center;gap:0;flex-wrap:wrap;justify-content:center"
                )}
              >
                {["dato A", "dato B", "dato C"].map((label, i) => (
                  <div key={label} style={css("display:flex;align-items:center")}>
                    <div
                      style={css(
                        `border:6px solid #160B2E;display:grid;grid-template-columns:1fr 1fr;min-width:160px;animation:tdaPop 0.45s ease both ${i * 0.15}s`
                      )}
                    >
                      <div
                        style={css(
                          "background:#C6FF3D;padding:18px;font-weight:800;border-right:6px solid #160B2E;text-align:center;font-size:14px"
                        )}
                      >
                        {"dato"}
                        <div style={css("font-size:12px;margin-top:6px;font-weight:700")}>
                          {label}
                        </div>
                      </div>
                      <div
                        style={css(
                          "background:#FFF;padding:18px;font-weight:800;text-align:center;font-size:14px"
                        )}
                      >
                        {"sig"}
                        <div
                          style={css(
                            "font-size:18px;margin-top:4px;color:#7C3AED;animation:tdaArrow 1.2s ease infinite"
                          )}
                        >
                          {"→"}
                        </div>
                      </div>
                    </div>
                    {i < 2 ? (
                      <div
                        style={css(
                          "font-family:'Archivo Black',sans-serif;font-size:24px;padding:0 8px"
                        )}
                      >
                        {"→"}
                      </div>
                    ) : null}
                  </div>
                ))}
                <div
                  style={css(
                    "font-family:'Archivo Black',sans-serif;font-size:24px;padding:0 8px"
                  )}
                >
                  {"→"}
                </div>
                <div
                  style={css(
                    "border:6px solid #160B2E;background:#160B2E;color:#C6FF3D;padding:24px 18px;font-weight:800;animation:tdaPop 0.45s ease both 0.5s"
                  )}
                >
                  {"null"}
                </div>
              </div>
              <div style={css("font-size:15px;font-weight:700;text-align:center;max-width:42ch")}>
                {
                  "Nodo<T> es genérico: la misma clase almacena string, enteros u objetos del dominio. El último enlace apunta a null."
                }
              </div>
            </div>

            <div style={css("border:8px solid #160B2E;background:#160B2E;overflow:hidden")}>
              <CodeBlock
                code={CODE_NODO}
                language="csharp"
                variant="dark"
                style={css(
                  "padding:22px;font-size:14px;line-height:1.65;overflow:auto;max-height:420px"
                )}
              />
            </div>
          </div>
        </section>

        {/* LISTA */}
        <section
          id="lista"
          style={css(
            "padding:70px 48px;border-bottom:10px solid #160B2E;max-width:1500px;margin:0 auto"
          )}
        >
          <SectionHead
            eyebrow="04 · LISTA SIMPLE · interactivo"
            title="LISTA ENCADENADA"
            lead="Inserción al final: se recorre desde primero hasta el nodo cuyo Siguiente es null, y ahí se enlaza el nuevo. Observe el recorrido animado."
          />

          <div
            style={css(
              "display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:28px;align-items:start"
            )}
          >
            <div style={css("border:8px solid #160B2E;background:#FFF;padding:24px;display:grid;gap:18px")}>
              <div style={css("display:flex;gap:10px;flex-wrap:wrap;align-items:center")}>
                <input
                  value={String(v.listaInput ?? "")}
                  onChange={v.setListaInput as (e: React.ChangeEvent<HTMLInputElement>) => void}
                  disabled={listaBusy}
                  style={css(
                    "border:5px solid #160B2E;padding:12px;font-family:inherit;font-size:16px;font-weight:700;min-width:140px;flex:1"
                  )}
                />
                <DemoBtn
                  label="Insertar"
                  onClick={v.insertarLista as () => void}
                  accent
                  disabled={listaBusy}
                />
                <DemoBtn
                  label="Quitar último"
                  onClick={v.eliminarLista as () => void}
                  disabled={listaBusy}
                />
                <DemoBtn
                  label="Demo animada"
                  onClick={v.autoDemoLista as () => void}
                  disabled={listaBusy}
                />
                <DemoBtn
                  label="Restablecer"
                  onClick={v.resetLista as () => void}
                  disabled={listaBusy}
                />
              </div>

              <div
                style={css(
                  "display:flex;align-items:center;gap:8px;flex-wrap:wrap;min-height:88px;padding:14px;background:#F4EFFF;border:5px solid #160B2E"
                )}
              >
                <div
                  style={css(
                    "font-size:12px;font-weight:800;letter-spacing:0.12em;padding:6px 8px;border:3px solid #160B2E;background:#FFF"
                  )}
                >
                  {"primero"}
                </div>
                <div style={css("font-weight:800;color:#7C3AED")}>{"→"}</div>
                {listaNodos.length === 0 ? (
                  <div style={css("font-weight:800;opacity:0.5")}>{"(vacía · null)"}</div>
                ) : (
                  listaNodos.map((n) => (
                    <div key={n.key} style={css("display:flex;align-items:center;gap:8px")}>
                      <div
                        style={{
                          ...css(
                            `border:5px solid #160B2E;padding:12px 14px;font-weight:800;min-width:72px;text-align:center;background:${n.walking ? "#C6FF3D" : n.pulse ? "#7CFF9E" : n.esPrimero ? "#E0D4FF" : "#FFF"}`
                          ),
                          animation: n.pulse
                            ? "tdaPop 0.4s ease both"
                            : n.walking
                              ? "tdaGlow 0.8s ease infinite"
                              : undefined,
                        }}
                      >
                        {n.dato}
                        {n.esUltimo ? (
                          <div style={css("font-size:11px;margin-top:4px;opacity:0.7")}>
                            {"último"}
                          </div>
                        ) : null}
                      </div>
                      <div
                        style={css(
                          `font-weight:800;color:${n.walking ? "#FF3B30" : "#7C3AED"};animation:${n.walking ? "tdaArrow 0.6s ease infinite" : "none"}`
                        )}
                      >
                        {"→"}
                      </div>
                    </div>
                  ))
                )}
                <div
                  style={css(
                    "border:4px solid #160B2E;background:#160B2E;color:#C6FF3D;padding:8px 12px;font-weight:800;font-size:13px"
                  )}
                >
                  {"null"}
                </div>
              </div>

              <LogBar log={String(v.log ?? "")} lastOp={String(v.lastOp ?? "")} />

              <div
                style={css(
                  "display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px"
                )}
              >
                <div style={css("border:4px solid #160B2E;padding:12px;font-size:14px;font-weight:700")}>
                  {"cantidad = "}
                  <strong>{String(v.listaCantidad ?? 0)}</strong>
                </div>
                <div style={css("border:4px solid #160B2E;padding:12px;font-size:14px;font-weight:700")}>
                  {"Acceso: O(n) al final · O(1) al primero"}
                </div>
              </div>
            </div>

            <div style={css("display:grid;gap:18px")}>
              <div style={css("border:8px solid #160B2E;background:#160B2E;overflow:hidden")}>
                <CodeBlock
                  code={CODE_LISTA}
                  language="csharp"
                  variant="dark"
                  style={css(
                    "padding:20px;font-size:13px;line-height:1.6;overflow:auto;max-height:320px"
                  )}
                />
              </div>
              <div
                style={css(
                  "border:6px solid #160B2E;background:#FFF;padding:18px;display:grid;gap:10px"
                )}
              >
                <div
                  style={css(
                    "font-size:13px;font-weight:800;letter-spacing:0.14em"
                  )}
                >
                  {"USOS"}
                </div>
                <UseList
                  items={[
                    "Lista de estudiantes, productos o ciudades",
                    "Ruta final como secuencia de celdas",
                    "Cualquier colección que se recorre de inicio a fin",
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* PILA */}
        <section
          id="pila"
          style={css(
            "padding:70px 48px;border-bottom:10px solid #160B2E;max-width:1500px;margin:0 auto"
          )}
        >
          <SectionHead
            eyebrow="05 · PILA · LIFO interactivo"
            title="ÚLTIMO EN ENTRAR, PRIMERO EN SALIR"
            lead="Apilar coloca un nodo sobre el tope. Desapilar retira únicamente ese tope. Ideal para deshacer acciones y para backtracking."
          />

          <div
            style={css(
              "display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.15fr);gap:28px;align-items:start"
            )}
          >
            <div style={css("border:8px solid #160B2E;background:#FFF;padding:24px;display:grid;gap:18px")}>
              <div style={css("display:flex;gap:10px;flex-wrap:wrap;align-items:center")}>
                <input
                  value={String(v.pilaInput ?? "")}
                  onChange={v.setPilaInput as (e: React.ChangeEvent<HTMLInputElement>) => void}
                  disabled={pilaBusy}
                  style={css(
                    "border:5px solid #160B2E;padding:12px;font-family:inherit;font-size:16px;font-weight:700;min-width:140px;flex:1"
                  )}
                />
                <DemoBtn label="Apilar" onClick={v.apilar as () => void} accent disabled={pilaBusy} />
                <DemoBtn
                  label="Desapilar"
                  onClick={v.desapilar as () => void}
                  disabled={pilaBusy}
                />
                <DemoBtn
                  label="Demo LIFO"
                  onClick={v.autoDemoPila as () => void}
                  disabled={pilaBusy}
                />
                <DemoBtn
                  label="Restablecer"
                  onClick={v.resetPila as () => void}
                  disabled={pilaBusy}
                />
              </div>

              <div
                style={css(
                  "display:grid;grid-template-columns:minmax(0,1fr) minmax(0,0.7fr);gap:16px;align-items:end"
                )}
              >
                <div
                  style={{
                    ...css(
                      "border:5px solid #160B2E;background:#F4EFFF;padding:16px;display:flex;flex-direction:column-reverse;gap:8px;min-height:260px;justify-content:flex-start"
                    ),
                    animation:
                      pilaPulse === "in"
                        ? "tdaPop 0.35s ease"
                        : pilaPulse === "out"
                          ? "tdaPulse 0.35s ease"
                          : undefined,
                  }}
                >
                  {pilaNodos.length === 0 ? (
                    <div style={css("font-weight:800;opacity:0.5;text-align:center")}>
                      {"pila vacía"}
                    </div>
                  ) : (
                    pilaNodos.map((n) => (
                      <div
                        key={n.key}
                        style={css(
                          `border:5px solid #160B2E;background:${n.bg};padding:12px 14px;font-weight:800;text-align:center;${n.esTope ? "animation:tdaGlow 1s ease infinite;" : ""}`
                        )}
                      >
                        {n.label}
                      </div>
                    ))
                  )}
                </div>

                <div style={css("display:grid;gap:12px")}>
                  <div
                    style={css(
                      "border:5px solid #160B2E;background:#C6FF3D;padding:14px;font-size:14px;font-weight:800"
                    )}
                  >
                    {"↑ TOPE (único punto de acceso)"}
                  </div>
                  <div
                    style={css(
                      "border:5px solid #160B2E;padding:14px;font-size:14px;font-weight:700;min-height:72px"
                    )}
                  >
                    {"Último desapilado: "}
                    <strong>{String(v.pilaLastOut || "—")}</strong>
                  </div>
                  <div
                    style={css(
                      "border:5px solid #160B2E;padding:14px;font-size:14px;font-weight:700"
                    )}
                  >
                    {"n = "}
                    {String(v.pilaCantidad ?? 0)}
                  </div>
                </div>
              </div>

              <LogBar log={String(v.log ?? "")} lastOp={String(v.lastOp ?? "")} />
            </div>

            <div style={css("display:grid;gap:18px")}>
              <div style={css("border:8px solid #160B2E;background:#160B2E;overflow:hidden")}>
                <CodeBlock
                  code={CODE_PILA}
                  language="csharp"
                  variant="dark"
                  style={css(
                    "padding:20px;font-size:13px;line-height:1.6;overflow:auto;max-height:280px"
                  )}
                />
              </div>
              <div
                style={css(
                  "border:6px solid #160B2E;background:#FFF;padding:18px;display:grid;gap:10px"
                )}
              >
                <div style={css("font-size:13px;font-weight:800;letter-spacing:0.14em")}>
                  {"USOS"}
                </div>
                <UseList
                  items={[
                    "Historial de deshacer en un editor",
                    "Pila de llamadas del procesador",
                    "Backtracking en laberintos o misiones",
                    "Comprobar paréntesis balanceados",
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* COLA */}
        <section
          id="cola"
          style={css(
            "padding:70px 48px;border-bottom:10px solid #160B2E;max-width:1500px;margin:0 auto"
          )}
        >
          <SectionHead
            eyebrow="06 · COLA · FIFO interactivo"
            title="PRIMERO EN LLEGAR, PRIMERO EN SALIR"
            lead="Encolar agrega al final. Desencolar retira del frente. El orden de llegada se preserva: justo para turnos y BFS."
          />

          <div
            style={css(
              "display:grid;grid-template-columns:minmax(0,1.25fr) minmax(0,1fr);gap:28px;align-items:start"
            )}
          >
            <div style={css("border:8px solid #160B2E;background:#FFF;padding:24px;display:grid;gap:18px")}>
              <div style={css("display:flex;gap:10px;flex-wrap:wrap;align-items:center")}>
                <input
                  value={String(v.colaInput ?? "")}
                  onChange={v.setColaInput as (e: React.ChangeEvent<HTMLInputElement>) => void}
                  disabled={colaBusy}
                  style={css(
                    "border:5px solid #160B2E;padding:12px;font-family:inherit;font-size:16px;font-weight:700;min-width:140px;flex:1"
                  )}
                />
                <DemoBtn
                  label="Encolar"
                  onClick={v.encolar as () => void}
                  accent
                  disabled={colaBusy}
                />
                <DemoBtn
                  label="Desencolar"
                  onClick={v.desencolar as () => void}
                  disabled={colaBusy}
                />
                <DemoBtn
                  label="Demo FIFO"
                  onClick={v.autoDemoCola as () => void}
                  disabled={colaBusy}
                />
                <DemoBtn
                  label="Restablecer"
                  onClick={v.resetCola as () => void}
                  disabled={colaBusy}
                />
              </div>

              <div
                style={css(
                  "display:flex;justify-content:space-between;gap:12px;flex-wrap:wrap;font-size:13px;font-weight:800;letter-spacing:0.1em"
                )}
              >
                <span style={css("background:#C6FF3D;border:3px solid #160B2E;padding:6px 10px")}>
                  {"FRENTE → sale"}
                </span>
                <span style={css("background:#6BE3FF;border:3px solid #160B2E;padding:6px 10px")}>
                  {"FINAL → entra"}
                </span>
              </div>

              <div
                style={{
                  ...css(
                    "display:flex;align-items:center;gap:10px;flex-wrap:wrap;min-height:96px;padding:16px;background:#F4EFFF;border:5px solid #160B2E"
                  ),
                  animation:
                    colaPulse === "in"
                      ? "tdaSlideRight 0.35s ease"
                      : colaPulse === "out"
                        ? "tdaSlideIn 0.35s ease"
                        : undefined,
                }}
              >
                {colaNodos.length === 0 ? (
                  <div style={css("font-weight:800;opacity:0.5")}>{"cola vacía"}</div>
                ) : (
                  colaNodos.map((n) => (
                    <div key={n.key} style={css("display:flex;align-items:center;gap:8px")}>
                      <div
                        style={css(
                          `border:5px solid #160B2E;background:${n.bg};padding:14px 16px;font-weight:800;min-width:90px;text-align:center;${n.esFrente ? "animation:tdaGlow 1s ease infinite;" : ""}`
                        )}
                      >
                        {n.dato}
                        <div style={css("font-size:11px;margin-top:4px;opacity:0.7")}>
                          {n.esFrente ? "frente" : n.esFinal ? "final" : "·"}
                        </div>
                      </div>
                      {!n.esFinal ? (
                        <div style={css("font-weight:800;color:#7C3AED")}>{"→"}</div>
                      ) : null}
                    </div>
                  ))
                )}
              </div>

              <div
                style={css(
                  "display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px"
                )}
              >
                <div style={css("border:4px solid #160B2E;padding:12px;font-size:14px;font-weight:700")}>
                  {"n = "}
                  {String(v.colaCantidad ?? 0)}
                </div>
                <div style={css("border:4px solid #160B2E;padding:12px;font-size:14px;font-weight:700")}>
                  {"Último desencolado: "}
                  <strong>{String(v.colaLastOut || "—")}</strong>
                </div>
              </div>

              <LogBar log={String(v.log ?? "")} lastOp={String(v.lastOp ?? "")} />
            </div>

            <div style={css("display:grid;gap:18px")}>
              <div style={css("border:8px solid #160B2E;background:#160B2E;overflow:hidden")}>
                <CodeBlock
                  code={CODE_COLA}
                  language="csharp"
                  variant="dark"
                  style={css(
                    "padding:20px;font-size:13px;line-height:1.6;overflow:auto;max-height:280px"
                  )}
                />
              </div>
              <div
                style={css(
                  "border:6px solid #160B2E;background:#FFF;padding:18px;display:grid;gap:10px"
                )}
              >
                <div style={css("font-size:13px;font-weight:800;letter-spacing:0.14em")}>
                  {"USOS"}
                </div>
                <UseList
                  items={[
                    "Fila de clientes o tickets de soporte",
                    "Cola de impresión / mensajes",
                    "BFS: pendientes por visitar en un grafo",
                    "Procesamiento en orden de llegada",
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* MATRIZ */}
        <section
          id="matriz"
          style={css(
            "padding:70px 48px;border-bottom:10px solid #160B2E;max-width:1500px;margin:0 auto"
          )}
        >
          <SectionHead
            eyebrow="07 · MATRIZ ENLAZADA · interactivo"
            title="MALLA POR PUNTEROS"
            lead="Cada celda conoce a sus vecinos (Arriba, Abajo, Izquierda, Derecha). Seleccione una celda y ejecute el recorrido desde el inicio para ver cómo Obtener(f,c) camina por enlaces."
          />

          <div
            style={css(
              "display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:28px;align-items:start"
            )}
          >
            <div style={css("border:8px solid #160B2E;background:#FFF;padding:24px;display:grid;gap:18px")}>
              <div style={css("display:flex;gap:10px;flex-wrap:wrap")}>
                <DemoBtn
                  label="Caminar desde inicio"
                  onClick={v.demoCaminarMatriz as () => void}
                  accent
                  disabled={matrizBusy}
                />
                <DemoBtn
                  label="Restablecer mapa"
                  onClick={v.resetMatriz as () => void}
                  disabled={matrizBusy}
                />
              </div>

              <div style={css("display:grid;gap:6px;justify-content:start")}>
                {filas.map((row) => (
                  <div key={row.key} style={css("display:flex;gap:6px")}>
                    {row.celdas.map((c) => (
                      <button
                        key={c.key}
                        type="button"
                        title={c.title}
                        onClick={c.pick}
                        disabled={matrizBusy}
                        style={css(
                          `width:64px;height:64px;border:5px solid #160B2E;background:${c.bg};font-family:inherit;font-size:18px;font-weight:800;cursor:pointer`
                        )}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                ))}
              </div>

              <div
                style={css(
                  "display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px"
                )}
              >
                {vecinos.map((vec) => (
                  <div
                    key={vec.key}
                    style={css(
                      `border:4px solid #160B2E;background:${vec.bg};color:${vec.fg};padding:12px;font-size:14px;font-weight:700`
                    )}
                  >
                    <strong>{vec.dir}</strong>
                    {" → "}
                    {vec.dest}
                  </div>
                ))}
              </div>

              <div
                style={css(
                  "display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;font-size:14px;font-weight:700"
                )}
              >
                <div style={css("border:4px solid #160B2E;padding:12px")}>
                  {"Foco: "}
                  <strong>{String(v.selCoord)}</strong>
                </div>
                <div style={css("border:4px solid #160B2E;padding:12px")}>
                  {"Valor: "}
                  <strong>{String(v.selContenido)}</strong>
                </div>
              </div>

              <LogBar log={String(v.log ?? "")} lastOp={String(v.lastOp ?? "")} />
            </div>

            <div style={css("display:grid;gap:18px")}>
              <div style={css("border:8px solid #160B2E;background:#160B2E;overflow:hidden")}>
                <CodeBlock
                  code={CODE_MATRIZ}
                  language="csharp"
                  variant="dark"
                  style={css(
                    "padding:20px;font-size:13px;line-height:1.6;overflow:auto;max-height:240px"
                  )}
                />
              </div>
              <div
                style={css(
                  "border:6px solid #160B2E;background:#FFF;padding:18px;display:grid;gap:10px"
                )}
              >
                <div style={css("font-size:13px;font-weight:800;letter-spacing:0.14em")}>
                  {"CÓMO FUNCIONA"}
                </div>
                <p style={css("margin:0;font-size:15px;font-weight:700;line-height:1.55")}>
                  {
                    "No existe matriz[f,c] de arreglo. Para llegar a (3,4) se parte de (1,1), se sigue Abajo dos veces y Derecha tres veces. Los vecinos resaltados son un salto de puntero."
                  }
                </p>
                <UseList
                  items={[
                    "Tableros y mapas de juego",
                    "Imágenes o mallas procesadas celda a celda",
                    "Cualquier espacio 2D con adyacencia ortogonal",
                  ]}
                />
              </div>
            </div>
          </div>
        </section>

        {/* COMPARAR */}
        <section
          id="comparar"
          style={css(
            "padding:70px 48px;border-bottom:10px solid #160B2E;max-width:1500px;margin:0 auto"
          )}
        >
          <SectionHead
            eyebrow="08 · DECISIÓN"
            title="LISTA · PILA · COLA"
            lead="Misma pieza (el nodo), distinta política de acceso. Use esta tabla para elegir."
          />

          <div style={css("overflow:auto;border:8px solid #160B2E;background:#FFF")}>
            <table style={css("width:100%;border-collapse:collapse;font-size:15px;font-weight:700")}>
              <thead>
                <tr style={css("background:#160B2E;color:#EDE6FF")}>
                  {["Criterio", "Lista", "Pila", "Cola"].map((h) => (
                    <th
                      key={h}
                      style={css(
                        "text-align:left;padding:16px 18px;border-right:4px solid #3A3A3A;letter-spacing:0.06em"
                      )}
                    >
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {[
                  ["Política", "Secuencia libre / recorrido", "LIFO", "FIFO"],
                  ["Insertar", "Al final (o posición)", "Solo en el tope", "Solo en el final"],
                  ["Extraer", "Según operación definida", "Solo del tope", "Solo del frente"],
                  ["Caso típico", "Catálogo, historial lineal", "Deshacer, backtracking", "Turnos, BFS"],
                  ["Complejidad clave", "O(n) al recorrer", "O(1) apilar/desapilar", "O(1) encolar/desencolar"],
                ].map((row, i) => (
                  <tr
                    key={row[0]}
                    style={css(
                      `background:${i % 2 === 0 ? "#FFF" : "#EDE6FF"};border-top:4px solid #160B2E`
                    )}
                  >
                    {row.map((cell, j) => (
                      <td
                        key={`${row[0]}-${j}`}
                        style={css(
                          `padding:14px 18px;border-right:3px solid #160B2E;${j === 0 ? "color:#7C3AED;font-weight:800" : ""}`
                        )}
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* PROYECTO */}
        <section
          id="proyecto"
          style={css(
            "padding:70px 48px;border-bottom:10px solid #160B2E;max-width:1500px;margin:0 auto"
          )}
        >
          <SectionHead
            eyebrow="09 · APLICACIÓN · Proyecto 1"
            title="EN PROYECTO 1"
            lead="Los mismos TDA resuelven el dominio del proyecto. Las estructuras genéricas viven en TDA/; el mapa tipado en Modelo/."
          />

          <div
            style={css(
              "display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:16px"
            )}
          >
            {[
              ["ListaSimple", "Ciudades, robots, entradas, militares y la ruta final."],
              ["Pila", "Backtracking en BuscadorRuta: avance y retroceso de celdas."],
              ["Cola", "Alternativa BFS / recorrido por niveles sobre el mapa."],
              ["MatrizCiudad", "Malla de NodoCelda con vecinos ortogonales."],
            ].map(([t, d]) => (
              <div
                key={t}
                style={css(
                  "border:6px solid #160B2E;background:#FFF;padding:20px;display:grid;gap:10px"
                )}
              >
                <div
                  style={css(
                    "font-family:'Archivo Black',sans-serif;font-size:24px;line-height:1"
                  )}
                >
                  {t}
                </div>
                <p style={css("margin:0;font-size:15px;font-weight:700;line-height:1.5")}>{d}</p>
              </div>
            ))}
          </div>

          <div
            style={css(
              "margin-top:22px;border:8px solid #160B2E;background:#C6FF3D;padding:22px;font-size:17px;font-weight:700;line-height:1.5"
            )}
          >
            <strong>{"Restricción del curso:"}</strong>
            {
              " no se admiten List, LinkedList, Queue, Stack ni arreglos como almacén principal de estos roles. Implemente las estructuras propias en src/TDA/."
            }
          </div>

          <div style={css("margin-top:18px")}>
            <a
              href="/proyecto1"
              style={css(
                "display:inline-block;border:6px solid #160B2E;background:#7C3AED;color:#FFF;text-decoration:none;padding:14px 22px;font-weight:800;font-size:16px"
              )}
            >
              {"Abrir enunciado del Proyecto 1 →"}
            </a>
          </div>
        </section>

        {/* REFERENCIA */}
        <section
          id="referencia"
          style={css("padding:70px 48px 90px;background:#160B2E;color:#EDE6FF")}
        >
          <div style={css("max-width:1500px;margin:0 auto")}>
            <div
              style={css(
                "font-size:15px;font-weight:800;letter-spacing:0.2em;border-bottom:6px solid #EDE6FF;padding-bottom:12px;margin-bottom:30px"
              )}
            >
              {"10 · REFERENCIA RÁPIDA"}
            </div>

            <div
              style={css(
                "display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px"
              )}
            >
              {[
                {
                  t: "Operaciones",
                  lines: [
                    "Lista: Insertar, ObtenerEn, Cantidad",
                    "Pila: Apilar, Desapilar, EstaVacia",
                    "Cola: Encolar, Desencolar, EstaVacia",
                    "Matriz: Obtener, vecinos ortogonales",
                  ],
                },
                {
                  t: "Invariantes",
                  lines: [
                    "Lista: primero apunta al inicio o null",
                    "Pila: solo se toca el tope",
                    "Cola: frente sale, final entra",
                    "Matriz: bordes tienen vecinos null",
                  ],
                },
                {
                  t: "No permitido en el curso",
                  lines: [
                    "List / LinkedList de .NET",
                    "Stack / Queue de .NET",
                    "Arreglos como almacén principal",
                    "Acceso por índices de arreglo en lugar de punteros",
                  ],
                },
              ].map((block) => (
                <div
                  key={block.t}
                  style={css(
                    "border:5px solid #EDE6FF;padding:22px;display:grid;gap:12px"
                  )}
                >
                  <div
                    style={css(
                      "font-family:'Archivo Black',sans-serif;font-size:24px;color:#C6FF3D"
                    )}
                  >
                    {block.t}
                  </div>
                  <ul
                    style={css(
                      "margin:0;padding-left:18px;font-size:15px;font-weight:700;line-height:1.7"
                    )}
                  >
                    {block.lines.map((line) => (
                      <li key={line}>{line}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
