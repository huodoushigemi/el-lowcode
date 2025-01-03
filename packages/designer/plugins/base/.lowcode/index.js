import { createApp, provide, defineAsyncComponent, h } from 'vue'

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
  
}

export function deactivate(designer) {

}

export const contributes = (designerCtx) => ({
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
      id: 'snippets',
      title: '片段',
      icon: 'https://api.iconify.design/pajamas:snippet.svg'
    },
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
    'snippets': [
      { id: 'snippets', renderer: create(defineAsyncComponent(() => import('./views/SnippetsView.vue'))) }
    ],
    'comp-tree': [
      { id: 'comp-tree', renderer: create(defineAsyncComponent(() => import('./views/CompTreeView.vue'))) }
    ],
    'schema-sourcecode': [
      { id: 'schema-sourcecode', renderer: create(defineAsyncComponent(() => import('./views/Schema.vue'))) }
    ],
    'plugin-market': [
      { id: 'plugin-market', renderer: create(defineAsyncComponent(() => import('./views/PluginsView.vue'))) }
    ],
    
  },
  // todo
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
    // { text: 'statusbar-test', command: 'lcd.toggleDevice' },
    // { text: 'statusbar-right', align: 'right', onClick: () => alert(11) },
  ],
  commands: [
    { command: 'lcd.toggleDevice', title: 'Toggle Device' },
    { command: 'lcd.clear', title: 'Clear' },
    { command: 'lcd.undo', title: 'Undo' },
    { command: 'lcd.redo', title: 'Redo' },
    { command: 'lcd.download', title: 'Download' },
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
})
