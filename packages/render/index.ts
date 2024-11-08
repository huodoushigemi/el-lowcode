import { h, resolveDynamicComponent, createVNode, createTextVNode, toDisplayString, VNode } from 'vue'
import { isArray, isFunction, isPlainObject } from '@vue/shared'
import { unFn, Fnable, Arrable, mapValues } from '@el-lowcode/utils'

export type Props = {
  is?: any
  children?: Fnable<string | number | Arrable<Props>>
  $?: {
    condition: any
    loop: string
    loopArgs: [string, string]
  }
  [k: string]: any
}

type CreateRender = {
  /** @default 'div' */
  defaultIs?: any
  processProps?: (props: Props) => Props
}

/*#__NO_SIDE_EFFECTS__*/
export function createRender({ defaultIs = 'div', processProps = (props: Props) => props }: CreateRender) {

  const _h = e => isPlainObject(e) ? Render(e) : e
  
  function Render(props: Props): VNode | null {
    const { is, $, children, ...attrs } = processProps(props)
    
    return (
      props.$?.condition == null || !!$?.condition
        ? h(
            // @ts-ignore
            resolveDynamicComponent(is || defaultIs),
            attrs,

            // children
            isArray(children) ? { default: () => children.map(e => _h(e)) } :
            // isPlainObject(children) ? mapValues(children, v => (scope) => v.children.map(e => _h(e))) :
            isPlainObject(children) ? mapValues(children, v => (scope) => _h(v)) :
            isFunction(children) ? { default: () => { const ret = children(); return isArray(ret) ? ret.map(e => _h(e)) : ret; } } :
            children
          )
        : null
    )
  }

  return Render
}

export const Render = createRender({})

export default Render