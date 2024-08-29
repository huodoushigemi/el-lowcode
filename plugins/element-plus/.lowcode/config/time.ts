import { formItemPropsConfig } from '../../utils'

let count = 0

export default {
  is: 'ElTimePicker',
  label: 'time',
  category: '数据输入',
  props: [
    ...formItemPropsConfig(),
    { lp: ['show-format', 'el.format'], type: 'select', displayValue: 'HH:mm:ss', options: ['HH:mm:ss', 'hh:mm:ss', 'HH时mm分ss秒', 'hh时mm分ss秒'] },
    { lp: 'default-value' },  
  ],
  defaultProps: () => ({
    is: 'ElFormItemRender',
    label: 'time',
    prop: `time${++count}`,
    defaultValue: '',
    el: { is: 'ElTimePicker' }
  }),
  JSONSchemaOutput: (props) => ({
    type: 'string',
    title: props.label,
    description: props.description,
    default: props.defaultValue,
    format: 'time',
    pattern: props.rules?.pattern,
  })
}