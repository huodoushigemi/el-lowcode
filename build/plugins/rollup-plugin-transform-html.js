import path from 'path'
import { v4 as uuid } from 'uuid'
import { build } from 'vite'
import { mergeConfig } from '../defaultConfig.js'

/**
 * @returns {import('vite').Plugin}
 */
function TransformHtml() {
  const xxx = {}
  
  return {
    name: 'rollup-plugin-transform-html',
    enforce: 'pre',
    resolveId(id, importer, options) {
      if (id?.includes('.html?transform')) {
        const virtualModuleId = `virtual:${uuid()}`
        xxx[virtualModuleId] = path.join(path.dirname(importer), id.split('?')[0])
        return virtualModuleId
      }
    },
    async load(id) {
      const input = xxx[id]
      if (!input) return
      const bundle = await build(mergeConfig({
        configFile: false,
        mode: 'production',
        build: {
          copyPublicDir: false,
          emptyOutDir: false,
          rollupOptions: {
            input
          }
        },
        plugins: [
          (await import('vite-plugin-singlefile')).viteSingleFile()
        ]
      }))

      const code = bundle.output[0].source?.replace('(void 0).accept', '(void 0)?.accept')

      return `export default ${JSON.stringify(code)}`
    }
  }
}

export default TransformHtml