export default {
  is: 'ElColorPicker',
  label: 'color',
  category: '数据输入',
  props: [
    { is: 'div', class: 'grid grid-cols-2 gap-x-8', children: [
      { lp: 'disabled', type: 'switch' },
      { lp: 'show-alpha', type: 'switch' },
    ] },
  ],
  defaultProps: () => ({
    defaultValue: '',
  }),
  JSONSchemaOutput: (props) => ({
    type: 'string',
  })
}