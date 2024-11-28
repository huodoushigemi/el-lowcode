import { isString } from '@vue/shared'
import { ref, reactive, watch, watchEffect } from 'vue'
import { Obj } from '.'

export const expReg = /^\{\{([\d\D]*)\}\}$/

const provideVars = { ref, reactive, watch, watchEffect }

export function initState(state: string) {
  const exec = new Function(...Object.keys(provideVars), state)
  return exec(...Object.values(provideVars))
}

export function execExp(exp: unknown, ctx: Obj) {
  const matched = isString(exp) ? exp.match(expReg) : undefined
  if (!matched) return exp
  const vars = { ...ctx, ...provideVars }
  const func = new Function(...Object.keys(vars), `return ${matched[1]}`)
  return func(...Object.values(vars))
}