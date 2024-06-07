import { ENUM_SIZE } from '../../utils'

export default {
  is: 'ElText',
  label: 'text',
  category: '基础组件',
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