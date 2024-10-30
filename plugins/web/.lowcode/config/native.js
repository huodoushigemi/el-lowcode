import { toRaw, toRef, triggerRef } from 'vue'
import { chooseImg } from '@el-lowcode/utils'
import TiptapProps from '../TiptapProps.vue'

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

const virtualProp = (props, p1, p2) => (p2 in props) || Object.defineProperty(props, p2, {
  get() { return this[p1] },
  set(v) { this[p1] = v },
  enumerable: false
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

  // createH('h1', false),
  // createH('h2'),
  // createH('h3'),
  // createH('h4'),
  // createH('h5'),
  // createH('h6'),

  {
    is: 'a',
    label: 'link',
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
    label: 'text',
    category: '基础组件',
    icon: 'https://api.iconify.design/mdi:format-text.svg',
    props: [
      { lp: ['text', 'children'] },
    ],
    devProps: props => ({
      contenteditable: true,
      style: 'outline: 0',
      onInput: e => (e.stopPropagation(), toRaw(props).children = e.currentTarget.innerText, (e.currentTarget.innerText == e.currentTarget.innerHTML) || (e.currentTarget.innerHTML = e.currentTarget.innerText)),
      onKeydown: e => e.stopPropagation(),
      onClick: e => e.currentTarget.focus(),
    }),
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

  // {
  //   is: 'ul',
  //   label: 'ul',
  //   drag: { from: 'li' },
  //   icon: 'https://api.iconify.design/mdi:format-list-bulleted.svg',
  //   props: [
  //     { lp: ['list-style', 'style.listStyle'], type: 'select', options: ['simp-chinese-informal', 'decimal', 'disc', 'circle' ,'square'], displayValue: 'disc' },
  //   ],
  //   defaultProps: () => ({
  //     children: [
  //       { is: 'li', children: [] },
  //       { is: 'li', children: [] }
  //     ]
  //   })
  // },

  // {
  //   is: 'li',
  //   label: 'li',
  //   drag: { to: ['ol', 'ul'] },
  //   icon: 'https://api.iconify.design/ph:dot-fill.svg',
  //   props: [

  //   ],
  //   defaultProps: () => ({
  //     children: []
  //   })
  // },

  // {
  //   is: 'blockquote',
  //   label: 'blockquote',
  //   icon: 'https://api.iconify.design/tabler:blockquote.svg',
  //   props: [

  //   ],
  //   defaultProps: () => ({
  //     children: [{ is: 'p', children: 'TIP' }, { is: 'p', children: 'HTML <blockquote> 元素（或者 HTML 块级引用元素），代表其中的文字是引用内容。' }]
  //   })
  // },

  {
    is: 'button',
    label: 'button',
    category: '基础组件',
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
    category: '基础组件',
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
    category: '额外扩展',
    icon: 'https://api.iconify.design/mdi:language-html5.svg',
    props: (props, lcd) => [
      // { lp: ['v-html', 'innerHTML'], el: { type: 'textarea', autosize: { maxRows: 6 } } }
      { is: TiptapProps, el: lcd.keyedCtx[props._id].el }
    ],
    defaultProps: () => ({
      innerHTML: '<h1>v-html 用于渲染富文本</h1><p>这里可用直接编辑，采用了 Tiptap 富文本编辑器</p>'
    }),
    devProps: props => ({
      is: 'tiptap',
      innerHTML: void 0,
      modelValue: props.innerHTML,
      'onUpdate:modelValue': v => toRaw(props).innerHTML = v,
      onChange: v => triggerRef(toRef(props, 'innerHTML'))
    })
  },

  {
    is: 'wangeditor',
    label: 'wang-editor',
    category: '额外扩展',
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
  },

  {
    is: 'markdown-it',
    label: 'markdown-it',
    category: '额外扩展',
    icon: 'https://api.iconify.design/mdi:language-markdown-outline.svg',
    props: [
      { lp: 'src' },
      { lp: 'content', el: { is: 'MonacoEditor', language: 'markdown', style: 'height: 400px' } },
      { is: 'div', class: 'grid grid-cols-2 gap-x-8', style: 'margin-top: 32px', children: [
        { lp: 'theme', options: ['github', 'github-light', 'github-dark', 'juejin', 'juejin-yu', 'juejin-devui-blue', 'vuepress'] },
        { lp: ['body-style', 'body-style'] },
        { lp: ['html', 'options.html'], type: 'switch', displayValue: false },
        { lp: ['breaks', 'options.breaks'], type: 'switch', displayValue: false },
        { lp: ['linkify', 'options.linkify'], type: 'switch', displayValue: false },
        { lp: ['typographer', 'options.typographer'], type: 'switch', displayValue: false },
      ] }
    ],
    devProps(props) {
      virtualProp(props, '.options', 'options')
    },
    defaultProps: () => ({
      content: `# Markdown-It\n\n---\n\nI really laike using Markdown.\n\nI just love **bold text**.\n\n> #### The quarterly results look great!\n>\n> - Revenue was off the chart.\n> - Profits were higher than ever.\n>\n>  *Everything* is going according to **plan**.\n\n[🔗 百度一下 👈](https://www.baidu.com/)\n\n![excel](https://api.iconify.design/vscode-icons:file-type-excel.svg)\n![word](https://api.iconify.design/vscode-icons:file-type-word.svg)\n![ppt](https://api.iconify.design/vscode-icons:file-type-powerpoint.svg)\n![vscode](https://api.iconify.design/vscode-icons:file-type-vscode.svg)`,
      // src: 'https://raw.githubusercontent.com/huodoushigemi/wc-mdit/refs/heads/main/README.md',
      theme: 'github',
      'body-style': 'padding: 32px;',
      '.options': {
        html: true,
        linkify: true
      }
    })
  },

  {
    is: 'qrcode',
    label: 'qrcode',
    category: '额外扩展',
    icon: 'https://api.iconify.design/mdi:qrcode.svg',
    props: [
      { lp: 'text' },
      { lp: ['type', 'options.type'], type: 'radio-group', options: ['svg', ['png', 'image/png']] },
      { lp: ['margin', 'options.margin'], type: 'input-number', displayValue: 4 },
      { lp: ['color', 'options.color.dark'], type: 'color-picker', displayValue: '#000000ff', el: { colorFormat: 'hex' } },
      { lp: ['bg-color', 'options.color.light'], type: 'color-picker', displayValue: '#ffffffff', el: { colorFormat: 'hex' } },
    ],
    defaultProps: () => ({
      text: 'https://www.baidu.com',
      options: {
        type: 'svg'
      },
      style: { width: '128px', height: '128px' }
    })
  },

  {
    is: 'hljs',
    label: 'highlight',
    category: '额外扩展',
    icon: 'https://api.iconify.design/mdi:code-braces.svg',
    props: props => [
      { lp: 'lang', options: [['JSON', 'json'], ['Html', 'html'], ['Css', 'css'], ['JS', 'javascript'], ['Java', 'java'], ['Python', 'python'], ['Go', 'go'], ['SQL', 'sql'], ['Diff', 'diff'], ['Bash', 'bash']] },
      { lp: 'theme', options: ['a11y-light', 'a11y-dark', 'atom-one-light', 'atom-one-dark', 'github', 'github-dark', 'vs', 'vs2015'] },
      { lp: 'code', el: { is: 'MonacoEditor', language: props.lang, autofocus: true, style: { height: '400px' } } },
    ],
    defaultProps: () => ({
      lang: 'json',
      theme: 'vs2015',
      code: '{\n  "name": "Jack"\n}'
    })
  },
]