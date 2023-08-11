import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VuePreviewPlugin from 'vite-plugin-vue-preview'
import plugins from './build/plugins/index'
import UnoCSS from 'unocss/vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    // vue(),
    UnoCSS(),
    // ...plugins()
  ],
})
