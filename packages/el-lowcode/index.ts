import { h, mergeProps } from 'vue'
import { isArray, isObject } from '@vue/shared'
import { deepClone, execExp, isExp, toArr, unExp } from '@el-lowcode/utils'
import { createRender } from '@el-lowcode/render'
import { ConfigProvider } from './ConfigProvider'

export * from './ConfigProvider'

const _Render = createRender({ processProps })

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
    const spread1 = {}, spread2 = {}
    for (const key in vModels) {
      const val = toArr(vModels[key])
      const [exp, modifiers, event] = [val[0], val[1], val[2] || [`onUpdate:${key}`, `{{v => v}}`]]
      const ids = unExp(exp).split(/\??\./)
      spread2[key] = execExp(`{{${ids.join('?.')}}}`, vars)
      spread1[event[0]] = execExp(`{{v => _.set(${ids[0]}, '${ids.slice(1).join('.')}', (${unExp(event[1])})(v))}}`, vars)
      if (modifiers) spread1[key == 'modelValue' ? 'modelModifiers' : `${key}Modifiers`] = modifiers
    }
    props = mergeProps(spread1, props, spread2)
  }

  return props
}

export function cloneObj(obj, vars, bool = v => true) {
  const ret = isArray(obj) ? [] : {}
  for (const k in obj) {
    if (isExp(obj[k])) {
      Object.defineProperty(ret, k, { get() { return execExp(obj[k], vars) }, enumerable: true })
    }
    else {
      const desc = Object.getOwnPropertyDescriptor(obj, k)!
      if (isObject(desc.value) && bool(desc.value)) ret[k] = cloneObj(desc.value, vars, bool)
      else Object.defineProperty(ret, k, desc)
    }
  }
  return ret
}