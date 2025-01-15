import native from './config/native'
import page from '../page/config'
import grid from '../grid/config'

export default [
  ...native,

  page,
  grid,
  {
    is: 'wc-waterfall',
    label: 'waterfall',
    category: '容器',
    props: [
      { lp: 'cols', type: 'input-number' },
      { lp: 'gap', type: 'slider' },
    ],
    defaultProps: () => ({
      cols: 2,
      gap: 4,
      children: []
    })
  },

  {
    is: 'wc-appbar',
    label: 'appbar',
    category: '额外扩展',
    props: [
      { lp: 'pinned', type: 'switch' },
      { lp: 'floating', type: 'switch' },
      { lp: 'snap', type: 'switch' },
      { lp: 'minh', type: 'input-number' },
      { lp: 'maxh', type: 'input-number' },
    ],
    defaultProps: () => ({
      minh: 56,
      children: [
        { is: 'img', src: 'https://game.gtimg.cn/images/lol/act/img/guidetop/guide350000.jpg', style: { position: 'absolute', top: 0, width: '100%', height: '100%', zIndex: -1, objectFit: 'cover' } },
        { is: 'p', children: 'Yuumi', style: { margin: 0, padding: '1em', height: 'calc(var(--wc-appbar-minh) * 1px)', lineHeight: 'calc(var(--wc-appbar-minh) * 1px)', fontSize: '1.5em', background: 'var(--el-bg-color)', opacity: 'calc(var(--wc-appbar-shrink-offset) / (var(--wc-appbar-maxh) - var(--wc-appbar-minh)))' } }
      ]
    })
  },

  {
    is: 'AbsoluteLayout',
    label: '自由布局',
    category: '容器',
    props: [],
    defaultProps: () => ({
      'lcd-absolute-layout': true,
      style: { height: '300px' },
      children: [],
    }),
    purify: () => ({ is: 'div' })
  },
  
  {
    is: 'undefined',
    hidden: true,
    props: [
      { lp: ['v-slot', 'scope'], script: false, el: { placeholder: ' e.g: scope' } }
    ],
    devProps: () => ({ 'lcd-selectable': false })
  },

  {
    is: 'uno-icon',
    label: 'icon',
    props: [
      { lp: 'src' }
    ],
    defaultProps: () => ({
      src: `https://api.iconify.design/logos:vitejs.svg`
    })
  }
]
