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

const literals = new Set(['NumericLiteral', 'StringLiteral', 'BooleanLiteral', 'NullLiteral'])

export async function deepWrapExp() {
  const { parseExpression } = await import('@babel/parser')
  const { stringLiteral } = await import('@babel/types')
  const generator = await import('@babel/generator').then(e => e.default)
  const { walk } = await import('estree-walker')
  const JSON5 = await import('https://unpkg.com/json5@2.2.3/dist/index.min.mjs').then(e => e.default)

  return (js: string) => {
    const node = parseExpression(js)
    if (literals.has(node.type)) return node.value
    if (node.type != 'ObjectExpression' && node.type != 'ArrayExpression') return wrapExp(js)
    const xxx = walk(node, {
      enter(node, parent, k) {
        const { type } = node
        if (type == 'ObjectExpression' || type == 'ArrayExpression' || type == 'ObjectProperty') return
        if (parent?.type == 'ArrayExpression' || (parent?.type == 'ObjectProperty')) {
          if (k == 'key') {
            // 由于 JSON5.parse 不支持 数字key，所以这里将 数字key 转为 字符串key
            if (typeof node.value == 'number') this.replace(stringLiteral(`${node.value}`))
            return
          }
          if (literals.has(type)) return
        }
        
        if (type == 'SequenceExpression') {
          node.start--
          node.end++
        }
        this.replace(stringLiteral(wrapExp(js.slice(node.start, node.end))))
        this.skip()
      }
    })
    return JSON5.parse(generator(xxx).code)
  }
}
