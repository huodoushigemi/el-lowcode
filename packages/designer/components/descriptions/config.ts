import { ENUM_SIZE } from '../../const'
import OptionsInput from '../options-input'

export default {
  is: 'Descriptions',
  label: 'descriptions',
  props: [
    { lp: 'title' },
    { lp: 'extra' },
    { lp: 'border', type: 'switch' },
    { lp: 'column', type: 'input-number' },
    { lp: 'direction', type: 'radio-group', options: ['vertical', 'horizontal'] },
    { lp: 'size', type: 'radio-group', options: ENUM_SIZE },
    { lp: 'options', el: { is: OptionsInput } },  
  ],
  defaultProps: () => ({
    column: 3,
    border: true,
    options: [
      { label: 'Username', value: 'kooriookami' },
      { label: 'Telephone', value: '18100000000' },
      { label: 'Place', value: 'Suzhou' },
      { label: 'Remarks', value: 'School' },
      { label: 'Address', value: 'No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province' },
    ]
  })
}