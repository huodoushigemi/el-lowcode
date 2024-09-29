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
    { lp: 'options', el: { is: 'OptionsInput' } },
  ],
  defaultProps: () => ({
    defaultValue: [],
    options: [
      { label: 'check 1', value: '1' },
      { label: 'check 2', value: '2' },
      { label: 'check 3', value: '3' },
    ],
  }),
  JSONSchemaOutput: (props) => ({
    type: 'array',
    minItems: props.min,
    maxItems: props.max,
    uniqueItems: true,
    items: {
      type: 'string',
      // todo
      enum: props.options.map(e => e.value),
      enumNames: props.options.map(e => e.label),
    },
  })
}