import { ENUM_SIZE } from '../../utils'

export default {
  is: 'ElRate',
  label: 'rate',
  category: '数据输入',
  props: [
    { lp: 'disabled', type: 'switch' },
    { lp: 'max', type: 'input-number', displayValue: 5 },
    // { lp: ['low-threshold', 'el.lowThreshold'], type: 'input-number', displayValue: 2 },
    // { lp: ['high-threshold', 'el.highThreshold'], type: 'input-number', displayValue: 4 },
    { lp: 'void-color', type: 'color-picker' },
    { lp: 'size', type: 'radio-group', options: ENUM_SIZE },
  ],
  defaultProps: () => ({
    defaultValue: 0,
  }),
  JSONSchemaOutput: (props) => ({
    type: 'number',
    maximum: props.max,
  })
}