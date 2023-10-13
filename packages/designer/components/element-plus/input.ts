import { formItemPropsConfig } from '../_utils'

let count = 0

export default {
  is: 'ElInput',
  label: 'input',
  props: [
    ...formItemPropsConfig(),
    { lp: ['autofocus', 'el.autofocus'], type: 'switch' },
    { lp: ['type', 'el.type'], type: 'select', options: ['text', 'textarea', 'password'] },
    { lp: ['show-word-limit', 'el.showWordLimit'], type: 'switch' },
    { lp: ['minlength', 'el.minlength'], type: 'input-number', el: { placeholder: '' } },
    { lp: ['maxlength', 'el.maxlength'], type: 'input-number', el: { placeholder: '' } },
    { lp: 'default-value' },
  ],
  defaultProps: () => ({
    is: 'ElFormItemRender',
    label: 'input',
    prop: `input${++count}`,
    defaultValue: '',
    el: { is: 'ElInput' }
  }),
  JSONSchemaOutput: (props) => ({
    type: 'string',
    title: props.label,
    description: props.description,
    default: props.defaultValue,
    minLength: props.el.minlength,
    maxLength: props.el.maxlength,
    pattern: props.rules?.pattern,
  })
}