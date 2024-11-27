import widgets from './config'
export { default as widgets } from './config'

export const contributes = (designerCtx) => ({
  views: {
    'widgets': [
      { id: 'widgets.web', name: true, icon: true, iconClass: 'my4', is: ['widgets', { list: widgets }] }
    ],
  }
})