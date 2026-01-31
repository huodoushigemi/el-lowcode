import { defineConfig, mergeConfig } from 'vite'
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
import Externalize from 'vite-plugin-externalize-dependencies'

/**
 * @param {import('vite').UserConfig} config
 */
export const defineConfig2 = (config) => {
  return mergeConfig(buildConfig, config)
}

export const defaultConfig = defineConfig(async (env) => ({
  root: cwd,
  resolve: {
    alias: env.command == 'serve' ? entries : [],
    external: ['vue', 'vue-demi']
  },
  build: {
    rollupOptions: {
      external: ['vue', 'vue-demi']
    }
  },
  plugins: [
    Macros({ plugins: {
      vue: Vue({
        template: {
          compilerOptions: { isCustomElement: (tag) => tag.startsWith('wc-') }
        }
      }),
      vueJsx: VueJsx()
    } }),
    Unocss(),
    Components({ resolvers: [IconsResolver()] }),
    Icons({ autoInstall: true }),
    Externalize({ externals: ['vue', 'vue-demi'] }),
    // (await import('vite-plugin-external')).default({
    //   externals: {
    //     'vue': 'Vue',
    //     'vue-demi': 'VueDemi'
    //   }
    // })
  ]
}))

const buildConfig = await defaultConfig({ command: 'build' })
const devConfig = await defaultConfig({ command: 'serve' })