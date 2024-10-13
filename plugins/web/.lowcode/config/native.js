import { toRaw } from 'vue'
import { chooseImg } from '@el-lowcode/utils'

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
    props: props => [
      { lp: 'src', el: { autofocus: true } },
      { is: 'button', class: 'vs-btn mb18', onClick: async () => props.src = (await chooseImg({ base64: true, maxSize: 1024 * 200 }))[0], children: [
        { is: 'div', class: 'mask-icon mr4 w24 h18', style: '--mask-image: url(https://api.iconify.design/tdesign:cloud-upload.svg)' }, 'upload'
      ] },
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
      { lp: ['default-open', 'open'], type: 'switch' }
      // { lp: ['summary', 'children.0.children'] }
    ],
    defaultProps: () => ({
      children: [
        { is: 'summary', children: [{ is: 'span', children: 'title' }] },
        { is: 'div', children: [] }
      ]
    })
  },

  {
    is: 'summary',
    label: 'summary',
    hidden: true,
    drag: { to: 'details', disabled: true },
    props: [
      // { lp: ['title', 'children'] }
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
  },

  {
    is: 'blockquote',
    label: 'blockquote',
    icon: 'https://api.iconify.design/tabler:blockquote.svg',
    props: [

    ],
    defaultProps: () => ({
      children: [{ is: 'p', children: 'TIP' }, { is: 'p', children: 'HTML <blockquote> 元素（或者 HTML 块级引用元素），代表其中的文字是引用内容。' }]
    })
  },

  {
    is: 'button',
    label: 'button',
    icon: 'https://api.iconify.design/material-symbols:radio-button-unchecked.svg',
    props: [

    ],
    defaultProps: () => ({
      children: [{ is: 'span', children: 'button' }]
    })
  },

  {
    is: 'input',
    label: 'input',
    icon: 'https://api.iconify.design/ri:input-field.svg',
    props: props => [
      { lp: 'value' },
      { lp: 'name' },
      { lp: 'disabled', type: 'switch' },
      { lp: 'readonly', type: 'switch' },
      { lp: 'required', type: 'switch' },
      { lp: 'type', displayValue: 'text', options: ['text', 'number', 'range', 'password', 'radio', 'checkbox', 'color', 'date', 'datetime-local', 'month', 'time', 'reset', 'submit'] },
      ...[
        [{ lp: 'min', type: 'input-number' }, ['number', 'range']],
        [{ lp: 'max', type: 'input-number' }, ['number', 'range']],
        [{ lp: 'step', type: 'input-number' }, ['number', 'range']],
        [{ lp: 'minlength', type: 'input-number' }, [void 0, 'password']],
        [{ lp: 'maxlength', type: 'input-number' }, [void 0, 'password']],
        [{ lp: 'pattern' }, ['text', 'password']],
        [{ lp: 'placeholder' }, ['text', 'password']],
      ].flatMap(e => e[1].includes(props.type) ? e[0] : []),
    ],
    defaultProps: () => ({

    })
  },

  {
    is: 'VHtml',
    label: 'v-html',
    icon: 'https://api.iconify.design/mdi:language-html5.svg',
    props: [
      { lp: ['v-html', 'innerHTML'], el: { type: 'textarea', autosize: { maxRows: 6 } } }
    ],
    defaultProps: () => ({
      innerHTML: '这里的内容可以直接编辑'
    }),
    devProps: props => ({
      is: 'wangeditor',
      innerHTML: void 0,
      style: { '--w-e-textarea-color': 'initial', '--w-e-textarea-bg-color': 'transparent', height: 'auto' },
      toolbar: { show: false },
      scroll: false,
      modelValue: props.innerHTML,
      'onUpdate:modelValue': v => toRaw(props).innerHTML = v
    })
  },

  {
    is: 'wangeditor',
    label: 'wang-editor',
    icon: 'https://api.iconify.design/mdi:language-html5.svg',
    props: [
      { lp: ['toolbar', 'toolbar.show'], type: 'switch', displayValue: true },
      { lp: 'disabled', type: 'switch' },
      { lp: 'autoFocus', type: 'switch' },
      // { lp: 'scroll', type: 'switch', displayValue: true },
      { lp: ['simple', 'mode'], type: 'switch', displayValue: 'default', el: { activeValue: 'simple', inactiveValue: 'default' } },
      { lp: 'max-length', type: 'input-number' },
      { lp: 'placeholder' },
      { is: 'el-divider' },
      { is: 'h2', class: 'my12', children: 'Event' },
      { lp: ['onInput', 'onUpdate:modelValue'] }
    ],
    defaultProps: () => ({
      modelValue: '',
      placeholder: '请输入内容...',
      style: { border: '1px solid #ccc' }
    }),
    devProps: props => ({
      // 'onUpdate:modelValue': e => toRaw(props).innerHTML = e.currentTarget.innerHTML
    })
  }
]