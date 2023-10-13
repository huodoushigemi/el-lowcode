export default {
  is: 'Code',
  label: 'code',
  props: [
    { lp: ['code', 'children'], el: { type: 'textarea', autosize: { minRows: 4 } } }
  ],
  defaultProps: () => ({
    children: 'code'
  })
}