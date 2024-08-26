import { createApp, defineAsyncComponent, h } from 'vue'

function create(AsyncComp) {
  let app
  return {
    mount(container) {
      app = createApp({ provide: { designerCtx }, render: () => h(AsyncComp) })
      app.mount(container)
    },
    unmount: () => app.unmount()
  }
}

export function activate(designerCtx) {
  designerCtx.viewRenderer['template'] = create(defineAsyncComponent(() => import('./TemplateView.vue')))
}

export function deactivate(designerCtx) {

}


export const contributes = {
  activitybar: [
    {
      id: 'template',
      title: '在线模板',
      icon: 'https://api.iconify.design/mdi:shopping-outline.svg'
    },
  ],
}