import type { App, Component, ObjectPlugin } from 'vue'
import { isArray, isObject } from '@vue/shared'
import { AnyFn } from '@vueuse/core'
import type { AddPrefixToKeys, Arrable, Fnable, Obj } from './types'

export * from './types'
export * from './tree'
export * from './file'
export * from './execExp'
export * from './uid'
export * from './hooks'
export * from './html2schema'

type SFCWithInstall<T> = T & ObjectPlugin
type Comp = Component & { name: string } & ObjectPlugin

export function withInstall<T extends Comp>(comp: T, arr?: Comp[]) {
  comp.install = (app: App) => {
    app.component(comp.name, comp)
    arr?.forEach(e => app.component(e.name, e))
  }
  return comp as SFCWithInstall<T>
}

const numReg = /^\d+$/

export const ks = <T extends object>(obj: T) => Object.keys(obj) as (keyof T)[]

export const toArr = <T>(arr?: Arrable<T>) => Array.isArray(arr) ? arr : (arr == null ? [] : [arr])

type UnFn <T> = T extends (...args) => infer R ? R : T
type UnP<T> = T extends (...args: infer P) => any ? P : []
export const unFn = <T extends Fnable<any>>(fn: T, ...args: UnP<T>): UnFn<T> => typeof fn === 'function' ? fn(...args) : fn

export function get(obj: any, path: string | ((...args) => any)) {
  if (typeof path === 'function') return path(obj)
  for (const k of path.split('.')) if (!(obj = obj[k])) break
  return obj
}

export function set<T>(obj: any, path: string, val: T) {
  return path.split('.').reduce((o, k, i, ks) => i == ks.length - 1 ? (o[k] = val) : (o[k] ??= numReg.test(ks[i + 1]) ? [] : {}), obj)
}

export function deepClone(obj?: Record<string | number, any>, iteratee = (v, k) => v, bool = (v) => true) {
  const temp = isArray(obj) ? [] : {}
  for (const k in obj) temp[k] = isObject(obj[k]) && bool(obj[k]) ? deepClone(obj[k], iteratee, bool) : iteratee(obj[k], k)
  return temp
}

export const keyBy = <T>(arr: T[], path: string) => arr.reduce((o, e) => (o[get(e, path)] = e, o), {}) as Record<string, T>

export const groupBy = <T>(arr: T[], path: string) => arr.reduce((o, e) => ((o[get(e, path)] ??= []).push(e), o), {}) as Record<string, T[]>

export const pick = <T extends object, KS extends (keyof T)[]>(obj: T, arr: KS) => arr.reduce((o, k) => (o[k] = obj?.[k], o), {} as Pick<T, KS[number]>)

export const omit = <T extends object, KS extends (keyof T)[]>(obj: T, arr: KS) => pick(obj, Object.keys(obj).filter((e: any) => !arr.includes(e)) as any) as Omit<T, KS[number]>

export const mapValues = (obj: Obj, fn: AnyFn) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, fn(v)]))

export const prefixedObject = <T extends object, P extends string>(prefix: P, obj: T) => Object.fromEntries(Object.entries(obj).map(([k, v]) => [prefix + k, v])) as AddPrefixToKeys<T, P>

export const inRange = (v: number, min = 0, max = Infinity) => v >= min && v <= max

export const eq = (a, b) => JSON.stringify(a) == JSON.stringify(b)