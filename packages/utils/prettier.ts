import { Obj } from './types'

export async function prettierFormat(code: string, opt: Obj, plugins: string[] = []) {
  const prettier = await import('https://unpkg.com/prettier@3.4.2/standalone.mjs')
  const exts = await Promise.all(plugins.map(e => import(`https://unpkg.com/prettier@3.4.2/plugins/${e}.mjs`)))
  return await prettier.format(code, { parser: 'babel', semi: false, singleQuote: true, plugins: exts, ...opt })
}