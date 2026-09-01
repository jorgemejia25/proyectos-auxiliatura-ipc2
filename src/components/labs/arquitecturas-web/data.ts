import type { LucideIcon } from "lucide-react"
import {
  BlocksIcon,
  BoxIcon,
  BracesIcon,
  CloudIcon,
  Code2Icon,
  FileCode2Icon,
  Globe2Icon,
  Layers3Icon,
  NetworkIcon,
  PaletteIcon,
  ServerIcon,
} from "lucide-react"

export type Lesson = {
  number: number
  unit: string
  title: string
  summary: string
  goals: string[]
  concepts: { term: string; detail: string }[]
  practice: string
  icon: LucideIcon
}

export const lessons: Lesson[] = [
  {
    number: 1,
    unit: "Arquitecturas",
    title: "Arquitectura de despliegue",
    summary: "Proceso de instalación y ejecución de artefactos en infraestructura.",
    goals: ["Distinguir diseño lógico y despliegue físico", "Reconocer artefactos, nodos y conexiones", "Documentar decisiones técnicas"],
    concepts: [
      { term: "Arquitectura", detail: "Organización de componentes, responsabilidades, restricciones y relaciones de un sistema." },
      { term: "Despliegue", detail: "Proceso y resultado de instalar artefactos ejecutables en nodos de infraestructura." },
      { term: "Artefacto", detail: "Archivo que se publica: ejecutable, biblioteca, contenedor, paquete o recurso estático." },
    ],
    practice: "Dibuja el recorrido físico de una petición desde tu navegador hasta la base de datos.",
    icon: NetworkIcon,
  },
  {
    number: 2,
    unit: "UML",
    title: "Diagrama de componentes",
    summary: "Representación lógica de componentes, interfaces y dependencias.",
    goals: ["Modelar componentes reemplazables", "Usar dependencias e interfaces", "Evitar mezclar infraestructura con lógica"],
    concepts: [
      { term: "Componente", detail: "Unidad modular reemplazable que encapsula una implementación." },
      { term: "Interfaz provista", detail: "Contrato que un componente ofrece a otros componentes." },
      { term: "Dependencia", detail: "Relación en la que un elemento necesita a otro para cumplir su función." },
    ],
    practice: "Modela una tienda con Frontend, API de Pedidos, Servicio de Inventario y Repositorio SQL.",
    icon: BlocksIcon,
  },
  {
    number: 3,
    unit: "UML",
    title: "Diagrama de despliegue",
    summary: "Representación física de nodos, artefactos y conexiones.",
    goals: ["Diferenciar nodo, dispositivo y entorno", "Asignar artefactos a nodos", "Rotular protocolos y puertos"],
    concepts: [
      { term: "Nodo", detail: "Recurso computacional capaz de alojar o ejecutar artefactos." },
      { term: "Entorno de ejecución", detail: "Software que ejecuta otros artefactos, por ejemplo Node.js o .NET." },
      { term: "Communication path", detail: "Enlace físico o lógico entre nodos, rotulado con su protocolo." },
    ],
    practice: "Ubica navegador, bundle web, API y base de datos en nodos separados y rotula HTTPS/TCP.",
    icon: ServerIcon,
  },
  {
    number: 4,
    unit: "Despliegue",
    title: "Arquitectura stand-alone",
    summary: "Aplicación, lógica y datos residen en el mismo equipo del usuario.",
    goals: ["Identificar beneficios offline", "Reconocer límites de actualización", "Diseñar almacenamiento local"],
    concepts: [
      { term: "Ejecución local", detail: "La aplicación no depende de un servidor remoto para su función principal." },
      { term: "Persistencia local", detail: "Datos guardados en archivos o una base embebida como SQLite." },
      { term: "Distribución", detail: "Instaladores o paquetes deben llegar y actualizarse en cada equipo." },
    ],
    practice: "Diseña un sistema de inventario offline para una bodega sin conectividad estable.",
    icon: BoxIcon,
  },
  {
    number: 5,
    unit: "Despliegue",
    title: "Cliente-servidor web",
    summary: "El navegador solicita recursos y servicios a un servidor central mediante HTTP.",
    goals: ["Seguir petición y respuesta", "Separar cliente y servidor", "Comprender estado, sesión y API"],
    concepts: [
      { term: "Cliente", detail: "Inicia solicitudes y presenta la interfaz; normalmente es el navegador." },
      { term: "Servidor", detail: "Escucha solicitudes, aplica reglas y produce respuestas." },
      { term: "Endpoint", detail: "Combinación de método y ruta que expone una operación, por ejemplo GET /api/productos." },
    ],
    practice: "Inspecciona una petición GET y registra método, URL, estado, encabezados y cuerpo.",
    icon: Globe2Icon,
  },
  {
    number: 6,
    unit: "Despliegue",
    title: "Arquitectura N-capas",
    summary: "Presentación, negocio, acceso a datos y persistencia evolucionan con responsabilidades claras.",
    goals: ["Separar responsabilidades", "Comparar capas lógicas y tiers físicos", "Controlar dependencias"],
    concepts: [
      { term: "Capa", detail: "Separación lógica del código por responsabilidad." },
      { term: "Tier", detail: "Separación física o de proceso durante el despliegue." },
      { term: "Regla de dependencia", detail: "Una capa conoce contratos definidos, no detalles internos de infraestructura." },
    ],
    practice: "Clasifica controlador, servicio, repositorio y tabla en su capa correcta.",
    icon: Layers3Icon,
  },
  {
    number: 7,
    unit: "Despliegue",
    title: "Arquitectura cloud",
    summary: "Servicios administrados, elasticidad, automatización y pago según uso.",
    goals: ["Diferenciar IaaS, PaaS y SaaS", "Diseñar para fallos", "Evaluar costo, seguridad y escalado"],
    concepts: [
      { term: "Elasticidad", detail: "Capacidad de aumentar o reducir recursos según la demanda." },
      { term: "Región y zona", detail: "Ubicaciones aisladas usadas para reducir latencia y tolerar fallos." },
      { term: "Servicio administrado", detail: "El proveedor opera parte de la infraestructura y sus tareas repetitivas." },
    ],
    practice: "Convierte el diseño N-capas en servicios cloud y elimina puntos únicos de fallo.",
    icon: CloudIcon,
  },
  {
    number: 8,
    unit: "Web",
    title: "Diseño web y accesibilidad",
    summary: "Estructura de contenido, jerarquía, navegación, estados y accesibilidad.",
    goals: ["Diseñar mobile-first", "Definir jerarquía visual", "Aplicar HTML semántico y accesibilidad"],
    concepts: [
      { term: "Wireframe", detail: "Esquema de baja fidelidad para validar estructura y flujo." },
      { term: "Responsive", detail: "Diseño que se adapta al espacio disponible, no a un dispositivo específico." },
      { term: "Accesibilidad", detail: "Prácticas para que personas con distintas capacidades puedan usar la interfaz." },
    ],
    practice: "Traza el wireframe de una ficha de producto y define orden de lectura y estados de interacción.",
    icon: PaletteIcon,
  },
  {
    number: 9,
    unit: "Frontend",
    title: "HTML: estructura y semántica",
    summary: "HTML describe el significado y la estructura del documento.",
    goals: ["Construir un documento válido", "Elegir etiquetas semánticas", "Crear formularios accesibles"],
    concepts: [
      { term: "Elemento", detail: "Etiqueta, atributos y contenido que forman una unidad del documento." },
      { term: "Semántica", detail: "Significado que comunica la función del contenido a navegador y tecnologías de apoyo." },
      { term: "DOM", detail: "Representación en árbol del documento que JavaScript puede consultar y modificar." },
    ],
    practice: "Construye una tarjeta de servicio con header, main, article, lista, enlace y botón.",
    icon: FileCode2Icon,
  },
  {
    number: 10,
    unit: "Frontend",
    title: "CSS: presentación y layout",
    summary: "Selectores, cascada, box model, Flexbox, Grid y diseño adaptable.",
    goals: ["Predecir la cascada", "Dominar el modelo de caja", "Elegir Flexbox o Grid según el problema"],
    concepts: [
      { term: "Cascada", detail: "Algoritmo que decide qué declaración gana según origen, importancia, especificidad y orden." },
      { term: "Box model", detail: "Contenido, padding, border y margin componen la caja de cada elemento." },
      { term: "Media query", detail: "Regla condicional que adapta estilos a características del medio o viewport." },
    ],
    practice: "Convierte la tarjeta de la clase 9 en una cuadrícula responsive con foco visible.",
    icon: Code2Icon,
  },
  {
    number: 11,
    unit: "Plataforma web",
    title: "Servidor, navegador y protocolos",
    summary: "DNS, HTTP/HTTPS, FTP y proceso de carga de una página.",
    goals: ["Explicar DNS y HTTP", "Interpretar códigos de estado", "Diferenciar HTTPS y FTP"],
    concepts: [
      { term: "HTTP", detail: "Protocolo de aplicación basado en mensajes de solicitud y respuesta." },
      { term: "HTTPS", detail: "HTTP protegido con TLS para cifrado, integridad y autenticación del servidor." },
      { term: "FTP", detail: "Protocolo para transferencia de archivos; para acceso seguro suelen preferirse SFTP o FTPS." },
    ],
    practice: "Ordena DNS, conexión, TLS, solicitud, respuesta, parseo, layout y pintura.",
    icon: NetworkIcon,
  },
  {
    number: 12,
    unit: "Full stack",
    title: "JavaScript, backend, JSON y XML",
    summary: "Interactividad en cliente, reglas en servidor e intercambio de datos estructurados.",
    goals: ["Modificar el DOM con JavaScript", "Diseñar una API mínima", "Leer y producir JSON/XML válidos"],
    concepts: [
      { term: "Frontend", detail: "Código que ejecuta el navegador y responde a la interacción de la persona." },
      { term: "Backend", detail: "Código de servidor que valida, aplica reglas, persiste datos y controla acceso." },
      { term: "Serialización", detail: "Conversión de objetos en una representación transferible como JSON o XML." },
    ],
    practice: "Completa el laboratorio integrador: catálogo web, API simulada, JSON, XML y despliegue documentado.",
    icon: BracesIcon,
  },
]

export const htmlExample = `<main class="catalogo" aria-labelledby="titulo">
  <header>
    <p class="kicker">INVENTARIO / API</p>
    <h1 id="titulo">Consulta de inventario</h1>
  </header>

  <article class="servicio">
    <span class="estado">Disponible</span>
    <h2>API de inventario</h2>
    <p>Consulta existencias en tiempo real.</p>
    <button id="consultar">Consultar API</button>
    <output id="resultado" aria-live="polite">Sin consultar</output>
  </article>
</main>`

export const cssExample = `:root { color-scheme: dark; }
* { box-sizing: border-box; }
body {
  margin: 0; min-height: 100vh; display: grid; place-items: center;
  background: #000; color: #f4f4f5; font: 16px/1.6 system-ui;
}
.catalogo { width: min(90%, 720px); }
.kicker { color: #22d3ee; letter-spacing: .18em; font: 700 12px monospace; }
.servicio {
  margin-top: 2rem; padding: 2rem; border: 1px solid #164e63;
  background: linear-gradient(135deg, #071217, #030303); border-radius: 20px;
}
.estado { color: #86efac; font: 700 12px monospace; }
button { padding: .8rem 1rem; border: 0; border-radius: 10px; background: #06b6d4; font-weight: 800; }
output { display: block; margin-top: 1rem; color: #a1a1aa; }
button:focus-visible { outline: 3px solid #facc15; outline-offset: 3px; }`

export const jsExample = `const button = document.querySelector("#consultar");
const output = document.querySelector("#resultado");

button.addEventListener("click", async () => {
  button.disabled = true;
  output.textContent = "GET /api/inventario …";

  // Simula la latencia de una petición HTTP.
  await new Promise(resolve => setTimeout(resolve, 650));
  const respuesta = { producto: "Teclado", existencias: 18 };

  output.textContent = respuesta.producto + ": " + respuesta.existencias + " unidades";
  button.disabled = false;
});`

export const jsonExample = `{
  "servicio": "inventario",
  "version": 1,
  "activo": true,
  "productos": [
    { "id": 101, "nombre": "Teclado", "existencias": 18 }
  ]
}`

export const xmlExample = `<?xml version="1.0" encoding="UTF-8"?>
<inventario version="1" activo="true">
  <producto id="101">
    <nombre>Teclado</nombre>
    <existencias unidad="pieza">18</existencias>
  </producto>
</inventario>`
