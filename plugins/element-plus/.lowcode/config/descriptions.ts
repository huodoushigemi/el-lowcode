import { ENUM_SIZE } from '../../utils'

const item = (label, children) => ({ is: 'ElDescriptionsItem', label, children })

export default {
  is: 'ElDescriptions',
  label: 'descriptions',
  sortablePut: false,
  props: [
    { lp: 'title' },
    { lp: 'extra' },
    { lp: 'border', type: 'switch' },
    { lp: 'column', type: 'input-number' },
    { lp: 'direction', type: 'radio-group', options: ['vertical', 'horizontal'] },
    { lp: 'size', type: 'radio-group', options: ENUM_SIZE, displayValue: 'default' },
    { lp: ['cols', 'children'], el: { is: 'OptionsInput', props: { V: 'children' }, new: i => item(`title${i + 1}`, `content${i + 1}`) } },
  ],
  defaultProps: () => ({
    column: 3,
    border: true,
    children: [
      item('Username', 'kooriookami'),
      item('Telephone', '18100000000'),
      item('Place', 'Suzhou'),
      item('Remarks', 'School'),
      item('Address', 'No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province'),
    ]
  })
}