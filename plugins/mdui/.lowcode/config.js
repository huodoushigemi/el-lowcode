import { v4 } from 'uuid'

const ICONS = ['search', 'arrow_forward', 'downloading', 'attach_file']
const SIZES = ['normal', 'small', 'large']

const variant = (options, displayValue) => ({ lp: 'variant', type: 'select', options, displayValue })
const options = (lp, options, displayValue, extra) => ({ lp, type: 'select', options, displayValue, ...extra })
const radios = (lp, options, displayValue, extra) => ({ lp, type: 'radio-group', options, displayValue, ...extra, el: { type: 'button', ...extra?.el } })
const bool = (lp, displayValue = false) => ({ lp, type: 'switch', displayValue })
const number = (lp, displayValue) => ({ lp, type: 'input-number', displayValue })
const selectable = (props) => ({ is: 'div', class: 'flex', children: [
  { lp: 'selectable', type: 'switch', displayValue: false },
  { lp: 'selected', type: 'switch', displayValue: false },
  { lp: 'selected-icon', type: 'select', options: ICONS },
] })

const size = { lp: 'size', type: 'select', options: SIZES, displayValue: 'normal' }
const fullWidth = bool('full-width')
const loading = bool('loading')
const disabled = bool('disabled')
const required = bool('required')
const readonly = bool('readonly')
const name = { lp: 'name' }
const value = { lp: 'value' }
const kv = { is: 'div', class: 'flex', children: [name, value] }
const icon = options('icon', ICONS)
const endIcon = options('end-icon', ICONS)
const href = props => ({ is: 'div', class: 'flex', children: [
  { lp: 'href', el: { placeholder: 'http://……' } },
  { lp: 'target', type: 'select', options: ['_blank', '_self'], displayValue: '_self', $: { condition: !!props.href } },
] })
const btnType = options('type', ['submit', 'reset', 'button'], 'button')

const min = { lp: 'min', type: 'input-number', displayValue: 0 }
const max = { lp: 'max', type: 'input-number', displayValue: 100 }
const step = { lp: 'step', type: 'input-number', displayValue: 1, el: { min: 1 } }

const OptionsInput = (lp, props, child, fn) => ({ lp, el: { is: 'OptionsInput', props, new: (i) => ({ is: child, ...fn?.(i) }) } })

export default [
  {
    is: 'mdui-button',
    label: 'button',
    props: props => [
      variant(['elevated', 'filled', 'tonal', 'outlined', 'text']),
      fullWidth,
      icon,
      href(props),
      disabled,
      loading,
      btnType,
    ],
    defaultProps: () => ({
      children: [{ is: 'span', children: 'button' }]
    })
  },

  {
    is: 'mdui-button-icon',
    label: 'icon-button',
    props: props => [
      variant(['standard', 'filled', 'tonal', 'outlined'], 'standard'),
      icon,
      selectable(props),
      href(props),
      disabled,
      loading,
      btnType,
    ],
    defaultProps: () => ({
      icon: 'menu'
    })
  },

  {
    is: 'mdui-fab',
    label: 'fab',
    props: props => [
      variant(['primary', 'surface', 'secondary', 'tertiary'], 'primary'),
      size,
      icon,
      href(props),
      disabled,
      loading,
      btnType,
    ],
    defaultProps: () => ({
      icon: 'edit'
    })
  },

  {
    is: 'mdui-segmented-button-group',
    label: 'segmented',
    drag: { from: 'mdui-segmented-button' },
    props: props => [
      kv,
      fullWidth,
      options('selects', ['single', 'multiple']),
      disabled,
      required,
      OptionsInput(['', 'children'], { L: 'children', V: 'value' }, 'mdui-segmented-button'),
    ],
    defaultProps: () => ({
      children: [
        { is: 'mdui-segmented-button', children: 'button-1' },
        { is: 'mdui-segmented-button', children: 'button-2' },
        { is: 'mdui-segmented-button', children: 'button-3' },
      ]
    })
  },

  {
    is: 'mdui-segmented-button',
    label: 'segmented-button',
    hidden: true,
    props: props => [
      value,
      icon,
      href(props),
      disabled,
      loading,
      btnType
    ],
    defaultProps: () => ({
      icon: 'edit'
    })
  },

  {
    is: 'mdui-chip',
    label: 'chip',
    props: props => [
      variant(['assist', 'filter', 'input', 'suggestion'], 'assist'),
      bool('elevated'),
      icon,
      selectable(props),
      href(props),
      value,
      icon,
      disabled,
      loading,
      btnType
    ],
    defaultProps: () => ({
      children: 'chip'
    })
  },

  {
    is: 'mdui-card',
    label: 'card',
    props: props => [
      variant(['elevated', 'filled', 'outlined'], 'assist'),
      bool('clickable'),
      href(props),
      disabled,
    ],
    defaultProps: () => ({
      children: []
    })
  },

  {
    is: 'mdui-checkbox',
    label: 'checkbox',
    props: [
      { lp: ['label', 'children'] },
      name,
      bool('checked'),
      required,
      disabled,
    ],
    defaultProps: () => ({
      children: 'Checkbox'
    })
  },

  {
    is: 'mdui-radio-group',
    label: 'radio-group',
    drag: { from: 'mdui-radio' },
    props: [
      kv,
      required,
      disabled,
      OptionsInput(['options', 'children'], { L: 'children', V: 'value' }, 'mdui-radio'),
    ],
    defaultProps: () => ({
      children: [
        { is: 'mdui-radio', value: '1', children: 'Radio-1' },
        { is: 'mdui-radio', value: '2', children: 'Radio-2' },
        { is: 'mdui-radio', value: '3', children: 'Radio-3' },
      ]
    })
  },

  {
    is: 'mdui-radio',
    label: 'radio',
    hidden: true,
    drag: { to: 'mdui-radio-group' },
    props: [
      kv,
      bool('checked'),
      required,
      disabled,
    ],
    defaultProps: () => ({

    })
  },

  {
    is: 'mdui-switch',
    label: 'switch',
    props: [
      kv,
      bool('checked'),
      required,
      disabled,
    ],
    defaultProps: () => ({

    })
  },

  {
    is: 'mdui-slider',
    label: 'slider',
    props: [
      kv,
      min,
      max,
      step,
      bool('tickmarks'),
      bool('nolabel'),
      { lp: 'label-formatter', script: true, displayValue: '{{v => v}}' },
      required,
      disabled,
    ],
    defaultProps: () => ({

    })
  },

  {
    is: 'mdui-collapse',
    label: 'collapse',
    drag: { from: 'mdui-collapse-item' },
    props: [
      bool('accordion'),
      disabled,
      // OptionsInput(['options', 'children'], { L: 'children.0.children', V: 'value' }, 'mdui-collapse-item', () => ({ children: [{ is: 'mdui-list-item', slot: 'header', icon: 'near_me', children: 'Item' }, { is: 'mdui-list-item', children: 'Content' }] })),
    ],
    defaultProps: () => ({
      children: [
        { is: 'mdui-collapse-item', value: '1', children: [{ is: 'mdui-list-item', slot: 'header', children: [{ is: 'span', children: 'Item 1' }] }, { is: 'div', children: [] }] },
        { is: 'mdui-collapse-item', value: '2', children: [{ is: 'mdui-list-item', slot: 'header', children: [{ is: 'span', children: 'Item 2' }] }, { is: 'div', children: [] }] },
      ]
    })
  },

  {
    is: 'mdui-collapse-item',
    label: 'collapse-item',
    hidden: true,
    drag: { to: 'mdui-collapse' },
    props: [
      value,
      disabled,
    ],
    defaultProps: () => ({
      
    })
  },

  {
    is: 'MdUiTabs2',
    label: 'tabs',
    drag: { from: 'mdui-tab-panel' },
    props: [
      value,
      variant(['primary', 'secondary'], 'primary'),
      options('placement', ['top-start', 'top', 'top-end', 'bottom-start', 'bottom', 'bottom-end', 'left-start', 'left', 'left-end', 'right-start', 'right', 'right-end']),
      fullWidth,
      OptionsInput(['tabs', 'children'], undefined, 'mdui-tab-panel', () => ({ label: 'Tab', children: [] }))
    ],
    defaultProps: () => ({
      placement: 'top-start',
      children: [
        { is: 'mdui-tab-panel', label: 'Tab 1', children: [{ is: 'h1', children: 'Panel 1' }] },
        { is: 'mdui-tab-panel', label: 'Tab 2', children: [{ is: 'h1', children: 'Panel 2' }] },
      ]
    })
  },

  {
    is: 'mdui-tab-panel',
    label: 'tab-panel',
    hidden: true,
    drag: { to: 'MdUiTabs2' },
    props: [
      value,
      icon,
      bool('inline'),
    ]
  },

  {
    is: 'mdui-select',
    label: 'select',
    drag: { from: 'mdui-menu-item' },
    props: [
      variant(['filled', 'outlined']),
      kv,
      { lp: 'label' },
      OptionsInput(['options', 'children'], { L: 'children' }, 'mdui-menu-item', i => ({ value: `item-${i + 1}`, children: `Item ${i + 1}` })),
      bool('multiple'),
      { lp: 'placeholder' },
      { lp: 'helper' },
      bool('clearable'),
      icon,
      endIcon,
      readonly,
      disabled,
      required,
    ],
    defaultProps: () => ({
      label: 'label',
      children: [
        { is: 'mdui-menu-item', value: 'item-1', children: 'Item 1' },
        { is: 'mdui-menu-item', value: 'item-2', children: 'Item 2' },
      ]
    })
  },

  {
    is: 'mdui-text-field',
    label: 'text-field',
    slot: ['icon', 'end-icon', 'prefix', 'suffix'],
    props: props => [
      radios('variant', ['filled', 'outlined']),
      kv,
      { is: 'div', class: 'grid grid-cols-2', children: [{ lp: 'label' }, { lp: 'helper' }] },
      { is: 'div', class: 'grid grid-cols-2', children: [bool('clearable'), bool('counter')] },
      { is: 'div', class: 'grid grid-cols-2', children: [icon, endIcon] },
      { is: 'div', class: 'grid grid-cols-2', children: [{ lp: 'prefix' }, { lp: 'suffix' }] },
      options('type', ['text', 'number', 'password', 'url', 'email', 'search', 'tel', 'date', 'datetime-local', 'month', 'time', 'week']),
      ...[
        [{ is: 'div', class: 'grid grid-cols-2 gap-x-12', children: [number('minlength'), number('maxlength')] }, ['text', 'password', 'url', 'email', 'search', 'tel']],
        [{ is: 'div', class: 'grid grid-cols-2 gap-x-12', children: [number('min-rows'), number('max-rows')] }, ['text']],
        [{ is: 'div', class: 'grid grid-cols-2 gap-x-12', children: [number('min'), number('max')] }, ['number']],
      ].flatMap(e => e[1].includes(props.type) ? e[0] : []),
      bool('autosize'),
      { lp: 'pattern' },
      readonly,
      disabled,
      required,
    ],
    defaultProps: () => ({
      label: 'Label',
      type: 'text',
      children: [
        { is: 'mdui-menu-item', value: 'item-1', children: 'Item 1' },
        { is: 'mdui-menu-item', value: 'item-2', children: 'Item 2' },
      ]
    })
  },

  {
    is: 'mdui-top-app-bar',
    label: 'app-bar',
    drag: { from: [] },
    props: [
      { lp: ['title', 'children.1.children'] },
      options(['icon', 'children.0.icon'], ICONS),
      radios('variant', [['center', 'center-aligned'], 'small', 'medium', 'large'], 'small'),
      bool('shrink'),
      { lp: 'scroll-behavior', type: 'checkbox-group', options: ['hide', 'shrink', 'elevate'], get: v => v?.split(' '), set: v => v.join(' '), el: { type: 'button' } },
      number('scroll-threshold')
    ],
    defaultProps: () => ({
      children: [
        { is: 'mdui-button-icon', icon: 'menu' },
        { is: 'mdui-top-app-bar-title', 'lcd-selectable': false, children: 'Title' },
      ]
    })
  },

  {
    is: 'mdui-top-app-bar-title',
    hidden: true,
  },

  // todo
  {
    is: 'mdui-list-item',
    label: 'li',
    drag: false,
    props: [
      
    ],
    defaultProps: () => ({
      children: [{ is: 'span', children: 'Headline' }]
    })
  },

  {
    is: 'mdui-navigation-bar',
    label: 'nav-bar',
    props: [
      { lp: 'value' },
    ],
    defaultProps: () => ({
      value: 'bar-1',
      children: [
        { is: 'mdui-navigation-bar-item', value: 'bar-1', children: [{ is: 'span', children: 'Label 1' }, { is: 'mdui-icon', slot: 'icon', name: 'place--outlined' }, { is: 'mdui-icon', slot: 'active-icon', name: 'place' }] },
        { is: 'mdui-navigation-bar-item', value: 'bar-2', children: [{ is: 'span', children: 'Label 2' }, { is: 'mdui-icon', slot: 'icon', name: 'place--outlined' }, { is: 'mdui-icon', slot: 'active-icon', name: 'place' }] },
        { is: 'mdui-navigation-bar-item', value: 'bar-3', children: [{ is: 'span', children: 'Label 3' }, { is: 'mdui-icon', slot: 'icon', name: 'place--outlined' }, { is: 'mdui-icon', slot: 'active-icon', name: 'place' }] },
      ]
    })
  },

  {
    is: 'mdui-navigation-bar-item',
    label: 'nav-bar-li',
    hidden: true,
    props: [
      { lp: 'value' }
    ],
    defaultProps: () => ({
      value: v4(),
      children: [
        { is: 'span', children: 'Label' },
        { is: 'mdui-icon',  }
      ]
    })
  },

  {
    is: 'mdui-icon',
    label: 'icon',
    props: [
      { lp: 'name' },
      { lp: 'src' }
    ],
    defaultProps: () => ({
      // name: ''
      src: 'https://api.iconify.design/iconoir:mouse-button-left.svg'
    })
  },

  {
    is: 'mdui-navigation-drawer',
    label: 'drawer',
    props: [
      bool('open'),
      bool('modal'),
      bool('closeOnEsc'),
      bool('closeOnOverlayClick'),
      radios('placement', ['left', 'right'], 'left'),
      { is: 'el-divider' },
      { is: 'h2', class: 'my12', children: 'Event' },
      { lp: 'onClose' }
    ],
    defaultProps: () => ({
      modal: true,
      closeOnEsc: true,
      closeOnOverlayClick: true,
      children: [],
    })
  }
]