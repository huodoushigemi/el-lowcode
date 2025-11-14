import _alias from '@rollup/plugin-alias'
import { cwd, pkgDir } from '../utils.js'
import { ALL_PKGS } from '../all-pkgs.js'
import path from 'path'

export const entries = ALL_PKGS.map(pkg => ({
  find: pkg,
  replacement: path.join(cwd, pkgDir(pkg.replace('@el-lowcode/', ''), 'index.ts'))
}))
