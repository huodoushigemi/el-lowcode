import { Component, ObjectPlugin } from 'vue'

export * from './page'

const _comps = import.meta.glob('./*/index.ts', { eager: true, import: 'default' })

type Comp = Component & { name: string } & ObjectPlugin

export const components = Object.values(_comps).filter(e => e?.name) as Comp[]
