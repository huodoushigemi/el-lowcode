import { h, createRenderer, defineAsyncComponent, createApp } from 'vue'
import { ConfigProvider } from 'el-lowcode'
import DragBox from './drag-box2.vue'
import { rendererOptions } from './rendererOptions'
import type { DesignerCtx } from '../designer/layout/interface'

import './style.scss'

declare const designerCtx: DesignerCtx
declare const lcd: DesignerCtx

export const mount = () => {
  const app = createRenderer(rendererOptions).createApp({
  // const app = createApp({
    provide: {
      designerCtx
    },
    render: () => [
      // todo updated
      h(ConfigProvider, { key: designerCtx.rootNode.id, schema: designerCtx.root }, {
        default: () => h(DragBox, { root: designerCtx.root }),
        loading: () => h('h1', { style: 'margin: 0; text-align: center; transform: translate(0, 45vh);' }, 'Loading……')
      }),
    ]
  })

  app.mount(document.body)

  app._context.reload = void 0

  window.unmount = () => {
    app.unmount()
  }
}