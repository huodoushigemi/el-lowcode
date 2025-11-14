const h = (tag, props) => Object.assign(document.createElement(tag), props)

const js2b64 = js => `data:text/javascript,` + js

async function gencode(dep) {
  const script = h('script', { type: 'module', innerHTML: `import * as M from '${dep}'; window.shareDeps['${dep}'].resolve(M)` })
  document.head.append(script)

  window.shareDeps ??= {}
  window.shareDeps[dep] = {}
  window.shareDeps[dep].result = await new Promise(resolve => window.shareDeps[dep].resolve = resolve)
  script.remove()

  return js2b64(`const __dep = window.parent.shareDeps['${dep}'].result\n` + Object.keys(window.shareDeps[dep].result).map(k => `export const ${k} = __dep.${k}`).join('\n'))
}

export const importmap = async () => ({
  imports: {
    'vue': await gencode('vue'),
    'vue-demi': await gencode('vue-demi'),
  }
})
