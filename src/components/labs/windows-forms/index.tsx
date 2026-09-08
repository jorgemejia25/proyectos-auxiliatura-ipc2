"use client"

import { useState } from "react"
import { Button, Card, Chip } from "@heroui/react"
import {
  CheckCircle2Icon,
  ClipboardListIcon,
  ComponentIcon,
  MousePointer2Icon,
  SaveIcon,
  TextCursorInputIcon,
  WandSparklesIcon,
} from "lucide-react"

type ControlId = "label" | "textbox" | "combobox" | "button" | "error"

const controls: Array<{
  id: ControlId
  name: string
  type: string
  text: string
  property: string
  use: string
}> = [
  { id: "label", name: "lblNombre", type: "Label", text: "Nombre", property: "AutoSize = true", use: "Describe un control de entrada." },
  { id: "textbox", name: "txtNombre", type: "TextBox", text: "", property: "MaxLength = 80", use: "Captura texto de una sola línea." },
  { id: "combobox", name: "cmbCarrera", type: "ComboBox", text: "Selecciona una carrera", property: "DropDownStyle = DropDownList", use: "Restringe la selección a valores definidos." },
  { id: "button", name: "btnGuardar", type: "Button", text: "Guardar", property: "UseVisualStyleBackColor = true", use: "Ejecuta una acción desde el evento Click." },
  { id: "error", name: "errorProvider", type: "ErrorProvider", text: "", property: "ContainerControl = this", use: "Muestra errores junto al control inválido." },
]

const codeTabs = [
  {
    id: "project",
    label: "RegistroWinForms.csproj",
    explanation: "Configuración mínima para un proyecto Windows Forms .NET 8. No requiere paquetes NuGet para controles base.",
    code: `<Project Sdk="Microsoft.NET.Sdk">
  <PropertyGroup>
    <OutputType>WinExe</OutputType>
    <TargetFramework>net8.0-windows</TargetFramework>
    <UseWindowsForms>true</UseWindowsForms>
    <ImplicitUsings>enable</ImplicitUsings>
    <Nullable>enable</Nullable>
  </PropertyGroup>
</Project>`,
  },
  {
    id: "program",
    label: "Program.cs",
    explanation: "Punto de entrada. STAThread es requerido por controles WinForms que usan componentes COM del sistema operativo.",
    code: `using System;
using System.Windows.Forms;

namespace RegistroWinForms;

internal static class Program
{
    [STAThread]
    static void Main()
    {
        ApplicationConfiguration.Initialize();
        Application.Run(new MainForm());
    }
}`,
  },
  {
    id: "form",
    label: "MainForm.cs",
    explanation: "Código de comportamiento: carga de datos, propiedades del formulario, validación y eventos. Mantenga aquí la coordinación de la interfaz.",
    code: `using System;
using System.Drawing;
using System.Windows.Forms;

namespace RegistroWinForms;

public partial class MainForm : Form
{
    public MainForm()
    {
        InitializeComponent();
        ConfigurarFormulario();
        CargarCarreras();
    }

    private void ConfigurarFormulario()
    {
        Text = "Registro de estudiante";
        StartPosition = FormStartPosition.CenterScreen;
        MinimumSize = new Size(620, 420);
        Font = new Font("Segoe UI", 10F);
        AcceptButton = btnGuardar;
    }

    private void CargarCarreras()
    {
        cmbCarrera.Items.AddRange(new object[]
        {
            "Ingeniería en Ciencias y Sistemas",
            "Ingeniería Industrial"
        });
        cmbCarrera.SelectedIndex = -1;
    }

    private void btnGuardar_Click(object? sender, EventArgs e)
    {
        errorProvider.Clear();

        if (string.IsNullOrWhiteSpace(txtNombre.Text))
        {
            errorProvider.SetError(txtNombre, "Ingrese el nombre.");
            txtNombre.Focus();
            return;
        }

        if (cmbCarrera.SelectedIndex < 0)
        {
            errorProvider.SetError(cmbCarrera, "Seleccione una carrera.");
            cmbCarrera.Focus();
            return;
        }

        string mensaje = $"Registro guardado:\n{txtNombre.Text}\n{cmbCarrera.Text}";
        MessageBox.Show(mensaje, "Registro", MessageBoxButtons.OK,
            MessageBoxIcon.Information);
    }
}`,
  },
  {
    id: "layout",
    label: "MainForm.Designer.cs",
    explanation: "Código generado por el diseñador. Puede leerlo y ajustar propiedades; para cambios visuales use el diseñador cuando sea posible.",
    code: `using System.ComponentModel;
using System.Drawing;
using System.Windows.Forms;

namespace RegistroWinForms;

public partial class MainForm
{
    private IContainer? components = null;
    private Label lblNombre = null!;
    private TextBox txtNombre = null!;
    private Label lblCarrera = null!;
    private ComboBox cmbCarrera = null!;
    private Button btnGuardar = null!;
    private ErrorProvider errorProvider = null!;
    private TableLayoutPanel layoutPrincipal = null!;
    private FlowLayoutPanel panelAcciones = null!;

    protected override void Dispose(bool disposing)
    {
        if (disposing) components?.Dispose();
        base.Dispose(disposing);
    }

    private void InitializeComponent()
    {
        components = new Container();
        lblNombre = new Label();
        txtNombre = new TextBox();
        lblCarrera = new Label();
        cmbCarrera = new ComboBox();
        btnGuardar = new Button();
        errorProvider = new ErrorProvider(components);
        layoutPrincipal = new TableLayoutPanel();
        panelAcciones = new FlowLayoutPanel();

        ((ISupportInitialize)errorProvider).BeginInit();
        SuspendLayout();

        layoutPrincipal.ColumnCount = 2;
        layoutPrincipal.RowCount = 3;
        layoutPrincipal.Dock = DockStyle.Fill;
        layoutPrincipal.Padding = new Padding(24);
        layoutPrincipal.ColumnStyles.Add(new ColumnStyle(SizeType.AutoSize));
        layoutPrincipal.ColumnStyles.Add(new ColumnStyle(SizeType.Percent, 100F));
        layoutPrincipal.RowStyles.Add(new RowStyle(SizeType.AutoSize));
        layoutPrincipal.RowStyles.Add(new RowStyle(SizeType.AutoSize));
        layoutPrincipal.RowStyles.Add(new RowStyle(SizeType.Percent, 100F));

        lblNombre.AutoSize = true;
        lblNombre.Text = "Nombre:";
        lblNombre.Anchor = AnchorStyles.Left;

        txtNombre.Name = "txtNombre";
        txtNombre.MaxLength = 80;
        txtNombre.Dock = DockStyle.Fill;
        txtNombre.TabIndex = 0;

        lblCarrera.AutoSize = true;
        lblCarrera.Text = "Carrera:";
        lblCarrera.Anchor = AnchorStyles.Left;

        cmbCarrera.Name = "cmbCarrera";
        cmbCarrera.DropDownStyle = ComboBoxStyle.DropDownList;
        cmbCarrera.Dock = DockStyle.Fill;
        cmbCarrera.TabIndex = 1;

        panelAcciones.AutoSize = true;
        panelAcciones.FlowDirection = FlowDirection.RightToLeft;
        panelAcciones.Dock = DockStyle.Top;

        btnGuardar.Name = "btnGuardar";
        btnGuardar.Text = "Guardar";
        btnGuardar.AutoSize = true;
        btnGuardar.TabIndex = 2;
        btnGuardar.Click += btnGuardar_Click;

        panelAcciones.Controls.Add(btnGuardar);
        layoutPrincipal.Controls.Add(lblNombre, 0, 0);
        layoutPrincipal.Controls.Add(txtNombre, 1, 0);
        layoutPrincipal.Controls.Add(lblCarrera, 0, 1);
        layoutPrincipal.Controls.Add(cmbCarrera, 1, 1);
        layoutPrincipal.Controls.Add(panelAcciones, 1, 2);

        errorProvider.ContainerControl = this;
        AutoScaleMode = AutoScaleMode.Font;
        ClientSize = new Size(700, 430);
        Controls.Add(layoutPrincipal);
        Name = "MainForm";
        ((ISupportInitialize)errorProvider).EndInit();
        ResumeLayout(false);
    }
}`,
  },
] as const

const navItems = [
  ["inicio", "Inicio"],
  ["preparacion", "Proyecto"],
  ["controles", "Controles"],
  ["layout", "Layout"],
  ["practica", "Práctica"],
  ["eventos", "Eventos"],
  ["codigo", "Código"],
] as const

export function WindowsFormsView() {
  const [selectedControl, setSelectedControl] = useState<ControlId>("textbox")
  const [layout, setLayout] = useState<"table" | "flow">("table")
  const [name, setName] = useState("")
  const [career, setCareer] = useState("")
  const [status, setStatus] = useState("Complete los campos para probar la validación.")
  const [activeCode, setActiveCode] = useState<(typeof codeTabs)[number]["id"]>("project")

  const selected = controls.find((control) => control.id === selectedControl) ?? controls[0]
  const currentCode = codeTabs.find((tab) => tab.id === activeCode) ?? codeTabs[0]

  function saveRecord() {
    if (!name.trim()) {
      setSelectedControl("textbox")
      setStatus("Error: ingrese el nombre.")
      return
    }
    if (!career) {
      setSelectedControl("combobox")
      setStatus("Error: seleccione una carrera.")
      return
    }
    setSelectedControl("button")
    setStatus(`Registro guardado: ${name.trim()} · ${career}.`)
  }

  return (
    <main className="min-h-screen bg-[#09090B] text-[#ECEDEE]">
      <header id="inicio" className="relative overflow-hidden border-b border-white/10 px-5 py-16 sm:px-8 lg:px-12">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_15%,rgba(0,111,238,.2),transparent_32%),linear-gradient(rgba(255,255,255,.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.03)_1px,transparent_1px)] bg-[size:auto,34px_34px,34px_34px]" />
        <div className="relative mx-auto max-w-7xl">
          <div className="flex flex-wrap gap-2"><Chip color="accent" variant="soft">C#</Chip><Chip variant="soft">Windows Forms</Chip><Chip variant="soft">Diseñador visual</Chip></div>
          <p className="mt-8 font-mono text-xs font-bold tracking-[.18em] text-[#338EF7] uppercase">Laboratorio de interfaces</p>
          <h1 className="mt-3 max-w-4xl text-[clamp(2.7rem,6vw,5.4rem)] font-black leading-[.95] tracking-[-.055em] text-white">Diseño de interfaces con Windows Forms</h1>
          <p className="mt-6 max-w-3xl text-base leading-8 text-[#A1A1AA]">Diseñador, controles, propiedades, contenedores, eventos y validación para formularios C#.</p>
        </div>
      </header>

      <nav className="sticky top-0 z-40 border-b border-white/10 bg-[#09090B]/95 px-5 py-3 backdrop-blur-xl sm:px-8 lg:px-12" aria-label="Contenido del laboratorio">
        <div className="mx-auto flex max-w-7xl gap-2 overflow-x-auto">
          {navItems.map(([id, label]) => <a key={id} href={`#${id}`} className="shrink-0 border border-white/10 bg-[#18181B] px-3 py-2 font-mono text-[10px] font-bold tracking-wide text-[#A1A1AA] uppercase transition hover:border-[#006FEE] hover:bg-[#006FEE] hover:text-white">{label}</a>)}
        </div>
      </nav>

      <section id="preparacion" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-16 sm:px-8 lg:px-12">
        <SectionTitle number="01" title="Crear y configurar el proyecto" description="En Visual Studio: Create a new project → Windows Forms App → C#. Seleccione .NET 8 o la versión requerida por el curso." />
        <div className="grid gap-5 lg:grid-cols-[.9fr_1.1fr]">
          <Card className="border border-white/10 bg-[#111113]"><Card.Content className="p-6"><p className="font-mono text-xs text-[#338EF7]">PASOS</p><ol className="mt-5 grid gap-4 text-sm leading-7 text-[#D4D4D8]"><li><strong className="text-white">1.</strong> Crear la plantilla <code>Windows Forms App</code>.</li><li><strong className="text-white">2.</strong> Confirmar el SDK <code>net8.0-windows</code>.</li><li><strong className="text-white">3.</strong> Abrir <code>MainForm.cs [Design]</code> y arrastrar controles desde Toolbox.</li><li><strong className="text-white">4.</strong> Definir <code>(Name)</code> antes de escribir eventos.</li><li><strong className="text-white">5.</strong> Ejecutar con <code>F5</code> y probar teclado, tamaño y validación.</li></ol></Card.Content></Card>
          <CodeGuide title="RegistroWinForms.csproj" code={'<Project Sdk="Microsoft.NET.Sdk">\n  <PropertyGroup>\n    <OutputType>WinExe</OutputType>\n    <TargetFramework>net8.0-windows</TargetFramework>\n    <UseWindowsForms>true</UseWindowsForms>\n    <ImplicitUsings>enable</ImplicitUsings>\n    <Nullable>enable</Nullable>\n  </PropertyGroup>\n</Project>'} />
        </div>
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <CodeGuide title="Imports base" code={'using System;\nusing System.ComponentModel;\nusing System.Drawing;\nusing System.Windows.Forms;'} />
          <Concept title="Bibliotecas" text="System.Windows.Forms contiene Form, Label, TextBox, Button, ComboBox, paneles y eventos. System.Drawing contiene Size, Point, Font y Color. System.ComponentModel contiene IContainer e ISupportInitialize usados por el diseñador. Para estos controles base no se requiere NuGet." />
        </div>
      </section>

      <section id="controles" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-16 sm:px-8 lg:px-12">
        <SectionTitle number="02" title="Controles y propiedades" description="Seleccione un control. Revise su nombre, propiedad principal y uso dentro del formulario." />
        <div className="grid gap-5 lg:grid-cols-[.72fr_1.28fr]">
          <div className="grid gap-2">
            {controls.map((control) => <button key={control.id} type="button" onClick={() => setSelectedControl(control.id)} className={`flex items-center gap-3 border p-4 text-left transition ${selectedControl === control.id ? "border-[#006FEE] bg-[#006FEE]/15" : "border-white/10 bg-[#18181B] hover:border-white/25"}`}><ControlIcon id={control.id} /><div><strong className="block text-sm text-white">{control.type}</strong><span className="font-mono text-[10px] text-[#A1A1AA]">{control.name}</span></div></button>)}
          </div>
          <Card className="border border-white/10 bg-[#111113]"><Card.Content className="p-6 sm:p-8"><p className="font-mono text-xs text-[#338EF7]">PROPIEDADES</p><div className="mt-7 grid gap-px border border-white/10 bg-white/10 sm:grid-cols-2"><Property label="(Name)" value={selected.name} /><Property label="Tipo" value={selected.type} /><Property label="Text" value={selected.text || "—"} /><Property label="Ejemplo" value={selected.property} /></div><div className="mt-7 border-l-2 border-[#F31260] bg-[#F31260]/10 p-4 text-sm leading-7 text-[#D4D4D8]">{selected.use}</div></Card.Content></Card>
        </div>
        <div className="mt-5 grid gap-4 lg:grid-cols-[.75fr_1.25fr]"><Concept title="Propiedades que debe revisar" text="(Name) identifica el control en C#. Text define el texto visible. Size y MinimumSize definen dimensiones. Location posiciona solo cuando no usa un layout. Dock y Anchor definen ajuste. TabIndex define el orden de teclado. Enabled y Visible controlan disponibilidad." /><CodeGuide title="Propiedades configuradas por código" code={'txtNombre.Name = "txtNombre";\ntxtNombre.MaxLength = 80;\ntxtNombre.Dock = DockStyle.Fill;\ntxtNombre.TabIndex = 0;\n\ncmbCarrera.DropDownStyle = ComboBoxStyle.DropDownList;\ncmbCarrera.TabIndex = 1;\n\nbtnGuardar.Text = "Guardar";\nbtnGuardar.AutoSize = true;\nbtnGuardar.Enabled = true;\nbtnGuardar.Click += btnGuardar_Click;'} /></div>
      </section>

      <section id="layout" className="scroll-mt-24 border-y border-white/10 bg-[#050505] px-5 py-16 sm:px-8 lg:px-12">
        <div className="mx-auto max-w-7xl"><SectionTitle number="03" title="Organización del formulario" description="Use contenedores para alinear controles y permitir cambios de tamaño sin posiciones fijas." />
          <div className="grid gap-5 lg:grid-cols-[1.05fr_.95fr]">
            <Card className="border border-white/10 bg-[#111113]"><Card.Content className="p-6"><div className="flex gap-2"><LayoutButton selected={layout === "table"} onClick={() => setLayout("table")}>TableLayoutPanel</LayoutButton><LayoutButton selected={layout === "flow"} onClick={() => setLayout("flow")}>FlowLayoutPanel</LayoutButton></div><div className={`mt-7 min-h-64 border border-dashed border-[#006FEE]/60 bg-[#09090B] p-5 ${layout === "table" ? "grid grid-cols-[auto_1fr] content-start gap-4" : "flex flex-wrap content-start gap-3"}`}><LayoutItem>{layout === "table" ? "Nombre" : "Label"}</LayoutItem><LayoutItem>{layout === "table" ? "TextBox" : "TextBox"}</LayoutItem><LayoutItem>{layout === "table" ? "Carrera" : "ComboBox"}</LayoutItem><LayoutItem>{layout === "table" ? "ComboBox" : "Button"}</LayoutItem><LayoutItem>{layout === "table" ? "Guardar" : "ErrorProvider"}</LayoutItem></div></Card.Content></Card>
            <div className="grid gap-4"><Concept title="TableLayoutPanel" text="Organiza por filas y columnas. Útil cuando cada etiqueta debe alinearse con su campo." /><Concept title="FlowLayoutPanel" text="Distribuye controles de forma secuencial. Útil para botones, filtros o tarjetas repetidas." /><Concept title="Dock y Anchor" text="Dock ajusta un control a un borde o al contenedor; Anchor conserva la distancia respecto a bordes seleccionados." /></div>
          </div>
        </div>
      </section>

      <section id="practica" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-16 sm:px-8 lg:px-12">
        <SectionTitle number="04" title="Práctica: formulario de registro" description="La maqueta representa los controles de un MainForm. Seleccione controles o pruebe la validación." />
        <div className="grid gap-5 lg:grid-cols-[1.3fr_.7fr]">
          <div className="overflow-hidden border border-white/15 bg-[#18181B] shadow-[10px_10px_0_#006FEE]"><div className="flex items-center gap-2 border-b border-white/10 bg-[#27272A] px-4 py-3"><span className="size-2 rounded-full bg-[#F31260]" /><span className="size-2 rounded-full bg-[#F5A524]" /><span className="size-2 rounded-full bg-[#17C964]" /><span className="ml-3 font-mono text-[10px] text-[#A1A1AA]">MainForm.cs [Design]</span></div><div className="p-6 sm:p-8"><h3 className="text-lg font-bold text-white">Registro de estudiante</h3><div className="mt-7 grid gap-5"><label htmlFor="wf-nombre" className={`grid gap-2 ${selectedControl === "textbox" ? "rounded border border-[#006FEE] p-3" : ""}`}><span className="text-sm text-[#D4D4D8]">Nombre</span><input id="wf-nombre" value={name} onFocus={() => setSelectedControl("textbox")} onChange={(event) => setName(event.target.value)} placeholder="Ingrese el nombre" className="h-10 border border-white/15 bg-[#09090B] px-3 text-sm text-white outline-none placeholder:text-[#71717A] focus:border-[#006FEE]" /></label><label htmlFor="wf-carrera" className={`grid gap-2 ${selectedControl === "combobox" ? "rounded border border-[#006FEE] p-3" : ""}`}><span className="text-sm text-[#D4D4D8]">Carrera</span><select id="wf-carrera" value={career} onFocus={() => setSelectedControl("combobox")} onChange={(event) => setCareer(event.target.value)} className="h-10 border border-white/15 bg-[#09090B] px-3 text-sm text-white outline-none focus:border-[#006FEE]"><option value="">Seleccione una carrera</option><option>Ingeniería en Ciencias y Sistemas</option><option>Ingeniería Industrial</option></select></label><div className="flex justify-end"><Button aria-label="Guardar registro" onPress={saveRecord} className="bg-[#006FEE] font-bold text-white hover:bg-[#338EF7]"><SaveIcon className="size-4" /> Guardar</Button></div></div><p aria-live="polite" className={`mt-6 border-l-2 p-3 text-sm ${status.startsWith("Error") ? "border-[#F31260] bg-[#F31260]/10 text-[#FCA5A5]" : "border-[#17C964] bg-[#17C964]/10 text-[#86EFAC]"}`}>{status}</p></div></div>
          <Card className="border border-white/10 bg-[#111113]"><Card.Content className="p-6"><p className="font-mono text-xs text-[#338EF7]">HERRAMIENTAS DEL DISEÑADOR</p><div className="mt-6 grid gap-3"><Tool title="Toolbox" text="Arrastre Label, TextBox, ComboBox, Button y contenedores al formulario." /><Tool title="Properties" text="Cambie (Name), Text, Dock, Anchor, Font, Size y eventos." /><Tool title="Document Outline" text="Revise la jerarquía de controles dentro de paneles y layouts." /></div></Card.Content></Card>
        </div>
      </section>

      <section id="eventos" className="scroll-mt-24 border-y border-white/10 bg-[#050505] px-5 py-16 sm:px-8 lg:px-12"><div className="mx-auto max-w-7xl"><SectionTitle number="05" title="Eventos y validación" description="Un evento conecta una interacción del usuario con un método. Valide antes de procesar o guardar datos." /><div className="grid gap-4 md:grid-cols-3"><Concept title="Click" text="Se ejecuta cuando el usuario activa un Button." /><Concept title="TextChanged" text="Se ejecuta cuando cambia el contenido de un TextBox." /><Concept title="SelectedIndexChanged" text="Se ejecuta cuando cambia la selección de un ComboBox." /></div><div className="mt-5 grid gap-4 md:grid-cols-2"><Checklist text="Asignar nombres descriptivos: txtNombre, cmbCarrera, btnGuardar." /><Checklist text="Validar campos requeridos antes de usar sus valores." /><Checklist text="Mostrar el error junto al control con ErrorProvider." /><Checklist text="Separar la lógica de negocio de los eventos de la interfaz." /></div></div></section>

      <section id="codigo" className="mx-auto max-w-7xl scroll-mt-24 px-5 py-16 sm:px-8 lg:px-12"><SectionTitle number="06" title="Código completo del formulario" description="Revise los archivos en orden. Copie los ejemplos a un proyecto WinForms y mantenga el mismo namespace." /><div className="mt-8 overflow-hidden border border-white/10 bg-[#050505]"><div className="flex overflow-x-auto border-b border-white/10 bg-[#18181B] p-2">{codeTabs.map((tab) => <button key={tab.id} type="button" onClick={() => setActiveCode(tab.id)} className={`shrink-0 px-3 py-2 font-mono text-[11px] font-bold ${activeCode === tab.id ? "bg-[#006FEE] text-white" : "text-[#A1A1AA] hover:text-white"}`}>{tab.label}</button>)}</div><div className="border-b border-white/10 bg-[#111113] px-5 py-4 text-xs leading-6 text-[#A1A1AA]">{currentCode.explanation}</div><pre className="max-h-[760px] overflow-auto p-5 font-mono text-[12px] leading-6 text-[#D4D4D8] sm:p-7"><code>{currentCode.code}</code></pre></div></section>
    </main>
  )
}

function SectionTitle({ number, title, description }: { number: string; title: string; description: string }) { return <div className="mb-9 grid gap-4 lg:grid-cols-[1fr_.8fr] lg:items-end"><div><p className="font-mono text-[10px] font-bold tracking-[.18em] text-[#338EF7] uppercase">{number}</p><h2 className="mt-3 text-3xl font-black tracking-[-.035em] text-white sm:text-5xl">{title}</h2></div><p className="max-w-2xl text-sm leading-7 text-[#A1A1AA] lg:justify-self-end">{description}</p></div> }
function Property({ label, value }: { label: string; value: string }) { return <div className="bg-[#18181B] p-4"><span className="block font-mono text-[10px] text-[#71717A]">{label}</span><strong className="mt-2 block text-sm text-[#ECEDEE]">{value}</strong></div> }
function ControlIcon({ id }: { id: ControlId }) { const Icon = id === "label" ? ComponentIcon : id === "textbox" ? TextCursorInputIcon : id === "combobox" ? ClipboardListIcon : id === "button" ? MousePointer2Icon : WandSparklesIcon; return <Icon className="size-5 text-[#338EF7]" /> }
function LayoutButton({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) { return <button type="button" onClick={onClick} className={`border px-3 py-2 font-mono text-[10px] font-bold ${selected ? "border-[#006FEE] bg-[#006FEE] text-white" : "border-white/10 bg-[#18181B] text-[#A1A1AA]"}`}>{children}</button> }
function LayoutItem({ children }: { children: React.ReactNode }) { return <div className="border border-[#006FEE]/45 bg-[#006FEE]/10 px-3 py-2 font-mono text-[11px] text-[#D4D4D8]">{children}</div> }
function Concept({ title, text }: { title: string; text: string }) { return <article className="border border-white/10 bg-[#18181B] p-5"><h3 className="text-sm font-bold text-white">{title}</h3><p className="mt-2 text-xs leading-6 text-[#A1A1AA]">{text}</p></article> }
function Tool({ title, text }: { title: string; text: string }) { return <div className="border-l-2 border-[#006FEE] bg-[#18181B] p-4"><strong className="text-sm text-white">{title}</strong><p className="mt-1 text-xs leading-6 text-[#A1A1AA]">{text}</p></div> }
function Checklist({ text }: { text: string }) { return <div className="flex gap-3 border border-white/10 bg-[#18181B] p-4 text-sm leading-6 text-[#D4D4D8]"><CheckCircle2Icon className="mt-0.5 size-4 shrink-0 text-[#17C964]" />{text}</div> }
function CodeGuide({ title, code }: { title: string; code: string }) { return <article className="overflow-hidden border border-white/10 bg-[#050505]"><div className="border-b border-white/10 bg-[#18181B] px-4 py-3 font-mono text-[10px] font-bold text-[#338EF7]">{title}</div><pre className="overflow-auto p-5 font-mono text-[11px] leading-6 text-[#D4D4D8]"><code>{code}</code></pre></article> }
