import { createApp, defineAsyncComponent, h } from 'vue'
import widgetsBorders from './widgets.borders'

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
  designerCtx.viewRenderer['decorates'] = create(defineAsyncComponent(() => import('./DecoratesView.vue')))
}

export const widgets = [
  widgetsBorders
].flat()


export const contributes = (designerCtx) => ({
  activitybar: [
    {
      id: 'decorates',
      title: 'decorates',
      icon: '/icons/decorates.png'
    },
  ],
  views: {
    'decorates': [
      // { id: 'plugin-market.views.all', name: 'All' },
      // { id: 'plugin-market.views.installed', name: 'Installed' },
    ],
  },
})
