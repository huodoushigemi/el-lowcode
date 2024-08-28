export default {
  is: 'ElTooltip',
  label: 'tooltip',
  props: [
    { lp: 'content' },
    { lp: 'effect', type: 'radio-group', options: ['dark', 'light'] },
    { lp: 'trigger', type: 'radio-group', options: ['hover', 'click', 'focus'] },
    { lp: 'offset', type: 'input-number' },
  ],
  defaultProps: () => ({
    content: 'content',
    children: [
      { is: 'span', children: 'text' }
    ]
  })
}