import { ENUM_SIZE, formItemPropsConfig } from '../../utils'

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
      { lp: 'type', options: ['text', 'textarea', 'password'] },
      { lp: 'placeholder' },
      { lp: 'minlength', type: 'input-number', el: { placeholder: '' } },
      { lp: 'maxlength', type: 'input-number', el: { placeholder: '' } },
    ] },
    { lp: 'size', type: 'radio-group', options: ENUM_SIZE },
    { lp: 'show-word-limit', type: 'switch' },
  ],
  defaultProps: () => ({
    
  }),
  JSONSchemaOutput: (props) => ({
    minLength: props.minlength,
    maxLength: props.maxlength,
  })
}