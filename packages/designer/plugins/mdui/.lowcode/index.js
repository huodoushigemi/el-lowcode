import { createApp, h } from 'vue'
import { CompView } from '@el-lowcode/designer'
import { keyBy } from '@el-lowcode/utils'
import widgets from './config'

function create(AsyncComp) {
  let app
  return {
    mount(container) {
      app = createApp({ provide: { designerCtx }, render: () => h(AsyncComp, { list: widgets }) })
      app.mount(container)
    },
    unmount: () => app.unmount()
  }
}

export function activate(designerCtx) {
  designerCtx.viewRenderer['mdui'] = create(CompView)
  
  Object.assign(designerCtx.widgets, keyBy(widgets, 'is'))
}

export const contributes = {
  activitybar: [
    {
      id: 'mdui',
      title: 'mdui',
      icon: 'https://gd-hbimg.huaban.com/a0b457393dccfdd658d709b890a3fddd4ef5756c24cd-6hPlHQ_fw658webp',
    }
  ]
}