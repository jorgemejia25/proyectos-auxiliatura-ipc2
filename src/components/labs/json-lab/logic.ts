// @ts-nocheck
/**
 * Interactive logic ported from the native JsonLab DC artifact.
 */

const BASE = `{
  "sucursal": "central",
  "productos": [
    {
      "id": "P-001",
      "categoria": "perifericos",
      "nombre": "Teclado mecánico",
      "precio": 250.00,
      "stock": 12,
      "activo": true
    },
    {
      "id": "P-002",
      "categoria": "perifericos",
      "nombre": "Mouse inalámbrico",
      "precio": 120.00,
      "stock": 0,
      "activo": true
    },
    {
      "id": "P-003",
      "categoria": "pantallas",
      "nombre": "Monitor 24 pulgadas",
      "precio": 1450.00,
      "stock": 5,
      "activo": false
    }
  ]
}`;

const TIPOS = {
  objeto: ["Object", "Una colección de pares clave/valor entre llaves. Las claves son únicas y siempre cadenas; el orden no es significativo.", 'JsonObject o = raiz.AsObject();\nvar p = new JsonObject { ["id"] = "P-9" };'],
  clave: ["Clave", "El nombre de la propiedad. Va entre comillas dobles, de forma obligatoria: sin comillas o con comilla simple el documento es inválido.", 'raiz["nombre"]\n[JsonPropertyName("nombre")]'],
  string: ["String", "Texto entre comillas dobles. Los saltos de línea y las comillas internas se escapan con barra invertida.", '(string)nodo["nombre"]\nnodo["nombre"].GetValue<string>()'],
  numero: ["Number", "Número nativo, entero o decimal, sin comillas. Usa punto decimal y no admite separador de miles ni NaN.", '(decimal)nodo["precio"]\nnodo["stock"].GetValue<int>()'],
  bool: ["Boolean", "Solo true o false, en minúscula y sin comillas. En XML esto sería el texto \"true\" y usted lo convertiría.", '(bool)nodo["activo"]'],
  nulo: ["Null", "Ausencia de valor, en minúscula. Distinto de una cadena vacía y distinto de que la clave no exista.", 'bool falta = nodo["x"] is null;\nint? v = (int?)nodo["stock"];'],
  arreglo: ["Array", "Lista ordenada entre corchetes. Sus elementos pueden ser de cualquier tipo, incluso mezclados o anidados.", 'foreach (var x in nodo["etiquetas"].AsArray())\n    Console.WriteLine((string)x);']
};

export class JsonLabLogic {
  state = {
    json: BASE,
    tipo: "objeto",
    cerrados: [],
    selRuta: "$",
    q: 0,
    fId: "P-004",
    fNombre: "Webcam HD",
    fPrecio: "380.00",
    fStock: "7",
    archivo: 0,
    salida: "// Esperando… selecciona un archivo y pulsa Abrir.",
    cargado: null,
    cargadoNombre: null
  };

  parse(txt) {
    try { return { val: JSON.parse(txt), error: null }; }
    catch (e) { return { val: null, error: e.message }; }
  }

  tipoDe(v) {
    if (v === null) return "null";
    if (Array.isArray(v)) return "array";
    return typeof v;
  }

  lit(v) {
    const t = this.tipoDe(v);
    if (t === "string") return { t: JSON.stringify(v), c: "#00863F" };
    if (t === "number") return { t: String(v), c: "#B5006B" };
    if (t === "boolean") return { t: String(v), c: "#C05600" };
    return { t: "null", c: "#7A8799" };
  }

  buildLines(valor, clave, depth, ruta, coma, out, nodos) {
    const P = "#8A97AD", K = "#0047FF", G = "#7A8799";
    const t = this.tipoDe(valor);
    const abierto = !this.state.cerrados.includes(ruta);
    const pre = clave === null ? [] : [{ t: JSON.stringify(clave), c: K, w: 700 }, { t: ": ", c: P, w: 400 }];
    const fin = coma ? [{ t: ",", c: P, w: 400 }] : [];
    const hijos = t === "object" ? Object.keys(valor) : (t === "array" ? valor : []);
    nodos.push({ ruta, clave, depth, tipo: t, valor, hijos: hijos.length });

    if (t !== "object" && t !== "array") {
      const l = this.lit(valor);
      out.push({ ruta, depth, plegable: false, abierto, segs: pre.concat([{ t: l.t, c: l.c, w: 400 }], fin), nota: "JsonValue · " + t });
      return out;
    }
    const ab = t === "array" ? "[" : "{";
    const ce = t === "array" ? "]" : "}";
    const etiqueta = t === "array" ? `JsonArray · ${hijos.length}` : `JsonObject · ${hijos.length}`;
    if (!hijos.length) {
      out.push({ ruta, depth, plegable: false, abierto, segs: pre.concat([{ t: ab + ce, c: P, w: 700 }], fin), nota: "vacío" });
      return out;
    }
    if (!abierto) {
      out.push({ ruta, depth, plegable: true, abierto: false, segs: pre.concat([{ t: ab, c: P, w: 700 }, { t: " … ", c: G, w: 800 }, { t: ce, c: P, w: 700 }], fin), nota: etiqueta });
      return out;
    }
    out.push({ ruta, depth, plegable: true, abierto: true, segs: pre.concat([{ t: ab, c: P, w: 700 }]), nota: etiqueta });
    if (t === "array") {
      valor.forEach((v, i) => this.buildLines(v, null, depth + 1, ruta + "[" + i + "]", i < valor.length - 1, out, nodos));
    } else {
      const ks = Object.keys(valor);
      ks.forEach((k, i) => this.buildLines(valor[k], k, depth + 1, ruta + '["' + k + '"]', i < ks.length - 1, out, nodos));
    }
    out.push({ ruta, depth, plegable: false, abierto, segs: [{ t: ce, c: P, w: 700 }].concat(fin), nota: "" });
    return out;
  }

  rutasPlegables(valor, ruta, out) {
    const t = this.tipoDe(valor);
    if (t === "object") {
      if (Object.keys(valor).length) out.push(ruta);
      Object.keys(valor).forEach(k => this.rutasPlegables(valor[k], ruta + '["' + k + '"]', out));
    } else if (t === "array") {
      if (valor.length) out.push(ruta);
      valor.forEach((v, i) => this.rutasPlegables(v, ruta + "[" + i + "]", out));
    }
    return out;
  }

  setJson(txt) { this.setState({ json: txt, selRuta: "$" }); }

  mutate(fn) {
    const { val, error } = this.parse(this.state.json);
    if (error) return;
    fn(val);
    this.setState({ json: JSON.stringify(val, null, 2), selRuta: "$" });
  }

  renderVals() {
    const { val, error } = this.parse(this.state.json);
    const ok = !error;
    const nodos = [];
    const lineasRaw = ok ? this.buildLines(val, null, 0, "$", false, [], nodos) : [];
    const selRuta = nodos.some(n => n.ruta === this.state.selRuta) ? this.state.selRuta : "$";
    const selNode = nodos.find(n => n.ruta === selRuta);

    const lineas = lineasRaw.map((l, i) => {
      const activo = l.ruta === selRuta;
      return {
        key: i,
        pad: l.depth * 22 + "px",
        guia: l.depth ? "#E0DBCC" : "transparent",
        icono: l.plegable ? (l.abierto ? "–" : "+") : "",
        cursorT: l.plegable ? "pointer" : "default",
        colorT: l.plegable ? "#0047FF" : "transparent",
        bg: activo ? "#C8F7FF" : "transparent",
        marca: activo ? "#35E0FF" : "transparent",
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

    let selNombre = "—", selCodigo = "Corrige el JSON para navegar el árbol.", selTipo = "—", selNivel = "—", selHijos = "0";
    if (selNode) {
      selNombre = selNode.clave === null ? (selNode.depth ? "(elemento)" : "$ raíz") : '"' + selNode.clave + '"';
      selTipo = selNode.tipo === "object" ? "JSONOBJECT" : selNode.tipo === "array" ? "JSONARRAY" : "JSONVALUE · " + selNode.tipo.toUpperCase();
      selNivel = String(selNode.depth);
      selHijos = String(selNode.hijos);
      const expr = selNode.ruta.replace("$", "raiz");
      const lns = [`var nodo = ${expr};`, ""];
      if (selNode.tipo === "object") {
        lns.push(`nodo.AsObject().Count   // ${selNode.hijos}`);
        Object.keys(selNode.valor).slice(0, 4).forEach(k => {
          const v = selNode.valor[k];
          if (v === null || typeof v !== "object") lns.push(`(${typeof v === "number" ? "decimal" : typeof v === "boolean" ? "bool" : "string"})nodo["${k}"]   // ${JSON.stringify(v)}`);
        });
      } else if (selNode.tipo === "array") {
        lns.push(`nodo.AsArray().Count   // ${selNode.hijos}`);
        lns.push(`foreach (var x in nodo.AsArray()) { … }`);
      } else {
        const cast = selNode.tipo === "number" ? "decimal" : selNode.tipo === "boolean" ? "bool" : "string";
        lns.push(`(${cast})nodo   // ${JSON.stringify(selNode.valor)}`);
        lns.push(`nodo.GetValue<${cast}>()`);
      }
      selCodigo = lns.join("\n");
    }

    const statNodos = nodos.length;
    const statHojas = nodos.filter(n => n.tipo !== "object" && n.tipo !== "array").length;
    const statProfundidad = nodos.reduce((a, n) => Math.max(a, n.depth), 0) + 1;

    const prods = ok && val && Array.isArray(val.productos) ? val.productos : [];
    const money = n => "Q " + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    const defs = [
      { label: "todos los nombres",
        code: 'var nombres = raiz["productos"].AsArray()\n    .Select(p => (string)p["nombre"]);',
        run: () => prods.map(p => p.nombre) },
      { label: "agotados",
        code: 'var agotados = raiz["productos"].AsArray()\n    .Where(p => (int)p["stock"] == 0)\n    .Select(p => (string)p["nombre"]);',
        run: () => prods.filter(p => Number(p.stock) === 0).map(p => p.nombre) },
      { label: "precio > 500",
        code: 'var caros = raiz["productos"].AsArray()\n    .Where(p => (decimal)p["precio"] > 500)\n    .Select(p => $"{(string)p["nombre"]} — Q{(decimal)p["precio"]}");',
        run: () => prods.filter(p => Number(p.precio) > 500).map(p => `${p.nombre} — Q${p.precio}`) },
      { label: "valor del inventario",
        code: 'decimal total = raiz["productos"].AsArray()\n    .Sum(p => (decimal)p["precio"] * (int)p["stock"]);',
        run: () => [money(prods.reduce((a, p) => a + Number(p.precio) * Number(p.stock), 0))] },
      { label: "agrupar por categoría",
        code: 'var porCat = raiz["productos"].AsArray()\n    .GroupBy(p => (string)p["categoria"])\n    .Select(g => $"{g.Key}: {g.Count()}");',
        run: () => {
          const m = {};
          prods.forEach(p => { const c = p.categoria || "(sin categoría)"; m[c] = (m[c] || 0) + 1; });
          return Object.keys(m).map(k => `${k}: ${m[k]}`);
        } },
      { label: "ordenar por precio",
        code: 'var orden = raiz["productos"].AsArray()\n    .OrderByDescending(p => (decimal)p["precio"])\n    .Select(p => (string)p["nombre"]);',
        run: () => prods.slice().sort((a, b) => Number(b.precio) - Number(a.precio)).map(p => p.nombre) }
    ];
    const qi = this.state.q;
    const consultas = defs.map((d, i) => ({
      key: i, label: d.label,
      bg: i === qi ? "#06142E" : "#FFF",
      fg: i === qi ? "#35E0FF" : "#06142E",
      pick: () => this.setState({ q: i })
    }));
    let res = [];
    try { res = ok ? defs[qi].run() : ["— JSON inválido —"]; } catch (e) { res = ["Error de conversión: " + e.message]; }
    if (!res.length) res = ["(sin resultados)"];

    const nuevoObj = { id: this.state.fId, nombre: this.state.fNombre, precio: Number(this.state.fPrecio) || 0, stock: Number(this.state.fStock) || 0 };

    const operaciones = [
      { key: 0, titulo: "Agregar el producto del formulario", codigo: 'raiz["productos"].AsArray().Add(nuevo);',
        run: () => this.mutate(v => { v.productos = v.productos || []; v.productos.push(nuevoObj); }) },
      { key: 1, titulo: "Bajar el stock de P-001 a 3", codigo: 'p["stock"] = 3;',
        run: () => this.mutate(v => { const p = (v.productos || []).find(x => x.id === "P-001"); if (p) p.stock = 3; }) },
      { key: 2, titulo: "Marcar todo como revisado", codigo: 'p["revisado"] = true;',
        run: () => this.mutate(v => (v.productos || []).forEach(p => { p.revisado = true; })) },
      { key: 3, titulo: "Eliminar los productos agotados", codigo: 'arreglo.RemoveAt(i);',
        run: () => this.mutate(v => { v.productos = (v.productos || []).filter(p => Number(p.stock) !== 0); }) },
      { key: 4, titulo: "Subir 10% todos los precios", codigo: 'p["precio"] = (decimal)p["precio"] * 1.1m;',
        run: () => this.mutate(v => (v.productos || []).forEach(p => { p.precio = Number((Number(p.precio) * 1.1).toFixed(2)); })) },
      { key: 5, titulo: "Restaurar el documento original", codigo: 'raiz = JsonNode.Parse(File.ReadAllText(ruta));',
        run: () => this.setJson(BASE) }
    ];

    const FILES = [
      { nombre: "inventario.json", ext: "JSON", peso: "1.0 KB", json: true },
      { nombre: "sucursales.json", ext: "JSON", peso: "0.4 KB", json: true,
        contenido: '{\n  "sucursales": [\n    { "codigo": "C-01", "ciudad": "Guatemala" },\n    { "codigo": "C-02", "ciudad": "Quetzaltenango" }\n  ]\n}' },
      { nombre: "config.json", ext: "JSON", peso: "0.2 KB", json: true,
        contenido: '{\n  "ruta": "C:\\\\datos",\n  "reintentos": 3,\n}' },
      { nombre: "notas.txt", ext: "TXT", peso: "0.1 KB", json: false },
      { nombre: "reporte.docx", ext: "DOCX", peso: "24 KB", json: false }
    ];
    const ai = this.state.archivo;
    const archivos = FILES.map((f, i) => ({
      key: i, nombre: f.nombre, ext: f.ext, peso: f.peso,
      fondo: i === ai ? "#0047FF" : "#FFF",
      texto: i === ai ? "#FFF" : (f.json ? "#06142E" : "#8A8A8A"),
      borde: i === ai ? "#0047FF" : "#B8C9E8",
      pick: () => this.setState({ archivo: i })
    }));

    const abrirArchivo = () => {
      const f = FILES[ai];
      const ruta = "C:\\Users\\dev\\Documents\\datos\\" + f.nombre;
      if (!f.json) {
        this.setState({ cargado: null, cargadoNombre: f.nombre, salida: `> abriendo ${f.nombre}\n\n✕ System.Text.Json.JsonException:\n  '/' is an invalid start of a value. LineNumber: 0.\n\n  La extensión no importa: ${f.nombre} no contiene JSON.` });
        return;
      }
      const texto = f.contenido || this.state.json;
      const r = this.parse(texto);
      if (r.error) {
        this.setState({ cargado: null, cargadoNombre: f.nombre, salida: `> JsonNode.Parse(File.ReadAllText("${ruta}"))\n\n✕ System.Text.Json.JsonException:\n  ${r.error}\n\n  JSON no admite coma después del último elemento.` });
        return;
      }
      const claves = r.val && typeof r.val === "object" && !Array.isArray(r.val) ? Object.keys(r.val) : [];
      const lineas2 = [`> JsonNode.Parse(File.ReadAllText("${ruta}"))`, "", `✓ raíz: ${Array.isArray(r.val) ? "JsonArray" : "JsonObject"}`, `  propiedades: ${claves.length}`, ""];
      claves.slice(0, 6).forEach(k => {
        const v = r.val[k];
        lineas2.push(`  raiz["${k}"]   ${Array.isArray(v) ? "JsonArray · " + v.length : v === null ? "null" : typeof v === "object" ? "JsonObject" : typeof v + " → " + JSON.stringify(v)}`);
      });
      this.setState({ salida: lineas2.join("\n"), cargado: texto, cargadoNombre: f.nombre });
    };

    let filas = [], gridEstado = "sin datos", gridConteo = "0 filas", gridTotal = money(0);
    if (this.state.cargado) {
      const r = this.parse(this.state.cargado);
      const items = !r.error && r.val && Array.isArray(r.val.productos) ? r.val.productos : [];
      filas = items.map((p, i) => {
        const precio = Number(p.precio) || 0, stock = Number(p.stock) || 0;
        return { key: i, id: p.id || "(sin id)", nombre: p.nombre || "(sin nombre)", precio: money(precio), stock: String(stock), subtotal: money(precio * stock), colorStock: stock === 0 ? "#FF3B30" : "#06142E", bg: i % 2 ? "#F5F8FF" : "#FFF" };
      });
      gridEstado = this.state.cargadoNombre + " cargado";
      gridConteo = filas.length + (filas.length === 1 ? " fila" : " filas");
      gridTotal = money(items.reduce((a, p) => a + (Number(p.precio) || 0) * (Number(p.stock) || 0), 0));
      if (!filas.length) filas = [{ key: 0, id: "—", nombre: 'El documento no tiene un arreglo "productos"', precio: "—", stock: "—", subtotal: "—", colorStock: "#6B6B6B", bg: "#FFF" }];
    } else {
      filas = [{ key: 0, id: "—", nombre: this.state.cargadoNombre ? "No se pudo cargar " + this.state.cargadoNombre : "Abre un archivo para poblar la tabla", precio: "—", stock: "—", subtotal: "—", colorStock: "#6B6B6B", bg: "#FFF" }];
      gridEstado = this.state.cargadoNombre ? "error de carga" : "sin datos";
    }

    const tipo = TIPOS[this.state.tipo];

    return {
      jsonActual: this.state.json,
      estadoIcono: ok ? "✓" : "✕",
      estadoTexto: ok ? "JSON válido" : "JsonException al deserializar",
      hayError: !ok,
      errorTexto: error ? "System.Text.Json.JsonException:\n  " + error : "",
      editarJson: e => this.setJson(e.target.value),
      restaurar: () => this.setJson(BASE),
      romperComa: () => this.setJson(BASE.replace('"stock": 12,', '"stock": 12,,')),
      romperClave: () => this.setJson(BASE.replace('"nombre":', "nombre:")),
      romperSimple: () => this.setJson(BASE.replace('"Teclado mecánico"', "'Teclado mecánico'")),

      tipoTitulo: tipo[0], tipoTexto: tipo[1], tipoCodigo: tipo[2],
      hObjeto: () => this.setState({ tipo: "objeto" }),
      hClave: () => this.setState({ tipo: "clave" }),
      hString: () => this.setState({ tipo: "string" }),
      hNumero: () => this.setState({ tipo: "numero" }),
      hBool: () => this.setState({ tipo: "bool" }),
      hNull: () => this.setState({ tipo: "nulo" }),
      hArray: () => this.setState({ tipo: "arreglo" }),

      lineas, selNombre, selCodigo, selTipo, selNivel, selHijos,
      statNodos, statHojas, statProfundidad,
      expandirTodo: () => this.setState({ cerrados: [] }),
      colapsarTodo: () => {
        const r = this.parse(this.state.json);
        if (r.error) return;
        this.setState({ cerrados: this.rutasPlegables(r.val, "$", []), selRuta: "$" });
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
      codigoConstruir: `var nuevo = new JsonObject\n{\n    ["id"] = "${this.state.fId}",\n    ["nombre"] = "${this.state.fNombre}",\n    ["precio"] = ${this.state.fPrecio}m,\n    ["stock"] = ${this.state.fStock}\n};\n\nraiz["productos"].AsArray().Add(nuevo);\nFile.WriteAllText("inventario.json",\n    raiz.ToJsonString(opciones));`,
      jsonGenerado: JSON.stringify(nuevoObj, null, 2),
      operaciones,

      archivos, abrirArchivo, filas, gridEstado, gridConteo, gridTotal,
      cancelarDialogo: () => this.setState({ salida: "> ShowDialog() == DialogResult.Cancel\n\n  El usuario cerró el diálogo: no toques el documento.", cargado: null, cargadoNombre: null }),
      salidaExplorador: this.state.salida
    };
  }
}
