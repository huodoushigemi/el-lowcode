import { ENUM_SIZE } from '../../const'

export default {
  is: 'ElText',
  label: 'text',
  props: [
    { lp: 'children' },
    { lp: 'type', type: 'select', options: ['', 'primary', 'success', 'warning', 'danger', 'info'] },
    { lp: 'size', type: 'radio-group', options: ENUM_SIZE },
    { lp: 'tag' },
  ],
  defaultProps: () => ({
    children: '文本'
  })
}