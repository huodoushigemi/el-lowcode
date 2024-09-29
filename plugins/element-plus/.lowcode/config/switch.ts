export default {
  is: 'ElSwitch',
  label: 'switch',
  category: '数据输入',
  props: [
    { lp: 'disabled', type: 'switch' },
    { lp: 'width', type: 'input-number' },
    { is: 'div', class: 'grid grid-cols-2 gap-x-8', children: [
      { lp: 'active-text' },
      { lp: 'inactive-text' },
      { lp: 'active-value' },
      { lp: 'inactive-value' },
    ] },
  ],
  defaultProps: () => ({
    defaultValue: false,
  }),
  JSONSchemaOutput: (props) => ({
    type: 'boolean',
  })
}