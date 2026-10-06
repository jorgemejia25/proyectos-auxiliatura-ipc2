"use client"

import { CheckCircle2Icon, XCircleIcon } from "lucide-react"
import { useState } from "react"

import { analizarNit, extraerTiempo, ivaEsperado, quetzales, TIEMPO_REGEX, totalEsperado } from "@/components/projects/proyecto3/logic"

const NIT_PRESETS = ["7378106", "8338817", "5123456", "1000002K"]
const TIEMPO_PRESETS = ["Guatemala, 15/01/2025 15:25 hrs.", "Ciudad de Guatemala, 16/01/2025 09:05 hrs.", "Guatemala, 31/02/2025 24:10 hrs."]

/** Laboratorio interactivo: NIT paso a paso, regex de TIEMPO y cálculo de IVA/TOTAL. */
export function Validaciones() {
  const [nit, setNit] = useState("7378106")
  const [tiempo, setTiempo] = useState(TIEMPO_PRESETS[0])
  const [valor, setValor] = useState("350.50")

  const r = analizarNit(nit)
  const t = extraerTiempo(tiempo)
  const match = TIEMPO_REGEX.exec(tiempo)
  const v = Number(valor)
  const valorOk = Number.isFinite(v) && v > 0

  return (
    <section id="validaciones" className="scroll-mt-28 py-20">
      <Heading number="03" eyebrow="Reglas del mensaje" title="Validaciones" description="Tres reglas deciden si una factura se aprueba: NIT con verificador correcto, fecha extraída con regex y montos bien calculados. Pruébelas aquí." />

      <div className="mx-auto mt-10 grid max-w-7xl gap-5 px-5 sm:px-8 xl:grid-cols-[1.15fr_0.85fr]">
        <article className="border border-[#006FEE]/35 bg-[#18181B] p-6 sm:p-7">
          <p className="font-mono text-[10px] font-black tracking-[0.18em] text-[#006FEE] uppercase">Algoritmo de NIT · módulo 11</p>
          <div className="mt-5 flex flex-wrap gap-2">
            <input
              value={nit}
              onChange={(e) => setNit(e.target.value)}
              aria-label="NIT a validar"
              className="h-11 min-w-0 flex-1 border border-white/15 bg-[#09090B] px-3 font-mono text-sm text-white outline-none focus:border-[#006FEE]"
            />
            {NIT_PRESETS.map((n) => (
              <button key={n} type="button" onClick={() => setNit(n)} className="h-11 border border-white/15 px-3 font-mono text-[11px] text-[#A1A1AA] transition hover:border-[#006FEE] hover:text-white">{n}</button>
            ))}
          </div>

          {r.formatoValido ? (
            <>
              <div className="mt-6 overflow-x-auto">
                <div className="flex min-w-max gap-1.5">
                  {r.pasos.map((p, i) => (
                    <div key={i} className="w-14 border border-white/10 bg-[#09090B] text-center font-mono">
                      <div className="border-b border-white/10 py-2 text-lg font-black text-white">{p.digito}</div>
                      <div className="py-1 text-[10px] text-[#71717A]">× {p.posicion}</div>
                      <div className="border-t border-white/10 py-1.5 text-xs font-bold text-[#338EF7]">{p.producto}</div>
                    </div>
                  ))}
                  <div className="w-14 border border-[#F31260]/50 bg-[#F31260]/10 text-center font-mono">
                    <div className="border-b border-white/10 py-2 text-lg font-black text-[#F31260]">{r.verificadorRecibido}</div>
                    <div className="py-1 text-[10px] text-[#71717A]">pos 1</div>
                    <div className="border-t border-white/10 py-1.5 text-[10px] font-bold text-[#A1A1AA]">verif.</div>
                  </div>
                </div>
              </div>
              <ol className="mt-6 grid gap-2 font-mono text-xs text-[#A1A1AA] sm:grid-cols-2">
                <Step n="1–2" text={`Suma de productos = ${r.suma}`} />
                <Step n="3" text={`${r.suma} mod 11 = ${r.modulo}`} />
                <Step n="4" text={`11 − ${r.modulo} = ${r.resta}`} />
                <Step n="5" text={`${r.resta} mod 11 = ${r.resultado}${r.resultado === 10 ? " → K" : ""}`} />
              </ol>
            </>
          ) : (
            <p className="mt-6 border border-dashed border-white/15 p-4 text-xs text-[#A1A1AA]">Formato inválido: se esperan 1 a 20 dígitos seguidos del verificador (0–9 o K).</p>
          )}

          <Verdict ok={r.valido} okText={`NIT válido · verificador ${r.verificadorEsperado}`} badText={r.formatoValido ? `NIT inválido · esperado ${r.verificadorEsperado}, recibido ${r.verificadorRecibido}` : "NIT inválido · formato"} />
          {nit.trim() === "5123456" ? (
            <p className="mt-3 text-xs leading-6 text-[#F5A524]">Este NIT viene en el ejemplo del enunciado y no pasa el algoritmo. Por eso, con el JSON de ejemplo, NITS_INVALIDOS debería ser 1.</p>
          ) : null}
        </article>

        <div className="grid gap-5">
          <article className="border border-[#F31260]/35 bg-[#18181B] p-6">
            <p className="font-mono text-[10px] font-black tracking-[0.18em] text-[#F31260] uppercase">Regex · TIEMPO</p>
            <input
              value={tiempo}
              onChange={(e) => setTiempo(e.target.value)}
              aria-label="Texto del campo TIEMPO"
              className="mt-4 h-11 w-full border border-white/15 bg-[#09090B] px-3 font-mono text-xs text-white outline-none focus:border-[#F31260]"
            />
            <div className="mt-2 flex flex-wrap gap-2">
              {TIEMPO_PRESETS.map((p, i) => (
                <button key={p} type="button" onClick={() => setTiempo(p)} className="border border-white/15 px-2 py-1 font-mono text-[10px] text-[#A1A1AA] hover:border-[#F31260] hover:text-white">Ejemplo {i + 1}</button>
              ))}
            </div>
            <div className="mt-4 break-words border border-white/10 bg-[#09090B] p-3 font-mono text-xs leading-6 text-[#71717A]">
              {match ? (
                <>
                  {tiempo.slice(0, match.index)}
                  <mark className="bg-[#F31260]/25 px-0.5 text-white">{match[0]}</mark>
                  {tiempo.slice(match.index + match[0].length)}
                </>
              ) : tiempo || "—"}
            </div>
            <p className="mt-3 font-mono text-[10px] break-all text-[#71717A]">{String(TIEMPO_REGEX)}</p>
            <Verdict ok={Boolean(t)} okText={`Fecha ${t?.fecha.split("-").reverse().join("/")} · hora ${t?.hora}`} badText={match ? "Fecha u hora fuera de rango" : "No se encontró dd/mm/yyyy hh:mi"} />
          </article>

          <article className="border border-white/10 bg-[#18181B] p-6">
            <p className="font-mono text-[10px] font-black tracking-[0.18em] text-[#17C964] uppercase">IVA y TOTAL esperados</p>
            <label className="mt-4 flex items-center gap-3">
              <span className="font-mono text-xs text-[#A1A1AA]">VALOR</span>
              <input
                value={valor}
                onChange={(e) => setValor(e.target.value)}
                inputMode="decimal"
                className="h-11 min-w-0 flex-1 border border-white/15 bg-[#09090B] px-3 font-mono text-sm text-white outline-none focus:border-[#17C964]"
              />
            </label>
            <div className="mt-4 grid grid-cols-2 gap-px bg-white/10 font-mono text-xs">
              <div className="bg-[#09090B] p-3"><span className="text-[#71717A]">IVA = REDONDEAR(V × 0.12, 2)</span><strong className="mt-1 block text-base text-white">{valorOk ? quetzales(ivaEsperado(v)) : "—"}</strong></div>
              <div className="bg-[#09090B] p-3"><span className="text-[#71717A]">TOTAL = V + IVA</span><strong className="mt-1 block text-base text-white">{valorOk ? quetzales(totalEsperado(v)) : "—"}</strong></div>
            </div>
            <p className="mt-3 text-xs leading-6 text-[#A1A1AA]">En C# use <code className="text-[#17C964]">decimal</code>, nunca <code className="text-[#17C964]">double</code>: con double, 0.1 + 0.2 no es 0.3 exacto y la comparación IVA == esperado falla.</p>
          </article>
        </div>
      </div>
    </section>
  )
}

function Step({ n, text }: { n: string; text: string }) {
  return <li className="flex items-center gap-3 border border-white/10 bg-[#09090B] px-3 py-2"><span className="text-[#006FEE]">{n}</span>{text}</li>
}

function Verdict({ ok, okText, badText }: { ok: boolean; okText: string; badText: string }) {
  return (
    <div aria-live="polite" className={`mt-5 flex items-center gap-2 border px-4 py-3 text-xs font-bold ${ok ? "border-[#17C964]/40 bg-[#17C964]/10 text-[#17C964]" : "border-[#F31260]/40 bg-[#F31260]/10 text-[#F31260]"}`}>
      {ok ? <CheckCircle2Icon className="size-4 shrink-0" /> : <XCircleIcon className="size-4 shrink-0" />}
      {ok ? okText : badText}
    </div>
  )
}

export function Heading({ number, eyebrow, title, description }: { number: string; eyebrow: string; title: string; description: string }) {
  return (
    <div className="mx-auto max-w-7xl px-5 sm:px-8">
      <div className="flex items-center gap-3 font-mono text-[10px] font-bold tracking-[0.18em] uppercase"><span className="bg-[#006FEE] px-2 py-1 text-black">{number}</span><span className="text-[#A1A1AA]">{eyebrow}</span></div>
      <div className="mt-4 grid gap-5 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
        <h2 className="text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">{title}</h2>
        <p className="max-w-2xl text-sm leading-7 text-[#A1A1AA] lg:justify-self-end">{description}</p>
      </div>
    </div>
  )
}
