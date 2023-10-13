export default {
  is: 'ElLink',
  label: 'link',
  props: [
    { lp: ['text', 'children'] },
    { lp: 'href' },
    { lp: 'target', type: 'radio-group', options: ['_self', '_blank'] },
    { lp: 'disabled', type: 'switch' },
    { lp: 'underline', type: 'switch', defaultValue: true },
    { lp: 'type', type: 'select', options: ['default', 'primary', 'success', 'warning', 'danger', 'info'] },
  ],
  defaultProps: () => ({
    children: 'link',
    type: 'primary',
    href: 'https://element-plus.gitee.io'
  })
}