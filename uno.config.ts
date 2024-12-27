import { defineConfig, presetAttributify, presetUno, presetIcons, transformerVariantGroup, transformerDirectives } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'

const gaps = [-4, -2, -1, 0, 1, 2, 4, 6, 8, 10, 12, 'a'].flatMap(e => [e, e + '!'])

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
    'block',
    'inline-block',
    'flex!',
    'flex-wrap',
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
    ...gaps.map(e => `p${e}`),
    ...gaps.map(e => `pt${e}`),
    ...gaps.map(e => `pr${e}`),
    ...gaps.map(e => `pb${e}`),
    ...gaps.map(e => `pl${e}`),
    ...gaps.map(e => `px${e}`),
    ...gaps.map(e => `py${e}`),
    ...gaps.map(e => `gap-${e}`),
    ...gaps.map(e => `gap-x-${e}`),
    ...gaps.map(e => `gap-y-${e}`),
    ...gaps.map(e => `col-span-${e}`),
    ...gaps.map(e => `row-span-${e}`),
    ...gaps.map(e => `grid-cols-${e}`),
    ...gaps.map(e => `space-x-${e}`),
    ...gaps.map(e => `space-y-${e}`),
    
    ...Array(4).fill(0).map((e, i) => `col-span-${i + 1}`),
    ...Array(4).fill(0).map((e, i) => `row-span-${i + 1}`),
    ...Array(4).fill(0).map((e, i) => `grid-cols-${i + 1}`),
    ...Array(4).fill(0).map((e, i) => `space-x-${i + 1}`),
    ...Array(4).fill(0).map((e, i) => `space-y-${i + 1}`),
    '[&>*]:mb0',
    '[&>*]:mb0!',
    '[&>*]:mb8',
    '[&>*]:mb8!',
    '[&>*]:flex-1',
    'text-32',
    'font-bold',
    'cursor-cell',
    'animate-spin',
    'w24', 'w22', 'w20', 'w18',
    'h24', 'h22', 'h20', 'h18',
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
