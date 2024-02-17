import { writeFileSync } from 'fs'
import fse from 'fs-extra'
import path from 'path'

export const cwd = process.cwd().replaceAll('\\', '/')
export const pkgDir = (...args) => path.join('packages', ...args)
export const pkgJsonPath = (dir) => pkgDir(dir, 'package.json')

export const pkgJson = (dir, content) => {
  if (content) return writeFileSync(pkgJsonPath(dir), JSON.stringify(content, null, '  '))
  return fse.readJsonSync(pkgJsonPath(dir))
}