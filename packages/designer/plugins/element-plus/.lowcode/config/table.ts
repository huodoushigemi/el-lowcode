import OptionsInput from '../../../../components/options-input'

const item = (label, prop) => ({ is: 'ElTableColumn', label, prop })

export default {
  is: 'ElTable',
  label: 'table',
  category: '数据展示',
  props: [
    { lp: ['cols', 'children'], el: { is: OptionsInput, props: { V: 'prop' }, new: i => item(`title${i + 1}`, `key${i + 1}`) } }
  ],
  defaultProps: () => ({
    children: [
      item('title1', 'key1'),
      item('title2', 'key2'),
      item('title3', 'key3'),
      item('title4', 'key4'),
    ]
  })
}