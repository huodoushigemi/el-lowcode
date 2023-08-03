import type { PropType } from 'vue'
import type { FormItemProps } from 'element-plus'
import { formProps } from 'element-plus'

export type Item = Partial<FormItemProps> & Partial<{
  type: string
  el: Record<string, any>
  prop: string
  is: any
  hide: boolean | (() => boolean)
  get: (val: any) => any
  set: (val: any) => any
  lp: string | [string, string]
}>

export const formRenderProps = {
  ...formProps,
  items: Array as PropType<Item[]>
}
