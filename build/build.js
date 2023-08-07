import { defineConfig, rollup } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import Vue from 'unplugin-vue/rollup'
import VueMacros from 'unplugin-vue-macros/rollup'
import esbuild from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'
import fs from 'fs'
import path from 'path'
import plugins from './plugins/index.js'

import pkgJSON from '../package.json' assert { type: 'json' }
import { exec, execSync } from 'child_process'

const formats = {
  esm: 'mjs',
  cjs: 'cjs',
  // iife: 'iife.js'
}

const cwd = process.cwd()
const pkgDir = (...args) => path.join(cwd, 'packages', ...args)

export async  function build(pack) {
  const jsonPath = pkgDir(pack, 'package.json')
  if (!fs.existsSync(jsonPath)) return

  const bundle = await rollup({
    input: pkgDir(pack, 'index.ts'),
    // external: Object.keys(JSON.parse(fs.readFileSync(jsonPath, 'utf8')).peerDependencies ?? []),
    external: Object.keys(pkgJSON.dependencies || {}),
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
    ]
  })

  for (const [format, ext] of Object.entries(formats)) {
    await bundle.write({
        format,
        file: pkgDir(pack, `dist/index.${ext}`),
        // name: 'ElFormRender',
    })
  }

  await bundle.close()

  await buildDts(pack)
}

export async function buildFull() {
  const dirs = fs.readdirSync(pkgDir())
  for (const dir of dirs) {
    console.log(`=========================================== ${dir} ===========================================`)
    await build(dir)
  }
}

async function buildDts(pack) {
  // execSync(`npx vue-tsc --declaration --emitDeclarationOnly --outDir packages/${pack}/dist/types packages/${pack}/index.ts`)

  const bundle = await rollup({
    // input: pkgDir(`${pack}/dist/types/${pack}/index.d.ts`),
    input: pkgDir(`${pack}/index.ts`),
    // external: Object.keys(pkgJSON.dependencies || {}),
    external: id => !/^[./]/.test(id),
    plugins: [
      dts()
    ]
  })

  await bundle.write({
    file: pkgDir(`${pack}/dist/index.d.ts`),
  })

  // execSync(`rimraf packages/${pack}/dist/types`)

  // await bundle.close()
}

// buildFull()
// await build('crud')
// await build('el-form-render')

buildDts('utils')