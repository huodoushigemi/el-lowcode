import type { App, Plugin } from 'vue'
import FormRender from './form-render.vue'

type SFCWithInstall<T> = T & Plugin

function withInstall<T>(comp: T): SFCWithInstall<T> {
  // @ts-ignore
  comp.install = (app: App) => app.component(comp.name, comp)
  // @ts-ignore
  return comp
}

export const ElFormRender = withInstall(FormRender)
export default ElFormRender