import { PropType, Ref, ref } from 'vue'
import type { FormItemProps, FormItemRule } from 'element-plus'
import { formProps } from 'element-plus'
import { Awaitable } from '@vueuse/core'
import { Arrable, Fnable, unFn } from '@el-lowcode/utils'

export type Opt = {
  label?: string
  value?: any
  [k: string]: any
}

export type Item = Omit<Partial<FormItemProps>, 'rules'> & Partial<{
  type: string
  el: Record<string, any>
  prop: string
  is: any
  hide: boolean | ((row, item: Item) => boolean)
  get: (val: any, row: any) => any
  set: (val: any, row: any) => any
  out: (val: any, row: any) => any
  lp: string | [string, string]
  rules: Arrable<FormItemRule | ((row: any) => FormItemRule)>
  options: Fnable<Awaitable<Opt[]>>
}>

export const formRenderProps = {
  ...formProps,
  items: Array as PropType<Item[]>,
  // todo
  readonly: [Boolean, Function] as PropType<Fnable<boolean>>
}

const solveLP = (lp: string | string[] | undefined) => Array.isArray(lp) ? lp : lp?.split(' ')

export const label = (item: Item) => item.label || solveLP(item.lp)?.[0]
export const prop = (item: Item) => item.prop || solveLP(item.lp)![1]
export const showOpt = (opt?: Opt) => opt?.label ?? opt?.value

// ==============================================================================================
// ==============================================================================================

const waekMap = new WeakMap<any, Ref<Opt[]>>()

export const solveOptions = (opts?: Item['options']) => {
  if (!opts) return undefined
  if (waekMap.has(opts)) return waekMap.get(opts)!.value
  const ret = ref<Opt[]>([])
  waekMap.set(opts, ret)
  ;(async () => ret.value = await unFn(opts))()
  return ret.value
}
