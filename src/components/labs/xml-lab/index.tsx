// @ts-nocheck
"use client"

import { Fragment } from "react"

import { useDcLogic } from "@/components/dc/use-dc-logic"
import { CodeBlock } from "@/components/code-block"
import { css } from "@/components/dc/css"
import { TreeViewer } from "@/components/labs/shared/tree-viewer"
import { XmlLabLogic } from "@/components/labs/xml-lab/logic"

const ARTIFACT_CSS = ".dc-artifact--xml-lab,.dc-artifact--xml-lab *{ box-sizing: border-box; }\n.dc-artifact--xml-lab{\n  margin: 0;\n  color: #0A1F14;\n  background-color: #E6F5EC;\n  background-image: radial-gradient(ellipse 90% 55% at 8% -10%, rgba(0,166,79,0.18), transparent 55%),\nradial-gradient(ellipse 65% 40% at 100% 0%, rgba(212,245,103,0.28), transparent 50%),\nlinear-gradient(180deg, #E6F5EC 0%, #F3FBF6 40%, #CDEAD8 100%);\n  background-attachment: fixed;\n}\n.dc-artifact--xml-lab a{ color: #0A1F14; text-decoration: underline 3px #00A64F; }\n.dc-artifact--xml-lab a:hover{ background: #D4F567; color: #0A1F14; }\n.dc-artifact--xml-lab button:hover{ filter: brightness(0.97); }\n.dc-artifact--xml-lab ::selection{ background: #D4F567; color: #0A1F14; }\n.dc-artifact--xml-lab textarea:focus,\n.dc-artifact--xml-lab input:focus{ outline: 4px solid #00A64F; }\n.dc-artifact--xml-lab::after{\n  content:\"\";\n  pointer-events:none;\n  position:fixed;\n  inset:0;\n  z-index:0;\n  opacity:0.045;\n  background-image:url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\");\n}\n.dc-artifact--xml-lab > *{ position: relative; z-index: 1; }"

/**
 * Native React rendering of the XmlLab laboratorio artifact.
 */
export function XmlLabView() {
  const v = useDcLogic(XmlLabLogic, {
    
  })

  return (
    <div className="dc-artifact dc-artifact--xml-lab">
      <style>{`${ARTIFACT_CSS}
.dc-artifact--xml-lab { min-height: 100%; font-family: var(--font-lab-mono), ui-monospace, monospace; }
.dc-artifact--xml-lab h1, .dc-artifact--xml-lab h2, .dc-artifact--xml-lab .lab-display {
  font-family: var(--font-display), sans-serif;
}
`}</style>
      <div style={css("font-family: 'JetBrains Mono', ui-monospace, monospace; color: #0A1F14; background: transparent;")}>

        <header style={css("position: sticky; top: 0; z-index: 20; background: #0A1F14; color: #E6F5EC; border-bottom: 8px solid #00A64F; display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 14px 32px; flex-wrap: wrap;")}>

          <div style={css("font-family: 'Archivo Black', sans-serif; font-size: 24px; letter-spacing: -0.02em;")}>
            {"XML"}
            <span style={css("color: #D4F567;")}>
              {"."}
            </span>
            {"LAB"}
          </div>

          <nav style={css("display: flex; gap: 8px; flex-wrap: wrap; font-size: 13px; font-weight: 800; letter-spacing: 0.1em;")}>

            <a href="#que-es" style={css("color: #E6F5EC; text-decoration: none; border: 2px solid #4A4A4A; padding: 7px 12px;")}>
              {"QUÉ ES"}
            </a>

            <a href="#anatomia" style={css("color: #E6F5EC; text-decoration: none; border: 2px solid #4A4A4A; padding: 7px 12px;")}>
              {"ANATOMÍA"}
            </a>

            <a href="#arbol" style={css("color: #E6F5EC; text-decoration: none; border: 2px solid #4A4A4A; padding: 7px 12px;")}>
              {"ÁRBOL"}
            </a>

            <a href="#consultas" style={css("color: #E6F5EC; text-decoration: none; border: 2px solid #4A4A4A; padding: 7px 12px;")}>
              {"CONSULTAS"}
            </a>

            <a href="#construir" style={css("color: #E6F5EC; text-decoration: none; border: 2px solid #4A4A4A; padding: 7px 12px;")}>
              {"CONSTRUIR"}
            </a>

            <a href="#modificar" style={css("color: #E6F5EC; text-decoration: none; border: 2px solid #4A4A4A; padding: 7px 12px;")}>
              {"MODIFICAR"}
            </a>

            <a href="#serializar" style={css("color: #E6F5EC; text-decoration: none; border: 2px solid #4A4A4A; padding: 7px 12px;")}>
              {"SERIALIZAR"}
            </a>

            <a href="#explorador" style={css("color: #E6F5EC; text-decoration: none; border: 2px solid #4A4A4A; padding: 7px 12px;")}>
              {"EXPLORADOR"}
            </a>

            <a href="#referencia" style={css("color: #E6F5EC; text-decoration: none; border: 2px solid #4A4A4A; padding: 7px 12px;")}>
              {"REFERENCIA"}
            </a>

            <a href="/laboratorios/json-lab" style={css("color: #0A1F14; text-decoration: none; border: 2px solid #D4F567; background: #D4F567; padding: 7px 12px;")}>
              {"JSON &rarr;"}
            </a>

          </nav>

        </header>

        <section style={css("padding: 90px 48px 70px; border-bottom: 10px solid #0A1F14; max-width: 1500px; margin: 0 auto;")}>

          <div style={css("display: flex; gap: 0; font-size: 15px; font-weight: 800; letter-spacing: 0.2em; margin-bottom: 34px;")}>

            <div style={css("background: #0A1F14; color: #E6F5EC; padding: 10px 18px;")}>
              {"LABORATORIO INTERACTIVO"}
            </div>

          </div>

          <h1 style={css("font-family: 'Archivo Black', sans-serif; font-size: 148px; line-height: 0.82; margin: 0; letter-spacing: -0.045em; text-transform: uppercase;")}>
            {"XML"}
            <br />
            {"EN C#"}
            <span style={css("color: #00A64F;")}>
              {"."}
            </span>
          </h1>

          <p style={css("margin: 34px 0 0 0; font-size: 26px; font-weight: 700; max-width: 46ch; line-height: 1.4; text-wrap: pretty;")}>
            {"Laboratorio sobre anatomía XML, consultas con LINQ to XML, construcción de nodos y serialización mediante "}
            <strong>
              {"XDocument"}
            </strong>
            {"."}
          </p>

          <div style={css("display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 18px; margin-top: 44px;")}>

            <div style={css("border: 6px solid #0A1F14; background: #FFF; padding: 20px 22px; font-size: 17px; font-weight: 700;")}>
              {"01 · Qué es y para qué sirve"}
            </div>

            <div style={css("border: 6px solid #0A1F14; background: #FFF; padding: 20px 22px; font-size: 17px; font-weight: 700;")}>
              {"02 · Sintaxis y validación"}
            </div>

            <div style={css("border: 6px solid #0A1F14; background: #FFF; padding: 20px 22px; font-size: 17px; font-weight: 700;")}>
              {"03 · Leer, consultar y modificar"}
            </div>

            <div style={css("border: 6px solid #0A1F14; background: #D4F567; padding: 20px 22px; font-size: 17px; font-weight: 700;")}>
              {"04 · Serializar objetos ⇄ XML"}
            </div>

          </div>

        </section>

        <section id="que-es" style={css("padding: 70px 48px; border-bottom: 10px solid #0A1F14; max-width: 1500px; margin: 0 auto;")}>

          <div style={css("font-size: 15px; font-weight: 800; letter-spacing: 0.2em; border-bottom: 6px solid #0A1F14; padding-bottom: 12px; margin-bottom: 30px;")}>
            {"01 · QUÉ ES XML"}
          </div>

          <div style={css("display: grid; grid-template-columns: 1.05fr 1fr; gap: 44px; align-items: start;")}>

            <div>

              <h2 style={css("font-family: 'Archivo Black', sans-serif; font-size: 62px; margin: 0 0 24px 0; line-height: 0.94; text-transform: uppercase; letter-spacing: -0.03em;")}>
                {"Etiquetas"}
              </h2>

              <p style={css("margin: 0 0 18px 0; font-size: 21px; font-weight: 700; line-height: 1.5; text-wrap: pretty;")}>
                <strong>
                  {"eXtensible Markup Language"}
                </strong>
                {" es texto plano con etiquetas definidas por el desarrollador para describir el significado de los datos. HTML indica presentación; XML indica "}
                <strong>
                  {"qué es"}
                </strong>
                {"."}
              </p>

              <div style={css("display: grid; gap: 14px; margin-top: 26px;")}>

                <div style={css("border: 6px solid #0A1F14; background: #FFF; padding: 16px 20px; font-size: 18px; font-weight: 700;")}>
                  {"Jerárquico: los datos forman un árbol con una sola raíz."}
                </div>

                <div style={css("border: 6px solid #0A1F14; background: #FFF; padding: 16px 20px; font-size: 18px; font-weight: 700;")}>
                  {"Independiente del lenguaje, del sistema y del proveedor."}
                </div>

                <div style={css("border: 6px solid #0A1F14; background: #00A64F; color: #FFF; padding: 16px 20px; font-size: 18px; font-weight: 700;")}>
                  {"Autodescriptivo: el nombre de la etiqueta explica el dato."}
                </div>

              </div>

            </div>

            <div style={css("display: grid; gap: 20px;")}>

              <div style={css("border:8px solid #0A1F14;background:#0A1F14;overflow:hidden")}>
                <CodeBlock
                  code={"<?xml version=\"1.0\" encoding=\"utf-8\"?>\n<inventario sucursal=\"central\">\n  <producto id=\"P-001\">\n    <nombre>Teclado mecánico</nombre>\n    <precio moneda=\"GTQ\">250.00</precio>\n    <stock>12</stock>\n  </producto>\n</inventario>"}
                  language="xml"
                  variant="dark"
                  style={css("padding:24px;font-size:17px;line-height:1.65;overflow:auto")}
                />
              </div>

              <div style={css("display: grid; grid-template-columns: 1fr 1fr; gap: 14px;")}>

                <div style={css("border: 6px solid #0A1F14; background: #FFF; padding: 16px 18px; font-size: 16px; font-weight: 700;")}>
                  <strong>
                    {"Dónde vive hoy:"}
                  </strong>
                  {" .csproj, App.config, pom.xml, AndroidManifest.xml."}
                </div>

                <div style={css("border: 6px solid #0A1F14; background: #FFF; padding: 16px 18px; font-size: 16px; font-weight: 700;")}>
                  {"Un archivo .docx o .xlsx es un ZIP que contiene documentos XML."}
                </div>

                <div style={css("border: 6px solid #0A1F14; background: #FFF; padding: 16px 18px; font-size: 16px; font-weight: 700;")}>
                  {"SOAP, RSS, sitemaps, SVG y facturación electrónica."}
                </div>

                <div style={css("border: 6px solid #0A1F14; background: #D4F567; padding: 16px 18px; font-size: 16px; font-weight: 700;")}>
                  {"Aunque utilice JSON con frecuencia, deberá "}
                  <strong>
                    {"leer"}
                  </strong>
                  {" XML ajeno."}
                </div>

              </div>

            </div>

          </div>

        </section>

        <section id="anatomia" style={css("padding: 70px 48px; border-bottom: 10px solid #0A1F14; max-width: 1500px; margin: 0 auto;")}>

          <div style={css("font-size: 15px; font-weight: 800; letter-spacing: 0.2em; border-bottom: 6px solid #0A1F14; padding-bottom: 12px; margin-bottom: 30px;")}>
            {"02 · ANATOMÍA · explore cada parte del documento"}
          </div>

          <h2 style={css("font-family: 'Archivo Black', sans-serif; font-size: 62px; margin: 0 0 30px 0; line-height: 0.94; text-transform: uppercase; letter-spacing: -0.03em;")}>
            {"LAS PARTES DE UN DOCUMENTO"}
          </h2>

          <div style={css("display: grid; grid-template-columns: 1.15fr 1fr; gap: 40px; align-items: start;")}>

            <pre style={css("margin: 0; background: #0A1F14; color: #E6F5EC; border: 8px solid #0A1F14; padding: 28px; font-size: 19px; line-height: 1.85; overflow-x: auto;")}>
              <span onMouseEnter={v.hoverProlog} style={css("color: #D4F567; cursor: pointer; padding: 2px;")}>
                {"<?xml version=\"1.0\" encoding=\"utf-8\"?>\n"}
              </span>
              <span onMouseEnter={v.hoverRaiz} style={css("color: #FF6BD6; cursor: pointer; padding: 2px;")}>
                {"<inventario>"}
              </span>
              {"\n  <producto "}
              <span onMouseEnter={v.hoverAttr} style={css("color: #6BE3FF; cursor: pointer; padding: 2px;")}>
                {"id=\"P-001\""}
              </span>
              {">\n    "}
              <span onMouseEnter={v.hoverElem} style={css("cursor: pointer; padding: 2px;")}>
                {"<nombre>"}
              </span>
              <span onMouseEnter={v.hoverTexto} style={css("color: #7CFF9E; cursor: pointer; padding: 2px;")}>
                {"Teclado mecánico"}
              </span>
              {"</nombre>\n    <precio moneda=\"GTQ\">250.00</precio>\n    "}
              <span onMouseEnter={v.hoverVacio} style={css("color: #FFB86B; cursor: pointer; padding: 2px;")}>
                {"<descontinuado/>\n    "}
              </span>
              <span onMouseEnter={v.hoverComentario} style={css("color: #9A9A9A; cursor: pointer; padding: 2px;")}>
                {"<!-- revisar precio en julio -->"}
              </span>
              {"\n  </producto>\n"}
              <span style={css("color: #FF6BD6;")}>
                {"</inventario>"}
              </span>
            </pre>

            <div style={css("border: 8px solid #0A1F14; background: #FFF; padding: 30px; min-height: 320px; display: grid; gap: 18px; align-content: start;")}>

              <div style={css("font-size: 14px; font-weight: 800; letter-spacing: 0.2em; color: #6B6B6B;")}>
                {"PARTE SELECCIONADA"}
              </div>

              <div style={css("font-family: 'Archivo Black', sans-serif; font-size: 40px; line-height: 1; text-transform: uppercase;")}>
                {v.parteTitulo}
              </div>

              <p style={css("margin: 0; font-size: 19px; font-weight: 700; line-height: 1.55; text-wrap: pretty;")}>
                {v.parteTexto}
              </p>

              <div style={css("border-top: 5px solid #0A1F14; padding-top: 18px; margin-top: 6px;")}>

                <div style={css("font-size: 14px; font-weight: 800; letter-spacing: 0.16em; color: #00A64F; margin-bottom: 10px;")}>
                  {"EN C#"}
                </div>

                <div style={css("border:8px solid #0A1F14;background:#0A1F14;overflow:hidden")}>
                <CodeBlock
                  code={String(v.parteCodigo ?? "")}
                  language="csharp"
                  variant="dark"
                  style={css("padding:18px;font-size:16px;line-height:1.65;overflow:auto")}
                />
              </div>

              </div>

            </div>

          </div>

        </section>


        <TreeViewer
          theme="green"
          eyebrow="04 · NAVEGAR · seleccione un nodo"
          title="EL XML ES UN ÁRBOL"
          description={
            <>
              {"Cada nodo del árbol es un "}
              <code>{"XElement"}</code>
              {". Al seleccionar uno, a la derecha aparece la expresión de C# que lo alcanza y lo que devuelve."}
            </>
          }
          prologue={'<?xml version="1.0" encoding="utf-8"?>'}
          lines={Array.isArray(v.lineas) ? v.lineas : []}
          onExpand={v.expandirTodo}
          onCollapse={v.colapsarTodo}
          stats={[
            String(v.statElementos ?? 0) + " elementos",
            String(v.statAtributos ?? 0) + " atributos",
            "profundidad " + String(v.statProfundidad ?? 0),
          ]}
          selectedName={String(v.selNombre ?? "—")}
          selectedChips={[
            { label: "NIVEL " + String(v.selNivel ?? "—") },
            { label: String(v.selHijos ?? "0") + " HIJOS" },
            { label: "PADRE: " + String(v.selPadre ?? "—") },
          ]}
          selectedCode={String(v.selCodigo ?? "")}
          helpTitle="MÉTODOS PARA MOVERSE"
          help={[
            <><code>{'.Element("x")'}</code>{" — el "}<strong>{"primer"}</strong>{" hijo directo llamado x, o "}<code>{"null"}</code>{"."}</>,
            <><code>{'.Elements("x")'}</code>{" — "}<strong>{"todos"}</strong>{" los hijos directos llamados x."}</>,
            <><code>{'.Descendants("x")'}</code>{" — todos los x a "}<strong>{"cualquier profundidad"}</strong>{"."}</>,
            <><code>{'.Attribute("id")'}</code>{" · "}<code>{".Parent"}</code>{" · "}<code>{".Name"}</code>{" · "}<code>{".Value"}</code></>,
            <div style={{ borderTop: "5px solid #0A1F14", paddingTop: 14, color: "#FF3B30" }}><code>{".Value"}</code>{" lanza una excepción si el elemento no existe. El cast "}<code>{"(int?)el"}</code>{" o "}<code>{"?.Value"}</code>{" es la forma segura."}</div>,
          ]}
          emptyMessage="El documento actual no se puede parsear, así que no hay nodos que navegar."
        />



        <section id="consultas" style={css("padding: 70px 48px; border-bottom: 10px solid #0A1F14; max-width: 1500px; margin: 0 auto;")}>

          <div style={css("font-size: 15px; font-weight: 800; letter-spacing: 0.2em; border-bottom: 6px solid #0A1F14; padding-bottom: 12px; margin-bottom: 30px;")}>
            {"05 · CONSULTAR · seleccione una consulta"}
          </div>

          <h2 style={css("font-family: 'Archivo Black', sans-serif; font-size: 62px; margin: 0 0 26px 0; line-height: 0.94; text-transform: uppercase; letter-spacing: -0.03em;")}>
            {"LINQ SOBRE EL XML"}
          </h2>

          <div style={css("display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 26px;")}>

            {v.consultas.map((q, qIdx) => (
              <Fragment key={qIdx}>

                <button onClick={q.pick} style={css(`border: 5px solid #0A1F14; background: ${q.bg}; color: ${q.fg}; padding: 12px 18px; font-family: inherit; font-size: 15px; font-weight: 800; cursor: pointer;`)}>
                  {q.label}
                </button>

              </Fragment>
            ))}

          </div>

          <div style={css("display: grid; grid-template-columns: 1.2fr 1fr; gap: 28px; align-items: start;")}>

            <div style={css("border:8px solid #0A1F14;background:#0A1F14;overflow:hidden")}>
                <CodeBlock
                  code={String(v.consultaCodigo ?? "")}
                  language="csharp"
                  variant="dark"
                  style={css("padding:26px;font-size:17px;line-height:1.65;overflow:auto")}
                />
              </div>

            <div style={css("border: 8px solid #0A1F14; background: #FFF; padding: 24px; display: grid; gap: 12px; align-content: start; min-height: 240px;")}>

              <div style={css("font-size: 14px; font-weight: 800; letter-spacing: 0.2em; color: #00A64F;")}>
                {"RESULTADO SOBRE EL XML"}
              </div>

              {v.consultaResultado.map((r, rIdx) => (
                <Fragment key={rIdx}>

                  <div style={css("border-bottom: 3px solid #E5E1D5; padding: 10px 0; font-size: 19px; font-weight: 700;")}>
                    {r.texto}
                  </div>

                </Fragment>
              ))}

            </div>

          </div>

        </section>

        <section id="construir" style={css("padding: 70px 48px; border-bottom: 10px solid #0A1F14; max-width: 1500px; margin: 0 auto;")}>

          <div style={css("font-size: 15px; font-weight: 800; letter-spacing: 0.2em; border-bottom: 6px solid #0A1F14; padding-bottom: 12px; margin-bottom: 30px;")}>
            {"06 · CONSTRUIR · complete el formulario"}
          </div>

          <h2 style={css("font-family: 'Archivo Black', sans-serif; font-size: 62px; margin: 0 0 12px 0; line-height: 0.94; text-transform: uppercase; letter-spacing: -0.03em;")}>
            {"CONSTRUCCIÓN DECLARATIVA CON XELEMENT"}
          </h2>

          <p style={css("margin: 0 0 26px 0; font-size: 20px; font-weight: 700; max-width: 74ch; line-height: 1.5;")}>
            {"Con "}
            <code>
              {"XDocument"}
            </code>
            {" la construcción es declarativa: cada "}
            <code>
              {"new XElement"}
            </code>
            {" anidado es una etiqueta anidada. Sin plantillas ni concatenación."}
          </p>

          <div style={css("display: grid; grid-template-columns: 0.75fr 1.1fr 1fr; gap: 24px; align-items: start;")}>

            <div style={css("border: 8px solid #0A1F14; background: #FFF; padding: 24px; display: grid; gap: 16px;")}>

              <div style={css("display: grid; gap: 6px;")}>

                <label style={css("font-size: 13px; font-weight: 800; letter-spacing: 0.14em;")}>
                  {"ID"}
                </label>

                <input onChange={v.setId} value={v.fId} style={css("border: 5px solid #0A1F14; padding: 12px; font-family: inherit; font-size: 17px; font-weight: 700;")} />

              </div>

              <div style={css("display: grid; gap: 6px;")}>

                <label style={css("font-size: 13px; font-weight: 800; letter-spacing: 0.14em;")}>
                  {"NOMBRE"}
                </label>

                <input onChange={v.setNombre} value={v.fNombre} style={css("border: 5px solid #0A1F14; padding: 12px; font-family: inherit; font-size: 17px; font-weight: 700;")} />

              </div>

              <div style={css("display: grid; gap: 6px;")}>

                <label style={css("font-size: 13px; font-weight: 800; letter-spacing: 0.14em;")}>
                  {"PRECIO"}
                </label>

                <input onChange={v.setPrecio} value={v.fPrecio} style={css("border: 5px solid #0A1F14; padding: 12px; font-family: inherit; font-size: 17px; font-weight: 700;")} />

              </div>

              <div style={css("display: grid; gap: 6px;")}>

                <label style={css("font-size: 13px; font-weight: 800; letter-spacing: 0.14em;")}>
                  {"STOCK"}
                </label>

                <input onChange={v.setStock} value={v.fStock} style={css("border: 5px solid #0A1F14; padding: 12px; font-family: inherit; font-size: 17px; font-weight: 700;")} />

              </div>

              <button onClick={v.agregarProducto} style={css("border: 5px solid #0A1F14; background: #D4F567; padding: 14px; font-family: inherit; font-size: 16px; font-weight: 800; cursor: pointer;")}>
                {"doc.Root.Add(…)"}
              </button>

            </div>

            <div style={css("border:8px solid #0A1F14;background:#0A1F14;overflow:hidden")}>
                <CodeBlock
                  code={String(v.codigoConstruir ?? "")}
                  language="csharp"
                  variant="dark"
                  style={css("padding:24px;font-size:16px;line-height:1.65;overflow:auto")}
                />
              </div>

            <div style={css("display: grid; gap: 12px;")}>

              <div style={css("font-size: 14px; font-weight: 800; letter-spacing: 0.2em; color: #00A64F;")}>
                {"XML GENERADO"}
              </div>

              <div style={css("border:8px solid #0A1F14;background:#FFFFFF;overflow:hidden")}>
                <CodeBlock
                  code={String(v.xmlGenerado ?? "")}
                  language="xml"
                  variant="light"
                  style={css("padding:24px;font-size:16px;line-height:1.65;overflow:auto")}
                />
              </div>

              <div style={css("border: 6px solid #0A1F14; background: #FFF; padding: 16px 20px; font-size: 16px; font-weight: 700; line-height: 1.5;")}>
                {"El botón inserta ese nodo en el documento superior. Al regresar al editor se observa el árbol actualizado."}
              </div>

            </div>

          </div>

        </section>

        <section id="modificar" style={css("padding: 70px 48px; border-bottom: 10px solid #0A1F14; max-width: 1500px; margin: 0 auto;")}>

          <div style={css("font-size: 15px; font-weight: 800; letter-spacing: 0.2em; border-bottom: 6px solid #0A1F14; padding-bottom: 12px; margin-bottom: 30px;")}>
            {"07 · MODIFICAR · ejecuta las operaciones"}
          </div>

          <h2 style={css("font-family: 'Archivo Black', sans-serif; font-size: 62px; margin: 0 0 26px 0; line-height: 0.94; text-transform: uppercase; letter-spacing: -0.03em;")}>
            {"AGREGAR, CAMBIAR, BORRAR"}
          </h2>

          <div style={css("display: grid; grid-template-columns: 1fr 1.15fr; gap: 28px; align-items: start;")}>

            <div style={css("display: grid; gap: 14px;")}>

              {v.operaciones.map((op, opIdx) => (
                <Fragment key={opIdx}>

                  <div onClick={op.run} style={css("border: 6px solid #0A1F14; background: #FFF; padding: 18px 20px; cursor: pointer; display: grid; gap: 10px;")}>

                    <div style={css("font-size: 17px; font-weight: 800;")}>
                      {op.titulo}
                    </div>

                    <code style={css("font-size: 15px; color: #00A64F; line-height: 1.5;")}>
                      {op.codigo}
                    </code>

                  </div>

                </Fragment>
              ))}

            </div>

            <div style={css("display: grid; gap: 18px;")}>

              <div style={css("font-size: 14px; font-weight: 800; letter-spacing: 0.2em;")}>
                {"DOCUMENTO EN MEMORIA"}
              </div>

              <div style={css("border:8px solid #0A1F14;background:#0A1F14;overflow:hidden")}>
                <CodeBlock
                  code={String(v.xmlActual ?? "")}
                  language="xml"
                  variant="dark"
                  style={css("padding:24px;font-size:15px;line-height:1.65;overflow:auto;max-height:420px")}
                />
              </div>

              <div style={css("border: 8px solid #FF3B30; background: #FFF; padding: 18px 22px; font-size: 17px; font-weight: 700; line-height: 1.5;")}>
                {"Ninguna de estas operaciones escribe en disco. El documento permanece en memoria hasta invocar "}
                <code>
                  {"doc.Save(\"inventario.xml\")"}
                </code>
                {", que "}
                <strong>
                  {"sobrescribe el archivo completo"}
                </strong>
                {"."}
              </div>

            </div>

          </div>

        </section>

        <section id="serializar" style={css("padding: 70px 48px; border-bottom: 10px solid #0A1F14; max-width: 1500px; margin: 0 auto;")}>

          <div style={css("font-size: 15px; font-weight: 800; letter-spacing: 0.2em; border-bottom: 6px solid #0A1F14; padding-bottom: 12px; margin-bottom: 30px;")}>
            {"08 · SERIALIZAR · objeto ⇄ XML automático"}
          </div>

          <h2 style={css("font-family: 'Archivo Black', sans-serif; font-size: 62px; margin: 0 0 26px 0; line-height: 0.94; text-transform: uppercase; letter-spacing: -0.03em;")}>
            {"SERIALIZACIÓN SIN RECORRER NODOS"}
          </h2>

          <div style={css("display: grid; grid-template-columns: 1fr 1fr 0.85fr; gap: 24px; align-items: start;")}>

            <div style={css("display: grid; gap: 12px;")}>

              <div style={css("font-size: 14px; font-weight: 800; letter-spacing: 0.2em;")}>
                {"LA CLASE MARCADA"}
              </div>

              <div style={css("border:8px solid #0A1F14;background:#0A1F14;overflow:hidden")}>
                <CodeBlock
                  code={"using System.Xml.Serialization;\n\n[XmlRoot(\"producto\")]\npublic class Producto\n{\n    [XmlAttribute(\"id\")]\n    public string Id { get; set; }\n\n    [XmlElement(\"nombre\")]\n    public string Nombre { get; set; }\n\n    [XmlElement(\"precio\")]\n    public decimal Precio { get; set; }\n\n    [XmlIgnore]\n    public decimal Margen { get; set; }\n}"}
                  language="csharp"
                  variant="dark"
                  style={css("padding:22px;font-size:15px;line-height:1.65;overflow:auto")}
                />
              </div>

            </div>

            <div style={css("display: grid; gap: 12px;")}>

              <div style={css("font-size: 14px; font-weight: 800; letter-spacing: 0.2em;")}>
                {"IDA Y VUELTA"}
              </div>

              <div style={css("border:8px solid #0A1F14;background:#0A1F14;overflow:hidden")}>
                <CodeBlock
                  code={"var ser = new XmlSerializer(typeof(Producto));\n\n// SERIALIZAR: objeto → XML\nusing (var w = new StreamWriter(\"producto.xml\"))\n    ser.Serialize(w, producto);\n\n// DESERIALIZAR: XML → objeto\nusing (var r = new StreamReader(\"producto.xml\"))\n{\n    var p = (Producto)ser.Deserialize(r);\n    Console.WriteLine(p.Nombre);\n}"}
                  language="csharp"
                  variant="dark"
                  style={css("padding:22px;font-size:15px;line-height:1.65;overflow:auto")}
                />
              </div>

            </div>

            <div style={css("display: grid; gap: 14px;")}>

              <div style={css("border: 6px solid #0A1F14; background: #FFF; padding: 18px 20px; font-size: 16px; font-weight: 700; line-height: 1.5;")}>
                {"Requiere "}
                <strong>
                  {"constructor sin parámetros"}
                </strong>
                {" y propiedades públicas con get/set."}
              </div>

              <div style={css("border: 6px solid #0A1F14; background: #FFF; padding: 18px 20px; font-size: 16px; font-weight: 700; line-height: 1.5;")}>
                <code>
                  {"[XmlIgnore]"}
                </code>
                {" excluye propiedades calculadas; "}
                <code>
                  {"[XmlArray]"}
                </code>
                {" controla las listas."}
              </div>

              <div style={css("border: 6px solid #0A1F14; background: #D4F567; padding: 18px 20px; font-size: 16px; font-weight: 700; line-height: 1.5;")}>
                <strong>
                  {"Serializer"}
                </strong>
                {" cuando usted define las clases. "}
                <strong>
                  {"XDocument"}
                </strong>
                {" cuando lees XML ajeno o solo necesitas un pedazo."}
              </div>

              <div style={css("border: 6px solid #00A64F; background: #FFF; padding: 18px 20px; font-size: 16px; font-weight: 700; line-height: 1.5;")}>
                {"El equivalente en JSON es "}
                <code>
                  {"System.Text.Json"}
                </code>
                {": "}
                <code>
                  {"JsonSerializer.Serialize"}
                </code>
                {" / "}
                <code>
                  {"Deserialize"}
                </code>
                {". La idea es idéntica."}
              </div>

            </div>

          </div>

        </section>

        <section id="explorador" style={css("padding: 70px 48px; border-bottom: 10px solid #0A1F14; max-width: 1500px; margin: 0 auto;")}>

          <div style={css("font-size: 15px; font-weight: 800; letter-spacing: 0.2em; border-bottom: 6px solid #0A1F14; padding-bottom: 12px; margin-bottom: 30px;")}>
            {"10 · EJEMPLO COMPLETO · abra un archivo del explorador"}
          </div>

          <h2 style={css("font-family: 'Archivo Black', sans-serif; font-size: 62px; margin: 0 0 12px 0; line-height: 0.94; text-transform: uppercase; letter-spacing: -0.03em;")}>
            {"APERTURA DE UN ARCHIVO XML"}
          </h2>

          <p style={css("margin: 0 0 30px 0; font-size: 20px; font-weight: 700; max-width: 78ch; line-height: 1.5;")}>
            {"En una aplicación real la ruta no está escrita en el código: la selecciona el usuario. Seleccione un archivo en este explorador simulado y pulse "}
            <strong>
              {"Abrir"}
            </strong>
            {" para observar qué recibe el programa."}
          </p>

          <div style={css("display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 28px; align-items: start;")}>

            <div style={css("border: 8px solid #0A1F14; background: #CDEAD8; min-width: 0;")}>

              <div style={css("background: #0A1F14; color: #E6F5EC; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; font-size: 15px; font-weight: 800;")}>

                <span>
                  {"Seleccione un archivo XML"}
                </span>

                <span style={css("display: flex; gap: 6px;")}>

                  <span style={css("width: 14px; height: 14px; border: 2px solid #E6F5EC;")} />

                  <span style={css("width: 14px; height: 14px; border: 2px solid #E6F5EC;")} />

                  <span style={css("width: 14px; height: 14px; border: 2px solid #FF3B30; background: #FF3B30;")} />

                </span>

              </div>

              <div style={css("padding: 12px 16px; border-bottom: 4px solid #0A1F14; font-size: 14px; font-weight: 700; background: #FFF;")}>
                {"C:\\Users\\dev\\Documents\\datos\\"}
              </div>

              <div style={css("padding: 10px; display: grid; gap: 4px; min-height: 250px; align-content: start;")}>

                {v.archivos.map((f, fIdx) => (
                  <Fragment key={fIdx}>

                    <div onClick={f.pick} style={css(`display: flex; align-items: center; gap: 12px; padding: 10px 12px; cursor: pointer; border: 3px solid ${f.borde}; background: ${f.fondo}; color: ${f.texto};`)}>

                      <span style={css("font-family: 'Archivo Black', sans-serif; font-size: 13px; border: 2px solid currentColor; padding: 3px 6px; min-width: 52px; text-align: center;")}>
                        {f.ext}
                      </span>

                      <span style={css("font-size: 17px; font-weight: 700;")}>
                        {f.nombre}
                      </span>

                      <span style={css("margin-left: auto; font-size: 14px; opacity: 0.6;")}>
                        {f.peso}
                      </span>

                    </div>

                  </Fragment>
                ))}

              </div>

              <div style={css("border-top: 4px solid #0A1F14; padding: 14px 16px; display: flex; gap: 12px; align-items: center; background: #FFF; flex-wrap: wrap;")}>

                <span style={css("font-size: 14px; font-weight: 700;")}>
                  {"Filtro: "}
                  <code>
                    {"*.xml"}
                  </code>
                </span>

                <button onClick={v.abrirArchivo} style={css("margin-left: auto; border: 5px solid #0A1F14; background: #D4F567; padding: 10px 22px; font-family: inherit; font-size: 15px; font-weight: 800; cursor: pointer;")}>
                  {"Abrir"}
                </button>

                <button onClick={v.cancelarDialogo} style={css("border: 5px solid #0A1F14; background: #FFF; padding: 10px 22px; font-family: inherit; font-size: 15px; font-weight: 800; cursor: pointer;")}>
                  {"Cancelar"}
                </button>

              </div>

            </div>

            <div style={css("display: grid; gap: 16px; min-width: 0;")}>

              <div style={css("font-size: 14px; font-weight: 800; letter-spacing: 0.2em; color: #00A64F;")}>
                {"CONSOLA DE LA APLICACIÓN"}
              </div>

              <div style={css("border:8px solid #0A1F14;background:#0A1F14;overflow:hidden")}>
                <CodeBlock
                  code={String(v.salidaExplorador ?? "")}
                  language="csharp"
                  variant="dark"
                  style={css("padding:22px;font-size:16px;line-height:1.65;overflow:auto")}
                />
              </div>

              <div style={css("border: 6px solid #0A1F14; background: #FFF; padding: 16px 20px; font-size: 16px; font-weight: 700; line-height: 1.5;")}>
                <code>
                  {"dlg.FileName"}
                </code>
                {" devuelve la ruta absoluta. Que el archivo termine en "}
                <code>
                  {".xml"}
                </code>
                {" no garantiza nada: valida siempre con "}
                <code>
                  {"try/catch"}
                </code>
                {"."}
              </div>

            </div>

          </div>

          <div style={css("margin-top: 30px; border: 8px solid #0A1F14; background: #FFF;")}>

            <div style={css("background: #0A1F14; color: #E6F5EC; padding: 12px 16px; font-size: 14px; font-weight: 800; letter-spacing: 0.14em; display: flex; gap: 16px; flex-wrap: wrap;")}>

              <span>
                {"dataGridView1 · datos deserializados"}
              </span>

              <span style={css("margin-left: auto; color: #D4F567;")}>
                {v.gridEstado}
              </span>

            </div>

            <div style={css("overflow-x: auto;")}>

              <div style={css("display: grid; grid-template-columns: 1.1fr 2fr 1.2fr 1fr 1.4fr; min-width: 720px;")}>

                <div style={css("background: #CDEAD8; border-bottom: 4px solid #0A1F14; padding: 12px 16px; font-size: 13px; font-weight: 800; letter-spacing: 0.1em;")}>
                  {"ID"}
                </div>

                <div style={css("background: #CDEAD8; border-bottom: 4px solid #0A1F14; padding: 12px 16px; font-size: 13px; font-weight: 800; letter-spacing: 0.1em;")}>
                  {"NOMBRE"}
                </div>

                <div style={css("background: #CDEAD8; border-bottom: 4px solid #0A1F14; padding: 12px 16px; font-size: 13px; font-weight: 800; letter-spacing: 0.1em;")}>
                  {"PRECIO"}
                </div>

                <div style={css("background: #CDEAD8; border-bottom: 4px solid #0A1F14; padding: 12px 16px; font-size: 13px; font-weight: 800; letter-spacing: 0.1em;")}>
                  {"STOCK"}
                </div>

                <div style={css("background: #CDEAD8; border-bottom: 4px solid #0A1F14; padding: 12px 16px; font-size: 13px; font-weight: 800; letter-spacing: 0.1em;")}>
                  {"SUBTOTAL"}
                </div>

                {v.filas.map((r, rIdx) => (
                  <Fragment key={rIdx}>

                    <div style={css(`border-bottom: 2px solid #E5E1D5; padding: 12px 16px; font-size: 16px; font-weight: 700; background: ${r.bg};`)}>
                      {r.id}
                    </div>

                    <div style={css(`border-bottom: 2px solid #E5E1D5; padding: 12px 16px; font-size: 16px; background: ${r.bg};`)}>
                      {r.nombre}
                    </div>

                    <div style={css(`border-bottom: 2px solid #E5E1D5; padding: 12px 16px; font-size: 16px; background: ${r.bg};`)}>
                      {r.precio}
                    </div>

                    <div style={css(`border-bottom: 2px solid #E5E1D5; padding: 12px 16px; font-size: 16px; font-weight: 700; color: ${r.colorStock}; background: ${r.bg};`)}>
                      {r.stock}
                    </div>

                    <div style={css(`border-bottom: 2px solid #E5E1D5; padding: 12px 16px; font-size: 16px; background: ${r.bg};`)}>
                      {r.subtotal}
                    </div>

                  </Fragment>
                ))}

              </div>

            </div>

            <div style={css("border-top: 4px solid #0A1F14; padding: 14px 16px; display: flex; gap: 24px; font-size: 15px; font-weight: 700; background: #F3FBF6; flex-wrap: wrap;")}>

              <span>
                {v.gridConteo}
              </span>

              <span style={css("margin-left: auto;")}>
                {"Total del inventario: "}
                <strong>
                  {v.gridTotal}
                </strong>
              </span>

            </div>

          </div>

          <div style={css("display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 28px; margin-top: 30px; align-items: start;")}>

            <div style={css("display: grid; gap: 12px; min-width: 0;")}>

              <div style={css("font-size: 14px; font-weight: 800; letter-spacing: 0.2em;")}>
                {"ABRIR · OpenFileDialog"}
              </div>

              <div style={css("border:8px solid #0A1F14;background:#0A1F14;overflow:hidden")}>
                <CodeBlock
                  code={String(v.codigoAbrir ?? "")}
                  language="csharp"
                  variant="dark"
                  style={css("padding:24px;font-size:15px;line-height:1.65;overflow:auto")}
                />
              </div>

            </div>

            <div style={css("display: grid; gap: 12px; min-width: 0;")}>

              <div style={css("font-size: 14px; font-weight: 800; letter-spacing: 0.2em;")}>
                {"GUARDAR · SaveFileDialog"}
              </div>

              <div style={css("border:8px solid #0A1F14;background:#0A1F14;overflow:hidden")}>
                <CodeBlock
                  code={"using System.Windows.Forms;\nusing System.Xml.Linq;\n\nvar dlg = new SaveFileDialog\n{\n    Title      = \"Guardar inventario\",\n    Filter     = \"Archivos XML (*.xml)|*.xml\",\n    FileName   = \"inventario.xml\",\n    DefaultExt = \"xml\"\n};\n\nif (dlg.ShowDialog() == DialogResult.OK)\n{\n    try\n    {\n        doc.Save(dlg.FileName);   // sobrescribe si existe\n        MessageBox.Show($\"Guardado en {dlg.FileName}\");\n    }\n    catch (IOException ex)\n    {\n        MessageBox.Show($\"No se pudo escribir: {ex.Message}\");\n    }\n}"}
                  language="csharp"
                  variant="dark"
                  style={css("padding:24px;font-size:15px;line-height:1.65;overflow:auto")}
                />
              </div>

            </div>

          </div>

          <div style={css("display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 18px; margin-top: 26px;")}>

            <div style={css("border: 6px solid #0A1F14; background: #FFF; padding: 18px 20px; font-size: 16px; font-weight: 700; line-height: 1.5;")}>
              <strong>
                {"Consola sin diálogo:"}
              </strong>
              {" pide la ruta con "}
              <code>
                {"Console.ReadLine()"}
              </code>
              {" y verifica con "}
              <code>
                {"File.Exists(ruta)"}
              </code>
              {" antes de cargar."}
            </div>

            <div style={css("border: 6px solid #0A1F14; background: #FFF; padding: 18px 20px; font-size: 16px; font-weight: 700; line-height: 1.5;")}>
              <strong>
                {"Rutas relativas:"}
              </strong>
              {" arma con "}
              <code>
                {"Path.Combine(AppContext.BaseDirectory, \"datos\", \"inventario.xml\")"}
              </code>
              {", nunca con "}
              <code>
                {"+ \"\\\\\""}
              </code>
              {"."}
            </div>

            <div style={css("border: 6px solid #0A1F14; background: #D4F567; padding: 18px 20px; font-size: 16px; font-weight: 700; line-height: 1.5;")}>
              <strong>
                {"Tres excepciones a capturar:"}
              </strong>
              <code>
                {"FileNotFoundException"}
              </code>
              {", "}
              <code>
                {"XmlException"}
              </code>
              {" y "}
              <code>
                {"UnauthorizedAccessException"}
              </code>
              {"."}
            </div>

          </div>

          <div style={css("margin-top: 30px; display: grid; gap: 14px;")}>

            <div style={css("display: flex; align-items: baseline; gap: 16px; flex-wrap: wrap; border-top: 6px solid #0A1F14; padding-top: 22px;")}>

              <div style={css("font-family: 'Archivo Black', sans-serif; font-size: 34px; text-transform: uppercase; letter-spacing: -0.02em;")}>
                {"Programa completo"}
              </div>

              <div style={css("font-size: 15px; font-weight: 800; letter-spacing: 0.14em; color: #6B6B6B;")}>
                {"Program.cs · consola, sin dependencias externas"}
              </div>

            </div>

            <p style={css("margin: 0 0 6px 0; font-size: 19px; font-weight: 700; max-width: 80ch; line-height: 1.5;")}>
              {"Abrir, listar, agregar y guardar en un solo archivo. Es el mismo ciclo que ejecutan los bloques interactivos de esta página."}
            </p>

            <div style={css("border:8px solid #0A1F14;background:#0A1F14;overflow:hidden")}>
                <CodeBlock
                  code={"using System;\nusing System.IO;\nusing System.Linq;\nusing System.Xml;\nusing System.Xml.Linq;\n\nclass Program\n{\n    record Producto(string Id, string Nombre, decimal Precio, int Stock);\n\n    static void Main()\n    {\n        Console.Write(\"Ruta del archivo XML: \");\n        string ruta = Console.ReadLine()?.Trim('\"') ?? \"\";\n\n        if (!File.Exists(ruta))\n        {\n            Console.WriteLine(\"No existe ese archivo.\");\n            return;\n        }\n\n        XDocument doc;\n        try\n        {\n            doc = XDocument.Load(ruta);\n        }\n        catch (XmlException ex)\n        {\n            Console.WriteLine($\"XML mal formado en la línea {ex.LineNumber}: {ex.Message}\");\n            return;\n        }\n\n        if (doc.Root?.Name != \"inventario\")\n        {\n            Console.WriteLine($\"Se esperaba <inventario> y se encontró <{doc.Root?.Name}>.\");\n            return;\n        }\n\n        // ── LEER ────────────────────────────────────────────────\n        var productos = doc.Descendants(\"producto\")\n            .Select(p => new Producto(\n                (string)p.Attribute(\"id\"),\n                (string)p.Element(\"nombre\"),\n                (decimal?)p.Element(\"precio\") ?? 0m,\n                (int?)p.Element(\"stock\") ?? 0))\n            .ToList();\n\n        Console.WriteLine($\"\\n{productos.Count} productos encontrados:\\n\");\n        foreach (var p in productos)\n            Console.WriteLine($\"  {p.Id,-8} {p.Nombre,-24} Q{p.Precio,10:N2}  x{p.Stock}\");\n\n        decimal total = productos.Sum(p => p.Precio * p.Stock);\n        Console.WriteLine($\"\\n  Valor del inventario: Q{total:N2}\");\n\n        var agotados = productos.Where(p => p.Stock == 0).ToList();\n        if (agotados.Any())\n            Console.WriteLine($\"  Agotados: {string.Join(\", \", agotados.Select(p => p.Nombre))}\");\n\n        // ── ESCRIBIR ────────────────────────────────────────────\n        Console.Write(\"\\nNombre del producto nuevo (Enter para salir): \");\n        string nombre = Console.ReadLine();\n        if (string.IsNullOrWhiteSpace(nombre)) return;\n\n        Console.Write(\"Precio: \");\n        decimal precio = decimal.Parse(Console.ReadLine());\n        Console.Write(\"Stock: \");\n        int stock = int.Parse(Console.ReadLine());\n\n        string nuevoId = $\"P-{productos.Count + 1:000}\";\n\n        doc.Root.Add(new XElement(\"producto\",\n            new XAttribute(\"id\", nuevoId),\n            new XElement(\"nombre\", nombre),\n            new XElement(\"precio\", precio),\n            new XElement(\"stock\", stock)));\n\n        // ── GUARDAR ─────────────────────────────────────────────\n        try\n        {\n            string respaldo = Path.ChangeExtension(ruta, \".bak.xml\");\n            File.Copy(ruta, respaldo, overwrite: true);\n            doc.Save(ruta);\n            Console.WriteLine($\"\\nGuardado. Respaldo en {Path.GetFileName(respaldo)}\");\n        }\n        catch (UnauthorizedAccessException)\n        {\n            Console.WriteLine(\"Sin permiso de escritura sobre el archivo.\");\n        }\n        catch (IOException ex)\n        {\n            Console.WriteLine($\"Error de escritura: {ex.Message}\");\n        }\n    }\n}"}
                  language="csharp"
                  variant="dark"
                  style={css("padding:28px;font-size:15px;line-height:1.65;overflow:auto")}
                />
              </div>

          </div>

        </section>

        <section id="referencia" style={css("padding: 70px 48px 90px; background: #0A1F14; color: #E6F5EC;")}>

          <div style={css("max-width: 1500px; margin: 0 auto;")}>

            <div style={css("display: flex; justify-content: space-between; align-items: baseline; border-bottom: 8px solid #00A64F; padding-bottom: 16px; margin-bottom: 34px; flex-wrap: wrap; gap: 16px;")}>

              <h2 style={css("font-family: 'Archivo Black', sans-serif; font-size: 62px; margin: 0; line-height: 1; text-transform: uppercase; letter-spacing: -0.03em; color: #D4F567;")}>
                {"Referencia rápida"}
                <br />
              </h2>

              <div style={css("font-size: 15px; font-weight: 800; letter-spacing: 0.2em;")}>
                {"USING SYSTEM.XML.LINQ;"}
              </div>

            </div>

            <div style={css("display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 26px;")}>

              <div style={css("display: grid; gap: 14px;")}>

                <div style={css("font-size: 14px; font-weight: 800; letter-spacing: 0.16em; color: #D4F567;")}>
                  {"LEER"}
                </div>

                <div style={css("border:8px solid #0A1F14;background:#0A1F14;overflow:hidden")}>
                <CodeBlock
                  code={"XDocument.Load(\"f.xml\")\nXDocument.Parse(texto)\ndoc.Root\nel.Element(\"hijo\")\nel.Elements(\"hijo\")\ndoc.Descendants(\"nodo\")\nel.Attribute(\"id\")?.Value\n(decimal)el.Element(\"precio\")"}
                  language="csharp"
                  variant="dark"
                  style={css("padding:20px;font-size:16px;line-height:1.65;overflow:auto")}
                />
              </div>

              </div>

              <div style={css("display: grid; gap: 14px;")}>

                <div style={css("font-size: 14px; font-weight: 800; letter-spacing: 0.16em; color: #D4F567;")}>
                  {"ESCRIBIR"}
                </div>

                <div style={css("border:8px solid #0A1F14;background:#0A1F14;overflow:hidden")}>
                <CodeBlock
                  code={"new XDocument(new XElement(…))\nnew XAttribute(\"id\", valor)\npadre.Add(hijo)\nel.SetElementValue(\"stock\", 8)\nel.SetAttributeValue(\"id\", \"P-9\")\nel.Remove()\nel.ReplaceWith(nuevo)\ndoc.Save(\"f.xml\")"}
                  language="csharp"
                  variant="dark"
                  style={css("padding:20px;font-size:16px;line-height:1.65;overflow:auto")}
                />
              </div>

              </div>

              <div style={css("display: grid; gap: 14px;")}>

                <div style={css("font-size: 14px; font-weight: 800; letter-spacing: 0.16em; color: #FF6B6B;")}>
                  {"ERRORES COMUNES"}
                </div>

                <div style={css("border: 5px solid #E6F5EC; padding: 20px; display: grid; gap: 12px; font-size: 15px; font-weight: 700; line-height: 1.5;")}>

                  <div>
                    {"Armar XML concatenando strings."}
                  </div>

                  <div>
                    {"Usar "}
                    <code>
                      {".Value"}
                    </code>
                    {" sin verificar "}
                    <code>
                      {"null"}
                    </code>
                    {"."}
                  </div>

                  <div>
                    {"Ignorar mayúsculas en los nombres."}
                  </div>

                  <div>
                    {"Olvidar el "}
                    <code>
                      {"XNamespace"}
                    </code>
                    {" cuando hay "}
                    <code>
                      {"xmlns"}
                    </code>
                    {"."}
                  </div>

                  <div>
                    {"Parsear decimales con cultura local."}
                  </div>

                  <div>
                    {"Modificar en memoria y no llamar "}
                    <code>
                      {"Save()"}
                    </code>
                    {"."}
                  </div>

                </div>

              </div>

            </div>

            <div style={css("border: 6px solid #D4F567; background: #D4F567; color: #0A1F14; padding: 24px 28px; font-size: 20px; font-weight: 700; margin-top: 30px; line-height: 1.5;")}>
              {"XML describe datos con etiquetas propias · debe estar bien formado · en C# se maneja con "}
              <strong>
                {"XDocument"}
              </strong>
              {" y LINQ."}
            </div>

          </div>

        </section>

      </div>
    </div>
  )
}
