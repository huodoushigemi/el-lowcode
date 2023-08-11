import { PropType } from 'vue'
import type { FormItemProps } from 'element-plus'
import { formProps } from 'element-plus'
import { Fnable } from '@el-lowcode/utils'

type Opt = {
  label?: string
  value?: any
  [k: string]: any
}

export type Item = Partial<FormItemProps> & Partial<{
  type: string
  el: Record<string, any>
  prop: string
  is: any
  hide: boolean | (() => boolean)
  get: (val: any) => any
  set: (val: any) => any
  lp: string | [string, string]
  options: Opt[]
}>

export const formRenderProps = {
  ...formProps,
  items: Array as PropType<Item[]>,
  // todo
  readonly: [Boolean, Function] as PropType<Fnable<boolean>>
}

const solveLP = (lp: string | string[] | undefined) => Array.isArray(lp) ? lp : lp?.split(' ')

export const label = (item: Item) => item.label || solveLP(item.lp)![0]
export const prop = (item: Item) => item.prop || solveLP(item.lp)![1]