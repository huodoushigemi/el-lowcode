import { createApp, defineAsyncComponent, h } from 'vue'

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

export const contributes = {
  activitybar: [
    {
      id: 'ai',
      title: 'AI',
      icon: 'https://api.iconify.design/solar:magic-stick-broken.svg'
    },
  ],
  views: {
    'ai': [
      { id: 'ai.d2c', renderer: create(defineAsyncComponent(() => import('./D2C.vue'))) },
    ],
  },
}