const item = i => ({ is: 'ElOption', label: `opt ${i + 1}`, value: `${i + 1}` })

export default [
  {
    is: 'ElSelect',
    label: 'select',
    category: '数据输入',
    drag: { from: 'ElOption' },
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
      { lp: ['options', 'children'], el: { is: 'OptionsInput', new: item }  }
    ],
    defaultProps: () => ({
      // todo
      // defaultValue: '',
      filterable: true,
      defaultFirstOption: true,
      children: [item(0), item(1), item(2)]
    }),
    JSONSchemaOutput: (props) => ({
      // todo
      // minLength: props.minlength,
      // maxLength: props.maxlength,
    })
  },
  {
    is: 'ElOption',
    label: 'option',
    category: '数据输入',
    drag: { to: 'ElSelect', disabled: true },
    hidden: true,
    props: (props, ctx) => [
      { lp: 'label' },
      { lp: 'value' },
      { is: 'div', class: 'grid grid-cols-2 gap-x-8', children: [
        { lp: 'disabled', type: 'switch' },
      ] }
    ]
  }
]