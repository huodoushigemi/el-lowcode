import type { App, Plugin } from 'vue'
import type { Funable } from '../../../types/global'

type SFCWithInstall<T> = T & Plugin

export function withInstall<T>(comp: T): SFCWithInstall<T> {
  // @ts-ignore
  comp.install = (app: App) => app.component(comp.name, comp)
  // @ts-ignore
  return comp
}

export const ks = <T extends object>(obj: T) => Object.keys(obj) as (keyof T)[]

export const unFun = <T>(fn: Funable<T>, ...args) => typeof fn === 'function' ? (fn as Function)(...args) : fn

export function get(obj: any, path: Funable<string>) {
  // @ts-ignore
  if (typeof path === 'function') return path(obj)
  for (const k of path.split('.')) if (!(obj = obj[k])) break
  return obj
}

export function set<T>(obj: any, path: string, val: T) {
  const ks = path.split('.')
  ks.slice(0, -1).forEach(k => obj = obj[k] ??= {})
  return obj[ks.at(-1)!] = val
}