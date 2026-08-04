// @ts-nocheck
/**
 * Interactive logic ported from the native XmlLab DC artifact.
 */

const BASE = `<?xml version="1.0" encoding="utf-8"?>
<inventario sucursal="central">
  <producto id="P-001" categoria="perifericos">
    <nombre>Teclado mecánico</nombre>
    <precio moneda="GTQ">250.00</precio>
    <stock>12</stock>
  </producto>
  <producto id="P-002" categoria="perifericos">
    <nombre>Mouse inalámbrico</nombre>
    <precio moneda="GTQ">120.00</precio>
    <stock>0</stock>
  </producto>
  <producto id="P-003" categoria="pantallas">
    <nombre>Monitor 24 pulgadas</nombre>
    <precio moneda="GTQ">1450.00</precio>
    <stock>5</stock>
  </producto>
</inventario>`;

const PARTES = {
  prolog: ["Prólogo", "Declara la versión de XML y la codificación de caracteres. Va siempre en la primera línea, sin nada antes, ni siquiera un espacio.", 'new XDeclaration("1.0", "utf-8", null)'],
  raiz: ["Elemento raíz", "El contenedor de todo. Un documento XML tiene uno y solo uno; dos raíces hacen que el parser falle.", "XElement raiz = doc.Root;"],
  attr: ["Atributo", "Un par nombre=\"valor\" dentro de la etiqueta de apertura. Siempre entre comillas, siempre texto, y no se repite dentro del mismo elemento.", 'new XAttribute("id", "P-001")\nel.Attribute("id")?.Value'],
  elem: ["Elemento", "La unidad básica: etiqueta de apertura, contenido y etiqueta de cierre. Puede repetirse y anidarse sin límite.", 'new XElement("nombre", "Teclado")\nel.Element("nombre")'],
  texto: ["Contenido de texto", "El valor entre las etiquetas. Para XML todo es texto: el tipo se determina al convertirlo.", '(string)el.Element("nombre")\n(decimal)el.Element("precio")'],
  vacio: ["Elemento vacío", "Sin contenido. Se puede escribir <tag></tag> o abreviado <tag/>: significan exactamente lo mismo.", 'new XElement("descontinuado")'],
  comentario: ["Comentario", "Nota para humanos, ignorada por el procesador. No puede anidarse ni contener dos guiones seguidos.", 'new XComment("revisar precio en julio")']
};

export class XmlLabLogic {
  state = {
    xml: BASE,
    parte: "prolog",
    cerrados: [],
    selRuta: "root",
    sel: 0,
    q: 0,
    archivo: 0,
    salida: "// Esperando… selecciona un archivo y pulsa Abrir.",
    cargado: null,
    cargadoNombre: null,
    fId: "P-004",
    fNombre: "Webcam HD",
    fPrecio: "380.00",
    fStock: "7"
  };

  parse(txt) {
    const doc = new DOMParser().parseFromString(txt, "application/xml");
    const err = doc.querySelector("parsererror");
    return { doc, error: err ? err.textContent.replace(/\s+/g, " ").trim().slice(0, 260) : null };
  }

  esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&apos;");
  }

  ser(el, depth) {
    const pad = "  ".repeat(depth);
    const attrs = Array.from(el.attributes).map(a => ` ${a.name}="${this.esc(a.value)}"`).join("");
    const kids = Array.from(el.children);
    const text = Array.from(el.childNodes).filter(n => n.nodeType === 3).map(n => n.nodeValue.trim()).join("");
    if (!kids.length) return text ? `${pad}<${el.nodeName}${attrs}>${this.esc(text)}</${el.nodeName}>` : `${pad}<${el.nodeName}${attrs} />`;
    return `${pad}<${el.nodeName}${attrs}>\n` + kids.map(k => this.ser(k, depth + 1)).join("\n") + `\n${pad}</${el.nodeName}>`;
  }

  pretty(doc) {
    return '<?xml version="1.0" encoding="utf-8"?>\n' + this.ser(doc.documentElement, 0);
  }

  flatten(el, depth, out, ruta, cerrados) {
    const attrs = Array.from(el.attributes).map(a => `${a.name}="${a.value}"`).join(" ");
    const kids = Array.from(el.children);
    const text = kids.length ? "" : (el.textContent || "").trim();
    const abierto = !cerrados.includes(ruta);
    out.push({ el, depth, attrs, text, kids: kids.length, ruta, abierto });
    if (abierto) kids.forEach((k, i) => this.flatten(k, depth + 1, out, ruta + "/" + k.nodeName + i, cerrados));
    return out;
  }

  buildLines(el, depth, ruta, cerrados, out, elems) {
    const P = "#7A9A86", N = "#B5006B", A = "#00A64F", V = "#00863F", T = "#0A1F14", G = "#6F8A78";
    const name = el.nodeName;
    const attrs = Array.from(el.attributes);
    const kids = Array.from(el.children);
    const text = kids.length ? "" : (el.textContent || "").trim();
    const abierto = !cerrados.includes(ruta);
    elems.push({ el, depth, ruta, kids: kids.length, text });

    const cabecera = [{ t: "<", c: P, w: 400 }, { t: name, c: N, w: 800 }];
    attrs.forEach(a => {
      cabecera.push({ t: " " + a.name, c: A, w: 700 });
      cabecera.push({ t: "=", c: P, w: 400 });
      cabecera.push({ t: '"' + a.value + '"', c: V, w: 700 });
    });

    const cierre = [{ t: "</", c: P, w: 400 }, { t: name, c: N, w: 800 }, { t: ">", c: P, w: 400 }];

    if (!kids.length && !text) {
      out.push({ ruta, depth, plegable: false, abierto, segs: cabecera.concat([{ t: " />", c: P, w: 400 }]), nota: "vacío" });
      return out;
    }
    if (!kids.length) {
      out.push({ ruta, depth, plegable: false, abierto, segs: cabecera.concat([{ t: ">", c: P, w: 400 }, { t: text, c: T, w: 400 }], cierre), nota: "texto" });
      return out;
    }
    if (!abierto) {
      out.push({ ruta, depth, plegable: true, abierto: false, segs: cabecera.concat([{ t: ">", c: P, w: 400 }, { t: " … ", c: G, w: 800 }], cierre), nota: kids.length + " hijos" });
      return out;
    }
    out.push({ ruta, depth, plegable: true, abierto: true, segs: cabecera.concat([{ t: ">", c: P, w: 400 }]), nota: kids.length + " hijos" });
    kids.forEach((k, i) => this.buildLines(k, depth + 1, ruta + "/" + k.nodeName + i, cerrados, out, elems));
    out.push({ ruta, depth, plegable: false, abierto, cierre: true, segs: cierre, nota: "" });
    return out;
  }

  xmlAObjeto(el) {
    const kids = Array.from(el.children);
    const attrs = Array.from(el.attributes);
    const num = t => t !== "" && !isNaN(Number(t)) ? Number(t) : t;
    if (!kids.length) {
      const texto = num((el.textContent || "").trim());
      if (!attrs.length) return texto;
      const o = {};
      attrs.forEach(a => { o[a.name] = num(a.value); });
      o.valor = texto;
      return o;
    }
    const obj = {};
    attrs.forEach(a => { obj[a.name] = num(a.value); });
    const grupos = {};
    kids.forEach(k => { (grupos[k.nodeName] = grupos[k.nodeName] || []).push(k); });
    Object.keys(grupos).forEach(nombre => {
      const g = grupos[nombre];
      obj[g.length > 1 ? nombre + "s" : nombre] = g.length > 1 ? g.map(k => this.xmlAObjeto(k)) : this.xmlAObjeto(g[0]);
    });
    return el.parentElement ? obj : { [el.nodeName]: obj };
  }

  todasLasRutas(el, ruta, out) {
    if (el.children.length) out.push(ruta);
    Array.from(el.children).forEach((k, i) => this.todasLasRutas(k, ruta + "/" + k.nodeName + i, out));
    return out;
  }

  pathOf(el) {
    const steps = [];
    let cur = el;
    while (cur && cur.parentElement) {
      const same = Array.from(cur.parentElement.children).filter(c => c.nodeName === cur.nodeName);
      const i = same.indexOf(cur);
      steps.unshift(same.length > 1 ? `.Elements("${cur.nodeName}").ElementAt(${i})` : `.Element("${cur.nodeName}")`);
      cur = cur.parentElement;
    }
    return "doc.Root" + steps.join("\n      ");
  }

  setXml(txt) { this.setState({ xml: txt, selRuta: "root" }); }

  mutate(fn) {
    const { doc, error } = this.parse(this.state.xml);
    if (error) return;
    fn(doc);
    this.setState({ xml: this.pretty(doc), selRuta: "root" });
  }

  renderVals() {
    const { doc, error } = this.parse(this.state.xml);
    const ok = !error;
    const cerrados = this.state.cerrados;
    const elems = [];
    const lineasRaw = ok ? this.buildLines(doc.documentElement, 0, "root", cerrados, [], elems) : [];
    const selRuta = elems.some(e => e.ruta === this.state.selRuta) ? this.state.selRuta : "root";
    const selNode = elems.find(e => e.ruta === selRuta);

    const lineas = lineasRaw.map((l, i) => {
      const activo = l.ruta === selRuta;
      return {
        key: i,
        pad: l.depth * 22 + "px",
        guia: l.depth ? "#E0DBCC" : "transparent",
        icono: l.plegable ? (l.abierto ? "–" : "+") : "",
        cursorT: l.plegable ? "pointer" : "default",
        colorT: l.plegable ? "#00A64F" : "transparent",
        bg: activo ? "#E8F9B8" : "transparent",
        marca: activo ? "#D4F567" : "transparent",
        segs: l.segs.map((s, j) => ({ key: j, t: s.t, c: s.c, w: s.w })),
        nota: activo ? l.nota : "",
        pick: () => this.setState({ selRuta: l.ruta }),
        toggle: e => {
          if (!l.plegable) return;
          if (e && e.stopPropagation) e.stopPropagation();
          this.setState(s => ({ cerrados: s.cerrados.includes(l.ruta) ? s.cerrados.filter(r => r !== l.ruta) : s.cerrados.concat(l.ruta), selRuta: l.ruta }));
        }
      };
    });

    let selNombre = "—", selCodigo = "Corrige el XML para navegar el árbol.";
    let selNivel = "—", selHijos = "0", selPadre = "—";
    if (selNode) {
      selNombre = `<${selNode.el.nodeName}>`;
      selNivel = String(selNode.depth);
      selHijos = String(selNode.kids);
      selPadre = selNode.el.parentElement ? `<${selNode.el.parentElement.nodeName}>` : "(es la raíz)";
      const p = this.pathOf(selNode.el);
      const lines = [`var el = ${p};`, ""];
      Array.from(selNode.el.attributes).forEach(a => lines.push(`el.Attribute("${a.name}").Value   // "${a.value}"`));
      if (selNode.kids) {
        lines.push(`el.Elements().Count()   // ${selNode.kids}`);
        Array.from(selNode.el.children).slice(0, 4).forEach(c => {
          if (!c.children.length) lines.push(`el.Element("${c.nodeName}").Value   // "${c.textContent.trim()}"`);
        });
      } else {
        lines.push(`el.Value   // "${selNode.text}"`);
        if (selNode.text !== "" && !isNaN(Number(selNode.text))) lines.push(`(decimal)el   // ${Number(selNode.text)}`);
      }
      selCodigo = lines.join("\n");
    }

    let statElementos = 0, statAtributos = 0, statProfundidad = 0;
    if (ok) {
      const todos = this.flatten(doc.documentElement, 0, [], "root", []);
      statElementos = todos.length;
      statAtributos = todos.reduce((a, n) => a + n.el.attributes.length, 0);
      statProfundidad = todos.reduce((a, n) => Math.max(a, n.depth), 0) + 1;
    }

    const prods = ok ? Array.from(doc.querySelectorAll("producto")) : [];
    const val = (p, n) => (p.querySelector(n) ? p.querySelector(n).textContent.trim() : "");

    const defs = [
      { label: "todos los nombres",
        code: 'var nombres = doc.Descendants("producto")\n    .Select(p => (string)p.Element("nombre"));',
        run: () => prods.map(p => val(p, "nombre")) },
      { label: "agotados",
        code: 'var agotados = doc.Descendants("producto")\n    .Where(p => (int)p.Element("stock") == 0)\n    .Select(p => (string)p.Element("nombre"));',
        run: () => prods.filter(p => Number(val(p, "stock")) === 0).map(p => val(p, "nombre")) },
      { label: "precio > 500",
        code: 'var caros = doc.Descendants("producto")\n    .Where(p => (decimal)p.Element("precio") > 500)\n    .Select(p => $"{(string)p.Element("nombre")} — Q{(decimal)p.Element("precio")}");',
        run: () => prods.filter(p => Number(val(p, "precio")) > 500).map(p => `${val(p, "nombre")} — Q${val(p, "precio")}`) },
      { label: "valor del inventario",
        code: 'decimal total = doc.Descendants("producto")\n    .Sum(p => (decimal)p.Element("precio")\n            * (int)p.Element("stock"));',
        run: () => ["Q " + prods.reduce((a, p) => a + Number(val(p, "precio")) * Number(val(p, "stock")), 0).toFixed(2)] },
      { label: "agrupar por categoría",
        code: 'var porCat = doc.Descendants("producto")\n    .GroupBy(p => (string)p.Attribute("categoria"))\n    .Select(g => $"{g.Key}: {g.Count()}");',
        run: () => {
          const m = {};
          prods.forEach(p => { const c = p.getAttribute("categoria") || "(sin categoría)"; m[c] = (m[c] || 0) + 1; });
          return Object.keys(m).map(k => `${k}: ${m[k]}`);
        } },
      { label: "ordenar por precio",
        code: 'var orden = doc.Descendants("producto")\n    .OrderByDescending(p => (decimal)p.Element("precio"))\n    .Select(p => (string)p.Element("nombre"));',
        run: () => prods.slice().sort((a, b) => Number(val(b, "precio")) - Number(val(a, "precio"))).map(p => val(p, "nombre")) }
    ];

    const qi = this.state.q;
    const consultas = defs.map((d, i) => ({
      key: i, label: d.label,
      bg: i === qi ? "#0A1F14" : "#FFF",
      fg: i === qi ? "#D4F567" : "#0A1F14",
      pick: () => this.setState({ q: i })
    }));
    let res = [];
    try { res = ok ? defs[qi].run() : ["— XML inválido —"]; } catch (e) { res = ["Error de conversión: " + e.message]; }
    if (!res.length) res = ["(sin resultados)"];

    const nuevo = `  <producto id="${this.state.fId}">\n    <nombre>${this.esc(this.state.fNombre)}</nombre>\n    <precio>${this.state.fPrecio}</precio>\n    <stock>${this.state.fStock}</stock>\n  </producto>`;

    const operaciones = [
      { key: 0, titulo: "Agregar el producto del formulario", codigo: 'doc.Root.Add(new XElement("producto", …));',
        run: () => this.mutate(d => {
          const p = d.createElement("producto");
          p.setAttribute("id", this.state.fId);
          [["nombre", this.state.fNombre], ["precio", this.state.fPrecio], ["stock", this.state.fStock]].forEach(([n, v]) => {
            const e = d.createElement(n); e.textContent = v; p.appendChild(e);
          });
          d.documentElement.appendChild(p);
        }) },
      { key: 1, titulo: "Bajar el stock de P-001 a 3", codigo: 'p.SetElementValue("stock", 3);',
        run: () => this.mutate(d => {
          const p = d.querySelector('producto[id="P-001"]');
          if (p && p.querySelector("stock")) p.querySelector("stock").textContent = "3";
        }) },
      { key: 2, titulo: "Marcar todo como revisado", codigo: 'p.SetAttributeValue("revisado", "true");',
        run: () => this.mutate(d => d.querySelectorAll("producto").forEach(p => p.setAttribute("revisado", "true"))) },
      { key: 3, titulo: "Eliminar los productos agotados", codigo: '.Where(x => (int)x.Element("stock") == 0).Remove();',
        run: () => this.mutate(d => d.querySelectorAll("producto").forEach(p => {
          const s = p.querySelector("stock");
          if (s && Number(s.textContent) === 0) p.remove();
        })) },
      { key: 4, titulo: "Subir 10% todos los precios", codigo: 'foreach (var p in doc.Descendants("precio")) …',
        run: () => this.mutate(d => d.querySelectorAll("precio").forEach(e => { e.textContent = (Number(e.textContent) * 1.1).toFixed(2); })) },
      { key: 5, titulo: "Restaurar el documento original", codigo: 'doc = XDocument.Load("inventario.xml");',
        run: () => this.setXml(BASE) }
    ];

    const FILES = [
      { nombre: "inventario.xml", ext: "XML", peso: "1.2 KB", xml: true },
      { nombre: "sucursales.xml", ext: "XML", peso: "0.6 KB", xml: true,
        contenido: '<?xml version="1.0" encoding="utf-8"?>\n<sucursales>\n  <sucursal codigo="C-01"><ciudad>Guatemala</ciudad></sucursal>\n  <sucursal codigo="C-02"><ciudad>Quetzaltenango</ciudad></sucursal>\n</sucursales>' },
      { nombre: "config.xml", ext: "XML", peso: "0.3 KB", xml: true, roto: true,
        contenido: '<?xml version="1.0"?>\n<config>\n  <ruta>C:\\datos & backups</ruta>\n</config>' },
      { nombre: "notas.txt", ext: "TXT", peso: "0.1 KB", xml: false },
      { nombre: "reporte.docx", ext: "DOCX", peso: "24 KB", xml: false }
    ];
    const ai = this.state.archivo;
    const archivos = FILES.map((f, i) => ({
      key: i, nombre: f.nombre, ext: f.ext, peso: f.peso,
      fondo: i === ai ? "#00A64F" : "#FFF",
      texto: i === ai ? "#FFF" : (f.xml ? "#0A1F14" : "#8A8A8A"),
      borde: i === ai ? "#00A64F" : "#A8CDB8",
      pick: () => this.setState({ archivo: i })
    }));

    const abrirArchivo = () => {
      const f = FILES[ai];
      const ruta = "C:\\Users\\dev\\Documents\\datos\\" + f.nombre;
      if (!f.xml) {
        this.setState({ cargado: null, cargadoNombre: f.nombre, salida: `> abriendo ${f.nombre}\n\n✕ System.Xml.XmlException:\n  Data at the root level is invalid. Line 1, position 1.\n\n  La extensión no importa: ${f.nombre} no contiene XML.` });
        return;
      }
      const texto = f.contenido || this.state.xml;
      const r = this.parse(texto);
      if (r.error) {
        this.setState({ cargado: null, cargadoNombre: f.nombre, salida: `> XDocument.Load("${ruta}")\n\n✕ System.Xml.XmlException:\n  ${r.error}\n\n  Recuerda escapar & como &amp;` });
        return;
      }
      const root = r.doc.documentElement;
      const hijos = Array.from(root.children);
      const lineas = [
        `> XDocument.Load("${ruta}")`,
        ``,
        `✓ doc.Root = <${root.nodeName}>`,
        `  hijos directos: ${hijos.length}`,
        ``,
        ...hijos.slice(0, 6).map(h => {
          const et = Array.from(h.children).map(c => `${c.nodeName}="${c.textContent.trim()}"`).join(" ");
          return `  <${h.nodeName}> ${et}`;
        })
      ];
      this.setState({ salida: lineas.join("\n"), cargado: texto, cargadoNombre: f.nombre });
    };

    const money = n => "Q " + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    let filas = [], gridEstado = "sin datos", gridConteo = "0 filas", gridTotal = money(0);
    if (this.state.cargado) {
      const r = this.parse(this.state.cargado);
      const items = r.error ? [] : Array.from(r.doc.querySelectorAll("producto"));
      const v = (p, n) => (p.querySelector(n) ? p.querySelector(n).textContent.trim() : "");
      filas = items.map((p, i) => {
        const precio = Number(v(p, "precio")) || 0;
        const stock = Number(v(p, "stock")) || 0;
        return {
          key: i,
          id: p.getAttribute("id") || "(sin id)",
          nombre: v(p, "nombre") || "(sin nombre)",
          precio: money(precio),
          stock: String(stock),
          subtotal: money(precio * stock),
          colorStock: stock === 0 ? "#FF3B30" : "#0A1F14",
          bg: i % 2 ? "#F3FBF6" : "#FFF"
        };
      });
      gridEstado = this.state.cargadoNombre + " cargado";
      gridConteo = filas.length + (filas.length === 1 ? " fila" : " filas");
      gridTotal = money(items.reduce((a, p) => a + (Number(v(p, "precio")) || 0) * (Number(v(p, "stock")) || 0), 0));
      if (!filas.length) {
        filas = [{ key: 0, id: "—", nombre: "El documento no contiene <producto>", precio: "—", stock: "—", subtotal: "—", colorStock: "#6B6B6B", bg: "#FFF" }];
        gridConteo = "0 filas";
      }
    } else {
      filas = [{ key: 0, id: "—", nombre: this.state.cargadoNombre ? "No se pudo cargar " + this.state.cargadoNombre : "Abre un archivo para poblar la tabla", precio: "—", stock: "—", subtotal: "—", colorStock: "#6B6B6B", bg: "#FFF" }];
      gridEstado = this.state.cargadoNombre ? "error de carga" : "sin datos";
    }

    const parte = PARTES[this.state.parte];

    return {
      xmlActual: this.state.xml,
      estadoIcono: ok ? "✓" : "✕",
      estadoTexto: ok ? "Documento bien formado" : "XmlException al cargar",
      hayError: !ok,
      errorTexto: error || "",
      editarXml: e => this.setXml(e.target.value),
      restaurar: () => this.setXml(BASE),
      romperCierre: () => this.setXml(BASE.replace("</nombre>", "")),
      romperAmp: () => this.setXml(BASE.replace("Teclado mecánico", "Teclado & mouse")),
      romperRaiz: () => this.setXml(BASE + "\n<otro-inventario></otro-inventario>"),

      parteTitulo: parte[0], parteTexto: parte[1], parteCodigo: parte[2],
      hoverProlog: () => this.setState({ parte: "prolog" }),
      hoverRaiz: () => this.setState({ parte: "raiz" }),
      hoverAttr: () => this.setState({ parte: "attr" }),
      hoverElem: () => this.setState({ parte: "elem" }),
      hoverTexto: () => this.setState({ parte: "texto" }),
      hoverVacio: () => this.setState({ parte: "vacio" }),
      hoverComentario: () => this.setState({ parte: "comentario" }),

      lineas, selNombre, selCodigo, selNivel, selHijos, selPadre,
      statElementos, statAtributos, statProfundidad,
      expandirTodo: () => this.setState({ cerrados: [] }),
      colapsarTodo: () => {
        const r = this.parse(this.state.xml);
        if (r.error) return;
        this.setState({ cerrados: this.todasLasRutas(r.doc.documentElement, "root", []), selRuta: "root" });
      },
      consultas,
      consultaCodigo: defs[qi].code,
      consultaResultado: res.map((t, i) => ({ key: i, texto: t })),

      fId: this.state.fId, fNombre: this.state.fNombre, fPrecio: this.state.fPrecio, fStock: this.state.fStock,
      setId: e => this.setState({ fId: e.target.value }),
      setNombre: e => this.setState({ fNombre: e.target.value }),
      setPrecio: e => this.setState({ fPrecio: e.target.value }),
      setStock: e => this.setState({ fStock: e.target.value }),
      agregarProducto: operaciones[0].run,
      codigoConstruir: `var producto = new XElement("producto",\n    new XAttribute("id", "${this.state.fId}"),\n    new XElement("nombre", "${this.state.fNombre}"),\n    new XElement("precio", ${this.state.fPrecio}m),\n    new XElement("stock", ${this.state.fStock})\n);\n\ndoc.Root.Add(producto);\ndoc.Save("inventario.xml");`,
      xmlGenerado: nuevo.trim(),
      operaciones,

      archivos, abrirArchivo, filas, gridEstado, gridConteo, gridTotal,
      cancelarDialogo: () => this.setState({ salida: "> ShowDialog() == DialogResult.Cancel\n\n  El usuario cerró el diálogo: no toques el documento.", cargado: null, cargadoNombre: null }),
      salidaExplorador: this.state.salida,
      codigoAbrir: `using System.Windows.Forms;\nusing System.Xml.Linq;\n\nvar dlg = new OpenFileDialog\n{\n    Title  = "Seleccione un archivo XML",\n    Filter = "Archivos XML (*.xml)|*.xml|Todos (*.*)|*.*",\n    InitialDirectory = Environment.GetFolderPath(\n        Environment.SpecialFolder.MyDocuments)\n};\n\nif (dlg.ShowDialog() == DialogResult.OK)\n{\n    try\n    {\n        XDocument doc = XDocument.Load(dlg.FileName);\n\n        foreach (var p in doc.Descendants("producto"))\n            Console.WriteLine((string)p.Element("nombre"));\n    }\n    catch (XmlException ex)\n    {\n        MessageBox.Show($"XML inválido: {ex.Message}");\n    }\n}`
    };
  }
}
