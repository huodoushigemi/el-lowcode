import { Plugin, inject, mergeProps } from 'vue'
import { deepClone, execExp, toArr, unExp, wrapExp } from '@el-lowcode/utils'
import { createRender } from '@el-lowcode/render'

export * from './ConfigProvider'

export const Render = createRender({
  defaultIs: 'Fragment',
  processProps
})

export default {
 install(app, ...options) {
    
 },
} as Plugin

export function processProps(props, vars) {
  const { vModels, children, ..._props } =  props
  props = _props

  props = deepClone(props, e => _execExp(e, vars))
  props.children = _execExp(children, vars)

  if (vModels) {
    const spread = {}
    for (const key in vModels) {
      const val = toArr(vModels[key])
      const [exp, arg, modifiers, event] = [wrapExp(val[0]), key, val[1], val[2] || [`onUpdate:${key}`, `{{v => ${unExp(val[0])} = v}}`]]
      spread[arg] = _execExp(exp, vars)
      spread[event[0]] = _execExp(event[1], vars)
      if (modifiers) spread[key == 'modelValue' ? 'modelModifiers' : `${key}Modifiers`] = modifiers
    }
    props = mergeProps(spread, props)
  }

  return props
}

function _execExp(exp, vars) {
  try {
    return execExp(exp, vars)
  } catch (e) {
    console.error('exec expression error: ', e)
  }
}