export default  {
  is: 'Grid',
  label: 'grid',
  layout: true,
  category: '容器',
  props: [
    { lp: 'cols' },
    { lp: 'gap', type: 'slider' }
  ],
  defaultProps: () => ({
    cols: 2,
    children: []
  })
}