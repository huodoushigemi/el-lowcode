import { formItemPropsConfig } from '../../utils'
import OptionsInput from '../../options-input.vue'

let count = 0

export default {
  is: 'ElRadioGroup',
  label: 'radio',
  category: '数据输入',
  props: [
    ...formItemPropsConfig({ exclude: ['readonly', 'clearable', 'placeholder'] }),
    { lp: ['button', 'el.type'], type: 'switch', el: { activeValue: 'button', inactiveValue: undefined } },
    { lp: ['fill', 'el.fill'], type: 'color-picker' },
    { lp: 'options', el: { is: OptionsInput } }
  ],
  defaultProps: () => ({
    is: 'ElFormItemRender',
    label: 'radio',
    prop: `radio${++count}`,
    defaultValue: '',
    options: [
      { label: 'radio 1', value: '1' },
      { label: 'radio 2', value: '2' },
      { label: 'radio 3', value: '3' },
    ],
    el: { is: 'ElRadioGroup' }
  }),
  JSONSchemaOutput: (props) => ({
    type: 'string',
    title: props.label,
    description: props.description,
    default: props.defaultValue,
    enum: props.options.map(e => e.value),
    enumNames: props.options.map(e => e.label),
    pattern: props.rules?.pattern,
  })
}