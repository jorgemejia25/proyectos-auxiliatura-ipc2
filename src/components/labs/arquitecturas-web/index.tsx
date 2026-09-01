"use client"

import { useEffect, useMemo, useState, type ReactNode } from "react"
import { Button, Card, Chip, ProgressBar } from "@heroui/react"
import {
  ArrowDownIcon,
  CheckIcon,
  CloudIcon,
  ComponentIcon,
  DatabaseIcon,
  FileCode2Icon,
  FileJsonIcon,
  FileType2Icon,
  Globe2Icon,
  Layers3Icon,
  MonitorIcon,
  NetworkIcon,
  PlayIcon,
  RotateCcwIcon,
  ServerIcon,
} from "lucide-react"

import { cssExample, htmlExample, jsExample, jsonExample, xmlExample } from "./data"

const courseUnits = [
  ["arquitectura", "Arquitectura"],
  ["componentes", "Componentes UML"],
  ["despliegue", "Despliegue UML"],
  ["standalone", "Stand-alone"],
  ["cliente-servidor", "Cliente-servidor"],
  ["n-capas", "N-capas"],
  ["cloud", "Cloud"],
  ["plataforma-web", "Plataforma web"],
  ["html-css", "HTML y CSS"],
  ["javascript", "JavaScript"],
  ["backend", "Backend y datos"],
  ["laboratorio", "Laboratorio"],
] as const

const labSteps = [
  "Definir requisitos funcionales y restricciones de despliegue.",
  "Crear el diagrama UML de componentes.",
  "Crear el diagrama UML de despliegue.",
  "Implementar index.html, styles.css y app.js.",
  "Definir GET /api/productos y su respuesta JSON.",
  "Representar el inventario en JSON y XML.",
  "Probar estados correcto, carga y error.",
  "Documentar arquitectura, protocolos, riesgos y mitigaciones.",
]

const backendExample = `import express from "express";

const app = express();
const productos = [
  { id: 101, nombre: "Teclado", existencias: 18 }
];

app.get("/api/productos", (_request, response) => {
  response.status(200).json({ productos });
});

app.listen(3000);`

export function ArchitecturesWebView() {
  const [activeUnit, setActiveUnit] = useState("arquitectura")
  const [editorFile, setEditorFile] = useState<"html" | "css" | "js">("html")
  const [html, setHtml] = useState(htmlExample)
  const [css, setCss] = useState(cssExample)
  const [js, setJs] = useState(jsExample)
  const [preview, setPreview] = useState({ html: htmlExample, css: cssExample, js: jsExample })
  const [completedSteps, setCompletedSteps] = useState<number[]>([])

  const srcDoc = useMemo(
    () => `<!doctype html><html lang="es"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width"><style>${preview.css}</style></head><body>${preview.html}<script>${preview.js}<\/script></body></html>`,
    [preview]
  )

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.find((entry) => entry.isIntersecting)
        if (visible) setActiveUnit(visible.target.id)
      },
      { rootMargin: "-25% 0px -60%", threshold: 0.05 }
    )
    courseUnits.forEach(([id]) => {
      const section = document.getElementById(id)
      if (section) observer.observe(section)
    })
    return () => observer.disconnect()
  }, [])

  const goToUnit = (id: string) => {
    setActiveUnit(id)
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
    window.setTimeout(() => setActiveUnit(id), 900)
  }

  const editorValue = editorFile === "html" ? html : editorFile === "css" ? css : js
  const setEditorValue = editorFile === "html" ? setHtml : editorFile === "css" ? setCss : setJs
  const progress = Math.round((completedSteps.length / labSteps.length) * 100)

  return (
    <main className="min-h-screen bg-[#000000] text-[#ECEDEE]">
      <section className="relative overflow-hidden border-b border-white/15 px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(0,111,238,.18),transparent_36%),linear-gradient(rgba(255,255,255,.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.035)_1px,transparent_1px)] bg-[size:auto,36px_36px,36px_36px]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="mb-7 flex flex-wrap gap-2">
            <Chip color="success" variant="soft">UML</Chip>
            <Chip variant="soft">Despliegue</Chip>
            <Chip variant="soft">Web</Chip>
            <Chip variant="soft">Cloud</Chip>
          </div>
          <p className="mb-4 font-mono text-xs font-bold tracking-[.2em] text-[#006FEE] uppercase">Arquitectura y desarrollo web</p>
          <h1 className="max-w-5xl text-[clamp(3rem,8vw,7rem)] font-black leading-[.88] tracking-[-.06em] text-white">Arquitecturas web</h1>
          <p className="mt-8 max-w-3xl text-lg leading-8 text-[#A1A1AA]">Componentes UML, nodos de despliegue, stand-alone, cliente-servidor, N-capas, cloud, HTML, CSS, JavaScript, backend, JSON y XML.</p>
        </div>
      </section>

      <style>{`
        @keyframes arch-rise { from { opacity: 0; transform: translateY(22px) } to { opacity: 1; transform: translateY(0) } }
        .arch-unit { animation: arch-rise .65s ease-out both; scroll-margin-top: 7rem }
        .arch-course-nav { scrollbar-width: none }
        .arch-course-nav::-webkit-scrollbar { display: none }
        @media (prefers-reduced-motion: reduce) { .arch-unit { animation: none } }
      `}</style>

      <section className="sticky top-0 z-40 border-b border-white/10 bg-black/90 px-5 py-3 backdrop-blur-xl sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="arch-course-nav flex gap-2 overflow-x-auto pb-1">
            {courseUnits.map(([id, lesson], index) => (
              <Button key={id} size="sm" variant="secondary" className={`shrink-0 border ${activeUnit === id ? "!border-[#006FEE] !bg-[#006FEE] !text-white" : "!border-white/10 !bg-[#111113] !text-[#A1A1AA] hover:!border-white/20 hover:!bg-[#18181B] hover:!text-white"}`} onPress={() => goToUnit(id)}>
                <span className="font-mono text-[10px] opacity-70">{String(index + 1).padStart(2, "0")}</span> {lesson}
              </Button>
            ))}
          </div>
        </div>
      </section>

      <section id="arquitectura" className="arch-unit mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
        <SectionTitle number="01" title="Arquitectura de despliegue" subtitle="Definición y elementos" />
        <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <Card className="border border-[#006FEE]/30 bg-[#0B1730]"><Card.Content className="p-7"><p className="font-mono text-xs text-[#66AAF9]">DEFINICIÓN</p><p className="mt-4 text-xl font-semibold leading-8 text-white">Una arquitectura de despliegue especifica los nodos de infraestructura, los artefactos instalados en cada nodo y las conexiones utilizadas por el sistema.</p></Card.Content></Card>
          <Card className="border border-white/10 bg-[#09090B]"><Card.Content className="p-7"><p className="font-mono text-xs text-[#F31260]">ELEMENTOS</p><ul className="mt-4 grid gap-3 text-sm leading-6 text-[#D4D4D8]"><li>• Nodos físicos o virtuales.</li><li>• Entornos de ejecución.</li><li>• Artefactos desplegables.</li><li>• Protocolos, puertos y dependencias.</li></ul></Card.Content></Card>
        </div>
        <Card className="mt-5 border border-white/10 bg-[#09090B]"><Card.Content className="grid gap-6 p-6 md:grid-cols-[.35fr_1fr]"><div><p className="text-sm font-bold text-[#66AAF9]">Ejemplo</p><p className="mt-2 font-mono text-xl text-white">Cliente → API → BD</p></div><p className="text-sm leading-7 text-[#A1A1AA]">El navegador ejecuta la interfaz. La API aplica reglas y controla el acceso. La base de datos conserva la información. HTTPS conecta cliente y API; TCP conecta API y base de datos.</p></Card.Content></Card>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <DefinitionCard title="Nodo">Recurso computacional que aloja o ejecuta artefactos.</DefinitionCard>
          <DefinitionCard title="Artefacto">Archivo desplegable: ejecutable, paquete, contenedor o recurso web.</DefinitionCard>
          <DefinitionCard title="Entorno">Software que ejecuta artefactos: navegador, Node.js, .NET o JVM.</DefinitionCard>
          <DefinitionCard title="Conexión">Canal de comunicación identificado por protocolo y puerto.</DefinitionCard>
        </div>
      </section>

      <section id="componentes" className="arch-unit border-y border-white/10 bg-[#050505]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
          <SectionTitle number="02" title="Diagrama de componentes" subtitle="Vista lógica UML" />
          <div className="grid gap-6 lg:grid-cols-[1.25fr_.75fr]">
            <DiagramCard title="Catálogo de inventario"><ComponentDiagram /></DiagramCard>
            <div className="grid content-start gap-4">
              <DefinitionCard title="Componente">Unidad modular que encapsula una implementación.</DefinitionCard>
              <DefinitionCard title="Interfaz provista">Contrato que un componente ofrece.</DefinitionCard>
              <DefinitionCard title="Interfaz requerida">Contrato que un componente necesita.</DefinitionCard>
              <DefinitionCard title="Dependencia">Relación dirigida desde el consumidor hacia el proveedor.</DefinitionCard>
            </div>
          </div>
          <Card className="mt-5 border border-[#006FEE]/30 bg-[#0B1730]"><Card.Content className="p-6"><p className="font-mono text-xs text-[#66AAF9]">REGLAS</p><div className="mt-4 grid gap-4 text-sm leading-6 text-[#D4D4D8] md:grid-cols-3"><p>1. Nombrar cada componente por responsabilidad.</p><p>2. Representar contratos y dependencias reales.</p><p>3. Excluir servidores y dispositivos de esta vista.</p></div></Card.Content></Card>
        </div>
      </section>

      <section id="despliegue" className="arch-unit mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
        <SectionTitle number="03" title="Diagrama de despliegue" subtitle="Vista física UML" />
        <div className="grid gap-6 lg:grid-cols-[1.25fr_.75fr]">
          <DiagramCard title="Despliegue cliente-servidor"><DeploymentDiagram /></DiagramCard>
          <Card className="border border-white/10 bg-[#09090B]"><Card.Content className="p-6"><p className="font-mono text-xs text-[#66AAF9]">NOTACIÓN</p><div className="mt-5 grid gap-4 text-sm leading-6 text-[#D4D4D8]"><p><strong className="text-white">«device»</strong><br />Dispositivo físico o virtual.</p><p><strong className="text-white">«executionEnvironment»</strong><br />Entorno que ejecuta artefactos.</p><p><strong className="text-white">«artifact»</strong><br />Archivo instalado en un nodo.</p><p><strong className="text-white">Communication path</strong><br />Conexión rotulada con protocolo y puerto.</p></div></Card.Content></Card>
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-3">
          <ConceptExample title="Cliente" definition="Dispositivo con un navegador que ejecuta app.js." example="HTTPS :443" />
          <ConceptExample title="Servidor web" definition="Nodo Linux con Nginx y el proceso Node.js." example="index.html + api-server.js" />
          <ConceptExample title="Servidor de datos" definition="Nodo que ejecuta PostgreSQL y almacena inventario." example="TCP :5432" />
        </div>
      </section>

      <section id="standalone" className="arch-unit border-y border-white/10 bg-[#050505]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
          <SectionTitle number="04" title="Arquitectura stand-alone" subtitle="Ejecución local" />
          <Card className="border border-[#006FEE]/30 bg-[#0B1730]"><Card.Content className="grid gap-6 p-7 lg:grid-cols-[1fr_.8fr]"><div><p className="font-mono text-xs text-[#66AAF9]">DEFINICIÓN</p><p className="mt-4 text-lg font-semibold leading-8 text-white">Interfaz, reglas de negocio y persistencia se ejecutan en el mismo equipo.</p></div><ArchitectureNodes nodes={[{ icon: <MonitorIcon />, title: "Equipo local", detail: "UI + lógica + SQLite" }]} /></Card.Content></Card>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <ConceptExample title="Ventajas" definition="Operación sin red, baja latencia y despliegue inicial simple." example="Sistema de inventario offline" />
            <ConceptExample title="Limitaciones" definition="Actualización, respaldo y sincronización se realizan por equipo." example="Versiones distintas entre usuarios" />
            <ConceptExample title="Persistencia" definition="Archivos locales o base de datos embebida." example="SQLite, JSON o XML" />
          </div>
          <Card className="mt-5 border border-white/10 bg-[#09090B]"><Card.Content className="p-6"><h3 className="font-bold text-white">Flujo</h3><div className="mt-4 grid gap-3 text-sm text-[#D4D4D8] md:grid-cols-4"><FlowStep number="1">Abrir aplicación</FlowStep><FlowStep number="2">Ejecutar regla local</FlowStep><FlowStep number="3">Leer o guardar datos</FlowStep><FlowStep number="4">Actualizar interfaz</FlowStep></div></Card.Content></Card>
        </div>
      </section>

      <section id="cliente-servidor" className="arch-unit mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
        <SectionTitle number="05" title="Arquitectura cliente-servidor" subtitle="Aplicaciones web" />
        <Card className="border border-[#006FEE]/30 bg-[#0B1730]"><Card.Content className="grid gap-6 p-7 lg:grid-cols-[.8fr_1.2fr]"><div><p className="font-mono text-xs text-[#66AAF9]">DEFINICIÓN</p><p className="mt-4 text-lg font-semibold leading-8 text-white">El cliente inicia solicitudes HTTP. El servidor procesa cada solicitud y produce una respuesta.</p></div><ArchitectureNodes nodes={[{ icon: <MonitorIcon />, title: "Cliente", detail: "HTML · CSS · JS" }, { icon: <ServerIcon />, title: "Servidor", detail: "API + persistencia" }]} /></Card.Content></Card>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {["GET /productos", "Validar solicitud", "Consultar datos", "200 OK + JSON", "Actualizar DOM"].map((step, index) => <FlowStep key={step} number={String(index + 1)}>{step}</FlowStep>)}
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <DefinitionCard title="Ventaja">Reglas, datos y actualizaciones se administran de forma centralizada.</DefinitionCard>
          <DefinitionCard title="Riesgo">La disponibilidad depende de la red y del servidor. Requiere control de fallos y capacidad.</DefinitionCard>
        </div>
      </section>

      <section id="n-capas" className="arch-unit border-y border-white/10 bg-[#050505]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
          <SectionTitle number="06" title="Arquitectura N-capas" subtitle="Separación de responsabilidades" />
          <Card className="border border-[#006FEE]/30 bg-[#0B1730]"><Card.Content className="p-6"><p className="font-mono text-xs text-[#66AAF9]">DISTINCIÓN</p><p className="mt-3 text-lg font-semibold leading-8 text-white">Una capa es una separación lógica del código. Un tier es una separación física o de proceso durante el despliegue.</p></Card.Content></Card>
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <LayerCard number="01" title="Presentación" detail="Interfaz, eventos y validación de formato." icon={<MonitorIcon />} />
            <LayerCard number="02" title="Aplicación" detail="Casos de uso, controladores y contratos." icon={<ServerIcon />} />
            <LayerCard number="03" title="Dominio" detail="Reglas de negocio y modelos." icon={<Layers3Icon />} />
            <LayerCard number="04" title="Datos" detail="Repositorios, consultas y persistencia." icon={<DatabaseIcon />} />
          </div>
          <Card className="mt-5 border border-white/10 bg-[#09090B]"><Card.Content className="p-6"><h3 className="font-bold text-white">Regla de dependencia</h3><p className="mt-3 text-sm leading-7 text-[#A1A1AA]">La presentación depende de contratos de aplicación. La aplicación coordina el dominio. El acceso a datos implementa interfaces requeridas por las capas internas. La base de datos no contiene lógica de interfaz.</p></Card.Content></Card>
        </div>
      </section>

      <section id="cloud" className="arch-unit mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
        <SectionTitle number="07" title="Arquitectura cloud" subtitle="Servicios y disponibilidad" />
        <ArchitectureNodes nodes={[{ icon: <Globe2Icon />, title: "CDN", detail: "recursos estáticos" }, { icon: <NetworkIcon />, title: "Balanceador", detail: "HTTPS" }, { icon: <CloudIcon />, title: "Aplicación", detail: "múltiples instancias" }, { icon: <DatabaseIcon />, title: "Base de datos", detail: "servicio administrado" }]} />
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <ConceptExample title="Elasticidad" definition="Aumenta o reduce recursos según la demanda." example="Auto-scaling por CPU o solicitudes" />
          <ConceptExample title="Alta disponibilidad" definition="Distribuye instancias entre zonas independientes." example="Dos zonas de disponibilidad" />
          <ConceptExample title="Servicio administrado" definition="El proveedor opera infraestructura y mantenimiento base." example="Base de datos administrada" />
          <ConceptExample title="Observabilidad" definition="Registra métricas, logs y trazas de solicitudes." example="Latencia p95 y tasa de errores" />
        </div>
        <Card className="mt-5 border border-white/10 bg-[#09090B]"><Card.Content className="grid gap-5 p-6 md:grid-cols-3"><DefinitionCard title="IaaS">Máquinas, redes y almacenamiento configurados por el equipo.</DefinitionCard><DefinitionCard title="PaaS">Plataforma administrada para desplegar aplicaciones.</DefinitionCard><DefinitionCard title="SaaS">Aplicación completa consumida como servicio.</DefinitionCard></Card.Content></Card>
      </section>

      <section id="plataforma-web" className="arch-unit border-y border-white/10 bg-[#050505]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
          <SectionTitle number="08" title="Plataforma web" subtitle="Servidor, navegador y protocolos" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {["DNS: dominio → IP", "TCP: conexión", "TLS: cifrado", "HTTP: solicitud y respuesta", "Browser: DOM, CSSOM y JS"].map((step, index) => <FlowStep key={step} number={String(index + 1)}>{step}</FlowStep>)}
          </div>
          <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <ProtocolCard name="HTTP" port="80">Protocolo de solicitud y respuesta sin cifrado.</ProtocolCard>
            <ProtocolCard name="HTTPS" port="443">HTTP protegido mediante TLS.</ProtocolCard>
            <ProtocolCard name="FTP" port="21">Transferencia de archivos con canales de control y datos.</ProtocolCard>
            <ProtocolCard name="SFTP" port="22">Transferencia de archivos mediante SSH.</ProtocolCard>
          </div>
          <div className="mt-5 grid gap-4 md:grid-cols-2">
            <DefinitionCard title="Servidor web">Escucha solicitudes, selecciona recursos o delega operaciones y envía respuestas HTTP.</DefinitionCard>
            <DefinitionCard title="Navegador">Interpreta HTML y CSS, ejecuta JavaScript, construye el DOM y presenta la interfaz.</DefinitionCard>
          </div>
        </div>
      </section>

      <section id="html-css" className="arch-unit mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
        <SectionTitle number="09" title="HTML y CSS" subtitle="Estructura y presentación" />
        <div className="grid gap-6 lg:grid-cols-2">
          <CodeCard title="HTML semántico" label="ESTRUCTURA" code={htmlExample} />
          <CodeCard title="CSS responsive" label="PRESENTACIÓN" code={cssExample} />
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <ConceptExample title="Elemento" definition="Unidad compuesta por etiqueta, atributos y contenido." example={'<button id="guardar">Guardar</button>'} />
          <ConceptExample title="Semántica" definition="Significado estructural del contenido." example="main, article, nav y button" />
          <ConceptExample title="Cascada" definition="Resuelve declaraciones según origen, importancia, especificidad y orden." example=".tarjeta sobrescribe article" />
          <ConceptExample title="Layout" definition="Flexbox organiza una dimensión; Grid organiza filas y columnas." example="display: grid" />
        </div>
      </section>

      <section id="javascript" className="arch-unit border-y border-white/10 bg-[#050505]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
          <SectionTitle number="10" title="JavaScript en el cliente" subtitle="DOM, eventos y Fetch" />
          <Card className="overflow-hidden border border-white/10 bg-[#09090B]">
            <Card.Header className="flex flex-wrap items-center gap-3 border-b border-white/10 p-5">
              <div><Card.Title className="text-xl text-white">Editor y vista previa</Card.Title><Card.Description className="text-[#71717A]">Modifica los archivos y ejecuta el resultado.</Card.Description></div>
              <div className="ml-auto flex flex-wrap gap-2">
                {(["html", "css", "js"] as const).map((file) => <Button key={file} size="sm" variant={editorFile === file ? "primary" : "secondary"} aria-pressed={editorFile === file} onPress={() => setEditorFile(file)}>{file.toUpperCase()}</Button>)}
                <Button isIconOnly variant="secondary" aria-label="Restablecer código" onPress={() => { setHtml(htmlExample); setCss(cssExample); setJs(jsExample); setPreview({ html: htmlExample, css: cssExample, js: jsExample }) }}><RotateCcwIcon className="size-4" /></Button>
                <Button className="bg-[#006FEE] font-bold text-white" onPress={() => setPreview({ html, css, js })}><PlayIcon className="size-4" />Ejecutar</Button>
              </div>
            </Card.Header>
            <Card.Content className="grid min-h-[34rem] p-0 lg:grid-cols-2">
              <textarea aria-label={`Código ${editorFile}`} spellCheck={false} value={editorValue} onChange={(event) => setEditorValue(event.target.value)} className="min-h-[28rem] resize-none border-b border-white/10 bg-black p-5 font-mono text-[13px] leading-6 text-[#66AAF9] outline-none focus:bg-[#050B16] lg:border-r lg:border-b-0" />
              <iframe title="Vista previa del frontend" sandbox="allow-scripts" srcDoc={srcDoc} className="min-h-[28rem] w-full bg-white" />
            </Card.Content>
          </Card>
          <div className="mt-5 grid gap-4 md:grid-cols-3">
            <ConceptExample title="DOM" definition="Árbol de objetos que representa el documento HTML." example="document.querySelector('#resultado')" />
            <ConceptExample title="Evento" definition="Notificación producida por interacción o cambio de estado." example="button.addEventListener('click', fn)" />
            <ConceptExample title="Fetch" definition="API asíncrona para realizar solicitudes HTTP." example="await fetch('/api/productos')" />
          </div>
        </div>
      </section>

      <section id="backend" className="arch-unit mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
        <SectionTitle number="11" title="Backend, JSON y XML" subtitle="Servidor e intercambio de datos" />
        <div className="grid gap-6 lg:grid-cols-[1.1fr_.9fr]">
          <CodeCard title="Endpoint HTTP" label="NODE.JS / EXPRESS" code={backendExample} />
          <Card className="border border-[#006FEE]/30 bg-[#0B1730]"><Card.Content className="p-6"><p className="font-mono text-xs text-[#66AAF9]">RESPONSABILIDADES</p><ul className="mt-4 grid gap-3 text-sm leading-6 text-[#D4D4D8]"><li>• Validar datos de entrada.</li><li>• Autenticar y autorizar operaciones.</li><li>• Aplicar reglas de negocio.</li><li>• Leer y escribir persistencia.</li><li>• Producir estados y cuerpos HTTP.</li></ul></Card.Content></Card>
        </div>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <CodeCard title="JSON" label="APPLICATION/JSON" code={jsonExample} icon={<FileJsonIcon />} />
          <CodeCard title="XML" label="APPLICATION/XML" code={xmlExample} icon={<FileType2Icon />} />
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <DefinitionCard title="JSON">Objetos, arreglos, cadenas, números, booleanos y null. No admite comentarios.</DefinitionCard>
          <DefinitionCard title="XML">Elementos, atributos, texto, declaración y espacios de nombres. Exige etiquetas correctamente anidadas.</DefinitionCard>
        </div>
      </section>

      <section id="laboratorio" className="arch-unit border-y border-white/10 bg-[#050505]">
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
          <SectionTitle number="12" title="Laboratorio integrador" subtitle="Catálogo de inventario" />
          <Card className="border border-[#006FEE]/30 bg-[#0B1730]"><Card.Content className="p-6"><p className="font-mono text-xs text-[#66AAF9]">OBJETIVO</p><p className="mt-3 text-lg font-semibold leading-8 text-white">Implementar un catálogo web, definir su contrato HTTP y documentar su estructura lógica y su despliegue físico.</p><div className="mt-5 grid gap-3 md:grid-cols-3"><ProjectStep number="1" title="Modelado" body="Diagramas UML de componentes y despliegue." /><ProjectStep number="2" title="Implementación" body="Frontend, endpoint y formatos de datos." /><ProjectStep number="3" title="Validación" body="Pruebas funcionales, estados y documentación." /></div></Card.Content></Card>

          <div className="mt-6 grid gap-6 lg:grid-cols-[.65fr_1.35fr]">
            <Card className="h-fit border border-white/10 bg-[#09090B]"><Card.Content className="p-6"><p className="text-sm font-bold text-white">Progreso</p><div className="mt-4 flex items-end justify-between"><span className="text-sm text-[#A1A1AA]">{completedSteps.length} de {labSteps.length} actividades</span><span className="font-mono text-3xl font-black text-[#66AAF9]">{progress}%</span></div><ProgressBar aria-label="Progreso del laboratorio" value={progress} className="mt-4"><ProgressBar.Track className="h-2 overflow-hidden rounded-full bg-white/10"><ProgressBar.Fill className="h-full rounded-full bg-[#006FEE]" /></ProgressBar.Track></ProgressBar><div className="mt-6 border-t border-white/10 pt-5"><p className="text-xs font-bold tracking-wider text-[#71717A] uppercase">Entregables</p><ul className="mt-3 grid gap-2 text-sm leading-6 text-[#A1A1AA]"><li>• component-diagram.svg</li><li>• deployment-diagram.svg</li><li>• index.html · styles.css · app.js</li><li>• api-server.js</li><li>• inventario.json · inventario.xml</li><li>• README.md</li></ul></div></Card.Content></Card>
            <div className="grid gap-3">
              {labSteps.map((step, index) => {
                const completed = completedSteps.includes(index)
                return <Card key={step} className={`border ${completed ? "border-[#17C964]/40 bg-[#071A12]" : "border-white/10 bg-[#09090B]"}`}><Card.Content className="flex items-center gap-4 p-5"><Button isIconOnly size="sm" variant={completed ? "primary" : "secondary"} aria-label={`${completed ? "Marcar pendiente" : "Marcar completada"}: ${step}`} aria-pressed={completed} onPress={() => setCompletedSteps((current) => completed ? current.filter((item) => item !== index) : [...current, index])} className={completed ? "bg-[#17C964] text-black" : "border border-white/10 bg-[#111113] text-[#A1A1AA]"}>{completed ? <CheckIcon className="size-4" /> : <span className="font-mono text-xs">{index + 1}</span>}</Button><p className="text-sm leading-6 text-[#D4D4D8]">{step}</p></Card.Content></Card>
              })}
            </div>
          </div>

          <Card className="mt-6 border border-[#17C964]/30 bg-[#071A12]"><Card.Content className="p-6"><p className="font-bold text-white">Criterios de evaluación</p><div className="mt-4 grid gap-3 text-sm leading-6 text-[#A1A1AA] md:grid-cols-4"><p>25% · UML correcto</p><p>30% · Frontend funcional</p><p>25% · Backend y datos</p><p>20% · Pruebas y documentación</p></div></Card.Content></Card>
        </div>
      </section>
    </main>
  )
}

function SectionTitle({ number, title, subtitle }: { number: string; title: string; subtitle: string }) {
  return <div className="mb-8 flex items-end gap-4 border-b border-white/10 pb-5"><span className="font-mono text-sm font-bold text-[#006FEE]">{number}</span><div><p className="text-xs font-semibold tracking-[.16em] text-[#71717A] uppercase">{subtitle}</p><h2 className="mt-1 text-3xl font-black tracking-[-.04em] text-white sm:text-5xl">{title}</h2></div><ArrowDownIcon className="ml-auto hidden size-5 text-[#27272A] sm:block" /></div>
}

function DefinitionCard({ title, children }: { title: string; children: ReactNode }) {
  return <Card className="border border-white/10 bg-[#09090B]"><Card.Content className="p-5"><h3 className="font-bold text-white">{title}</h3><p className="mt-3 text-sm leading-6 text-[#A1A1AA]">{children}</p></Card.Content></Card>
}

function ConceptExample({ title, definition, example }: { title: string; definition: string; example: string }) {
  return <Card className="border border-white/10 bg-[#09090B]"><Card.Content className="p-5"><h3 className="font-bold text-white">{title}</h3><p className="mt-3 text-sm leading-6 text-[#D4D4D8]">{definition}</p><p className="mt-4 font-mono text-xs leading-5 text-[#66AAF9]">Ejemplo: {example}</p></Card.Content></Card>
}

function DiagramCard({ title, children }: { title: string; children: ReactNode }) {
  return <Card className="overflow-hidden border border-white/15 bg-[#000000]"><Card.Header className="border-b border-white/10 p-5"><div className="flex items-center gap-3"><ComponentIcon className="size-5 text-[#66AAF9]" /><Card.Title className="text-xl text-white">{title}</Card.Title></div></Card.Header><Card.Content className="overflow-x-auto p-3 sm:p-6">{children}</Card.Content></Card>
}

function FlowStep({ number, children }: { number: string; children: ReactNode }) {
  return <Card className="border border-white/10 bg-[#09090B]"><Card.Content className="p-4"><span className="font-mono text-xs font-bold text-[#006FEE]">{number.padStart(2, "0")}</span><p className="mt-2 text-sm leading-6 text-[#D4D4D8]">{children}</p></Card.Content></Card>
}

function LayerCard({ number, title, detail, icon }: { number: string; title: string; detail: string; icon: ReactNode }) {
  return <Card className="border border-white/10 bg-[#09090B]"><Card.Content className="p-5"><div className="flex items-center justify-between text-[#66AAF9]"><span className="[&>svg]:size-5">{icon}</span><span className="font-mono text-xs">{number}</span></div><h3 className="mt-5 font-bold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-[#A1A1AA]">{detail}</p></Card.Content></Card>
}

function ProtocolCard({ name, port, children }: { name: string; port: string; children: ReactNode }) {
  return <Card className="border border-white/10 bg-[#09090B]"><Card.Content className="p-5"><div className="flex items-center justify-between"><h3 className="font-mono text-xl font-black text-[#66AAF9]">{name}</h3><Chip variant="soft">:{port}</Chip></div><p className="mt-4 text-sm leading-6 text-[#A1A1AA]">{children}</p></Card.Content></Card>
}

function CodeCard({ title, label, code, icon }: { title: string; label: string; code: string; icon?: ReactNode }) {
  return <Card className="overflow-hidden border border-white/10 bg-[#09090B]"><Card.Header className="flex items-center justify-between border-b border-white/10 p-5"><div><p className="font-mono text-xs text-[#66AAF9]">{label}</p><Card.Title className="mt-1 text-xl text-white">{title}</Card.Title></div><span className="text-[#66AAF9] [&>svg]:size-5">{icon ?? <FileCode2Icon />}</span></Card.Header><Card.Content className="p-0"><pre className="max-h-[34rem] overflow-auto p-5 font-mono text-[13px] leading-6 text-[#66AAF9]"><code>{code}</code></pre></Card.Content></Card>
}

function ProjectStep({ number, title, body }: { number: string; title: string; body: string }) {
  return <Card className="border border-white/10 bg-black/30"><Card.Content className="p-5"><span className="font-mono text-xs font-bold text-[#66AAF9]">PASO {number}</span><h3 className="mt-2 font-bold text-white">{title}</h3><p className="mt-2 text-sm leading-6 text-[#A1A1AA]">{body}</p></Card.Content></Card>
}

function ArchitectureNodes({ nodes }: { nodes: { icon: ReactNode; title: string; detail: string }[] }) {
  return <div className="flex flex-wrap items-center justify-center gap-3">{nodes.map((node, index) => <div key={node.title} className="contents">{index > 0 ? <span className="font-mono text-lg text-[#006FEE]">→</span> : null}<Card className="min-w-36 border border-[#006FEE]/30 bg-black/50"><Card.Content className="p-5 text-center"><span className="text-[#66AAF9] [&>svg]:mx-auto [&>svg]:size-6">{node.icon}</span><p className="mt-3 font-bold text-white">{node.title}</p><p className="mt-1 font-mono text-xs text-[#71717A]">{node.detail}</p></Card.Content></Card></div>)}</div>
}

function ComponentDiagram() {
  return <svg viewBox="0 0 720 390" role="img" aria-label="Diagrama UML de componentes del catálogo de inventario" className="min-w-[620px] w-full"><defs><marker id="component-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#006FEE" /></marker></defs><rect width="720" height="390" fill="#000" /><text x="28" y="34" fill="#71717A" fontSize="11" fontFamily="monospace">CATÁLOGO DE INVENTARIO / COMPONENT VIEW</text><UmlComponent x={35} y={90} title="Web UI" subtitle="HTML · CSS · JS" /><UmlComponent x={280} y={90} title="API Inventario" subtitle="HTTP / JSON" /><UmlComponent x={280} y={245} title="Servicio Catálogo" subtitle="reglas de negocio" /><UmlComponent x={525} y={245} title="Repositorio SQL" subtitle="persistencia" /><DiagramArrow x1={215} y1={140} x2={280} y2={140} label="REST" marker="component-arrow" /><DiagramArrow x1={370} y1={190} x2={370} y2={245} label="usa" marker="component-arrow" /><DiagramArrow x1={460} y1={295} x2={525} y2={295} label="consulta" marker="component-arrow" /></svg>
}

function DeploymentDiagram() {
  return <svg viewBox="0 0 720 390" role="img" aria-label="Diagrama UML de despliegue del catálogo de inventario" className="min-w-[620px] w-full"><defs><marker id="deploy-arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0,0 L8,4 L0,8 z" fill="#006FEE" /></marker></defs><rect width="720" height="390" fill="#000" /><text x="28" y="34" fill="#71717A" fontSize="11" fontFamily="monospace">CATÁLOGO DE INVENTARIO / DEPLOYMENT VIEW</text><UmlNode x={35} y={75} width={190} height={245} stereotype="device" title="Cliente"><Artifact x={58} y={140} width={144} title="Navegador" detail="app.js" /></UmlNode><UmlNode x={270} y={75} width={200} height={245} stereotype="executionEnvironment" title="Servidor Linux"><Artifact x={295} y={135} width={150} title="Nginx" detail="index.html" /><Artifact x={295} y={225} width={150} title="Node.js" detail="api-server.js" /></UmlNode><UmlNode x={515} y={75} width={170} height={245} stereotype="device" title="Servidor BD"><Artifact x={540} y={165} width={120} title="PostgreSQL" detail="inventario" /></UmlNode><DiagramArrow x1={225} y1={190} x2={270} y2={190} label="HTTPS :443" marker="deploy-arrow" /><DiagramArrow x1={470} y1={250} x2={515} y2={250} label="TCP :5432" marker="deploy-arrow" /></svg>
}

function UmlComponent({ x, y, title, subtitle }: { x: number; y: number; title: string; subtitle: string }) {
  return <g><rect x={x} y={y} width="180" height="100" rx="7" fill="#0B1730" stroke="#006FEE" strokeWidth="2" /><rect x={x + 148} y={y + 20} width="20" height="13" fill="#0B1730" stroke="#66AAF9" /><rect x={x + 148} y={y + 45} width="20" height="13" fill="#0B1730" stroke="#66AAF9" /><text x={x + 18} y={y + 42} fill="#ECEDEE" fontSize="15" fontWeight="700">{title}</text><text x={x + 18} y={y + 68} fill="#A1A1AA" fontSize="11" fontFamily="monospace">{subtitle}</text></g>
}

function UmlNode({ x, y, width, height, stereotype, title, children }: { x: number; y: number; width: number; height: number; stereotype: string; title: string; children: ReactNode }) {
  return <g><path d={`M${x} ${y + 14} L${x + 14} ${y} H${x + width} V${y + height - 14} L${x + width - 14} ${y + height} H${x} Z`} fill="#050505" stroke="#006FEE" strokeWidth="2" /><path d={`M${x} ${y + 14} H${x + width - 14} L${x + width} ${y}`} fill="none" stroke="#006FEE" /><text x={x + 14} y={y + 35} fill="#66AAF9" fontSize="9" fontFamily="monospace">«{stereotype}»</text><text x={x + 14} y={y + 56} fill="#ECEDEE" fontSize="14" fontWeight="700">{title}</text>{children}</g>
}

function Artifact({ x, y, width, title, detail }: { x: number; y: number; width: number; title: string; detail: string }) {
  return <g><rect x={x} y={y} width={width} height="64" rx="5" fill="#0B1730" stroke="#006FEE" /><path d={`M${x + width - 18} ${y}v18h18`} fill="none" stroke="#66AAF9" /><text x={x + 10} y={y + 25} fill="#ECEDEE" fontSize="11" fontWeight="700">{title}</text><text x={x + 10} y={y + 46} fill="#A1A1AA" fontSize="9" fontFamily="monospace">«artifact» {detail}</text></g>
}

function DiagramArrow({ x1, y1, x2, y2, label, marker }: { x1: number; y1: number; x2: number; y2: number; label: string; marker: string }) {
  return <g><line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#006FEE" strokeWidth="1.5" strokeDasharray="5 4" markerEnd={`url(#${marker})`} /><rect x={(x1 + x2) / 2 - 32} y={(y1 + y2) / 2 - 17} width="64" height="15" fill="#000" /><text x={(x1 + x2) / 2} y={(y1 + y2) / 2 - 6} fill="#A1A1AA" fontSize="9" textAnchor="middle" fontFamily="monospace">{label}</text></g>
}
