import { DeliveryCountdown } from "@/components/delivery-countdown"
import { css } from "@/components/dc/css"
import { PRACTICA1_HC_FILAS, PRACTICA1_TREE_TEXT } from "@/components/projects/practica1/data"
import { Practica1Interactive } from "@/components/projects/practica1/interactive"
import { Practica1ClasesSection } from "@/components/projects/practica1/sections/clases"
import { Practica1EnunciadoSection } from "@/components/projects/practica1/sections/enunciado"
import { Practica1EntregaSection } from "@/components/projects/practica1/sections/entrega"
import { Practica1HcSection } from "@/components/projects/practica1/sections/hc"
import { Practica1HeroSection } from "@/components/projects/practica1/sections/hero"
import { Practica1Nav } from "@/components/projects/practica1/sections/nav"
import { Practica1ObjetivosSection } from "@/components/projects/practica1/sections/objetivos"
import { Practica1RutaSection } from "@/components/projects/practica1/sections/ruta"
import { ArtifactStyles } from "@/components/projects/practica1/styles"
import { getProject } from "@/lib/projects"

/**
 * Practica1 page body: static RSC sections + one client interactive island.
 */
export function Practica1View() {
  const project = getProject("practica1")

  return (
    <div className="dc-artifact dc-artifact--practica1">
      <ArtifactStyles />
      <div
        style={css(
          "min-height:100vh;background-image:linear-gradient(rgba(6,20,46,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(6,20,46,.08) 1px,transparent 1px);background-size:30px 30px;animation:drift 6s linear infinite"
        )}
      >
        <Practica1Nav />
        {project ? (
          <DeliveryCountdown deadlineAt={project.deadlineAt} theme={project.theme} />
        ) : null}
        <Practica1HeroSection />
        <Practica1ObjetivosSection />
        <Practica1EnunciadoSection />
        <Practica1ClasesSection />
        <Practica1Interactive />
        <Practica1RutaSection treeText={PRACTICA1_TREE_TEXT} />
        <Practica1HcSection hcFilas={PRACTICA1_HC_FILAS} />
        <Practica1EntregaSection />
      </div>
    </div>
  )
}
