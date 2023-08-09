import { defineConfig } from 'rollup'
import fs from 'fs'
import fg from 'fast-glob'
import path from 'path'
import dts from 'rollup-plugin-dts'
import ts from '@rollup/plugin-typescript'
import { generateDtsBundle } from 'rollup-plugin-dts-bundle-generator'

const cwd = process.cwd()
const pkgDir = (...args) => path.join('packages', ...args)

// const packages = fg.sync('*/index.ts', { cwd: pkgDir() }).map(e => e.split('/')[0])
const packages = ['utils']

/**
 * @type {import('rollup').RollupOptions[]}
 */
const configs = []

for (const name of packages) {
  const config = defineConfig({
    input: pkgDir(name, 'index.ts'),
    external: (id, importer, isResolved) => !isResolved && !/^[./]/.test(id),
    output: {
      // file: pkgDir(name, 'dist/index.d.ts')
      dir: pkgDir(name, 'dist')
    },
    plugins: [
      dts({ compilerOptions: { preserveSymlinks: false } }),
      // generateDtsBundle({
      //   outFile: pkgDir(name, 'dist/index.d.ts')
      // })
      // ts({ allowImportingTsExtensions: true, declaration: true, emitDeclarationOnly: true, outDir: pkgDir(name, 'dist/types'), rootDir: pkgDir(name) })
    ]
  })
  configs.push(config)
}

export default configs
