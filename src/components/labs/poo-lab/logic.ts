// @ts-nocheck
/**
 * Interactive demos for the POO laboratory (C# object-oriented basics).
 */

const NOMBRES = ["Ana", "Luis", "Sofía", "Marco", "Elena", "Diego", "Valeria", "Pablo"]
const COLORES = ["rojo", "azul", "verde", "negro", "blanco", "amarillo"]

const ANIMALES = {
  Animal: { especie: "Animal", sonido: "...", color: "#9A9482", metodo: "virtual Hablar()" },
  Perro: { especie: "Perro", sonido: "Guau", color: "#FFC14A", metodo: "override Hablar()" },
  Gato: { especie: "Gato", sonido: "Miau", color: "#6BE3FF", metodo: "override Hablar()" },
  Pajaro: { especie: "Pájaro", sonido: "Pío", color: "#7CFF9E", metodo: "override Hablar()" },
}

const CONSTRUCTOR_STEPS = [
  { id: 0, label: "new Cuenta(...)", detail: "Se pide memoria para el objeto en el heap." },
  { id: 1, label: "Asignar campos", detail: "titular y saldoInicial se copian a this." },
  { id: 2, label: "Validar reglas", detail: "Si saldo < 0, se corrige o se lanza excepción." },
  { id: 3, label: "Objeto listo", detail: "La referencia queda en la variable de la izquierda." },
]

/**
 * Builds interactive state and render bindings for the POO lab.
 */
export class PooLabLogic {
  state = {
    log: "> POO listo. Explora cada sección y prueba los demos.",
    // Clases y objetos
    objetos: [
      { id: 1, nombre: "Ana", edad: 20, pop: true },
      { id: 2, nombre: "Luis", edad: 22, pop: false },
    ],
    nextId: 3,
    formNombre: "Sofía",
    formEdad: "19",
    // Encapsulación
    saldo: 500,
    intentoSaldo: "-100",
    encapMsg: "Saldo protegido por propiedad con validación.",
    encapOk: true,
    showPrivate: false,
    // Constructores
    ctorStep: 0,
    ctorPlaying: false,
    ctorTitular: "Ana",
    ctorSaldo: "250",
    // Herencia
    selectedClass: "Perro",
    inheritFlash: "",
    // Polimorfismo
    zoo: ["Perro", "Gato", "Pajaro"],
    polyIndex: 0,
    polyLog: [],
    overloadA: "3",
    overloadB: "4",
    overloadResult: null,
    overloadKind: "",
    // Abstracción / interfaces
    figura: "Circulo",
    figuraRadio: "4",
    figuraLado: "5",
    // Composición
    motorEncendido: false,
    motorRpm: 0,
    // Static
    contadorInstancias: 2,
    // Quiz
    quizIndex: 0,
    quizScore: 0,
    quizDone: false,
    quizFeedback: "",
  }

  _ctorTimer = null

  /**
   * Writes a short console-style status line.
   */
  log(msg) {
    this.setState({ log: "> " + msg })
  }

  /**
   * Advances or resets the constructor animation.
   */
  runCtorAnim() {
    if (this.state.ctorPlaying) return
    this.setState({ ctorPlaying: true, ctorStep: 0 })
    let step = 0
    clearInterval(this._ctorTimer)
    this._ctorTimer = setInterval(() => {
      step += 1
      if (step >= CONSTRUCTOR_STEPS.length) {
        clearInterval(this._ctorTimer)
        this._ctorTimer = null
        this.setState({ ctorPlaying: false, ctorStep: CONSTRUCTOR_STEPS.length - 1 })
        this.log(
          `new Cuenta("${this.state.ctorTitular}", ${this.state.ctorSaldo}) → objeto construido`
        )
        return
      }
      this.setState({ ctorStep: step })
    }, 900)
  }

  /**
   * Lifecycle cleanup for timers.
   */
  componentWillUnmount() {
    clearInterval(this._ctorTimer)
  }

  /**
   * Exposes template bindings for the React view.
   */
  renderVals() {
    const s = this.state
    const animal = ANIMALES[s.selectedClass] || ANIMALES.Animal
    const polyActual = s.zoo[s.polyIndex] || "Perro"
    const polyAnimal = ANIMALES[polyActual] || ANIMALES.Perro

    const area =
      s.figura === "Circulo"
        ? (Math.PI * Number(s.figuraRadio || 0) ** 2).toFixed(2)
        : (Number(s.figuraLado || 0) ** 2).toFixed(2)

    const quizBank = [
      {
        q: "¿Qué encapsula una clase?",
        options: ["Solo métodos", "Datos + comportamiento", "Solo namespaces", "Solo interfaces"],
        answer: 1,
      },
      {
        q: "private en C# significa que el miembro…",
        options: [
          "Es visible en todo el ensamblado",
          "Solo es visible dentro de la misma clase",
          "Solo en clases hijas",
          "Es público por defecto",
        ],
        answer: 1,
      },
      {
        q: "virtual + override habilitan…",
        options: ["Herencia múltiple", "Polimorfismo en tiempo de ejecución", "Boxing", "Delegados"],
        answer: 1,
      },
      {
        q: "Una interfaz en C#…",
        options: [
          "Puede tener campos de instancia privados",
          "Define un contrato que las clases cumplen",
          "Siempre crea objetos con new",
          "Reemplaza a los namespaces",
        ],
        answer: 1,
      },
      {
        q: "Composición significa…",
        options: [
          "Una clase es otra clase",
          "Una clase contiene instancias de otras",
          "Usar solo static",
          "Ignorar encapsulación",
        ],
        answer: 1,
      },
    ]
    const quiz = quizBank[s.quizIndex] || quizBank[0]

    const objetosCards = s.objetos.map((o) => ({
      key: o.id,
      nombre: o.nombre,
      edad: o.edad,
      pop: o.pop,
      presentar: () => {
        this.log(`${o.nombre}.Presentarse() → "Hola, soy ${o.nombre} y tengo ${o.edad} años"`)
        this.setState({
          objetos: s.objetos.map((x) =>
            x.id === o.id ? { ...x, pop: true } : { ...x, pop: false }
          ),
        })
        setTimeout(() => {
          this.setState({
            objetos: this.state.objetos.map((x) =>
              x.id === o.id ? { ...x, pop: false } : x
            ),
          })
        }, 700)
      },
      eliminar: () => {
        this.setState({ objetos: s.objetos.filter((x) => x.id !== o.id) })
        this.log(`objeto ${o.nombre} sin referencias → elegible para GC`)
      },
    }))

    const zooCards = s.zoo.map((tipo, i) => ({
      key: i,
      tipo,
      activo: i === s.polyIndex,
      color: ANIMALES[tipo]?.color || "#FFF",
      sonido: ANIMALES[tipo]?.sonido || "...",
      pick: () => {
        this.setState({ polyIndex: i })
        this.log(`Animal a = new ${tipo}();  // referencia de tipo base`)
      },
    }))

    const accessTable = [
      { mod: "public", misma: "sí", hija: "sí", ensamblado: "sí", externo: "sí" },
      { mod: "private", misma: "sí", hija: "no", ensamblado: "no", externo: "no" },
      { mod: "protected", misma: "sí", hija: "sí", ensamblado: "no*", externo: "no" },
      { mod: "internal", misma: "sí", hija: "sí*", ensamblado: "sí", externo: "no" },
      { mod: "protected internal", misma: "sí", hija: "sí", ensamblado: "sí", externo: "hijas" },
      { mod: "private protected", misma: "sí", hija: "sí*", ensamblado: "sí*", externo: "no" },
    ]

    return {
      log: s.log,

      // Clases / objetos
      objetosCards,
      formNombre: s.formNombre,
      formEdad: s.formEdad,
      setFormNombre: (e) => this.setState({ formNombre: e.target.value }),
      setFormEdad: (e) => this.setState({ formEdad: e.target.value }),
      crearObjeto: () => {
        const nombre = (s.formNombre || "").trim() || NOMBRES[s.nextId % NOMBRES.length]
        const edad = Math.max(1, parseInt(s.formEdad, 10) || 18)
        const nuevo = { id: s.nextId, nombre, edad, pop: true }
        this.setState({
          objetos: s.objetos.concat([nuevo]),
          nextId: s.nextId + 1,
          contadorInstancias: s.contadorInstancias + 1,
          formNombre: NOMBRES[(s.nextId + 1) % NOMBRES.length],
        })
        this.log(`Persona p = new Persona("${nombre}", ${edad});  // instancia #${s.nextId}`)
        setTimeout(() => {
          this.setState({
            objetos: this.state.objetos.map((x) =>
              x.id === nuevo.id ? { ...x, pop: false } : x
            ),
          })
        }, 700)
      },
      resetObjetos: () => {
        this.setState({
          objetos: [
            { id: 1, nombre: "Ana", edad: 20, pop: false },
            { id: 2, nombre: "Luis", edad: 22, pop: false },
          ],
          nextId: 3,
          contadorInstancias: 2,
        })
        this.log("Instancias restauradas")
      },

      // Encapsulación
      saldo: s.saldo,
      intentoSaldo: s.intentoSaldo,
      encapMsg: s.encapMsg,
      encapOk: s.encapOk,
      showPrivate: s.showPrivate,
      setIntentoSaldo: (e) => this.setState({ intentoSaldo: e.target.value }),
      togglePrivate: () => this.setState({ showPrivate: !s.showPrivate }),
      aplicarSaldo: () => {
        const n = Number(s.intentoSaldo)
        if (Number.isNaN(n)) {
          this.setState({
            encapOk: false,
            encapMsg: "Rechazado: el valor no es numérico.",
          })
          this.log("set → ArgumentException (valor inválido)")
          return
        }
        if (n < 0) {
          this.setState({
            encapOk: false,
            encapMsg: `Rechazado: saldo ${n} < 0. El campo privado no cambió.`,
          })
          this.log("propiedad Saldo: validación bloqueó el set")
          return
        }
        this.setState({
          saldo: n,
          encapOk: true,
          encapMsg: `Saldo actualizado a Q${n}. El campo privado _saldo quedó encapsulado.`,
        })
        this.log(`cuenta.Saldo = ${n};  // set con validación`)
      },
      depositar: () => {
        const n = s.saldo + 50
        this.setState({
          saldo: n,
          encapOk: true,
          encapMsg: `Depositar(50) → saldo = Q${n}`,
        })
        this.log("cuenta.Depositar(50);")
      },

      // Constructores
      ctorSteps: CONSTRUCTOR_STEPS.map((step) => ({
        ...step,
        active: s.ctorStep === step.id,
        done: s.ctorStep > step.id,
      })),
      ctorStep: s.ctorStep,
      ctorPlaying: s.ctorPlaying,
      ctorTitular: s.ctorTitular,
      ctorSaldo: s.ctorSaldo,
      setCtorTitular: (e) => this.setState({ ctorTitular: e.target.value }),
      setCtorSaldo: (e) => this.setState({ ctorSaldo: e.target.value }),
      runCtorAnim: () => this.runCtorAnim(),
      resetCtor: () => {
        clearInterval(this._ctorTimer)
        this._ctorTimer = null
        this.setState({ ctorStep: 0, ctorPlaying: false })
      },

      // Herencia
      selectedClass: s.selectedClass,
      animal,
      inheritFlash: s.inheritFlash,
      pickClass: (name) => {
        this.setState({ selectedClass: name, inheritFlash: name })
        this.log(
          name === "Animal"
            ? "class Animal { public virtual void Hablar() }"
            : `class ${name} : Animal { public override void Hablar() }`
        )
        setTimeout(() => this.setState({ inheritFlash: "" }), 600)
      },
      herenciaTree: [
        { id: "Animal", label: "Animal", level: 0, accent: "#1A0F0A", fg: "#FFC14A" },
        { id: "Perro", label: "Perro", level: 1, accent: "#FFC14A", fg: "#1A0F0A" },
        { id: "Gato", label: "Gato", level: 1, accent: "#6BE3FF", fg: "#1A0F0A" },
        { id: "Pajaro", label: "Pájaro", level: 1, accent: "#7CFF9E", fg: "#1A0F0A" },
      ].map((node) => ({
        ...node,
        selected: s.selectedClass === node.id,
        flash: s.inheritFlash === node.id,
        pick: () => {
          this.setState({ selectedClass: node.id, inheritFlash: node.id })
          this.log(
            node.id === "Animal"
              ? "Animal es la clase base (puede ser abstracta)."
              : `${node.label} hereda miembros de Animal y puede override.`
          )
          setTimeout(() => this.setState({ inheritFlash: "" }), 600)
        },
      })),

      // Polimorfismo
      zooCards,
      polyActual,
      polyAnimal,
      polyLog: s.polyLog,
      llamarHablar: () => {
        const linea = `a.Hablar() → "${polyAnimal.sonido}"  // despacho a ${polyActual}.${polyAnimal.metodo}`
        this.setState({
          polyLog: [linea].concat(s.polyLog).slice(0, 6),
        })
        this.log(linea)
      },
      siguienteAnimal: () => {
        const next = (s.polyIndex + 1) % s.zoo.length
        this.setState({ polyIndex: next })
        this.log(`a = zoo[${next}];  // ${s.zoo[next]}`)
      },
      overloadA: s.overloadA,
      overloadB: s.overloadB,
      overloadResult: s.overloadResult,
      overloadKind: s.overloadKind,
      setOverloadA: (e) => this.setState({ overloadA: e.target.value }),
      setOverloadB: (e) => this.setState({ overloadB: e.target.value }),
      sumarInts: () => {
        const a = parseInt(s.overloadA, 10) || 0
        const b = parseInt(s.overloadB, 10) || 0
        this.setState({
          overloadResult: a + b,
          overloadKind: "Sumar(int, int)",
        })
        this.log(`Calc.Sumar(${a}, ${b}) → ${a + b}`)
      },
      sumarDoubles: () => {
        const a = Number(s.overloadA) || 0
        const b = Number(s.overloadB) || 0
        const r = (a + b).toFixed(2)
        this.setState({
          overloadResult: r,
          overloadKind: "Sumar(double, double)",
        })
        this.log(`Calc.Sumar(${a}, ${b}) → ${r}`)
      },
      sumarTres: () => {
        const a = parseInt(s.overloadA, 10) || 0
        const b = parseInt(s.overloadB, 10) || 0
        const r = a + b + 1
        this.setState({
          overloadResult: r,
          overloadKind: "Sumar(int, int, int) con c=1",
        })
        this.log(`Calc.Sumar(${a}, ${b}, 1) → ${r}`)
      },

      // Abstracción / figuras
      figura: s.figura,
      figuraRadio: s.figuraRadio,
      figuraLado: s.figuraLado,
      area,
      setFigura: (name) => {
        this.setState({ figura: name })
        this.log(`Figura f = new ${name}(...);  // no se puede new Figura()`)
      },
      setFiguraRadio: (e) => this.setState({ figuraRadio: e.target.value }),
      setFiguraLado: (e) => this.setState({ figuraLado: e.target.value }),
      calcularArea: () => {
        this.log(
          s.figura === "Circulo"
            ? `circulo.CalcularArea() → ${area}`
            : `cuadrado.CalcularArea() → ${area}`
        )
      },

      // Composición
      motorEncendido: s.motorEncendido,
      motorRpm: s.motorRpm,
      toggleMotor: () => {
        if (s.motorEncendido) {
          this.setState({ motorEncendido: false, motorRpm: 0 })
          this.log("auto.Motor.Apagar();  // el Auto tiene-un Motor")
        } else {
          this.setState({ motorEncendido: true, motorRpm: 900 })
          this.log("auto.Motor.Encender();  // composición: parte vive con el todo")
        }
      },
      acelerar: () => {
        if (!s.motorEncendido) {
          this.log("No se puede acelerar: el Motor está apagado")
          return
        }
        const rpm = Math.min(7000, s.motorRpm + 800)
        this.setState({ motorRpm: rpm })
        this.log(`auto.Acelerar() → Motor.Rpm = ${rpm}`)
      },

      // Static
      contadorInstancias: s.contadorInstancias,
      colorRandom: COLORES[s.contadorInstancias % COLORES.length],

      // Access
      accessTable,

      // Quiz
      quiz,
      quizIndex: s.quizIndex,
      quizScore: s.quizScore,
      quizDone: s.quizDone,
      quizFeedback: s.quizFeedback,
      quizTotal: quizBank.length,
      answerQuiz: (optionIndex) => {
        if (s.quizDone) return
        const correct = optionIndex === quiz.answer
        const score = s.quizScore + (correct ? 1 : 0)
        const feedback = correct
          ? "Correcto."
          : `Incorrecto. Respuesta: ${quiz.options[quiz.answer]}`
        if (s.quizIndex >= quizBank.length - 1) {
          this.setState({
            quizScore: score,
            quizDone: true,
            quizFeedback: `${feedback} Resultado final: ${score}/${quizBank.length}`,
          })
          this.log(`Quiz terminado · ${score}/${quizBank.length}`)
          return
        }
        this.setState({
          quizScore: score,
          quizIndex: s.quizIndex + 1,
          quizFeedback: feedback,
        })
      },
      resetQuiz: () => {
        this.setState({
          quizIndex: 0,
          quizScore: 0,
          quizDone: false,
          quizFeedback: "",
        })
        this.log("Quiz reiniciado")
      },
    }
  }
}
