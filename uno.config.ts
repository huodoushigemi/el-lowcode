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
    'grid', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4',
    'text-12',
    '-ml4', 'ml4', 'ml8', 'mla', 'mb0', 'mb4', 'mb8', 'my8',
    'gap-4', 'gap-8', 'gap-x-4', 'gap-x-8', 'gap-y-4', 'gap-y-8',
    '[&>*]:mb8',
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
