import { defineConfig } from 'vite'
import { cwd } from './utils.js'
import { entries } from './plugins/alias.js'

export const defaultConfig = defineConfig({
  root: cwd,
  resolve: {
    alias: [
      ...entries,
    ]
  },
  build: {
    rollupOptions: {
      // external: ['vue', '@vueuse/core'],
      // output: {
      //   manualChunks: (id) => {
      //     const dep = [...ALL_DEPS, '@vue'].find(e => id.includes(`node_modules/${e}/`))
      //     if (dep && dep != 'vue') return dep.replaceAll('/', '-')
      //   },
      // }
    }
  },
  plugins: [
    (await import('unplugin-vue-macros/vite')).default({
      plugins: {
        vue: (await import('@vitejs/plugin-vue')).default(),
        vueJsx: (await import('@vitejs/plugin-vue-jsx')).default(), // if needed
      }
    }),
    (await import('unocss/vite')).default(),
    (await import('unplugin-vue-components/vite')).default({ resolvers: [(await import('unplugin-icons/resolver')).default()] }),
    (await import('unplugin-icons/vite')).default({ autoInstall: true }),
    (await import('rollup-plugin-external-globals')).default(id => (
      id == 'vue' ? 'Vue' :
      id == 'vue-demi' ? 'Vue' :
      // id == 'moveable' ? 'Moveable' :
      // id == '@vueuse/core' ? 'VueuseCore' :
      // id.includes('monaco-editor') ? 'MonacoEditor' :
      void 0
    ))
  ]
})
