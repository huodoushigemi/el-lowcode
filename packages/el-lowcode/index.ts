import { Plugin, inject } from 'vue'
import { deepClone, execExp } from '@el-lowcode/utils'
import { createRender } from '@el-lowcode/render'

export * from './ConfigProvider'

export const Render = createRender({
  defaultIs: 'div',
  processProps
})

export default {
 install(app, ...options) {
    
 },
} as Plugin

export function processProps(props, { state } = inject('pageCtx') as any) {
  const { children, ..._props } =  props
  props = _props

  const vars = { state }
  props = deepClone(props, e => _execExp(e, vars))
  props.children = _execExp(children, vars)

  return props
}

function _execExp(exp, vars) {
  try {
    return execExp(exp, vars)
  } catch (e) {
    console.error('exec expression error: ', e)
  }
}