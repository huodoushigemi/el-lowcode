import { createApp, defineAsyncComponent, h } from 'vue'
import { ElTooltip } from 'element-plus'

function create(AsyncComp) {
  let app
  return {
    mount(container, designerCtx) {
      app = createApp({ provide: { designerCtx }, render: () => h(AsyncComp) })
      app.mount(container)
    },
    unmount: () => app.unmount()
  }
}

export function activate(designerCtx) {
  // designerCtx.viewRenderer['template'] = create(defineAsyncComponent(() => import('./TemplateView.vue')))
  const div = document.createElement('div')
  const app = createApp({ provide: { designerCtx }, render: () => 
    h(ElTooltip, { effect: 'light', content: '敬请期待……' }, 
      h('img', { style: 'position: fixed; right: 300px; bottom: 20px; width: 64px; height: 64px; cursor: pointer', src: 'https://cdn.pixabay.com/photo/2023/05/08/00/43/chatgpt-7977357_640.png' })
    )
  })
  app.mount(div)
  document.body.append(div)
}

export function deactivate(designerCtx) {

}


export const contributes = {
  activitybar: [
    
  ],
}