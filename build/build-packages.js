import { rollup } from 'rollup'
import { build as vite } from 'vite'
import chalk from 'chalk'
import dts from 'rollup-plugin-dts'
import fs from 'fs'
import { execSync } from 'child_process'

import { pkgDir } from './utils.js'
import { defineConfig2 } from './defaultConfig.js'

const log = console.log

const cwd = process.cwd()

export async function build(pack) {
  execSync(`rimraf ${pkgDir(pack, 'dist')}/*`)
  
  const jsonPath = pkgDir(pack, 'package.json')
  if (!fs.existsSync(jsonPath)) return
  const pkg = JSON.parse(fs.readFileSync(jsonPath, 'utf8'))
  
  await vite(defineConfig2({
    configFile: false,
    mode: 'production',
    build: {
      outDir: pkgDir(pack, 'dist'),
      target: 'esnext',
      copyPublicDir: false,
      lib: {
        entry: pkgDir(pack, 'index.ts'),
        formats: ['es'],
        fileName: '[name]',
      },
      rollupOptions: {
        external: Object.keys({ ...pkg.dependencies, ...pkg.peerDependencies }) ?? []
      }
    },
    plugins: [
      // nodeResolve(),
      (await import('vite-plugin-css-injected-by-js')).default(),
      // esbuild({ minify: false, target: ['chrome78', 'ios13'] }),
    ]
  }))

  // ;['package.json', 'README.md'].forEach(name => {
  //   const file = pkgDir(pack, name)
  //   if (fs.existsSync(file)) fse.copyFileSync(file, pkgDir(pack, 'dist', name))
  // })

  // buildDts(pack)
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
await build('utils')
await build('render')
await build('render-drag')
// await build('crud')
await build('el-lowcode')
await build('designer')
