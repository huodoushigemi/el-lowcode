// @ts-nocheck

import type { App, Plugin } from 'vue'
import FormRender from './form-render.vue'
export * from './form-render.ts'

type SFCWithInstall<T> = T & Plugin

function withInstall<T>(comp: T): SFCWithInstall<T> {
  comp.install = (app: App) => app.component(comp.name, comp)
  return comp
}

export const ElFormRender = withInstall(FormRender)
export default ElFormRender