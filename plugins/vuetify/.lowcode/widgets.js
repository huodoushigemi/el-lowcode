const ICONS = ['search', 'arrow_forward', 'downloading', 'attach_file']
const SIZES = ['normal', 'small', 'large']

const str = (lp, extra) => ({ lp, displayValue: '', ...extra })
const options = (lp, options, displayValue, extra) => ({ lp, options, displayValue, ...extra })
const radios = (lp, options, displayValue, extra) => ({ lp, type: 'radio-group', options, displayValue, ...extra, el: { type: 'button', ...extra?.el } })
const checkboxs = (lp, options, displayValue, extra) => ({ lp, type: 'checkbox-group', options, displayValue, ...extra, el: { type: 'button', ...extra?.el } })
const bool = (lp, displayValue = false) => ({ lp, type: 'switch', displayValue })
const num = (lp, displayValue = null, extra) => ({ lp, type: 'input-number', displayValue, ...extra })
const icon = lp => ({ lp, options: ICONS })
const color = lp => ({ lp, type: 'color-picker' })

const grid2 = children => ({ is: 'div', class: 'grid grid-cols-2 gap-x-12', children })

const ripple = bool('ripple')

const vmodel = (k = 'modelValue', evt = 'onUpdate:modelValue') => ({
  lp: 'v-model',
  get: (v, model) => {
    const k1 = model[k]?.match(/\{\{(.+)\}\}/)?.[1]
    return k1 && (model[evt]?.includes(`${k1} = e.target.${k}`)) ? k1 : void 0
  },
  set: () => (void 0),
  out: (v, model) => {
    return v
      ? { [k]: `{{${v}}}`, [evt]: `{{(e) => {\n  ${v} = e.target.${k}\n}}}` }
      : { [k]: void 0, [evt]: void 0 }
  }
})
const Text = (s, extra) => ({ is: 'span', children: s, ...extra })

const OptionsInput = (lp, props, child, fn) => ({ lp, el: { is: 'OptionsInput', props, new: (i) => ({ is: child, ...fn?.(i) }) } })

export const widgets = [
  {
    is: 'v-btn',
    label: 'button',
    props: [],
  },

  {
    is: 'v-icon',
    label: 'icon',
    props: [],
  },

  {
    is: 'v-expansion-panels',
    label: 'expands',
    drag: { from: ['v-expansion-panel'] },
    props: [
      vmodel(),
      radios('variant', [['—', void 0], 'accordion', 'inset', 'popout']),
      color('bg-color'),
      bool('disabled'),
      bool('eager'),
      bool('focusable'),
      bool('hide-actions'),
      ripple
    ],
    defaultProps: (ctx) => ({
      // multiple: true,
      children: [
        ctx.newProps('v-expansion-panel'),
      ]
    })
  },

  {
    is: 'v-expansion-panel',
    drag: { to: ['v-expansion-panels'], from: [] },
    hidden: true,
    props: [
      str('value'),
      bool('disabled'),
      bool('eager'),
    ],
    defaultProps: (ctx) => ({
      children: [
        ctx.newProps('v-expansion-panel-title'),
        ctx.newProps('v-expansion-panel-text')
      ]
    })
  },

  {
    is: 'v-expansion-panel-title',
    hidden: true,
    vSlots: [['default', ['expanded']], ['actions', ['expanded']]],
    props: [],
    defaultProps: () => ({
      children: {
        default: { scope: '$panel', children: [Text('Item')] },
      },
    }),
    devProps: () => ({ 'lcd-selectable': false })
  },

  {
    is: 'v-expansion-panel-text',
    hidden: true,
    props: [],
    defaultProps: () => ({
      children: []
    }),
    devProps: () => ({ 'lcd-selectable': false })
  },

  {
    is: 'v-layout',
    label: 'layout',
    defaultProps: (ctx) => ({
      style: { height: '100%' },
      children: [
        ctx.newProps('v-app-bar'),
        ctx.newProps('v-main'),
        // ctx.newProps('v-footer')
      ]
    }),
    devProps: () => ({ 'lcd-selectable': false })
  },

  {
    is: 'v-main',
    label: 'main',
    defaultProps: (ctx) => ({
      children: []
    }),
    devProps: () => ({ 'lcd-selectable': false })
  },

  {
    is: 'v-app-bar',
    label: 'appbar',
    props: [
      bool('absolute'),
      bool('border'),
      bool('collapse'),
      radios('density', [['_'], 'prominent', 'comfortable', 'compact']),
      num('elevation'),
      num('extension-height', 48),
      num('height', 64),
      bool('flat'),
      bool('floating'),
      checkboxs('scroll-behavior', ['hide', 'collapse', 'elevate', 'fade-image', 'inverted'], [], { get: v => v?.split(' '), set: v => v.join(' ') }),
      num('scroll-threshold', 0),
    ],
    defaultProps: () => ({
      elevation: 8,
      children: {
        prepend: { children: [{ is: 'v-btn', icon: 'mdi-menu' }] },
        title: { children: [Text('Title')] },
        append: { children: [{ is: 'v-btn', icon: 'mdi-dots-vertical' }] },
        extension: { children: [] }
      }
    })
  }
]
