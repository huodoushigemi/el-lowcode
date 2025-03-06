import widgets from './widgets'
export { default as widgets } from './widgets'

export const contributes = (lcd) => ({
  views: {
    'widgets': [
      { id: 'widgets.web', name: true, icon: true, iconClass: 'my4', is: 'WidgetsView', list: widgets }
    ],
  }
})