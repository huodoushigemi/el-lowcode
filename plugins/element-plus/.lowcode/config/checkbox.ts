import { formItemPropsConfig } from '../../utils'

let count = 0

export default {
  is: 'ElCheckboxGroup',
  label: 'checkbox',
  category: '数据输入',
  props: [
    ...formItemPropsConfig({ exclude: ['readonly', 'clearable', 'placeholder'] }),
    { lp: ['button', 'el.type'], type: 'switch', el: { activeValue: 'button', inactiveValue: undefined } },
    { lp: ['min', 'el.min'], type: 'input-number', el: { class: 'wfull', placeholder: 'min number of checkbox' } },
    { lp: ['max', 'el.max'], type: 'input-number', el: { class: 'wfull', placeholder: 'max number of checkbox' } },
    { lp: 'options', el: { is: 'OptionsInput' } },
    { lp: ['fill', 'el.fill'], type: 'color-picker' },
  ],
  defaultProps: () => ({
    is: 'ElFormItemRender',
    label: 'checkbox',
    prop: `checkbox${++count}`,
    defaultValue: [],
    options: [
      { label: 'check 1', value: '1' },
      { label: 'check 2', value: '2' },
      { label: 'check 3', value: '3' },
    ],
    el: { is: 'ElCheckboxGroup' }
  }),
  JSONSchemaOutput: (props) => ({
    type: 'array',
    title: props.label,
    description: props.description,
    default: props.defaultValue,
    minItems: props.el.min,
    maxItems: props.el.max,
    uniqueItems: true,
    items: {
      type: 'string',
      enum: props.options.map(e => e.value),
      enumNames: props.options.map(e => e.label),
    },
    pattern: props.rules?.pattern,
  })
}