import { createApp, h } from 'vue'
import { CompView } from '@el-lowcode/designer'
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
  designerCtx.viewRenderer['echarts'] = create(CompView)
}

export { default as widgets } from './config'

export const contributes = {
  // activitybar: [
  //   {
  //     id: 'echarts',
  //     title: 'echarts',
  //     icon: 'https://echarts.apache.org/zh/images/favicon.png',
  //   }
  // ]
}