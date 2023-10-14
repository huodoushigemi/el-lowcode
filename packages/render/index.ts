import { h, resolveDynamicComponent, createVNode } from 'vue'
import { isArray, isPlainObject } from '@vue/shared'
import { unFn, Fnable, Arrable } from '@el-lowcode/utils'

export type Props = {
  is?: any
  children?: Fnable<string | number | Arrable<Props>>
  [k: string]: any
}

export function createRender({ defaultIs = 'div', processProps = (props: Props) => props } = {}) {
  return function Render(props: Props) {
    let { is, children, ...attrs } = processProps(props)
    children = unFn(children)
    return h(
      resolveDynamicComponent(is ?? defaultIs),
      attrs,
      // render children
      isArray(children) ? children.map(e => isPlainObject(e) ? createVNode(Render, e) : e) :
      isPlainObject(children) ? createVNode(Render, children) :
      children
    )
  }
}

export const Render = createRender()

export default Render