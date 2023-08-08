import type { App, Component, Plugin } from 'vue'
import type { Fnable } from './types'

export * from './types'

type SFCWithInstall<T> = T & Plugin
type Comp = Component & { name: string } & Partial<Plugin>

export function withInstall<T extends Comp>(comp: T) {
  comp.install = (app: App) => app.component(comp.name, comp)
  return comp as SFCWithInstall<T>
}

export const ks = <T extends object>(obj: T) => Object.keys(obj) as (keyof T)[]

export const unFn = <T>(fn: Fnable<T>, ...args) => typeof fn === 'function' ? (fn as Function)(...args) : fn

export function get(obj: any, path: string | ((...args) => any)) {
  if (typeof path === 'function') return path(obj)
  for (const k of path.split('.')) if (!(obj = obj[k])) break
  return obj
}

export function set<T>(obj: any, path: string, val: T) {
  const ks = path.split('.')
  ks.slice(0, -1).forEach(k => obj = obj[k] ??= {})
  return obj[ks.at(-1)!] = val
}
