import native from './config/native'
import page from '../page/config'
import grid from '../grid/config'

const widgets = [
  ...native,

  page,
  grid,
  {
    is: 'wc-waterfall',
    label: 'waterfall',
    category: '容器',
    cover: '',
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
    cover: '',
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
    cover: '',
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
    cover: '',
    props: [
      { lp: 'src' }
    ],
    defaultProps: () => ({
      src: `https://api.iconify.design/logos:vitejs.svg`
    })
  },

  {
    is: 'render',
    label: 'json render',
    cover: '',
    vSlots: ['empty', 'loading'],
    props: () => [
      { lp: ['src', 'fetch'], el: { placeholder: 'https://xxx/page.lcd.json' } },
      { lp: 'schema', script: true },,
    ],
    defaultProps: () => ({
      children: {
        loading: {
          children: [{ is: 'div', style: { display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '4em' }, innerHTML: `<svg xmlns='http://www.w3.org/2000/svg' width='1em' height='1em' viewBox='0 0 24 24'><path fill='currentColor' d='M12 2A10 10 0 1 0 22 12A10 10 0 0 0 12 2Zm0 18a8 8 0 1 1 8-8A8 8 0 0 1 12 20Z' opacity='.5'/><path fill='currentColor' d='M20 12h2A10 10 0 0 0 12 2V4A8 8 0 0 1 20 12Z'><animateTransform attributeName='transform' dur='1s' from='0 12 12' repeatCount='indefinite' to='360 12 12' type='rotate'/></path></svg>` }]
        }
      }
    })
  }
]

widgets.forEach(e => {
  e.cover ??= `/imgs/web/${e.is}.png`
})

export default widgets