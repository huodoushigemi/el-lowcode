export default {
    is: 'ElRadioGroup',
    label: 'radio',
    category: '数据输入',
    props: [
      { is: 'div', class: 'grid grid-cols-2 gap-x-8', children: [
        { lp: 'disabled', type: 'switch' },
        { lp: 'button', type: 'switch', el: { activeValue: 'button', inactiveValue: undefined } },
        { lp: 'fill', type: 'color-picker' },
      ] },
      { lp: 'options', el: { is: 'OptionsInput' } }
    ],
    defaultProps: () => ({
      defaultValue: '',
      options: [
        { label: 'radio 1', value: '1' },
        { label: 'radio 2', value: '2' },
        { label: 'radio 3', value: '3' },
      ],
    }),
    JSONSchemaOutput: (props) => ({
      type: 'string',
      // todo
      // enum: props.options.map(e => e.value),
      // enumNames: props.options.map(e => e.label),
    })
  }