import { rollup } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import chalk from 'chalk'
// import Vue from 'unplugin-vue/rollup'
import Vue from '@vitejs/plugin-vue'
import VueMacros from 'unplugin-vue-macros/rollup'
import ImportMetaGlob from './rollup-plugin-import-meta-glob.js'
import esbuild from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'
// import scss from 'rollup-plugin-scss'
import path from 'path'
import fs from 'fs'
import { execSync } from 'child_process'
// import Commonjs from '@rollup/plugin-commonjs'

import Icons from 'unplugin-icons/rollup'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/rollup'

import plugins from './plugins/index.js'
import { importGlobPlugin } from './importMetaGlob.js'

const log = console.log

const formats = {
  esm: 'mjs',
  cjs: 'cjs',
  // iife: 'iife.js'
}

const cwd = process.cwd()
const pkgDir = (...args) => path.join('packages', ...args)

export async function build(pack) {
  execSync(`rimraf ${pkgDir(pack, 'dist')}/*`)
  
  const jsonPath = pkgDir(pack, 'package.json')
  if (!fs.existsSync(jsonPath)) return
  const pkg = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))

  const bundle = await rollup({
    input: pkgDir(pack, 'index.ts'),
    external: Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies }) ?? [],
    treeshake: 'smallest',
    plugins: [
      nodeResolve(),
      // Commonjs({ defaultIsModuleExports: 'auto', include: [/\.cjs/], extensions: ['.js', '.cjs'] }),
      // ImportMetaGlob({ include: /\.js$/ }),
      importGlobPlugin({ root: process.cwd() }),
      VueMacros({
        plugins: {
          vue: Vue(),
          // vueJsx: VueJsx(), // if needed
        },
      }),
      // Vue(),
      // scss({ include: /css$/ }),
      
      Components({ resolvers: [IconsResolver()] }),
      Icons({ autoInstall: true }),

      esbuild({ minify: false, target: ['chrome58', 'ios13'] }),
      ...plugins(),
    ]
  })

  for (const [format, ext] of Object.entries(formats)) {
    await bundle.write({
        format,
        dir: pkgDir(pack, `dist`),
        chunkFileNames: `[name]-[hash].${ext}`,
        entryFileNames: `[name].${ext}`,
        // name: 'ElFormRender',
    })
  }

  await bundle.close()

  buildDts(pack)
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
    log(chalk.blue(comd))
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

  log('')
}

// buildFull()
// await build('utils')
await build('render')
await build('el-form-render')
await build('crud')
// await build('designer') // todo > unocss
await build('el-lowcode')

// buildDts('el-lowcode')
// buildDts('crud')
// buildDts('el-form-render')
