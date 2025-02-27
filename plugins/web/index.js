import { defineAsyncComponent, h } from 'vue'
import { Render } from 'el-lowcode'
import Page from './page'
import Grid from './grid'
import UnoIcon from './UnoIcon.vue'

if (typeof document != 'undefined') import('wc-appbar')
if (typeof document != 'undefined') import('wc-waterfall')

export default {
  install(app) {
    app.use(Page)
    app.use(Grid)
    app.component('UnoIcon', UnoIcon)
    app.component('render', Render)
    
    app.component('AbsoluteLayout', (props, { slots }) => h('div', props, slots))
    app.component('VHtml', (props) => h('div', { ...props }))

    app.component('wangeditor', defineAsyncComponent(() => import('./wangeditor.vue')))
    app.component('tiptap', defineAsyncComponent(() => import('./.lowcode/Tiptap.vue')))
    app.component('qrcode', defineAsyncComponent(() => import('./qrcode.vue')))
    app.component('markdown-it', (props) => (import('wc-mdit'), h('wc-mdit', props)))
    app.component('hljs', (props) => (import('wc-hljs'), import('highlight.js/lib/common'), h('wc-hljs', props)))
  }
}