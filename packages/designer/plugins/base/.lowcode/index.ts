import { createApp, provide, defineAsyncComponent, h } from 'vue'
import { DesignerCtx } from '@el-lowcode/designer'

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

export function activate(designerCtx: DesignerCtx) {
  designerCtx.viewRenderer['comp-tree'] = create(defineAsyncComponent(() => import('./views/CompTree.vue')))
  designerCtx.viewRenderer['schema-sourcecode'] = create(defineAsyncComponent(() => import('./views/Schema.vue')))
  designerCtx.viewRenderer['plugin-market'] = create(defineAsyncComponent(() => import('./views/PluginsView.vue')))
  designerCtx.viewRenderer['plugin-market.views.all'] = create(defineAsyncComponent(() => import('./views/PluginsView.vue')))
  designerCtx.viewRenderer['plugin-market.views.installed'] = create(defineAsyncComponent(() => import('./views/PluginsView.vue')))
}

export function deactivate(designer) {

}

export const contributes = {
  activitybar: [
    {
      id: 'comp-tree',
      title: '组件树',
      icon: 'https://api.iconify.design/tdesign:tree-list.svg'
    },
    {
      id: 'schema-sourcecode',
      title: 'Schema 源码',
      icon: 'https://api.iconify.design/tdesign:braces.svg'
    },
    {
      id: 'plugin-market',
      title: '插件市场',
      icon: 'https://api.iconify.design/tdesign:extension.svg'
    },
  ],
  views: {
    'plugin-market': [
      { id: 'plugin-market.views.all', name: 'All' },
      { id: 'plugin-market.views.installed', name: 'Installed' },
    ],
  }
}
