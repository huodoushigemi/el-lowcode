import { compileScript, compileStyle, compileTemplate, parse } from '@vue/compiler-sfc'

export function vue2esm(vuetext: string, filename: string) {
  const scopeId = `data-v-${+new Date}`

  const { descriptor, errors } = parse(vuetext)
  const script = compileScript(descriptor, { id: scopeId, genDefaultAs: '__sfc__', inlineTemplate: true }).content
  const style = descriptor.styles.map(e => compileStyle({ source: e.content, id: scopeId, filename }).code).join('\n')

  const ret = [
    script,
    `const styleEl = document.createElement('style')
    styleEl.innerHTML =  \`${style}\`
    document.body.append(styleEl)\n`,
    `export default __sfc__`,
  ].join('\n\n')

  console.groupCollapsed(filename)
  console.log(ret);
  console.groupEnd()

  return ret
}