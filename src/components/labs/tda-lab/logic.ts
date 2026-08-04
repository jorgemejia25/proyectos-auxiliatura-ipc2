// @ts-nocheck
/**
 * Interactive state and step animations for the TDA laboratory.
 * Covers lista, pila, cola and matriz demos with timed walkthroughs.
 */

const LISTA_SEED = ["Ana", "Bruno", "Carla"]
const PILA_SEED = ["doc.html", "styles.css", "app.js"]
const COLA_SEED = ["ticket-01", "ticket-02", "ticket-03"]

/** Generic 4×4 linked-grid sample (letters are cell labels). */
const MATRIZ_SEED = [
  ["A", "B", "C", "D"],
  ["E", "F", "G", "H"],
  ["I", "J", "K", "L"],
  ["M", "N", "O", "P"],
]

/**
 * Builds interactive state, operations and animated demos for the TDA lab.
 */
export class TdaLabLogic {
  state = {
    lista: [...LISTA_SEED],
    listaInput: "Diego",
    listaPulse: -1,
    listaWalk: -1,
    listaBusy: false,

    pila: [...PILA_SEED],
    pilaInput: "main.ts",
    pilaPulse: "",
    pilaBusy: false,
    pilaLastOut: "",

    cola: [...COLA_SEED],
    colaInput: "ticket-04",
    colaPulse: "",
    colaBusy: false,
    colaLastOut: "",

    matriz: MATRIZ_SEED.map((row) => [...row]),
    selFila: 0,
    selCol: 0,
    walkFila: -1,
    walkCol: -1,
    matrizBusy: false,

    log: "> Laboratorio TDA listo. Explore las operaciones o ejecute una demostración.",
    lastOp: "",
  }

  /** Active animation timers cleared on unmount. */
  _timers = []

  /**
   * Clears pending animation timers.
   */
  clearTimers() {
    for (const id of this._timers) clearTimeout(id)
    this._timers = []
  }

  /**
   * Schedules a delayed callback and tracks the timer id.
   */
  later(ms, fn) {
    const id = setTimeout(() => {
      this._timers = this._timers.filter((t) => t !== id)
      fn()
    }, ms)
    this._timers.push(id)
  }

  /**
   * Lifecycle: no auto-start demos on mount.
   */
  componentDidMount() {}

  /**
   * Lifecycle: cancel pending animations.
   */
  componentWillUnmount() {
    this.clearTimers()
  }

  /**
   * Writes a short console-style status line and optional operation tag.
   */
  log(msg, op = "") {
    this.setState({ log: "> " + msg, lastOp: op || this.state.lastOp })
  }

  /**
   * Runs a timed sequence of state patches for teaching animations.
   * Each step is `{ delay, patch, log?, op? }`.
   */
  runSteps(steps, onDone) {
    this.clearTimers()
    let acc = 0
    steps.forEach((step, i) => {
      acc += step.delay
      this.later(acc, () => {
        if (step.patch) this.setState(step.patch)
        if (step.log) this.log(step.log, step.op || "")
        if (i === steps.length - 1 && onDone) onDone()
      })
    })
  }

  /**
   * Animated insert-at-end: walks from primero to the last node, then appends.
   */
  demoInsertarLista() {
    if (this.state.listaBusy) return
    const dato = (this.state.listaInput || "").trim() || "nodo"
    const n = this.state.lista.length
    this.setState({ listaBusy: true, lastOp: "Insertar" })
    const steps = []
    if (n === 0) {
      steps.push({
        delay: 200,
        patch: { listaWalk: -1 },
        log: `Lista vacía: primero → nuevo nodo "${dato}"`,
        op: "Insertar",
      })
    } else {
      for (let i = 0; i < n; i++) {
        steps.push({
          delay: i === 0 ? 180 : 320,
          patch: { listaWalk: i },
          log:
            i < n - 1
              ? `Recorriendo: actual = "${this.state.lista[i]}" · Siguiente ≠ null`
              : `Fin de lista en "${this.state.lista[i]}" · Siguiente = null → enlazar`,
          op: "Insertar",
        })
      }
    }
    steps.push({
      delay: 380,
      patch: {
        lista: this.state.lista.concat([dato]),
        listaWalk: -1,
        listaPulse: n,
        listaBusy: false,
      },
      log: `Insertar("${dato}") · cantidad = ${n + 1}`,
      op: "Insertar",
    })
    steps.push({
      delay: 700,
      patch: { listaPulse: -1 },
    })
    this.runSteps(steps)
  }

  /**
   * Instant insert without walk (used by the plain button when not demoing).
   */
  insertarLista() {
    if (this.state.listaBusy) return
    this.demoInsertarLista()
  }

  /**
   * Removes the last node with a brief pulse on the previous tip.
   */
  eliminarLista() {
    if (this.state.listaBusy) return
    if (!this.state.lista.length) {
      this.log("Lista vacía: no hay nodo que eliminar", "Eliminar")
      return
    }
    const out = this.state.lista[this.state.lista.length - 1]
    const next = this.state.lista.slice(0, -1)
    this.setState({
      lista: next,
      listaPulse: next.length ? next.length - 1 : -1,
      lastOp: "Eliminar",
    })
    this.log(`Se eliminó el último nodo ("${out}") · cantidad = ${next.length}`, "Eliminar")
    this.later(600, () => this.setState({ listaPulse: -1 }))
  }

  /**
   * Restores the lista seed and clears animation markers.
   */
  resetLista() {
    this.clearTimers()
    this.setState({
      lista: [...LISTA_SEED],
      listaWalk: -1,
      listaPulse: -1,
      listaBusy: false,
    })
    this.log("Lista restablecida", "Restablecer")
  }

  /**
   * Auto demo: insert two names while narrating the walk.
   */
  autoDemoLista() {
    if (this.state.listaBusy) return
    this.clearTimers()
    this.setState({
      lista: ["Ana"],
      listaInput: "Bruno",
      listaWalk: -1,
      listaPulse: -1,
      listaBusy: true,
    })
    this.log("Demostración: construir una lista por inserciones al final", "Demo")
    this.later(500, () => {
      this.setState({ listaBusy: false })
      this.demoInsertarLista()
      this.later(2200, () => {
        this.setState({ listaInput: "Carla", listaBusy: false })
        this.demoInsertarLista()
      })
    })
  }

  /**
   * Pushes a value onto the stack with top highlight.
   */
  apilar() {
    if (this.state.pilaBusy) return
    const dato = (this.state.pilaInput || "").trim() || "item"
    const pila = this.state.pila.concat([dato])
    this.setState({ pila, pilaPulse: "in", pilaLastOut: "", lastOp: "Apilar" })
    this.log(`Apilar("${dato}") · LIFO: el tope es ahora "${dato}"`, "Apilar")
    this.later(550, () => this.setState({ pilaPulse: "" }))
  }

  /**
   * Pops the top of the stack with exit highlight.
   */
  desapilar() {
    if (this.state.pilaBusy) return
    if (!this.state.pila.length) {
      this.log("Pila vacía: Desapilar no es válido", "Desapilar")
      return
    }
    const tope = this.state.pila[this.state.pila.length - 1]
    this.setState({ pilaPulse: "out", lastOp: "Desapilar" })
    this.log(`Desapilar() → "${tope}" · el tope anterior queda expuesto`, "Desapilar")
    this.later(320, () => {
      this.setState({
        pila: this.state.pila.slice(0, -1),
        pilaPulse: "",
        pilaLastOut: tope,
      })
    })
  }

  /**
   * Restores the pila seed.
   */
  resetPila() {
    this.clearTimers()
    this.setState({
      pila: [...PILA_SEED],
      pilaPulse: "",
      pilaLastOut: "",
      pilaBusy: false,
    })
    this.log("Pila restablecida", "Restablecer")
  }

  /**
   * Auto demo: push then pop to show LIFO order.
   */
  autoDemoPila() {
    if (this.state.pilaBusy) return
    this.clearTimers()
    this.setState({
      pila: ["base"],
      pilaInput: "medio",
      pilaBusy: true,
      pilaLastOut: "",
      pilaPulse: "",
    })
    this.log("Demostración LIFO: el último en entrar es el primero en salir", "Demo")
    const sequence = [
      { delay: 500, fn: () => { this.setState({ pilaBusy: false }); this.apilar() } },
      { delay: 1100, fn: () => { this.setState({ pilaInput: "tope", pilaBusy: false }); this.apilar() } },
      { delay: 1800, fn: () => { this.setState({ pilaBusy: false }); this.desapilar() } },
      { delay: 2500, fn: () => { this.setState({ pilaBusy: false }); this.desapilar() } },
      {
        delay: 3200,
        fn: () => {
          this.setState({ pilaBusy: false })
          this.log('Orden de salida: "tope", luego "medio" — LIFO', "Demo")
        },
      },
    ]
    for (const step of sequence) this.later(step.delay, step.fn)
  }

  /**
   * Enqueues at the rear with pulse.
   */
  encolar() {
    if (this.state.colaBusy) return
    const dato = (this.state.colaInput || "").trim() || "item"
    this.setState({
      cola: this.state.cola.concat([dato]),
      colaPulse: "in",
      colaLastOut: "",
      lastOp: "Encolar",
    })
    this.log(`Encolar("${dato}") · FIFO: entra por el final`, "Encolar")
    this.later(550, () => this.setState({ colaPulse: "" }))
  }

  /**
   * Dequeues from the front with pulse.
   */
  desencolar() {
    if (this.state.colaBusy) return
    if (!this.state.cola.length) {
      this.log("Cola vacía: Desencolar no es válido", "Desencolar")
      return
    }
    const frente = this.state.cola[0]
    this.setState({ colaPulse: "out", lastOp: "Desencolar" })
    this.log(`Desencolar() → "${frente}" · sale el que llegó primero`, "Desencolar")
    this.later(320, () => {
      this.setState({
        cola: this.state.cola.slice(1),
        colaPulse: "",
        colaLastOut: frente,
      })
    })
  }

  /**
   * Restores the cola seed.
   */
  resetCola() {
    this.clearTimers()
    this.setState({
      cola: [...COLA_SEED],
      colaPulse: "",
      colaLastOut: "",
      colaBusy: false,
    })
    this.log("Cola restablecida", "Restablecer")
  }

  /**
   * Auto demo: enqueue then dequeue to show FIFO order.
   */
  autoDemoCola() {
    if (this.state.colaBusy) return
    this.clearTimers()
    this.setState({
      cola: [],
      colaInput: "A",
      colaBusy: true,
      colaLastOut: "",
      colaPulse: "",
    })
    this.log("Demostración FIFO: el primero en llegar es el primero en salir", "Demo")
    const sequence = [
      { delay: 400, fn: () => { this.setState({ colaBusy: false }); this.encolar() } },
      { delay: 1000, fn: () => { this.setState({ colaInput: "B", colaBusy: false }); this.encolar() } },
      { delay: 1600, fn: () => { this.setState({ colaInput: "C", colaBusy: false }); this.encolar() } },
      { delay: 2300, fn: () => { this.setState({ colaBusy: false }); this.desencolar() } },
      { delay: 3000, fn: () => { this.setState({ colaBusy: false }); this.desencolar() } },
      {
        delay: 3700,
        fn: () => {
          this.setState({ colaBusy: false })
          this.log('Orden de salida: "A", luego "B" — FIFO (queda "C")', "Demo")
        },
      },
    ]
    for (const step of sequence) this.later(step.delay, step.fn)
  }

  /**
   * Animated pointer walk from (1,1) to the selected cell via Abajo then Derecha.
   */
  demoCaminarMatriz() {
    if (this.state.matrizBusy) return
    const targetF = this.state.selFila
    const targetC = this.state.selCol
    this.setState({ matrizBusy: true, walkFila: 0, walkCol: 0, lastOp: "Obtener" })
    this.log("Obtener(f,c): partir de inicio (1,1) y seguir punteros", "Obtener")

    const path = []
    for (let f = 0; f <= targetF; f++) path.push([f, 0])
    for (let c = 1; c <= targetC; c++) path.push([targetF, c])

    const steps = path.map(([f, c], i) => ({
      delay: i === 0 ? 200 : 280,
      patch: { walkFila: f, walkCol: c },
      log:
        i === 0
          ? "inicio = (1,1)"
          : f > (path[i - 1]?.[0] ?? 0)
            ? `Abajo → (${f + 1},${c + 1})`
            : `Derecha → (${f + 1},${c + 1})`,
      op: "Obtener",
    }))
    steps.push({
      delay: 400,
      patch: { walkFila: -1, walkCol: -1, matrizBusy: false },
      log: `Celda alcanzada: (${targetF + 1},${targetC + 1}) = "${this.state.matriz[targetF][targetC]}"`,
      op: "Obtener",
    })
    this.runSteps(steps)
  }

  /**
   * Restores the matriz seed and focus.
   */
  resetMatriz() {
    this.clearTimers()
    this.setState({
      matriz: MATRIZ_SEED.map((row) => [...row]),
      selFila: 0,
      selCol: 0,
      walkFila: -1,
      walkCol: -1,
      matrizBusy: false,
    })
    this.log("Matriz restablecida · foco en (1,1)", "Restablecer")
  }

  /**
   * Background for a matrix cell by selection and walk highlight.
   */
  cellBg(fila, col, selFila, selCol, walkFila, walkCol) {
    if (fila === walkFila && col === walkCol) return "#C6FF3D"
    if (fila === selFila && col === selCol) return "#C6B8FF"
    const neighbor =
      (Math.abs(fila - selFila) === 1 && col === selCol) ||
      (Math.abs(col - selCol) === 1 && fila === selFila)
    if (neighbor) return "#E0D4FF"
    return "#FFF"
  }

  /**
   * Exposes template bindings for the React view.
   */
  renderVals() {
    const s = this.state

    const listaNodos = s.lista.map((dato, i) => ({
      key: `${dato}-${i}`,
      dato,
      esPrimero: i === 0,
      esUltimo: i === s.lista.length - 1,
      walking: i === s.listaWalk,
      pulse: i === s.listaPulse,
    }))

    const pilaNodos = [...s.pila].reverse().map((dato, i, arr) => ({
      key: `${dato}-${i}`,
      dato,
      esTope: i === 0,
      esBase: i === arr.length - 1,
      label: i === 0 ? `tope · ${dato}` : i === arr.length - 1 ? `base · ${dato}` : dato,
      bg: i === 0 ? "#C6FF3D" : "#FFF",
    }))

    const colaNodos = s.cola.map((dato, i) => ({
      key: `${dato}-${i}`,
      dato,
      esFrente: i === 0,
      esFinal: i === s.cola.length - 1,
      bg: i === 0 ? "#C6FF3D" : "#FFF",
    }))

    const filas = s.matriz.map((row, fila) => ({
      key: fila,
      celdas: row.map((ch, col) => ({
        key: col,
        label: ch,
        bg: this.cellBg(fila, col, s.selFila, s.selCol, s.walkFila, s.walkCol),
        title: `(${fila + 1},${col + 1})`,
        pick: () => {
          if (s.matrizBusy) return
          this.setState({ selFila: fila, selCol: col })
          this.log(
            `Foco en (${fila + 1},${col + 1}) · valor "${ch}". Use "Caminar desde inicio" para ver los punteros.`,
            "Seleccionar"
          )
        },
      })),
    }))

    const vecinos = [
      {
        dir: "Arriba",
        ok: s.selFila > 0,
        dest: s.selFila > 0 ? `(${s.selFila},${s.selCol + 1})` : "null",
      },
      {
        dir: "Abajo",
        ok: s.selFila < s.matriz.length - 1,
        dest:
          s.selFila < s.matriz.length - 1
            ? `(${s.selFila + 2},${s.selCol + 1})`
            : "null",
      },
      {
        dir: "Izquierda",
        ok: s.selCol > 0,
        dest: s.selCol > 0 ? `(${s.selFila + 1},${s.selCol})` : "null",
      },
      {
        dir: "Derecha",
        ok: s.selCol < s.matriz[0].length - 1,
        dest:
          s.selCol < s.matriz[0].length - 1
            ? `(${s.selFila + 1},${s.selCol + 2})`
            : "null",
      },
    ].map((v, i) => ({
      key: i,
      ...v,
      bg: v.ok ? "#FFF" : "#F0EBFF",
      fg: v.ok ? "#160B2E" : "#9A9482",
    }))

    return {
      log: s.log,
      lastOp: s.lastOp,

      listaNodos,
      listaCantidad: s.lista.length,
      listaInput: s.listaInput,
      listaBusy: s.listaBusy,
      setListaInput: (e) => this.setState({ listaInput: e.target.value }),
      insertarLista: () => this.insertarLista(),
      eliminarLista: () => this.eliminarLista(),
      resetLista: () => this.resetLista(),
      autoDemoLista: () => this.autoDemoLista(),

      pilaNodos,
      pilaCantidad: s.pila.length,
      pilaInput: s.pilaInput,
      pilaPulse: s.pilaPulse,
      pilaLastOut: s.pilaLastOut,
      pilaBusy: s.pilaBusy,
      setPilaInput: (e) => this.setState({ pilaInput: e.target.value }),
      apilar: () => this.apilar(),
      desapilar: () => this.desapilar(),
      resetPila: () => this.resetPila(),
      autoDemoPila: () => this.autoDemoPila(),

      colaNodos,
      colaCantidad: s.cola.length,
      colaInput: s.colaInput,
      colaPulse: s.colaPulse,
      colaLastOut: s.colaLastOut,
      colaBusy: s.colaBusy,
      setColaInput: (e) => this.setState({ colaInput: e.target.value }),
      encolar: () => this.encolar(),
      desencolar: () => this.desencolar(),
      resetCola: () => this.resetCola(),
      autoDemoCola: () => this.autoDemoCola(),

      filas,
      selCoord: `(${s.selFila + 1},${s.selCol + 1})`,
      selContenido: s.matriz[s.selFila][s.selCol],
      vecinos,
      matrizBusy: s.matrizBusy,
      resetMatriz: () => this.resetMatriz(),
      demoCaminarMatriz: () => this.demoCaminarMatriz(),
    }
  }
}
