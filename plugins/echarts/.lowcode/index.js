import widgets from './config'

export { default as widgets } from './config'
import { snippets } from './snippets'
export * from './snippets'

export const contributes = {
  activitybar: [
    {
      id: 'echarts',
      title: 'Echarts',
      icon: 'https://echarts.apache.org/zh/images/favicon.png'
    },
  ],
  views: {
    'echarts': [
      { id: 'echarts.snippets', name: true, icon: true, iconClass: 'my4', is: 'SnippetsView2', list: snippets }
    ],
  }
}