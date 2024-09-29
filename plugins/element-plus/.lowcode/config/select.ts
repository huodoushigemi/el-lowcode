export default {
  is: 'ElSelect',
  label: 'select',
  category: '数据输入',
  props: (props, ctx) => [
    // { lp: ['value', 'modelValue'] },
    { is: 'div', class: 'grid grid-cols-2 gap-x-8', children: [
      { lp: 'disabled', type: 'switch' },
      { lp: 'clearable', type: 'switch' },
      { lp: 'allow-create', type: 'switch' },
    ] },
    { is: 'div', class: 'grid grid-cols-2 gap-x-8', children: [
      { lp: 'multiple', type: 'switch' },
      props.multiple && { lp: ['multiple-limit', 'multipleLimit'], type: 'input-number' },
    ] },
    { lp: 'placeholder' },
  ],
  defaultProps: () => ({
    // todo
    // defaultValue: '',
    filterable: true,
    defaultFirstOption: true
  }),
  JSONSchemaOutput: (props) => ({
    // todo
    // minLength: props.minlength,
    // maxLength: props.maxlength,
  })
}