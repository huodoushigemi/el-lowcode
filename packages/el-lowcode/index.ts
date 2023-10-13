import('wc-appbar')
import('wc-fill-remain')
import('wc-waterfall')

import { Plugin, inject } from 'vue'
import { createRender } from '@el-lowcode/render'

import { components, pageCtxKey } from '@el-lowcode/designer'

import { deepClone, execExp } from '@el-lowcode/utils'

import ElFormRender from 'el-form-render'
import Crud from '@el-lowcode/crud'

export const Render = createRender({
  defaultIs: 'div',
  processProps: props => {
    // @ts-ignore
    const { state } = inject(pageCtxKey, props)
    const { children, ..._props } =  props
    props = _props

    const _execExp = (exp) => {
      try {
        return execExp(exp, { state })
      } catch (e) {
        console.error('exec expression error: ', e)
      }
    }

    props = deepClone(props, _execExp)
    return { ...props, children: _execExp(children) }
  }
})

export default {
 install(app, ...options) {
    components.forEach(e => {
      if (e.install) e.install(app)
      else app.component(e.name, e)
    })
    app.use(ElFormRender)
    app.use(Crud)
 },
} as Plugin