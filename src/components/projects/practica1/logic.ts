// @ts-nocheck
/**
 * Interactive logic ported from the native Practica1 DC artifact.
 */

const FACTORES = { Perro: 1, Gato: 0.9, Ave: 0.5, Tortuga: 0.8 };
const EXTRAS = {
  Perro:   { a: 'RAZA', ap: 'Labrador', b: 'TAMAÑO GRANDE' },
  Gato:    { a: 'RAZA', ap: 'Siamés', b: 'ESTERILIZADO' },
  Ave:     { a: 'ENVERGADURA (CM)', ap: '32', b: 'PUEDE VOLAR' },
  Tortuga: { a: 'TIPO DE CAPARAZÓN', ap: 'Duro', b: 'ES ACUÁTICA' }
};
const EXTRA_TXT = {
  Perro: (a, b) => 'Raza: ' + (a || 'N/D') + ' · Tamaño grande: ' + b,
  Gato: (a, b) => 'Raza: ' + (a || 'N/D') + ' · Esterilizado: ' + b,
  Ave: (a, b) => 'Envergadura: ' + (a || 'N/D') + ' cm · Puede volar: ' + b,
  Tortuga: (a, b) => 'Caparazón: ' + (a || 'N/D') + ' · Acuática: ' + b
};
const CODE = {
  mascota: `public abstract class Mascota
{
    private string nombre;
    private double peso;          // kilogramos
    private string sexo;
    private int edad;
    private string propietario;
    private string codigo;        // 8 caracteres alfanuméricos
    private bool enfermo;

    public Mascota(string nombre, double peso, string sexo,
                   int edad, string propietario, bool enfermo)
    {
        this.nombre = nombre;
        this.peso = peso;
        this.sexo = sexo;
        this.edad = edad;
        this.propietario = propietario;
        this.enfermo = enfermo;
        this.codigo = GenerarCodigo();
    }

    public string Nombre { get { return nombre; } set { nombre = value; } }
    public double Peso   { get { return peso; }   set { peso = value; } }
    public int Edad      { get { return edad; }   set { edad = value; } }
    public string Codigo { get { return codigo; } }
    public bool Enfermo  { get { return enfermo; } }

    private string GenerarCodigo()
    {
        const string chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        Random r = new Random();
        char[] c = new char[8];
        for (int i = 0; i < 8; i++) c[i] = chars[r.Next(chars.Length)];
        return new string(c);
    }

    public virtual double CalcularDosis(double dosis_por_Kg)
    {
        return peso * dosis_por_Kg;
    }

    public void CambiarEstado()
    {
        enfermo = !enfermo;
    }

    public virtual void MostrarInformacion()
    {
        Console.WriteLine($"[{codigo}] {nombre} | {sexo} | {edad} años");
        Console.WriteLine($"Peso: {peso} kg | Propietario: {propietario}");
        Console.WriteLine($"Estado: {(enfermo ? "Enfermo" : "Sano")}");
    }
}`,
  perro: `public class Perro : Mascota
{
    private string raza;
    private string tamano;

    public Perro(string nombre, double peso, string sexo, int edad,
                 string propietario, bool enfermo,
                 string raza, string tamano)
        : base(nombre, peso, sexo, edad, propietario, enfermo)
    {
        this.raza = raza;
        this.tamano = tamano;
    }

    public string Raza { get { return raza; } set { raza = value; } }

    // Dosis estándar: peso x mg/kg, sin ajuste adicional
    public override double CalcularDosis(double dosis_por_Kg)
    {
        return base.CalcularDosis(dosis_por_Kg);
    }

    public override void MostrarInformacion()
    {
        Console.WriteLine("== PERRO ==");
        base.MostrarInformacion();
        Console.WriteLine($"Raza: {raza} | Tamaño: {tamano}");
    }
}`,
  otras: `public class Gato : Mascota
{
    private string raza;
    private bool esterilizado;

    public Gato(...) : base(...) { }

    // Factor de ajuste del 90 %
    public override double CalcularDosis(double dosis_por_Kg)
    {
        return base.CalcularDosis(dosis_por_Kg) * 0.90;
    }
}

public class Ave : Mascota
{
    private double envergaduraAlas;
    private bool puedeVolar;

    public Ave(...) : base(...) { }

    // Factor de ajuste del 50 %
    public override double CalcularDosis(double dosis_por_Kg)
    {
        return base.CalcularDosis(dosis_por_Kg) * 0.50;
    }
}

public class Tortuga : Mascota
{
    private string tipoCaparazon;
    private bool esAcuatica;

    public Tortuga(...) : base(...) { }

    // Factor de ajuste del 80 %
    public override double CalcularDosis(double dosis_por_Kg)
    {
        return base.CalcularDosis(dosis_por_Kg) * 0.80;
    }
}`,
  program: `class Program
{
    static List<Mascota> pacientes = new List<Mascota>();

    static void Main()
    {
        bool salir = false;
        while (!salir)
        {
            Console.WriteLine("=== VETERINARIA ===");
            Console.WriteLine("1. Registrar mascota");
            Console.WriteLine("2. Gestionar pacientes");
            Console.WriteLine("3. Salir");
            Console.Write("Opción: ");

            switch (Console.ReadLine())
            {
                case "1": RegistrarMascota(); break;
                case "2": GestionarPacientes(); break;
                case "3": salir = true; break;
                default: Console.WriteLine("Opción inválida."); break;
            }
        }
    }

    static void GestionarPacientes()
    {
        // 1. Cambiar estado del paciente
        // 2. Calcular dosis de medicamento
        // 3. Consultar información
    }
}`
};
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

const HC = [
  ['Implementación de abstracción', 10, 1],
  ['Creación de clase abstracta', 10, 0],
  ['Implementación de Herencia', 20, 1],
  ['Herencia en atributos', 10, 0],
  ['Herencia en métodos', 10, 0],
  ['Implementación de encapsulamiento', 25, 1],
  ['Atributos privados', 5, 0],
  ['Uso de getters', 10, 0],
  ['Uso de setters', 10, 0],
  ['Implementación de Polimorfismo', 10, 1],
  ['Sobrescritura de métodos', 10, 0],
  ['Registrar Paciente', 16, 1],
  ['Perros', 4, 0],
  ['Gatos', 4, 0],
  ['Aves', 4, 0],
  ['Tortugas', 4, 0],
  ['Gestionar pacientes', 14, 1],
  ['Cambiar estado de paciente', 4, 0],
  ['Ver información', 10, 0],
  ['Preguntas', 5, 1],
  ['Pregunta', 5, 0],
  ['TOTAL', 100, 2]
];

export class Practica1Logic {
  state = {
    tipo: 'Perro', nombre: '', peso: '', edad: '', sexo: 'Macho', propietario: '',
    estado: 'Enfermo', extraA: '', extraB: 'Sí', dosisKg: '5', aviso: '',
    pacientes: [], consola: [
      '> VeterinariaApp iniciada.',
      '=== VETERINARIA ===',
      '1. Registrar mascota   2. Gestionar pacientes   3. Salir',
      '> esperando registro de pacientes...'
    ], tab: 'mascota'
  };

  componentDidMount() {
    if (this.props.pacientesDemo) this.cargarDemo();
    if (this.props.dosisPorKgDefault) this.setState({ dosisKg: String(this.props.dosisPorKgDefault) });
  }

  log(...lineas) {
    this.setState(s => ({ consola: s.consola.concat(lineas).slice(-60) }));
  }

  codigo() {
    let c = '';
    for (let i = 0; i < 8; i++) c += CHARS[Math.floor(Math.random() * CHARS.length)];
    return c;
  }

  crear(tipo, nombre, peso, edad, sexo, propietario, estado, extraA, extraB) {
    return { id: Math.random().toString(36).slice(2), codigo: this.codigo(), tipo, nombre, peso, edad, sexo, propietario, estado, extraA, extraB, dosisTxt: '> dosis sin calcular' };
  }

  cargarDemo() {
    const demo = [
      this.crear('Perro', 'Firulais', 12.5, 3, 'Macho', 'Ana López', 'Enfermo', 'Labrador', 'Sí'),
      this.crear('Gato', 'Michi', 4.2, 2, 'Hembra', 'Luis Pérez', 'Sano', 'Siamés', 'Sí'),
      this.crear('Ave', 'Pico', 0.4, 1, 'Macho', 'Sara Gómez', 'Enfermo', '32', 'Sí'),
      this.crear('Tortuga', 'Caparazón', 2.8, 9, 'Hembra', 'Jorge Ruiz', 'Sano', 'Duro', 'No')
    ];
    this.setState({ pacientes: demo, aviso: '4 pacientes de ejemplo cargados.' });
    this.log('> 4 pacientes de ejemplo registrados: ' + demo.map(p => p.codigo).join(', '));
  }

  registrar = () => {
    const s = this.state;
    const peso = parseFloat(s.peso), edad = parseInt(s.edad, 10);
    if (!s.nombre.trim()) return this.setState({ aviso: 'Falta el nombre del paciente.' });
    if (!(peso > 0)) return this.setState({ aviso: 'El peso debe ser un número mayor que 0.' });
    if (!s.propietario.trim()) return this.setState({ aviso: 'Falta el propietario.' });
    const p = this.crear(s.tipo, s.nombre.trim(), peso, isNaN(edad) ? 0 : edad, s.sexo, s.propietario.trim(), s.estado, s.extraA.trim(), s.extraB);
    this.setState(st => ({ pacientes: st.pacientes.concat([p]), nombre: '', peso: '', edad: '', propietario: '', extraA: '', aviso: s.tipo + ' registrado con código ' + p.codigo }));
    this.log('> Registrar mascota > ' + s.tipo.toUpperCase(), '  Código generado: ' + p.codigo + ' | ' + s.nombre.trim() + ' | ' + peso + ' kg');
  };

  toggleEstado(p) {
    const nuevo = p.estado === 'Enfermo' ? 'Sano' : 'Enfermo';
    this.setState(s => ({ pacientes: s.pacientes.map(x => x.id === p.id ? Object.assign({}, x, { estado: nuevo }) : x) }));
    this.log('> Gestionar > Cambiar estado [' + p.codigo + '] ' + p.estado + ' -> ' + nuevo);
  }

  calcularDosis(p) {
    const d = parseFloat(this.state.dosisKg);
    if (!(d > 0)) { this.log('! dosis_por_Kg inválida'); return; }
    const f = FACTORES[p.tipo];
    const mg = p.peso * d * f;
    const txt = 'Dosis: ' + mg.toFixed(2) + ' mg  (' + p.peso + ' kg × ' + d + ' mg/kg × ' + (f * 100) + '%)';
    this.setState(s => ({ pacientes: s.pacientes.map(x => x.id === p.id ? Object.assign({}, x, { dosisTxt: txt }) : x) }));
    this.log('> Gestionar > Calcular dosis [' + p.codigo + '] ' + p.tipo, '  ' + txt);
  }

  info(p) {
    this.log(
      '> Gestionar > Ver información [' + p.codigo + ']',
      '  ' + p.nombre + ' | ' + p.sexo + ' | ' + p.edad + ' años | ' + p.peso + ' kg',
      '  Propietario: ' + p.propietario + ' | Estado: ' + p.estado,
      '  ' + EXTRA_TXT[p.tipo](p.extraA, p.extraB)
    );
  }

  set = (k) => (e) => this.setState({ [k]: e.target.value });
  pick = (tipo) => () => this.setState({ tipo, extraA: '', extraB: 'Sí', aviso: '' });
  tab = (tab) => () => this.setState({ tab });

  renderVals() {
    const s = this.state;
    const ex = EXTRAS[s.tipo];
    const on = (t) => s.tipo === t ? '#06142E' : '#E4EEFF';
    const onFg = (t) => s.tipo === t ? '#35E0FF' : '#06142E';
    const tb = (t) => s.tab === t ? '#06142E' : '#fff';
    const tf = (t) => s.tab === t ? '#35E0FF' : '#06142E';
    return {
      nombre: s.nombre, peso: s.peso, edad: s.edad, sexo: s.sexo, propietario: s.propietario,
      estado: s.estado, extraA: s.extraA, extraB: s.extraB, dosisKg: s.dosisKg, aviso: s.aviso,
      tipoUpper: s.tipo.toUpperCase(),
      extraALabel: ex.a, extraAPlaceholder: ex.ap, extraBLabel: ex.b,
      onNombre: this.set('nombre'), onPeso: this.set('peso'), onEdad: this.set('edad'),
      onSexo: this.set('sexo'), onPropietario: this.set('propietario'), onEstado: this.set('estado'),
      onExtraA: this.set('extraA'), onExtraB: this.set('extraB'), onDosisKg: this.set('dosisKg'),
      pickPerro: this.pick('Perro'), pickGato: this.pick('Gato'), pickAve: this.pick('Ave'), pickTortuga: this.pick('Tortuga'),
      bgPerro: on('Perro'), bgGato: on('Gato'), bgAve: on('Ave'), bgTortuga: on('Tortuga'),
      fgPerro: onFg('Perro'), fgGato: onFg('Gato'), fgAve: onFg('Ave'), fgTortuga: onFg('Tortuga'),
      registrar: this.registrar,
      demo: () => this.cargarDemo(),
      limpiar: () => this.setState({ consola: ['> consola limpia.', '=== VETERINARIA ==='] }),
      consola: s.consola,
      totalPacientes: s.pacientes.length,
      vacio: s.pacientes.length === 0,
      pacientes: s.pacientes.map(p => ({
        nombre: p.nombre, tipo: p.tipo.toUpperCase(), codigo: p.codigo, sexo: p.sexo,
        propietario: p.propietario, pesoTxt: p.peso + ' kg', edadTxt: p.edad + ' años',
        factorTxt: (FACTORES[p.tipo] * 100) + '%',
        extraTxt: EXTRA_TXT[p.tipo](p.extraA, p.extraB),
        estado: p.estado,
        estadoBg: p.estado === 'Enfermo' ? '#1E4FD8' : '#35E0FF',
        estadoFg: p.estado === 'Enfermo' ? '#fff' : '#06142E',
        dosisTxt: p.dosisTxt,
        onEstado: () => this.toggleEstado(p),
        onDosis: () => this.calcularDosis(p),
        onInfo: () => this.info(p)
      })),
      treeText: 'Practica1_Veterinaria/\n'
        + '├─ Program.cs                menú en bucle\n'
        + '├─ Modelos/\n'
        + '│  ├─ Mascota.cs             abstracta\n'
        + '│  ├─ Perro.cs               dosis 100 %\n'
        + '│  ├─ Gato.cs                dosis 90 %\n'
        + '│  ├─ Ave.cs                 dosis 50 %\n'
        + '│  └─ Tortuga.cs             dosis 80 %\n'
        + '├─ Servicios/\n'
        + '│  ├─ Veterinaria.cs         registro de pacientes\n'
        + '│  └─ MenuConsola.cs         lectura y validación\n'
        + '├─ Utilidades/\n'
        + '│  └─ GeneradorCodigo.cs     8 alfanuméricos\n'
        + '├─ .gitignore\n'
        + '└─ README.md                 cómo compilar y correr',
      mostrarCodigo: this.props.mostrarCodigo ?? true,
      codigo: CODE[s.tab],
      tabMascota: this.tab('mascota'), tabPerro: this.tab('perro'), tabOtras: this.tab('otras'), tabProgram: this.tab('program'),
      bgTabMascota: tb('mascota'), bgTabPerro: tb('perro'), bgTabOtras: tb('otras'), bgTabProgram: tb('program'),
      fgTabMascota: tf('mascota'), fgTabPerro: tf('perro'), fgTabOtras: tf('otras'), fgTabProgram: tf('program'),
      hcFilas: HC.map(([nombre, valor, nivel]) => ({
        nombre, valor,
        peso: nivel ? 700 : 400,
        sangria: nivel ? '12px' : '30px',
        bg: nivel === 2 ? '#35E0FF' : (nivel ? '#E4EEFF' : '#fff')
      }))
    };
  }
}
