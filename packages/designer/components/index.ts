import { keyBy } from '@el-lowcode/utils'
import native from './native'
import { el_lowcode_widgets } from './el_lowcode_widgets'

const element_plus = import.meta.glob('./element-plus/*.ts', { eager: true, import: 'default' })
const configs = import.meta.glob('./*/config.ts', { eager: true, import: 'default' })

export * from './components'

Object.assign(el_lowcode_widgets, {
  ...keyBy(Object.values(element_plus), 'is'),
  ...keyBy(Object.values(configs), 'is'),
  ...native,
})