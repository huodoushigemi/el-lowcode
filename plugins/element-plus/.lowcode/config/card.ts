export default {
  is: 'ElCard',
  label: 'card',
  category: '容器',
  props: [
    { lp: ['title', 'header'] },
    { lp: 'body-class' },
    { lp: 'body-style', el: { type: 'textarea', autosize: { minRows: 4, maxRows: 12 } } },
    { lp: 'shadow', type: 'radio-group', displayValue: 'always', options: ['always', 'never', 'hover'] }
  ],
  defaultProps: () => ({
    header: 'Title',
    children: []
  })
}