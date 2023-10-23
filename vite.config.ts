import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import VueMacros from 'unplugin-vue-macros/vite'
import UnoCss from 'unocss/vite'
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/vite'
import Pages from 'vite-plugin-pages'
import { visualizer } from 'rollup-plugin-visualizer'
import { ALL_DEPS } from './build/all-pkgs.js'

// console.log(ALL_DEPS);

import { entries } from './build/plugins/alias'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/el-lowcode/designer',
  resolve: {
    alias: [
      ...entries,
      { find: 'vue', replacement: 'https://play.vuejs.org/vue.runtime.esm-browser.js' }
    ]
  },
  build: {
    outDir: 'docs/dest/designer',
    emptyOutDir: false,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          const dep = [...ALL_DEPS, '@vue'].find(e => id.includes(`node_modules/${e}/`))
          if (dep && dep != 'vue') return dep.replaceAll('/', '-')
        }
      },
      plugins: [
        visualizer()
      ]
    }
  },
  plugins: [
    // vue(),
    VueMacros({
      plugins: {
        vue: vue(),
        // vueJsx: VueJsx(), // if needed
      },
    }),
    UnoCss(),
    Components({ resolvers: [IconsResolver()] }),
    Icons({ autoInstall: true }),
    Pages({ dirs: 'designer/pages' })
  ]
})
