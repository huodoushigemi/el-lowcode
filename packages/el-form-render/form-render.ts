import { PropType, Ref, ref, ExtractPropTypes } from 'vue'
import type { FormItemProps, FormItemRule } from 'element-plus'
import { formProps, formItemProps } from 'element-plus'
import { camelize, isPromise, isString } from '@vue/shared'
import { Arrable, Assign, Fnable, unFn } from '@el-lowcode/utils'

// todo > vue-tsc 使用这个会报错
// import { Awaitable } from '@vueuse/core'
type Awaitable<T> = Promise<T> | T

export type NormalizedOpt = {
  label?: string
  value: any
  [k: string]: any
}

export type Opt = string | NormalizedOpt

// export type Item = Partial<Omit<FormItemProps, 'prop' | 'rules'> & {
//   type: string
//   el: Record<string, any>
//   prop: string
//   is: any
//   hide: boolean | ((row, item: Item) => boolean)
//   get: (val: any, row: any) => any
//   set: (val: any, row: any) => any
//   out: (val: any, row: any) => any
//   lp: string | [string, string]
//   rules: Arrable<FormItemRule | ((row: any) => FormItemRule)>
//   options: Fnable<Awaitable<Opt[]>>
// }>

export const formItemRenderProps = {
  ...formItemProps,
  type: String,
  el: Object,
  prop: String,
  defaultValue: null,
  displayValue: null,
  is: null,
  hide: [Boolean, Function] as PropType<boolean | ((row, item) => boolean)>,
  get: Function as PropType<(val: any, row: any) => any>,
  set: Function as PropType<(val: any, row: any) => any>,
  out: Function as PropType<(val: any, row: any) => any>,
  lp: [String, Array] as PropType<string | [string, string]>,
  rules: [Object, Array, Function] as PropType<Arrable<FormItemRule | ((row: any) => FormItemRule)>>,
  options: [Array, Object, Function] as PropType<Fnable<Awaitable<Opt[]>>>
}

export type Item = ExtractPropTypes<typeof formItemRenderProps>

export const formRenderProps = {
  ...formProps,
  items: Array as PropType<Item[]>,
  // todo
  readonly: [Boolean, Function] as PropType<Fnable<boolean>>
}

export type FormRenderProps = ExtractPropTypes<typeof formRenderProps>

const solveLP = (lp: Item['lp']) => Array.isArray(lp) ? lp : (lp ? [lp, camelize(lp!)] : [])

export const label = (item: Item) => item.label || solveLP(item.lp)[0]
export const prop = (item: Item) => item.prop || solveLP(item.lp)[1]
export const elIs = (item: Item) => item.el?.is ?? 'el-' + (item.type || 'input')
export const normalizeItem = (item: Item) => ({
  label: label(item),
  prop: prop(item),
  ...item,
  options: solveOptions(item.options),
  el: { is: elIs(item), ...item.el }
})

// ==============================================================================================
// ==============================================================================================

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

export const optValue = (opt?: NormalizedOpt) => (opt && 'value' in opt) ? opt.value : opt?.label
export const showOpt = (opt?: NormalizedOpt) => opt?.label ?? opt?.value

const normalizeOpt = (opt: Opt): NormalizedOpt => isString(opt) ? ({ label: opt, value: opt }) : opt