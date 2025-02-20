import { defineAsyncComponent, defineComponent, h, mergeProps, normalizeStyle, toRaw, toRef, triggerRef } from 'vue'
import { isString } from '@vue/shared'
import { chooseImg } from '@el-lowcode/utils'

const str = (lp, extra) => ({ lp, displayValue: '', ...extra })
const opts = (lp, options, extra) => ({ lp, options, ...extra })
const radios = (lp, options, extra) => ({ lp, type: 'radio-group', options, ...extra, el: { type: 'button', ...extra?.el } })
const chekcs = (lp, options, extra) => ({ lp, type: 'checkbox-group', options, ...extra, el: { type: 'button', ...extra?.el } })
const bool = (lp, displayValue = false, extra) => ({ lp, type: 'switch', displayValue, ...extra })
const num = (lp, displayValue, extra) => ({ lp, type: 'input-number', displayValue, set: v => v == null ? void 0 : v, ...extra })
const color = lp => ({ lp, type: 'color-picker' })

const txt = () => ({ lp: ['text', 'children'], hide: o => !isString(o.children) })
const hr = () => ({ is: 'hr', class: '-mx8' })

const grid2 = children => ({ is: 'div', class: 'grid grid-cols-2 gap-x-12', children })
const grid3 = children => ({ is: 'div', class: 'grid grid-cols-3 gap-x-12', children })

const Text = (s, extra) => ({ is: 'span', children: s, ...extra })

const createH = (is, hidden = true) => ({
  is,
  label: is,
  hidden,
  icon: 'https://api.iconify.design/mdi:format-header-1.svg',
  props: [
    { lp: ['text', 'children'] },
    radios(['level', 'is'], ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'])
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

function vmodel(prop, extra) {
  const label = prop ? `v-model : ${prop}` : `v-model`
  prop = prop ? camelize(prop) : 'modelValue'
  return { lp: [label, `vModels.${prop}.0`], out: (v, model) => (v || (delete model.vModels[prop]), {}), script: false, ...extra, el: { spellcheck: false } }
}

function vmodelInput(prop = 'value', extra) {
  return {
    lp: ['v-model', `vModels.${prop}`],
    get: v => v?.[0] || '',
    set: v => v ? ([v, null, ['onInput', 'e => e.target.value']]) : void 0,
    out: (v, model) => (v || (delete model.vModels[prop]), {}),
    script: false,
    ...extra,
    el: { spellcheck: false }
  }
}

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

  createH('h1'),
  createH('h2'),
  createH('h3'),
  createH('h4'),
  createH('h5'),
  createH('h6'),

  {
    is: 'a',
    label: 'link',
    category: '基础组件',
    icon: 'https://api.iconify.design/mdi:link-variant.svg',
    props: [
      txt(),
      str('href'),
      radios('target', [['_self'], '_blank'])
    ],
    defaultProps: () => ({
      children: 'element-plus',
      href: 'https://element-plus.org/zh-CN/',
      target: '_blank'
    }),
    devProps: () => ({
      onClick: e => e.preventDefault()
    })
  },

  {
    is: 'p',
    label: 'p',
    category: '基础组件',
    icon: 'https://api.iconify.design/material-symbols:format-paragraph.svg',
    props: [
      txt()
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
    cover: '',
    props: props => [
      str('src'),
      { is: 'button', class: 'vs-btn mb18', onClick: async () => props.src = (await chooseImg({ base64: true, maxSize: 1024 * 200 }))[0], children: [
        { is: 'div', class: 'mask-icon mr4 w24 h18', style: '--mask-image: url(https://api.iconify.design/tdesign:cloud-upload.svg)' }, 'upload'
      ] },
      radios(['fit', 'style.objectFit'], ['fill', 'contain', 'cover']),
      bool(['lazy', 'loading'], void 0, { el: { activeValue: 'lazy' } }),
      str('alt'),
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
      txt()
    ],
    defaultProps: () => ({
      children: '文本'
    })
  },

  {
    is: 'iframe',
    label: 'iframe',
    cover: '',
    props: [
      str('src')
    ],
    devProps: (props) => ({
      is: defineComponent({
        props: Object.keys(props),
        render: (props) => h('div', { style: 'position: relative' }, [
          h('iframe', { ...props }),
          h('div', { class: 'hover-mask', style: 'position: absolute; inset: 0; cursor: move' }),
          h('style', { innerHTML: `.hover-mask:hover { background: #80808020 }` })
        ]),
      })
    }),
    defaultProps: () => ({
      src: 'https://element-plus.org/zh-CN/',
      style: { display: 'block', width: '100%', height: '300px', border: '0' }
    }),
  },

  {
    is: 'details',
    label: 'details',
    props: [
      bool(['default-open', 'open'])
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
      radios('type', [['—'], 'submit', 'reset'])
    ],
    defaultProps: () => ({
      children: [{ is: 'span', children: 'button' }]
    })
  },

  {
    is: 'form',
    label: 'form',
    category: '表单组件',
    coverSpan: 2,
    props: [
      str('on-submit')
    ],
    defaultProps: await import('./form.schema').then(e => e.default)
  },

  {
    is: 'input',
    label: 'input',
    category: '表单组件',
    icon: 'https://api.iconify.design/ri:input-field.svg',
    props: props => [
      // { lp: 'value' },
      vmodelInput(),
      str('name'),
      bool('disabled'),
      bool('readonly'),
      bool('required'),
      opts('type', [['text'], 'number', 'range', 'password', 'radio', 'checkbox', 'color', 'date', 'datetime-local', 'month', 'time']),
      ...[
        [num('min'), ['number', 'range']],
        [num('max'), ['number', 'range']],
        [num('step'), ['number', 'range']],
        [num('minlength'), [void 0, 'password']],
        [num('maxlength'), [void 0, 'password']],
        [str('pattern'), ['text', 'password']],
        [str('placeholder'), ['text', 'password']],
      ].flatMap(e => e[1].includes(props.type) ? e[0] : []),
    ],
    defaultProps: () => ({

    })
  },

  {
    is: 'select',
    label: 'select',
    category: '表单组件',
    drag: { from: ['option'] },
    props: [
      vmodelInput()
    ],
    defaultProps: () => ({
      children: [
        { is: 'option', value: '1', children: 'One' },
        { is: 'option', value: '2', children: 'Two' },
        { is: 'option', value: '3', children: 'Three' },
      ]
    })
  },
  {
    is: 'option',
    label: 'option',
    category: '表单组件',
    hidden: true,
    drag: { from: ['select'] },
    props: [
      str('value')
    ],
  },

  {
    is: 'VHtml',
    label: 'v-html',
    category: '额外扩展',
    icon: 'https://api.iconify.design/mdi:language-html5.svg',
    coverSpan: 2,
    props: (props, { el }) => [
      // { lp: ['v-html', 'innerHTML'], el: { type: 'textarea', autosize: { maxRows: 6 } } }
      { is: defineAsyncComponent(() => import('../TiptapProps.vue')), el }
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
    hidden: true,
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
    coverSpan: 2,
    props: [
      str('src'),
      str('content', { el: { is: 'MonacoEditor', language: 'markdown', style: 'height: 400px' } }),
      hr(),
      grid2([
        opts('theme', ['github', 'github-light', 'github-dark', 'juejin', 'juejin-yu', 'juejin-devui-blue', 'vuepress']),
        str(['body-style', 'body-style']),
        bool(['html', 'options.html']),
        bool(['breaks', 'options.breaks']),
        bool(['linkify', 'options.linkify']),
        bool(['typographer', 'options.typographer']),
      ]),
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
      str('text'),
      radios(['type', 'options.type'], ['svg', ['png', 'image/png']]),
      num(['margin', 'options.margin'], 4),
      color(['color', 'options.color.dark'], { displayValue: '#000000ff', el: { colorFormat: 'hex' } }),
      color(['bg-color', 'options.color.light'], { displayValue: '#ffffffff', el: { colorFormat: 'hex' } }),
    ],
    defaultProps: () => ({
      text: 'https://www.baidu.com',
      options: { type: 'svg' },
      style: { width: '128px', height: '128px' }
    })
  },

  {
    is: 'hljs',
    label: 'highlight',
    category: '额外扩展',
    icon: 'https://api.iconify.design/mdi:code-braces.svg',
    coverSpan: 2,
    props: props => [
      opts('lang', [['JSON', 'json'], ['Html', 'html'], ['Css', 'css'], ['JS', 'javascript'], ['Java', 'java'], ['Python', 'python'], ['Go', 'go'], ['SQL', 'sql'], ['Diff', 'diff'], ['Bash', 'bash']]),
      opts('theme', ['a11y-light', 'a11y-dark', 'atom-one-light', 'atom-one-dark', 'github', 'github-dark', 'vs', 'vs2015']),
      str('code', { el: { is: 'MonacoEditor', language: props.lang, style: { height: '400px' } } }),
    ],
    defaultProps: () => ({
      lang: 'json',
      theme: 'vs2015',
      code: '{\n  "name": "Jack"\n}'
    })
  },

  { is: 'script', hidden: true }
]