import { Ref, ref, toRaw, toValue } from 'vue'
import { isArray } from '@vue/shared'
import { camelize, isPromise, isString } from '@vue/shared'
import { del, get, set, unFn } from '@el-lowcode/utils'
import { Item, Item0, NormalizedOpt, Opt } from './props'

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

export const useTransformer = (_model, _prop, opt: Pick<Item0, 'defaultValue' | 'displayValue' | 'get' | 'set' | 'out'> & { untrackedGet?: boolean; silentSet?(v, model): any } = {}) => {
  const ret = {
    get() {
      const model = toValue(_model), prop = toValue(_prop)
      if (prop == null) return
      let v = get(opt.untrackedGet ? toRaw(model) : model, prop)
      if (opt.get) v = opt.get(v, model)
      if (opt.defaultValue !== undefined && (v === undefined || v === '')) set(model, prop, v = unFn(opt.defaultValue))
      if (opt.displayValue !== undefined && (v === undefined || v === '')) v = unFn(opt.displayValue)
      return v
    },
    set(v) {
      const model = toValue(_model), prop = toValue(_prop)
      if (prop == null) return
      if (opt.silentSet) set(toRaw(model), prop, opt.silentSet(v, model))
      else if (opt.set) set(model, prop, opt.set(v, model))
      else set(model, prop, v)
      if (opt.out) Object.assign(model, opt.out(v, model))
      v = get(model, prop)
      if (opt.displayValue !== undefined && v === unFn(opt.displayValue)) del(toRaw(model), prop)
    },
    get v() { return this.get() },
    set v(v) { this.set(v) },

    get value() { return this.get() },
    set value(v) { this.set(v) },
    __v_isRef: true,
  }
  return ret as typeof ret & Ref<any>
}