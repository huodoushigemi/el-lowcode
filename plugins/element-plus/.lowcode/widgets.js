import { h, resolveDynamicComponent } from 'vue'
import { camelize } from '@vue/shared'
import { uid, mergeRects } from '@el-lowcode/utils'
import { unrefElement } from '@vueuse/core'

const SIZES = ['large', 'default', 'small']

const str = (lp, extra) => ({ lp, displayValue: '', ...extra })
const opts = (lp, options, extra) => ({ lp, options, ...extra })
const radios = (lp, options, extra) => ({ lp, type: 'radio-group', options, ...extra, el: { type: 'button', ...extra?.el } })
const checkboxs = (lp, options, extra) => ({ lp, type: 'checkbox-group', options, ...extra, el: { type: 'button', ...extra?.el } })
const bool = (lp, displayValue = false, extra) => ({ lp, type: 'switch', displayValue, ...extra })
const num = (lp, displayValue, extra) => ({ lp, type: 'input-number', displayValue, set: v => v == null ? void 0 : v, ...extra })
const color = lp => ({ lp, type: 'color-picker' })

const hr = () => ({ is: 'hr', class: '-mx8' })

const grid2 = children => ({ is: 'div', class: 'grid grid-cols-2 gap-x-12', children })

const Text = (s, extra) => ({ is: 'span', children: s, ...extra })

function vmodel(prop) {
  const label = prop ? `v-model : ${prop}` : `v-model`
  prop = prop ? camelize(prop) : 'modelValue'
  return { lp: [label, `vModels.${prop}.0`], out: (v, model) => (v || (delete model.vModels[prop]), {}), script: false, el: { spellcheck: false } }
}

export default [
  {
    is: 'ElButton',
    label: 'button',
    category: '基础组件',
    props: [
      grid2([
        opts('type', ['default', 'primary', 'success', 'warning', 'danger', 'info']),
        bool('plain'),
        radios('size', SIZES, { class: 'col-span-2' }),
        bool('text'),
        bool('bg'),
        bool('round'),
        bool('circle'),
      ]),
      bool('link'),
      bool('disabled'),
      opts('native-type', ['submit', 'reset']),
    ],
    defaultProps: () => ({
      children: 'button',
    }),
  },
  
  {
    is: 'ElLink',
    label: 'link',
    category: '基础组件',
    props: [
      str(['text', 'children']),
      str('href'),
      radios('target', ['_self', '_blank']),
      bool('disabled'),
      bool('underline', true),
      opts('type', ['default', 'primary', 'success', 'warning', 'danger', 'info']),
    ],
    defaultProps: () => ({
      children: 'link',
      type: 'primary',
      href: 'https://element-plus.gitee.io'
    })
  },

  {
    is: 'ElText',
    label: 'text',
    category: '基础组件',
    hidden: true,
    props: [
      str('children'),
      opts('type', ['', 'primary', 'success', 'warning', 'danger', 'info']),
      radios('size', SIZES),
    ],
    defaultProps: () => ({
      children: '文本'
    })
  },

  {
    is: 'ElCard',
    label: 'card',
    category: '容器',
    vSlots: ['header', 'footer'],
    props: [
      str('body-class'),
      str('body-style', { el: { type: 'textarea', autosize: { minRows: 4, maxRows: 12 } } }),
      radios('shadow', [['always'], 'never', 'hover']),
    ],
    defaultProps: () => ({
      children: {
        header: { children: [Text('Title')] },
        default: { children: [] }
      }
    })
  },

  {
    is: 'ElCarousel',
    label: 'carousel',
    category: '容器',
    drag: { from: ['ElCarouselItem'] },
    props: [
      str('height'),
      num('initial-index'),
      num('interval', 3000),
      radios('trigger', [['hover'], 'click']),
      bool(['card', 'type'], void 0, { el: { activeValue: 'card', inactiveValue: undefined } }),
      bool('loop'),
      radios('direction', [['horizontal'], 'vertical']),
      bool('autoplay', true),
      bool('motion-blur'),
      { lp: ['items', 'children'], el: { is: 'OptionsInput', props: { V: 'name' }, new: i => ({ is: 'ElCarouselItem', children: [{ is: 'h1', children: `item ${i + 1}` }] }) } }
    ],
    defaultProps: () => ({
      autoplay: true,
      height: '150px',
      children: [
        { is: 'ElCarouselItem', children: [{ is: 'h1', children: `item 1` }] },
        { is: 'ElCarouselItem', children: [{ is: 'h1', children: `item 2` }] }
      ]
    })
  },
  {
    is: 'ElCarouselItem',
    label: 'carousel-item',
    hidden: true,
    drag: { to: ['ElCarousel'] },
    defaultProps: () => ({
      children: []
    })
  },

  {
    is: 'ElTabs',
    label: 'tabs',
    category: '容器',
    drag: { from: ['ElTabPane'] },
    props: [
      vmodel(),
      radios('type', [['—'], 'card', 'border-card']),
      radios('tab-position', [['top'], 'right', 'bottom', 'left']),
      bool('stretch'),
      // { lp: ['tabs', 'children'], el: { is: 'OptionsInput', props: { V: 'name' }, new: i => ({ is: 'ElTabPane', label: `tab${i + 1}`, children: [] }) } }
    ],
    defaultProps: (ctx) => ({
      children: [
        { ...ctx.newProps('ElTabPane'), label: 'tab1' },
        { ...ctx.newProps('ElTabPane'), label: 'tab2' },
      ]
    }),
    devProps: (props, children) => ({
      beforeLeave: props.beforeLeave || (() => true),
    }),
    getDropEl: ({ el }) => {
      return el.querySelector(`.el-tabs__nav`)
    }
  },
  {
    is: 'ElTabPane',
    label: 'tab-pane',
    hidden: true,
    drag: { to: ['ElTabs'] },
    vSlots: ['label'],
    props: [
      str('label'),
      str('name'),
      bool('disabled'),
      bool('lazy'),
    ],
    defaultProps: () => ({
      children: []
    }),
    devProps: (_, { parent }) => ({
      key: ({ ...parent.children }, uid()), // fix: drag bar does not update
    }),
    getEl({ data, parent$, index }) {
      return parent$.el.querySelector(`#tab-${data.name || index}`)
    },
  },

  {
    is: 'ElFormItemRender',
    label: 'field',
    category: '表单',
    drag: { ancestor: ['ElForm', 'ElForm-c', 'ElForm-lcd'] },
    vSlots: ['label'],
    props: () => ([
      { is: 'div', class: 'grid grid-cols-2 gap-x-8', children: [
        str(['标签', 'label']),
        str(['字段', 'prop']),
      ] },
      bool(['必填', 'required']),
      // { lp: 'description', el: { type: 'textarea', autosize: { minRows: 2, maxRows: 4 } } },
      { is: 'ElCollapse', class: 'mb18', children: [{ is: 'ElCollapseItem', title: '校验', children: [
          { lp: ['validator', 'rules.validator'], script: true },
          { lp: ['pattern', 'rules.pattern'] },
          { lp: ['pattern-hint', 'rules.message'] }
        ]
      }]},
    ]),
    defaultProps: (ctx) => ({
      is: 'ElFormItemRender',
      label: 'field',
      prop: `input`,
      children: [ctx.newProps('ElInput')],
    }),
    purify: props => ({
      ...props,
      // defaultValue: void 0,
      children: [{ ...props.children[0], defaultValue: void 0 }]
    }),
    JSONSchemaOutput: (props, ctx) => {
      const el = props.children[0] || {}
      return {
        title: props.label,
        description: props.description,
        pattern: props.rules?.pattern,
        default: el.defaultValue,
        enum: el.children?.map(e => e.value),
        enumNames: el.children?.map(e => e.label),
        ...ctx.widgets[el.is].JSONSchemaOutput?.(el, ctx)
      }
    }
  },

  {
    is: 'ElInput',
    label: 'input',
    category: '数据输入',
    vSlots: ['prefix', 'suffix', 'prepend', 'append'],
    props: [
      vmodel(),
      grid2([
        bool('disabled'), bool('readonly'),
        bool('clearable'), bool('autofocus'),
        opts('type', [['text'], 'textarea', 'password', 'number']), str('placeholder'),
        num('minlength'), num('maxlength'),
      ]),
      bool('show-word-limit'),
      radios('size', SIZES)
    ],
    defaultProps: () => ({
      defaultValue: '',
    }),
    JSONSchemaOutput: (props) => ({
      minLength: props.minlength,
      maxLength: props.maxlength,
    })
  },

  {
    is: 'ElInputNumber',
    label: 'number',
    category: '数据输入',
    vSlots: ['prefix', 'suffix'],
    props: [
      grid2([
        bool('disabled'), bool('readonly'),
        num('min'), num('max'),
        num('step'), num('precision'),
        bool('controls', true)
      ]),
      radios('size', SIZES),
    ],
    defaultProps: () => ({
      defaultValue: 0,
      controlsPosition: 'right',
    }),
    JSONSchemaOutput: (props) => ({
      type: 'number',
      minimum: props.min,
      maximum: props.max,
      multipleOf: props.step,
    })
  },

  {
    is: 'ElSelect',
    label: 'select',
    category: '数据输入',
    drag: { from: ['ElOption'] },
    vSlots: ['prefix'],
    props: (props) => [
      vmodel(),
      grid2([
        bool('disabled'), bool('clearable'),
        bool('allow-create'),
      ]),
      grid2([
        bool('multiple'),
        props.multiple && num('multiple-limit')
      ]),
      str('placeholder'),
      { lp: ['options', 'children'], el: { is: 'OptionsInput', new: i => ({ is: 'ElOption', label: `opt ${i + 1}`, value: `${i + 1}` }) }  }
    ],
    defaultProps: () => ({
      // todo
      // defaultValue: '',
      filterable: true,
      defaultFirstOption: true,
      children: [
        { is: 'ElOption', label: `opt 1`, value: `1` },
        { is: 'ElOption', label: `opt 2`, value: `2` },
        { is: 'ElOption', label: `opt 3`, value: `3` },
      ]
    }),
    JSONSchemaOutput: (props) => ({
      // todo
      // minLength: props.minlength,
      // maxLength: props.maxlength,
    })
  },
  {
    is: 'ElOption',
    label: 'option',
    category: '数据输入',
    drag: { to: ['ElSelect'], disabled: true },
    hidden: true,
    props: () => [
      str('label'),
      str('value'),
      grid2([
        bool('disabled')
      ]),
    ]
  },

  {
    is: 'ElSwitch',
    label: 'switch',
    category: '数据输入',
    props: [
      bool('disabled'),
      num('width'),
      grid2([
        str('active-text'), str('inactive-text'),
        str('active-value'), str('inactive-value'),
      ]),
    ],
    defaultProps: () => ({
      defaultValue: false,
    }),
    JSONSchemaOutput: (props) => ({
      type: 'boolean',
    })
  },

  {
    is: 'ElCheckboxGroup',
    label: 'checkboxs',
    category: '数据输入',
    drag: { from: ['ElCheckbox', 'ElCheckboxButton'] },
    props: [
      grid2([
        bool('disabled'), bool('button', void 0, { el: { activeValue: 'button', inactiveValue: undefined } }),
        num('min'), num('max'),
        color('fill')
      ]),
      { lp: ['options', 'children'], el: { is: 'OptionsInput', new: i => ({ is: 'ElCheckbox', label: `opt ${i + 1}`, value: `${i + 1}` }) }  }
    ],
    defaultProps: () => ({
      defaultValue: [],
      children: [
        { is: 'ElCheckbox', label: `opt 1`, value: `1` },
        { is: 'ElCheckbox', label: `opt 2`, value: `2` },
        { is: 'ElCheckbox', label: `opt 3`, value: `3` },
      ]
    }),
    JSONSchemaOutput: (props) => ({
      type: 'array',
      minItems: props.min,
      maxItems: props.max,
      uniqueItems: true,
      items: {
        type: 'string',
      },
    })
  },
  {
    is: 'ElCheckbox',
    label: 'checkbox',
    category: '数据输入',
    drag: { to: ['ElCheckboxGroup'] },
    hidden: true,
    props: [str('label'), str('value')],
  },

  {
    is: 'ElRadioGroup',
    label: 'radios',
    category: '数据输入',
    drag: { from: ['ElRadio', 'ElRadioButton'] },
    props: [
      grid2([
        bool('disabled'), bool('button', void 0, { el: { activeValue: 'button', inactiveValue: undefined } }),
        color('fill')
      ]),
      { lp: ['options', 'children'], el: { is: 'OptionsInput', new: i => ({ is: 'ElRadio', label: `opt ${i + 1}`, value: `${i + 1}` }) }  }
    ],
    defaultProps: () => ({
      defaultValue: '',
      children: [
        { is: 'ElRadio', label: `opt 1`, value: `1` },
        { is: 'ElRadio', label: `opt 2`, value: `2` },
        { is: 'ElRadio', label: `opt 3`, value: `3` },
      ]
    }),
    JSONSchemaOutput: (props) => ({
      type: 'string',
    })
  },
  {
    is: 'ElRadio',
    label: 'radio',
    category: '数据输入',
    drag: { to: ['ElRadioGroup'] },
    hidden: true,
    props: [str('label'), str('value')],
  },

  {
    is: 'ElSlider',
    label: 'slider',
    category: '数据输入',
    props: [
      grid2([
        bool('disabled'), bool('show-tooltip', true),
        num('min'), num('max'),
        num('step'),
        bool('show-input'), bool('show-stops'),
      ])
    ],
    defaultProps: () => ({
      defaultValue: 0,
    }),
    JSONSchemaOutput: (props) => ({
      type: 'number',
      minimum: props.min,
      maximum: props.max,
      multipleOf: props.step,
    })
  },

  {
    is: 'ElRate',
    label: 'rate',
    category: '数据输入',
    props: [
      bool('disabled'),
      num('max', 5),
      color('void-color'),
      // { lp: ['low-threshold', 'el.lowThreshold'], type: 'input-number', displayValue: 2 },
      // { lp: ['high-threshold', 'el.highThreshold'], type: 'input-number', displayValue: 4 },
      radios('size', SIZES),
    ],
    defaultProps: () => ({
      defaultValue: 0,
    }),
    JSONSchemaOutput: (props) => ({
      type: 'number',
      maximum: props.max,
    })
  },

  {
    is: 'ElDatePicker',
    label: 'date',
    category: '数据输入',
    props: [
      grid2([
        bool('disabled'),
        bool('readonly'),
        bool('clearable'),
        opts('type', ['year', 'month', 'date', 'datetime', 'week'], { style: 'grid-column: 1 / 2' }),
        opts(['show-format', 'format'], [['YYYY-MM-DD'], 'YYYY/MM/DD']),
        str('placeholder'),
      ])
    ],
    defaultProps: () => ({
      defaultValue: '',
      valueFormat: 'YYYY-MM-DD',
    }),
    JSONSchemaOutput: (props) => ({
      type: 'string',
      format: 'date',
    }),
    getEl({ ref }) {
      return unrefElement(ref)?.nextSibling
    }
  },

  {
    is: 'ElTimePicker',
    label: 'time',
    category: '数据输入',
    props: [
      grid2([
        bool('disabled'),
        bool('readonly'),
        bool('clearable'),
        opts(['show-format', 'format'], [['HH:mm:ss'], 'hh:mm:ss', 'HH时mm分ss秒', 'hh时mm分ss秒']),
        str('placeholder'),
      ])
    ],
    defaultProps: () => ({
      defaultValue: '',
    }),
    JSONSchemaOutput: (props) => ({
      type: 'string',
      format: 'time',
    }),
    getEl({ ref }) {
      return unrefElement(ref)?.nextSibling
    }
  },

  {
    is: 'ElSegmented',
    label: 'segmented',
    category: '数据输入',
    props: [
      grid2([
        bool('disabled'), bool('block'),
      ]),
      radios('size', SIZES),
      { lp: 'options', el: { is: 'OptionsInput', new: i => ({ label: `opt ${i + 1}`, value: `${i + 1}` }) }  }
    ],
    defaultProps: () => ({
      options: [{ label: `opt 1`, value: `1` }, { label: `opt 2`, value: `2` }, { label: `opt 3`, value: `3` }]
    }),
    JSONSchemaOutput: (props) => ({
      type: 'string'
    })
  },

  {
    is: 'ElColorPicker',
    label: 'color',
    category: '数据输入',
    props: [
      grid2([
        bool('disabled'), bool('show-alpha'),
      ])
    ],
    defaultProps: () => ({
      defaultValue: '',
    }),
    JSONSchemaOutput: (props) => ({
      type: 'string',
    }),
    getEl({ ref }) {
      return unrefElement(ref)?.nextSibling
    }
  },

  {
    is: 'ElDescriptions',
    label: 'descriptions',
    category: '数据展示',
    drag: { from: ['ElDescriptionsItem'] },
    vSlots: ['title', 'extra'],
    props: [
      bool('border'),
      num('column'),
      radios('direction', ['vertical', 'horizontal']),
      radios('size', SIZES),
      // { lp: ['cols', 'children'], el: { is: 'OptionsInput', props: { V: 'children' }, new: i => ({ is: 'ElDescriptionsItem', label: `title${i + 1}`, children: `content${i + 1}` }) } },
    ],
    defaultProps: () => ({
      column: 3,
      border: true,
      children: [
        { is: 'ElDescriptionsItem', children: { label: { children: [Text('Username')] }, default: { children: [Text('kooriookami')] } } },
        { is: 'ElDescriptionsItem', children: { label: { children: [Text('Telephone')] }, default: { children: [Text('18100000000')] } } },
        { is: 'ElDescriptionsItem', children: { label: { children: [Text('Place')] }, default: { children: [Text('Suzhou')] } } },
        { is: 'ElDescriptionsItem', children: { label: { children: [Text('Remarks')] }, default: { children: [Text('School')] } } },
        { is: 'ElDescriptionsItem', children: { label: { children: [Text('Address')] }, default: { children: [Text('No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province')] } } },
      ]
    }),
    getDropEl({ el }) {
      return [...el.querySelectorAll('tr')]
    }
  },
  {
    is: 'ElDescriptionsItem',
    label: 'item',
    hidden: true,
    drag: { to: ['ElDescriptions'] },
    vSlots: ['label'],
    props: [
      grid2([
        num(['colspan', 'span'], 1), num('rowspan', 1),
        str(['label-class', 'labelClassName']), str('class-name')
      ]),
      radios('label-align', [['left'], 'center', 'right']),
      radios('align', [['left'], 'center', 'right']),
    ],
    devProps: props => ({
      'lcd-label': `cell`,
      labelClassName: `${props.labelClassName || ''} lcd-id:${props._id}`,
      className: `${props.className || ''} lcd-id:${props._id}`,
    }),
    getEl({ id, parent$ }) {
      return [...parent$.el.querySelectorAll(`.lcd-id\\:${id}`)]
    },
    getRect({ id, parent$ }) {
      return mergeRects([...parent$.el.querySelectorAll(`.lcd-id\\:${id}`)])
    }
  },

  {
    is: 'ElTable',
    label: 'table',
    category: '数据展示',
    drag: { from: ['ElTableColumn'] },
    vSlots: ['append', 'empty'],
    props: props => [
      str('data', { script: true, displayValue: `{{[]}}` }),
      grid2([
        bool('border'), bool('stripe'),
      ]),
      radios('size', SIZES),
      hr(),
      bool(['summary', 'showSummary']),
      props.showSummary && str('summary-method', { script: true, displayValue: `{{({ data, columns }) => {\n  \n}}}` }),
    ],
    defaultProps: () => ({
      children: [
        { is: 'ElTableColumn', label: 'Name', prop: 'name' },
        { is: 'ElTableColumn', label: 'Age', prop: 'age' },
        { is: 'ElTableColumn', label: 'Sex', prop: 'sex' },
      ]
    }),
  },
  {
    is: 'ElTableColumn',
    label: 'table-column',
    category: '数据展示',
    hidden: true,
    drag: { to: ['ElTable'] },
    vSlots: {
      header: { vSlot: '{ column, $index }' },
      default: { vSlot: '{ row, column, $index }' }
    },
    props: [
      str('label'),
      str(['key', 'prop']),
      grid2([
        num('width'),
        bool(['tooltip', 'showOverflowTooltip']),
      ]),
      radios('type', [['—'], 'index', 'selection']),
      radios('fixed', [['—'], 'left', 'right']),
      radios('align', [['—'], 'center', 'right']),
      str('formatter', { script: true, displayValue: '{{(row, col, val, i) => val}}' }),
    ],
    devProps: (props, { children }) => ({
      key: ({ ...children }, uid()), // fix: enable v-slots does not update
      'lcd-label': `cell`,
      labelClassName: `${props.labelClassName || ''} lcd-id:${props._id}`,
    }),
    getEl({ id, parent$ }) {
      return parent$.el.querySelector(`.el-table__header th.lcd-id\\:${id}`)
    },
    getScopeIndex(node, vars) {
      return node.vSlotName == 'default' ? (node.data.vSlot?.[0] == '{' ? vars.$index : vars[node.data.vSlot].$index) : 0
    }
    // getRect({ id, parent$ }) {
    //   return [...parent$.el.querySelectorAll(`.lcd-id\\:${id}`)]
    // }
  },

  {
    is: 'ElStatistic',
    label: 'statistic',
    category: '数据展示',
    props: [
      str('title'),
      num('value'),
      num('precision'),
      str('prefix'),
      str('suffix'),
      str('decimal-separator', { displayValue: '.' }),
      str('group-separator', { displayValue: ',' }),
    ],
    defaultProps: () => ({
      title: 'Daily active users',
      value: 268500
    })
  },

  {
    is: 'ElTag',
    label: 'tag',
    category: '数据展示',
    props: [
      str(['text', 'children']),
      radios('effect', ['dark', 'light']),
      radios('size', SIZES),
      radios('type', [['—'], 'success', 'info', 'warning', 'danger']),
      bool(['border', 'hit']),
      color(['bg', 'color']),
      bool('round'),
    ],
    defaultProps: () => ({
      children: 'Tag',
    }),
  },

  {
    is: 'ElProgress',
    label: 'progress',
    category: '数据展示',
    vSlots: ['default'],
    props: [
      num(['value', 'percentage']),
      num('stroke-width', 6),
      radios('type', [['line'], 'circle', 'dashboard']),
      bool('text-inside'),
      color('color'),
    ],
    defaultProps: () => ({
      percentage: 50,
      format: '{{v => `${v}%`}}'
    })
  },
  

  {
    is: 'ElPagination',
    label: 'pagination',
    category: '数据展示',
    props: [
      vmodel('current-page'),
      vmodel('page-size'),
      num('total'),
      bool('background'),
      radios('size', SIZES),
      checkboxs('layout', ['sizes', 'prev', 'pager', 'next', 'jumper', 'total'], { get: v => v.split(','), set: v => v.join(',') }),
      bool('disabled'),
    ],
    defaultProps: () => ({
      layout: 'prev,pager,next,jumper,total',
      total: 0
    })
  },
  
  {
    is: 'ElSkeleton',
    label: 'skeleton',
    category: '数据展示',
    props: [
      num('rows', 3),
      bool('animated')
    ],
    defaultProps: () => ({
      animated: true
    })
  },

  {
    is: 'ElAlert',
    label: 'alert',
    category: '反馈组件',
    vSlots: ['title', 'default'],
    props: [
      str('title'),
      str('description'),
      bool('show-icon'),
      bool('center'),
      radios('type', ['success', 'warning', 'info', 'error'])
    ],
    defaultProps: () => ({
      type: 'success',
      showIcon: true,
      children: {
        title: { children: [Text('Success alert')] },
        default: { children: [Text('More text description')] },
      }
    })
  },

  {
    is: 'ElDrawer',
    label: 'drawer',
    category: '反馈组件',
    drag: { to: ['Page', 'ElDrawer', 'ElDialog'] },
    vSlots: ['header', 'footer'],
    props: [
      vmodel(),
      str('size', { displayValue: '30%' }),
      radios('direction', [['rtl'], 'ltr', 'ttb', 'btt']),
      bool('with-header', true),
      bool('destroy-on-close'),
      bool('close-on-click-modal'),
    ],
    defaultProps: () => ({
      modelValue: true,
      destroyOnClose: true,
      children: []
    }),
    purify: () => ({
      modelValue: void 0
    }),
    getEl({ ref }) {
      return unrefElement(ref)?.nextSibling.querySelector('.el-drawer')
    }
  },

  {
    is: 'ElTooltip',
    label: 'tooltip',
    category: '反馈组件',
    vSlots: ['content'],
    props: [
      str('conten'),
      radios('effect', ['dark', 'light']),
      radios('trigger', ['hover', 'click', 'focus']),
      num('offset'),
    ],
    defaultProps: () => ({
      children: {
        content: { children: [Text('content')] },
        default: { children: [Text('text')] }
      }
    }),
    devProps: (props, { children$ }) => ({
      is: (props, { slots }) => h('div', { style: 'display: contents' }, h(resolveDynamicComponent('ElTooltip'), props, slots)),
      'lcd-drag': children$.length ? { from: [] } : void 0
    }),
    getRect({ el }) {
      return el ? mergeRects(el.children) : void 0
    }
  },

  {
    is: 'ElDivider',
    label: 'divider',
    props: [
      str(['text', 'children']),
      radios('direction', [['horizontal'], 'vertical']),
      radios('border-style', [['solid'], 'dashed']),
      radios('content-position', ['left', 'right', 'center']),
    ],
  }
]