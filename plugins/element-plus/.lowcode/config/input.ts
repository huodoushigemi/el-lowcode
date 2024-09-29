import { ENUM_SIZE } from '../../utils'

export default {
  is: 'ElInput',
  label: 'input',
  category: '数据输入',
  props: [
    // { lp: ['value', 'modelValue'] },
    { is: 'div', class: 'grid grid-cols-2 gap-x-8', children: [
      { lp: 'disabled', type: 'switch' },
      { lp: 'readonly', type: 'switch' },
      { lp: 'clearable', type: 'switch' },
      { lp: 'autofocus', type: 'switch' },
      { lp: 'type', options: ['text', 'textarea', 'password'], displayValue: 'text' },
      { lp: 'placeholder' },
      { lp: 'minlength', type: 'input-number' },
      { lp: 'maxlength', type: 'input-number' },
    ] },
    { lp: 'show-word-limit', type: 'switch' },
    { lp: 'size', type: 'radio-group', options: ENUM_SIZE },
  ],
  defaultProps: () => ({
    defaultValue: '',
  }),
  JSONSchemaOutput: (props) => ({
    minLength: props.minlength,
    maxLength: props.maxlength,
  })
}