import { camelize } from '@vue/shared'

const ICONS = ['search', 'arrow_forward', 'downloading', 'attach_file']
const SIZES = ['normal', 'small', 'large']
const COLORS = [['—'], 'primary', 'success', 'warning', 'error']
// const LOCATIONS = [['TL', 'top start'], ['TR', 'top end'], ['BL', 'bottom start'], ['BR', 'bottom end']]

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
const _cancelable = bool(['cancelable', 'mandatory'], false, { get: v => !v, set: v => !v })

function vmodel(k, extra) {
  const label = k ? `v-model : ${k}` : `v-model`
  k = k ? camelize(k) : 'modelValue'
  return { lp: [label, `vModels.${k}.0`], out: (v, model) => (v || (delete model.vModels[k]), {}), script: false, ...extra, el: { spellcheck: false } }
}

const Text = (s, extra) => ({ is: 'span', children: s, ...extra })

const optionsInput = (lp, props, fn) => ({ lp, el: { is: 'OptionsInput', props, new: (i) => ({ ...fn?.(i) }) } })

export const widgets = [
  {
    is: 'v-layout',
    label: 'layout',
    category: 'Navigation',
    defaultProps: (ctx) => ({
      style: { height: '100%' },
      children: [
        ctx.newProps('v-app-bar'),
        ctx.newProps('v-main'),
        ctx.newProps('v-bottom-navigation')
      ]
    }),
    devProps: () => ({ 'lcd-selectable': false })
  },

  {
    is: 'v-main',
    label: 'main',
    category: 'Navigation',
    hidden: true,
    defaultProps: (ctx) => ({
      children: []
    }),
    devProps: () => ({ 'lcd-selectable': false })
  },

  {
    is: 'v-app-bar',
    label: 'appbar',
    category: 'Navigation',
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
    is: 'v-bottom-navigation',
    label: 'tabbar',
    category: 'Navigation',
    props: [
      vmodel(),
      bool('active', true),
      radios('color', COLORS),
      bool('border'),
      radios('density', [['—', void 0], 'comfortable', 'compact']),
      bool('disabled'),
      num('elevation'),
      // bool('grow'),
      // num('height', 56),
      radios('mode', [['—'], 'shift']),
      radios('rounded', [['—'], 'lg', 'xl']),
    ],
    defaultProps: () => ({
      color: 'primary',
      mandatory: true,
      children: [
        { is: 'v-btn', style: { flex: '1 0' }, children: [{ is: 'v-icon', icon: 'mdi-widgets' }, Text('Components')] },
        { is: 'v-btn', style: { flex: '1 0' }, children: [{ is: 'v-icon', icon: 'mdi-file-document-multiple' }, Text('Forms')] },
        { is: 'v-btn', style: { flex: '1 0' }, children: [{ is: 'v-icon', icon: 'mdi-apple-icloud' }, Text('Api')] },
      ]
    })
  },

  {
    is: 'v-navigation-drawer',
    label: 'drawer',
    category: 'Navigation',
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
    is: 'v-tabs',
    label: 'tabs',
    category: 'Navigation',
    drag: { from: 'v-tab' },
    props: [
      vmodel(),
      radios('align-tabs', ['title', ['start'], 'center', 'end']),
      radios('color', COLORS),
      radios('bg-color', COLORS),
      radios('density', [['—', void 0], 'comfortable', 'compact']),
      radios('direction', [['horizontal'], 'vertical']),
      bool('center-active'),
      bool('grow'),
      bool('disabled'),
      grid2([bool('hide-slider'), radios('slider-color', COLORS)]),
      grid2([bool('multiple'), num(['max-count', 'max'])]),
      // bool('next-icon'),
      // bool('prev-icon'),
      bool('show-arrows'),
    ],
    defaultProps: () => ({
      children: [
        { is: 'v-tab', children: [Text('Tab 1')] },
        { is: 'v-tab', children: [Text('Tab 2')] },
        { is: 'v-tab', children: [Text('Tab 3')] },
      ]
    })
  },

  {
    is: 'v-tab',
    label: 'tab',
    category: 'Navigation',
    hidden: true,
    drag: { to: ['v-tabs'] },
    vSlots: ['prepend', 'append'],
    props: [
      str('value'),
      radios('variant', ['flat', ['text'], 'elevated', 'tonal', 'outlined', 'plain']),
      radios('color', COLORS),
      bool('disabled'),
      bool('fixed'),
      _href,
      grid2([bool('hide-slider'), radios('slider-color', COLORS)]),
    ],
    defaultProps: () => ({
      children: [Text('Tab')]
    })
  },
  
  {
    is: 'v-tabs-window',
    label: 'tabs-window',
    category: 'Navigation',
    drag: { from: ['v-tabs-window-item'] },
    props: [
      vmodel(),
    ],
    defaultProps: (ctx) => ({
      style: { padding: '16px' },
      children: [ctx.newProps('v-tabs-window-item'), ctx.newProps('v-tabs-window-item'), ctx.newProps('v-tabs-window-item')]
    })
  },

  {
    is: 'v-tabs-window-item',
    label: 'tabs-window-item',
    category: 'Navigation',
    hidden: true,
    drag: { to: ['v-tabs-window'] },
    props: [
      str('value')
    ],
    defaultProps: () => ({
      children: [{ is: 'h3', children: 'Content' } ],
    })
  },

  {
    is: 'v-card',
    label: 'card',
    category: 'Container',
    vSlots: ['prepend', 'append', 'title', 'subtitle', 'actions'],
    props: [
      radios('variant', ['flat', 'text', ['elevated'], 'tonal', 'outlined', 'plain']),
      radios('color', COLORS),
      bool('border'),
      radios('density', [['—'], 'comfortable', 'compact']),
      bool('disabled'),
      bool('loading'),
      str('image'),
      radios('rounded', [['—'], 'lg', 'xl']),
      num('elevation'),
      _href,
    ],
    defaultProps: () => ({
      children: [
        { is: 'v-card-item', children: [
          { is: 'v-card-title', children: [Text('Card Title')] },
          { is: 'v-card-subtitle', children: [Text('Card subtitle secondary text')] },
        ] },
        { is: 'v-card-text', children: [Text('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.')] },
        { is: 'v-card-actions', children: [{ is: 'v-btn', color: 'primary', children: [Text('More')] }] },
      ]
    })
  },
  { is: 'v-card-item', hidden: true },
  { is: 'v-card-title', hidden: true },
  { is: 'v-card-subtitle', hidden: true },
  { is: 'v-card-text', hidden: true },
  { is: 'v-card-actions', hidden: true },

  {
    is: 'v-btn',
    label: 'button',
    category: 'Container',
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
      children: [Text('Button')]
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
    is: 'v-chip-group',
    label: 'chip-group',
    darg: { from: ['v-chip'] },
    props: [
      vmodel(),
      radios('variant', ['flat', 'text', 'elevated', ['tonal'], 'outlined', 'plain']),
      radios('color', COLORS),
      // radios('density', [['—', void 0], 'comfortable', 'compact']),
      bool(['wrap', 'column']),
      bool('show-arrows'),
      bool('disabled'),
      bool('filter'),
      _cancelable,
      grid2([bool('multiple'), num(['max-count', 'max'])]),
    ],
    defaultProps: (ctx) => ({
      color: 'primary',
      valueComparator: `{{(a, b) => a == b}}`,
      children: [
        { ...ctx.newProps('v-chip'), value: '1' },
        { ...ctx.newProps('v-chip'), value: '2' },
        { ...ctx.newProps('v-chip'), value: '3' },
      ]
    })
  },
  
  {
    is: 'v-chip',
    label: 'chip',
    vSlots: ['prepend', 'append'],
    props: [
      str('value'),
      radios('variant', ['flat', 'text', 'elevated', ['tonal'], 'outlined', 'plain']),
      radios('color', COLORS),
      bool('border'),
      bool('label'),
      bool('closable'),
      radios('density', [['—', void 0], 'comfortable', 'compact']),
      bool('disabled'),
      bool('filter'),
      _href,
      radios('rounded', [['—'], 'lg', 'xl']),
    ],
    defaultProps: () => ({
      children: [Text('Chip')]
    })
  },

  {
    is: 'v-expansion-panels',
    label: 'expands',
    category: 'Container',
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
    category: 'Container',
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
    category: 'Container',
    hidden: true,
    // vSlots: [['default', ['expanded']], ['actions', ['expanded']]],
    vSlots: ['actions'],
    props: [],
    defaultProps: () => ({
      children: [Text('Item')],
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
    is: 'v-list',
    label: 'list',
    category: 'Container',
    // drag: { from: ['v-list-item'] },
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
    category: 'Container',
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
    is: 'v-carousel',
    label: 'carousel',
    category: 'Container',
    vSlots: ['prev', 'next'],
    props: [
      vmodel(),
      // radios('color', COLORS),
      bool('continuous', true),
      radios('direction', [['horizontal'], 'vertical']),
      bool('disabled'),
      grid2([bool('hide-delimiters'), bool(['hide-delimiter-bg', 'hide-delimiter-background'])]),
      grid2([bool(['autoplay', 'cycle']), num('interval', 6000)]),
      radios('progress', COLORS),
      radios('show-arrows', [['true'], ['false', false], 'hover']),
    ],
    defaultProps: () => ({
      children: [
        { is: 'v-carousel-item', children: [{ is: 'img', src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg', style: { width: '100%', height: '100%', objectFit: 'cover' } }] },
        { is: 'v-carousel-item', children: [{ is: 'img', src: 'https://cdn.vuetifyjs.com/images/carousel/bird.jpg', style: { width: '100%', height: '100%', objectFit: 'cover' } }] },
        { is: 'v-carousel-item', children: [{ is: 'img', src: 'https://cdn.vuetifyjs.com/images/cards/docks.jpg', style: { width: '100%', height: '100%', objectFit: 'cover' } }] },
      ]
    })
  },

  {
    is: 'v-carousel-item',
    category: 'Container',
    hidden: true,
    props: [
      str('value'),
    ],
    defaultProps: () => ({
      children: [{ is: 'img', src: 'https://cdn.vuetifyjs.com/images/carousel/squirrel.jpg', style: { width: '100%', height: '100%', objectFit: 'cover' } }]
    })
  },

  {
    is: 'v-text-field',
    label: 'input',
    category: 'Form',
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
    category: 'Form',
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
    category: 'Form',
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
    category: 'Form',
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
    category: 'Form',
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
    category: 'Form',
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
    category: 'Form',
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
    category: 'Form',
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
    category: 'Form',
    hidden: true,
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
    is: 'v-rating',
    label: 'rate',
    category: 'Form',
    vSlots: ['item', 'item-label'],
    props: [
      vmodel(),
      radios('active-color', COLORS),
      bool('hover'),
      bool('clearable'),
      bool('disabled'),
      radios('density', [['—', void 0], 'comfortable', 'compact']),
      bool('half-increments'),
      bool('hover'),
      num('length', 5),
    ],
    defaultProps: () => ({
      activeColor: 'primary',
      hover: true,
      // children: 
    })
  },

  {
    is: 'v-otp-input',
    label: 'otp-input',
    category: 'Form',
    vSlots: ['item', 'item-label'],
    props: [
      vmodel(),
      bool('autofocus'),
      radios('variant', [['outlined'], 'underlined', 'filled', 'solo', 'solo-filled']),
      radios('color', COLORS),
      radios('base-color', COLORS),
      num('length', 6),
      str('placeholder'),
      bool('disabled'),
      radios('type', [['number'], 'text', 'password']),
      // todo rules
    ],
    defaultProps: () => ({

    })
  },

  {
    is: 'v-progress-linear',
    label: 'progress',
    category: 'Feedback',
    vSlots: ['default'],
    props: [
      vmodel(),
      radios('color', COLORS),
      // radios('bg-color', COLORS),
      bool('striped'),
      bool('indeterminate'),
      num('max', 100),
      radios('rounded', [['—'], 'lg', 'xl']),
    ]
  },

  {
    is: 'v-alert',
    label: 'alert',
    category: 'Feedback',
    vSlots: ['prepend', 'append', 'title'],
    props: [
      radios('type', [['—'], 'success', 'info', 'warning', 'error']),
      radios('variant', ['text', ['flat'], 'elevated', 'tonal', 'outlined', 'plain']),
      radios('color', COLORS),
      radios('border', [['—'], 'top', 'start', 'bottom', 'end']),
      bool('closable'),
      radios('density', [['—'], 'comfortable', 'compact']),
      radios('rounded', [['—'], 'lg', 'xl']),
    ],
    defaultProps: () => ({
      type: 'success',
      children: {
        title: { children: [Text('Success alert')] },
        default: { children: [Text('More text description')] }
      }
    })
  },

  {
    is: 'v-timeline',
    label: 'timeline',
    category: 'Feedback',
    drag: { from: ['v-timeline-item'] },
    props: [
      radios('side', [['—'], 'end', 'start']),
      radios('density', [['—'], 'comfortable', 'compact']),
      radios('direction', ['horizontal', ['vertical']]),
      // radios('align', ['start', ['center']]),
      radios('dot-color', COLORS),
      bool('fill-dot'),
      
      radios('line-color', COLORS),
      num('line-inset'),
      num('line-thickness'),

    ],
    defaultProps: (ctx) => ({
      children: [
        ctx.newProps('v-timeline-item'),
        ctx.newProps('v-timeline-item'),
        ctx.newProps('v-timeline-item'),
      ]
    })
  },

  {
    is: 'v-timeline-item',
    label: 'timeline-item',
    category: 'Feedback',
    hidden: true,
    drag: { to: ['v-timeline'] },
    vSlots: ['icon', 'opposite'],
    props: [
      radios('dot-color', COLORS),
      bool('fill-dot'),
      num('line-inset'),
    ],
    defaultProps: (ctx) => ({
      children: []
    })
  },

  {
    is: 'v-tooltip',
    label: 'tooltip',
    category: 'Feedback',
    vSlots: ['activator'],
    props: [
      vmodel(),
      radios('location', ['start', ['end'], 'top', 'bottom'])
    ],
    defaultProps: () => ({
      children: {
        activator: { children: [{ is: 'v-btn', icon: true, children: [Text('G')] }] },
        default: { children: [Text('Tooltip')] }
      }
    }),
    devProps: () => ({
      'lcd-selectable': false
    })
  },

  {
    is: 'v-fab',
    label: 'fab',
    category: 'Feedback',
    props: [
      // radios('position', [['—'], 'fixed', 'absolute', 'sticky']),
      radios('variant', ['text', ['elevated'], 'tonal', 'outlined', 'plain']),
      checkboxs('location', ['start', 'end', 'top', 'bottom'], [], { get: v => v?.split(' '), set: v => v.join(' ') }),
      radios('color', COLORS),
      bool('absolute'),
      bool('offset'),
      bool('block'),
      bool('border'),
      bool('disabled'),
      bool('loading'),
      bool('icon'),
      radios('rounded', [['—'], 'lg', 'xl']),
      radios('size', [['xs', 'x-small'], ['sm', 'small'], ['md'], ['lg', 'x-large']]),
      num('elevation'), 
      _href,
    ],
    defaultProps: () => ({
      icon: true,
      children: [{ is: 'uno-icon', src: 'https://api.iconify.design/mdi:plus.svg', style: { width: '24px', height: '24px' } }]
    }),
  },

  {
    is: 'v-skeleton-loader',
    label: 'skeleton',
    category: 'Feedback',
    props: [
      options('type', ['card', 'card-avatar','image', 'text', 'sentences', 'paragraph', 'article', 'chip', 'table', 'ossein', 'actions'], [], { get: v => v?.split(','), set: v => v.filter(e => e).join(','), el: { multiple: true } }),
      radios('color', COLORS),
      num('elevation'),
    ],
    defaultProps: () => ({
      type: 'image,sentences'
    })
  },

  {
    is: 'v-badge',
    label: 'badge',
    category: 'Feedback',
    props: props => [
      grid2([str('content'), num('max')]),
      radios('color', COLORS),
      bool('dot'),
      bool('inline'),
      props.inline || grid2([num('offset-x'), num('offset-y')]),
      props.inline || radios('location', [['TL', 'top start'], ['TR', 'top end'], ['BL', 'bottom start'], ['BR', 'bottom end']], 'top end'),
    ],
    defaultProps: () => ({
      color: 'error',
      max: 99,
      content: 100,
      children: [
        { is: 'v-btn', icon: true, children: [{ is: 'uno-icon', src: 'https://api.iconify.design/mdi:message-outline.svg', style: { width: '24px', height: '24px' } }] }
      ]
    }),
    devProps: props => ({
      children: props.inline ? (props.children = void 0) : (props.children ??= [])
    })
  },

  {
    is: 'v-dialog',
    label: 'dialog',
    category: 'Feedback',
    vSlots: ['activator'],
    props: [
      vmodel(),
      bool('eager'),
      bool('fullscreen'),
      bool('persistent'),
      bool(['modal', 'scrim'])
    ],
    defaultProps: () => ({
      children: {
        activator: { children: [{ is: 'v-btn', children: [Text('Open Dialog')] }] },
        default: { children: [{ is: 'v-card', children: [
          { is: 'v-card-item', children: [
            { is: 'v-card-title', children: [Text('Dialog')] },
          ] },
          { is: 'v-card-text', children: [Text('Dialog Content')] },
          { is: 'v-card-actions', class: 'justify-end', children: [{ is: 'v-btn', color: 'primary', children: [Text('OK')] }] }
        ] }] }
      }
    })
  },
  
  {
    is: 'v-speed-dial',
    label: 'speed-dial',
    vSlots: ['activator'],
    props: [
      vmodel(),
      checkboxs('location', ['start', 'end', 'top', 'bottom'], [], { get: v => v?.split(' '), set: v => v.join(' ') }),
      options('transition', ['scale-transition', 'slide-x-transition', 'slide-y-transition', 'slide-x-reverse-transition', 'slide-y-reverse-transition']),
      bool('open-on-hover'),
      bool('disabled'),
    ],
    defaultProps: () => ({
      location: 'right center',
      children: {
        activator: { children: [{ is: 'v-btn', icon: true, children: [{ is: 'uno-icon', src: 'https://api.iconify.design/mdi:plus.svg', style: { width: '24px', height: '24px' } }] }] },
        default: { children: [
          { is: 'v-btn', icon: true, children: [{ is: 'uno-icon', src: 'https://api.iconify.design/mdi:plus.svg', style: { width: '24px', height: '24px' } }] },
          { is: 'v-btn', icon: true, children: [{ is: 'uno-icon', src: 'https://api.iconify.design/mdi:plus.svg', style: { width: '24px', height: '24px' } }] },
          { is: 'v-btn', icon: true, children: [{ is: 'uno-icon', src: 'https://api.iconify.design/mdi:plus.svg', style: { width: '24px', height: '24px' } }] },
        ] }
      }
    }),
    devProps: () => ({
      'lcd-selectable': false
    })
  }
]
