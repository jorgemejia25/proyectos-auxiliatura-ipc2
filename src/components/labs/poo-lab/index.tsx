// @ts-nocheck
"use client"

import { CodeBlock } from "@/components/code-block"
import { css } from "@/components/dc/css"
import { useDcLogic } from "@/components/dc/use-dc-logic"
import { PooLabLogic } from "@/components/labs/poo-lab/logic"

const ARTIFACT_CSS = `
.dc-artifact--poo-lab,.dc-artifact--poo-lab *{ box-sizing: border-box; }
.dc-artifact--poo-lab{
  margin: 0;
  color: #1A0F0A;
  background-color: #FFF1E8;
  background-image: radial-gradient(ellipse 85% 50% at 12% -10%, rgba(255,77,0,0.18), transparent 55%),
radial-gradient(ellipse 65% 40% at 95% 5%, rgba(255,193,74,0.28), transparent 50%),
linear-gradient(180deg, #FFF1E8 0%, #FFF7F0 40%, #FFE8D6 100%);
  background-attachment: fixed;
}
.dc-artifact--poo-lab a{ color: #1A0F0A; text-decoration: underline 3px #FF4D00; }
.dc-artifact--poo-lab a:hover{ background: #FFC14A; color: #1A0F0A; }
.dc-artifact--poo-lab button:hover{ filter: brightness(0.97); }
.dc-artifact--poo-lab ::selection{ background: #FFC14A; color: #1A0F0A; }
.dc-artifact--poo-lab textarea:focus,
.dc-artifact--poo-lab input:focus{ outline: 4px solid #FF4D00; }
.dc-artifact--poo-lab::after{
  content:"";
  pointer-events:none;
  position:fixed;
  inset:0;
  z-index:0;
  opacity:0.045;
  background-image:url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E");
}
.dc-artifact--poo-lab > *{ position: relative; z-index: 1; }
@keyframes pooPop { 0%{ opacity:0; transform: scale(0.85) translateY(12px);} 60%{ transform: scale(1.04) translateY(-2px);} 100%{ opacity:1; transform:none;} }
@keyframes pooPulse { 0%,100%{ transform: scale(1);} 50%{ transform: scale(1.04);} }
@keyframes pooFlash { 0%{ box-shadow: 0 0 0 0 #FF4D00;} 100%{ box-shadow: 0 0 0 10px transparent;} }
@keyframes pooSlide { from{ opacity:0; transform: translateX(-16px);} to{ opacity:1; transform:none;} }
@keyframes pooBar { from{ width:0;} to{ width: var(--poo-bar);} }
@keyframes pooSpin { from{ transform: rotate(0deg);} to{ transform: rotate(360deg);} }
@keyframes pooFloat { 0%,100%{ transform: translateY(0);} 50%{ transform: translateY(-6px);} }
`

const CODE_CLASE = `public class Persona
{
    // Atributos (estado)
    public string Nombre;
    public int Edad;

    // Constructor
    public Persona(string nombre, int edad)
    {
        Nombre = nombre;
        Edad = edad;
    }

    // Método (comportamiento)
    public string Presentarse()
    {
        return $"Hola, soy {Nombre} y tengo {Edad} años";
    }
}

// Uso:
Persona a = new Persona("Ana", 20);
Persona b = new Persona("Luis", 22);
Console.WriteLine(a.Presentarse());`

const CODE_ENCAP = `public class Cuenta
{
    private decimal _saldo;   // oculto

    public decimal Saldo
    {
        get { return _saldo; }
        set
        {
            if (value < 0)
                throw new ArgumentException("Saldo inválido");
            _saldo = value;
        }
    }

    public void Depositar(decimal monto)
    {
        if (monto <= 0) throw new ArgumentException("Monto inválido");
        _saldo += monto;
    }
}`

const CODE_CTOR = `public class Cuenta
{
    public string Titular { get; private set; }
    public decimal Saldo { get; private set; }

    // Constructor: se ejecuta al hacer new
    public Cuenta(string titular, decimal saldoInicial)
    {
        Titular = titular;
        Saldo = saldoInicial < 0 ? 0 : saldoInicial;
    }

    // Constructor overload
    public Cuenta(string titular) : this(titular, 0) { }
}`

const CODE_HERENCIA = `public class Animal
{
    public string Nombre { get; set; }

    public virtual string Hablar()
    {
        return "...";
    }
}

public class Perro : Animal
{
    public override string Hablar()
    {
        return "Guau";
    }
}

public class Gato : Animal
{
    public override string Hablar()
    {
        return "Miau";
    }
}`

const CODE_POLY = `// Polimorfismo de runtime (virtual/override)
Animal a = new Perro();
Console.WriteLine(a.Hablar()); // Guau

a = new Gato();
Console.WriteLine(a.Hablar()); // Miau

// Overload (mismo nombre, distinta firma)
public class Calc
{
    public int Sumar(int a, int b) => a + b;
    public double Sumar(double a, double b) => a + b;
    public int Sumar(int a, int b, int c) => a + b + c;
}`

const CODE_ABSTRACT = `public abstract class Figura
{
    public abstract double CalcularArea();
}

public class Circulo : Figura
{
    public double Radio { get; set; }
    public override double CalcularArea() => Math.PI * Radio * Radio;
}

public class Cuadrado : Figura
{
    public double Lado { get; set; }
    public override double CalcularArea() => Lado * Lado;
}

// Figura f = new Figura(); // ERROR
Figura f = new Circulo { Radio = 4 };`

const CODE_INTERFACE = `public interface IVolador
{
    void Despegar();
    double Altitud { get; }
}

public class Avion : IVolador
{
    public double Altitud { get; private set; }
    public void Despegar() { Altitud = 3000; }
}

public class Drone : IVolador
{
    public double Altitud { get; private set; }
    public void Despegar() { Altitud = 120; }
}

// Una clase puede implementar varias interfaces
public class Pato : Animal, IVolador
{
    public double Altitud { get; private set; }
    public void Despegar() { Altitud = 40; }
    public override string Hablar() => "Cuac";
}`

const CODE_COMPOSICION = `public class Motor
{
    public bool Encendido { get; private set; }
    public int Rpm { get; private set; }

    public void Encender() { Encendido = true; Rpm = 900; }
    public void Apagar() { Encendido = false; Rpm = 0; }
    public void Acelerar() { if (Encendido) Rpm += 800; }
}

public class Auto
{
    // Composición: el Auto TIENE un Motor
    public Motor Motor { get; } = new Motor();
    public string Placa { get; set; }

    public void Acelerar() => Motor.Acelerar();
}`

const CODE_STATIC = `public class Persona
{
    // Compartido por TODAS las instancias
    public static int Contador { get; private set; }

    public string Nombre { get; set; }

    public Persona(string nombre)
    {
        Nombre = nombre;
        Contador++;
    }

    public static string InfoClase()
        => $"Se han creado {Contador} personas";
}

// Acceso sin instancia:
Console.WriteLine(Persona.Contador);
Console.WriteLine(Persona.InfoClase());`

type NavLink = { href: string; label: string; accent?: boolean }

const NAV: NavLink[] = [
  { href: "#mapa", label: "MAPA" },
  { href: "#clases", label: "CLASES" },
  { href: "#encap", label: "ENCAP" },
  { href: "#ctor", label: "CTOR" },
  { href: "#herencia", label: "HERENCIA" },
  { href: "#poly", label: "POLY" },
  { href: "#abstract", label: "ABSTRACT" },
  { href: "#interfaces", label: "INTERFACES" },
  { href: "#composicion", label: "COMPOSE" },
  { href: "#static", label: "STATIC" },
  { href: "#acceso", label: "ACCESO" },
  { href: "#quiz", label: "QUIZ" },
  { href: "/", label: "HUB →", accent: true },
]

/**
 * Shared section chrome: eyebrow + huge title + optional lead.
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
          "font-size:15px;font-weight:800;letter-spacing:0.2em;border-bottom:6px solid #1A0F0A;padding-bottom:12px;margin-bottom:30px"
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
 * Small action button for interactive demos.
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
        `border:5px solid #1A0F0A;background:${accent ? "#FFC14A" : "#FFF"};padding:10px 16px;font-family:inherit;font-size:14px;font-weight:800;cursor:${disabled ? "not-allowed" : "pointer"};opacity:${disabled ? 0.5 : 1}`
      )}
    >
      {label}
    </button>
  )
}

/**
 * Pill chip for concept maps.
 */
function Chip({ label, bg = "#FFF" }: { label: string; bg?: string }) {
  return (
    <span
      style={css(
        `display:inline-block;border:4px solid #1A0F0A;background:${bg};padding:8px 12px;font-size:13px;font-weight:800`
      )}
    >
      {label}
    </span>
  )
}

/**
 * POO laboratory: interactive C# object-oriented programming concepts.
 */
export function PooLabView() {
  const v = useDcLogic(PooLabLogic, {})

  const objetosCards =
    (v.objetosCards as Array<{
      key: number
      nombre: string
      edad: number
      pop: boolean
      presentar: () => void
      eliminar: () => void
    }>) || []

  const herenciaTree =
    (v.herenciaTree as Array<{
      id: string
      label: string
      level: number
      accent: string
      fg: string
      selected: boolean
      flash: boolean
      pick: () => void
    }>) || []

  const zooCards =
    (v.zooCards as Array<{
      key: number
      tipo: string
      activo: boolean
      color: string
      sonido: string
      pick: () => void
    }>) || []

  const ctorSteps =
    (v.ctorSteps as Array<{
      id: number
      label: string
      detail: string
      active: boolean
      done: boolean
    }>) || []

  const accessTable =
    (v.accessTable as Array<{
      mod: string
      misma: string
      hija: string
      ensamblado: string
      externo: string
    }>) || []

  const polyLog = (v.polyLog as string[]) || []
  const quiz = v.quiz as {
    q: string
    options: string[]
    answer: number
  }
  const animal = v.animal as {
    especie: string
    sonido: string
    color: string
    metodo: string
  }
  const polyAnimal = v.polyAnimal as {
    especie: string
    sonido: string
    color: string
    metodo: string
  }

  return (
    <div className="dc-artifact dc-artifact--poo-lab">
      <style>{`${ARTIFACT_CSS}
.dc-artifact--poo-lab { min-height: 100%; font-family: var(--font-lab-mono), ui-monospace, monospace; }
.dc-artifact--poo-lab h1, .dc-artifact--poo-lab h2 {
  font-family: var(--font-display), sans-serif;
}
`}</style>

      <div
        style={css(
          "font-family:'JetBrains Mono',ui-monospace,monospace;color:#1A0F0A;background: transparent"
        )}
      >
        <header
          style={css(
            "position:sticky;top:0;z-index:20;background:#1A0F0A;color:#FFF1E8;border-bottom:8px solid #FF4D00;display:flex;align-items:center;justify-content:space-between;gap:24px;padding:14px 32px;flex-wrap:wrap"
          )}
        >
          <div
            style={css(
              "font-family:'Archivo Black',sans-serif;font-size:24px;letter-spacing:-0.02em"
            )}
          >
            {"POO"}
            <span style={css("color:#FF4D00")}>{"."}</span>
            {"LAB"}
          </div>

          <nav
            style={css(
              "display:flex;gap:8px;flex-wrap:wrap;font-size:12px;font-weight:800;letter-spacing:0.08em"
            )}
          >
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                style={css(
                  item.accent
                    ? "color:#1A0F0A;text-decoration:none;border:2px solid #FFC14A;background:#FFC14A;padding:7px 10px"
                    : "color:#FFF1E8;text-decoration:none;border:2px solid #4A4A4A;padding:7px 10px"
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
            "padding:90px 48px 70px;border-bottom:10px solid #1A0F0A;max-width:1500px;margin:0 auto"
          )}
        >
          <div
            style={css(
              "display:flex;gap:0;font-size:15px;font-weight:800;letter-spacing:0.2em;margin-bottom:34px;flex-wrap:wrap"
            )}
          >
            <div style={css("background:#1A0F0A;color:#FFF1E8;padding:10px 18px")}>
              {"IPC2 · C#"}
            </div>
            <div style={css("background:#FF4D00;color:#FFF;padding:10px 18px")}>
              {"PROGRAMACIÓN ORIENTADA A OBJETOS"}
            </div>
          </div>

          <h1
            style={css(
              "font-family:'Archivo Black',sans-serif;font-size:clamp(64px,12vw,148px);line-height:0.82;margin:0;letter-spacing:-0.045em;text-transform:uppercase"
            )}
          >
            {"POO"}
            <br />
            {"EN C#"}
            <span style={css("color:#FF4D00")}>{"."}</span>
          </h1>

          <p
            style={css(
              "margin:36px 0 0;font-size:22px;font-weight:700;max-width:48ch;line-height:1.45"
            )}
          >
            {
              "Laboratorio interactivo de los conceptos básicos de orientación a objetos aplicados a C#: clases, encapsulación, herencia, polimorfismo, abstracción, interfaces y más."
            }
          </p>

          <div
            style={css(
              "display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:14px;margin-top:40px"
            )}
          >
            {[
              ["01", "Clase / Objeto"],
              ["02", "Encapsulación"],
              ["03", "Herencia"],
              ["04", "Polimorfismo"],
              ["05", "Abstracción"],
              ["06", "Interfaces"],
            ].map(([n, t]) => (
              <div
                key={n}
                style={css(
                  "border:5px solid #1A0F0A;background:#FFF;padding:18px;animation:pooPop 0.55s ease both"
                )}
              >
                <div style={css("font-size:12px;font-weight:800;color:#FF4D00")}>{n}</div>
                <div style={css("font-size:18px;font-weight:800;margin-top:6px")}>{t}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CONSOLE LOG */}
        <div
          style={css(
            "position:sticky;top:70px;z-index:15;background:#1A0F0A;color:#7CFF9E;border-bottom:4px solid #FF4D00;padding:10px 32px;font-size:13px;font-weight:700;overflow:hidden;white-space:nowrap;text-overflow:ellipsis"
          )}
        >
          {String(v.log)}
        </div>

        {/* MAPA */}
        <section
          id="mapa"
          style={css(
            "padding:70px 48px;border-bottom:10px solid #1A0F0A;max-width:1500px;margin:0 auto"
          )}
        >
          <SectionHead
            eyebrow="00 · ORIENTACIÓN"
            title="Mapa mental de POO"
            lead="Todo gira alrededor de modelar el problema como objetos que colaboran. La clase es el molde; el objeto es la instancia viva en memoria."
          />

          <div className="poo-two-col" style={css("display:grid;gap:24px;align-items:stretch")}>
            <div style={css("border:6px solid #1A0F0A;background:#1A0F0A;color:#FFF1E8;padding:28px")}>
              <div
                style={css(
                  "font-family:'Archivo Black',sans-serif;font-size:42px;line-height:0.95;margin-bottom:18px"
                )}
              >
                {"4 PILARES"}
              </div>
              <div style={css("display:grid;gap:12px")}>
                {[
                  ["Encapsulación", "Ocultar detalles; exponer solo lo necesario."],
                  ["Herencia", "Reutilizar y especializar desde una base."],
                  ["Polimorfismo", "Misma interfaz, distinto comportamiento."],
                  ["Abstracción", "Modelar lo esencial; omitir el ruido."],
                ].map(([t, d], i) => (
                  <div
                    key={t}
                    style={css(
                      `border:3px solid #FF4D00;padding:14px 16px;animation:pooSlide 0.45s ease ${i * 0.08}s both`
                    )}
                  >
                    <div style={css("color:#FFC14A;font-weight:800")}>{t}</div>
                    <div style={css("margin-top:4px;font-size:14px;line-height:1.4")}>{d}</div>
                  </div>
                ))}
              </div>
            </div>

            <div style={css("border:6px solid #1A0F0A;background:#FFF;padding:28px")}>
              <div style={css("font-weight:800;font-size:18px;margin-bottom:14px")}>
                {"Vocabulario mínimo"}
              </div>
              <div style={css("display:flex;flex-wrap:wrap;gap:10px")}>
                <Chip label="class" bg="#FFC14A" />
                <Chip label="object / new" bg="#FF4D00" />
                <Chip label="field / property" bg="#6BE3FF" />
                <Chip label="method" bg="#7CFF9E" />
                <Chip label="constructor" bg="#C6B8FF" />
                <Chip label="virtual / override" bg="#FFC14A" />
                <Chip label="abstract" bg="#FF4D00" />
                <Chip label="interface" bg="#6BE3FF" />
                <Chip label="static" bg="#7CFF9E" />
                <Chip label="this / base" bg="#C6B8FF" />
              </div>
              <p style={css("margin:22px 0 0;font-size:15px;font-weight:700;line-height:1.5")}>
                {
                  "En C#, casi todo es un objeto (hereda de System.Object). Los value types (struct, int, bool) viven en el stack o embebidos; las clases viven en el heap y se manejan por referencia."
                }
              </p>
            </div>
          </div>
        </section>

        {/* CLASES Y OBJETOS */}
        <section
          id="clases"
          style={css(
            "padding:70px 48px;border-bottom:10px solid #1A0F0A;max-width:1500px;margin:0 auto"
          )}
        >
          <SectionHead
            eyebrow="01 · CLASE Y OBJETO"
            title="El molde y las instancias"
            lead="La clase describe atributos y métodos. Cada new crea un objeto independiente en el heap con su propio estado."
          />

          <div className="poo-split" style={css("display:grid;gap:24px;align-items:start")}>
            <div>
              <CodeBlock code={CODE_CLASE} language="csharp" />
            </div>

            <div style={css("border:6px solid #1A0F0A;background:#FFF;padding:22px")}>
              <div style={css("font-weight:800;margin-bottom:14px")}>
                {"Demo: fábrica de Persona"}
              </div>
              <div style={css("display:flex;gap:10px;flex-wrap:wrap;margin-bottom:16px")}>
                <input
                  value={String(v.formNombre)}
                  onChange={v.setFormNombre as (e: unknown) => void}
                  placeholder="Nombre"
                  style={css(
                    "border:4px solid #1A0F0A;padding:10px 12px;font:inherit;font-weight:700;min-width:120px;flex:1"
                  )}
                />
                <input
                  value={String(v.formEdad)}
                  onChange={v.setFormEdad as (e: unknown) => void}
                  placeholder="Edad"
                  style={css(
                    "border:4px solid #1A0F0A;padding:10px 12px;font:inherit;font-weight:700;width:90px"
                  )}
                />
                <DemoBtn label="new Persona(...)" onClick={v.crearObjeto as () => void} accent />
                <DemoBtn label="Reset" onClick={v.resetObjetos as () => void} />
              </div>

              <div
                style={css(
                  "display:grid;grid-template-columns:repeat(auto-fit,minmax(160px,1fr));gap:12px;min-height:120px"
                )}
              >
                {objetosCards.map((o) => (
                  <div
                    key={o.key}
                    style={{
                      ...css(
                        "border:5px solid #1A0F0A;background:#FFC14A;padding:14px;position:relative"
                      ),
                      animation: o.pop ? "pooPop 0.55s ease" : undefined,
                    }}
                  >
                    <div style={css("font-size:11px;font-weight:800;opacity:0.7")}>
                      {"heap @" + o.key}
                    </div>
                    <div style={css("font-size:20px;font-weight:800;margin-top:4px")}>
                      {o.nombre}
                    </div>
                    <div style={css("font-size:14px;font-weight:700")}>{"Edad: " + o.edad}</div>
                    <div style={css("display:flex;gap:6px;margin-top:10px;flex-wrap:wrap")}>
                      <DemoBtn label="Presentarse()" onClick={o.presentar} />
                      <DemoBtn label="GC" onClick={o.eliminar} />
                    </div>
                  </div>
                ))}
              </div>
              <p style={css("margin:16px 0 0;font-size:14px;font-weight:700;line-height:1.45")}>
                {
                  "Misma clase, distintos objetos: cada tarjeta es una instancia con su propio Nombre y Edad."
                }
              </p>
            </div>
          </div>
        </section>

        {/* ENCAPSULACIÓN */}
        <section
          id="encap"
          style={css(
            "padding:70px 48px;border-bottom:10px solid #1A0F0A;max-width:1500px;margin:0 auto;background:#FFE8D6"
          )}
        >
          <SectionHead
            eyebrow="02 · ENCAPSULACIÓN"
            title="Proteger el estado"
            lead="Los campos private no se tocan desde afuera. Las properties y métodos públicos son la API segura con validación."
          />

          <div className="poo-split" style={css("display:grid;gap:24px;align-items:start")}>
            <CodeBlock code={CODE_ENCAP} language="csharp" />

            <div style={css("border:6px solid #1A0F0A;background:#FFF;padding:22px")}>
              <div
                style={css(
                  "display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:16px"
                )}
              >
                <div style={css("font-weight:800;font-size:18px")}>{"Cuenta bancaria"}</div>
                <DemoBtn
                  label={v.showPrivate ? "Ocultar _saldo" : "Ver _saldo privado"}
                  onClick={v.togglePrivate as () => void}
                />
              </div>

              <div
                style={css(
                  "border:5px solid #1A0F0A;padding:20px;background:#1A0F0A;color:#FFF1E8;margin-bottom:16px"
                )}
              >
                <div style={css("font-size:13px;color:#FFC14A;font-weight:800")}>
                  {"get Saldo →"}
                </div>
                <div
                  style={css(
                    "font-family:'Archivo Black',sans-serif;font-size:56px;line-height:1;margin-top:6px"
                  )}
                >
                  {"Q" + String(v.saldo)}
                </div>
                {v.showPrivate ? (
                  <div
                    style={css(
                      "margin-top:12px;padding:10px;border:2px dashed #FF4D00;color:#FF4D00;font-size:13px;font-weight:700;animation:pooPop 0.4s ease"
                    )}
                  >
                    {"private decimal _saldo = " + String(v.saldo) + ";  // no accesible desde fuera"}
                  </div>
                ) : null}
              </div>

              <div style={css("display:flex;gap:10px;flex-wrap:wrap;margin-bottom:12px")}>
                <input
                  value={String(v.intentoSaldo)}
                  onChange={v.setIntentoSaldo as (e: unknown) => void}
                  style={css(
                    "border:4px solid #1A0F0A;padding:10px 12px;font:inherit;font-weight:700;width:120px"
                  )}
                />
                <DemoBtn label="set Saldo" onClick={v.aplicarSaldo as () => void} accent />
                <DemoBtn label="Depositar(50)" onClick={v.depositar as () => void} />
              </div>

              <div
                style={css(
                  `border:4px solid #1A0F0A;padding:14px;font-weight:700;background:${v.encapOk ? "#7CFF9E" : "#FF6B6B"};animation:pooPop 0.35s ease`
                )}
              >
                {String(v.encapMsg)}
              </div>
              <p style={css("margin:14px 0 0;font-size:14px;font-weight:700")}>
                {"Prueba set Saldo = -100: la validación rechaza y el campo privado no cambia."}
              </p>
            </div>
          </div>
        </section>

        {/* CONSTRUCTORES */}
        <section
          id="ctor"
          style={css(
            "padding:70px 48px;border-bottom:10px solid #1A0F0A;max-width:1500px;margin:0 auto"
          )}
        >
          <SectionHead
            eyebrow="03 · CONSTRUCTORES"
            title="Nacer con estado válido"
            lead="El constructor corre al hacer new. Sirve para inicializar campos, validar e invocar otros constructores con this(...)."
          />

          <div className="poo-split" style={css("display:grid;gap:24px;align-items:start")}>
            <CodeBlock code={CODE_CTOR} language="csharp" />

            <div style={css("border:6px solid #1A0F0A;background:#FFF;padding:22px")}>
              <div style={css("display:flex;gap:10px;flex-wrap:wrap;margin-bottom:18px")}>
                <input
                  value={String(v.ctorTitular)}
                  onChange={v.setCtorTitular as (e: unknown) => void}
                  style={css(
                    "border:4px solid #1A0F0A;padding:10px 12px;font:inherit;font-weight:700;flex:1;min-width:120px"
                  )}
                />
                <input
                  value={String(v.ctorSaldo)}
                  onChange={v.setCtorSaldo as (e: unknown) => void}
                  style={css(
                    "border:4px solid #1A0F0A;padding:10px 12px;font:inherit;font-weight:700;width:100px"
                  )}
                />
                <DemoBtn
                  label={v.ctorPlaying ? "Construyendo…" : "Animar new"}
                  onClick={v.runCtorAnim as () => void}
                  accent
                  disabled={Boolean(v.ctorPlaying)}
                />
                <DemoBtn label="Reset" onClick={v.resetCtor as () => void} />
              </div>

              <div style={css("display:grid;gap:10px")}>
                {ctorSteps.map((step, i) => (
                  <div
                    key={step.id}
                    style={css(
                      `border:4px solid #1A0F0A;padding:14px 16px;display:flex;gap:14px;align-items:flex-start;background:${step.active ? "#FFC14A" : step.done ? "#7CFF9E" : "#FFF1E8"};transition:background 0.25s`
                    )}
                  >
                    <div
                      style={css(
                        "width:36px;height:36px;border:3px solid #1A0F0A;display:grid;place-items:center;font-weight:800;background:#FFF;flex-shrink:0"
                      )}
                    >
                      {i + 1}
                    </div>
                    <div>
                      <div style={css("font-weight:800")}>{step.label}</div>
                      <div style={css("font-size:13px;font-weight:700;margin-top:4px")}>
                        {step.detail}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* HERENCIA */}
        <section
          id="herencia"
          style={css(
            "padding:70px 48px;border-bottom:10px solid #1A0F0A;max-width:1500px;margin:0 auto;background:#FFF7F0"
          )}
        >
          <SectionHead
            eyebrow="04 · HERENCIA"
            title="Especializar sin reescribir todo"
            lead="Con : BaseClass, la hija reutiliza miembros de la base y puede override métodos virtuales. En C# hay herencia simple de clases."
          />

          <div className="poo-split" style={css("display:grid;gap:24px;align-items:start")}>
            <CodeBlock code={CODE_HERENCIA} language="csharp" />

            <div style={css("border:6px solid #1A0F0A;background:#FFF;padding:22px")}>
              <div style={css("font-weight:800;margin-bottom:14px")}>
                {"Árbol de herencia · clic para inspeccionar"}
              </div>

              <div style={css("display:grid;gap:12px;justify-items:center;padding:10px 0 20px")}>
                {herenciaTree
                  .filter((n) => n.level === 0)
                  .map((n) => (
                    <button
                      key={n.id}
                      type="button"
                      onClick={n.pick}
                      style={{
                        ...css(
                          `border:5px solid #1A0F0A;background:${n.accent};color:${n.fg};padding:16px 28px;font:inherit;font-weight:800;font-size:20px;cursor:pointer;min-width:200px`
                        ),
                        animation: n.flash ? "pooFlash 0.55s ease" : n.selected ? "pooPulse 1.2s ease infinite" : undefined,
                      }}
                    >
                      {n.label}
                    </button>
                  ))}
                <div style={css("width:4px;height:28px;background:#1A0F0A")} />
                <div style={css("display:flex;gap:12px;flex-wrap:wrap;justify-content:center")}>
                  {herenciaTree
                    .filter((n) => n.level === 1)
                    .map((n) => (
                      <button
                        key={n.id}
                        type="button"
                        onClick={n.pick}
                        style={{
                          ...css(
                            `border:5px solid #1A0F0A;background:${n.selected ? n.accent : "#FFF"};color:${n.selected ? n.fg : "#1A0F0A"};padding:14px 18px;font:inherit;font-weight:800;cursor:pointer;min-width:110px`
                          ),
                          animation: n.flash ? "pooFlash 0.55s ease" : undefined,
                        }}
                      >
                        {n.label}
                      </button>
                    ))}
                </div>
              </div>

              <div
                style={css(
                  `border:5px solid #1A0F0A;padding:18px;background:${animal.color};animation:pooPop 0.4s ease`
                )}
              >
                <div style={css("font-size:12px;font-weight:800;letter-spacing:0.12em")}>
                  {"SELECCIONADO"}
                </div>
                <div
                  style={css(
                    "font-family:'Archivo Black',sans-serif;font-size:36px;margin-top:4px"
                  )}
                >
                  {animal.especie}
                </div>
                <div style={css("font-weight:700;margin-top:8px")}>
                  {"Hablar() → \"" + animal.sonido + "\""}
                </div>
                <div style={css("font-size:13px;font-weight:700;margin-top:4px")}>
                  {animal.metodo}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* POLIMORFISMO */}
        <section
          id="poly"
          style={css(
            "padding:70px 48px;border-bottom:10px solid #1A0F0A;max-width:1500px;margin:0 auto"
          )}
        >
          <SectionHead
            eyebrow="05 · POLIMORFISMO"
            title="Una referencia, muchos comportamientos"
            lead="Runtime: virtual/override decide el método real según el objeto. Compile-time: overload elige la firma por los argumentos."
          />

          <div className="poo-split" style={css("display:grid;gap:24px;align-items:start")}>
            <CodeBlock code={CODE_POLY} language="csharp" />

            <div style={css("display:grid;gap:18px")}>
              <div style={css("border:6px solid #1A0F0A;background:#FFF;padding:22px")}>
                <div style={css("font-weight:800;margin-bottom:12px")}>
                  {"Runtime · Animal a"}
                </div>
                <div style={css("display:flex;gap:10px;flex-wrap:wrap;margin-bottom:14px")}>
                  {zooCards.map((z) => (
                    <button
                      key={z.key}
                      type="button"
                      onClick={z.pick}
                      style={css(
                        `border:4px solid #1A0F0A;background:${z.activo ? z.color : "#FFF"};padding:10px 14px;font:inherit;font-weight:800;cursor:pointer`
                      )}
                    >
                      {z.tipo}
                    </button>
                  ))}
                </div>

                <div
                  style={css(
                    `border:5px solid #1A0F0A;padding:20px;background:${polyAnimal.color};text-align:center;animation:pooPop 0.4s ease`
                  )}
                >
                  <div style={css("font-size:13px;font-weight:800")}>
                    {"Animal a → " + String(v.polyActual)}
                  </div>
                  <div
                    style={css(
                      "font-family:'Archivo Black',sans-serif;font-size:48px;margin:8px 0;animation:pooFloat 1.6s ease infinite"
                    )}
                  >
                    {"\"" + polyAnimal.sonido + "\""}
                  </div>
                  <div style={css("font-size:13px;font-weight:700")}>{polyAnimal.metodo}</div>
                </div>

                <div style={css("display:flex;gap:10px;flex-wrap:wrap;margin-top:14px")}>
                  <DemoBtn label="a.Hablar()" onClick={v.llamarHablar as () => void} accent />
                  <DemoBtn label="Siguiente" onClick={v.siguienteAnimal as () => void} />
                </div>

                <div style={css("margin-top:14px;display:grid;gap:6px")}>
                  {polyLog.map((line, i) => (
                    <div
                      key={i}
                      style={css(
                        "border:3px solid #1A0F0A;background:#1A0F0A;color:#7CFF9E;padding:8px 10px;font-size:12px;font-weight:700"
                      )}
                    >
                      {line}
                    </div>
                  ))}
                </div>
              </div>

              <div style={css("border:6px solid #1A0F0A;background:#FFF;padding:22px")}>
                <div style={css("font-weight:800;margin-bottom:12px")}>
                  {"Compile-time · overload"}
                </div>
                <div style={css("display:flex;gap:10px;flex-wrap:wrap;margin-bottom:12px")}>
                  <input
                    value={String(v.overloadA)}
                    onChange={v.setOverloadA as (e: unknown) => void}
                    style={css(
                      "border:4px solid #1A0F0A;padding:10px;font:inherit;font-weight:700;width:80px"
                    )}
                  />
                  <input
                    value={String(v.overloadB)}
                    onChange={v.setOverloadB as (e: unknown) => void}
                    style={css(
                      "border:4px solid #1A0F0A;padding:10px;font:inherit;font-weight:700;width:80px"
                    )}
                  />
                </div>
                <div style={css("display:flex;gap:8px;flex-wrap:wrap")}>
                  <DemoBtn label="Sumar(int,int)" onClick={v.sumarInts as () => void} accent />
                  <DemoBtn label="Sumar(double,double)" onClick={v.sumarDoubles as () => void} />
                  <DemoBtn label="Sumar(int,int,int)" onClick={v.sumarTres as () => void} />
                </div>
                {v.overloadResult != null ? (
                  <div
                    style={css(
                      "margin-top:14px;border:4px solid #1A0F0A;background:#FFC14A;padding:14px;font-weight:800;animation:pooPop 0.35s ease"
                    )}
                  >
                    {String(v.overloadKind) + " → " + String(v.overloadResult)}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </section>

        {/* ABSTRACCIÓN */}
        <section
          id="abstract"
          style={css(
            "padding:70px 48px;border-bottom:10px solid #1A0F0A;max-width:1500px;margin:0 auto;background:#FFE0C8"
          )}
        >
          <SectionHead
            eyebrow="06 · ABSTRACCIÓN"
            title="Contratos incompletos a completar"
            lead="Una clase abstract no se instancia. Obliga a las hijas a implementar los miembros abstract (como CalcularArea)."
          />

          <div className="poo-split" style={css("display:grid;gap:24px;align-items:start")}>
            <CodeBlock code={CODE_ABSTRACT} language="csharp" />

            <div style={css("border:6px solid #1A0F0A;background:#FFF;padding:22px")}>
              <div style={css("display:flex;gap:10px;flex-wrap:wrap;margin-bottom:16px")}>
                <DemoBtn
                  label="Circulo"
                  onClick={() => (v.setFigura as (n: string) => void)("Circulo")}
                  accent={v.figura === "Circulo"}
                />
                <DemoBtn
                  label="Cuadrado"
                  onClick={() => (v.setFigura as (n: string) => void)("Cuadrado")}
                  accent={v.figura === "Cuadrado"}
                />
                <DemoBtn label="CalcularArea()" onClick={v.calcularArea as () => void} />
              </div>

              <div
                style={css(
                  "border:5px solid #1A0F0A;padding:24px;display:grid;place-items:center;min-height:220px;background:#FFF7F0"
                )}
              >
                {v.figura === "Circulo" ? (
                  <div style={css("text-align:center")}>
                    <div
                      style={{
                        ...css(
                          "width:140px;height:140px;border:8px solid #1A0F0A;border-radius:50%;background:#6BE3FF;margin:0 auto;animation:pooPulse 1.4s ease infinite"
                        ),
                      }}
                    />
                    <div style={css("margin-top:14px;display:flex;gap:8px;justify-content:center")}>
                      <span style={css("font-weight:800")}>{"Radio"}</span>
                      <input
                        value={String(v.figuraRadio)}
                        onChange={v.setFiguraRadio as (e: unknown) => void}
                        style={css(
                          "border:3px solid #1A0F0A;width:70px;padding:6px;font:inherit;font-weight:700"
                        )}
                      />
                    </div>
                  </div>
                ) : (
                  <div style={css("text-align:center")}>
                    <div
                      style={css(
                        "width:120px;height:120px;border:8px solid #1A0F0A;background:#FFC14A;margin:0 auto;animation:pooPulse 1.4s ease infinite"
                      )}
                    />
                    <div style={css("margin-top:14px;display:flex;gap:8px;justify-content:center")}>
                      <span style={css("font-weight:800")}>{"Lado"}</span>
                      <input
                        value={String(v.figuraLado)}
                        onChange={v.setFiguraLado as (e: unknown) => void}
                        style={css(
                          "border:3px solid #1A0F0A;width:70px;padding:6px;font:inherit;font-weight:700"
                        )}
                      />
                    </div>
                  </div>
                )}
              </div>

              <div
                style={css(
                  "margin-top:14px;border:5px solid #1A0F0A;background:#1A0F0A;color:#FFC14A;padding:16px;font-weight:800;font-size:22px"
                )}
              >
                {"Área = " + String(v.area)}
              </div>
              <p style={css("margin:12px 0 0;font-size:14px;font-weight:700")}>
                {"Figura es abstracta: defines el qué (CalcularArea), cada hija define el cómo."}
              </p>
            </div>
          </div>
        </section>

        {/* INTERFACES */}
        <section
          id="interfaces"
          style={css(
            "padding:70px 48px;border-bottom:10px solid #1A0F0A;max-width:1500px;margin:0 auto"
          )}
        >
          <SectionHead
            eyebrow="07 · INTERFACES"
            title="Capacidad, no jerarquía"
            lead="Una interface declara un contrato. Distintas clases pueden implementarlo sin compartir herencia. Una clase puede implementar varias interfaces."
          />

          <div className="poo-split" style={css("display:grid;gap:24px;align-items:start")}>
            <CodeBlock code={CODE_INTERFACE} language="csharp" />

            <div style={css("border:6px solid #1A0F0A;background:#FFF;padding:22px")}>
              <div style={css("font-weight:800;margin-bottom:14px")}>
                {"Quiénes implementan IVolador"}
              </div>
              <div
                style={css(
                  "display:grid;grid-template-columns:repeat(3,1fr);gap:12px"
                )}
              >
                {[
                  { name: "Avion", alt: "3000 m", bg: "#6BE3FF" },
                  { name: "Drone", alt: "120 m", bg: "#7CFF9E" },
                  { name: "Pato", alt: "40 m", bg: "#FFC14A" },
                ].map((item, i) => (
                  <div
                    key={item.name}
                    style={{
                      ...css(
                        `border:5px solid #1A0F0A;background:${item.bg};padding:16px;text-align:center`
                      ),
                      animation: `pooPop 0.5s ease ${i * 0.1}s both`,
                    }}
                  >
                    <div
                      style={css(
                        "width:36px;height:36px;border:3px solid #1A0F0A;border-radius:50%;margin:0 auto 10px;background:#FFF;animation:pooSpin 8s linear infinite"
                      )}
                    />
                    <div style={css("font-weight:800;font-size:18px")}>{item.name}</div>
                    <div style={css("font-size:12px;font-weight:700;margin-top:6px")}>
                      {": IVolador"}
                    </div>
                    <div style={css("font-size:13px;font-weight:700;margin-top:8px")}>
                      {"Altitud " + item.alt}
                    </div>
                  </div>
                ))}
              </div>
              <div
                style={css(
                  "margin-top:16px;border:4px solid #1A0F0A;background:#1A0F0A;color:#FFF1E8;padding:14px;font-size:14px;font-weight:700;line-height:1.5"
                )}
              >
                {
                  "Úsalas cuando importa el rol (puede volar, puede serializarse), no la familia genética. Desde C# 8+ las interfaces pueden traer implementaciones por defecto, pero el contrato sigue siendo el centro."
                }
              </div>
            </div>
          </div>
        </section>

        {/* COMPOSICIÓN */}
        <section
          id="composicion"
          style={css(
            "padding:70px 48px;border-bottom:10px solid #1A0F0A;max-width:1500px;margin:0 auto;background:#FFF7F0"
          )}
        >
          <SectionHead
            eyebrow="08 · COMPOSICIÓN"
            title="Tiene-un, no es-un"
            lead="Prefiere composición cuando el vínculo es de partes. Un Auto tiene un Motor; no es un Motor."
          />

          <div className="poo-split" style={css("display:grid;gap:24px;align-items:start")}>
            <CodeBlock code={CODE_COMPOSICION} language="csharp" />

            <div style={css("border:6px solid #1A0F0A;background:#FFF;padding:22px")}>
              <div
                style={css(
                  "border:5px solid #1A0F0A;padding:20px;background:#1A0F0A;color:#FFF1E8;position:relative"
                )}
              >
                <div
                  style={css(
                    "font-family:'Archivo Black',sans-serif;font-size:28px;color:#FF4D00"
                  )}
                >
                  {"AUTO"}
                </div>
                <div style={css("font-size:13px;font-weight:700;margin-top:4px")}>
                  {"contiene →"}
                </div>

                <div
                  style={css(
                    `margin-top:16px;border:4px solid #FFC14A;padding:16px;background:${v.motorEncendido ? "#224422" : "#222"};transition:background 0.3s`
                  )}
                >
                  <div style={css("color:#FFC14A;font-weight:800")}>{"MOTOR (parte)"}</div>
                  <div style={css("margin-top:8px;font-weight:700")}>
                    {v.motorEncendido ? "Encendido" : "Apagado"}
                    {" · RPM "}
                    {String(v.motorRpm)}
                  </div>
                  <div
                    style={css(
                      "margin-top:12px;height:14px;border:2px solid #FFC14A;background:#111;overflow:hidden"
                    )}
                  >
                    <div
                      style={{
                        ...css("height:100%;background:#FF4D00"),
                        width: `${Math.min(100, (Number(v.motorRpm) / 7000) * 100)}%`,
                        transition: "width 0.35s ease",
                      }}
                    />
                  </div>
                </div>
              </div>

              <div style={css("display:flex;gap:10px;flex-wrap:wrap;margin-top:14px")}>
                <DemoBtn
                  label={v.motorEncendido ? "Apagar motor" : "Encender motor"}
                  onClick={v.toggleMotor as () => void}
                  accent
                />
                <DemoBtn label="Acelerar()" onClick={v.acelerar as () => void} />
              </div>
              <p style={css("margin:14px 0 0;font-size:14px;font-weight:700;line-height:1.45")}>
                {
                  "Herencia = es-un (Perro es un Animal). Composición = tiene-un (Auto tiene Motor). En diseños reales, composición suele ser más flexible."
                }
              </p>
            </div>
          </div>
        </section>

        {/* STATIC / THIS / BASE */}
        <section
          id="static"
          style={css(
            "padding:70px 48px;border-bottom:10px solid #1A0F0A;max-width:1500px;margin:0 auto"
          )}
        >
          <SectionHead
            eyebrow="09 · STATIC · THIS · BASE"
            title="Nivel de clase y referencias especiales"
            lead="static pertenece a la clase, no a una instancia. this es el objeto actual. base apunta a la implementación de la clase padre."
          />

          <div className="poo-split" style={css("display:grid;gap:24px;align-items:start")}>
            <CodeBlock code={CODE_STATIC} language="csharp" />

            <div style={css("display:grid;gap:16px")}>
              <div style={css("border:6px solid #1A0F0A;background:#FFC14A;padding:22px")}>
                <div style={css("font-size:13px;font-weight:800")}>{"Persona.Contador"}</div>
                <div
                  style={css(
                    "font-family:'Archivo Black',sans-serif;font-size:72px;line-height:1;margin-top:4px"
                  )}
                >
                  {String(v.contadorInstancias)}
                </div>
                <div style={css("font-weight:700;margin-top:8px")}>
                  {"Se incrementa en cada new (ve la sección Clases)."}
                </div>
              </div>

              <div
                style={css(
                  "border:6px solid #1A0F0A;background:#FFF;padding:22px;display:grid;gap:12px"
                )}
              >
                {[
                  ["this", "Referencia al objeto actual. Útil para desambiguar parámetros y encadenar."],
                  ["base", "Accede a miembros de la clase base (base.Hablar(), base(...))."],
                  ["static", "Un solo valor/método compartido. No puede usar this ni miembros de instancia."],
                ].map(([k, d]) => (
                  <div key={k} style={css("border:4px solid #1A0F0A;padding:14px")}>
                    <div style={css("color:#FF4D00;font-weight:800")}>{k}</div>
                    <div style={css("font-size:14px;font-weight:700;margin-top:4px;line-height:1.4")}>
                      {d}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* MODIFICADORES DE ACCESO */}
        <section
          id="acceso"
          style={css(
            "padding:70px 48px;border-bottom:10px solid #1A0F0A;max-width:1500px;margin:0 auto;background:#FFE8D6"
          )}
        >
          <SectionHead
            eyebrow="10 · MODIFICADORES"
            title="Quién puede ver qué"
            lead="El modificador define la visibilidad. Combínalo con encapsulación: campos private + API pública mínima."
          />

          <div style={css("overflow:auto;border:6px solid #1A0F0A;background:#FFF")}>
            <table style={css("width:100%;border-collapse:collapse;font-size:14px;font-weight:700")}>
              <thead>
                <tr style={css("background:#1A0F0A;color:#FFC14A")}>
                  {["Modificador", "Misma clase", "Clase hija", "Mismo ensamblado", "Otro ensamblado"].map(
                    (h) => (
                      <th
                        key={h}
                        style={css("text-align:left;padding:14px 16px;border-right:2px solid #333")}
                      >
                        {h}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {accessTable.map((row, i) => (
                  <tr
                    key={row.mod}
                    style={css(`background:${i % 2 === 0 ? "#FFF" : "#FFF1E8"}`)}
                  >
                    <td style={css("padding:12px 16px;border-top:3px solid #1A0F0A;color:#FF4D00")}>
                      {row.mod}
                    </td>
                    <td style={css("padding:12px 16px;border-top:3px solid #1A0F0A")}>{row.misma}</td>
                    <td style={css("padding:12px 16px;border-top:3px solid #1A0F0A")}>{row.hija}</td>
                    <td style={css("padding:12px 16px;border-top:3px solid #1A0F0A")}>
                      {row.ensamblado}
                    </td>
                    <td style={css("padding:12px 16px;border-top:3px solid #1A0F0A")}>
                      {row.externo}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p style={css("margin:14px 0 0;font-size:13px;font-weight:700")}>
            {"* Depende del caso (protected en otro ensamblado solo vía herencia; private protected exige hija + mismo ensamblado)."}
          </p>
        </section>

        {/* QUIZ */}
        <section
          id="quiz"
          style={css(
            "padding:70px 48px;border-bottom:10px solid #1A0F0A;max-width:1500px;margin:0 auto"
          )}
        >
          <SectionHead
            eyebrow="11 · AUTOEVALUACIÓN"
            title="¿Lo tienes claro?"
            lead="Cinco preguntas rápidas sobre los conceptos del laboratorio."
          />

          <div style={css("border:6px solid #1A0F0A;background:#FFF;padding:28px;max-width:820px")}>
            {!v.quizDone ? (
              <>
                <div style={css("font-size:13px;font-weight:800;color:#FF4D00")}>
                  {"Pregunta " + (Number(v.quizIndex) + 1) + " / " + String(v.quizTotal)}
                  {" · aciertos " + String(v.quizScore)}
                </div>
                <div
                  style={css(
                    "font-family:'Archivo Black',sans-serif;font-size:clamp(24px,4vw,36px);margin:12px 0 20px;line-height:1.1"
                  )}
                >
                  {quiz.q}
                </div>
                <div style={css("display:grid;gap:10px")}>
                  {quiz.options.map((opt, i) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => (v.answerQuiz as (n: number) => void)(i)}
                      style={css(
                        "border:4px solid #1A0F0A;background:#FFF7F0;padding:14px 16px;text-align:left;font:inherit;font-weight:800;cursor:pointer"
                      )}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div style={css("animation:pooPop 0.45s ease")}>
                <div
                  style={css(
                    "font-family:'Archivo Black',sans-serif;font-size:42px;line-height:1"
                  )}
                >
                  {"LISTO"}
                </div>
                <div style={css("font-size:22px;font-weight:800;margin-top:12px")}>
                  {String(v.quizScore) + " / " + String(v.quizTotal)}
                </div>
              </div>
            )}

            {v.quizFeedback ? (
              <div
                style={css(
                  "margin-top:16px;border:4px solid #1A0F0A;background:#FFC14A;padding:12px 14px;font-weight:700"
                )}
              >
                {String(v.quizFeedback)}
              </div>
            ) : null}

            <div style={css("margin-top:16px")}>
              <DemoBtn label="Reiniciar quiz" onClick={v.resetQuiz as () => void} />
            </div>
          </div>
        </section>

        {/* REFERENCIA RÁPIDA */}
        <section
          id="referencia"
          style={css("padding:70px 48px 100px;max-width:1500px;margin:0 auto")}
        >
          <SectionHead
            eyebrow="12 · CHEAT SHEET"
            title="Referencia rápida C#"
          />

          <div
            style={css(
              "display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:14px"
            )}
          >
            {[
              ["class", "Plantilla de objetos (referencia)."],
              ["struct", "Tipo valor; útil para datos pequeños."],
              ["record", "Inmutabilidad y igualdad por valor (C# 9+)."],
              ["new", "Crea instancia e invoca constructor."],
              ["virtual / override", "Polimorfismo dinámico."],
              ["abstract", "Clase o miembro incompleto obligatorio."],
              ["interface", "Contrato implementable por varias clases."],
              ["sealed", "Impide heredar o override adicional."],
              ["static", "Miembro de clase, no de instancia."],
              ["property { get; set; }", "Encapsulación idiomática en C#."],
              ["this / base", "Instancia actual / miembros del padre."],
              ["namespace", "Organiza tipos y evita colisiones de nombres."],
            ].map(([k, d], i) => (
              <div
                key={k}
                style={{
                  ...css("border:5px solid #1A0F0A;background:#FFF;padding:16px"),
                  animation: `pooSlide 0.4s ease ${i * 0.03}s both`,
                }}
              >
                <div style={css("color:#FF4D00;font-weight:800")}>{k}</div>
                <div style={css("font-size:14px;font-weight:700;margin-top:6px;line-height:1.4")}>
                  {d}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <style>{`
        .dc-artifact--poo-lab .poo-two-col {
          grid-template-columns: 1.2fr 1fr;
        }
        .dc-artifact--poo-lab .poo-split {
          grid-template-columns: 1fr 1fr;
        }
        @media (max-width: 960px) {
          .dc-artifact--poo-lab .poo-two-col,
          .dc-artifact--poo-lab .poo-split {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  )
}
