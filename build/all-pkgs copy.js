import fg from 'fast-glob'
import { pkgDir, pkgJson } from './utils'

export const ALL_PKG_DIRS = fg.sync('*/index.ts', { cwd: pkgDir() }).map(e => e.split('/')[0])

export const ALL_PKGS = ALL_PKG_DIRS.map(e => pkgJson(e)?.name).filter(e => e)
