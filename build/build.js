import { rollup } from 'rollup'
import { nodeResolve } from '@rollup/plugin-node-resolve'
import chalk from 'chalk'
// import Vue from 'unplugin-vue/rollup'
import Vue from '@vitejs/plugin-vue'
import Jsx from '@vitejs/plugin-vue-jsx'
import VueMacros from 'unplugin-vue-macros/rollup'
import ImportMetaGlob from './rollup-plugin-import-meta-glob.js'
import esbuild from 'rollup-plugin-esbuild'
import dts from 'rollup-plugin-dts'
import path from 'path'
import fs from 'fs'
import fse from 'fs-extra'
import { execSync } from 'child_process'
// import Commonjs from '@rollup/plugin-commonjs'

import Icons from 'unplugin-icons/rollup'
import IconsResolver from 'unplugin-icons/resolver'
import Components from 'unplugin-vue-components/rollup'

import plugins from './plugins/index.js'
import { importGlobPlugin } from './importMetaGlob.js'

import { pkgDir } from './utils.js'

const log = console.log

const formats = {
  esm: 'mjs',
  // cjs: 'cjs',
  // iife: 'iife.js'
}

const cwd = process.cwd()

export async function build(pack) {
  execSync(`rimraf ${pkgDir(pack, 'dist')}/*`)
  
  const jsonPath = pkgDir(pack, 'package.json')
  if (!fs.existsSync(jsonPath)) return
  const pkg = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))

  const bundle = await rollup({
    input: pkgDir(pack, 'index.ts'),
    external: Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies }) ?? [],
    plugins: [
      nodeResolve(),
      // Commonjs({ defaultIsModuleExports: 'auto', include: [/\.cjs/], extensions: ['.js', '.cjs'] }),
      // ImportMetaGlob({ include: /\.js$/ }),
      importGlobPlugin({ root: process.cwd() }),
      VueMacros({
        plugins: {
          vue: Vue({ style: true }),
          vueJsx: Jsx(),
        },
      }),
      
      Components({ resolvers: [IconsResolver()] }),
      Icons({ autoInstall: true }),

      esbuild({ minify: false, target: ['chrome78', 'ios13'] }),
      ...plugins(),
    ]
  })

  for (const [format, ext] of Object.entries(formats)) {
    await bundle.write({
        format,
        dir: pkgDir(pack, `dist`),
        chunkFileNames: `[name]-[hash].${ext}`,
        entryFileNames: `[name].${ext}`,
    })
  }

  await bundle.close()

  ;['package.json', 'README.md'].forEach(name => {
    const file = pkgDir(pack, name)
    if (fs.existsSync(file)) fse.copyFileSync(file, pkgDir(pack, 'dist', name))
  })

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
    const comd =`npx vue-tsc -d --emitDeclarationOnly --skipLibCheck --jsx preserve --allowJs --outDir ${pkgDir(pack, 'dist/types')} ${pkgDir(pack, 'index.ts')}`
    log(chalk.blue(comd))
    execSync(comd, { cwd })
  } catch (e) {
    
  }

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

  execSync(`rimraf ${pkgDir(pack, '/dist/types')}`)

  await bundle.close()

  log('')
}

// buildFull()
// await build('utils')
await build('render')
await build('el-form-render')
// await build('crud')
// await build('designer') // todo > unocss
await build('el-lowcode')
