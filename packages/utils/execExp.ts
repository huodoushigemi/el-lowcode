import { isString } from '@vue/shared'
import { ref, reactive, watch, watchEffect, toValue } from 'vue'
import { Fnable, get, Obj, set } from './index'

export const expReg = /^\{\{([\d\D]*)\}\}$/

export const isExp = exp => isString(exp) && exp.startsWith('{{') && exp.endsWith('}}')

export const unExp = exp => (isExp(exp) ? exp.replace(expReg, '$1') : exp)
export const wrapExp = exp => `{{${unExp(exp).trim()}}}`

const _ = { get, set }
const provideVars = { ref, reactive, watch, watchEffect, _ }

export function initState(state: string) {
  const exec = new Function(...Object.keys(provideVars), state)
  return exec(...Object.values(provideVars))
}

export function execExp(any: unknown, ctx: Fnable<Obj>) {
  if (!isExp(any)) return any
  try {
    const vars = { ...toValue(ctx), ...provideVars }
    const func = new Function(...Object.keys(vars), `return ${unExp(any)}`)
    return func(...Object.values(vars))
  } catch (e) {
    console.error('exec expression error:', unExp(any), toValue(ctx))
    throw e
  }
}
