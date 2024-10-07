export default {
  is: 'Code',
  label: 'code',
  icon: 'https://api.iconify.design/mdi:code-braces.svg',
  props: [
    { lp: ['code', 'children'], el: { type: 'textarea', autosize: { minRows: 4 } } }
  ],
  defaultProps: () => ({
    children: 'code'
  })
}