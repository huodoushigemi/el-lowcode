import path from 'path'
import { v4 as uuid } from 'uuid'
import { build, defineConfig, mergeConfig } from 'vite'
import { defaultConfig } from '../defaultConfig.js'

/**
 * @returns {import('rollup').Plugin}
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
      const bundle = await build(mergeConfig(defaultConfig, defineConfig({
        configFile: false,
        mode: 'production',
        build: {
          copyPublicDir: false,
          rollupOptions: {
            input
          }
        },
        plugins: [(await import('vite-plugin-singlefile')).viteSingleFile()]
      })))

      const code = bundle.output[0].source?.replace('(void 0).accept', '(void 0)?.accept')

      return `export default ${JSON.stringify(code)}`
    },
    transform(code, id) {
      return xxx[id] ? code : void 0
    }
  }
}

export default TransformHtml