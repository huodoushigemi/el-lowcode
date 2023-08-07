import { defineConfig, presetAttributify, presetUno } from 'unocss'
import presetRemToPx from '@unocss/preset-rem-to-px'

export default defineConfig({
  content: {
    filesystem: [
      '**/*.{html,js,ts,jsx,tsx,vue}',
    ]
  },
  presets: [presetUno(), presetAttributify(), presetRemToPx({ baseFontSize: 4 })]
})
