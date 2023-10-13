import { readFileSync, existsSync, writeFileSync } from 'fs'
import path from 'path'

export const cwd = process.cwd()
export const pkgDir = (...args) => path.join('packages', ...args)
export const pkgJsonPath = (dir) => pkgDir(dir, 'package.json')

export const pkgJson = (dir, content) => {
  if (content) return writeFileSync(pkgJsonPath(dir), JSON.stringify(content, null, '  '))
  return existsSync(pkgJsonPath(dir)) ? JSON.parse(readFileSync(pkgJsonPath(dir), 'utf8')) : null
}