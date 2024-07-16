export default  {
  is: 'Grid',
  label: 'grid',
  category: '容器',
  props: [
    { lp: 'cols' },
    // { lp: 'gap', type: 'slider' },
    { lp: 'gap', el: { is: 'InputNumber', unit: null } },
  ],
  defaultProps: () => ({
    cols: 2,
    children: []
  })
}