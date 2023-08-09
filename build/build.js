import { defineConfig, rollup } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import Vue from 'unplugin-vue/rollup'
import VueMacros from 'unplugin-vue-macros/rollup'
import esbuild from 'rollup-plugin-esbuild'
import ts from '@rollup/plugin-typescript'
import dts from 'rollup-plugin-dts'
import { generateDtsBundle } from 'rollup-plugin-dts-bundle-generator'
import fs from 'fs'
import path from 'path'
import fg from 'fast-glob'
import plugins from './plugins/index.js'

// import pkgJSON from '../package.json' assert { type: 'json' }
import { exec, execSync } from 'child_process'

const formats = {
  esm: 'mjs',
  cjs: 'cjs',
  // iife: 'iife.js'
}

const cwd = process.cwd()
const pkgDir = (...args) => path.join('packages', ...args)

export async function build(pack) {
  const jsonPath = pkgDir(pack, 'package.json')
  if (!fs.existsSync(jsonPath)) return

  const bundle = await rollup({
    input: pkgDir(pack, 'index.ts'),
    // external: Object.keys(JSON.parse(fs.readFileSync(jsonPath, 'utf8')).peerDependencies ?? []),
    // external: Object.keys(pkgJSON.peerDependencies || {}),
    // external: Object.keys(pkgJSON.peerDependencies || {}),
    // external: id => !/^[./]/.test(id),
    external: ['vue', 'element-plus'],
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
      // esbuild(),
      // ts({ allowImportingTsExtensions: true, declaration: true, emitDeclarationOnly: true, noEmit: false, outDir: '', rootDir: pkgDir(pack) }),
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
  execSync(`rimraf ${pkgDir(pack, 'dist')}`)
  execSync(`node_modules\\.bin\\vue-tsc -d --emitDeclarationOnly --outDir ${pkgDir(pack, 'dist/types')} ${pkgDir(pack, 'index.ts')}`, { cwd })

  const bundle = await rollup({
    input: pkgDir(pack, `dist/types/index.d.ts`),
    external: (id, importer, isResolved) => !isResolved && !/^[./]/.test(id),
    plugins: [
      dts({ compilerOptions: { preserveSymlinks: false } }),
    ]
  })

  await bundle.write({
    file: pkgDir(pack, 'dist/index.d.ts')
  })

  execSync(`rimraf ${pkgDir(pack, '/dist/types')}`,  { cwd })

  await bundle.close()
}

// buildFull()
// await build('crud')
// await build('el-form-render')
// await build('utils')

// buildDts('utils')
buildDts('el-form-render')
