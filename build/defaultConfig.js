import { defineConfig } from 'vite'
import { cwd } from './utils.js'
import { entries } from './plugins/alias.js'

import Macros from 'unplugin-vue-macros/vite'
import Vue from '@vitejs/plugin-vue'
import VueJsx from '@vitejs/plugin-vue-jsx'
import Unocss from 'unocss/vite'
import Components from 'unplugin-vue-components/vite'
import IconsResolver from 'unplugin-icons/resolver'
import Icons from 'unplugin-icons/vite'
import Globals from 'rollup-plugin-external-globals'
import TransformHtml from './plugins/rollup-plugin-transform-html.js'

/**
 * @param {import('vite').UserConfig} config 
 */
export const mergeConfig = (config) => defineConfig({
  root: cwd,
  ...config,
  resolve: {
    ...config.resolve,
    alias: [
      ...entries,
      ...config.resolve?.alias || [],
    ]
  },
  plugins: [
    Macros({ plugins: { vue: Vue(), vueJsx: VueJsx() } }),
    Unocss(),
    Components({ resolvers: [IconsResolver()] }),
    Icons({ autoInstall: true }),
    TransformHtml(),
    {
      enforce: 'post',
      ...Globals(id => (
        id == 'vue' ? 'Vue' :
        id == 'vue-demi' ? 'VueDemi' :
        // id == 'vue-request' ? 'VueRequest' :
        id == 'moveable' ? 'Moveable' :
        // id == '@vueuse/core' ? 'VueuseCore' :
        // id.includes('monaco-editor') ? 'MonacoEditor' :
        void 0
      ))
    },
    ...config.plugins || []
  ]
})
