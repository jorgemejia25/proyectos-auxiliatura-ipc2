"use client"

import { useDcLogic } from "@/components/dc/use-dc-logic"
import { Proyecto1Logic } from "@/components/projects/proyecto1/logic"
import { Proyecto1SimuladorPanel } from "@/components/projects/proyecto1/sections/simulador"
import { Proyecto1XmlPanel } from "@/components/projects/proyecto1/sections/xml"
import { Proyecto1CodigoPanel } from "@/components/projects/proyecto1/sections/codigo"

/**
 * Client island that owns shared simulator state for Proyecto1.
 */
export function Proyecto1Interactive() {
  const v = useDcLogic(Proyecto1Logic, { accent: "#7C3AED", stepMs: 110, showDot: true, carnet: "#Carnet" })

  return (
    <>
      <Proyecto1SimuladorPanel v={v} />
      <Proyecto1XmlPanel v={v} />
      <Proyecto1CodigoPanel v={v} />
    </>
  )
}
