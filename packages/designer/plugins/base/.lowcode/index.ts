import { createApp, provide, defineAsyncComponent, h } from 'vue'
import { DesignerCtx } from '@el-lowcode/designer'

export function activate(designerCtx: DesignerCtx) {
  
  designerCtx.viewRenderer['comp-tree'] = (() => {
    let app
    return {
      mount(container) {
        app = createApp({ provide: { designerCtx }, render: () => h(defineAsyncComponent(() => import('./views/CompTree.vue'))) })
        app.mount(container)
      },
      unmount: () => app.unmount()
    }
  })()
  
  designerCtx.viewRenderer['schema-sourcecode'] = (() => {
    let app
    return {
      mount(container) {
        app = createApp({ provide: { designerCtx }, render: () => h(defineAsyncComponent(() => import('./views/Schema.vue'))) })
        app.mount(container)
      },
      unmount: () => app.unmount()
    }
  })()
  
  designerCtx.viewRenderer['plugin-market'] = (() => {
    let app
    return {
      mount(container) {
        app = createApp({ provide: { designerCtx }, render: () => h(defineAsyncComponent(() => import('./views/PluginsView.vue'))) })
        app.mount(container)
      },
      unmount: () => app.unmount()
    }
  })()
  
  designerCtx.viewRenderer['plugin-market.views.all'] = (() => {
    return {
      mount(container) {
        container.innerHTML = '<p>xxx</p><p>xxx</p><p>xxx</p><p>xxx</p>'
      },
    }
  })()

  designerCtx.viewRenderer['plugin-market.views.installed'] = (() => {
    let app
    return {
      mount(container) {
        app = createApp({ provide: { designerCtx }, render: () => h(defineAsyncComponent(() => import('./views/PluginsView.vue'))) })
        app.mount(container)
      },
      unmount: () => app.unmount()
    }
  })()
}

export function deactivate(designer) {

}

export const contributes = {
  activitybar: [
    {
      id: 'comp-tree',
      title: '组件树',
      icon: 'https://api.iconify.design/tdesign:layers.svg'
    },
    {
      id: 'schema-sourcecode',
      title: 'Schema 源码',
      icon: 'https://api.iconify.design/tdesign:braces.svg'
    },
    {
      id: 'plugin-market',
      title: '插件市场',
      icon: 'https://api.iconify.design/tdesign:app.svg'
    },
  ],
  views: {
    'plugin-market': [
      { id: 'plugin-market.views.all', name: 'All' },
      { id: 'plugin-market.views.installed', name: 'Installed' },
    ],
  }
}
