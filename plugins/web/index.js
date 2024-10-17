import { defineAsyncComponent, h } from 'vue'
import Page from './page'
import Grid from './grid'

if (typeof document != 'undefined') import('wc-appbar')
if (typeof document != 'undefined') import('wc-waterfall')

export default {
  install(app) {
    app.use(Page)
    app.use(Grid)
    
    app.component('AbsoluteLayout', (props, { slots }) => h('div', props, slots))
    app.component('VHtml', (props) => h('div', { ...props }))
    
    app.component('wangeditor', defineAsyncComponent(() => import('./wangeditor.vue')))
    app.component('markdown-it', defineAsyncComponent(() => import('./markdown-it.vue')))
    app.component('qrcode', defineAsyncComponent(() => import('./qrcode.vue')))
    app.component('hljs', (props) => (import('wc-hljs'), import('highlight.js/lib/common'), h('wc-hljs', props)))
  }
}