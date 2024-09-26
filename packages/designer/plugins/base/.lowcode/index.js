import { createApp, provide, defineAsyncComponent, h } from 'vue'

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
  // designerCtx.viewRenderer['git-explorer'] = create(defineAsyncComponent(() => import('./views/GitExplorerView.vue')))
  designerCtx.viewRenderer['comp-tree'] = create(defineAsyncComponent(() => import('./views/CompTreeView.vue')))
  designerCtx.viewRenderer['schema-sourcecode'] = create(defineAsyncComponent(() => import('./views/Schema.vue')))
  designerCtx.viewRenderer['plugin-market'] = create(defineAsyncComponent(() => import('./views/PluginsView.vue')))
  designerCtx.viewRenderer['plugin-market.views.all'] = create(defineAsyncComponent(() => import('./views/PluginsView.vue')))
  designerCtx.viewRenderer['plugin-market.views.installed'] = create(defineAsyncComponent(() => import('./views/PluginsView.vue')))
  designerCtx.viewRenderer['widgets'] = create(defineAsyncComponent(() => import('./views/CompView2.vue')))
  // designerCtx.customEditorRenderer['schema.json.editor'] = create(() => )
}

export function deactivate(designer) {

}

export const contributes = {
  activitybar: [
    {
      id: 'widgets',
      title: '组件',
      icon: 'https://api.iconify.design/tdesign:widget.svg'
    },
    // {
    //   id: 'git-explorer',
    //   title: '资源管理器',
    //   icon: 'https://api.iconify.design/vscode-icons:default-folder.svg'
    // },
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
  },
  customEditors: [
    {
      id: 'schema.json.editor',
      displayName: '',
      selector: [
        { filenamePattern: '*.schema.json' }
      ],
      priority: 'default',
    },
    {
      id: 'img.editor',
      displayName: '',
      selector: [
        { filenamePattern: '*.+(jp{,e}g|png|svg|gif)' }
      ],
      priority: 'default',
    },
    {
      id: 'md.editor',
      displayName: '',
      selector: [
        { filenamePattern: '*.md' }
      ],
      priority: 'default',
    },
    {
      id: 'md.editor',
      displayName: '',
      selector: [
        { filenamePattern: '*.+(js{,x}|ts{,x}|html|vue|json)' }
      ],
      priority: 'default',
    }
  ],
  statusbar: [
    { text: 'statusbar-test', onClick: () => alert(11) },
    { text: 'statusbar-right', align: 'right', onClick: () => alert(11) },
  ],
  // todo
  commands: [

  ],
  // todo
  menus: {
    'view/title': [
      {
        command: '',
        when: e => e.view.id == 'plugin-market.views.all',
        group: 'navigation' // inline
      }
    ],
    'view/item/context': [
      {
        command: '',
        when: e => e.view.id == 'plugin-market.views.all',
        group: 'navigation'
      }
    ],
    'editor/context': [

    ],
    'editor/title': [
      
    ],
    'editor/title/context': [
      
    ],
  }
}
