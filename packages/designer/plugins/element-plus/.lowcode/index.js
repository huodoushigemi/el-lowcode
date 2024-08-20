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
  designerCtx.viewRenderer['element-plus'] = create(CompView)

  Object.assign(designerCtx.widgets, keyBy(widgets, 'is'))
}

export { default as widgets } from './config'

export const contributes = {
  // activitybar: [
  //   {
  //     id: 'element-plus',
  //     title: 'element-plus',
  //     icon: 'https://element.eleme.cn/2.0/favicon.ico',
  //   }
  // ]
}
