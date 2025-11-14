import { defineComponent, h, onMounted, ref, inject } from 'vue'
import * as Vue from 'vue'
import { delay } from 'es-toolkit'
// import * as VueDemi from 'vue-demi'
// import * as Moveable from 'moveable'

import { designerCtxKey } from '../../interface'

const getUrl = fn => new URL(fn.toString().match(/["'](.+?)["']/)[1], import.meta.url).href

import { importmap } from './deps-share'

import html from './_template.asset.html?raw'
const main = getUrl(() => import('@el-lowcode/render-drag'))

const sw = getUrl(() => import('./sw'))
await navigator.serviceWorker.register(sw, { scope: sw.replace(/[^\/]+$/, '') })
  .then(async e => {
    const { installing } = e
    if (installing) await new Promise(cb => installing.addEventListener('statechange', e => installing.state == 'activated' && cb()))
    e.active!.postMessage(['template', await import('./_template.asset.html?raw').then(e => e.default)])
    await new Promise(cb => navigator.serviceWorker.addEventListener('message', e => e.data[0] == 'template_cb' && cb()))
  })

const IframeCanvas = defineComponent({
  setup(props, { attrs }) {
    const el = ref()
    const lcd = inject(designerCtxKey)!

    return () => (
      h('iframe', {
        ref: el,
        src: getUrl(() => './_template.asset.html'),
        async onVnodeMounted({ el }) {
          lcd.canvas.window = el.contentWindow
          const window = el.contentWindow as Window
          window.designerCtx = window.lcd = lcd
          window.Vue = Vue
          window.VueDemi = Vue
          window.__VUE_HMR_RUNTIME__ = __VUE_HMR_RUNTIME__

          await delay(100)
          {
            const { document } = window
            const script = Object.assign(document.createElement('script'), { type: 'importmap', innerHTML: JSON.stringify(await importmap(), null, 2) })
            document.head.prepend(script)
          }
          {
            const { document } = window
            const script = Object.assign(document.createElement('script'), { type: 'module', innerHTML: `import('${main}').then(e => e.mount())` })
            document.head.append(script)
          }
        },
        onVnodeBeforeUnmount({ el }) {
          el.contentWindow.unmount?.()
        }
      })
    )
  }
})

export default IframeCanvas
