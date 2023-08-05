import { defineConfig } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import Vue from 'unplugin-vue/rollup'
import VueMacros from 'unplugin-vue-macros/rollup'
import esbuild from 'rollup-plugin-esbuild'
import typescript from '@rollup/plugin-typescript'
import plugins from './build/plugins'
import pkg from './package.json' assert { type: 'json' }

const formats = {
  esm: 'mjs',
  cjs: 'cjs',
  // iife: 'iife.js'
}

export default defineConfig({
  input: 'packages/el-form-render/index.ts',
  output: Object.entries(formats).map(([format, ext]) => ({
    format,
    file: `packages/el-form-render/dist/index.${ext}`,
    // name: 'ElFormRender',
  })),
  external: Object.keys(pkg.peerDependencies ?? []),
  plugins: [
    // nodeResolve(),
    ...plugins(),
    VueMacros({
      plugins: {
        vue: Vue(),
        // vueJsx: VueJsx(), // if needed
      },
    }),
    esbuild({ minify: true, target: ['chrome58', 'ios13'] }),
    // typescript({ declaration: true, emitDeclarationOnly: true, outDir: 'types' }),
  ]
})
