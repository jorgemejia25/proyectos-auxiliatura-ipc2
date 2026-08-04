// @ts-nocheck
"use client"

import { Fragment } from "react"

import { useDcLogic } from "@/components/dc/use-dc-logic"
import { CodeBlock } from "@/components/code-block"
import { css } from "@/components/dc/css"
import { TreeViewer } from "@/components/labs/shared/tree-viewer"
import { JsonLabLogic } from "@/components/labs/json-lab/logic"

const ARTIFACT_CSS = ".dc-artifact--json-lab,.dc-artifact--json-lab *{ box-sizing: border-box; }\n.dc-artifact--json-lab{\n  margin: 0;\n  color: #06142E;\n  background-color: #E8F0FF;\n  background-image: radial-gradient(ellipse 90% 55% at 5% -10%, rgba(0,71,255,0.18), transparent 55%),\nradial-gradient(ellipse 70% 45% at 100% 0%, rgba(53,224,255,0.24), transparent 50%),\nlinear-gradient(180deg, #E8F0FF 0%, #F5F8FF 40%, #D6E4FF 100%);\n  background-attachment: fixed;\n}\n.dc-artifact--json-lab a{ color: #06142E; text-decoration: underline 3px #0047FF; }\n.dc-artifact--json-lab a:hover{ background: #35E0FF; color: #06142E; }\n.dc-artifact--json-lab button:hover{ filter: brightness(0.97); }\n.dc-artifact--json-lab ::selection{ background: #35E0FF; color: #06142E; }\n.dc-artifact--json-lab textarea:focus,\n.dc-artifact--json-lab input:focus{ outline: 4px solid #0047FF; }\n.dc-artifact--json-lab::after{\n  content:\"\";\n  pointer-events:none;\n  position:fixed;\n  inset:0;\n  z-index:0;\n  opacity:0.045;\n  background-image:url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\");\n}\n.dc-artifact--json-lab > *{ position: relative; z-index: 1; }"

/**
 * Native React rendering of the JsonLab laboratorio artifact.
 */
export function JsonLabView() {
  const v = useDcLogic(JsonLabLogic, {
    
  })

  return (
    <div className="dc-artifact dc-artifact--json-lab">
      <style>{`${ARTIFACT_CSS}
.dc-artifact--json-lab { min-height: 100%; font-family: var(--font-lab-mono), ui-monospace, monospace; }
.dc-artifact--json-lab h1, .dc-artifact--json-lab h2, .dc-artifact--json-lab .lab-display {
  font-family: var(--font-display), sans-serif;
}
`}</style>
      <div style={css("font-family: 'JetBrains Mono', ui-monospace, monospace; color: #06142E; background: transparent;")}>

        <header style={css("position: sticky; top: 0; z-index: 20; background: #06142E; color: #E8F0FF; border-bottom: 8px solid #0047FF; display: flex; align-items: center; justify-content: space-between; gap: 24px; padding: 14px 32px; flex-wrap: wrap;")}>

          <div style={css("font-family: 'Archivo Black', sans-serif; font-size: 24px; letter-spacing: -0.02em;")}>
            {"JSON"}
            <span style={css("color: #35E0FF;")}>
              {"."}
            </span>
            {"LAB"}
          </div>

          <nav style={css("display: flex; gap: 8px; flex-wrap: wrap; font-size: 13px; font-weight: 800; letter-spacing: 0.1em;")}>

            <a href="#que-es" style={css("color: #E8F0FF; text-decoration: none; border: 2px solid #4A4A4A; padding: 7px 12px;")}>
              {"QUÉ ES"}
            </a>

            <a href="#tipos" style={css("color: #E8F0FF; text-decoration: none; border: 2px solid #4A4A4A; padding: 7px 12px;")}>
              {"TIPOS"}
            </a>

            <a href="#arbol" style={css("color: #E8F0FF; text-decoration: none; border: 2px solid #4A4A4A; padding: 7px 12px;")}>
              {"ÁRBOL"}
            </a>

            <a href="#consultas" style={css("color: #E8F0FF; text-decoration: none; border: 2px solid #4A4A4A; padding: 7px 12px;")}>
              {"CONSULTAS"}
            </a>

            <a href="#construir" style={css("color: #E8F0FF; text-decoration: none; border: 2px solid #4A4A4A; padding: 7px 12px;")}>
              {"CONSTRUIR"}
            </a>

            <a href="#modificar" style={css("color: #E8F0FF; text-decoration: none; border: 2px solid #4A4A4A; padding: 7px 12px;")}>
              {"MODIFICAR"}
            </a>

            <a href="#serializar" style={css("color: #E8F0FF; text-decoration: none; border: 2px solid #4A4A4A; padding: 7px 12px;")}>
              {"SERIALIZAR"}
            </a>

            <a href="#explorador" style={css("color: #E8F0FF; text-decoration: none; border: 2px solid #4A4A4A; padding: 7px 12px;")}>
              {"EXPLORADOR"}
            </a>

            <a href="#referencia" style={css("color: #E8F0FF; text-decoration: none; border: 2px solid #4A4A4A; padding: 7px 12px;")}>
              {"REFERENCIA"}
            </a>

            <a href="/laboratorios/xml-lab" style={css("color: #06142E; text-decoration: none; border: 2px solid #35E0FF; background: #35E0FF; padding: 7px 12px;")}>
              {"&larr; XML"}
            </a>

          </nav>

        </header>

        <section style={css("padding: 90px 48px 70px; border-bottom: 10px solid #06142E; max-width: 1500px; margin: 0 auto;")}>

          <div style={css("display: flex; gap: 0; font-size: 15px; font-weight: 800; letter-spacing: 0.2em; margin-bottom: 34px;")}>

            <div style={css("background: #06142E; color: #E8F0FF; padding: 10px 18px;")}>
              {"LABORATORIO INTERACTIVO"}
            </div>

            <div style={css("background: #35E0FF; padding: 10px 18px;")}>
              {"MATERIAL INTERACTIVO"}
            </div>

          </div>

          <h1 style={css("font-family: 'Archivo Black', sans-serif; font-size: 148px; line-height: 0.82; margin: 0; letter-spacing: -0.045em; text-transform: uppercase;")}>
            {"JSON"}
            <br />
            {"EN C#"}
            <span style={css("color: #0047FF;")}>
              {"."}
            </span>
          </h1>

          <p style={css("margin: 34px 0 0 0; font-size: 26px; font-weight: 700; max-width: 46ch; line-height: 1.4; text-wrap: pretty;")}>
            {"Laboratorio sobre lectura, consulta, modificación y serialización de JSON en C# con "}
            <strong>
              {"System.Text.Json"}
            </strong>
            {"."}
          </p>

          <div style={css("display: grid; grid-template-columns: repeat(auto-fit, minmax(230px, 1fr)); gap: 18px; margin-top: 44px;")}>

            <div style={css("border: 6px solid #06142E; background: #FFF; padding: 20px 22px; font-size: 17px; font-weight: 700;")}>
              {"01 · Qué es y sus seis tipos"}
            </div>

            <div style={css("border: 6px solid #06142E; background: #FFF; padding: 20px 22px; font-size: 17px; font-weight: 700;")}>
              {"02 · Sintaxis y validación"}
            </div>

            <div style={css("border: 6px solid #06142E; background: #FFF; padding: 20px 22px; font-size: 17px; font-weight: 700;")}>
              {"03 · Leer, consultar y modificar"}
            </div>

            <div style={css("border: 6px solid #06142E; background: #35E0FF; padding: 20px 22px; font-size: 17px; font-weight: 700;")}>
              {"04 · Serializar objetos ⇄ JSON"}
            </div>

          </div>

        </section>

        <section id="que-es" style={css("padding: 70px 48px; border-bottom: 10px solid #06142E; max-width: 1500px; margin: 0 auto;")}>

          <div style={css("font-size: 15px; font-weight: 800; letter-spacing: 0.2em; border-bottom: 6px solid #06142E; padding-bottom: 12px; margin-bottom: 30px;")}>
            {"01 · QUÉ ES JSON"}
          </div>

          <div style={css("display: grid; grid-template-columns: minmax(0, 1.05fr) minmax(0, 1fr); gap: 44px; align-items: start;")}>

            <div>

              <h2 style={css("font-family: 'Archivo Black', sans-serif; font-size: 62px; margin: 0 0 24px 0; line-height: 0.94; text-transform: uppercase; letter-spacing: -0.03em;")}>
                {"DATOS SIN"}
                <br />
                {"ETIQUETAS"}
              </h2>

              <p style={css("margin: 0 0 18px 0; font-size: 21px; font-weight: 700; line-height: 1.5; text-wrap: pretty;")}>
                <strong>
                  {"JSON"}
                </strong>
                {" es "}
                <em>
                  {"JavaScript Object Notation"}
                </em>
                {": texto plano que describe datos con objetos "}
                <code>
                  {"{ }"}
                </code>
                {", listas "}
                <code>
                  {"[ ]"}
                </code>
                {" y valores con tipo. Nació de la sintaxis de JavaScript, pero hoy es independiente de cualquier lenguaje."}
              </p>

              <div style={css("display: grid; gap: 14px; margin-top: 26px;")}>

                <div style={css("border: 6px solid #06142E; background: #FFF; padding: 16px 20px; font-size: 18px; font-weight: 700;")}>
                  {"Jerárquico igual que XML: los datos forman un árbol."}
                </div>

                <div style={css("border: 6px solid #06142E; background: #FFF; padding: 16px 20px; font-size: 18px; font-weight: 700;")}>
                  {"Los números y booleanos son nativos, no cadenas."}
                </div>

                <div style={css("border: 6px solid #0047FF; background: #FFF; padding: 16px 20px; font-size: 18px; font-weight: 700;")}>
                  {"Más corto que XML: sin cierre de etiqueta y sin atributos."}
                </div>

              </div>

            </div>

            <div style={css("display: grid; gap: 20px; min-width: 0;")}>

              <div style={css("border:8px solid #06142E;background:#06142E;overflow:hidden")}>
                <CodeBlock
                  code={"{\n  \"sucursal\": \"central\",\n  \"productos\": [\n    {\n      \"id\": \"P-001\",\n      \"nombre\": \"Teclado mecánico\",\n      \"precio\": 250.00,\n      \"stock\": 12,\n      \"descontinuado\": false\n    }\n  ]\n}"}
                  language="json"
                  variant="dark"
                  style={css("padding:24px;font-size:17px;line-height:1.65;overflow:auto")}
                />
              </div>

              <div style={css("display: grid; grid-template-columns: 1fr 1fr; gap: 14px;")}>

                <div style={css("border: 6px solid #06142E; background: #FFF; padding: 16px 18px; font-size: 16px; font-weight: 700;")}>
                  <strong>
                    {"Dónde vive:"}
                  </strong>
                  {" APIs REST, "}
                  <code>
                    {"appsettings.json"}
                  </code>
                  {", "}
                  <code>
                    {"package.json"}
                  </code>
                  {", tokens JWT."}
                </div>

                <div style={css("border: 6px solid #06142E; background: #FFF; padding: 16px 18px; font-size: 16px; font-weight: 700;")}>
                  {"Bases NoSQL como MongoDB guardan documentos con esta forma."}
                </div>

                <div style={css("border: 6px solid #06142E; background: #FFF; padding: 16px 18px; font-size: 16px; font-weight: 700;")}>
                  {"Configuración y logs estructurados en la mayoría de servicios."}
                </div>

                <div style={css("border: 6px solid #06142E; background: #35E0FF; padding: 16px 18px; font-size: 16px; font-weight: 700;")}>
                  {"No tiene comentarios, atributos, namespaces ni esquema obligatorio."}
                </div>

              </div>

            </div>

          </div>

        </section>

        <section id="tipos" style={css("padding: 70px 48px; border-bottom: 10px solid #06142E; max-width: 1500px; margin: 0 auto;")}>

          <div style={css("font-size: 15px; font-weight: 800; letter-spacing: 0.2em; border-bottom: 6px solid #06142E; padding-bottom: 12px; margin-bottom: 30px;")}>
            {"02 · TIPOS · explore cada valor del documento"}
          </div>

          <h2 style={css("font-family: 'Archivo Black', sans-serif; font-size: 62px; margin: 0 0 30px 0; line-height: 0.94; text-transform: uppercase; letter-spacing: -0.03em;")}>
            {"LOS SEIS TIPOS DE JSON"}
          </h2>

          <div style={css("display: grid; grid-template-columns: minmax(0, 1.15fr) minmax(0, 1fr); gap: 40px; align-items: start;")}>

            <pre style={css("margin: 0; background: #06142E; color: #E8F0FF; border: 8px solid #06142E; padding: 28px; font-size: 19px; line-height: 1.85; overflow-x: auto;")}>
              <span onMouseEnter={v.hObjeto} style={css("color: #FF6BD6; cursor: pointer;")}>
                {"{"}
              </span>

              <span onMouseEnter={v.hClave} style={css("color: #6BE3FF; cursor: pointer;")}>
                {"\"nombre\""}
              </span>
              {": "}
              <span onMouseEnter={v.hString} style={css("color: #7CFF9E; cursor: pointer;")}>
                {"\"Teclado mecánico\""}
              </span>
              {",\n  \"precio\": "}
              <span onMouseEnter={v.hNumero} style={css("color: #35E0FF; cursor: pointer;")}>
                {"250.00"}
              </span>
              {",\n  \"activo\": "}
              <span onMouseEnter={v.hBool} style={css("color: #FFB86B; cursor: pointer;")}>
                {"true"}
              </span>
              {",\n  \"descontinuado\": "}
              <span onMouseEnter={v.hNull} style={css("color: #9A9A9A; cursor: pointer;")}>
                {"null"}
              </span>
              {",\n  \"etiquetas\": "}
              <span onMouseEnter={v.hArray} style={css("color: #C4A2FF; cursor: pointer;")}>
                {"[\"oficina\", \"usb\"]"}
              </span>
              {",\n  \"proveedor\": "}
              <span onMouseEnter={v.hObjeto} style={css("color: #FF6BD6; cursor: pointer;")}>
                {"{ \"nit\": \"123456-7\" }"}
              </span>

              <span style={css("color: #FF6BD6;")}>
                {"}"}
              </span>
            </pre>

            <div style={css("border: 8px solid #06142E; background: #FFF; padding: 30px; min-height: 320px; display: grid; gap: 18px; align-content: start;")}>

              <div style={css("font-size: 14px; font-weight: 800; letter-spacing: 0.2em; color: #6B6B6B;")}>
                {"TIPO SELECCIONADO"}
              </div>

              <div style={css("font-family: 'Archivo Black', sans-serif; font-size: 40px; line-height: 1; text-transform: uppercase;")}>
                {v.tipoTitulo}
              </div>

              <p style={css("margin: 0; font-size: 19px; font-weight: 700; line-height: 1.55; text-wrap: pretty;")}>
                {v.tipoTexto}
              </p>

              <div style={css("border-top: 5px solid #06142E; padding-top: 18px; margin-top: 6px;")}>

                <div style={css("font-size: 14px; font-weight: 800; letter-spacing: 0.16em; color: #0047FF; margin-bottom: 10px;")}>
                  {"EN C#"}
                </div>

                <div style={css("border:8px solid #06142E;background:#06142E;overflow:hidden")}>
                <CodeBlock
                  code={String(v.tipoCodigo ?? "")}
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
          theme="blue"
          eyebrow="04 · NAVEGAR · seleccione un nodo"
          title="EL JSON ES UN ÁRBOL"
          description={
            <>
              {"Cada nodo es un "}
              <code>{"JsonNode"}</code>
              {": "}
              <code>{"JsonObject"}</code>
              {", "}
              <code>{"JsonArray"}</code>
              {" o "}
              <code>{"JsonValue"}</code>
              {". Al seleccionar uno aparece la expresión de C# que lo alcanza."}
            </>
          }
          lines={Array.isArray(v.lineas) ? v.lineas : []}
          onExpand={v.expandirTodo}
          onCollapse={v.colapsarTodo}
          stats={[
            String(v.statNodos ?? 0) + " nodos",
            String(v.statHojas ?? 0) + " valores",
            "profundidad " + String(v.statProfundidad ?? 0),
          ]}
          selectedName={String(v.selNombre ?? "—")}
          selectedChips={[
            { label: String(v.selTipo ?? "—") },
            { label: "NIVEL " + String(v.selNivel ?? "—") },
            { label: String(v.selHijos ?? "0") + " HIJOS" },
          ]}
          selectedCode={String(v.selCodigo ?? "")}
          helpTitle="CÓMO MOVERSE"
          help={[
            <><code>{'raiz["clave"]'}</code>{" — propiedad de un objeto, o "}<code>{"null"}</code>{"."}</>,
            <><code>{'raiz["lista"][0]'}</code>{" — elemento de un arreglo por índice."}</>,
            <><code>{'raiz["lista"].AsArray()'}</code>{" — vista tipada para recorrer."}</>,
            <><code>{'(string)nodo'}</code>{" · "}<code>{'nodo.GetValue<int>()'}</code>{" · "}<code>{"nodo.GetValueOrDefault"}</code></>,
            <div style={{ borderTop: "5px solid #06142E", paddingTop: 14, color: "#FF3B30" }}>{"El cast directo lanza una excepción si el tipo no coincide. Prefiera "}<code>{"GetValueOrDefault"}</code>{" o comprobaciones con "}<code>{"is"}</code>{"."}</div>,
          ]}
          emptyMessage="El documento actual no se puede parsear, así que no hay nodos que navegar."
        />



        <section id="consultas" style={css("padding: 70px 48px; border-bottom: 10px solid #06142E; max-width: 1500px; margin: 0 auto;")}>

          <div style={css("font-size: 15px; font-weight: 800; letter-spacing: 0.2em; border-bottom: 6px solid #06142E; padding-bottom: 12px; margin-bottom: 30px;")}>
            {"05 · CONSULTAR · seleccione una consulta"}
          </div>

          <h2 style={css("font-family: 'Archivo Black', sans-serif; font-size: 62px; margin: 0 0 26px 0; line-height: 0.94; text-transform: uppercase; letter-spacing: -0.03em;")}>
            {"LINQ SOBRE EL JSON"}
          </h2>

          <div style={css("display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 26px;")}>

            {v.consultas.map((q, qIdx) => (
              <Fragment key={qIdx}>

                <button onClick={q.pick} style={css(`border: 5px solid #06142E; background: ${q.bg}; color: ${q.fg}; padding: 12px 18px; font-family: inherit; font-size: 15px; font-weight: 800; cursor: pointer;`)}>
                  {q.label}
                </button>

              </Fragment>
            ))}

          </div>

          <div style={css("display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(0, 1fr); gap: 28px; align-items: start;")}>

            <div style={css("border:8px solid #06142E;background:#06142E;overflow:hidden")}>
                <CodeBlock
                  code={String(v.consultaCodigo ?? "")}
                  language="csharp"
                  variant="dark"
                  style={css("padding:26px;font-size:17px;line-height:1.65;overflow:auto")}
                />
              </div>

            <div style={css("border: 8px solid #06142E; background: #FFF; padding: 24px; display: grid; gap: 12px; align-content: start; min-height: 240px;")}>

              <div style={css("font-size: 14px; font-weight: 800; letter-spacing: 0.2em; color: #00A64F;")}>
                {"RESULTADO SOBRE EL JSON"}
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

        <section id="construir" style={css("padding: 70px 48px; border-bottom: 10px solid #06142E; max-width: 1500px; margin: 0 auto;")}>

          <div style={css("font-size: 15px; font-weight: 800; letter-spacing: 0.2em; border-bottom: 6px solid #06142E; padding-bottom: 12px; margin-bottom: 30px;")}>
            {"06 · CONSTRUIR · complete el formulario"}
          </div>

          <h2 style={css("font-family: 'Archivo Black', sans-serif; font-size: 62px; margin: 0 0 12px 0; line-height: 0.94; text-transform: uppercase; letter-spacing: -0.03em;")}>
            {"CONSTRUCCIÓN CON JSONOBJECT"}
          </h2>

          <p style={css("margin: 0 0 26px 0; font-size: 20px; font-weight: 700; max-width: 78ch; line-height: 1.5;")}>
            {"Si no se declara una clase tipada, "}
            <code>
              {"JsonObject"}
            </code>
            {" y "}
            <code>
              {"JsonArray"}
            </code>
            {" construyen el documento igual que "}
            <code>
              {"XElement"}
            </code>
            {" en XML."}
          </p>

          <div style={css("display: grid; grid-template-columns: minmax(0, 0.75fr) minmax(0, 1.1fr) minmax(0, 1fr); gap: 24px; align-items: start;")}>

            <div style={css("border: 8px solid #06142E; background: #FFF; padding: 24px; display: grid; gap: 16px;")}>

              <div style={css("display: grid; gap: 6px;")}>

                <label style={css("font-size: 13px; font-weight: 800; letter-spacing: 0.14em;")}>
                  {"ID"}
                </label>

                <input onChange={v.setId} value={v.fId} style={css("border: 5px solid #06142E; padding: 12px; font-family: inherit; font-size: 17px; font-weight: 700;")} />

              </div>

              <div style={css("display: grid; gap: 6px;")}>

                <label style={css("font-size: 13px; font-weight: 800; letter-spacing: 0.14em;")}>
                  {"NOMBRE"}
                </label>

                <input onChange={v.setNombre} value={v.fNombre} style={css("border: 5px solid #06142E; padding: 12px; font-family: inherit; font-size: 17px; font-weight: 700;")} />

              </div>

              <div style={css("display: grid; gap: 6px;")}>

                <label style={css("font-size: 13px; font-weight: 800; letter-spacing: 0.14em;")}>
                  {"PRECIO"}
                </label>

                <input onChange={v.setPrecio} value={v.fPrecio} style={css("border: 5px solid #06142E; padding: 12px; font-family: inherit; font-size: 17px; font-weight: 700;")} />

              </div>

              <div style={css("display: grid; gap: 6px;")}>

                <label style={css("font-size: 13px; font-weight: 800; letter-spacing: 0.14em;")}>
                  {"STOCK"}
                </label>

                <input onChange={v.setStock} value={v.fStock} style={css("border: 5px solid #06142E; padding: 12px; font-family: inherit; font-size: 17px; font-weight: 700;")} />

              </div>

              <button onClick={v.agregarProducto} style={css("border: 5px solid #06142E; background: #35E0FF; padding: 14px; font-family: inherit; font-size: 16px; font-weight: 800; cursor: pointer;")}>
                {"productos.Add(…)"}
              </button>

            </div>

            <div style={css("border:8px solid #06142E;background:#06142E;overflow:hidden")}>
                <CodeBlock
                  code={String(v.codigoConstruir ?? "")}
                  language="csharp"
                  variant="dark"
                  style={css("padding:24px;font-size:16px;line-height:1.65;overflow:auto")}
                />
              </div>

            <div style={css("display: grid; gap: 12px; min-width: 0;")}>

              <div style={css("font-size: 14px; font-weight: 800; letter-spacing: 0.2em; color: #0047FF;")}>
                {"JSON GENERADO"}
              </div>

              <div style={css("border:8px solid #06142E;background:#FFFFFF;overflow:hidden")}>
                <CodeBlock
                  code={String(v.jsonGenerado ?? "")}
                  language="json"
                  variant="light"
                  style={css("padding:24px;font-size:16px;line-height:1.65;overflow:auto")}
                />
              </div>

              <div style={css("border: 6px solid #06142E; background: #FFF; padding: 16px 20px; font-size: 16px; font-weight: 700; line-height: 1.5;")}>
                {"El botón inserta ese objeto en el documento superior. Al regresar al editor se observa el árbol actualizado."}
              </div>

            </div>

          </div>

        </section>

        <section id="modificar" style={css("padding: 70px 48px; border-bottom: 10px solid #06142E; max-width: 1500px; margin: 0 auto;")}>

          <div style={css("font-size: 15px; font-weight: 800; letter-spacing: 0.2em; border-bottom: 6px solid #06142E; padding-bottom: 12px; margin-bottom: 30px;")}>
            {"07 · MODIFICAR · ejecuta las operaciones"}
          </div>

          <h2 style={css("font-family: 'Archivo Black', sans-serif; font-size: 62px; margin: 0 0 26px 0; line-height: 0.94; text-transform: uppercase; letter-spacing: -0.03em;")}>
            {"AGREGAR, CAMBIAR, BORRAR"}
          </h2>

          <div style={css("display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1.15fr); gap: 28px; align-items: start;")}>

            <div style={css("display: grid; gap: 14px;")}>

              {v.operaciones.map((op, opIdx) => (
                <Fragment key={opIdx}>

                  <div onClick={op.run} style={css("border: 6px solid #06142E; background: #FFF; padding: 18px 20px; cursor: pointer; display: grid; gap: 10px;")}>

                    <div style={css("font-size: 17px; font-weight: 800;")}>
                      {op.titulo}
                    </div>

                    <code style={css("font-size: 15px; color: #0047FF; line-height: 1.5;")}>
                      {op.codigo}
                    </code>

                  </div>

                </Fragment>
              ))}

            </div>

            <div style={css("display: grid; gap: 18px; min-width: 0;")}>

              <div style={css("font-size: 14px; font-weight: 800; letter-spacing: 0.2em;")}>
                {"DOCUMENTO EN MEMORIA"}
              </div>

              <div style={css("border:8px solid #06142E;background:#06142E;overflow:hidden")}>
                <CodeBlock
                  code={String(v.jsonActual ?? "")}
                  language="json"
                  variant="dark"
                  style={css("padding:24px;font-size:15px;line-height:1.65;overflow:auto;max-height:420px")}
                />
              </div>

              <div style={css("border: 8px solid #FF3B30; background: #FFF; padding: 18px 22px; font-size: 17px; font-weight: 700; line-height: 1.5;")}>
                {"Ninguna de estas operaciones escribe en disco. El documento permanece en memoria hasta invocar "}
                <code>
                  {"File.WriteAllText(ruta, raiz.ToJsonString(opciones))"}
                </code>
                {"."}
              </div>

            </div>

          </div>

        </section>

        <section id="serializar" style={css("padding: 70px 48px; border-bottom: 10px solid #06142E; max-width: 1500px; margin: 0 auto;")}>

          <div style={css("font-size: 15px; font-weight: 800; letter-spacing: 0.2em; border-bottom: 6px solid #06142E; padding-bottom: 12px; margin-bottom: 30px;")}>
            {"08 · SERIALIZAR · objeto ⇄ JSON"}
          </div>

          <h2 style={css("font-family: 'Archivo Black', sans-serif; font-size: 62px; margin: 0 0 26px 0; line-height: 0.94; text-transform: uppercase; letter-spacing: -0.03em;")}>
            {"SERIALIZACIÓN SIN RECORRER NODOS"}
          </h2>

          <div style={css("display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr) minmax(0, 0.85fr); gap: 24px; align-items: start;")}>

            <div style={css("display: grid; gap: 12px; min-width: 0;")}>

              <div style={css("font-size: 14px; font-weight: 800; letter-spacing: 0.2em;")}>
                {"LA CLASE MARCADA"}
              </div>

              <div style={css("border:8px solid #06142E;background:#06142E;overflow:hidden")}>
                <CodeBlock
                  code={"using System.Text.Json;\nusing System.Text.Json.Serialization;\n\npublic class Producto\n{\n    [JsonPropertyName(\"id\")]\n    public string Id { get; set; }\n\n    [JsonPropertyName(\"nombre\")]\n    public string Nombre { get; set; }\n\n    [JsonPropertyName(\"precio\")]\n    public decimal Precio { get; set; }\n\n    public int Stock { get; set; }\n\n    [JsonIgnore]\n    public decimal Margen => Precio * 0.3m;\n}"}
                  language="csharp"
                  variant="dark"
                  style={css("padding:22px;font-size:15px;line-height:1.65;overflow:auto")}
                />
              </div>

            </div>

            <div style={css("display: grid; gap: 12px; min-width: 0;")}>

              <div style={css("font-size: 14px; font-weight: 800; letter-spacing: 0.2em;")}>
                {"IDA Y VUELTA"}
              </div>

              <div style={css("border:8px solid #06142E;background:#06142E;overflow:hidden")}>
                <CodeBlock
                  code={"var opciones = new JsonSerializerOptions\n{\n    WriteIndented = true,\n    PropertyNamingPolicy = JsonNamingPolicy.CamelCase,\n    PropertyNameCaseInsensitive = true\n};\n\n// SERIALIZAR: objeto → JSON\nstring json = JsonSerializer.Serialize(productos, opciones);\nFile.WriteAllText(\"inventario.json\", json);\n\n// DESERIALIZAR: JSON → objeto\nstring texto = File.ReadAllText(\"inventario.json\");\nvar lista = JsonSerializer\n    .Deserialize<List<Producto>>(texto, opciones);\n\nConsole.WriteLine(lista[0].Nombre);"}
                  language="csharp"
                  variant="dark"
                  style={css("padding:22px;font-size:15px;line-height:1.65;overflow:auto")}
                />
              </div>

            </div>

            <div style={css("display: grid; gap: 14px;")}>

              <div style={css("border: 6px solid #06142E; background: #FFF; padding: 18px 20px; font-size: 16px; font-weight: 700; line-height: 1.5;")}>
                {"Requiere "}
                <strong>
                  {"constructor sin parámetros"}
                </strong>
                {" y propiedades públicas con get/set."}
              </div>

              <div style={css("border: 6px solid #06142E; background: #FFF; padding: 18px 20px; font-size: 16px; font-weight: 700; line-height: 1.5;")}>
                <code>
                  {"[JsonIgnore]"}
                </code>
                {" excluye propiedades calculadas; "}
                <code>
                  {"[JsonPropertyName]"}
                </code>
                {" permite renombrar propiedades sin alterar la clase."}
              </div>

              <div style={css("border: 6px solid #06142E; background: #35E0FF; padding: 18px 20px; font-size: 16px; font-weight: 700; line-height: 1.5;")}>
                <strong>
                  {"Serializer"}
                </strong>
                {" cuando usted define las clases. "}
                <strong>
                  {"JsonNode"}
                </strong>
                {" cuando lees JSON ajeno o solo necesitas un pedazo."}
              </div>

              <div style={css("border: 6px solid #0047FF; background: #FFF; padding: 18px 20px; font-size: 16px; font-weight: 700; line-height: 1.5;")}>
                {"El equivalente en XML es "}
                <code>
                  {"XmlSerializer"}
                </code>
                {" con "}
                <code>
                  {"[XmlRoot]"}
                </code>
                {" y "}
                <code>
                  {"[XmlElement]"}
                </code>
                {". La idea es idéntica."}
              </div>

            </div>

          </div>

        </section>

        <section id="explorador" style={css("padding: 70px 48px; border-bottom: 10px solid #06142E; max-width: 1500px; margin: 0 auto;")}>

          <div style={css("font-size: 15px; font-weight: 800; letter-spacing: 0.2em; border-bottom: 6px solid #06142E; padding-bottom: 12px; margin-bottom: 30px;")}>
            {"09 · EJEMPLO COMPLETO · abra un archivo del explorador"}
          </div>

          <h2 style={css("font-family: 'Archivo Black', sans-serif; font-size: 62px; margin: 0 0 12px 0; line-height: 0.94; text-transform: uppercase; letter-spacing: -0.03em;")}>
            {"APERTURA DE UN ARCHIVO JSON"}
          </h2>

          <p style={css("margin: 0 0 30px 0; font-size: 20px; font-weight: 700; max-width: 78ch; line-height: 1.5;")}>
            {"En una aplicación real la ruta no está escrita en el código: la selecciona el usuario. Seleccione un archivo en este explorador simulado y pulse "}
            <strong>
              {"Abrir"}
            </strong>
            {" para observar qué recibe el programa."}
          </p>

          <div style={css("display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 28px; align-items: start;")}>

            <div style={css("border: 8px solid #06142E; background: #D6E4FF; min-width: 0;")}>

              <div style={css("background: #06142E; color: #E8F0FF; padding: 12px 16px; display: flex; justify-content: space-between; align-items: center; font-size: 15px; font-weight: 800;")}>

                <span>
                  {"Seleccione un archivo JSON"}
                </span>

                <span style={css("display: flex; gap: 6px;")}>

                  <span style={css("width: 14px; height: 14px; border: 2px solid #E8F0FF;")} />

                  <span style={css("width: 14px; height: 14px; border: 2px solid #E8F0FF;")} />

                  <span style={css("width: 14px; height: 14px; border: 2px solid #FF3B30; background: #FF3B30;")} />

                </span>

              </div>

              <div style={css("padding: 12px 16px; border-bottom: 4px solid #06142E; font-size: 14px; font-weight: 700; background: #FFF;")}>
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

              <div style={css("border-top: 4px solid #06142E; padding: 14px 16px; display: flex; gap: 12px; align-items: center; background: #FFF; flex-wrap: wrap;")}>

                <span style={css("font-size: 14px; font-weight: 700;")}>
                  {"Filtro: "}
                  <code>
                    {"*.json"}
                  </code>
                </span>

                <button onClick={v.abrirArchivo} style={css("margin-left: auto; border: 5px solid #06142E; background: #35E0FF; padding: 10px 22px; font-family: inherit; font-size: 15px; font-weight: 800; cursor: pointer;")}>
                  {"Abrir"}
                </button>

                <button onClick={v.cancelarDialogo} style={css("border: 5px solid #06142E; background: #FFF; padding: 10px 22px; font-family: inherit; font-size: 15px; font-weight: 800; cursor: pointer;")}>
                  {"Cancelar"}
                </button>

              </div>

            </div>

            <div style={css("display: grid; gap: 16px; min-width: 0;")}>

              <div style={css("font-size: 14px; font-weight: 800; letter-spacing: 0.2em; color: #0047FF;")}>
                {"CONSOLA DE LA APLICACIÓN"}
              </div>

              <div style={css("border:8px solid #06142E;background:#06142E;overflow:hidden")}>
                <CodeBlock
                  code={String(v.salidaExplorador ?? "")}
                  language="csharp"
                  variant="dark"
                  style={css("padding:22px;font-size:16px;line-height:1.65;overflow:auto")}
                />
              </div>

              <div style={css("border: 6px solid #06142E; background: #FFF; padding: 16px 20px; font-size: 16px; font-weight: 700; line-height: 1.5;")}>
                {"Que el archivo termine en "}
                <code>
                  {".json"}
                </code>
                {" no garantiza nada: valida siempre con "}
                <code>
                  {"try/catch"}
                </code>
                {" de "}
                <code>
                  {"JsonException"}
                </code>
                {"."}
              </div>

            </div>

          </div>

          <div style={css("margin-top: 30px; border: 8px solid #06142E; background: #FFF;")}>

            <div style={css("background: #06142E; color: #E8F0FF; padding: 12px 16px; font-size: 14px; font-weight: 800; letter-spacing: 0.14em; display: flex; gap: 16px; flex-wrap: wrap;")}>

              <span>
                {"dataGridView1 · datos deserializados"}
              </span>

              <span style={css("margin-left: auto; color: #35E0FF;")}>
                {v.gridEstado}
              </span>

            </div>

            <div style={css("overflow-x: auto;")}>

              <div style={css("display: grid; grid-template-columns: 1.1fr 2fr 1.2fr 1fr 1.4fr; min-width: 720px;")}>

                <div style={css("background: #D6E4FF; border-bottom: 4px solid #06142E; padding: 12px 16px; font-size: 13px; font-weight: 800; letter-spacing: 0.1em;")}>
                  {"ID"}
                </div>

                <div style={css("background: #D6E4FF; border-bottom: 4px solid #06142E; padding: 12px 16px; font-size: 13px; font-weight: 800; letter-spacing: 0.1em;")}>
                  {"NOMBRE"}
                </div>

                <div style={css("background: #D6E4FF; border-bottom: 4px solid #06142E; padding: 12px 16px; font-size: 13px; font-weight: 800; letter-spacing: 0.1em;")}>
                  {"PRECIO"}
                </div>

                <div style={css("background: #D6E4FF; border-bottom: 4px solid #06142E; padding: 12px 16px; font-size: 13px; font-weight: 800; letter-spacing: 0.1em;")}>
                  {"STOCK"}
                </div>

                <div style={css("background: #D6E4FF; border-bottom: 4px solid #06142E; padding: 12px 16px; font-size: 13px; font-weight: 800; letter-spacing: 0.1em;")}>
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

            <div style={css("border-top: 4px solid #06142E; padding: 14px 16px; display: flex; gap: 24px; font-size: 15px; font-weight: 700; background: #F5F8FF; flex-wrap: wrap;")}>

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

              <div style={css("border:8px solid #06142E;background:#06142E;overflow:hidden")}>
                <CodeBlock
                  code={"using System.Windows.Forms;\nusing System.Text.Json;\n\nvar dlg = new OpenFileDialog\n{\n    Title  = \"Seleccione un archivo JSON\",\n    Filter = \"Archivos JSON (*.json)|*.json|Todos (*.*)|*.*\",\n    InitialDirectory = Environment.GetFolderPath(\n        Environment.SpecialFolder.MyDocuments)\n};\n\nif (dlg.ShowDialog() == DialogResult.OK)\n{\n    try\n    {\n        string texto = File.ReadAllText(dlg.FileName);\n        var doc = JsonSerializer.Deserialize<Inventario>(texto, opciones);\n\n        foreach (var p in doc.Productos)\n            Console.WriteLine(p.Nombre);\n    }\n    catch (JsonException ex)\n    {\n        MessageBox.Show($\"JSON inválido: {ex.Message}\");\n    }\n}"}
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

              <div style={css("border:8px solid #06142E;background:#06142E;overflow:hidden")}>
                <CodeBlock
                  code={"var dlg = new SaveFileDialog\n{\n    Title      = \"Guardar inventario\",\n    Filter     = \"Archivos JSON (*.json)|*.json\",\n    FileName   = \"inventario.json\",\n    DefaultExt = \"json\"\n};\n\nif (dlg.ShowDialog() == DialogResult.OK)\n{\n    try\n    {\n        string json = JsonSerializer.Serialize(doc, opciones);\n        File.WriteAllText(dlg.FileName, json);\n        MessageBox.Show($\"Guardado en {dlg.FileName}\");\n    }\n    catch (IOException ex)\n    {\n        MessageBox.Show($\"No se pudo escribir: {ex.Message}\");\n    }\n}"}
                  language="csharp"
                  variant="dark"
                  style={css("padding:24px;font-size:15px;line-height:1.65;overflow:auto")}
                />
              </div>

            </div>

          </div>

          <div style={css("margin-top: 30px; display: grid; gap: 14px;")}>

            <div style={css("display: flex; align-items: baseline; gap: 16px; flex-wrap: wrap; border-top: 6px solid #06142E; padding-top: 22px;")}>

              <div style={css("font-family: 'Archivo Black', sans-serif; font-size: 34px; text-transform: uppercase; letter-spacing: -0.02em;")}>
                {"Programa completo"}
              </div>

              <div style={css("font-size: 15px; font-weight: 800; letter-spacing: 0.14em; color: #6B6B6B;")}>
                {"Program.cs · consola, sin dependencias externas"}
              </div>

            </div>

            <div style={css("border:8px solid #06142E;background:#06142E;overflow:hidden")}>
                <CodeBlock
                  code={"using System;\nusing System.Collections.Generic;\nusing System.IO;\nusing System.Linq;\nusing System.Text.Json;\nusing System.Text.Json.Serialization;\n\nclass Program\n{\n    class Producto\n    {\n        [JsonPropertyName(\"id\")]     public string Id { get; set; }\n        [JsonPropertyName(\"nombre\")] public string Nombre { get; set; }\n        [JsonPropertyName(\"precio\")] public decimal Precio { get; set; }\n        [JsonPropertyName(\"stock\")]  public int Stock { get; set; }\n    }\n\n    class Inventario\n    {\n        [JsonPropertyName(\"sucursal\")]  public string Sucursal { get; set; }\n        [JsonPropertyName(\"productos\")] public List<Producto> Productos { get; set; } = new();\n    }\n\n    static readonly JsonSerializerOptions Opciones = new()\n    {\n        WriteIndented = true,\n        PropertyNameCaseInsensitive = true\n    };\n\n    static void Main()\n    {\n        Console.Write(\"Ruta del archivo JSON: \");\n        string ruta = Console.ReadLine()?.Trim('\"') ?? \"\";\n\n        if (!File.Exists(ruta))\n        {\n            Console.WriteLine(\"No existe ese archivo.\");\n            return;\n        }\n\n        Inventario doc;\n        try\n        {\n            doc = JsonSerializer.Deserialize<Inventario>(File.ReadAllText(ruta), Opciones);\n        }\n        catch (JsonException ex)\n        {\n            Console.WriteLine($\"JSON inválido: {ex.Message}\");\n            return;\n        }\n\n        // ── LEER ────────────────────────────────────────────────\n        Console.WriteLine($\"\\nSucursal {doc.Sucursal} · {doc.Productos.Count} productos:\\n\");\n        foreach (var p in doc.Productos)\n            Console.WriteLine($\"  {p.Id,-8} {p.Nombre,-24} Q{p.Precio,10:N2}  x{p.Stock}\");\n\n        decimal total = doc.Productos.Sum(p => p.Precio * p.Stock);\n        Console.WriteLine($\"\\n  Valor del inventario: Q{total:N2}\");\n\n        var agotados = doc.Productos.Where(p => p.Stock == 0).ToList();\n        if (agotados.Any())\n            Console.WriteLine($\"  Agotados: {string.Join(\", \", agotados.Select(p => p.Nombre))}\");\n\n        // ── ESCRIBIR ────────────────────────────────────────────\n        Console.Write(\"\\nNombre del producto nuevo (Enter para salir): \");\n        string nombre = Console.ReadLine();\n        if (string.IsNullOrWhiteSpace(nombre)) return;\n\n        Console.Write(\"Precio: \");\n        decimal precio = decimal.Parse(Console.ReadLine());\n        Console.Write(\"Stock: \");\n        int stock = int.Parse(Console.ReadLine());\n\n        doc.Productos.Add(new Producto\n        {\n            Id = $\"P-{doc.Productos.Count + 1:000}\",\n            Nombre = nombre,\n            Precio = precio,\n            Stock = stock\n        });\n\n        // ── GUARDAR ─────────────────────────────────────────────\n        try\n        {\n            string respaldo = Path.ChangeExtension(ruta, \".bak.json\");\n            File.Copy(ruta, respaldo, overwrite: true);\n            File.WriteAllText(ruta, JsonSerializer.Serialize(doc, Opciones));\n            Console.WriteLine($\"\\nGuardado. Respaldo en {Path.GetFileName(respaldo)}\");\n        }\n        catch (UnauthorizedAccessException)\n        {\n            Console.WriteLine(\"Sin permiso de escritura sobre el archivo.\");\n        }\n        catch (IOException ex)\n        {\n            Console.WriteLine($\"Error de escritura: {ex.Message}\");\n        }\n    }\n}"}
                  language="csharp"
                  variant="dark"
                  style={css("padding:28px;font-size:15px;line-height:1.65;overflow:auto")}
                />
              </div>

          </div>

        </section>

        <section id="referencia" style={css("padding: 70px 48px 90px; background: #06142E; color: #E8F0FF;")}>

          <div style={css("max-width: 1500px; margin: 0 auto;")}>

            <div style={css("display: flex; justify-content: space-between; align-items: baseline; border-bottom: 8px solid #0047FF; padding-bottom: 16px; margin-bottom: 34px; flex-wrap: wrap; gap: 16px;")}>

              <h2 style={css("font-family: 'Archivo Black', sans-serif; font-size: 62px; margin: 0; line-height: 1; text-transform: uppercase; letter-spacing: -0.03em; color: #35E0FF;")}>
                {"Referencia rápida"}
              </h2>

              <div style={css("font-size: 15px; font-weight: 800; letter-spacing: 0.2em;")}>
                {"USING SYSTEM.TEXT.JSON;"}
              </div>

            </div>

            <div style={css("display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 26px;")}>

              <div style={css("display: grid; gap: 14px;")}>

                <div style={css("font-size: 14px; font-weight: 800; letter-spacing: 0.16em; color: #35E0FF;")}>
                  {"LEER"}
                </div>

                <div style={css("border:8px solid #06142E;background:#06142E;overflow:hidden")}>
                <CodeBlock
                  code={"JsonNode.Parse(texto)\nJsonDocument.Parse(texto)\nJsonSerializer.Deserialize<T>(t)\nraiz[\"clave\"]\nraiz[\"lista\"][0]\nraiz[\"lista\"].AsArray()\n(decimal)nodo\nnodo.GetValue<int>()"}
                  language="csharp"
                  variant="dark"
                  style={css("padding:20px;font-size:16px;line-height:1.65;overflow:auto")}
                />
              </div>

              </div>

              <div style={css("display: grid; gap: 14px;")}>

                <div style={css("font-size: 14px; font-weight: 800; letter-spacing: 0.16em; color: #35E0FF;")}>
                  {"ESCRIBIR"}
                </div>

                <div style={css("border:8px solid #06142E;background:#06142E;overflow:hidden")}>
                <CodeBlock
                  code={"new JsonObject { [\"id\"] = \"P-9\" }\nnew JsonArray(1, 2, 3)\narreglo.Add(objeto)\nobjeto[\"stock\"] = 8\nobjeto.Remove(\"stock\")\narreglo.RemoveAt(0)\nJsonSerializer.Serialize(o, op)\nFile.WriteAllText(ruta, json)"}
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

                <div style={css("border: 5px solid #E8F0FF; padding: 20px; display: grid; gap: 12px; font-size: 15px; font-weight: 700; line-height: 1.5;")}>

                  <div>
                    {"Armar JSON concatenando strings."}
                  </div>

                  <div>
                    {"Coma final o comillas simples."}
                  </div>

                  <div>
                    {"Olvidar "}
                    <code>
                      {"PropertyNameCaseInsensitive"}
                    </code>
                    {"."}
                  </div>

                  <div>
                    {"Convertir un nodo "}
                    <code>
                      {"null"}
                    </code>
                    {" sin verificar."}
                  </div>

                  <div>
                    {"Esperar comentarios o atributos: no existen."}
                  </div>

                  <div>
                    {"Modificar en memoria y no escribir el archivo."}
                  </div>

                </div>

              </div>

            </div>

            <div style={css("border: 6px solid #35E0FF; background: #35E0FF; color: #06142E; padding: 24px 28px; font-size: 20px; font-weight: 700; margin-top: 30px; line-height: 1.5;")}>
              {"JSON describe datos con objetos y listas · los tipos son nativos · en C# se maneja con "}
              <strong>
                {"System.Text.Json"}
              </strong>
              {": "}
              <code>
                {"JsonNode"}
              </code>
              {" para navegar, "}
              <code>
                {"JsonSerializer"}
              </code>
              {" para mapear clases."}
            </div>

          </div>

        </section>

      </div>
    </div>
  )
}
