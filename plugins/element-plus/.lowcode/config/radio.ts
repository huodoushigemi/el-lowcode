const item = i => ({ is: 'ElRadio', label: `opt ${i + 1}`, value: `${i + 1}` })

export default [
  {
    is: 'ElRadioGroup',
    label: 'radios',
    category: '数据输入',
    drag: { from: ['ElRadio', 'ElRadioButton'] },
    props: [
      { is: 'div', class: 'grid grid-cols-2 gap-x-8', children: [
        { lp: 'disabled', type: 'switch' },
        { lp: 'button', type: 'switch', el: { activeValue: 'button', inactiveValue: undefined } },
        { lp: 'fill', type: 'color-picker' },
      ] },
      { lp: ['options', 'children'], el: { is: 'OptionsInput', new: item }  }
    ],
    defaultProps: () => ({
      defaultValue: '',
      children: [item(0), item(1), item(2)]
    }),
    JSONSchemaOutput: (props) => ({
      type: 'string',
    })
  },
  {
    is: 'ElRadio',
    label: 'radio',
    category: '数据输入',
    drag: { to: 'ElRadioGroup' },
    hidden: true,
    props: [
      { lp: 'label' },
      { lp: 'value' },
    ],
    defaultProps: () => ({
      
    })
  }
]