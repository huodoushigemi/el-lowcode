import { readFileSync } from 'fs'
import jsdom from 'jsdom'
import path from 'path'
import { v4 as uuid } from 'uuid'

/**
 * @returns {import('rollup').Plugin}
 */
function TransformHtml() {
  const xxx = {}
  
  return {
    name: 'rollup-plugin-transform-html',
    enforce: 'pre',
    resolveId(id, importer, options) {
      if (id.includes('.html?transform')) {
        const virtualModuleId = `virtual:${uuid()}`
        xxx[virtualModuleId] = path.join(path.dirname(importer), id.split('?')[0])
        return virtualModuleId
      }
    },
    async load(id) {
      if (!xxx[id]) return
      const dom = new jsdom.JSDOM(readFileSync(xxx[id], 'utf8'))
      const doc = dom.window.document
      const modules = [...doc.querySelectorAll('script[type="module"]')].filter(e => e.innerHTML)
      for (const node of modules) {
        // const jscode = this.transform(node.innerHTML, `${id}.${i}.js`)
        // const jscode = await this.resolve(node.innerHTML, xxx[id], { isEntry: true })
        // console.log(1111, jscode, node.innerHTML)
        this.emitFile({ code: '' })
        node.innerHTML = jscode
      }
      return `export default ${JSON.stringify(dom.serialize())}`
    },
    transform(id) {
      
    }
  }
}

export default TransformHtml