import { formItemPropsConfig } from '../_utils'

let count = 0

export default {
  is: 'DateTime',
  label: 'datetime',
  props: [
    ...formItemPropsConfig(),
    { lp: ['show-format', 'el.format'], type: 'select', defaultValue: 'YYYY/MM/DD HH:mm:ss', options: ['YYYY/MM/DD HH:mm:ss', 'YYYY-MM-DDTHH:mm:ss.SSSZ'] },
    { lp: 'defaultValue' },
  ],
  defaultProps: () => ({
    is: 'ElFormItemRender',
    label: 'date-time',
    prop: `datetime${++count}`,
    el: { is: 'DateTime' }
  }),
  JSONSchemaOutput: (props) => ({
    type: 'string',
    title: props.label,
    description: props.description,
    format: 'date-time',
    pattern: props.rules?.pattern,
  })
}