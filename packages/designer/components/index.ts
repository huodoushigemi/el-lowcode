import { keyBy, mapValues } from '@el-lowcode/utils'
import { components } from './components'
import native from './native'
import { el_lowcode_widgets } from './el_lowcode_widgets'

const element_plus = import.meta.globEager('./element-plus/*.ts')
const configs = import.meta.globEager('./*/config.ts')

export * from './components'

Object.assign(el_lowcode_widgets, {
  ...keyBy(Object.values(element_plus).map(e => e.default), 'is'),
  ...keyBy(Object.values(configs).map(e => e.default), 'is'),
  ...native,
})