import { h, resolveDynamicComponent, createVNode, createTextVNode, toDisplayString, VNode } from 'vue'
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

/*#__NO_SIDE_EFFECTS__*/
export function createRender({ defaultIs = 'div', processProps = (props: Props) => props }: CreateRender) {
  return function Render(props: Props): VNode | null {
    const { is, $, children, ...attrs } = processProps(props)
    return (
      props.$?.condition == null || !!$?.condition
        ? h(
            // @ts-ignore
            resolveDynamicComponent(is || defaultIs),
            attrs,
            {
              default: () => {
                const childs = unFn(children)
                return (
                  // todo
                  // isArray(childs) ? childs.map(e => isPlainObject(e) ? createVNode(Render, e) : e) :
                  isArray(childs) ? childs.map(e => isPlainObject(e) ? Render(e) : e) :
                  // isPlainObject(childs) ? Render(childs) :
                  childs
                )
              }
            }
          )
        : null
    )
  }
}

export const Render = createRender({})

export default Render