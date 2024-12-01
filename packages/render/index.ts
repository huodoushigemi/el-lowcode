import { h, resolveDynamicComponent, createVNode, createTextVNode, toDisplayString, VNode, inject } from 'vue'
import { isArray, isFunction, isPlainObject } from '@vue/shared'
import { unFn, Fnable, Arrable, mapValues, Obj } from '@el-lowcode/utils'

export type Props = {
  is?: any
  children?: Fnable<string | number | Arrable<Props>>
  $?: {
    if?: any
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
  processProps?: (props: Props, vars: Obj, aaa) => Props
}

/*#__NO_SIDE_EFFECTS__*/
export function createRender({ defaultIs = 'div', processProps = (props) => props }: CreateRender) {
  const __h = (e, vars) => isPlainObject(e) ? Render(e, vars) : e

  const _h = (props: Props, vars: Obj) => {
    const { is, $, children, ...attrs } = processProps(props, vars, {
      provide: (state) => vars = { ...vars, ...state }
    })
    
    return props.$?.if == null || !!$?.if
      ? h(
          // @ts-ignore
          resolveDynamicComponent(is || defaultIs),
          attrs,

          // children
          isArray(children) ? { default: () => children.map(e => __h(e, vars)) } :
          // isPlainObject(children) ? mapValues(children, v => (scope) => v.children.map(e => _h(e))) :
          isPlainObject(children) ? mapValues(children, v => (scope) => __h(v, vars)) :
          isFunction(children) ? { default: () => { const ret = children(); return isArray(ret) ? ret.map(e => __h(e, vars, aaa)) : ret; } } :
          children
        )
      : null
  }

  function Render(props: Props, vars: Obj = {}): Arrable<VNode | null | void> {
    if (props.$?.for) {
      const { $: { for: $for, ...$ }, ..._props } = props
      _props.$ = $
      const { $: { for: $_for } } = processProps({ $: { for: $for } }, vars, {}) as Required<Props>
      if (isArray($_for)) {
        return $_for.map((item, index) => {
          const for_vars = { [$.forArgs?.[0] || 'item']: item, [$.forArgs?.[1] || 'index']: index }
          return _h(props, { ...vars, ...for_vars })
        })
      }
    }
    else {
      return _h(props, vars)
    }
  }

  return (props) => {
    const vars = inject('pageCtx', void 0) as any
    return Render(props, vars)
  }
}

export const Render = createRender({})

export default Render