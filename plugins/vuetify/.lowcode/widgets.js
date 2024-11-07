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
    is: 'v-expansion-panels',
    label: 'expansion-panels',
    drag: { from: ['v-expansion-panels'] },
    props: [
      vmodel(),
      radios('variant', [['—', void 0], 'accordion', 'inset', 'popout']),
      color('bg-color'),
      bool('disabled'),
      bool('eager'),
      nool('focusable'),
      nool('hide-actions'),
      ripple
    ],
    defaultProps: () => ({
      multiple: true,
      children: []
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
    defaultProps: () => ({
      children: [
        { is: 'v-expansion-panel-title', children: [Text('Item')] },
        { is: 'v-expansion-panel-text', children: [Text('Text')] }
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
    devProps: () => ({ 'lcd-selectable': true })
  },

  {
    is: 'v-expansion-text',
    hidden: true,
    props: [],
    defaultProps: () => ({
      children: [Text('Text')]
    }),
    devProps: () => ({ 'lcd-selectable': true })
  }
]
