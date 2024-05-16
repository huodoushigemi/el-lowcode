import { defineConfig, presetAttributify, presetUno, presetIcons, transformerVariantGroup } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'

export default defineConfig({
  content: {
    pipeline: {
      exclude: '**/node_modules/'
    },
  },
  presets: [
    presetUno(),
    presetAttributify(),
    presetRemToPx({ baseFontSize: 4 }),
    presetIcons()
  ],
  // transformers: [
  //   transformerVariantGroup()
  // ],
  safelist: [
    'inline-block',
    'flex!',
    'ml4', 'ml8', 'mla', 'mb0', 'mb4', 'mb8'
  ],
  shortcuts: {
    'bg-hover': 'hover:bg-[--el-fill-color-light] active:bg-[--el-fill-color-dark]! rd-6 [&.is-active]:bg-[--el-fill-color-light]',
    'overlay': `relative after-content-[''] after-absolute after-inset-0 after-bg-gray/40`,
    'aic': 'items-center',
    'jcc': 'justify-center',
    'jcsb': 'justify-between',
    'jic': 'justify-items-center',
  }
})
