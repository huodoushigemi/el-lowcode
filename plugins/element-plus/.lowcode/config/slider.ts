export default {
  is: 'ElSlider',
  label: 'slider',
  category: '数据输入',
  props: [
    { is: 'div', class: 'grid grid-cols-2 gap-x-8', children: [
      { lp: 'disabled', type: 'switch' },
      { lp: 'show-tooltip', type: 'switch', displayValue: true },
      { lp: 'min', type: 'input-number' },
      { lp: 'max', type: 'input-number' },
      { lp: 'step', type: 'input-number' },
      { lp: 'show-input', type: 'switch' },
      { lp: 'show-stops', type: 'switch' },
    ] },
  ],
  defaultProps: () => ({
    defaultValue: 0,
  }),
  JSONSchemaOutput: (props) => ({
    type: 'number',
    minimum: props.min,
    maximum: props.max,
    multipleOf: props.step,
  })
}