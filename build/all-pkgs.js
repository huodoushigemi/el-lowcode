import fg from 'fast-glob'
import { cwd, pkgDir, pkgJson } from './utils.js'
import fse from 'fs-extra'
import path from 'path'

export const ALL_PKG_DIRS = fg.sync('*/index.ts', { cwd: pkgDir() }).map(e => e.split('/')[0])

export const ALL_PKGS = ALL_PKG_DIRS.map(e => pkgJson(e)?.name).filter(e => e)

export const ALL_DEPS = (() => {
  let ret = ALL_PKG_DIRS.map(e => {
    const pkg = pkgJson(e)
    return [...Object.keys(pkg.dependencies || {}), ...Object.keys(pkg.peerDependencies || {})]
  }).flat()

  const rootPkg = fse.readJsonSync(path.join(cwd, 'package.json'))
  ret.push(...Object.keys(rootPkg.dependencies || {}), ...Object.keys(rootPkg.peerDependencies || {}))

  return [...new Set(ret)]
})()