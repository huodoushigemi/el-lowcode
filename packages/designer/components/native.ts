if (typeof document != 'undefined') import('wc-appbar')
if (typeof document != 'undefined') import('wc-waterfall')

import { keyBy } from "@el-lowcode/utils"
import { parseAttrs } from './_utils'
import { el_lowcode_widgets } from './el_lowcode_widgets'

const createH = (is: string) => ({
  is,
  label: is,
  props: [
    { lp: ['text', 'children'] },
    { lp: ['level', 'is'], scriptable: false, type: 'radio-group', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }
  ],
  defaultProps: () => ({
    children: 'Heading'
  })
})

const native = [
  {
    is: 'div',
    label: 'div',
    layout: true,
    defaultProps: () => ({
      children: []
    })
  },

  createH('h1'),
  createH('h2'),
  createH('h3'),
  createH('h4'),
  createH('h5'),
  createH('h6'),

  {
    is: 'a',
    label: 'a',
    layout: true,
    props: [
      { lp: ['text', 'children'] },
      { lp: 'href' },
      { lp: 'target', type: 'radio-group', options: ['_self', '_blank'] }
    ],
    defaultProps: () => ({
      children: [],
      href: 'https://element-plus.gitee.io'
    })
  },

  {
    is: 'p',
    label: 'p',
    props: [
      { lp: ['text', 'children'] },
    ],
    defaultProps: () => ({
      children: 'Element Plus 基于 Vue 3，面向设计师和开发者的组件库'
    })
  },

  {
    is: 'img',
    label: 'img',
    props: [
      { lp: 'src', el: { autofocus: true } },
      { lp: ['fit', 'style.objectFit'], type: 'radio-group', options: ['fill', 'contain', 'cover'] },
      { lp: ['lazy', 'loading'], type: 'switch', el: { activeValue: 'lazy', inactiveValue: 'eager' } },
      { lp: 'alt' },
    ],
    defaultProps: () => ({
      src: 'https://element-plus.gitee.io/images/element-plus-logo.svg',
      style: { width: '100%' }
    })
  },
  
  {
    is: 'span',
    label: 'span',
    props: [
      { lp: ['text', 'children'] },
    ],
    defaultProps: () => ({
      children: '文本'
    })
  },

  {
    is: 'iframe',
    label: 'iframe',
    props: [
      { lp: 'src' },
    ],
    defaultProps: () => ({
      src: 'https://element-plus.gitee.io'
    })
  },

  {
    is: 'wc-waterfall',
    label: 'waterfall',
    layout: true,
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
        parseAttrs(el_lowcode_widgets.img!, { src: 'https://game.gtimg.cn/images/lol/act/img/guidetop/guide350000.jpg', style: { position: 'absolute', top: 0, width: '100%', height: '100%', zIndex: -1, objectFit: 'cover' } }),
        parseAttrs(el_lowcode_widgets.p!, { children: 'Yuumi', style: { margin: 0, padding: '1em', height: 'calc(var(--wc-appbar-minh) * 1px)', lineHeight: 'calc(var(--wc-appbar-minh) * 1px)', fontSize: '1.5em', background: 'var(--el-bg-color)', opacity: 'calc(var(--wc-appbar-shrink-offset) / (var(--wc-appbar-maxh) - var(--wc-appbar-minh)))' } })
      ]
    })
  }
]

export default keyBy(native, 'is')