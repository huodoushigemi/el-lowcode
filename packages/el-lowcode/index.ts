import { h, mergeProps } from 'vue'
import { deepClone, execExp, toArr, unExp, wrapExp } from '@el-lowcode/utils'
import { createRender } from '@el-lowcode/render'
import { ConfigProvider } from './ConfigProvider'

export * from './ConfigProvider'

const _Render = createRender({
  defaultIs: 'Fragment',
  processProps
})

export const Render = ({ state, dataSource, css, plugins, ...props }, { slots }) => {
  return h(ConfigProvider, { state, dataSource, css, plugins }, {
    ...slots,
    default: () => h(_Render, props)
  })
}

export function processProps(props, vars) {
  const { vModels, children, ..._props } =  props
  props = _props

  props = deepClone(props, e => execExp(e, vars))
  props.children = execExp(children, vars)

  if (vModels) {
    const spread = {}
    for (const key in vModels) {
      const val = toArr(vModels[key])
      const [exp, modifiers, event] = [val[0], val[1], val[2] || [`onUpdate:${key}`, `{{v => v}}`]]
      spread[key] = execExp(wrapExp(exp), vars)
      spread[event[0]] = execExp(`{{v => ${unExp(exp)} = (${unExp(event[1])})(v)}}`, vars)
      if (modifiers) spread[key == 'modelValue' ? 'modelModifiers' : `${key}Modifiers`] = modifiers
    }
    props = mergeProps(spread, props)
  }

  return props
}