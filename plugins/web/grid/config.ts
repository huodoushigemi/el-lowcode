export default  {
  is: 'Grid',
  label: 'grid',
  hidden: true,
  category: '容器',
  props: [
    { lp: 'cols', el: { is: 'InputNumber' } },
    { lp: 'gap', el: { is: 'InputNumbers', style: 'width: 100px', len: 2, noUnit: true, min: 0, placeholder: ['↕', '↔'] } }
  ],
  defaultProps: () => ({
    cols: 2,
    children: []
  })
}