import { ENUM_SIZE } from '../../utils'

export default {
  is: 'ElTag',
  label: 'tag',
  category: '数据展示',
  props: [
    { lp: ['text', 'children'] },
    { lp: 'effect', type: 'radio-group', options: ['dark', 'light'] },
    { lp: 'size', type: 'radio-group', options: ENUM_SIZE },
    { lp: 'type', type: 'radio-group', options: ['success', 'info', 'warning', 'danger'], el: { type: '' } },
    { lp: ['border', 'hit'], type: 'switch' },
    { lp: ['bg', 'color'], type: 'color-picker' },
    { lp: 'round', type: 'switch' },
  ],
  defaultProps: () => ({
    children: 'Tag',
  }),
}
