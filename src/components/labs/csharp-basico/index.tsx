"use client"

import { useState } from "react"
import Link from "next/link"
import {
  ArrowRightIcon,
  CheckIcon,
  ChevronRightIcon,
  CircleAlertIcon,
  PlayIcon,
  RotateCcwIcon,
  TerminalIcon,
} from "lucide-react"

import { CodeBlock } from "@/components/code-block"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const C = {
  bg: "#FFEAF1",
  ink: "#260914",
  accent: "#C2185B",
  lime: "#B9F227",
  paper: "#FFF8FA",
  wash: "#FFD0E0",
  blue: "#38BDF8",
}

const firstProgram = `Console.WriteLine("¡Hola, IPC2!");

string nombre = "Ana";
int edad = 19;

Console.WriteLine($"{nombre} tiene {edad} años.");`

const inputProgram = `Console.Write("Escribe tu nombre: ");
string? nombre = Console.ReadLine();

Console.Write("Escribe tu edad: ");
bool esValida = int.TryParse(Console.ReadLine(), out int edad);

if (esValida)
    Console.WriteLine($"Hola {nombre}, el próximo año tendrás {edad + 1}.");
else
    Console.WriteLine("La edad no es válida.");`

const decisionsProgram = `int nota = 78;

if (nota >= 85)
    Console.WriteLine("Excelente");
else if (nota >= 61)
    Console.WriteLine("Aprobado");
else
    Console.WriteLine("Debes reforzar");

string estado = nota >= 61 ? "aprobado" : "reprobado";

switch (nota / 10)
{
    case 10:
    case 9: Console.WriteLine("A"); break;
    case 8: Console.WriteLine("B"); break;
    default: Console.WriteLine("Sigue practicando"); break;
}`

const loopsProgram = `for (int i = 1; i <= 5; i++)
    Console.WriteLine($"Vuelta {i}");

int intentos = 3;
while (intentos > 0)
{
    Console.WriteLine($"Quedan {intentos}");
    intentos--;
}

string[] temas = { "tipos", "if", "ciclos" };
foreach (string tema in temas)
    Console.WriteLine(tema);`

const collectionsProgram = `int[] notas = { 90, 75, 82 };       // tamaño fijo
notas[1] = 80;                        // índices desde cero

List<string> cursos = new()           // tamaño dinámico
{
    "IPC1", "IPC2"
};
cursos.Add("EDD");
cursos.Remove("IPC1");

Dictionary<string, int> stock = new()
{
    ["teclado"] = 8,
    ["mouse"] = 12
};

Console.WriteLine(stock["mouse"]);`

const methodsProgram = `static double CalcularPromedio(int[] notas)
{
    int suma = 0;
    foreach (int nota in notas)
        suma += nota;

    return (double)suma / notas.Length;
}

static bool EstaAprobado(double promedio, double minima = 61)
{
    return promedio >= minima;
}

int[] notas = { 70, 84, 91 };
double promedio = CalcularPromedio(notas);
Console.WriteLine(EstaAprobado(promedio));`

const exceptionsProgram = `try
{
    Console.Write("Dividendo: ");
    int a = int.Parse(Console.ReadLine()!);

    Console.Write("Divisor: ");
    int b = int.Parse(Console.ReadLine()!);
    Console.WriteLine(a / b);
}
catch (FormatException)
{
    Console.WriteLine("Debes escribir números enteros.");
}
catch (DivideByZeroException)
{
    Console.WriteLine("No se puede dividir entre cero.");
}
finally
{
    Console.WriteLine("Fin del cálculo.");
}`

const completeProgram = `using System;
using System.Collections.Generic;

List<double> notas = new();

Console.WriteLine("REGISTRO DE NOTAS");
Console.WriteLine("Escribe -1 para terminar.\\n");

while (true)
{
    Console.Write("Nota: ");
    if (!double.TryParse(Console.ReadLine(), out double nota))
    {
        Console.WriteLine("Entrada inválida.");
        continue;
    }

    if (nota == -1) break;
    if (nota < 0 || nota > 100)
    {
        Console.WriteLine("La nota debe estar entre 0 y 100.");
        continue;
    }

    notas.Add(nota);
}

if (notas.Count == 0)
{
    Console.WriteLine("No se ingresaron notas.");
    return;
}

double suma = 0;
foreach (double nota in notas) suma += nota;

double promedio = suma / notas.Count;
Console.WriteLine($"Promedio: {promedio:F2}");
Console.WriteLine(promedio >= 61 ? "Aprobado" : "Reprobado");`

const quiz = [
  {
    question: "¿Qué opción convierte una entrada sin lanzar una excepción si falla?",
    options: ["int.Parse", "int.TryParse", "Convert.ToInt32"],
    answer: 1,
    detail: "TryParse devuelve true o false y coloca el resultado en una variable out.",
  },
  {
    question: "¿Qué colección conviene cuando la cantidad de elementos cambia?",
    options: ["List<T>", "T[]", "string"],
    answer: 0,
    detail: "List<T> puede crecer o reducirse con Add y Remove.",
  },
  {
    question: "¿Qué palabra termina inmediatamente el ciclo actual?",
    options: ["continue", "return", "break"],
    answer: 2,
    detail: "break sale del ciclo; continue pasa a la siguiente iteración.",
  },
] as const

const dataTypes = [
  ["int", "Enteros", "42"],
  ["double", "Decimales", "3.1416"],
  ["decimal", "Dinero", "125.50m"],
  ["bool", "Verdadero / falso", "true"],
  ["char", "Un carácter", "'A'"],
  ["string", "Texto", '"Guatemala"'],
] as const

const operators = [
  ["Aritméticos", "+  -  *  /  %", "Calculan valores"],
  ["Comparación", "==  !=  >  <  >=  <=", "Producen bool"],
  ["Lógicos", "&&  ||  !", "Combinan condiciones"],
  ["Asignación", "=  +=  -=  *=  /=", "Actualizan variables"],
  ["Incremento", "++  --", "Suman o restan uno"],
] as const

const navItems = [
  ["#inicio", "INICIO"],
  ["#tipos", "TIPOS"],
  ["#entrada", "ENTRADA"],
  ["#control", "CONTROL"],
  ["#colecciones", "COLECCIONES"],
  ["#metodos", "MÉTODOS"],
  ["#errores", "ERRORES"],
  ["#reto", "RETO"],
] as const

function SectionHeading({
  number,
  eyebrow,
  title,
  description,
}: {
  number: string
  eyebrow: string
  title: string
  description: string
}) {
  return (
    <div className="mb-9 flex flex-col gap-4">
      <div className="flex items-center gap-3 border-b-[6px] border-[var(--cs-ink)] pb-3 font-mono text-xs font-extrabold tracking-[0.2em] uppercase sm:text-sm">
        <span className="bg-[var(--cs-ink)] px-2 py-1 text-[var(--cs-bg)]">{number}</span>
        {eyebrow}
      </div>
      <h2 className="max-w-4xl font-[family-name:var(--font-display)] text-4xl leading-[0.92] tracking-[-0.04em] uppercase sm:text-6xl">
        {title}
      </h2>
      <p className="max-w-3xl text-base leading-relaxed font-semibold sm:text-xl">
        {description}
      </p>
    </div>
  )
}

function CodePanel({ code, label }: { code: string; label: string }) {
  return (
    <div className="min-w-0 border-[6px] border-[var(--cs-ink)] bg-[var(--cs-ink)] shadow-[8px_8px_0_var(--cs-accent)]">
      <div className="flex items-center justify-between gap-3 border-b-2 border-white/20 px-4 py-3 text-[var(--cs-bg)]">
        <span className="font-mono text-xs font-bold tracking-[0.16em] uppercase">{label}</span>
        <div className="flex gap-1.5" aria-hidden="true">
          <span className="size-2.5 rounded-full bg-[var(--cs-accent)]" />
          <span className="size-2.5 rounded-full bg-[var(--cs-lime)]" />
          <span className="size-2.5 rounded-full bg-[var(--cs-blue)]" />
        </div>
      </div>
      <CodeBlock
        code={code}
        language="csharp"
        variant="dark"
        style={{ padding: 20, fontSize: 15, lineHeight: 1.7, overflow: "auto" }}
      />
    </div>
  )
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 border-4 border-[var(--cs-ink)] bg-[var(--cs-lime)] p-4 font-mono text-sm leading-relaxed font-bold shadow-[5px_5px_0_var(--cs-ink)]">
      <CircleAlertIcon className="mt-0.5 size-5 shrink-0" aria-hidden="true" />
      <p>{children}</p>
    </div>
  )
}

export function CsharpBasicsView() {
  const [consoleStep, setConsoleStep] = useState(0)
  const [quizIndex, setQuizIndex] = useState(0)
  const [selected, setSelected] = useState<number | null>(null)
  const [score, setScore] = useState(0)
  const [finished, setFinished] = useState(false)

  const consoleLines = [
    "> dotnet new console -n MiPrimeraApp",
    "> cd MiPrimeraApp",
    "> dotnet run",
    "¡Hola, IPC2!",
  ]

  const runConsole = () => {
    setConsoleStep((current) => (current >= consoleLines.length ? 0 : current + 1))
  }

  const chooseAnswer = (answer: number) => {
    if (selected !== null) return
    setSelected(answer)
    if (answer === quiz[quizIndex].answer) setScore((current) => current + 1)
  }

  const nextQuestion = () => {
    if (quizIndex === quiz.length - 1) {
      setFinished(true)
      return
    }
    setQuizIndex((current) => current + 1)
    setSelected(null)
  }

  const resetQuiz = () => {
    setQuizIndex(0)
    setSelected(null)
    setScore(0)
    setFinished(false)
  }

  return (
    <main
      className="csharp-notebook min-h-full overflow-hidden bg-[var(--cs-bg)] text-[var(--cs-ink)]"
      style={
        {
          "--cs-bg": C.bg,
          "--cs-ink": C.ink,
          "--cs-accent": C.accent,
          "--cs-lime": C.lime,
          "--cs-paper": C.paper,
          "--cs-wash": C.wash,
          "--cs-blue": C.blue,
        } as React.CSSProperties
      }
    >
      <style>{`
        .csharp-notebook {
          font-family: var(--font-lab-mono), ui-monospace, monospace;
          background-image:
            linear-gradient(rgba(38, 9, 20, .07) 1px, transparent 1px),
            linear-gradient(90deg, rgba(38, 9, 20, .07) 1px, transparent 1px),
            radial-gradient(circle at 92% 4%, rgba(185, 242, 39, .46), transparent 23%);
          background-size: 32px 32px, 32px 32px, auto;
        }
        .csharp-notebook ::selection { background: var(--cs-lime); color: var(--cs-ink); }
        .csharp-notebook section { scroll-margin-top: 92px; }
        .csharp-notebook .cs-section { border-bottom: 10px solid var(--cs-ink); }
        @keyframes cs-rise { from { opacity: 0; transform: translateY(18px); } to { opacity: 1; transform: none; } }
        @keyframes cs-blink { 50% { opacity: 0; } }
        .csharp-notebook .cs-rise { animation: cs-rise .65s cubic-bezier(.2,.8,.2,1) both; }
        .csharp-notebook .cs-cursor { animation: cs-blink 1s steps(1) infinite; }
      `}</style>

      <header className="sticky top-0 z-30 flex flex-wrap items-center justify-between gap-3 border-b-[6px] border-[var(--cs-accent)] bg-[var(--cs-ink)] px-4 py-3 text-[var(--cs-bg)] sm:px-8">
        <a href="#inicio" className="font-[family-name:var(--font-display)] text-xl tracking-tight no-underline sm:text-2xl">
          C#<span className="text-[var(--cs-lime)]">.</span>BÁSICO
        </a>
        <nav aria-label="Temas de C# básico" className="flex max-w-full gap-2 overflow-x-auto pb-1 font-mono text-[10px] font-extrabold tracking-wider sm:text-xs">
          {navItems.map(([href, label]) => (
            <a key={href} href={href} className="shrink-0 border-2 border-white/25 px-2.5 py-1.5 no-underline transition-colors hover:border-[var(--cs-lime)] hover:bg-[var(--cs-lime)] hover:text-[var(--cs-ink)]">
              {label}
            </a>
          ))}
        </nav>
      </header>

      <section id="inicio" className="cs-section">
        <div className="mx-auto grid max-w-[1500px] gap-12 px-5 py-20 sm:px-10 lg:grid-cols-[1.15fr_.85fr] lg:px-12 lg:py-28">
          <div className="cs-rise flex flex-col items-start gap-7">
            <div className="flex flex-wrap gap-0">
              <Badge className="h-auto rounded-none border-0 bg-[var(--cs-ink)] px-4 py-2 font-mono text-xs tracking-[0.18em] text-[var(--cs-bg)] uppercase">
                IPC2 · Punto de partida
              </Badge>
              <Badge className="h-auto rounded-none border-0 bg-[var(--cs-lime)] px-4 py-2 font-mono text-xs tracking-[0.18em] text-[var(--cs-ink)] uppercase">
                Cero → programa
              </Badge>
            </div>
            <h1 className="font-[family-name:var(--font-display)] text-[clamp(4.4rem,11vw,10rem)] leading-[0.78] tracking-[-0.06em] uppercase">
              C#<br />desde<br /><span className="text-[var(--cs-accent)]">cero.</span>
            </h1>
            <p className="max-w-2xl text-lg leading-relaxed font-bold sm:text-2xl">
              Una ruta práctica para leer, escribir y razonar programas de consola antes de entrar a POO, estructuras y archivos.
            </p>
          </div>

          <div className="cs-rise flex min-w-0 flex-col justify-center gap-5 [animation-delay:160ms]">
            <CodePanel code={firstProgram} label="Program.cs" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {["Sintaxis", "Datos", "Control", "Métodos"].map((item, index) => (
                <div key={item} className={cn("border-4 border-[var(--cs-ink)] p-3 text-center text-xs font-extrabold uppercase", index === 3 ? "bg-[var(--cs-lime)]" : "bg-[var(--cs-paper)]")}>
                  0{index + 1} · {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="cs-section bg-[var(--cs-ink)] text-[var(--cs-bg)]">
        <div className="mx-auto grid max-w-[1500px] gap-8 px-5 py-16 sm:px-10 lg:grid-cols-[.8fr_1.2fr] lg:px-12">
          <div className="flex flex-col gap-5">
            <p className="text-xs font-extrabold tracking-[0.2em] text-[var(--cs-lime)] uppercase">00 · Preparar el entorno</p>
            <h2 className="font-[family-name:var(--font-display)] text-4xl leading-none uppercase sm:text-6xl">Crear y ejecutar</h2>
            <p className="max-w-xl text-base leading-relaxed font-semibold text-white/75 sm:text-lg">
              Instala el SDK de .NET, crea una aplicación de consola y ejecútala. <code className="text-[var(--cs-lime)]">Program.cs</code> es el archivo inicial.
            </p>
            <Button onClick={runConsole} className="h-auto w-fit rounded-none border-4 border-[var(--cs-lime)] bg-[var(--cs-lime)] px-5 py-3 font-mono font-extrabold text-[var(--cs-ink)] shadow-[5px_5px_0_var(--cs-accent)] hover:bg-[var(--cs-bg)]">
              {consoleStep === 0 ? <PlayIcon data-icon="inline-start" /> : <ChevronRightIcon data-icon="inline-start" />}
              {consoleStep >= consoleLines.length ? "Reiniciar terminal" : "Ejecutar siguiente"}
            </Button>
          </div>
          <div className="min-h-72 border-4 border-[var(--cs-lime)] bg-black p-5 font-mono text-sm leading-8 text-[var(--cs-lime)] shadow-[8px_8px_0_var(--cs-accent)] sm:text-base">
            <div className="mb-4 flex items-center gap-2 border-b border-white/20 pb-3 text-white/60"><TerminalIcon className="size-4" /> terminal</div>
            {consoleLines.slice(0, consoleStep).map((line) => <div key={line}>{line}</div>)}
            <span className="cs-cursor inline-block h-5 w-2 bg-[var(--cs-lime)] align-middle" />
          </div>
        </div>
      </section>

      <section id="tipos" className="cs-section bg-[var(--cs-paper)]">
        <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-10 lg:px-12">
          <SectionHeading number="01" eyebrow="Variables y tipos" title="Cada dato tiene una forma" description="Una variable reserva un nombre para un valor. C# es fuertemente tipado: el compilador sabe qué operaciones permite cada tipo." />
          <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
            <div className="grid gap-3 sm:grid-cols-2">
              {dataTypes.map(([type, purpose, example], index) => (
                <article key={type} className={cn("grid grid-cols-[auto_1fr] gap-x-4 border-4 border-[var(--cs-ink)] p-4 shadow-[5px_5px_0_var(--cs-ink)]", index === 2 ? "bg-[var(--cs-lime)]" : "bg-white")}>
                  <code className="row-span-2 text-xl font-extrabold text-[var(--cs-accent)]">{type}</code>
                  <strong>{purpose}</strong>
                  <code className="text-sm opacity-70">{example}</code>
                </article>
              ))}
            </div>
            <div className="flex flex-col gap-5">
              <CodePanel label="declaraciones.cs" code={`int puntos = 100;\ndouble altura = 1.72;\ndecimal precio = 49.99m;\nbool activo = true;\nchar seccion = 'A';\nstring carnet = "202600001";\n\nvar curso = "IPC2";       // inferido como string\nconst double PI = 3.14159; // no puede cambiar\nstring? apodo = null;      // acepta ausencia de valor`} />
              <Note><code>var</code> no significa “sin tipo”: el compilador lo infiere y luego no cambia. Usa nombres descriptivos en camelCase.</Note>
            </div>
          </div>
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {operators.map(([name, symbols, purpose]) => (
              <article key={name} className="border-4 border-[var(--cs-ink)] bg-[var(--cs-wash)] p-4">
                <h3 className="font-extrabold">{name}</h3><code className="my-2 block text-sm text-[var(--cs-accent)]">{symbols}</code><p className="text-xs font-semibold opacity-70">{purpose}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="entrada" className="cs-section">
        <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-20 sm:px-10 lg:grid-cols-[.85fr_1.15fr] lg:px-12">
          <div>
            <SectionHeading number="02" eyebrow="Entrada, salida y conversión" title="Conversar con la consola" description="Console.Write muestra texto; Console.ReadLine devuelve string?. Antes de calcular, convierte y valida la entrada." />
            <div className="grid gap-3">
              {[
                ["Write", "Escribe sin salto de línea"],
                ["WriteLine", "Escribe y baja a la línea siguiente"],
                ["ReadLine", "Lee texto hasta presionar Enter"],
                ["$\"...{valor}\"", "Interpola valores dentro del texto"],
                [":F2", "Formatea un número con dos decimales"],
              ].map(([term, detail]) => <div key={term} className="flex items-center gap-4 border-l-[8px] border-[var(--cs-accent)] bg-[var(--cs-paper)] p-4"><code className="font-extrabold">{term}</code><span className="text-sm font-semibold">{detail}</span></div>)}
            </div>
          </div>
          <CodePanel label="entrada-segura.cs" code={inputProgram} />
        </div>
      </section>

      <section id="control" className="cs-section bg-[var(--cs-wash)]">
        <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-10 lg:px-12">
          <SectionHeading number="03" eyebrow="Flujo de control" title="Decidir y repetir" description="Las condiciones eligen una ruta; los ciclos repiten instrucciones. Las llaves hacen visible qué pertenece a cada bloque." />
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="flex min-w-0 flex-col gap-5"><h3 className="font-[family-name:var(--font-display)] text-3xl uppercase">Decisiones</h3><CodePanel label="if-switch.cs" code={decisionsProgram} /><Note>Usa <code>==</code> para comparar y <code>=</code> para asignar. Esta confusión es un clásico de los primeros programas.</Note></div>
            <div className="flex min-w-0 flex-col gap-5"><h3 className="font-[family-name:var(--font-display)] text-3xl uppercase">Ciclos</h3><CodePanel label="for-while-foreach.cs" code={loopsProgram} /><div className="grid grid-cols-2 gap-3"><div className="border-4 border-[var(--cs-ink)] bg-white p-4"><code className="font-bold">break</code><p className="mt-2 text-sm">Sale del ciclo.</p></div><div className="border-4 border-[var(--cs-ink)] bg-[var(--cs-lime)] p-4"><code className="font-bold">continue</code><p className="mt-2 text-sm">Salta a la siguiente vuelta.</p></div></div></div>
          </div>
        </div>
      </section>

      <section id="colecciones" className="cs-section bg-[var(--cs-paper)]">
        <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-20 sm:px-10 lg:grid-cols-[.9fr_1.1fr] lg:px-12">
          <div>
            <SectionHeading number="04" eyebrow="Arreglos y colecciones" title="Trabajar con muchos datos" description="Agrupa valores del mismo tipo. Elige la estructura según la forma en que necesitas guardar y encontrar la información." />
            <div className="grid gap-4">
              {[
                ["T[]", "Tamaño fijo", "Acceso rápido por índice"],
                ["List<T>", "Tamaño dinámico", "Add, Remove, Count"],
                ["Dictionary<K,V>", "Clave → valor", "Búsqueda por una clave única"],
              ].map(([name, size, use]) => <article key={name} className="border-4 border-[var(--cs-ink)] bg-white p-5 shadow-[6px_6px_0_var(--cs-accent)]"><code className="text-xl font-extrabold text-[var(--cs-accent)]">{name}</code><p className="mt-2 font-bold">{size}</p><p className="text-sm opacity-70">{use}</p></article>)}
            </div>
          </div>
          <CodePanel label="colecciones.cs" code={collectionsProgram} />
        </div>
      </section>

      <section id="metodos" className="cs-section">
        <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-10 lg:px-12">
          <SectionHeading number="05" eyebrow="Métodos" title="Nombrar una solución" description="Un método agrupa una tarea reutilizable. Puede recibir parámetros y devolver un resultado; eso evita duplicación y permite probar cada parte." />
          <div className="grid gap-10 lg:grid-cols-[1.15fr_.85fr]">
            <CodePanel label="metodos.cs" code={methodsProgram} />
            <div className="flex flex-col gap-4">
              {[
                ["static", "Puede ejecutarse sin crear un objeto."],
                ["double", "Tipo del valor que devuelve."],
                ["CalcularPromedio", "Nombre en PascalCase y con intención."],
                ["int[] notas", "Parámetro: dato que recibe."],
                ["return", "Entrega el resultado y termina el método."],
                ["= 61", "Parámetro opcional con valor predeterminado."],
              ].map(([term, detail], index) => <div key={term} className={cn("grid grid-cols-[minmax(8rem,.45fr)_1fr] gap-4 border-4 border-[var(--cs-ink)] p-4", index === 4 ? "bg-[var(--cs-lime)]" : "bg-[var(--cs-paper)]")}><code className="font-extrabold text-[var(--cs-accent)]">{term}</code><p className="text-sm font-semibold">{detail}</p></div>)}
            </div>
          </div>
        </div>
      </section>

      <section id="errores" className="cs-section bg-[var(--cs-ink)] text-[var(--cs-bg)]">
        <div className="mx-auto grid max-w-[1500px] gap-10 px-5 py-20 sm:px-10 lg:grid-cols-[.82fr_1.18fr] lg:px-12">
          <div>
            <SectionHeading number="06" eyebrow="Errores y excepciones" title="Fallar con claridad" description="El compilador detecta errores de sintaxis y tipos. En ejecución, valida lo esperado y captura solo las excepciones que sabes resolver." />
            <div className="grid gap-3 text-[var(--cs-ink)]">
              <div className="bg-[var(--cs-lime)] p-4 font-bold">Compilación · el código no puede construirse.</div>
              <div className="bg-[var(--cs-blue)] p-4 font-bold">Ejecución · ocurre una excepción al usar el programa.</div>
              <div className="bg-[var(--cs-bg)] p-4 font-bold">Lógica · compila, pero produce el resultado equivocado.</div>
            </div>
          </div>
          <CodePanel label="excepciones.cs" code={exceptionsProgram} />
        </div>
      </section>

      <section id="reto" className="cs-section bg-[var(--cs-wash)]">
        <div className="mx-auto max-w-[1500px] px-5 py-20 sm:px-10 lg:px-12">
          <SectionHeading number="07" eyebrow="Integración" title="Un programa completo" description="Este registro de notas junta entrada, validación, condicionales, ciclos, una lista, operadores y salida formateada." />
          <CodePanel label="reto-registro-notas.cs" code={completeProgram} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {["Cambia la nota mínima a 70", "Muestra la nota mayor", "Cuenta cuántos aprobaron", "Extrae el promedio a un método"].map((task, index) => <div key={task} className={cn("border-4 border-[var(--cs-ink)] p-5 text-sm font-extrabold shadow-[5px_5px_0_var(--cs-ink)]", index === 3 ? "bg-[var(--cs-lime)]" : "bg-white")}><span className="mb-3 block text-[var(--cs-accent)]">EXTENSIÓN 0{index + 1}</span>{task}</div>)}
          </div>
        </div>
      </section>

      <section className="cs-section bg-[var(--cs-paper)]">
        <div className="mx-auto max-w-4xl px-5 py-20 sm:px-10">
          <SectionHeading number="08" eyebrow="Comprobación rápida" title="¿Listo para continuar?" description="Tres preguntas para verificar las decisiones fundamentales antes de pasar a programación orientada a objetos." />
          <div className="border-[6px] border-[var(--cs-ink)] bg-white p-5 shadow-[10px_10px_0_var(--cs-accent)] sm:p-8">
            {finished ? (
              <div className="flex flex-col items-center gap-6 py-8 text-center">
                <div className="flex size-24 items-center justify-center rounded-full border-[6px] border-[var(--cs-ink)] bg-[var(--cs-lime)] font-[family-name:var(--font-display)] text-4xl">{score}/3</div>
                <h3 className="font-[family-name:var(--font-display)] text-3xl uppercase">{score === 3 ? "Base sólida" : "Una vuelta más"}</h3>
                <p className="max-w-lg font-semibold">{score === 3 ? "Ya tienes el vocabulario mínimo para abordar clases y objetos." : "Revisa las secciones marcadas por las preguntas y vuelve a intentarlo."}</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Button onClick={resetQuiz} variant="outline" className="h-auto rounded-none border-4 border-[var(--cs-ink)] px-5 py-3 font-mono font-extrabold"><RotateCcwIcon data-icon="inline-start" />Repetir</Button>
                  <Link href="/laboratorios/poo-lab" className={cn(buttonVariants(), "h-auto rounded-none border-4 border-[var(--cs-ink)] bg-[var(--cs-lime)] px-5 py-3 font-mono font-extrabold text-[var(--cs-ink)] hover:bg-[var(--cs-wash)]")}>Ir a POO<ArrowRightIcon data-icon="inline-end" /></Link>
                </div>
              </div>
            ) : (
              <div className="flex flex-col gap-6">
                <div className="flex items-center justify-between gap-3 font-mono text-xs font-extrabold tracking-wider uppercase"><span>Pregunta {quizIndex + 1} de {quiz.length}</span><span>{score} correctas</span></div>
                <h3 className="text-xl leading-snug font-extrabold sm:text-2xl">{quiz[quizIndex].question}</h3>
                <div className="grid gap-3">
                  {quiz[quizIndex].options.map((option, index) => {
                    const correct = index === quiz[quizIndex].answer
                    const isSelected = index === selected
                    return <Button key={option} type="button" variant="outline" onClick={() => chooseAnswer(index)} disabled={selected !== null} className={cn("h-auto min-h-14 justify-start rounded-none border-4 border-[var(--cs-ink)] px-4 py-3 text-left font-mono font-bold whitespace-normal disabled:pointer-events-none disabled:opacity-100", selected !== null && correct && "bg-[var(--cs-lime)]", isSelected && !correct && "bg-[var(--cs-wash)] line-through")}><span className="mr-2 inline-flex size-7 shrink-0 items-center justify-center border-2 border-current">{selected !== null && correct ? <CheckIcon /> : String.fromCharCode(65 + index)}</span>{option}</Button>
                  })}
                </div>
                {selected !== null ? <div className="flex flex-col gap-4 border-l-[8px] border-[var(--cs-accent)] bg-[var(--cs-bg)] p-4"><p className="font-semibold">{quiz[quizIndex].detail}</p><Button onClick={nextQuestion} className="h-auto w-fit rounded-none bg-[var(--cs-ink)] px-5 py-3 font-mono font-extrabold text-[var(--cs-bg)] hover:bg-[var(--cs-accent)]">{quizIndex === quiz.length - 1 ? "Ver resultado" : "Siguiente"}<ArrowRightIcon data-icon="inline-end" /></Button></div> : null}
              </div>
            )}
          </div>
        </div>
      </section>

      <footer className="bg-[var(--cs-accent)] px-5 py-12 text-white sm:px-10">
        <div className="mx-auto flex max-w-[1500px] flex-col justify-between gap-6 sm:flex-row sm:items-end">
          <div><p className="font-mono text-xs font-extrabold tracking-[0.2em] uppercase">Siguiente parada</p><h2 className="mt-2 font-[family-name:var(--font-display)] text-4xl uppercase sm:text-6xl">Clases y objetos.</h2></div>
          <Link href="/laboratorios/poo-lab" className="inline-flex w-fit items-center gap-2 border-4 border-[var(--cs-ink)] bg-[var(--cs-lime)] px-5 py-3 font-mono font-extrabold text-[var(--cs-ink)] no-underline shadow-[6px_6px_0_var(--cs-ink)] transition-transform hover:-translate-y-1">Continuar a POO <ArrowRightIcon className="size-4" /></Link>
        </div>
      </footer>
    </main>
  )
}
