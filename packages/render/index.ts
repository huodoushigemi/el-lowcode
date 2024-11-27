import { h, resolveDynamicComponent, createVNode, createTextVNode, toDisplayString, VNode } from 'vue'
import { isArray, isFunction, isPlainObject } from '@vue/shared'
import { unFn, Fnable, Arrable, mapValues, Obj } from '@el-lowcode/utils'

export type Props = {
  is?: any
  children?: Fnable<string | number | Arrable<Props>>
  $?: {
    condition?: any
    // loop: string
    // loopArgs: [string, string]
    for?: string
    forArgs?: [string, string]
  }
  [k: string]: any
}

type CreateRender = {
  /** @default 'div' */
  defaultIs?: any
  processProps?: (props: Props, vars: Obj) => Props
}

/*#__NO_SIDE_EFFECTS__*/
export function createRender({ defaultIs = 'div', processProps = (props: Props, vars: Obj) => props }: CreateRender) {
  const __h = e => isPlainObject(e) ? Render(e) : e

  const _h = (props: Props, vars: Obj) => {
    const { is, $, children, ...attrs } = processProps(props, vars)
    
    return props.$?.condition == null || !!$?.condition
      ? h(
          // @ts-ignore
          resolveDynamicComponent(is || defaultIs),
          attrs,

          // children
          isArray(children) ? { default: () => children.map(e => __h(e)) } :
          // isPlainObject(children) ? mapValues(children, v => (scope) => v.children.map(e => _h(e))) :
          isPlainObject(children) ? mapValues(children, v => (scope) => __h(v)) :
          isFunction(children) ? { default: () => { const ret = children(); return isArray(ret) ? ret.map(e => __h(e)) : ret; } } :
          children
        )
      : null
  }

  function Render(props: Props, vars: Obj = {}): Arrable<VNode | null | void> {
    if (props.$?.for) {
      const { $: { for: $for, ...$ }, ..._props } = props
      _props.$ = $
      const { $: { for: $_for } } = processProps({ $: { for: $for } }, vars) as Required<Props>
      if (isArray($_for)) {
        return $_for.map((item, index) => {
          const for_vars = { [$.forArgs?.[0] || 'item']: item, [$.forArgs?.[1] || 'index']: index }
          return _h(_props, { ...vars, ...for_vars })
        })
      }
    }
    else {
      return _h(props, vars)
    }
  }

  return Render
}

export const Render = createRender({})

export default Render