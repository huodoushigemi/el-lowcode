if (typeof document != 'undefined') import('wc-appbar')
if (typeof document != 'undefined') import('wc-waterfall')

import { Plugin, inject } from 'vue'
import { deepClone, execExp } from '@el-lowcode/utils'
import { createRender } from '@el-lowcode/render'
import { ElFormRender } from 'el-form-render'
import { CRUD } from '@el-lowcode/crud'
import Web from '../designer/plugins/web'

export const Render = createRender({
  defaultIs: 'div',
  processProps: props => {
    // @ts-ignore
    const { state } = inject('pageCtx', props)
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
    app.use(Web)
    app.use(ElFormRender)
    app.use(CRUD)
 },
} as Plugin