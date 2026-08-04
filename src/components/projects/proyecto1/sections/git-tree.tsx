import { css } from "@/components/dc/css"

const GIT_LOG_GRAPH = [
  "*   merge docs          (tag: v4.0.0)",
  "|\\",
  "| * docs(ensayo)",
  "* | merge ruta          (tag: v3.0.0)",
  "|\\",
  "| * feat(ruta)",
  "* | merge xml           (tag: v2.0.0)",
  "|\\",
  "| * feat(xml)",
  "* | merge tda           (tag: v1.0.0)",
  "|\\",
  "| * feat(tda)",
  "* chore: init      repo",
].join("\n")

type CommitDotProps = {
  cx: number
  cy: number
  fill: string
  r?: number
}

/**
 * Commit node on the git graph.
 */
function CommitDot({ cx, cy, fill, r = 9 }: CommitDotProps) {
  return (
    <>
      <circle cx={cx} cy={cy} r={r + 2} fill="#120720" />
      <circle cx={cx} cy={cy} r={r} fill={fill} stroke="#120720" strokeWidth={3} />
    </>
  )
}

type TagBadgeProps = {
  x: number
  y: number
  label: string
}

/**
 * Release tag label hanging above the main lane.
 */
function TagBadge({ x, y, label }: TagBadgeProps) {
  const width = label.length * 8.2 + 18
  return (
    <g>
      <rect
        x={x - width / 2}
        y={y - 14}
        width={width}
        height={28}
        fill="#C6FF3D"
        stroke="#120720"
        strokeWidth={3}
      />
      <text
        x={x}
        y={y + 5}
        textAnchor="middle"
        fill="#120720"
        style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, fontWeight: 700 }}
      >
        {label}
      </text>
    </g>
  )
}

/**
 * Visual git tree for the recommended Proyecto1 workflow:
 * main trunk, feature branches, merges and weekly release tags.
 */
export function Proyecto1GitTree() {
  const lanes = {
    main: 78,
    tda: 148,
    xml: 218,
    ruta: 288,
    docs: 358,
  } as const

  return (
    <div
      style={css(
        "margin-top:22px;background:#EDE4FF;border:5px solid #C6FF3D;box-shadow:12px 12px 0 #7C3AED;padding:18px"
      )}
    >
      <div
        style={css(
          "display:flex;flex-wrap:wrap;align-items:baseline;justify-content:space-between;gap:12px;margin-bottom:14px"
        )}
      >
        <div>
          <div
            style={css(
              "font-family:'Archivo Black',sans-serif;font-size:22px;text-transform:uppercase;color:#120720;line-height:1"
            )}
          >
            {"Árbol de Git esperado"}
          </div>
          <p style={css("margin:8px 0 0;font-size:13.5px;line-height:1.5;color:#3B0764;max-width:640px")}>
            {"Así debería verse el historial al final del proyecto: features que salen de "}
            <strong>{"main"}</strong>
            {", regresan con merge y cierran cada semana con un tag de release."}
          </p>
        </div>

        <div style={css("display:flex;flex-wrap:wrap;gap:8px;font-size:11px;font-weight:700")}>
          <span style={css("background:#7C3AED;color:#fff;border:3px solid #120720;padding:4px 8px")}>
            {"main"}
          </span>
          <span style={css("background:#35E0FF;color:#06142E;border:3px solid #120720;padding:4px 8px")}>
            {"feature/*"}
          </span>
          <span style={css("background:#C6FF3D;color:#120720;border:3px solid #120720;padding:4px 8px")}>
            {"tag release"}
          </span>
          <span style={css("background:#FF6FD8;color:#120720;border:3px solid #120720;padding:4px 8px")}>
            {"merge"}
          </span>
        </div>
      </div>

      <div style={css("overflow:auto;border:4px solid #120720;background:#120720")}>
        <svg
          viewBox="0 0 980 420"
          width="980"
          height="420"
          role="img"
          aria-label="Árbol de Git con main, features y tags v1 a v4"
          style={{ display: "block", minWidth: 760, width: "100%", height: "auto" }}
        >
          {/* Lane labels */}
          <text x={16} y={lanes.main + 5} fill="#C6FF3D" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 12, fontWeight: 700 }}>
            main
          </text>
          <text x={16} y={lanes.tda + 5} fill="#35E0FF" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, fontWeight: 700 }}>
            feature/tda
          </text>
          <text x={16} y={lanes.xml + 5} fill="#35E0FF" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, fontWeight: 700 }}>
            feature/xml
          </text>
          <text x={16} y={lanes.ruta + 5} fill="#35E0FF" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, fontWeight: 700 }}>
            feature/ruta
          </text>
          <text x={16} y={lanes.docs + 5} fill="#35E0FF" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 11, fontWeight: 700 }}>
            feature/docs
          </text>

          {/* Main trunk */}
          <path
            d={`M 130 ${lanes.main} H 930`}
            stroke="#7C3AED"
            strokeWidth={6}
            fill="none"
            strokeLinecap="square"
          />

          {/* feature/tda branch */}
          <path
            d={`M 170 ${lanes.main} C 190 ${lanes.main}, 200 ${lanes.tda}, 220 ${lanes.tda} H 300 C 320 ${lanes.tda}, 330 ${lanes.main}, 350 ${lanes.main}`}
            stroke="#35E0FF"
            strokeWidth={5}
            fill="none"
            strokeLinecap="square"
          />

          {/* feature/xml branch */}
          <path
            d={`M 410 ${lanes.main} C 430 ${lanes.main}, 440 ${lanes.xml}, 460 ${lanes.xml} H 560 C 580 ${lanes.xml}, 590 ${lanes.main}, 610 ${lanes.main}`}
            stroke="#35E0FF"
            strokeWidth={5}
            fill="none"
            strokeLinecap="square"
          />

          {/* feature/ruta branch */}
          <path
            d={`M 650 ${lanes.main} C 670 ${lanes.main}, 680 ${lanes.ruta}, 700 ${lanes.ruta} H 780 C 800 ${lanes.ruta}, 810 ${lanes.main}, 830 ${lanes.main}`}
            stroke="#35E0FF"
            strokeWidth={5}
            fill="none"
            strokeLinecap="square"
          />

          {/* feature/docs branch */}
          <path
            d={`M 850 ${lanes.main} C 865 ${lanes.main}, 872 ${lanes.docs}, 885 ${lanes.docs} H 915 C 925 ${lanes.docs}, 930 ${lanes.main}, 940 ${lanes.main}`}
            stroke="#35E0FF"
            strokeWidth={5}
            fill="none"
            strokeLinecap="square"
          />

          {/* Tags */}
          <TagBadge x={370} y={34} label="v1.0.0" />
          <TagBadge x={630} y={34} label="v2.0.0" />
          <TagBadge x={850} y={34} label="v3.0.0" />
          <TagBadge x={940} y={34} label="v4.0.0 FINAL" />

          {/* Tag stems */}
          <path d={`M 370 48 V ${lanes.main - 12}`} stroke="#C6FF3D" strokeWidth={3} />
          <path d={`M 630 48 V ${lanes.main - 12}`} stroke="#C6FF3D" strokeWidth={3} />
          <path d={`M 850 48 V ${lanes.main - 12}`} stroke="#C6FF3D" strokeWidth={3} />
          <path d={`M 940 48 V ${lanes.main - 12}`} stroke="#C6FF3D" strokeWidth={3} />

          {/* Main commits */}
          <CommitDot cx={150} cy={lanes.main} fill="#7C3AED" />
          <CommitDot cx={370} cy={lanes.main} fill="#FF6FD8" />
          <CommitDot cx={610} cy={lanes.main} fill="#FF6FD8" />
          <CommitDot cx={830} cy={lanes.main} fill="#FF6FD8" />
          <CommitDot cx={940} cy={lanes.main} fill="#C6FF3D" />

          {/* Feature commits */}
          <CommitDot cx={250} cy={lanes.tda} fill="#35E0FF" />
          <CommitDot cx={300} cy={lanes.tda} fill="#35E0FF" />
          <CommitDot cx={500} cy={lanes.xml} fill="#35E0FF" />
          <CommitDot cx={560} cy={lanes.xml} fill="#35E0FF" />
          <CommitDot cx={730} cy={lanes.ruta} fill="#35E0FF" />
          <CommitDot cx={780} cy={lanes.ruta} fill="#35E0FF" />
          <CommitDot cx={900} cy={lanes.docs} fill="#35E0FF" />

          {/* Commit captions under main */}
          <text x={150} y={lanes.main + 28} textAnchor="middle" fill="#EDE4FF" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10 }}>
            chore: init
          </text>
          <text x={370} y={lanes.main + 28} textAnchor="middle" fill="#FF6FD8" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10 }}>
            merge tda
          </text>
          <text x={610} y={lanes.main + 28} textAnchor="middle" fill="#FF6FD8" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10 }}>
            merge xml
          </text>
          <text x={830} y={lanes.main + 28} textAnchor="middle" fill="#FF6FD8" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10 }}>
            merge ruta
          </text>
          <text x={940} y={lanes.main + 28} textAnchor="middle" fill="#C6FF3D" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10 }}>
            merge docs
          </text>

          {/* Feature captions */}
          <text x={275} y={lanes.tda + 26} textAnchor="middle" fill="#9BDFFF" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10 }}>
            feat(tda) · test(tda)
          </text>
          <text x={530} y={lanes.xml + 26} textAnchor="middle" fill="#9BDFFF" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10 }}>
            feat(matriz) · feat(xml)
          </text>
          <text x={755} y={lanes.ruta + 26} textAnchor="middle" fill="#9BDFFF" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10 }}>
            feat(ruta) · fix(ruta)
          </text>
          <text x={900} y={lanes.docs + 26} textAnchor="middle" fill="#9BDFFF" style={{ fontFamily: "'IBM Plex Mono', monospace", fontSize: 10 }}>
            docs · chore(graphviz)
          </text>

          {/* Week markers */}
          <text x={260} y={400} textAnchor="middle" fill="#9B87C7" style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 13 }}>
            SEMANA 1
          </text>
          <text x={510} y={400} textAnchor="middle" fill="#9B87C7" style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 13 }}>
            SEMANA 2
          </text>
          <text x={740} y={400} textAnchor="middle" fill="#9B87C7" style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 13 }}>
            SEMANA 3
          </text>
          <text x={920} y={400} textAnchor="middle" fill="#C6FF3D" style={{ fontFamily: "'Archivo Black', sans-serif", fontSize: 13 }}>
            SEMANA 4
          </text>
        </svg>
      </div>

      <div
        style={css(
          "margin-top:16px;display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:12px"
        )}
      >
        <div style={css("background:#120720;color:#EDE4FF;border:4px solid #120720;padding:14px")}>
          <div style={css("font-size:11px;letter-spacing:1.5px;font-weight:700;color:#C6FF3D")}>
            {"CÓMO LEERLO"}
          </div>
          <p style={css("margin:8px 0 0;font-size:13px;line-height:1.55")}>
            {"La línea morada es "}
            <strong style={css("color:#C6FF3D")}>{"main"}</strong>
            {". Las líneas cyan son features. Los puntos rosa son merges. Los rectángulos lima son tags de GitHub Release."}
          </p>
        </div>

        <div style={css("background:#120720;color:#EDE4FF;border:4px solid #120720;padding:14px")}>
          <div style={css("font-size:11px;letter-spacing:1.5px;font-weight:700;color:#C6FF3D")}>
            {"EQUIVALENTE EN TERMINAL"}
          </div>
                    <pre
            style={css(
              "margin:8px 0 0;font-size:11px;line-height:1.55;font-family:'IBM Plex Mono',monospace;color:#C6FF3D;white-space:pre;overflow:auto"
            )}
          >
            {GIT_LOG_GRAPH}
          </pre>
        </div>
      </div>
    </div>
  )
}
