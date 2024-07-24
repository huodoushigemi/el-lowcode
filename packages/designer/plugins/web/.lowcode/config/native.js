import { v4 } from 'uuid'

const createH = (is) => ({
  is,
  label: is,
  props: [
    { lp: ['text', 'children'] },
    { lp: ['level', 'is'], script: false, type: 'radio-group', options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'] }
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
    category: '基础组件',
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
    props: [
      { lp: 'src', el: { autofocus: true } },
      { lp: ['fit', 'style.objectFit'], type: 'radio-group', options: ['fill', 'contain', 'cover'] },
      { lp: ['lazy', 'loading'], type: 'switch', el: { activeValue: 'lazy', inactiveValue: 'eager' } },
      { lp: 'alt' },
    ],
    defaultProps: () => ({
      src: 'https://element.eleme.cn/2.0/favicon.ico'
    })
  },
  
  {
    is: 'span',
    label: 'span',
    category: '基础组件',
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
    drag: false,
    props: [
      { lp: ['title', 'children'] }
    ]
  },

  {
    is: 'ul',
    label: 'ul',
    sortablePut: false,
    props: [
      // todo
      { lp: ['title', 'children'], el: { is: 'OptionsInput', new: () => ({ is: 'li', _id: v4(), children: [] }) } },
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
    props: [

    ]
  }
]