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
    ],
    defaultProps: () => ({
      defaultValue: '',
    }),
    JSONSchemaOutput: (props) => ({
      type: 'string',
    })
  }