import { ENUM_SIZE } from '../../utils'

const item = i => ({ label: `opt ${i + 1}`, value: `${i + 1}` })

export default {
  is: 'ElSegmented',
  label: 'segmented',
  category: '数据输入',
  props: [
    // { lp: ['value', 'modelValue'] },
    { is: 'div', class: 'grid grid-cols-2 gap-x-8', children: [
      { lp: 'disabled', type: 'switch' },
      { lp: 'block', type: 'switch' },
    ] },
    { lp: 'size', type: 'segmented', options: ENUM_SIZE },
    { lp: 'options', el: { is: 'OptionsInput', new: item }  }
  ],
  defaultProps: () => ({
    options: [item(0), item(1), item(2)]
  }),
  JSONSchemaOutput: (props) => ({
    type: 'string'
  })
}