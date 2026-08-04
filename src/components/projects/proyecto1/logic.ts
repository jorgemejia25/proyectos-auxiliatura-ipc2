// @ts-nocheck
/**
 * Interactive logic ported from the native Proyecto1 DC artifact.
 */

export class Proyecto1Logic {
  state = { cityId: 'alfa', mission: 'rescate', robotId: 'robot01', entryIdx: 0, targetIdx: 0,
            path: null, reveal: 0, result: null, log: [], notice: '', running: false,
            hover: null, xmlTab: 'estructura', codeTab: 'matriz' };

  CODE = {
    matriz: `// TDA propio: matriz de la ciudad como lista de listas enlazadas.
// Nada de arrays de .NET: solo nodos y memoria dinámica.

public class NodoCelda
{
    private char contenido;        // '*'  ' '  'E'  'C'  'R'
    private int fila, columna;
    private int capacidadMilitar;  // 0 si la celda no tiene unidad militar

    public NodoCelda Arriba, Abajo, Izquierda, Derecha;

    public NodoCelda(int fila, int columna, char contenido)
    {
        this.fila = fila;
        this.columna = columna;
        this.contenido = contenido;
        this.capacidadMilitar = 0;
    }

    public int Fila     { get { return fila; } }
    public int Columna  { get { return columna; } }
    public char Contenido { get { return contenido; } set { contenido = value; } }
    public int CapacidadMilitar { get { return capacidadMilitar; } set { capacidadMilitar = value; } }

    public bool EsIntransitable  { get { return contenido == '*'; } }
    public bool EsRecurso        { get { return contenido == 'R'; } }
    public bool EsCivil          { get { return contenido == 'C'; } }
    public bool EsEntrada        { get { return contenido == 'E'; } }
    public bool TieneMilitar     { get { return capacidadMilitar > 0; } }
}

public class MatrizCiudad
{
    private NodoCelda inicio;   // esquina (1,1)
    private int filas, columnas;
    private string nombre;

    public MatrizCiudad(string nombre, int filas, int columnas)
    {
        this.nombre = nombre;
        this.filas = filas;
        this.columnas = columnas;
    }

    public string Nombre  { get { return nombre; } }
    public int Filas      { get { return filas; } }
    public int Columnas   { get { return columnas; } }

    // Inserta enlazando con el vecino de arriba y el de la izquierda
    public void Insertar(int fila, int columna, char contenido)
    {
        NodoCelda nuevo = new NodoCelda(fila, columna, contenido);
        if (inicio == null) { inicio = nuevo; return; }

        NodoCelda izq = Obtener(fila, columna - 1);
        if (izq != null) { izq.Derecha = nuevo; nuevo.Izquierda = izq; }

        NodoCelda arr = Obtener(fila - 1, columna);
        if (arr != null) { arr.Abajo = nuevo; nuevo.Arriba = arr; }
    }

    public NodoCelda Obtener(int fila, int columna)
    {
        if (fila < 1 || columna < 1) return null;
        NodoCelda actual = inicio;
        for (int f = 1; f < fila && actual != null; f++) actual = actual.Abajo;
        for (int c = 1; c < columna && actual != null; c++) actual = actual.Derecha;
        return actual;
    }

    public void ColocarMilitar(int fila, int columna, int capacidad)
    {
        NodoCelda n = Obtener(fila, columna);
        if (n != null) n.CapacidadMilitar = capacidad;
    }
}`,
    listas: `// TDA propio genérico: lista simple enlazada.
// Se usa para ciudades, robots, entradas, objetivos y militares.

public class Nodo<T>
{
    private T dato;
    public Nodo<T> Siguiente;
    public Nodo(T dato) { this.dato = dato; }
    public T Dato { get { return dato; } set { dato = value; } }
}

public class ListaSimple<T>
{
    private Nodo<T> primero;
    private int cantidad;

    public int Cantidad { get { return cantidad; } }
    public Nodo<T> Primero { get { return primero; } }

    public void Insertar(T dato)
    {
        Nodo<T> nuevo = new Nodo<T>(dato);
        if (primero == null) { primero = nuevo; }
        else
        {
            Nodo<T> actual = primero;
            while (actual.Siguiente != null) actual = actual.Siguiente;
            actual.Siguiente = nuevo;
        }
        cantidad++;
    }

    public T ObtenerEn(int indice)
    {
        Nodo<T> actual = primero;
        for (int i = 0; i < indice && actual != null; i++) actual = actual.Siguiente;
        return actual == null ? default(T) : actual.Dato;
    }
}

// Pila: reconstruir el camino al regresar del backtracking
public class Pila<T>
{
    private Nodo<T> tope;
    private int cantidad;
    public int Cantidad { get { return cantidad; } }
    public bool EstaVacia { get { return tope == null; } }

    public void Apilar(T dato)
    {
        Nodo<T> nuevo = new Nodo<T>(dato);
        nuevo.Siguiente = tope;
        tope = nuevo;
        cantidad++;
    }

    public T Desapilar()
    {
        if (tope == null) return default(T);
        T dato = tope.Dato;
        tope = tope.Siguiente;
        cantidad--;
        return dato;
    }
}

// Cola: recorrido por niveles (BFS) cuando se busca la ruta más corta
public class Cola<T>
{
    private Nodo<T> frente, final;
    public bool EstaVacia { get { return frente == null; } }

    public void Encolar(T dato)
    {
        Nodo<T> nuevo = new Nodo<T>(dato);
        if (final == null) { frente = final = nuevo; }
        else { final.Siguiente = nuevo; final = nuevo; }
    }

    public T Desencolar()
    {
        if (frente == null) return default(T);
        T dato = frente.Dato;
        frente = frente.Siguiente;
        if (frente == null) final = null;
        return dato;
    }
}`,
    robots: `// Herencia y polimorfismo: la regla de tránsito cambia por tipo de robot.

public abstract class Robot
{
    private string nombre;
    private string tipo;

    protected Robot(string nombre, string tipo)
    {
        this.nombre = nombre;
        this.tipo = tipo;
    }

    public string Nombre { get { return nombre; } }
    public string Tipo   { get { return tipo; } }

    // ¿Puede pasar por esta celda con su estado actual?
    public abstract bool PuedeTransitar(NodoCelda celda);

    // Efecto de entrar a la celda (combate, gasto de capacidad)
    public abstract void Ingresar(NodoCelda celda);

    public abstract Robot Clonar();   // el backtracking prueba y descarta estados
}

public class ChapinRescue : Robot
{
    public ChapinRescue(string nombre) : base(nombre, "ChapinRescue") { }

    // Sin capacidad de combate: descarta toda celda con unidad militar
    public override bool PuedeTransitar(NodoCelda celda)
    {
        if (celda == null || celda.EsIntransitable) return false;
        if (celda.EsRecurso) return false;
        return !celda.TieneMilitar;
    }

    public override void Ingresar(NodoCelda celda) { }

    public override Robot Clonar() { return new ChapinRescue(Nombre); }
}

public class ChapinFighter : Robot
{
    private int capacidad;

    public ChapinFighter(string nombre, int capacidad) : base(nombre, "ChapinFighter")
    {
        this.capacidad = capacidad;
    }

    public int Capacidad { get { return capacidad; } set { capacidad = value; } }

    // Vence a la unidad militar solo si su capacidad es MAYOR
    public override bool PuedeTransitar(NodoCelda celda)
    {
        if (celda == null || celda.EsIntransitable) return false;
        if (celda.TieneMilitar) return capacidad > celda.CapacidadMilitar;
        return true;
    }

    public override void Ingresar(NodoCelda celda)
    {
        if (celda.TieneMilitar) capacidad -= celda.CapacidadMilitar;
    }

    public override Robot Clonar() { return new ChapinFighter(Nombre, capacidad); }
}`,
    ruta: `// Búsqueda de una ruta válida: backtracking sobre la matriz enlazada.
// Basta con encontrar UNA ruta que cumpla la misión.

public class BuscadorRuta
{
    private MatrizCiudad ciudad;
    private bool[,] visitado;
    private Pila<NodoCelda> camino = new Pila<NodoCelda>();

    public BuscadorRuta(MatrizCiudad ciudad)
    {
        this.ciudad = ciudad;
        visitado = new bool[ciudad.Filas + 2, ciudad.Columnas + 2];
    }

    public ListaSimple<NodoCelda> Buscar(NodoCelda entrada, NodoCelda objetivo, Robot robot)
    {
        if (Explorar(entrada, objetivo, robot)) return Reconstruir();
        return null;   // ninguna ruta posible -> "Misión Imposible"
    }

    private bool Explorar(NodoCelda actual, NodoCelda objetivo, Robot robot)
    {
        if (actual == null) return false;
        if (visitado[actual.Fila, actual.Columna]) return false;

        // El recurso es objetivo pero no se transita: se llega a una celda vecina
        bool esObjetivo = actual.Fila == objetivo.Fila && actual.Columna == objetivo.Columna;
        if (!esObjetivo && !robot.PuedeTransitar(actual)) return false;

        visitado[actual.Fila, actual.Columna] = true;
        Robot estado = robot.Clonar();
        estado.Ingresar(actual);
        camino.Apilar(actual);

        if (esObjetivo) return true;

        if (Explorar(actual.Arriba, objetivo, estado)) return true;
        if (Explorar(actual.Derecha, objetivo, estado)) return true;
        if (Explorar(actual.Abajo, objetivo, estado)) return true;
        if (Explorar(actual.Izquierda, objetivo, estado)) return true;

        camino.Desapilar();                                  // retrocede
        visitado[actual.Fila, actual.Columna] = false;
        return false;
    }

    private ListaSimple<NodoCelda> Reconstruir()
    {
        Pila<NodoCelda> invertida = new Pila<NodoCelda>();
        while (!camino.EstaVacia) invertida.Apilar(camino.Desapilar());

        ListaSimple<NodoCelda> ruta = new ListaSimple<NodoCelda>();
        while (!invertida.EstaVacia) ruta.Insertar(invertida.Desapilar());
        return ruta;
    }
}`,
    xml: `// Carga del XML. Si el nombre de la ciudad o del robot ya existe,
// los datos se ACTUALIZAN en el sistema de control.

public class LectorConfiguracion
{
    private SistemaControl sistema;

    public LectorConfiguracion(SistemaControl sistema) { this.sistema = sistema; }

    public void Cargar(string ruta)
    {
        XmlDocument doc = new XmlDocument();
        doc.Load(ruta);

        foreach (XmlNode nodoCiudad in doc.SelectNodes("//ciudad"))
        {
            XmlNode nombre = nodoCiudad.SelectSingleNode("nombre");
            string nom = nombre.InnerText.Trim();
            int filas = int.Parse(nombre.Attributes["filas"].Value);
            int cols  = int.Parse(nombre.Attributes["columnas"].Value);

            MatrizCiudad ciudad = new MatrizCiudad(nom, filas, cols);

            int f = 1;
            foreach (XmlNode fila in nodoCiudad.SelectNodes("filas/fila"))
            {
                string valor = fila.InnerText.Replace("\\"", "");
                for (int c = 1; c <= cols; c++)
                    ciudad.Insertar(f, c, c <= valor.Length ? valor[c - 1] : ' ');
                f++;
            }

            foreach (XmlNode um in nodoCiudad.SelectNodes("unidadesMilitares/unidadMilitar"))
            {
                int uf = int.Parse(um.Attributes["fila"].Value);
                int uc = int.Parse(um.Attributes["columna"].Value);
                ciudad.ColocarMilitar(uf, uc, int.Parse(um.InnerText.Trim()));
            }

            sistema.AgregarOActualizarCiudad(ciudad);
        }

        foreach (XmlNode r in doc.SelectNodes("//robot"))
        {
            string nombre = r.Attributes["nombre"].Value;
            string tipo   = r.Attributes["tipo"].Value;

            Robot robot = tipo == "ChapinFighter"
                ? new ChapinFighter(nombre, int.Parse(r.Attributes["capacidad"].Value))
                : (Robot)new ChapinRescue(nombre);

            sistema.AgregarOActualizarRobot(robot);
        }
    }
}`,
    dot: `// Reporte de la ruta en Graphviz. Un nodo por celda visitada,
// aristas en el orden del recorrido.

public class ReporteRuta
{
    public void Generar(ListaSimple<NodoCelda> ruta, string archivo)
    {
        StringBuilder sb = new StringBuilder();
        sb.AppendLine("digraph Ruta {");
        sb.AppendLine("  rankdir=LR;");
        sb.AppendLine("  node [shape=box style=filled fontname=\\"Courier\\"];");

        Nodo<NodoCelda> actual = ruta.Primero;
        int i = 0;
        while (actual != null)
        {
            NodoCelda c = actual.Dato;
            string id = "n" + i;
            string color = c.EsEntrada ? "\\"#C6FF3D\\""
                         : c.TieneMilitar ? "\\"#FF6FD8\\""
                         : c.EsCivil || c.EsRecurso ? "\\"#7C3AED\\""
                         : "white";

            sb.AppendLine("  " + id + " [label=\\"" + c.Fila + "," + c.Columna +
                          "\\" fillcolor=" + color + "];");

            if (actual.Siguiente != null)
                sb.AppendLine("  " + id + " -> n" + (i + 1) + ";");

            actual = actual.Siguiente;
            i++;
        }

        sb.AppendLine("}");
        File.WriteAllText(archivo, sb.ToString());

        // dot -Tpng ruta.dot -o ruta.png
        Process.Start("dot", "-Tpng " + archivo + " -o " + archivo + ".png");
    }
}`,
    menu: `class Program
{
    static SistemaControl sistema = new SistemaControl();

    static void Main()
    {
        bool salir = false;
        while (!salir)
        {
            Console.WriteLine("=== CHAPIN WARRIORS · SISTEMA DE CONTROL ===");
            Console.WriteLine("1. Cargar archivo de configuración (XML)");
            Console.WriteLine("2. Ver ciudades y robots cargados");
            Console.WriteLine("3. Planificar misión de rescate");
            Console.WriteLine("4. Planificar misión de extracción de recurso");
            Console.WriteLine("5. Generar reporte Graphviz de la última ruta");
            Console.WriteLine("6. Salir");
            Console.Write("Opción: ");

            switch (Console.ReadLine())
            {
                case "1": CargarArchivo(); break;
                case "2": sistema.Listar(); break;
                case "3": PlanificarMision("rescate"); break;
                case "4": PlanificarMision("extraccion"); break;
                case "5": sistema.GenerarReporte(); break;
                case "6": salir = true; break;
                default: Console.WriteLine("Opción inválida."); break;
            }
        }
    }

    static void PlanificarMision(string tipo)
    {
        MatrizCiudad ciudad = sistema.SeleccionarCiudad();
        Robot robot = sistema.SeleccionarRobot(tipo);
        NodoCelda entrada = sistema.SeleccionarEntrada(ciudad);
        NodoCelda objetivo = sistema.SeleccionarObjetivo(ciudad, tipo);

        ListaSimple<NodoCelda> ruta =
            new BuscadorRuta(ciudad).Buscar(entrada, objetivo, robot);

        if (ruta == null) { Console.WriteLine("Misión Imposible"); return; }

        sistema.ImprimirRuta(ruta, tipo, objetivo);
    }
}`
  };

  CODE_CAPTION = {
    matriz: 'La malla del dron vive en nodos enlazados en cuatro direcciones: así el recorrido solo consulta vecinos, sin índices de arreglo.',
    listas: 'Lista, pila y cola genéricas propias. La pila sostiene el camino del backtracking; la cola sirve si se busca la ruta más corta con BFS.',
    robots: 'PuedeTransitar es el método polimórfico: ChapinRescue rechaza toda celda con militar, ChapinFighter compara capacidades y resta al vencer.',
    ruta: 'Backtracking con clonado del estado del robot: cada rama prueba con su propia capacidad de combate y la restaura al retroceder.',
    xml: 'Un solo lector para todos los archivos. Nombres repetidos de ciudad o robot actualizan el dato existente en lugar de duplicarlo.',
    dot: 'La ruta se escribe como digraph y se compila con dot. Colores para entrada, combate y objetivo.',
    menu: 'El menú se mantiene en ejecución hasta que el usuario elija salir.'
  };

  robots = [
    { id: 'robot01', name: 'robot01', type: 'ChapinRescue' },
    { id: 'robot03', name: 'robot03', type: 'ChapinRescue' },
    { id: 'robot02', name: 'robot02', type: 'ChapinFighter', cap: 100 },
    { id: 'robot04', name: 'robot04', type: 'ChapinFighter', cap: 30 }
  ];

  componentWillUnmount() { clearInterval(this._t); }

  cities() {
    if (this._cities) return this._cities;
    const alfa = (() => {
      const R = 15, C = 20, oc = [2, 5, 8, 11, 14, 17, 19], or = [2, 8, 14], g = [];
      for (let r = 1; r <= R; r++) { const row = [];
        for (let c = 1; c <= C; c++) {
          let open = false;
          if (r >= 2 && r <= 14 && c >= 2 && c <= 19) open = or.indexOf(r) >= 0 || oc.indexOf(c) >= 0;
          row.push(open ? ' ' : '*');
        } g.push(row); }
      const put = (r, c, ch) => { g[r - 1][c - 1] = ch; };
      put(2, 2, 'E'); put(14, 11, 'E');
      put(14, 19, 'C'); put(8, 5, 'C');
      put(7, 19, 'R'); put(11, 14, 'R');
      return { id: 'alfa', name: 'CIUDAD ALFA', rows: R, cols: C, grid: g,
               mil: [{ r: 8, c: 8, cap: 20 }, { r: 11, c: 19, cap: 20 }, { r: 5, c: 11, cap: 30 }, { r: 2, c: 17, cap: 40 }] };
    })();
    const betaRows = [
      '************',
      '*E    *    *',
      '* *** * ** *',
      '* *C* * R* *',
      '* * * * ** *',
      '* * * * *  *',
      '*         E*',
      '************'
    ];
    const beta = { id: 'beta', name: 'CIUDAD BETA', rows: 8, cols: 12,
      grid: betaRows.map(s => s.split('')),
      mil: [{ r: 5, c: 4, cap: 90 }, { r: 4, c: 8, cap: 90 }] };
    this._cities = [alfa, beta];
    return this._cities;
  }

  city() { return this.cities().find(c => c.id === this.state.cityId) || this.cities()[0]; }
  cellsOf(city, ch) { const out = [];
    for (let r = 1; r <= city.rows; r++) for (let c = 1; c <= city.cols; c++) if (city.grid[r - 1][c - 1] === ch) out.push({ r: r, c: c });
    return out; }
  robotsFor(m) { return this.robots.filter(r => r.type === (m === 'rescate' ? 'ChapinRescue' : 'ChapinFighter')); }
  robot() { return this.robots.find(r => r.id === this.state.robotId) || this.robotsFor(this.state.mission)[0]; }
  milMap(city) { const m = {}; city.mil.forEach(u => { m[u.r + ',' + u.c] = u.cap; }); return m; }

  findPath(city, start, goal, robot) {
    const K = (r, c) => r + ',' + c, mm = this.milMap(city);
    const fighter = robot.type === 'ChapinFighter';
    const cost = {}, prev = {}, capAt = {}, sK = K(start.r, start.c);
    cost[sK] = 0; capAt[sK] = fighter ? robot.cap : 0;
    const pq = [{ k: sK, r: start.r, c: start.c, cost: 0 }];
    while (pq.length) {
      pq.sort((a, b) => a.cost - b.cost);
      const cur = pq.shift();
      if (cur.cost > cost[cur.k]) continue;
      if (cur.r === goal.r && cur.c === goal.c) break;
      const dirs = [[-1, 0], [1, 0], [0, -1], [0, 1]];
      for (let i = 0; i < 4; i++) {
        const nr = cur.r + dirs[i][0], nc = cur.c + dirs[i][1];
        if (nr < 1 || nc < 1 || nr > city.rows || nc > city.cols) continue;
        const ch = city.grid[nr - 1][nc - 1], nk = K(nr, nc), isGoal = nr === goal.r && nc === goal.c;
        if (ch === '*') continue;
        if (ch === 'R' && !isGoal) continue;
        let ncap = capAt[cur.k], extra = 0;
        const mc = mm[nk];
        if (mc !== undefined) {
          if (!fighter) continue;
          if (ncap <= mc) continue;
          ncap = ncap - mc; extra = 1000;
        }
        const nCost = cur.cost + 1 + extra;
        if (cost[nk] === undefined || nCost < cost[nk]) {
          cost[nk] = nCost; prev[nk] = cur.k; capAt[nk] = ncap;
          pq.push({ k: nk, r: nr, c: nc, cost: nCost });
        }
      }
    }
    const gK = K(goal.r, goal.c);
    if (cost[gK] === undefined) return null;
    const path = []; let k = gK;
    while (k) { const p = k.split(',');
      path.unshift({ r: parseInt(p[0], 10), c: parseInt(p[1], 10) });
      k = prev[k]; }
    return path;
  }

  run = () => {
    clearInterval(this._t);
    const city = this.city(), st = this.state, robot = this.robot();
    const robotList = this.robotsFor(st.mission);
    if (!robotList.length) { this.setState({ notice: 'No hay robots de ese tipo: la misión no puede llevarse a cabo.', path: null, result: null, log: [], reveal: 0 }); return; }
    const targets = this.cellsOf(city, st.mission === 'rescate' ? 'C' : 'R');
    if (!targets.length) { this.setState({ notice: 'Esta ciudad no tiene objetivos de ese tipo.', path: null, result: null, log: [], reveal: 0 }); return; }
    const entries = this.cellsOf(city, 'E');
    const start = entries[Math.min(st.entryIdx, entries.length - 1)];
    const goal = targets[Math.min(st.targetIdx, targets.length - 1)];
    const path = this.findPath(city, start, goal, robot);
    if (!path) {
      this.setState({ path: null, reveal: 0, notice: '',
        log: [{ text: '> ruta descartada: no existe camino válido', kind: 'bad' }],
        result: { impossible: true, robot: robot, goal: goal, mission: st.mission } });
      return;
    }
    const mm = this.milMap(city);
    let cap = robot.type === 'ChapinFighter' ? robot.cap : null;
    const log = [], fights = [];
    path.forEach((p, i) => {
      const mc = mm[p.r + ',' + p.c];
      if (mc !== undefined) {
        const before = cap; cap = cap - mc; fights.push({ r: p.r, c: p.c, cap: mc });
        log.push({ text: 'paso ' + (i + 1) + ' → (' + p.r + ',' + p.c + ') COMBATE militar ' + mc + ' · capacidad ' + before + ' → ' + cap, kind: 'fight' });
      } else if (i === 0) {
        log.push({ text: 'paso 1 → (' + p.r + ',' + p.c + ') ingreso por punto de entrada', kind: 'ok' });
      } else if (i === path.length - 1) {
        log.push({ text: 'paso ' + (i + 1) + ' → (' + p.r + ',' + p.c + ') objetivo alcanzado', kind: 'ok' });
      } else {
        log.push({ text: 'paso ' + (i + 1) + ' → (' + p.r + ',' + p.c + ')', kind: 'plain' });
      }
    });
    this.setState({ path: path, reveal: 0, log: log, notice: '', running: true,
      result: { impossible: false, robot: robot, goal: goal, mission: st.mission, start: start,
                steps: path.length, fights: fights, capIni: robot.cap, capFin: cap, city: city.name } });
    const ms = this.props.stepMs ?? 110;
    this._t = setInterval(() => {
      this.setState(s => {
        const n = s.reveal + 1;
        if (!s.path || n >= s.path.length) { clearInterval(this._t); return { reveal: s.path ? s.path.length : 0, running: false }; }
        return { reveal: n };
      });
    }, ms);
  };

  preset = (kind) => {
    clearInterval(this._t);
    const s = kind === 'ok' ? { cityId: 'alfa', mission: 'rescate', robotId: 'robot01', entryIdx: 0, targetIdx: 1 }
      : kind === 'fight' ? { cityId: 'alfa', mission: 'extraccion', robotId: 'robot02', entryIdx: 0, targetIdx: 0 }
      : { cityId: 'beta', mission: 'rescate', robotId: 'robot01', entryIdx: 0, targetIdx: 0 };
    this.setState(Object.assign({ path: null, reveal: 0, result: null, log: [], notice: '', running: false }, s), this.run);
  };

  reset = () => { clearInterval(this._t); this.setState({ path: null, reveal: 0, result: null, log: [], notice: '', running: false }); };

  setMission = (m) => { const r = this.robotsFor(m)[0];
    this.reset(); this.setState({ mission: m, robotId: r ? r.id : '', targetIdx: 0 }); };

  dot(res, path) {
    if (!res || res.impossible || !path) return '';
    const mm = this.milMap(this.city());
    const L = ['digraph mision {', '  rankdir=LR;', '  node [shape=box style=filled fontname="Courier" fontsize=10];'];
    path.forEach((p, i) => {
      const id = '"' + p.r + ',' + p.c + '"';
      let fill = '"#EDE4FF"';
      if (i === 0) fill = '"#C6FF3D"';
      else if (i === path.length - 1) fill = res.mission === 'rescate' ? '"#FFFFFF"' : '"#FF6FD8"';
      else if (mm[p.r + ',' + p.c] !== undefined) fill = '"#3B0764" fontcolor="#C6FF3D"';
      L.push('  ' + id + ' [fillcolor=' + fill + '];');
    });
    for (let i = 0; i < path.length - 1; i++)
      L.push('  "' + path[i].r + ',' + path[i].c + '" -> "' + path[i + 1].r + ',' + path[i + 1].c + '";');
    L.push('}');
    return L.join('\n');
  }

  cityXml(city, robots) {
    const L = ['<?xml version="1.0"?>', '<configuracion>', '  <listaCiudades>', '    <ciudad>',
      '      <nombre filas="' + city.rows + '" columnas="' + city.cols + '">' + city.name.replace('CIUDAD ', 'ciudad') + '</nombre>'];
    for (let r = 1; r <= city.rows; r++)
      L.push('      <fila numero="' + r + '">"' + city.grid[r - 1].join('') + '"</fila>');
    city.mil.forEach(u => L.push('      <unidadMilitar fila="' + u.r + '" columna="' + u.c + '">' + u.cap + '</unidadMilitar>'));
    L.push('    </ciudad>', '  </listaCiudades>', '  <robots>');
    robots.forEach(r => {
      const cap = r.type === 'ChapinFighter' ? ' capacidad="' + r.cap + '"' : '';
      L.push('    <robot>', '      <nombre tipo="' + r.type + '"' + cap + '>' + r.name + '</nombre>', '    </robot>');
    });
    L.push('  </robots>', '</configuracion>');
    return L.join('\n');
  }

  estructuraXml() {
    return ['<?xml version="1.0"?>', '<configuracion>', '  <listaCiudades>', '    <ciudad>',
      '      <nombre filas="valorEntero" columnas="valorEntero">valorAlfanumerico</nombre>',
      '      <fila numero="valorEntero">"********************"</fila>',
      '      <fila numero="valorEntero">"***  **        *    "</fila>',
      '      <fila numero="valorEntero">"*** *****E*****C****"</fila>',
      '      <fila numero="valorEntero">"*** ***** ***** ***R"</fila>',
      '      ...',
      '      <unidadMilitar fila="valorEntero" columna="valorEntero">valorEntero</unidadMilitar>',
      '      ...', '    </ciudad>', '    ...', '  </listaCiudades>', '  <robots>', '    <robot>',
      '      <nombre tipo="ChapinFighter" capacidad="valorEntero">valorAlfanumerico</nombre>',
      '    </robot>', '  </robots>', '</configuracion>'].join('\n');
  }

  tabStyle(active) {
    return { padding: '9px 12px', border: '4px solid #120720', cursor: 'pointer', fontSize: '12px', fontWeight: 700,
      fontFamily: "'IBM Plex Mono',monospace",
      background: active ? '#C6FF3D' : '#3B0764', color: active ? '#120720' : '#EDE4FF',
      boxShadow: active ? 'none' : '4px 4px 0 #120720', transform: active ? 'translate(4px,4px)' : 'none' };
  }

  renderVals() {
    const accent = this.props.accent ?? '#7C3AED';
    const st = this.state, city = this.city();
    const mm = this.milMap(city);
    const entries = this.cellsOf(city, 'E');
    const targets = this.cellsOf(city, st.mission === 'rescate' ? 'C' : 'R');
    const path = st.path, revealed = {}, order = {};
    if (path) for (let i = 0; i <= Math.min(st.reveal, path.length - 1); i++) { revealed[path[i].r + ',' + path[i].c] = true; order[path[i].r + ',' + path[i].c] = i; }
    const headKey = path ? (path[Math.min(st.reveal, path.length - 1)].r + ',' + path[Math.min(st.reveal, path.length - 1)].c) : null;
    const selEntry = entries[Math.min(st.entryIdx, Math.max(0, entries.length - 1))];
    const selTarget = targets[Math.min(st.targetIdx, Math.max(0, targets.length - 1))];

    const arrows = {};
    if (path) for (let i = 0; i < path.length - 1; i++) {
      const a = path[i], b = path[i + 1];
      arrows[a.r + ',' + a.c] = b.r > a.r ? '↓' : b.r < a.r ? '↑' : b.c > a.c ? '→' : '←';
    }
    const hv = st.hover;
    const cs = city.cols > 16 ? 28 : 38;
    const base = { flex: '0 0 auto', width: cs + 'px', height: cs + 'px', display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '11px', lineHeight: 1, fontWeight: 700, fontFamily: "'IBM Plex Mono',monospace", boxSizing: 'border-box',
      transition: 'background .12s linear, filter .12s linear' };

    const gridRows = [];
    for (let r = 1; r <= city.rows; r++) {
      const cells = [];
      for (let c = 1; c <= city.cols; c++) {
        const ch = city.grid[r - 1][c - 1], k = r + ',' + c, mc = mm[k];
        const s = Object.assign({}, base);
        let label = '', title = 'fila ' + r + ', columna ' + c;
        if (ch === '*') { s.background = '#241338'; }
        else if (ch === 'E') { s.background = '#C6FF3D'; s.color = '#120720'; s.outline = '2px solid #120720'; s.outlineOffset = '-2px'; label = 'E'; s.cursor = 'pointer'; title += ' · punto de entrada'; }
        else if (ch === 'C') { s.background = '#FFFFFF'; s.color = accent; s.outline = '2px solid #120720'; s.outlineOffset = '-2px'; label = 'C'; s.cursor = 'pointer'; title += ' · unidad civil'; }
        else if (ch === 'R') { s.background = '#FF6FD8'; s.color = '#120720'; s.outline = '2px solid #120720'; s.outlineOffset = '-2px'; label = 'R'; s.cursor = 'pointer'; title += ' · recurso'; }
        else { s.background = '#EDE4FF'; }
        if (mc !== undefined) { s.background = '#3B0764'; s.color = '#C6FF3D'; s.outline = '2px solid #C6FF3D'; s.outlineOffset = '-2px'; label = String(mc); title += ' · unidad militar cap ' + mc; }
        if (selEntry && selEntry.r === r && selEntry.c === c) { s.boxShadow = 'inset 0 0 0 3px #120720'; }
        if (selTarget && selTarget.r === r && selTarget.c === c) { s.boxShadow = 'inset 0 0 0 3px #120720'; }
        if (revealed[k]) {
          s.background = mc !== undefined ? '#FF6FD8' : accent;
          s.color = '#fff'; s.animation = 'pop .18s ease-out both';
          if (arrows[k]) label = arrows[k];
          if (ch === 'E') { s.background = '#C6FF3D'; s.color = '#120720'; s.fontSize = '12px'; label = arrows[k] || 'E'; }
          if (mc !== undefined) { s.color = '#120720'; s.outline = '2px solid #120720'; s.outlineOffset = '-2px'; label = mc + (arrows[k] || ''); s.fontSize = '9px'; }
          if (ch === 'C' || ch === 'R') { s.background = ch === 'C' ? '#FFFFFF' : '#FF6FD8'; s.color = '#120720'; s.outline = '3px solid #C6FF3D'; s.outlineOffset = '-3px'; label = ch; }
        }
        if (headKey === k && st.path) { s.background = '#120720'; s.color = '#C6FF3D'; s.animation = 'glow .8s ease-in-out infinite'; label = '◉'; s.fontSize = '12px'; }
        if (hv && (hv.r === r || hv.c === c)) s.filter = 'brightness(1.35)';
        if (hv && hv.r === r && hv.c === c) { s.boxShadow = 'inset 0 0 0 3px #C6FF3D'; }
        cells.push({ key: k, style: s, label: label, title: title,
          onHover: () => this.setState({ hover: { r: r, c: c, ch: ch, mc: mc } }),
          onClick: (ch === 'E' || ch === 'C' || ch === 'R') ? () => {
            if (ch === 'E') { const i = entries.findIndex(e => e.r === r && e.c === c); this.reset(); this.setState({ entryIdx: i }); }
            else {
              const m = ch === 'C' ? 'rescate' : 'extraccion';
              const tl = this.cellsOf(city, ch), i = tl.findIndex(t => t.r === r && t.c === c);
              const rb = this.robotsFor(m)[0];
              this.reset(); this.setState({ mission: m, targetIdx: i, robotId: rb ? rb.id : '' });
            }
          } : undefined });
      }
      const rowHot = hv && hv.r === r;
      gridRows.push({ num: r, cells: cells, numStyle: { flex: '0 0 26px', display: 'grid', placeItems: 'center',
        fontSize: '10px', fontWeight: 700, background: rowHot ? '#C6FF3D' : 'transparent',
        color: rowHot ? '#120720' : '#7C3AED' } });
    }

    const colNums = [];
    for (let c = 1; c <= city.cols; c++) {
      const hot = hv && hv.c === c;
      colNums.push({ n: c, style: { flex: '0 0 auto', width: cs + 'px', textAlign: 'center', fontSize: '9px', fontWeight: 700,
        background: hot ? '#C6FF3D' : 'transparent', color: hot ? '#120720' : '#7C3AED' } });
    }
    const typeName = (ch, mc) => mc !== undefined ? 'unidad militar · capacidad ' + mc
      : ch === '*' ? 'intransitable' : ch === 'E' ? 'punto de entrada' : ch === 'C' ? 'unidad civil'
      : ch === 'R' ? 'recurso' : 'camino';

    const btn = (active, bg) => ({ flex: '1 1 0', padding: '11px 8px', border: '4px solid #120720', cursor: 'pointer',
      fontSize: '12px', fontWeight: 700, letterSpacing: '.5px',
      background: active ? bg : '#fff', color: active ? '#fff' : '#120720',
      boxShadow: active ? 'inset 0 0 0 2px #fff' : '4px 4px 0 #120720',
      transform: active ? 'translate(2px,2px)' : 'none' });

    const res = st.result;
    const lines = [];
    if (res && !res.impossible) {
      lines.push({ k: 'Tipo de misión', v: res.mission === 'rescate' ? 'rescate' : 'extracción de recursos' });
      lines.push({ k: res.mission === 'rescate' ? 'Unidad civil rescatada' : 'Recurso extraído', v: res.goal.r + ',' + res.goal.c });
      lines.push({ k: 'Punto de entrada', v: res.start.r + ',' + res.start.c });
      lines.push({ k: 'Robot utilizado', v: res.robot.name + ' (' + res.robot.type + ')' });
      if (res.robot.type === 'ChapinFighter') {
        lines.push({ k: 'Capacidad de combate', v: 'inicial ' + res.capIni + ' → final ' + res.capFin });
        lines.push({ k: 'Militares vencidas', v: res.fights.length ? res.fights.map(f => '(' + f.r + ',' + f.c + ') cap ' + f.cap).join('  ·  ') : 'ninguna' });
      }
      lines.push({ k: 'Celdas del camino', v: String(res.steps) });
      lines.push({ k: 'Ciudad', v: res.city });
    }

    const resultStyle = res && res.impossible
      ? { background: '#120720', color: '#FF6FD8', border: '5px solid #FF6FD8', boxShadow: '10px 10px 0 #120720', padding: '20px', animation: 'jit .35s steps(2,end) 3' }
      : { background: '#C6FF3D', color: '#120720', border: '5px solid #120720', boxShadow: '10px 10px 0 ' + accent, padding: '20px', animation: 'rise .3s ease-out both' };

    const logStyleOf = (kind) => ({
      padding: '4px 8px', borderLeft: '4px solid ' + (kind === 'fight' ? '#FF6FD8' : kind === 'bad' ? '#FF6FD8' : kind === 'ok' ? '#C6FF3D' : accent),
      background: kind === 'plain' ? 'rgba(237,228,255,.06)' : 'rgba(237,228,255,.13)',
      color: kind === 'fight' || kind === 'bad' ? '#FF6FD8' : '#EDE4FF', fontWeight: kind === 'plain' ? 400 : 700 });

    const shownLog = st.path ? st.log.slice(0, Math.min(st.reveal + 1, st.log.length)) : st.log;
    const dotText = this.dot(res, st.path);

    return {
      cityName: city.name,
      cityDims: city.rows + ' filas × ' + city.cols + ' columnas',
      cityId: st.cityId, mission: st.mission, robotId: st.robotId,
      entryIdx: String(st.entryIdx), targetIdx: String(st.targetIdx),
      cityOptions: this.cities().map(c => ({ id: c.id, name: c.name + (c.id === 'beta' ? ' · práctica misión imposible' : '') })),
      onPresetOk: () => this.preset('ok'), onPresetFight: () => this.preset('fight'), onPresetBad: () => this.preset('bad'),
      robotOptions: this.robotsFor(st.mission).map(r => ({ id: r.id, label: r.name + ' · ' + r.type + (r.cap ? ' · cap ' + r.cap : '') })),
      entryOptions: entries.map((e, i) => ({ idx: String(i), label: 'E en fila ' + e.r + ', columna ' + e.c })),
      targetOptions: targets.map((t, i) => ({ idx: String(i), label: (st.mission === 'rescate' ? 'Civil ' : 'Recurso ') + t.r + ',' + t.c })),
      targetLabel: st.mission === 'rescate' ? 'UNIDAD CIVIL A RESCATAR' : 'RECURSO A EXTRAER',
      gridRows: gridRows, colNums: colNums,
      milCount: city.mil.length + ' militares',
      stepBadge: st.path ? 'PASO ' + Math.min(st.reveal + 1, st.path.length) + ' / ' + st.path.length
        : (res && res.impossible ? 'SIN RUTA' : 'EN ESPERA'),
      stepBadgeStyle: { padding: '5px 9px', fontSize: '11px', fontWeight: 700, border: '2px solid #120720',
        background: st.path ? '#C6FF3D' : (res && res.impossible ? '#FF6FD8' : '#241338'),
        color: st.path || (res && res.impossible) ? '#120720' : '#7C3AED' },
      hoverText: hv ? 'fila ' + hv.r + ' · columna ' + hv.c + ' · ' + typeName(hv.ch, hv.mc)
        : 'pase el cursor sobre la matriz para inspeccionar celdas',
      progressStyle: { height: '100%', width: (st.path ? (Math.min(st.reveal + 1, st.path.length) / st.path.length) * 100 : 0) + '%',
        background: accent, transition: 'width .12s linear' },
      xmlText: st.xmlTab === 'estructura' ? this.estructuraXml()
        : st.xmlTab === 'alfa' ? this.cityXml(this.cities()[0], this.robots)
        : this.cityXml(this.cities()[1], [this.robots[1], this.robots[3]]),
      xmlCaption: st.xmlTab === 'estructura' ? 'Estructura genérica definida en el enunciado.'
        : st.xmlTab === 'alfa' ? 'Archivo real de CIUDAD ALFA (15×20) con sus 4 unidades militares y los 4 robots del simulador.'
        : 'Segundo archivo: agrega CIUDAD BETA y actualiza robot03 y robot04 — así se prueba la carga múltiple.',
      tabEstructura: this.tabStyle(st.xmlTab === 'estructura'),
      tabAlfa: this.tabStyle(st.xmlTab === 'alfa'),
      tabBeta: this.tabStyle(st.xmlTab === 'beta'),
      treeText: 'IPC2_Proy01_202602_' + (this.props.carnet ?? '#Carnet') + '/\n'
        + '├─ src/\n'
        + '│  ├─ Program.cs              menú en bucle\n'
        + '│  ├─ TDA/\n'
        + '│  │  ├─ Nodo.cs\n'
        + '│  │  ├─ ListaSimple.cs\n'
        + '│  │  ├─ Pila.cs\n'
        + '│  │  └─ Cola.cs\n'
        + '│  ├─ Modelo/\n'
        + '│  │  ├─ NodoCelda.cs\n'
        + '│  │  ├─ MatrizCiudad.cs\n'
        + '│  │  ├─ Robot.cs             abstracta\n'
        + '│  │  ├─ ChapinRescue.cs\n'
        + '│  │  └─ ChapinFighter.cs\n'
        + '│  ├─ Logica/\n'
        + '│  │  ├─ BuscadorRuta.cs      backtracking\n'
        + '│  │  └─ SistemaControl.cs\n'
        + '│  └─ IO/\n'
        + '│     ├─ LectorConfiguracion.cs\n'
        + '│     └─ ReporteRuta.cs       genera .dot\n'
        + '├─ entradas/\n'
        + '│  ├─ config_ciudadAlfa.xml\n'
        + '│  └─ config_ciudadBeta.xml\n'
        + '├─ reportes/\n'
        + '│  ├─ ruta.dot\n'
        + '│  └─ ruta.png\n'
        + '├─ docs/\n'
        + '│  └─ ensayo.pdf              4–7 páginas\n'
        + '├─ .gitignore\n'
        + '└─ README.md                  cómo compilar y correr',
      codeText: this.CODE[st.codeTab],
      codeCaption: this.CODE_CAPTION[st.codeTab],
      tabCodeMatriz: this.tabStyle(st.codeTab === 'matriz'),
      tabCodeListas: this.tabStyle(st.codeTab === 'listas'),
      tabCodeRobots: this.tabStyle(st.codeTab === 'robots'),
      tabCodeRuta: this.tabStyle(st.codeTab === 'ruta'),
      tabCodeXml: this.tabStyle(st.codeTab === 'xml'),
      tabCodeDot: this.tabStyle(st.codeTab === 'dot'),
      tabCodeMenu: this.tabStyle(st.codeTab === 'menu'),
      onCodeMatriz: () => this.setState({ codeTab: 'matriz' }),
      onCodeListas: () => this.setState({ codeTab: 'listas' }),
      onCodeRobots: () => this.setState({ codeTab: 'robots' }),
      onCodeRuta: () => this.setState({ codeTab: 'ruta' }),
      onCodeXml: () => this.setState({ codeTab: 'xml' }),
      onCodeDot: () => this.setState({ codeTab: 'dot' }),
      onCodeMenu: () => this.setState({ codeTab: 'menu' }),
      onTabEstructura: () => this.setState({ xmlTab: 'estructura' }),
      onTabAlfa: () => this.setState({ xmlTab: 'alfa' }),
      onTabBeta: () => this.setState({ xmlTab: 'beta' }),
      btnRescate: btn(st.mission === 'rescate', accent),
      btnExtraccion: btn(st.mission === 'extraccion', '#C026D3'),
      runStyle: { flex: '1 1 0', padding: '14px 10px', border: '4px solid #120720', background: st.running ? '#120720' : accent,
        color: st.running ? '#C6FF3D' : '#fff', boxShadow: '5px 5px 0 #120720', fontSize: '14px', fontWeight: 700,
        letterSpacing: '1px', cursor: 'pointer', fontFamily: "'Archivo Black',sans-serif", textTransform: 'uppercase' },
      runLabel: st.running ? 'EJECUTANDO…' : 'EJECUTAR MISIÓN',
      notice: st.notice,
      hasResult: !!res, hasLog: shownLog.length > 0,
      resultTitle: res ? (res.impossible ? 'MISIÓN IMPOSIBLE' : (res.mission === 'rescate' ? 'Ruta de rescate' : 'Ruta de extracción de recurso')) : '',
      resultLines: res && res.impossible
        ? [{ k: 'Motivo', v: res.mission === 'rescate' ? 'no existe camino seguro sin unidades militares' : 'capacidad de combate insuficiente o sin ruta' },
           { k: 'Objetivo', v: res.goal.r + ',' + res.goal.c }, { k: 'Robot', v: res.robot.name + ' (' + res.robot.type + ')' },
           { k: 'Ciudad', v: city.name }, { k: 'Nota', v: 'este objetivo está rodeado a propósito: use CIUDAD ALFA para ver rutas válidas' }]
        : lines,
      resultStyle: resultStyle,
      logLines: shownLog.map((l, i) => ({ text: l.text, style: logStyleOf(l.kind), key: i })),
      showDotPanel: (this.props.showDot ?? true) && !!dotText,
      dotText: dotText,
      repoName: 'IPC2_Proy01_202602_' + (this.props.carnet ?? '#Carnet'),
      onCity: (e) => { const v = e.target.value; this.reset(); this.setState({ cityId: v, entryIdx: 0, targetIdx: 0 }); },
      onRobot: (e) => { const v = e.target.value; this.reset(); this.setState({ robotId: v }); },
      onEntry: (e) => { const v = parseInt(e.target.value, 10); this.reset(); this.setState({ entryIdx: v }); },
      onTarget: (e) => { const v = parseInt(e.target.value, 10); this.reset(); this.setState({ targetIdx: v }); },
      onRescate: () => this.setMission('rescate'),
      onExtraccion: () => this.setMission('extraccion'),
      onRun: this.run, onReset: this.reset
    };
  }
}
