import { formItemPropsConfig } from '../_utils'

let count = 0

export default {
  is: 'ElDatePicker',
  label: 'date',
  props: [
    ...formItemPropsConfig(),
    { lp: ['type', 'el.type'], type: 'select', options: ['year', 'month', 'date', 'datetime', 'week'] },
    { lp: ['show-format', 'el.format'], type: 'select', options: [{ label: 'YYYY-MM-DD', value: undefined }, 'YYYY/MM/DD'] },
    { lp: 'default-value' },
  ],
  defaultProps: () => ({
    is: 'ElFormItemRender',
    label: 'date',
    prop: `date${++count}`,
    defaultValue: '',
    el: { is: 'ElDatePicker', valueFormat: 'YYYY-MM-DD' }
  }),
  JSONSchemaOutput: (props) => ({
    type: 'string',
    title: props.label,
    description: props.description,
    format: 'date',
    default: props.defaultValue,
    pattern: props.rules?.pattern,
  })
}