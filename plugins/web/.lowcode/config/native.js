import { v4 } from 'uuid'

const createH = (is, hidden = true) => ({
  is,
  label: is,
  hidden,
  icon: 'https://api.iconify.design/mdi:format-header-1.svg',
  props: [
    { lp: ['text', 'children'] },
    { lp: ['level', 'is'], type: 'radio-group', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }
  ],
  defaultProps: () => ({
    children: 'Heading'
  })
})

export default [
  {
    is: 'div',
    label: 'div',
    category: '容器',
    icon: 'https://api.iconify.design/mdi:border-all-variant.svg',
    defaultProps: () => ({
      children: []
    })
  },

  createH('h1', false),
  createH('h2'),
  createH('h3'),
  createH('h4'),
  createH('h5'),
  createH('h6'),

  {
    is: 'a',
    label: 'a',
    category: '基础组件',
    icon: 'https://api.iconify.design/mdi:link-variant.svg',
    props: [
      { lp: ['text', 'children'] },
      { lp: 'href' },
      { lp: 'target', type: 'radio-group', options: ['_self', '_blank'] }
    ],
    defaultProps: () => ({
      children: 'element-plus',
      href: 'https://element-plus.org/zh-CN/',
      target: '_blank'
    })
  },

  {
    is: 'p',
    label: 'p',
    category: '基础组件',
    icon: 'https://api.iconify.design/material-symbols:format-paragraph.svg',
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
    category: '基础组件',
    icon: 'https://api.iconify.design/mdi:image-outline.svg',
    props: [
      { lp: 'src', el: { autofocus: true } },
      { lp: ['fit', 'style.objectFit'], type: 'radio-group', options: ['fill', 'contain', 'cover'] },
      { lp: ['lazy', 'loading'], type: 'switch', el: { activeValue: 'lazy', inactiveValue: 'eager' } },
      { lp: 'alt' },
    ],
    defaultProps: () => ({
      src: 'https://element-plus.org/images/element-plus-logo-small.svg',
      style: { height: '128px' }
    })
  },
  
  {
    is: 'span',
    label: 'span',
    category: '基础组件',
    icon: 'https://api.iconify.design/mdi:format-text.svg',
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
      src: 'https://element-plus.org/zh-CN/',
      style: { width: '100%', height: '300px' }
    })
  },

  {
    is: 'details',
    label: 'details',
    props: [
      { lp: ['summary', 'children.0.children'] }
    ],
    defaultProps: () => ({
      children: [
        { is: 'summary', children: 'title' },
        { is: 'div', children: [] }
      ]
    })
  },

  {
    is: 'summary',
    label: 'summary',
    hidden: true,
    drag: { to: 'details' },
    props: [
      { lp: ['title', 'children'] }
    ]
  },

  {
    is: 'ul',
    label: 'ul',
    drag: { from: 'li' },
    icon: 'https://api.iconify.design/mdi:format-list-bulleted.svg',
    props: [
      { lp: ['list-style', 'style.listStyle'], type: 'select', options: ['simp-chinese-informal', 'decimal', 'disc', 'circle' ,'square'], displayValue: 'disc' },
    ],
    defaultProps: () => ({
      children: [
        { is: 'li', children: [] },
        { is: 'li', children: [] }
      ]
    })
  },

  {
    is: 'li',
    label: 'li',
    drag: { to: ['ol', 'ul'] },
    icon: 'https://api.iconify.design/ph:dot-fill.svg',
    props: [

    ],
    defaultProps: () => ({
      children: []
    })
  }
]