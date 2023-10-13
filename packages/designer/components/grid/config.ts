export default  {
  is: 'Grid',
  label: 'grid',
  layout: true,
  props: [
    { lp: 'cols' },
    { lp: 'gap', type: 'slider' }
  ],
  defaultProps: () => ({
    cols: 2,
    children: []
  })
}