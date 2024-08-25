import { formItemPropsConfig } from '../utils'

let count = 0

export default {
  is: 'ElDateTime$$',
  label: 'datetime',
  category: '数据输入',
  props: [
    ...formItemPropsConfig(),
    { lp: ['show-format', 'el.format'], type: 'select', defaultValue: 'YYYY/MM/DD HH:mm:ss', options: ['YYYY/MM/DD HH:mm:ss', 'YYYY-MM-DDTHH:mm:ss.SSSZ'] },
    { lp: 'defaultValue' },
  ],
  defaultProps: () => ({
    is: 'ElFormItemRender',
    label: 'date-time',
    prop: `datetime${++count}`,
    el: { is: 'ElDateTime$$' }
  }),
  JSONSchemaOutput: (props) => ({
    type: 'string',
    title: props.label,
    description: props.description,
    format: 'date-time',
    pattern: props.rules?.pattern,
  })
}