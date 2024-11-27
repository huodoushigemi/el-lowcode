import widgets from './config'

export { default as widgets } from './config'

export const contributes = {
  views: {
    'widgets': [
      { id: 'widgets.echarts', name: true, icon: true, iconClass: 'my4', is: ['widgets', { list: widgets }] }
    ],
  }
}