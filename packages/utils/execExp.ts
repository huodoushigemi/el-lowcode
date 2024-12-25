import { isString } from '@vue/shared'
import { ref, reactive, watch, watchEffect } from 'vue'
import { Obj } from '.'

export const expReg = /^\{\{([\d\D]*)\}\}$/

export const isExp = (exp) => isString(exp) && exp.startsWith('{{') && exp.endsWith('}}')

export const unExp = (exp) => isExp(exp) ? exp.replace(expReg, '$1') : exp
export const wrapExp = (exp) => `{{${unExp(exp)}}}`

const provideVars = { ref, reactive, watch, watchEffect }

export function initState(state: string) {
  const exec = new Function(...Object.keys(provideVars), state)
  return exec(...Object.values(provideVars))
}

export function execExp(any: unknown, ctx: Obj) {
  if (!isExp(any)) return any
  const vars = { ...ctx, ...provideVars }
  const func = new Function(...Object.keys(vars), `return ${unExp(any)}`)
  return func(...Object.values(vars))
}