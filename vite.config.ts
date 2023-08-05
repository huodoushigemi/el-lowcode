import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import plugins from './build/plugins/index'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    ...plugins()
  ],
})
