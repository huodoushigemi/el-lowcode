const ICONS = ['search', 'arrow_forward', 'downloading', 'attach_file']
const SIZES = ['normal', 'small', 'large']
const COLORS = [['—'], 'primary', 'success', 'warning', 'error']

const str = (lp, extra) => ({ lp, displayValue: '', ...extra })
const options = (lp, options, displayValue, extra) => ({ lp, options, displayValue, ...extra })
const radios = (lp, options, displayValue, extra) => ({ lp, type: 'radio-group', options, displayValue, ...extra, el: { type: 'button', ...extra?.el } })
const checkboxs = (lp, options, displayValue, extra) => ({ lp, type: 'checkbox-group', options, displayValue, ...extra, el: { type: 'button', ...extra?.el } })
const bool = (lp, displayValue = false, extra) => ({ lp, type: 'switch', displayValue, ...extra })
const num = (lp, displayValue, extra) => ({ lp, type: 'input-number', displayValue, set: v => v == null ? void 0 : v, ...extra })
const icon = lp => ({ lp, options: ICONS })
const color = lp => ({ lp, type: 'color-picker' })

const grid2 = children => ({ is: 'div', class: 'grid grid-cols-2 gap-x-12', children })

const ripple = bool('ripple')
const _href = { is: 'div', class: 'grid gap-x-12', style: 'grid-template-columns: 70% 1fr', children: [{ lp: 'href' }, { lp: ['new-tab', 'target'], script: false, type: 'switch', get: v => v == '_blank', set: v => v ? '_blank' : void 0 }] }
// const _color = { is: 'div', children: [radios('color', COLORS), radios('base-color', COLORS)] }

const vmodel = (k = 'modelValue', evt = `onUpdate:${k}`) => ({
  lp: `v-model${k == 'modelValue' ? '' : `:${k}`}`,
  script: false,
  get: (v, model) => {
    const k1 = model[k]?.match(/\{\{(.+)\}\}/)?.[1]
    return k1 && (model[evt]?.includes(`${k1} = v`)) ? k1 : void 0
  },
  set: () => (void 0),
  out: (v, model) => {
    return v
      ? { [k]: `{{${v}}}`, [evt]: `{{(v) => {\n  ${v} = v\n}}}` }
      : { [k]: void 0, [evt]: void 0 }
  }
})
const Text = (s, extra) => ({ is: 'span', children: s, ...extra })

const optionsInput = (lp, props, fn) => ({ lp, el: { is: 'OptionsInput', props, new: (i) => ({ ...fn?.(i) }) } })

export const widgets = [
  {
    is: 'v-btn',
    label: 'button',
    props: [
      radios('color', COLORS),
      bool('block'),
      bool('border'),
      bool('disabled'),
      bool('loading'),
      bool('icon'),
      radios('rounded', [['—'], 'lg', 'xl']),
      radios('size', [['xs', 'x-small'], ['sm', 'small'], ['md'], ['lg', 'x-large']]),
      radios('variant', ['text', ['elevated'], 'tonal', 'outlined', 'plain']),
      num('elevation'),
      _href,
    ],
    defaultProps: (ctx) => ({
      children: [Text('BUTTON')]
    })
  },

  {
    is: 'v-icon',
    label: 'icon',
    props: [
      str('icon')
    ],
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
    hidden: true,
    defaultProps: (ctx) => ({
      children: []
    }),
    devProps: () => ({ 'lcd-selectable': false })
  },

  {
    is: 'v-app-bar',
    label: 'appbar',
    vSlots: ['prepend', 'append', 'title', 'extension'],
    props: [
      bool('border'),
      bool('collapse'),
      radios('rounded', [['—'], 'lg', 'xl']),
      radios('density', [['—'], 'prominent', 'comfortable', 'compact']),
      num('elevation'),
      grid2([num('height', 64), num('extension-height', 48)]),
      // bool('absolute'),
      // bool('flat'),
      // bool('floating'),
      checkboxs('scroll-behavior', ['hide', 'collapse', 'elevate', 'fade-image', 'inverted'], [], { get: v => v?.split(' '), set: v => v.join(' ') }),
      num('scroll-threshold', 0),
    ],
    defaultProps: () => ({
      elevation: 8,
      children: {
        prepend: { children: [{ is: 'v-btn', icon: true, children: [{ is: 'uno-icon', src: 'https://api.iconify.design/mdi:menu.svg', style: { width: '24px', height: '24px' } }] }] },
        title: { children: [Text('Title')] },
        append: { children: [{ is: 'v-btn', icon: true, children: [{ is: 'uno-icon', src: 'https://api.iconify.design/design/mdi:dots-vertical.svg', style: { width: '24px', height: '24px' } }] }] },
        extension: { children: [] }
      }
    })
  },

  {
    is: 'v-list',
    label: 'list',
    drag: { from: ['v-list-item'] },
    // vSlots: ['header', 'subheader', 'prepend', 'append'],
    props: [
      grid2([vmodel('selected'), bool('selectable')]),
      radios('color', COLORS),
      radios('base-color', COLORS),
      radios('bg-color', COLORS),
      bool('border'),
      radios('density', [['—', void 0], 'comfortable', 'compact']),
      bool('disabled'),
      radios('lines', [['false', false], ['one'], 'two', 'three']),
      bool('mandatory'),
      bool('nav'),
      // opened
      // open-strategy
      radios('rounded', [['—'], 'lg', 'xl']),
      // bool('activatable'),
      // activated
      // select-strategy
      // bool('slim'),
      radios('variant', [['—'], 'flat', 'elevated', 'tonal', 'outlined', 'plain']),
    ],
    defaultProps: (ctx) => ({
      valueComparator: `{{(a, b) => a == b}}`,
      children: [
        ctx.newProps('v-list-item'),
        ctx.newProps('v-list-item'),
        ctx.newProps('v-list-item'),
      ]
    })
  },

  {
    is: 'v-list-item',
    label: 'list-item',
    vSlots: ['prepend', 'append', 'title'],
    props: [
      str('value'),
      bool('active'),
      radios('color', COLORS),
      radios('base-color', COLORS),
      radios('bg-color', COLORS),
      bool('border'),
      radios('density', [['—', void 0], 'comfortable', 'compact']),
      bool('disabled'),
      _href,
      radios('lines', [['false'], 'one', 'two', 'three']),
      radios('rounded', [['—'], 'lg', 'xl']),
      radios('variant', [['—'], 'flat', 'elevated', 'tonal', 'outlined', 'plain']),
    ],
    defaultProps: (ctx) => ({
      children: {
        default: { children: [Text('Item')] },
        prepend: { children: [{ is: 'v-icon', icon: 'mdi-clock' }] },
      }
    })
  },

  {
    is: 'v-navigation-drawer',
    label: 'drawer',
    vSlots: ['prepend', 'append'],
    props: [
      vmodel(),
      bool('border'),
      radios('color', COLORS),
      str('image'),
      radios('location', ['top', 'bottom', ['left'], 'right']),
      bool('permanent'),
      bool('temporary'),
      grid2([bool('rail'), bool('expand-on-hover')]),
      bool(['close-on-click-modal', 'persistent']),
      // num('rail-width', 30),
      // bool('scrim', true),
      radios('rounded', [['—'], 'lg', 'xl']),
    ],
    defaultProps: () => ({
      children: {
        default: { children: [Text('Content')] },
        append: { children: [{ is: 'v-btn', block: true, children: [Text('Logout')] }] },
      }
    })
  },

  {
    is: 'v-text-field',
    label: 'input',
    vSlots: ['prepend-inner', 'append-inner'],
    props: [
      vmodel(),
      options('type', ['text', 'number', 'password', 'url', 'email', 'search', 'tel', 'date', 'datetime-local', 'month', 'time', 'week'], 'text'),
      radios('variant', [['filled'], 'outlined', 'underlined', 'solo', 'solo-filled']),
      bool('autofocus'),
      bool('clearable'),
      bool('disabled'),
      num('counter'),
      grid2([str('label'), str('placeholder')]),
      grid2([str('prefix'), str('suffix')]),
      grid2([str('hint'), str('messages')]),
      radios('rounded', [['—'], 'lg', 'xl']),
      radios('density', [['—'], 'comfortable', 'compact']),
      // todo rules
    ],
    defaultProps: () => ({
      label: 'Label',
      clearable: true,
    })
  },

  {
    is: 'v-select',
    label: 'select',
    vSlots: ['prepend-inner', 'append-inner'],
    props: [
      vmodel(),
      radios('variant', [['filled'], 'outlined', 'underlined', 'solo', 'solo-filled']),
      bool('autofocus'),
      bool('clearable'),
      bool('disabled'),
      bool('chips'),
      bool('multiple'),
      // num('counter'),
      grid2([str('label'), str('placeholder')]),
      grid2([str('prefix'), str('suffix')]),
      grid2([str('hint'), str('messages')]),
      radios('rounded', [['—'], 'lg', 'xl']),
      radios('density', [['—'], 'comfortable', 'compact']),
      optionsInput('items', { label: 'title' }),
      // todo rules
    ],
    defaultProps: () => ({
      label: 'Label',
      clearable: true,
      valueComparator: `{{(a, b) => a == b}}`,
      items: [
        { title: 'Florida', value: 'FL' },
        { title: 'Georgia', value: 'GA' },
        { title: 'Nebraska', value: 'NE' },
        { title: 'California', value: 'CA' },
        { title: 'New York', value: 'NY' },
      ]
    })
  },

  {
    is: 'v-date-input',
    label: 'date-input',
    vSlots: ['prepend-inner', 'append-inner'],
    props: [
      vmodel(),
      radios('variant', [['filled'], 'outlined', 'underlined', 'solo', 'solo-filled']),
      bool('autofocus'),
      bool('clearable'),
      bool('disabled'),
      // bool('landscape'),
      radios('multiple', [['false'], ['true', true], 'range']),
      grid2([str('label'), str('placeholder')]),
      grid2([str('prefix'), str('suffix')]),
      grid2([str('hint'), str('messages')]),
      // grid2([num('min', 0), num('max', 100)]),
      grid2([str('cancel-text'), str('ok-text')]),
      // header
      // hide-weekdays
      // show-week
      // hide-header
      // month
      radios('view-mode', [['month'], 'months', 'year']),
      radios('rounded', [['—'], 'lg', 'xl']),
      radios('density', [['—'], 'comfortable', 'compact']),
      { lp: 'allowed-dates', script: true },
      // todo rules
    ],
    defaultProps: () => ({
      label: 'Label',
      clearable: true,
      prependIcon: '',
    })
  },

  {
    is: 'v-checkbox',
    label: 'checkbox',
    vSlots: ['label'],
    props: [
      vmodel(),
      str('value'),
      radios('color', COLORS),
      bool('disabled'),
      radios('density', [['—', void 0], 'comfortable', 'compact']),
      bool('indeterminate'),
      grid2([str('hint'), str('messages')]),
      grid2([str('true-value'), str('false-value')])
      // todo rules
    ],
    defaultProps: () => ({
      hideDetails: 'auto',
      valueComparator: `{{(a, b) => a == b}}`,
      children: {
        label: { children: [Text('Checkbox')] }
      }
    })
  },

  {
    is: 'v-radio-group',
    label: 'radios',
    drag: { from: ['v-radio'] },
    vSlots: ['label'],
    props: [
      vmodel(),
      bool('inline'),
      radios('color', COLORS),
      bool('disabled'),
      radios('density', [['—', void 0], 'comfortable', 'compact']),
      grid2([str('hint'), str('messages')]),
      // todo rules
    ],
    defaultProps: (ctx) => ({
      hideDetails: 'auto',
      valueComparator: `{{(a, b) => a == b}}`,
      children: {
        label: { children: [Text('Checkbox')] },
        default: { children: [ctx.newProps('v-radio'), ctx.newProps('v-radio'), ctx.newProps('v-radio')] }
      }
    })
  },

  {
    is: 'v-radio',
    label: 'radios',
    drag: { from: ['v-radio-group'] },
    vSlots: ['label'],
    hidden: true,
    props: [
      str('value'),
      radios('color', COLORS),
      bool('disabled'),
    ],
    defaultProps: () => ({
      hideDetails: 'auto',
      valueComparator: `{{(a, b) => a == b}}`,
      children: {
        label: { children: [Text('Radio')] }
      }
    })
  },

  {
    is: 'v-switch',
    label: 'switch',
    vSlots: ['label'],
    props: [
      vmodel(),
      // bool('inline'),
      bool('inset'),
      radios('color', COLORS),
      bool('disabled'),
      radios('density', [['—', void 0], 'comfortable', 'compact']),
      grid2([str('hint'), str('messages')]),
      grid2([str('true-value'), str('false-value')])
      // todo rules
    ],
    defaultProps: () => ({
      color: 'primary',
      hideDetails: 'auto',
      valueComparator: `{{(a, b) => a == b}}`,
      children: {
        label: { children: [Text('Switch')] }
      }
    })
  },

  {
    is: 'v-slider',
    label: 'slider',
    vSlots: ['label', 'append', 'append'],
    props: props => [
      vmodel(),
      bool('range', void 0, { get: () => props.is == 'v-range-slider', set: () => void 0, out: v => ({ is: v ? 'v-range-slider' : 'v-slider' }) }),
      radios('color', COLORS),
      radios('direction', [['horizontal'], 'vertical']),
      bool('disabled'),
      grid2([str('hint'), str('messages')]),
      grid2([num('min', 0), num('max', 100)]),
      grid2([
        num('step'), bool('show-ticks', void 0, { get: v => v == 'always', set: v => v ? 'always' : void 0 }),
        num('tick-size', 2), str('ticks', { script: true, displayValue: '{{{}}}' })
      ]),
      // todo rules
    ],
    defaultProps: () => ({
      color: 'primary',
      step: 1,
      thumbLabel: true,
      hideDetails: 'auto',
      valueComparator: `{{(a, b) => a == b}}`,
      children: {
        label: { children: [Text('Slider')] }
      }
    })
  },

  {
    is: 'v-range-slider',
    label: 'slider',
    vSlots: ['label', 'append', 'append'],
    hidden: true,
    props: props => [
      vmodel(),
      bool('range', void 0, { get: () => props.is == 'v-range-slider', set: () => void 0, out: v => ({ is: v ? 'v-range-slider' : 'v-slider' }) }),
      radios('color', COLORS),
      radios('direction', [['horizontal'], 'vertical']),
      bool('disabled'),
      grid2([str('hint'), str('messages')]),
      grid2([num('min', 0), num('max', 100)]),
      grid2([
        num('step'), bool('show-ticks', void 0, { get: v => v == 'always', set: v => v ? 'always' : void 0 }),
        num('tick-size', 2), str('ticks', { script: true, displayValue: '{{{}}}' })
      ]),
      // todo rules
    ],
    defaultProps: () => ({
      color: 'primary',
      step: 1,
      thumbLabel: true,
      hideDetails: 'auto',
      valueComparator: `{{(a, b) => a == b}}`,
      children: {
        label: { children: [Text('Slider')] }
      }
    })
  },

  {
    is: 'v-rating',
    label: 'rate',
    vSlots: ['item', 'item-label'],
    props: [
      vmodel(),
      radios('active-color', COLORS),
      bool('clearable'),
      bool('disabled'),
      radios('density', [['—', void 0], 'comfortable', 'compact']),
      bool('half-increments'),
      bool('hover'),
      num('length', 5),
    ],
    defaultProps: () => ({
      activeColor: 'primary',
      // children: 
    })
  },
]
