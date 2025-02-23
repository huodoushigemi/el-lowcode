import { Obj } from './types'

export async function prettierFormat(code: string, opt?: Obj, plugins: string[] = []): Promise<string> {
  const prettier = await import('https://unpkg.com/prettier@3.4.2/standalone.mjs')
  const exts = await Promise.all(plugins.map(e => import(/* @vite-ignore */ `https://unpkg.com/prettier@3.4.2/plugins/${e}.mjs`)))
  return await prettier.format(code, { parser: 'babel', semi: false, singleQuote: true, plugins: exts, ...opt })
}

export function formatJs(code: string, opt?: Obj) {
  return prettierFormat(code, { printWidth: 128, ...opt }, ['babel', 'estree']).then(e => e.trim())
}

export async function formatJsExp(code: string, opt?: Obj) {
  return (await formatJs(`return ${code}`, opt)).slice(7)
}