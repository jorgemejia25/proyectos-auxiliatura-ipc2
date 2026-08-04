"use client"

import { useDcLogic } from "@/components/dc/use-dc-logic"
import { Practica1Logic } from "@/components/projects/practica1/logic"
import { Practica1SimuladorPanel } from "@/components/projects/practica1/sections/simulador"
import { Practica1CodigoPanel } from "@/components/projects/practica1/sections/codigo"

/**
 * Client island that owns shared simulator state for Practica1.
 */
export function Practica1Interactive() {
  const v = useDcLogic(Practica1Logic, { mostrarCodigo: true, pacientesDemo: false, dosisPorKgDefault: 5 })

  return (
    <>
      <Practica1SimuladorPanel v={v} />
      <Practica1CodigoPanel v={v} />
    </>
  )
}
