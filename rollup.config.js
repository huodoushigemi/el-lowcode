import { defineConfig } from 'rollup'
import fs from 'fs'
import path from 'path'
import fg from 'fast-glob'
import dts from 'rollup-plugin-dts'

const cwd = process.cwd()
const pkgDir = (...args) => path.join('packages', ...args)

// const packages = fg.sync('*/index.ts', { cwd: pkgDir() }).map(e => e.split('/')[0])
const packages = ['utils']

/**
 * @type {import('rollup').RollupOptions[]}
 */
const configs = []

for (const name of packages) {
  const config = defineConfig{
    input: pkgDir(name, 'index.ts'),
    external: id => !/^[./]/.test(id),
    plugins: [
      dts({
        compilerOptions: {
          preserveSymlinks: false,
          rootDir: pkgDir(name),
          outDir: pkgDir(name, 'dist')
        }
      })
    ]
  })
  configs.push(config)
}

export default configs
