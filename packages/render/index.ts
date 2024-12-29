import { h, resolveDynamicComponent, VNode, inject } from 'vue'
import { hasOwn, isArray, isFunction, isPlainObject } from '@vue/shared'
import { Fnable, Arrable, mapValues, Obj } from '@el-lowcode/utils'

export type Props = {
  is?: any
  vFor?: [string, string?, string?]
  vIf?: string
  vModels?: Record<string, [string, string[], string[]]>
  children?: Fnable<string | number | Props[] | Record<string, Props>>
  [k: string]: any
}

export type ProcessedProps = {
  is?: any
  vFor?: [any[], string?, string?]
  vIf?: boolean
  vModels?: Record<string, [string, string[], [string, () => void]]>
  children?: Fnable<string | number | ProcessedProps[] | Record<string, ProcessedProps>>
  [k: string]: any
}

type CreateRender = {
  /** @default 'div' */
  defaultIs?: any
  processProps?: (props: Props, vars: Obj, aaa) => ProcessedProps
}

/*#__NO_SIDE_EFFECTS__*/
export function createRender({ defaultIs = 'div', processProps = (props) => props as unknown as ProcessedProps }: CreateRender) {
  const __h = (e, vars) => isPlainObject(e) ? Render(e, vars) : e

  const _h = (props: Props, vars: Obj) => {
    const { is, vIf, children, ...attrs } = processProps(props, vars, {
      provide: (state) => vars = { ...vars, ...state }
    })

    isFunction(children) ? { x: () => { const ret = children() } } : void 0
    
    return !hasOwn(props, 'vIf') || !!vIf
      ? h(
          // @ts-ignore
          resolveDynamicComponent(is || defaultIs),
          attrs,

          // children
          isArray(children) ? { default: () => children.map(e => __h(e, vars)) } :
          isPlainObject(children) ? mapValues(children, v => (scope) => __h(v, vars)) :
          isFunction(children) ? { default: () => { const ret = (children as any)(); return isArray(ret) ? ret.map(e => __h(e, vars)) : ret; } } :
          children
        )
      : null
  }

  function Render(props: Props, vars: Obj = {}): Arrable<VNode | void | null> {
    if (props.vFor) {
      const { vFor } = props
      const { vFor: _vFor } = processProps({ vFor }, vars, {})
      if (isArray(_vFor)) {
        return _vFor[0].map((item, index) => {
          const for_vars = { [_vFor[1] || 'item']: item, [_vFor[1] || 'index']: index }
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