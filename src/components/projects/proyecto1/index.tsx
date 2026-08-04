import { DeliveryCountdown } from "@/components/delivery-countdown"
import { css } from "@/components/dc/css"
import { PROYECTO1_REPO_NAME, PROYECTO1_TREE_TEXT } from "@/components/projects/proyecto1/data"
import { Proyecto1Interactive } from "@/components/projects/proyecto1/interactive"
import { Proyecto1EntregaSection } from "@/components/projects/proyecto1/sections/entrega"
import { Proyecto1EstructurasSection } from "@/components/projects/proyecto1/sections/estructuras"
import { Proyecto1HeroSection } from "@/components/projects/proyecto1/sections/hero"
import { Proyecto1MatrizSection } from "@/components/projects/proyecto1/sections/matriz"
import { Proyecto1Nav } from "@/components/projects/proyecto1/sections/nav"
import { Proyecto1ObjetivosSection } from "@/components/projects/proyecto1/sections/objetivos"
import { Proyecto1ProblemaSection } from "@/components/projects/proyecto1/sections/problema"
import { Proyecto1ReglasSection } from "@/components/projects/proyecto1/sections/reglas"
import { Proyecto1RobotsSection } from "@/components/projects/proyecto1/sections/robots"
import { Proyecto1RutaSection } from "@/components/projects/proyecto1/sections/ruta"
import { ArtifactStyles } from "@/components/projects/proyecto1/styles"
import { getProject } from "@/lib/projects"

/**
 * Proyecto1 page body: static RSC sections + one client interactive island.
 */
export function Proyecto1View() {
  const project = getProject("proyecto1")

  return (
    <div className="dc-artifact dc-artifact--proyecto1">
      <ArtifactStyles />
      <div
        style={css(
          "min-height:100vh;background-image:linear-gradient(rgba(18,7,32,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(18,7,32,.08) 1px,transparent 1px);background-size:30px 30px;animation:drift 12s linear infinite"
        )}
      >
        <Proyecto1Nav />
        {project ? (
          <DeliveryCountdown deadlineAt={project.deadlineAt} theme={project.theme} />
        ) : null}
        <Proyecto1HeroSection />
        <Proyecto1ObjetivosSection />
        <Proyecto1ProblemaSection />
        <Proyecto1RobotsSection />
        <Proyecto1MatrizSection />
        <Proyecto1Interactive />
        <Proyecto1EstructurasSection />
        <Proyecto1RutaSection treeText={PROYECTO1_TREE_TEXT} />
        <Proyecto1ReglasSection />
        <Proyecto1EntregaSection repoName={PROYECTO1_REPO_NAME} />
      </div>
    </div>
  )
}
