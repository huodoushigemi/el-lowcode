export default {
  is: 'ElDivider',
  label: 'divider',
  props: [
    { lp: ['text', 'children'] },
    { lp: 'direction', type: 'radio-group', defaultValue: 'horizontal', options: ['horizontal', 'vertical'] },
    { lp: 'border-style', type: 'radio-group', defaultValue: 'solid', options: ['solid', 'dashed'] },
    { lp: 'content-position', type: 'radio-group', options: ['left', 'right', 'center'] },
  ],
  defaultProps: () => ({
    
  })
}