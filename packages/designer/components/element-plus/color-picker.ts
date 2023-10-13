import { formItemPropsConfig } from '../_utils'

let count = 0

export default {
  is: 'ElColorPicker',
  label: 'color',
  props: [
    ...formItemPropsConfig({ exclude: ['readonly', 'placeholder', 'clearable'] }),
  ],
  defaultProps: () => ({
    is: 'ElFormItemRender',
    label: 'color-picker',
    prop: `color${++count}`,
    defaultValue: '',
    el: { is: 'ElColorPicker' }
  }),
  JSONSchemaOutput: (props) => ({
    type: 'string',
    title: props.label,
    description: props.description,
    default: props.defaultValue,
    pattern: props.rules?.pattern,
  })
}