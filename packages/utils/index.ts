import type { App, Component, Plugin } from 'vue'
import { isArray, isObject } from '@vue/shared'
import { AnyFn } from '@vueuse/core'
import type { AddPrefixToKeys, Arrable, Fnable, Obj } from './types'

export * from './types'
export * from './tree'
export * from './file'
export * from './execExp'

type SFCWithInstall<T> = T & Plugin
type Comp = Component & { name: string } & Partial<Plugin>

export function withInstall<T extends Comp>(comp: T, arr?: T[]) {
  comp.install = (app: App) => {
    app.component(comp.name, comp)
    arr?.forEach(e => app.component(e.name, e))
  }
  return comp as SFCWithInstall<T>
}

export const ks = <T extends object>(obj: T) => Object.keys(obj) as (keyof T)[]

export const toArr = <T>(arr?: Arrable<T>) => Array.isArray(arr) ? arr : (arr == null ? [] : [arr])

type UnFn <T> = T extends (...args) => infer R ? R : T
type UnP<T> = T extends (...args: infer P) => any ? P : []
export const unFn = <T extends Fnable<any>>(fn: T, ...args: UnP<T>): UnFn<T> => typeof fn === 'function' ? (fn as Function)(...args) : fn

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

export function deepClone(obj?: Record<string | number, any>, iteratee = val => val) {
  const temp = isArray(obj) ? [] : {}
  for (const key in obj) temp[key] = isObject(obj[key]) ? deepClone(obj[key], iteratee) : iteratee(obj[key])
  return temp
}

export const keyBy = <T>(arr: T[], path: string) => arr.reduce((o, e) => (o[get(e, path)] = e, o), {}) as Record<string, T>

export const pick = <T extends object, KS extends (keyof T)[]>(obj: T, arr: KS) => arr.reduce((o, k) => (o[k] = obj[k], o), {} as Pick<T, KS[number]>)

export const mapValues = (obj: Obj, fn: AnyFn) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, fn(v)]))

export const prefixedObject = <T extends object, P extends string>(prefix: P, obj: T) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [prefix + k, v])) as AddPrefixToKeys<T, P>
