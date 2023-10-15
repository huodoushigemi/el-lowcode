import { Component, Plugin } from 'vue'
import { ElLowcodeConfig } from './type'

export * from './page'

const _comps = import.meta.glob('./*/index.ts', { eager: true, import: 'default' })

type Comp = Component & { name: string, el_lowcode?: ElLowcodeConfig } & Partial<Plugin>

export const components: Comp[] = Object.values(_comps).filter(e => e?.name) as []
