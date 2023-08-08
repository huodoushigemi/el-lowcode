import { defineConfig } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import Vue from 'unplugin-vue/rollup'
import VueMacros from 'unplugin-vue-macros/rollup'
import esbuild from 'rollup-plugin-esbuild'
import typescript from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
// import plugins from './build/plugins'
// import pkg from './package.json' assert { type: 'json' }

const formats = {
  esm: 'mjs',
  cjs: 'cjs',
  // iife: 'iife.js'
}

// export default defineConfig({
//   input: 'packages/utils/index.ts',
//   output: Object.entries(formats).map(([format, ext]) => ({
//     format,
//     file: `packages/utils/dist/index.${ext}`,
//   })),
//   external: Object.keys(pkg.dependencies || {}),
//   plugins: [
//     // nodeResolve(),
//     // ...plugins(),
//     // VueMacros({
//     //   plugins: {
//     //     vue: Vue(),
//     //     // vueJsx: VueJsx(), // if needed
//     //   },
//     // }),
//     // esbuild({ minify: true, target: ['chrome58', 'ios13'] }),
//     // typescript({ declaration: true, emitDeclarationOnly: true, outDir: 'packages/utils/dist/types', rootDir: 'packages/utils' }),
//     dts()
//   ]
// })

export default defineConfig([
  {
    input: 'packages/utils/index.ts',
    output: [
      { file: 'packages/utils/dist/index.d.ts' },
    ],
    external: ['vue', 'element-plus'],
    // external: id => !/^[./]/.test(id),
    plugins: [
      // nodeResolve(),
      // ...plugins(),
      // VueMacros({
      //   plugins: {
      //     vue: Vue(),
      //     // vueJsx: VueJsx(), // if needed
      //   },
      // }),
      // esbuild({ minify: true, target: ['chrome58', 'ios13'] }),
      // typescript({ declaration: true, emitDeclarationOnly: true, outDir: 'packages/utils/dist/types', rootDir: 'packages/utils' }),
      dts({
        compilerOptions: {
          preserveSymlinks: false,
          rootDir: 'packages/utils'
        }
      })
    ]
  }
])
