import { h, resolveDynamicComponent, createVNode, createTextVNode, toDisplayString } from 'vue'
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
    const { is, _id, $, children, ...attrs } = processProps(props)
    const childs = unFn(children)
    return (
      props.$?.condition == null || !!$?.condition
        ? h(
            // @ts-ignore
            resolveDynamicComponent(is || defaultIs),
            attrs,
            // render children
            {
              default: () =>
                isArray(childs) ? childs.map(e => isPlainObject(e) ? createVNode(Render, e) : e) :
                isPlainObject(childs) ? createVNode(Render, childs) :
                childs
            }
          )
        : null
    )
  }
}

export const Render = createRender({})

export default Render