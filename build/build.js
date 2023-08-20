import { rollup } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import Vue from 'unplugin-vue/rollup'
// import Vue from '@vitejs/plugin-vue'
import VueMacros from 'unplugin-vue-macros/rollup'
import esbuild from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'
import { generateDtsBundle } from 'rollup-plugin-dts-bundle-generator'
import path from 'path'
import fs from 'fs'
import fg from 'fast-glob'
import { execSync } from 'child_process'

import plugins from './plugins/index.js'

const formats = {
  esm: 'mjs',
  cjs: 'cjs',
  // iife: 'iife.js'
}

const cwd = process.cwd()
const pkgDir = (...args) => path.join('packages', ...args)

export async function build(pack) {
  execSync(`rimraf ${pkgDir(pack, 'dist')}`)
  
  const jsonPath = pkgDir(pack, 'package.json')
  if (!fs.existsSync(jsonPath)) return
  const pkg = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))

  const bundle = await rollup({
    input: pkgDir(pack, 'index.ts'),
    external: Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies }) ?? [],
    plugins: [
      nodeResolve(),
      VueMacros({
        plugins: {
          vue: Vue(),
          // vueJsx: VueJsx(), // if needed
        },
      }),
      // Vue(),
      esbuild(),
      // esbuild({ minify: true, target: ['chrome58', 'ios13'] }),
      ...plugins(),
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
  try {
    const comd =`node_modules\\.bin\\vue-tsc -d --emitDeclarationOnly --outDir ${pkgDir(pack, 'dist/types')} ${pkgDir(pack, 'index.ts')}`
    console.log(comd);
    execSync(comd, { cwd })
  } catch (e) {

  }

  const bundle = await rollup({ 
    input: pkgDir(pack, `dist/types/index.d.ts`),
    external: (id, importer, isResolved) => !isResolved && !/^[./]/.test(id),
    plugins: [
      dts({ compilerOptions: { preserveSymlinks: false } }),
      // generateDtsBundle({ entry: pkgDir(pack, `dist/types/index.d.ts`), outFile: pkgDir(pack, `dist/index.d.ts`) })
    ]
  })

  await bundle.write({
    file: pkgDir(pack, 'dist/index.d.ts')
  })

  execSync(`rimraf ${pkgDir(pack, '/dist/types')}`,  { cwd })

  await bundle.close()
}

// buildFull()
await build('utils')
// await build('render')
await build('el-form-render')
await build('crud')

// buildDts('crud')
// buildDts('el-form-render')
