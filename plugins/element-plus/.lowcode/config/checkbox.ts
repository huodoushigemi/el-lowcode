import { v4 } from 'uuid'

const item = i => ({ _id: v4(), is: 'ElCheckbox', label: `opt ${i + 1}`, value: `${i + 1}` })

export default [
  {
    is: 'ElCheckboxGroup',
    label: 'checkboxs',
    category: '数据输入',
    drag: { from: ['ElCheckbox', 'ElCheckboxButton'] },
    props: [
      { is: 'div', class: 'grid grid-cols-2 gap-x-8', children: [
        { lp: 'disabled', type: 'switch' },
        { lp: 'button', type: 'switch', el: { activeValue: 'button', inactiveValue: undefined } },
        { lp: 'min', type: 'input-number', el: { min: 0 } },
        { lp: 'max', type: 'input-number', el: { min: 0 } },
        { lp: 'fill', type: 'color-picker' },
      ] },
      { lp: ['options', 'children'], el: { is: 'OptionsInput', new: item }  }
    ],
    defaultProps: () => ({
      defaultValue: [],
      children: [item(0), item(1), item(2)]
    }),
    JSONSchemaOutput: (props) => ({
      type: 'array',
      minItems: props.min,
      maxItems: props.max,
      uniqueItems: true,
      items: {
        type: 'string',
      },
    })
  },
  {
    is: 'ElCheckbox',
    label: 'checkbox',
    category: '数据输入',
    drag: { to: 'ElCheckboxGroup' },
    hidden: true,
    props: [
      { lp: 'label' },
      { lp: 'value' },
    ],
    defaultProps: () => ({
      
    })
  }
]