import { v4 } from 'uuid'

const ICONS = ['search', 'arrow_forward', 'downloading', 'attach_file']
const SIZES = ['normal', 'small', 'large']

const variant = (options, displayValue) => ({ lp: 'variant', type: 'select', options, displayValue })
const options = (lp, options, displayValue, extra) => ({ lp, type: 'select', options, displayValue, ...extra })
const boolean = (lp, displayValue = false) => ({ lp, type: 'switch', displayValue })
const number = (lp, displayValue) => ({ lp, type: 'input-number', displayValue })
const selectable = (props) => ({ is: 'div', class: 'flex', children: [
  { lp: 'selectable', type: 'switch', displayValue: false },
  { lp: 'selected', type: 'switch', displayValue: false },
  { lp: 'selected-icon', type: 'select', options: ICONS },
] })

const size = { lp: 'size', type: 'select', options: SIZES, displayValue: 'normal' }
const fullWidth = boolean('full-width')
const loading = boolean('loading')
const disabled = boolean('disabled')
const required = boolean('required')
const readonly = boolean('readonly')
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

const OptionsInput = (lp, props, child, fn) => ({ lp, el: { is: 'OptionsInput', props, new: (i) => ({ is: child, _id: v4(), ...fn?.(i) }) } })

export default [
  {
    is: 'mdui-button',
    label: 'button',
    props: props => [
      { lp: ['text', 'children'] },
      variant(['elevated', 'filled', 'tonal', 'outlined', 'text'], 'filled'),
      fullWidth,
      icon,
      href(props),
      disabled,
      loading,
      btnType,
    ],
    defaultProps: () => ({
      children: 'button'
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
    sortablePut: false,
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
    drag: false,
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
      boolean('elevated'),
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
      boolean('clickable'),
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
      boolean('checked'),
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
    sortablePut: false,
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
    drag: false,
    props: [
      kv,
      boolean('checked'),
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
      boolean('checked'),
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
      boolean('tickmarks'),
      boolean('nolabel'),
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
    sortablePut: false,
    props: [
      boolean('accordion'),
      disabled,
      OptionsInput(['options', 'children'], { L: 'children.0.children', V: 'value' }, 'mdui-collapse-item', () => ({ children: [{ is: 'mdui-list-item', slot: 'header', icon: 'near_me', children: 'Item' }, { is: 'mdui-list-item', children: 'Content' }] })),
    ],
    defaultProps: () => ({
      children: [
        { is: 'mdui-collapse-item', value: '1', children: [{ is: 'mdui-list-item', slot: 'header', icon: 'near_me', children: 'Item 1' }, { is: 'mdui-list-item', children: 'Content 1' }] },
        { is: 'mdui-collapse-item', value: '2', children: [{ is: 'mdui-list-item', slot: 'header', icon: 'near_me', children: 'Item 2' }, { is: 'mdui-list-item', children: 'Content 2' }] },
      ]
    })
  },

  {
    is: 'mdui-collapse-item',
    label: 'collapse-item',
    drag: false,
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
    sortablePut: false,
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
    drag: false,
    props: [
      value,
      icon,
      boolean('inline'),
    ]
  },

  {
    is: 'mdui-tab-panel',
    label: 'tab-panel',
    drag: false,
    props: [
      value,
      icon,
      boolean('inline'),
    ]
  },

  {
    is: 'mdui-select',
    label: 'select',
    sortablePut: false,
    props: [
      variant(['filled', 'outlined']),
      kv,
      { lp: 'label' },
      OptionsInput(['options', 'children'], { L: 'children' }, 'mdui-menu-item', i => ({ value: `item-${i + 1}`, children: `Item ${i + 1}` })),
      boolean('multiple'),
      { lp: 'placeholder' },
      { lp: 'helper' },
      boolean('clearable'),
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
    props: props => [
      variant(['filled', 'outlined']),
      kv,
      { is: 'div', class: 'flex', children: [{ lp: 'label' }, { lp: 'helper' }] },
      { is: 'div', class: 'flex', children: [boolean('clearable'), boolean('counter')] },
      { is: 'div', class: 'flex', children: [icon, endIcon] },
      options('type', ['text', 'number', 'password', 'url', 'email', 'search', 'tel', 'date', 'datetime-local', 'month', 'time', 'week']),
      { is: 'div', class: 'flex', children: [number('minlength'), number('maxlength')], $: { condition: ['text', 'password', 'url', 'email', 'search', 'tel'].includes(props.type) } },
      { is: 'div', class: 'flex', children: [number('min-rows'), number('max-rows')], $: { condition: props.type == 'text' } },
      { is: 'div', class: 'flex', children: [number('min'), number('max')], $: { condition: props.type == 'number' } },
      boolean('autosize'),
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
    sortablePut: false,
    props: [
      { lp: ['title', 'children.1.children'] },
      options(['icon', 'children.0.icon'], ICONS),
      { lp: 'variant', type: 'radio-group', options: [['center', 'center-aligned'], 'small', 'medium', 'large'], el: { type: 'button' } },
      { lp: 'scroll-behavior', type: 'checkbox-group', options: ['hide', 'shrink', 'elevate'], get: v => v?.split(' '), set: v => v.join(' '), el: { type: 'button' } }
    ],
    defaultProps: () => ({
      children: [
        { is: 'mdui-button-icon', icon: 'menu' },
        { is: 'mdui-top-app-bar-title', children: 'Title' },
      ]
    })
  },

  // todo
  {
    is: 'mdui-list-item',
    label: 'item',
    drag: false,
    props: [],
  },
]