export default {
  is: 'ElDatePicker',
  label: 'date',
  category: '数据输入',
  props: [
    { is: 'div', class: 'grid grid-cols-2 gap-x-8', children: [
      { lp: 'disabled', type: 'switch' },
      { lp: 'readonly', type: 'switch' },
      { lp: 'clearable', type: 'switch' },
      { lp: 'type', options: ['year', 'month', 'date', 'datetime', 'week'], style: 'grid-column: 1 / 2' },
      { lp: ['show-format', 'format'], options: ['YYYY-MM-DD', 'YYYY/MM/DD'], displayValue: 'YYYY-MM-DD' },
      { lp: 'placeholder' },
    ] },
  ],
  defaultProps: () => ({
    defaultValue: '',
    valueFormat: 'YYYY-MM-DD',
  }),
  JSONSchemaOutput: (props) => ({
    type: 'string',
    format: 'date',
  })
}