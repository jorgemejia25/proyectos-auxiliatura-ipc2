export const SAMPLE_RTU = `[
  {"NIT": "7378106", "nombre": "Empresa ABC, S.A."},
  {"NIT": "8338817", "nombre": "Comercial XYZ, S.A."},
  {"NIT": "5123456", "nombre": "Servicios Integrales del Norte"},
  {"NIT": "1234560", "nombre": "Distribuidora Maya"},
  {"NIT": "1000002K", "nombre": "Importadora Quetzal"}
]`

export const SAMPLE_AUTORIZACIONES = `[
  {"TIEMPO": "Guatemala, 15/01/2025 15:25 hrs.", "REFERENCIA": "A1990",
   "NIT_EMISOR": "7378106", "NIT_RECEPTOR": "8338817",
   "VALOR": 100.00, "IVA": 12.00, "TOTAL": 112.00},
  {"TIEMPO": "Guatemala, 15/01/2025 15:25 hrs.", "REFERENCIA": "A1991",
   "NIT_EMISOR": "7378106", "NIT_RECEPTOR": "8338817",
   "VALOR": 200.00, "IVA": 24.00, "TOTAL": 224.00},
  {"TIEMPO": "Guatemala, 15/01/2025 16:10 hrs.", "REFERENCIA": "A1992",
   "NIT_EMISOR": "5123456", "NIT_RECEPTOR": "8338817",
   "VALOR": 50.00, "IVA": 6.00, "TOTAL": 56.00},
  {"TIEMPO": "Guatemala, 15/01/2025 17:00 hrs.", "REFERENCIA": "A1993",
   "NIT_EMISOR": "7378106", "NIT_RECEPTOR": "98765434",
   "VALOR": 75.00, "IVA": 9.00, "TOTAL": 84.00},
  {"TIEMPO": "Guatemala, 15/01/2025 18:45 hrs.", "REFERENCIA": "A1994",
   "NIT_EMISOR": "8338817", "NIT_RECEPTOR": "1234560",
   "VALOR": 150.00, "IVA": 15.00, "TOTAL": 165.00},
  {"TIEMPO": "Guatemala, 16/01/2025 08:00 hrs.", "REFERENCIA": "A1990",
   "NIT_EMISOR": "7378106", "NIT_RECEPTOR": "8338817",
   "VALOR": 100.00, "IVA": 12.00, "TOTAL": 112.00},
  {"TIEMPO": "Ciudad de Guatemala, 16/01/2025 09:05 hrs.", "REFERENCIA": "A1995",
   "NIT_EMISOR": "1234560", "NIT_RECEPTOR": "7378106",
   "VALOR": 350.50, "IVA": 42.06, "TOTAL": 392.56},
  {"TIEMPO": "Guatemala, 16/01/2025 11:30 hrs.", "REFERENCIA": "A1996",
   "NIT_EMISOR": "1000002K", "NIT_RECEPTOR": "8338817",
   "VALOR": 80.00, "IVA": 9.60, "TOTAL": 89.70},
  {"TIEMPO": "Guatemala, 16/01/2025 14:15 hrs.", "REFERENCIA": "A1997",
   "NIT_EMISOR": "8338817", "NIT_RECEPTOR": "1000002K",
   "VALOR": 1250.00, "IVA": 150.00, "TOTAL": 1400.00},
  {"TIEMPO": "Guatemala, 16/01/2025 19:40 hrs.", "REFERENCIA": "A1998",
   "NIT_EMISOR": "44556675", "NIT_RECEPTOR": "7378106",
   "VALOR": 40.00, "IVA": 4.80, "TOTAL": 44.80}
]`

export const ENDPOINTS = [
  { method: "POST", path: "/api/Procesar", body: "JSON RTU o autorizaciones", returns: "Respuesta RTU o resultadoAutorizaciones", use: "Enviar mensaje" },
  { method: "GET", path: "/api/ConsultaDatos?nit=7378106&tipo=emitidas&desde=2025-01-15&hasta=2025-01-16", body: "—", returns: "Por fecha: cantidad y monto; total del rango", use: "Consultar contribuyente" },
  { method: "GET", path: "/api/ResumenIva?fecha=2025-01-15", body: "—", returns: "Por NIT: IVA emitido e IVA recibido", use: "Resumen de IVA" },
  { method: "GET", path: "/api/ResumenRango?desde=2025-01-15&hasta=2025-01-16&tipo=total", body: "—", returns: "Por fecha: valor total o sin IVA", use: "Resumen por rango" },
  { method: "GET", path: "/api/Grafica?tipo=iva&fecha=2025-01-15", body: "—", returns: "{ etiquetas[], series[] } para la gráfica", use: "Gráfica" },
  { method: "GET", path: "/api/ReporteErrores?desde=2025-01-15&hasta=2025-01-16", body: "—", returns: "Reporte por fecha con conteo de errores", use: "Reporte / PDF" },
  { method: "POST", path: "/api/Inicializar", body: "—", returns: "{ \"mensaje\": \"Sistema inicializado\" }", use: "Opción inicializar" },
] as const

export const PROJECT_TREE = `IPC2_Proy03_202602_#Carnet/
├─ Backend/SatApi/                ← ASP.NET Core Web API
│  ├─ Program.cs
│  ├─ Controllers/
│  │  └─ SatController.cs
│  ├─ Dominio/
│  │  ├─ ValidadorNit.cs
│  │  ├─ ExtractorTiempo.cs
│  │  ├─ Factura.cs
│  │  └─ TipoError.cs
│  ├─ Dtos/
│  │  ├─ ContribuyenteDto.cs
│  │  ├─ SolicitudAutorizacionDto.cs
│  │  └─ Respuestas.cs
│  ├─ Servicios/
│  │  ├─ ServicioRtu.cs
│  │  ├─ ServicioAutorizacion.cs
│  │  └─ ServicioReportes.cs
│  ├─ Datos/
│  │  └─ Repositorio.cs
│  └─ Almacen/                    ← persistencia
│     ├─ rtu.json
│     ├─ facturas.json
│     └─ correlativos.json
├─ Frontend/SatWeb/               ← Razor Pages
│  ├─ Program.cs
│  ├─ Pages/
│  │  ├─ Index.cshtml
│  │  ├─ EnviarMensaje.cshtml(.cs)
│  │  ├─ Peticiones/
│  │  │  ├─ Contribuyente.cshtml(.cs)
│  │  │  ├─ ResumenIva.cshtml(.cs)
│  │  │  └─ ResumenRango.cshtml(.cs)
│  │  └─ Ayuda/
│  │     ├─ Estudiante.cshtml
│  │     └─ Documentacion.cshtml
│  └─ wwwroot/js/graficas.js
├─ Documentacion/                 ← ensayo + diagramas
└─ README.md`

export const CODE_EXAMPLES = [
  {
    id: "nit",
    label: "ValidadorNit.cs",
    note: "La posición 1 es el verificador (carácter más a la derecha). Por eso el primer dígito del cuerpo se multiplica por 2. Si el resultado es 10, el verificador es K.",
    code: `using System.Text.RegularExpressions;

namespace SatApi.Dominio;

public static class ValidadorNit
{
    // 1 a 20 dígitos + verificador (0-9 o K)
    private static readonly Regex Formato = new(@"^(\\d{1,20})([0-9K])$", RegexOptions.Compiled);

    public static string Normalizar(string? nit) =>
        (nit ?? "").Trim().Replace("-", "").ToUpperInvariant();

    public static bool EsValido(string? nit)
    {
        Match m = Formato.Match(Normalizar(nit));
        if (!m.Success) return false;
        return CalcularVerificador(m.Groups[1].Value) == m.Groups[2].Value[0];
    }

    public static char CalcularVerificador(string cuerpo)
    {
        int suma = 0;
        int posicion = 2; // la posición 1 es el verificador
        for (int i = cuerpo.Length - 1; i >= 0; i--)
        {
            suma += (cuerpo[i] - '0') * posicion;
            posicion++;
        }
        int resultado = (11 - (suma % 11)) % 11;
        return resultado == 10 ? 'K' : (char)('0' + resultado);
    }
}`,
  },
  {
    id: "tiempo",
    label: "ExtractorTiempo.cs",
    note: "TIEMPO trae texto extra (lugar, \"hrs.\"). La regex extrae solo fecha y hora; el resto se descarta y no es error.",
    code: `using System.Text.RegularExpressions;

namespace SatApi.Dominio;

public static class ExtractorTiempo
{
    private static readonly Regex Patron = new(
        @"(?<dia>\\d{1,2})/(?<mes>\\d{1,2})/(?<anio>\\d{4})\\s+(?<hora>\\d{1,2}):(?<min>\\d{2})",
        RegexOptions.Compiled);

    public static DateTime? Extraer(string? texto)
    {
        Match m = Patron.Match(texto ?? "");
        if (!m.Success) return null;
        try
        {
            return new DateTime(
                int.Parse(m.Groups["anio"].Value),
                int.Parse(m.Groups["mes"].Value),
                int.Parse(m.Groups["dia"].Value),
                int.Parse(m.Groups["hora"].Value),   // 0..23, si no lanza excepción
                int.Parse(m.Groups["min"].Value),
                0);
        }
        catch (ArgumentOutOfRangeException)
        {
            return null; // 31/02, 24:00, etc.
        }
    }
}

// "Guatemala, 15/01/2025 15:25 hrs."  → 2025-01-15 15:25
// "Ciudad de Guatemala, 16/01/2025 09:05 hrs." → 2025-01-16 09:05`,
  },
  {
    id: "dtos",
    label: "Dtos + Factura.cs",
    note: "Los nombres JSON no se pueden cambiar: use [JsonPropertyName] con el texto exacto del enunciado. Use decimal para dinero, nunca double.",
    code: `using System.Text.Json.Serialization;

namespace SatApi.Dtos;

public sealed class ContribuyenteDto
{
    [JsonPropertyName("NIT")] public string Nit { get; set; } = "";
    [JsonPropertyName("nombre")] public string Nombre { get; set; } = "";
}

public sealed class SolicitudAutorizacionDto
{
    [JsonPropertyName("TIEMPO")] public string Tiempo { get; set; } = "";
    [JsonPropertyName("REFERENCIA")] public string Referencia { get; set; } = "";
    [JsonPropertyName("NIT_EMISOR")] public string NitEmisor { get; set; } = "";
    [JsonPropertyName("NIT_RECEPTOR")] public string NitReceptor { get; set; } = "";
    [JsonPropertyName("VALOR")] public decimal Valor { get; set; }
    [JsonPropertyName("IVA")] public decimal Iva { get; set; }
    [JsonPropertyName("TOTAL")] public decimal Total { get; set; }
}

public sealed class RespuestaRtu
{
    [JsonPropertyName("CONTRIBUYENTES_NUEVOS")] public int Nuevos { get; set; }
    [JsonPropertyName("CONTRIBUYENTES_ACTUALIZADOS")] public int Actualizados { get; set; }
    [JsonPropertyName("NITS_INVALIDOS")] public int Invalidos { get; set; }
}

public sealed class Aprobacion
{
    [JsonPropertyName("referencia")] public string Referencia { get; set; } = "";
    [JsonPropertyName("codigoAprobacion")] public long CodigoAprobacion { get; set; }
}

public sealed class ResultadoAutorizaciones
{
    [JsonPropertyName("cantidadAutorizacionesAprobadas")] public int Aprobadas { get; set; }
    [JsonPropertyName("cantidadAutorizacionesRechazadasPorNitEmisorInexistente")] public int EmisorInexistente { get; set; }
    [JsonPropertyName("cantidadAutorizacionesRechazadasPorNitReceptorInexistente")] public int ReceptorInexistente { get; set; }
    [JsonPropertyName("detalleAprobaciones")] public List<Aprobacion> Detalle { get; set; } = new();
}

public sealed class RespuestaAutorizaciones
{
    [JsonPropertyName("resultadoAutorizaciones")] public ResultadoAutorizaciones Resultado { get; set; } = new();
}

// ── Dominio/Factura.cs ──
namespace SatApi.Dominio;

public enum TipoError
{
    NitEmisorInvalido, NitReceptorInvalido,
    NitEmisorInexistente, NitReceptorInexistente,
    IvaMalCalculado, TotalMalCalculado,
    ReferenciaDuplicada, TiempoInvalido
}

public sealed class Factura
{
    public string Referencia { get; set; } = "";
    public DateTime Fecha { get; set; }
    public string NitEmisor { get; set; } = "";
    public string NitReceptor { get; set; } = "";
    public decimal Valor { get; set; }
    public decimal Iva { get; set; }
    public decimal Total { get; set; }
    public long? CodigoAprobacion { get; set; }
    public List<TipoError> Errores { get; set; } = new();
    public bool Aprobada => Errores.Count == 0;
}`,
  },
  {
    id: "servicio",
    label: "ServicioAutorizacion.cs",
    note: "Se guardan aprobadas y rechazadas: el reporte de errores las necesita. El correlativo usa la fecha del servidor y reinicia en 1 cada día.",
    code: `using SatApi.Datos;
using SatApi.Dominio;
using SatApi.Dtos;

namespace SatApi.Servicios;

public sealed class ServicioAutorizacion
{
    private readonly Repositorio _repo;
    public ServicioAutorizacion(Repositorio repo) => _repo = repo;

    public RespuestaAutorizaciones Procesar(List<SolicitudAutorizacionDto> solicitudes, DateTime ahora)
    {
        var respuesta = new RespuestaAutorizaciones();
        var r = respuesta.Resultado;

        lock (_repo.Candado)
        {
            foreach (SolicitudAutorizacionDto s in solicitudes)
            {
                DateTime? fecha = ExtractorTiempo.Extraer(s.Tiempo);
                var factura = new Factura
                {
                    Referencia = s.Referencia.Trim(),
                    Fecha = fecha ?? DateTime.MinValue,
                    NitEmisor = ValidadorNit.Normalizar(s.NitEmisor),
                    NitReceptor = ValidadorNit.Normalizar(s.NitReceptor),
                    Valor = s.Valor, Iva = s.Iva, Total = s.Total
                };
                if (fecha is null) factura.Errores.Add(TipoError.TiempoInvalido);
                Validar(factura);

                if (factura.Aprobada)
                {
                    factura.CodigoAprobacion = _repo.SiguienteCodigo(ahora);
                    r.Aprobadas++;
                    r.Detalle.Add(new Aprobacion
                    {
                        Referencia = factura.Referencia,
                        CodigoAprobacion = factura.CodigoAprobacion.Value
                    });
                }
                if (factura.Errores.Contains(TipoError.NitEmisorInexistente)) r.EmisorInexistente++;
                if (factura.Errores.Contains(TipoError.NitReceptorInexistente)) r.ReceptorInexistente++;

                _repo.Facturas.Add(factura);
            }
            _repo.Guardar();
        }
        return respuesta;
    }

    private void Validar(Factura f)
    {
        if (!ValidadorNit.EsValido(f.NitEmisor)) f.Errores.Add(TipoError.NitEmisorInvalido);
        else if (!_repo.Rtu.ContainsKey(f.NitEmisor)) f.Errores.Add(TipoError.NitEmisorInexistente);

        if (!ValidadorNit.EsValido(f.NitReceptor)) f.Errores.Add(TipoError.NitReceptorInvalido);
        else if (!_repo.Rtu.ContainsKey(f.NitReceptor)) f.Errores.Add(TipoError.NitReceptorInexistente);

        // decimal, no double: la comparación exacta con double falla.
        decimal ivaEsperado = Math.Round(f.Valor * 0.12m, 2, MidpointRounding.AwayFromZero);
        if (f.Iva != ivaEsperado) f.Errores.Add(TipoError.IvaMalCalculado);
        if (f.Total != f.Valor + ivaEsperado) f.Errores.Add(TipoError.TotalMalCalculado);

        if (_repo.Facturas.Any(x => x.Aprobada && x.Referencia == f.Referencia))
            f.Errores.Add(TipoError.ReferenciaDuplicada);
    }
}`,
  },
  {
    id: "repo",
    label: "Repositorio.cs",
    note: "Capa de datos: todo vive en memoria y se escribe a archivos JSON después de cada cambio. Al iniciar la API se vuelve a leer. Regístrelo como Singleton.",
    code: `using System.Text.Json;
using System.Text.Json.Serialization;
using SatApi.Dominio;

namespace SatApi.Datos;

public sealed class Repositorio
{
    private static readonly JsonSerializerOptions Opciones = new()
    {
        WriteIndented = true,
        Converters = { new JsonStringEnumConverter() }
    };

    private readonly string _carpeta;
    public object Candado { get; } = new();

    public Dictionary<string, string> Rtu { get; private set; } = new();          // NIT → nombre
    public List<Factura> Facturas { get; private set; } = new();
    public Dictionary<string, int> Correlativos { get; private set; } = new();    // yyyyMMdd → último

    public Repositorio(IWebHostEnvironment env)
    {
        _carpeta = Path.Combine(env.ContentRootPath, "Almacen");
        Directory.CreateDirectory(_carpeta);
        Rtu = Leer<Dictionary<string, string>>("rtu.json");
        Facturas = Leer<List<Factura>>("facturas.json");
        Correlativos = Leer<Dictionary<string, int>>("correlativos.json");
    }

    public long SiguienteCodigo(DateTime ahora)
    {
        string dia = ahora.ToString("yyyyMMdd");
        int n = Correlativos.GetValueOrDefault(dia) + 1;
        Correlativos[dia] = n;
        return long.Parse(dia + n.ToString("D8"));   // 2026092100000001
    }

    public void Guardar()
    {
        Escribir("rtu.json", Rtu);
        Escribir("facturas.json", Facturas);
        Escribir("correlativos.json", Correlativos);
    }

    public void Inicializar()
    {
        lock (Candado)
        {
            Rtu.Clear(); Facturas.Clear(); Correlativos.Clear();
            Guardar();
        }
    }

    private void Escribir<T>(string archivo, T datos) =>
        File.WriteAllText(Path.Combine(_carpeta, archivo), JsonSerializer.Serialize(datos, Opciones));

    private T Leer<T>(string archivo) where T : new()
    {
        string ruta = Path.Combine(_carpeta, archivo);
        return File.Exists(ruta)
            ? JsonSerializer.Deserialize<T>(File.ReadAllText(ruta), Opciones) ?? new T()
            : new T();
    }
}

// ── Servicios/ServicioRtu.cs ──
public sealed class ServicioRtu
{
    private readonly Repositorio _repo;
    public ServicioRtu(Repositorio repo) => _repo = repo;

    public RespuestaRtu Actualizar(List<ContribuyenteDto> lista)
    {
        var r = new RespuestaRtu();
        lock (_repo.Candado)
        {
            foreach (ContribuyenteDto c in lista)
            {
                string nit = ValidadorNit.Normalizar(c.Nit);
                if (!ValidadorNit.EsValido(nit)) { r.Invalidos++; continue; }   // no afecta el RTU
                if (_repo.Rtu.ContainsKey(nit)) r.Actualizados++; else r.Nuevos++;
                _repo.Rtu[nit] = c.Nombre.Trim();
            }
            _repo.Guardar();
        }
        return r;
    }
}`,
  },
  {
    id: "controller",
    label: "SatController.cs",
    note: "Un solo POST /Procesar detecta el tipo de mensaje: si el primer objeto trae \"nombre\" es RTU; si no, son autorizaciones. Las fechas de consulta llegan como yyyy-MM-dd.",
    code: `using System.Text.Json;
using Microsoft.AspNetCore.Mvc;
using SatApi.Datos;
using SatApi.Dtos;
using SatApi.Servicios;

namespace SatApi.Controllers;

[ApiController]
[Route("api")]
public sealed class SatController : ControllerBase
{
    private readonly Repositorio _repo;
    private readonly ServicioRtu _rtu;
    private readonly ServicioAutorizacion _autorizacion;
    private readonly ServicioReportes _reportes;

    public SatController(Repositorio repo, ServicioRtu rtu,
        ServicioAutorizacion autorizacion, ServicioReportes reportes)
    {
        _repo = repo; _rtu = rtu; _autorizacion = autorizacion; _reportes = reportes;
    }

    [HttpPost("Procesar")]
    public IActionResult Procesar([FromBody] JsonElement cuerpo)
    {
        if (cuerpo.ValueKind != JsonValueKind.Array)
            return BadRequest(new { error = "El mensaje debe ser un arreglo JSON." });

        JsonElement primero = cuerpo.EnumerateArray().FirstOrDefault();
        bool esRtu = primero.ValueKind == JsonValueKind.Object && primero.TryGetProperty("nombre", out _);

        if (esRtu)
            return Ok(_rtu.Actualizar(cuerpo.Deserialize<List<ContribuyenteDto>>()!));

        return Ok(_autorizacion.Procesar(
            cuerpo.Deserialize<List<SolicitudAutorizacionDto>>()!, DateTime.Now));
    }

    [HttpGet("ConsultaDatos")]
    public IActionResult ConsultaDatos(string nit, string tipo, DateTime desde, DateTime hasta) =>
        Ok(_reportes.Contribuyente(nit, tipo == "emitidas", desde, hasta));

    [HttpGet("ResumenIva")]
    public IActionResult ResumenIva(DateTime fecha) => Ok(_reportes.ResumenIva(fecha));

    [HttpGet("ResumenRango")]
    public IActionResult ResumenRango(DateTime desde, DateTime hasta, string tipo = "total") =>
        Ok(_reportes.ResumenRango(desde, hasta, tipo == "total"));

    [HttpGet("ReporteErrores")]
    public IActionResult ReporteErrores(DateTime desde, DateTime hasta) =>
        Ok(_reportes.Errores(desde, hasta));

    [HttpPost("Inicializar")]
    public IActionResult Inicializar()
    {
        _repo.Inicializar();
        return Ok(new { mensaje = "Sistema inicializado" });
    }
}

// ── Program.cs (Backend) ──
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddSingleton<Repositorio>();
builder.Services.AddSingleton<ServicioRtu>();
builder.Services.AddSingleton<ServicioAutorizacion>();
builder.Services.AddSingleton<ServicioReportes>();
var app = builder.Build();
app.MapControllers();
app.Run();`,
  },
  {
    id: "reportes",
    label: "ServicioReportes.cs",
    note: "Las consultas solo usan facturas aprobadas. El reporte de errores usa todas las recibidas. En este proyecto sí puede usar List, Dictionary y LINQ.",
    code: `using SatApi.Datos;
using SatApi.Dominio;

namespace SatApi.Servicios;

public sealed class ServicioReportes
{
    private readonly Repositorio _repo;
    public ServicioReportes(Repositorio repo) => _repo = repo;

    private IEnumerable<Factura> Aprobadas(DateTime desde, DateTime hasta) =>
        _repo.Facturas.Where(f => f.Aprobada && f.Fecha.Date >= desde.Date && f.Fecha.Date <= hasta.Date);

    public object Contribuyente(string nit, bool emitidas, DateTime desde, DateTime hasta)
    {
        nit = ValidadorNit.Normalizar(nit);
        var porFecha = Aprobadas(desde, hasta)
            .Where(f => (emitidas ? f.NitEmisor : f.NitReceptor) == nit)
            .GroupBy(f => f.Fecha.Date)
            .OrderBy(g => g.Key)
            .Select(g => new { fecha = g.Key.ToString("dd/MM/yyyy"), cantidad = g.Count(), monto = g.Sum(f => f.Total) })
            .ToList();
        return new { nit, detalle = porFecha, totalRango = porFecha.Sum(x => x.monto) };
    }

    public object ResumenIva(DateTime fecha)
    {
        var dia = Aprobadas(fecha, fecha).ToList();
        var nits = dia.Select(f => f.NitEmisor).Concat(dia.Select(f => f.NitReceptor)).Distinct().OrderBy(n => n);
        return nits.Select(nit => new
        {
            nit,
            nombre = _repo.Rtu.GetValueOrDefault(nit, ""),
            ivaEmitido = dia.Where(f => f.NitEmisor == nit).Sum(f => f.Iva),
            ivaRecibido = dia.Where(f => f.NitReceptor == nit).Sum(f => f.Iva)
        });
    }

    public object ResumenRango(DateTime desde, DateTime hasta, bool total) =>
        Aprobadas(desde, hasta)
            .GroupBy(f => f.Fecha.Date)
            .OrderBy(g => g.Key)
            .Select(g => new { fecha = g.Key.ToString("dd/MM/yyyy"), valor = g.Sum(f => total ? f.Total : f.Valor) });

    public object Errores(DateTime desde, DateTime hasta) =>
        _repo.Facturas
            .Where(f => f.Fecha.Date >= desde.Date && f.Fecha.Date <= hasta.Date)
            .GroupBy(f => f.Fecha.Date)
            .OrderBy(g => g.Key)
            .Select(g => new
            {
                fecha = g.Key.ToString("dd/MM/yyyy"),
                recibidas = g.Count(),
                errores = Enum.GetValues<TipoError>()
                    .Where(e => e != TipoError.TiempoInvalido)
                    .ToDictionary(e => e.ToString(), e => g.Count(f => f.Errores.Contains(e))),
                sinErrores = g.Count(f => f.Aprobada),
                emisores = g.Select(f => f.NitEmisor).Distinct().Count(),
                receptores = g.Select(f => f.NitReceptor).Distinct().Count()
            });
}`,
  },
  {
    id: "razor",
    label: "EnviarMensaje (Razor)",
    note: "El frontend no valida nada: lee el .json, lo envía con HttpClient a la API y muestra entrada y respuesta. La URL de la API va en appsettings.json.",
    code: `// ── Frontend/SatWeb/Program.cs ──
var builder = WebApplication.CreateBuilder(args);
builder.Services.AddRazorPages();
builder.Services.AddHttpClient("Sat", c =>
    c.BaseAddress = new Uri(builder.Configuration["Api:Url"]!)); // "http://localhost:5000/"
var app = builder.Build();
app.UseStaticFiles();
app.MapRazorPages();
app.Run();

// ── Pages/EnviarMensaje.cshtml.cs ──
using System.Text;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;

public sealed class EnviarMensajeModel : PageModel
{
    private readonly HttpClient _api;
    public EnviarMensajeModel(IHttpClientFactory fabrica) => _api = fabrica.CreateClient("Sat");

    [BindProperty] public IFormFile? Archivo { get; set; }
    public string? Entrada { get; private set; }
    public string? Respuesta { get; private set; }

    public async Task<IActionResult> OnPostAsync()
    {
        if (Archivo is null || !Archivo.FileName.EndsWith(".json", StringComparison.OrdinalIgnoreCase))
        {
            ModelState.AddModelError(nameof(Archivo), "Seleccione un archivo .json");
            return Page();
        }

        using var lector = new StreamReader(Archivo.OpenReadStream());
        Entrada = await lector.ReadToEndAsync();

        using var contenido = new StringContent(Entrada, Encoding.UTF8, "application/json");
        HttpResponseMessage r = await _api.PostAsync("api/Procesar", contenido);
        Respuesta = await r.Content.ReadAsStringAsync();
        return Page();
    }
}

@* ── Pages/EnviarMensaje.cshtml ── *@
@page
@model EnviarMensajeModel
<form method="post" enctype="multipart/form-data">
    <input type="file" asp-for="Archivo" accept=".json" />
    <span asp-validation-for="Archivo"></span>
    <button type="submit">Enviar</button>
</form>
<div class="columnas">
    <textarea readonly>@Model.Entrada</textarea>
    <textarea readonly>@Model.Respuesta</textarea>
</div>`,
  },
] as const
