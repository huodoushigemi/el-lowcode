export default  {
  is: 'Grid',
  label: 'grid',
  category: '容器',
  props: [
    { lp: 'cols', el: { is: 'InputNumber' } },
    { lp: 'gap', set: v => v?.map(e => e || 0), el: { is: 'InputNumbers', len: 2, noUnit: true, min: 0, placeholder: ['y', 'x'] } }
  ],
  defaultProps: () => ({
    cols: 2,
    children: []
  })
}