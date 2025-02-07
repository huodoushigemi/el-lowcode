import { createApp, defineAsyncComponent, h } from 'vue'
import { showDialog } from '@el-lowcode/designer'

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
    // {
    //   id: 'ai',
    //   title: 'AI',
    //   icon: 'https://api.iconify.design/solar:magic-stick-broken.svg'
    // },
  ],
  views: {
    // 'ai': [
    //   { id: 'ai.d2c', name: 'D2C', renderer: create(defineAsyncComponent(() => import('./D2C.vue'))) },
    // ],
  },
  menus: {
    'node/context': node => [
      { label: 'AI 助手', icon: 'https://api.iconify.design/solar:magic-stick-broken.svg', children: [
        { label: '图转码', icon: 'https://api.iconify.design/mdi:image-outline.svg', onClick: () => d2c(node) }
      ] },
    ]
  }
}

function d2c(node) {
  const ps = showDialog({ is: 'el-drawer', withHeader: false }, {
    default: () => h(defineAsyncComponent(() => import('./D2C.vue')), { lcd: node.designerCtx, style: 'margin: 0 -6px', onOk: ps.resolve }),
    footer: void 0
  })
}