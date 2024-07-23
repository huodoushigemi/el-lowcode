import { defineConfig, presetAttributify, presetUno, presetIcons, transformerVariantGroup, transformerDirectives } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'

const gaps = [-4, 0, 4, 8, 10, 12, 'a']

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
  transformers: [
    // transformerVariantGroup()
    transformerDirectives()
  ],
  safelist: [
    'inline-block',
    'flex!',
    'grid',
    'text-12',
    ...gaps.map(e => `m${e}`),
    ...gaps.map(e => `mt${e}`),
    ...gaps.map(e => `mr${e}`),
    ...gaps.map(e => `mb${e}`),
    ...gaps.map(e => `ml${e}`),
    ...gaps.map(e => `mx${e}`),
    ...gaps.map(e => `my${e}`),
    ...gaps.map(e => `-m${e}`),
    ...gaps.map(e => `-mt${e}`),
    ...gaps.map(e => `-mr${e}`),
    ...gaps.map(e => `-mb${e}`),
    ...gaps.map(e => `-ml${e}`),
    ...gaps.map(e => `-mx${e}`),
    ...gaps.map(e => `-my${e}`),
    ...gaps.map(e => `gap-${e}`),
    ...gaps.map(e => `gap-x-${e}`),
    ...gaps.map(e => `gap-y-${e}`),
    ...Array(4).fill(0).map((e, i) => `col-span-${i + 1}`),
    ...Array(4).fill(0).map((e, i) => `grid-cols-${i + 1}`),
    '[&>*]:mb8',
    '[&>*]:flex-1',
    'cursor-cell'
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
