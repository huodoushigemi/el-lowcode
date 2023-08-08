import fs from 'fs'
import path from 'path'
import fg from 'fast-glob'

const cwd = process.cwd()
const pkgDir = (...args) => path.join('packages', ...args)

// const packages = fg.sync('*/index.ts', { cwd: pkgDir() }).map(e => e.split('/')[0])
const packages = ['utils']

/**
 * @type {import('rollup').RollupOptions[]}
 */
const configs = []

for (const name of packages) {
  /**
   * @type {import('rollup').RollupOptions}
   */
  const config: RollupOptions = {
    input: `${name}/index.ts`,
    plugins: [
      dts({
        compilerOptions: {
          preserveSymlinks: false,
          rootDir: pkgDir(name)
        }
      })
    ]
  }
  configs.push(config)
}

export default configs
