// @ts-nocheck

import type { App, Plugin } from 'vue'
import FormRender from './form-render.vue'
export * from './form-render.ts'

import { ElForm } from 'element-plus'
import 'element-plus/es/components/form/style/css'

type SFCWithInstall<T> = T & Plugin

function withInstall<T>(comp: T): SFCWithInstall<T> {
  comp.install = (app: App) => {
    app.component(comp.name, comp)
    app.use(ElForm)
  }
  return comp
}

export const ElFormRender = withInstall(FormRender)
export default ElFormRender