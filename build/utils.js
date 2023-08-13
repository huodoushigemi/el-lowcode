import path from 'path'

export const cwd = process.cwd()
export const pkgDir = (...args) => path.join('packages', ...args)
