export default {
  is: 'ElCheckboxGroup',
  label: 'checkbox',
  category: '数据输入',
  props: [
    { is: 'div', class: 'grid grid-cols-2 gap-x-8', children: [
      { lp: 'disabled', type: 'switch' },
      { lp: 'button', type: 'switch', el: { activeValue: 'button', inactiveValue: undefined } },
      { lp: 'min', type: 'input-number', el: { min: 0 } },
      { lp: 'max', type: 'input-number', el: { min: 0 } },
      { lp: 'fill', type: 'color-picker' },
    ] },
  ],
  defaultProps: () => ({
    defaultValue: [],
  }),
  JSONSchemaOutput: (props) => ({
    type: 'array',
    minItems: props.min,
    maxItems: props.max,
    uniqueItems: true,
    items: {
      type: 'string',
    },
  })
}