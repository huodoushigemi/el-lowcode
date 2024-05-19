import { Ref, ref } from 'vue'
import { isArray } from '@vue/shared'
import { camelize, isPromise, isString } from '@vue/shared'
import { unFn } from '@el-lowcode/utils'
import { Item, NormalizedOpt, Opt } from './props'

const solveLP = (lp: Item['lp']) => isArray(lp) ? lp : (lp ? [lp, camelize(lp!)] : [])

type LP = Pick<Item, 'lp'> & {
  label?: string
  prop?: string
}

export const label = (item: LP) => item.label || solveLP(item.lp)[0]
export const prop = (item: LP) => item.prop || solveLP(item.lp)[1]
export const normalizeItem = (item: Item) => ({
  label: label(item),
  prop: prop(item),
  ...item,
  options: solveOptions(item.options),
})

const waekMap = new WeakMap<any, Ref<NormalizedOpt[]>>()

export const solveOptions = (opts?: Item['options']) => {
  if (!opts) return undefined
  if (waekMap.has(opts)) return waekMap.get(opts)!.value
  const ret = ref<NormalizedOpt[]>([])
  waekMap.set(opts, ret)
  // solve
  const val = unFn(opts)
  if (isPromise(val)) val.then(val => ret.value = val.map(normalizeOpt))
  else ret.value = val.map(normalizeOpt)
  // 
  return ret.value
}

export const showOpt = (opt?: NormalizedOpt) => opt?.label ?? opt?.value

const normalizeOpt = (opt: Opt): NormalizedOpt => isString(opt) ? ({ label: opt, value: opt }) : isArray(opt) ? { label: opt[0], value: opt[1] } : opt