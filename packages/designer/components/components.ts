import { Component, Plugin } from 'vue'
import { ElLowcodeConfig } from './type'

export * from './page'

// const _comps = import.meta.glob('./*/index.ts', { eager: true })
const _comps = import.meta.globEager('./*/index.ts')

type Comp = Component & { name: string, el_lowcode?: ElLowcodeConfig } & Partial<Plugin>

export const components: Comp[] = Object.values(_comps).map(e => e.default).filter(e => e?.name) as []
