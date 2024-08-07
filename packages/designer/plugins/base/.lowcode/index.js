export function activate(designer) {
  designer.registerProvider('plugin-market.views.all', )
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
