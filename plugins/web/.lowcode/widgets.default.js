import { str } from './widgets.util'

export default [
  {
    is: 'undefined',
    hidden: true,
    props: [
      str(['v-slot', 'scope'], { script: false, el: { placeholder: ' e.g: scope' } }),
    ],
    devProps: () => ({ 'lcd-selectable': false })
  },

  {
    is: 'slot',
    label: 'slot',
    cover: '',
    props: [
      str('name'),
    ],
    devProps: () => ({
      style: { display: 'block' }
    }),
    defaultProps: () => ({
      children: []
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
    is: 'render',
    label: 'json render',
    cover: '',
    vSlots: ['empty', 'loading'],
    props: () => [
      str(['str', 'fetch'], { el: { placeholder: 'https://xxx/page.lcd.json' } }),
      str('schema', { script: true })
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