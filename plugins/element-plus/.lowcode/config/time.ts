export default {
  is: 'ElTimePicker',
  label: 'time',
  category: '数据输入',
  props: [
    { is: 'div', class: 'grid grid-cols-2 gap-x-8', children: [
      { lp: 'disabled', type: 'switch' },
      { lp: 'readonly', type: 'switch' },
      { lp: 'clearable', type: 'switch' },
      { lp: ['show-format', 'format'], displayValue: 'HH:mm:ss', options: ['HH:mm:ss', 'hh:mm:ss', 'HH时mm分ss秒', 'hh时mm分ss秒'] },
      { lp: 'placeholder' },
    ] },
  ],
  defaultProps: () => ({
    defaultValue: '',
  }),
  JSONSchemaOutput: (props) => ({
    type: 'string',
    format: 'time',
  })
}