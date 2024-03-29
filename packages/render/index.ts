import { h, resolveDynamicComponent, createVNode } from 'vue'
import { isArray, isPlainObject } from '@vue/shared'
import { unFn, Fnable, Arrable } from '@el-lowcode/utils'

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

export function createRender({ defaultIs = 'div', processProps = (props: Props) => props }: CreateRender) {
  return function Render(props: Props) {
    let { is, children, $, ...attrs } = processProps(props)
    children = unFn(children)
    return (
      props.$?.condition == null || !!$?.condition
        ? h(
            // @ts-ignore
            resolveDynamicComponent(is || defaultIs),
            attrs,
            // render children
            isArray(children) ? children.map(e => isPlainObject(e) ? createVNode(Render, e) : e) :
            isPlainObject(children) ? createVNode(Render, children) :
            children
          )
        : null
    )
  }
}

export const Render = createRender({})

export default Render