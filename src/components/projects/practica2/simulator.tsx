"use client"

import { PauseIcon, PlayIcon, PlusIcon, RotateCcwIcon, SearchIcon } from "lucide-react"
import { useMemo, useState } from "react"

import { DEMO_SONGS, type DemoSong } from "@/components/projects/practica2/data"

type TreeNode = {
  song: DemoSong
  left: TreeNode | null
  right: TreeNode | null
}

type PositionedNode = {
  song: DemoSong
  x: number
  y: number
  parentX?: number
  parentY?: number
}

const INITIAL_QUEUE = [1, 2, 3]

function insert(root: TreeNode | null, song: DemoSong): TreeNode {
  if (!root) return { song, left: null, right: null }
  const order = song.titulo.localeCompare(root.song.titulo, "es", { sensitivity: "base" })
  if (order < 0) root.left = insert(root.left, song)
  else if (order > 0) root.right = insert(root.right, song)
  return root
}

function buildTree(songs: DemoSong[]) {
  return songs.reduce<TreeNode | null>((root, song) => insert(root, song), null)
}

function positionTree(
  node: TreeNode | null,
  minX: number,
  maxX: number,
  y: number,
  parent?: { x: number; y: number }
): PositionedNode[] {
  if (!node) return []
  const x = (minX + maxX) / 2
  return [
    { song: node.song, x, y, parentX: parent?.x, parentY: parent?.y },
    ...positionTree(node.left, minX, x, y + 92, { x, y }),
    ...positionTree(node.right, x, maxX, y + 92, { x, y }),
  ]
}

export function MusicPlayerSimulator() {
  const [queue, setQueue] = useState(INITIAL_QUEUE)
  const [selectedId, setSelectedId] = useState(1)
  const [nowPlaying, setNowPlaying] = useState<DemoSong | null>(null)
  const [search, setSearch] = useState("Layla")
  const [searchResult, setSearchResult] = useState<DemoSong | null | undefined>(undefined)

  const queueSongs = queue.map((id) => DEMO_SONGS.find((song) => song.id === id)!).filter(Boolean)
  const total = queueSongs.reduce((sum, song) => sum + song.duracion, 0)
  const treeNodes = useMemo(() => positionTree(buildTree([...DEMO_SONGS]), 44, 756, 42), [])

  function enqueue() {
    setQueue((current) => [...current, selectedId])
  }

  function playNext() {
    setQueue((current) => {
      if (current.length === 0) {
        setNowPlaying(null)
        return current
      }
      setNowPlaying(DEMO_SONGS.find((song) => song.id === current[0]) ?? null)
      return current.slice(1)
    })
  }

  function runSearch() {
    const normalized = search.trim().toLocaleLowerCase("es")
    setSearchResult(
      DEMO_SONGS.find((song) => song.titulo.toLocaleLowerCase("es") === normalized) ?? null
    )
  }

  function reset() {
    setQueue(INITIAL_QUEUE)
    setNowPlaying(null)
    setSearch("Layla")
    setSearchResult(undefined)
  }

  return (
    <section id="simulador" className="scroll-mt-28 border-y border-white/10 bg-[#09090B] py-20">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionKicker number="05" label="Simulación lógica" />
        <div className="mt-4 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <h2 className="max-w-3xl text-3xl font-black tracking-[-0.04em] text-white sm:text-5xl">
              Simulación de cola y árbol
            </h2>
            <p className="mt-5 max-w-2xl text-sm leading-7 text-[#A1A1AA] sm:text-base">
              Demuestra el orden FIFO, el tiempo estimado y la búsqueda por título. La entrega se implementa con nodos propios en C#.
            </p>
          </div>
          <button
            type="button"
            onClick={reset}
            className="inline-flex h-10 items-center justify-center gap-2 self-start border border-white/15 bg-white/5 px-4 font-mono text-xs font-bold text-white transition hover:border-[#006FEE] hover:text-[#006FEE]"
          >
            <RotateCcwIcon className="size-4" /> Reiniciar demo
          </button>
        </div>

        <div className="mt-10 grid gap-5 xl:grid-cols-[0.92fr_1.08fr]">
          <div className="border border-white/10 bg-[#18181B] p-5 sm:p-7">
            <div className="flex items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <p className="font-mono text-[10px] font-bold tracking-[0.18em] text-[#006FEE] uppercase">FIFO / Cola</p>
                <h3 className="mt-1 text-2xl font-extrabold text-white">Siguiente en reproducción</h3>
              </div>
              <div className="text-right">
                <strong className="block text-3xl text-[#006FEE]">{total}</strong>
                <span className="font-mono text-[10px] text-[#A1A1AA] uppercase">minutos</span>
              </div>
            </div>

            <div className="mt-5 flex gap-2">
              <select
                aria-label="Canción para agregar"
                value={selectedId}
                onChange={(event) => setSelectedId(Number(event.target.value))}
                className="min-w-0 flex-1 border border-white/15 bg-[#18181B] px-3 text-sm text-white outline-none focus:border-[#006FEE]"
              >
                {DEMO_SONGS.map((song) => (
                  <option key={song.id} value={song.id}>{song.titulo} · {song.duracion} min</option>
                ))}
              </select>
              <button
                type="button"
                onClick={enqueue}
                className="grid size-11 shrink-0 place-items-center bg-[#006FEE] text-black transition hover:bg-[#338EF7]"
                aria-label="Agregar canción a la cola"
              >
                <PlusIcon className="size-5" />
              </button>
            </div>

            <div className="mt-5 min-h-64 space-y-2">
              {queueSongs.length > 0 ? queueSongs.map((song, index) => (
                <div key={`${song.id}-${index}`} className="group flex items-center gap-4 border border-white/10 bg-[#18181B] p-3">
                  <span className="grid size-8 shrink-0 place-items-center border border-[#006FEE]/40 font-mono text-xs font-bold text-[#006FEE]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="min-w-0 flex-1">
                    <strong className="block truncate text-sm text-white">{song.titulo}</strong>
                    <span className="block truncate text-xs text-[#A1A1AA]">{song.artista} · {song.genero}</span>
                  </div>
                  <span className="font-mono text-xs text-[#006FEE]">{song.duracion} min</span>
                </div>
              )) : (
                <div className="grid min-h-52 place-items-center border border-dashed border-white/15 text-center">
                  <div>
                    <PauseIcon className="mx-auto size-7 text-[#71717A]" />
                    <p className="mt-3 text-sm font-bold text-white">No hay canciones en espera</p>
                    <p className="mt-1 text-xs text-[#A1A1AA]">Caso obligatorio de la hoja de calificación.</p>
                  </div>
                </div>
              )}
            </div>

            <button
              type="button"
              onClick={playNext}
              className="mt-5 inline-flex h-11 w-full items-center justify-center gap-2 bg-[#F31260] px-4 text-sm font-black text-black transition hover:bg-[#F31260]"
            >
              <PlayIcon className="size-4 fill-current" /> Reproducir siguiente
            </button>

            <div aria-live="polite" className="mt-3 min-h-16 border-l-2 border-[#F31260] bg-[#F31260]/8 px-4 py-3 text-xs leading-5 text-[#A1A1AA]">
              {nowPlaying
                ? <><span className="font-mono text-[#F31260]">REPRODUCIENDO</span><br />{nowPlaying.titulo} — {nowPlaying.artista}</>
                : "Presione reproducir. Si la cola ya está vacía, el sistema conserva el mensaje obligatorio."}
            </div>
          </div>

          <div className="border border-white/10 bg-[#0B0B0D] p-5 sm:p-7">
            <div className="border-b border-white/10 pb-5">
              <p className="font-mono text-[10px] font-bold tracking-[0.18em] text-[#F31260] uppercase">ABB / Biblioteca</p>
              <h3 className="mt-1 text-2xl font-extrabold text-white">Orden alfabético por título</h3>
            </div>

            <div className="mt-5 overflow-hidden border border-white/10 bg-black/30">
              <svg viewBox="0 0 800 590" role="img" aria-label="Árbol binario de canciones ordenado por título" className="h-auto min-h-72 w-full">
                {treeNodes.map((node) => node.parentX !== undefined ? (
                  <line key={`edge-${node.song.id}`} x1={node.parentX} y1={node.parentY! + 22} x2={node.x} y2={node.y - 22} stroke="#71717A" strokeWidth="2" />
                ) : null)}
                {treeNodes.map((node) => (
                  <g key={node.song.id}>
                    <rect x={node.x - 74} y={node.y - 23} width="148" height="46" rx="4" fill="#18181B" stroke="#F31260" strokeWidth="2" />
                    <text x={node.x} y={node.y - 2} textAnchor="middle" fill="#ECEDEE" fontSize="11" fontWeight="700">{shortTitle(node.song.titulo)}</text>
                    <text x={node.x} y={node.y + 14} textAnchor="middle" fill="#A1A1AA" fontSize="9">{node.song.genero} · {node.song.duracion} min</text>
                  </g>
                ))}
              </svg>
            </div>

            <div className="mt-5 flex gap-2">
              <input
                value={search}
                onChange={(event) => setSearch(event.target.value)}
                onKeyDown={(event) => { if (event.key === "Enter") runSearch() }}
                list="titulos-practica2"
                placeholder="Título exacto"
                className="h-11 min-w-0 flex-1 border border-white/15 bg-[#18181B] px-3 text-sm text-white outline-none placeholder:text-[#71717A] focus:border-[#F31260]"
              />
              <datalist id="titulos-practica2">
                {DEMO_SONGS.map((song) => <option key={song.id} value={song.titulo} />)}
              </datalist>
              <button
                type="button"
                onClick={runSearch}
                className="inline-flex h-11 items-center justify-center gap-2 bg-[#F31260] px-4 text-sm font-black text-black transition hover:bg-[#F31260]"
              >
                <SearchIcon className="size-4" /> Buscar
              </button>
            </div>

            <div aria-live="polite" className="mt-3 min-h-20 border border-white/10 bg-[#18181B] p-4 text-sm">
              {searchResult === undefined ? (
                <span className="text-[#A1A1AA]">Escriba un título exacto para recorrer el ABB.</span>
              ) : searchResult ? (
                <div className="flex items-center justify-between gap-4">
                  <div><strong className="text-white">{searchResult.titulo}</strong><p className="mt-1 text-xs text-[#A1A1AA]">{searchResult.artista} · {searchResult.genero}</p></div>
                  <span className="border border-[#17C964]/35 bg-[#17C964]/10 px-2 py-1 font-mono text-[10px] font-bold text-[#A1A1AA]">ENCONTRADA</span>
                </div>
              ) : (
                <div className="flex items-center justify-between gap-4 text-[#A1A1AA]"><span>Canción no encontrada</span><span className="font-mono text-[10px] text-[#17C964]">SIN COINCIDENCIA</span></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function SectionKicker({ number, label }: { number: string; label: string }) {
  return (
    <div className="flex items-center gap-3 font-mono text-[10px] font-bold tracking-[0.18em] uppercase">
      <span className="bg-[#006FEE] px-2 py-1 text-black">{number}</span>
      <span className="text-[#A1A1AA]">{label}</span>
    </div>
  )
}

function shortTitle(title: string) {
  return title.length > 19 ? `${title.slice(0, 18)}…` : title
}
