// @ts-nocheck

import { App } from "vue"

type SFCWithInstall<T> = T & Plugin

export function withInstall<T>(comp: T): SFCWithInstall<T> {
  comp.install = (app: App) => app.component(comp.name, comp)
  return comp
}