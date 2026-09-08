export type DemoSong = {
  id: number
  titulo: string
  artista: string
  genero: "Pop" | "Rock" | "Jazz" | "Clásica"
  duracion: number
}

export type GradeRow = {
  criterio: string
  detalle?: string
  puntos: number
  group?: boolean
}

export const DEMO_SONGS: DemoSong[] = [
  { id: 1, titulo: "Here Comes The Sun - Remastered 2009", artista: "The Beatles", genero: "Rock", duracion: 3 },
  { id: 2, titulo: "Whole Lotta Love - 1990 Remaster", artista: "Led Zeppelin", genero: "Rock", duracion: 5 },
  { id: 3, titulo: "Comfortably Numb", artista: "Pink Floyd", genero: "Rock", duracion: 6 },
  { id: 4, titulo: "I Wanna Be Sedated - 1999 Remaster", artista: "Ramones", genero: "Rock", duracion: 2 },
  { id: 5, titulo: "(Don't Fear) The Reaper", artista: "Blue Öyster Cult", genero: "Rock", duracion: 5 },
  { id: 6, titulo: "Layla", artista: "Derek & The Dominos", genero: "Rock", duracion: 7 },
  { id: 7, titulo: "Stairway to Heaven - Remaster", artista: "Led Zeppelin", genero: "Rock", duracion: 8 },
  { id: 8, titulo: "Ace of Spades", artista: "Motörhead", genero: "Rock", duracion: 3 },
  { id: 9, titulo: "Space Oddity - 2015 Remaster", artista: "David Bowie", genero: "Rock", duracion: 5 },
  { id: 10, titulo: "A Day In The Life - 2017 Mix", artista: "The Beatles", genero: "Rock", duracion: 6 },
]

export const SAMPLE_JSON = `[
  {
    "titulo": "Here Comes The Sun - Remastered 2009",
    "artista": "The Beatles",
    "genero": "Rock",
    "duracion": 4
  },
  {
    "titulo": "Whole Lotta Love - 1990 Remaster",
    "artista": "Led Zeppelin",
    "genero": "Rock",
    "duracion": 5
  },
  {
    "titulo": "Comfortably Numb",
    "artista": "Pink Floyd",
    "genero": "Rock",
    "duracion": 6
  }
]`

export const PROJECT_TREE = `Practica2_Reproductor/
├─ Program.cs
├─ Modelos/
│  └─ Cancion.cs
├─ Estructuras/
│  ├─ NodoCola.cs
│  ├─ ColaReproduccion.cs
│  ├─ NodoArbol.cs
│  └─ ArbolCanciones.cs
├─ Servicios/
│  ├─ CargadorCanciones.cs
│  └─ GraphvizService.cs
├─ Vistas/
│  ├─ MainForm.cs
│  └─ MainForm.Designer.cs
├─ Datos/
│  └─ canciones.json
├─ Reportes/
│  ├─ cola.dot
│  └─ arbol.dot
└─ README.md`

export const CODE_EXAMPLES = [
  {
    id: "modelo",
    label: "Cancion.cs",
    note: "Un solo objeto viaja por la cola y el árbol. La duración queda normalizada en minutos antes de insertarlo.",
    language: "csharp",
    code: `namespace Reproductor.Modelos;

public sealed class Cancion
{
    public string Titulo { get; }
    public string Artista { get; }
    public string Genero { get; }
    public int DuracionMinutos { get; }

    public Cancion(string titulo, string artista, string genero, int duracion)
    {
        Titulo = titulo.Trim();
        Artista = artista.Trim();
        Genero = genero.Trim();
        DuracionMinutos = duracion;
    }

    public override string ToString() => $"{Titulo} — {Artista}";
}`,
  },
  {
    id: "cola",
    label: "ColaReproduccion.cs",
    note: "La cola es FIFO y se implementa con nodos propios. No use Queue<T>, List<T> ni LinkedList<T> como almacenamiento.",
    language: "csharp",
    code: `public sealed class NodoCola
{
    public Cancion Valor { get; }
    public NodoCola? Siguiente { get; set; }
    public NodoCola(Cancion valor) => Valor = valor;
}

public sealed class ColaReproduccion
{
    public NodoCola? Frente { get; private set; }
    public NodoCola? Final { get; private set; }
    public int Cantidad { get; private set; }

    public void Encolar(Cancion cancion)
    {
        var nuevo = new NodoCola(cancion);
        if (Final is null) Frente = nuevo;
        else Final.Siguiente = nuevo;
        Final = nuevo;
        Cantidad++;
    }

    public Cancion? Desencolar()
    {
        if (Frente is null) return null;
        Cancion salida = Frente.Valor;
        Frente = Frente.Siguiente;
        if (Frente is null) Final = null;
        Cantidad--;
        return salida;
    }

    public int CalcularDuracionTotal()
    {
        int total = 0;
        NodoCola? actual = Frente;
        while (actual is not null)
        {
            total += actual.Valor.DuracionMinutos;
            actual = actual.Siguiente;
        }
        return total;
    }
}`,
  },
  {
    id: "arbol",
    label: "ArbolCanciones.cs",
    note: "El criterio de inserción y búsqueda debe ser el título, sin distinguir mayúsculas y minúsculas.",
    language: "csharp",
    code: `public sealed class NodoArbol
{
    public Cancion Valor { get; }
    public NodoArbol? Izquierda { get; set; }
    public NodoArbol? Derecha { get; set; }
    public NodoArbol(Cancion valor) => Valor = valor;
}

public sealed class ArbolCanciones
{
    public NodoArbol? Raiz { get; private set; }

    public void Insertar(Cancion cancion) => Raiz = Insertar(Raiz, cancion);

    private static NodoArbol Insertar(NodoArbol? nodo, Cancion cancion)
    {
        if (nodo is null) return new NodoArbol(cancion);
        int orden = StringComparer.OrdinalIgnoreCase.Compare(
            cancion.Titulo, nodo.Valor.Titulo);

        if (orden < 0) nodo.Izquierda = Insertar(nodo.Izquierda, cancion);
        else if (orden > 0) nodo.Derecha = Insertar(nodo.Derecha, cancion);
        return nodo; // Un título repetido no crea otro nodo.
    }

    public Cancion? Buscar(string titulo)
    {
        NodoArbol? actual = Raiz;
        while (actual is not null)
        {
            int orden = StringComparer.OrdinalIgnoreCase.Compare(
                titulo.Trim(), actual.Valor.Titulo);
            if (orden == 0) return actual.Valor;
            actual = orden < 0 ? actual.Izquierda : actual.Derecha;
        }
        return null;
    }
}`,
  },
  {
    id: "json",
    label: "CargadorCanciones.cs",
    note: "La duración se acepta desde JSON —como pide la hoja— y, si falta, se calcula con la tabla de géneros del enunciado.",
    language: "csharp",
    code: `using System.Text.Json;

public sealed record CancionEntrada(
    string Titulo,
    string Artista,
    string Genero,
    int? Duracion);

public static class CargadorCanciones
{
    public static void Cargar(
        string ruta,
        ColaReproduccion cola,
        ArbolCanciones biblioteca)
    {
        string json = File.ReadAllText(ruta);
        CancionEntrada[] entradas =
            JsonSerializer.Deserialize<CancionEntrada[]>(json,
                new JsonSerializerOptions { PropertyNameCaseInsensitive = true })
            ?? Array.Empty<CancionEntrada>();

        foreach (CancionEntrada entrada in entradas)
        {
            int minutos = entrada.Duracion is > 0
                ? entrada.Duracion.Value
                : DuracionPorGenero(entrada.Genero);

            var cancion = new Cancion(
                entrada.Titulo, entrada.Artista, entrada.Genero, minutos);
            cola.Encolar(cancion);
            biblioteca.Insertar(cancion);
        }
    }

    private static int DuracionPorGenero(string genero) =>
        genero.Trim().ToLowerInvariant() switch
        {
            "pop" => 3,
            "rock" => 4,
            "jazz" => 5,
            "clásica" or "clasica" => 8,
            _ => throw new InvalidDataException("Género no permitido")
        };
}`,
  },
  {
    id: "graphviz",
    label: "GraphvizService.cs",
    note: "Después de cada cambio se reescribe DOT, se ejecuta dot y se refresca la imagen en la vista.",
    language: "csharp",
    code: `using System.Diagnostics;
using System.Text;

public static class GraphvizService
{
    public static string CrearDotCola(ColaReproduccion cola)
    {
        var dot = new StringBuilder("digraph Cola { rankdir=LR; node [shape=box];");
        NodoCola? actual = cola.Frente;
        int i = 0;
        while (actual is not null)
        {
            dot.AppendLine($"n{i} [label=\"{Escapar(actual.Valor.Titulo)}\"];");
            if (actual.Siguiente is not null) dot.AppendLine($"n{i} -> n{i + 1};");
            actual = actual.Siguiente;
            i++;
        }
        return dot.AppendLine("}").ToString();
    }

    public static void Renderizar(string dot, string nombre)
    {
        Directory.CreateDirectory("Reportes");
        string rutaDot = Path.Combine("Reportes", $"{nombre}.dot");
        string rutaPng = Path.Combine("Reportes", $"{nombre}.png");
        File.WriteAllText(rutaDot, dot);

        using var proceso = Process.Start(new ProcessStartInfo
        {
            FileName = "dot",
            Arguments = $"-Tpng \"{rutaDot}\" -o \"{rutaPng}\"",
            UseShellExecute = false,
            CreateNoWindow = true
        });
        proceso?.WaitForExit();
        if (proceso?.ExitCode != 0) throw new Exception("Graphviz no pudo renderizar");
    }

    private static string Escapar(string texto) =>
        texto.Replace("\\", "\\\\").Replace("\"", "\\\"");
}`,
  },
  {
    id: "vista",
    label: "MainForm.cs",
    note: "Los controles solo coordinan acciones. La fuente de verdad sigue siendo ColaReproduccion y ArbolCanciones.",
    language: "csharp",
    code: `public partial class MainForm : Form
{
    private readonly ColaReproduccion _cola = new();
    private readonly ArbolCanciones _biblioteca = new();

    public MainForm()
    {
        InitializeComponent();
        CargadorCanciones.Cargar("Datos/canciones.json", _cola, _biblioteca);
        ActualizarVista();
    }

    private void btnReproducir_Click(object sender, EventArgs e)
    {
        Cancion? cancion = _cola.Desencolar();
        lblReproduciendo.Text = cancion is null
            ? "No hay canciones en espera"
            : $"Reproduciendo: {cancion.Titulo} — {cancion.Artista}";
        ActualizarVista();
    }

    private void btnBuscar_Click(object sender, EventArgs e)
    {
        Cancion? resultado = _biblioteca.Buscar(txtBuscar.Text);
        lblResultado.Text = resultado is null
            ? "Canción no encontrada"
            : $"{resultado.Titulo} · {resultado.Artista} · {resultado.Genero}";
    }

    private void ActualizarVista()
    {
        lblTiempoTotal.Text = $"{_cola.CalcularDuracionTotal()} min";
        GraphvizService.Renderizar(
            GraphvizService.CrearDotCola(_cola), "cola");
        picCola.ImageLocation = Path.GetFullPath("Reportes/cola.png");
        picCola.Refresh();
    }
}`,
  },
] as const

export const GRADE_ROWS: GradeRow[] = [
  { criterio: "Implementación de Cola", puntos: 10, group: true },
  { criterio: "Estructura cola correcta, sin estructuras nativas de C#", puntos: 10 },
  { criterio: "Implementación de Árbol Binario", puntos: 10, group: true },
  { criterio: "ABB por título, sin estructuras nativas de C#", puntos: 10 },
  { criterio: "Implementación de Windows Forms", puntos: 10, group: true },
  { criterio: "Interfaz gráfica funcional y amigable", puntos: 10 },
  { criterio: "Implementación Graphviz", puntos: 10, group: true },
  { criterio: "Representación gráfica de la cola y el árbol binario", puntos: 10 },
  { criterio: "Funcionalidad del Sistema", puntos: 55, group: true },
  { criterio: "Carga desde JSON y construcción de cola y árbol", detalle: "Título, artista, género y duración", puntos: 10 },
  { criterio: "Agregar canciones en el orden en que fueron añadidas", puntos: 5 },
  { criterio: "Reproducir: extraer la primera canción y mostrar sus datos", puntos: 10 },
  { criterio: "Manejo de cola vacía", puntos: 5 },
  { criterio: "Búsqueda por título utilizando el árbol binario", puntos: 15 },
  { criterio: "Cálculo del tiempo total estimado de la cola", puntos: 10 },
  { criterio: "Preguntas", puntos: 5, group: true },
  { criterio: "Comprensión y autoría de la práctica", puntos: 5 },
]

export const QUEUE_DOT = `digraph Cola {
  rankdir=LR;
  graph [bgcolor="transparent"];
  node [shape=box, style="rounded,filled", fillcolor="#18181B", color="#006FEE"];
  frente [shape=plaintext, label="FRENTE"];
  n0 [label="Here Comes The Sun\\n3 min"];
  n1 [label="Whole Lotta Love\\n5 min"];
  n2 [label="Comfortably Numb\\n6 min"];
  frente -> n0;
  n0 -> n1 -> n2;
}`

export const TREE_DOT = `digraph Biblioteca {
  node [shape=ellipse, style=filled, fillcolor="#18181B", color="#F31260"];
  "Here Comes The Sun" -> "Comfortably Numb";
  "Here Comes The Sun" -> "Whole Lotta Love";
  "Comfortably Numb" -> "Ace of Spades";
  "Comfortably Numb" -> "(Don't Fear) The Reaper";
  "Whole Lotta Love" -> "I Wanna Be Sedated";
  "I Wanna Be Sedated" -> "Layla";
  "Layla" -> "Stairway to Heaven";
  "Stairway to Heaven" -> "Space Oddity";
}`
