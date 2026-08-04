"use client"

import { useEffect, useReducer, useRef } from "react"

type StateUpdater =
  | Record<string, unknown>
  | ((prev: Record<string, unknown>) => Record<string, unknown>)

type DcLogicLike = {
  state: Record<string, unknown>
  props?: Record<string, unknown>
  setState?: (updater: StateUpdater, callback?: () => void) => void
  componentDidMount?: () => void
  componentWillUnmount?: () => void
  renderVals: () => Record<string, unknown>
}

/**
 * Bridges DC-style class logic (state + renderVals) into React renders.
 */
export function useDcLogic(
  Logic: new () => DcLogicLike,
  props: Record<string, unknown> = {}
): Record<string, unknown> {
  const [, rerender] = useReducer((count: number) => count + 1, 0)
  const logicRef = useRef<DcLogicLike | null>(null)

  if (!logicRef.current) {
    const instance = new Logic() as DcLogicLike
    instance.state = { ...instance.state }
    instance.setState = (updater, callback) => {
      const current = logicRef.current
      if (!current) return
      const patch =
        typeof updater === "function" ? updater(current.state) : updater
      current.state = { ...current.state, ...patch }
      rerender()
      if (callback) {
        queueMicrotask(callback)
      }
    }
    logicRef.current = instance
  }

  const logic = logicRef.current
  logic.props = props

  useEffect(() => {
    logic.componentDidMount?.()
    return () => {
      logic.componentWillUnmount?.()
    }
    // Mount once per logic instance.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return logic.renderVals()
}
