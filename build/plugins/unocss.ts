import UnoCSS from 'unocss/vite'
import { presetAttributify, presetUno } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'

export const unocss = UnoCSS({
  presets: [presetUno(), presetAttributify(), presetRemToPx({ baseFontSize: 4 })]
})
