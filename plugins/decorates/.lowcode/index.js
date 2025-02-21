import widgetsBorders from './widgets.borders'

export const widgets = [
  widgetsBorders
].flat()


export const contributes = (lcd) => ({
  activitybar: [
    {
      id: 'decorates',
      title: 'Decorates',
      icon: '/icons/decorates.png'
    },
  ],
  views: {
    'decorates': [
      { id: 'decorates.border-1', is: 'Widgets', list: widgets, class: 'px20', style: "padding-right: 14px", state: { cols: 2 } },
      { id: 'decorates.test-1', is: 'Widgets', list: widgets, class: 'px20', style: "padding-right: 14px", state: { cols: 2 } },
    ],
  },
})
