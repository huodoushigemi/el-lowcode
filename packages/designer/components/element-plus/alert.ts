export default {
  is: 'ElAlert',
  label: 'alert',
  props: [
    { lp: 'title' },
    { lp: 'description' },
    { lp: 'show-icon', type: 'switch' },
    { lp: 'center', type: 'switch' },
    { lp: 'type', type: 'radio-group', options: ['success', 'warning', 'info', 'error'] },
  ],
  defaultProps: () => ({
    title: 'info alert',
    type: 'success'
  })
}