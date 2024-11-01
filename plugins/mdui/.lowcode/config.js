import { v4 } from 'uuid'

const ICONS = ['search', 'arrow_forward', 'downloading', 'attach_file']
const SIZES = ['normal', 'small', 'large']

const variant = (options, displayValue) => ({ lp: 'variant', type: 'select', options, displayValue })
const options = (lp, options, displayValue, extra) => ({ lp, type: 'select', options, displayValue, ...extra })
const radios = (lp, options, displayValue, extra) => ({ lp, type: 'radio-group', options, displayValue, ...extra, el: { type: 'button', ...extra?.el } })
const checkboxs = (lp, options, displayValue, extra) => ({ lp, type: 'checkbox-group', options, displayValue, ...extra, el: { type: 'button', ...extra?.el } })
const bool = (lp, displayValue = false) => ({ lp, type: 'switch', displayValue })
const number = (lp, displayValue) => ({ lp, type: 'input-number', displayValue })
const selectable = (props) => ({ is: 'div', class: 'grid grid-cols-3 gap-x-8', children: [
  { lp: 'selectable', type: 'switch', displayValue: false },
  { lp: 'selected', type: 'switch', displayValue: false },
  { lp: 'selected-icon', type: 'select', options: ICONS },
] })
const icon = lp => ({ lp, options: ICONS })

const vmodel = (k, evt) => ({
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
const text = s => ({ is: 'span', children: s })

const size = { lp: 'size', type: 'select', options: SIZES, displayValue: 'normal' }
const grid2 = children => ({ is: 'div', class: 'grid grid-cols-2 gap-x-12', children })
const fullWidth = bool('full-width')
const loading = bool('loading')
const disabled = bool('disabled')
const required = bool('required')
const readonly = bool('readonly')
const name = { lp: 'name' }
const value = { lp: 'value' }
const kv = { is: 'div', class: 'flex', children: [name, value] }
const _icon = options('icon', ICONS)
const _endIcon = options('end-icon', ICONS)
const href = props => grid2([
  { lp: 'href', displayValue: '', el: { placeholder: 'http://……' } },
  { lp: 'target', type: 'select', options: ['_blank', '_self'], displayValue: '_self', $: { condition: !!props.href } },
])
const btnType = options('type', ['submit', 'reset', 'button'], 'button')

const min = { lp: 'min', type: 'input-number', displayValue: 0 }
const max = { lp: 'max', type: 'input-number', displayValue: 100 }
const step = { lp: 'step', type: 'input-number', displayValue: 1, el: { min: 1 } }

const OptionsInput = (lp, props, child, fn) => ({ lp, el: { is: 'OptionsInput', props, new: (i) => ({ is: child, ...fn?.(i) }) } })

export default [
  {
    is: 'mdui-button',
    label: 'button',
    slots: ['icon', 'end-icon'],
    props: props => [
      variant(['elevated', 'filled', 'tonal', 'outlined', 'text']),
      fullWidth,
      _icon,
      href(props),
      disabled,
      loading,
      btnType,
    ],
    defaultProps: () => ({
      children: [text('button')]
    })
  },

  {
    is: 'mdui-button-icon',
    label: 'icon-button',
    slots: ['selected-icon'],
    props: props => [
      variant(['standard', 'filled', 'tonal', 'outlined'], 'standard'),
      _icon,
      // selectable(props),
      bool('selectable'),
      href(props),
      disabled,
      loading,
      btnType,
    ],
    defaultProps: () => ({
      // icon: 'menu'
       
      children: [
        { is: 'mdui-icon', name: 'favorite_border' },
        { is: 'mdui-menu', name: 'favorite', slot: 'selected-icon' }
      ]
    })
  },

  {
    is: 'mdui-fab',
    label: 'fab',
    slots: ['icon'],
    props: props => [
      variant(['primary', 'surface', 'secondary', 'tertiary'], 'primary'),
      size,
      _icon,
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
    slots: ['icon', 'selected-icon', 'end-icon'],
    props: props => [
      kv,
      fullWidth,
      radios('selects', ['single', 'multiple']),
      disabled,
      required,
      OptionsInput(['', 'children'], { L: 'children', V: 'value' }, 'mdui-segmented-button'),
    ],
    defaultProps: () => ({
      children: [
        { is: 'mdui-segmented-button', children: [text('button-1')] },
        { is: 'mdui-segmented-button', children: [text('button-2')] },
        { is: 'mdui-segmented-button', children: [text('button-3')] },
      ]
    })
  },

  {
    is: 'mdui-segmented-button',
    label: 'segmented-button',
    hidden: true,
    slots: ['icon', 'selected-icon', 'end-icon'],
    props: props => [
      value,
      _icon,
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
    slots: ['icon', 'end-icon', 'selected-icon', 'delete-icon'],
    props: props => [
      variant(['assist', 'filter', 'input', 'suggestion'], 'assist'),
      bool('elevated'),
      selectable(props),
      href(props),
      value,
      _icon,
      disabled,
      loading,
      btnType
    ],
    defaultProps: () => ({
      children: [text('chip')]
    })
  },

  {
    is: 'mdui-card',
    label: 'card',
    slots: [],
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
    slots: ['unchecked-icon', 'checked-icon', 'indeterminate-icon'],
    props: [
      vmodel('checked', 'onChange'),
      name,
      bool('checked'),
      required,
      disabled,
    ],
    defaultProps: () => ({
      children: [text('Checkbox')]
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
        { is: 'mdui-radio', value: '1', children: [text('Radio-1')] },
        { is: 'mdui-radio', value: '2', children: [text('Radio-2')] },
        { is: 'mdui-radio', value: '3', children: [text('Radio-3')] },
      ]
    })
  },

  {
    is: 'mdui-radio',
    label: 'radio',
    hidden: true,
    drag: { to: ['mdui-radio-group'] },
    slots: ['unchecked-icon', 'checked-icon'],
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
    slots: ['unchecked-icon', 'checked-icon'],
    props: [
      vmodel('checked', 'onChange'),
      kv,
      bool('checked'),
      grid2([icon('unchecked-icon'), icon('checked-icon')]),
      grid2([required, disabled]),
    ],
    defaultProps: () => ({

    })
  },

  {
    is: 'mdui-slider',
    label: 'slider',
    props: [
      kv,
      grid2([min, max]),
      grid2([step, bool('tickmarks')]),
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
        { is: 'mdui-collapse-item', value: '1', children: [{ is: 'mdui-list-item', slot: 'header', children: [text('Item 1')] }, { is: 'div', children: [] }] },
        { is: 'mdui-collapse-item', value: '2', children: [{ is: 'mdui-list-item', slot: 'header', children: [text('Item 2')] }, { is: 'div', children: [] }] },
      ]
    })
  },

  {
    is: 'mdui-collapse-item',
    label: 'collapse-item',
    hidden: true,
    drag: { to: ['mdui-collapse'] },
    slots: ['header'],
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
    drag: { to: ['MdUiTabs2'] },
    props: [
      value,
      _icon,
      bool('inline'),
    ]
  },

  {
    is: 'mdui-select',
    label: 'select',
    drag: { from: 'mdui-menu-item' },
    slots: ['icon', 'end-icon', 'error-icon', 'prefix', 'suffix', 'clear-button', 'clear-icon', 'helper'],
    props: [
      grid2([radios('variant', ['filled', 'outlined']), required]),
      kv,
      grid2([{ lp: 'label' }, { lp: 'helper' }]),
      grid2([bool('multiple'), bool('clearable')]),
      grid2([_icon, _endIcon]),
      grid2([{ lp: 'prefix' }, { lp: 'suffix' }]),
      grid2([disabled, readonly]),
      OptionsInput(['options', 'children'], { L: 'children' }, 'mdui-menu-item', i => ({ value: `item-${i + 1}`, children: `Item ${i + 1}` })),
    ],
    defaultProps: () => ({
      label: 'label',
      children: [
        { is: 'mdui-menu-item', value: 'item-1', children: [text('Item 1')] },
        { is: 'mdui-menu-item', value: 'item-2', children: [text('Item 2')] },
      ]
    })
  },

  {
    is: 'mdui-text-field',
    label: 'text-field',
    slots: ['icon', 'end-icon', 'error-icon', 'prefix', 'suffix', 'clear-button', 'clear-icon', 'helper'],
    props: props => [
      radios('variant', ['filled', 'outlined']),
      kv,
      { is: 'div', class: 'grid grid-cols-2', children: [{ lp: 'label' }, { lp: 'helper' }] },
      { is: 'div', class: 'grid grid-cols-2', children: [bool('clearable'), bool('counter')] },
      { is: 'div', class: 'grid grid-cols-2', children: [_icon, _endIcon] },
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
        { is: 'mdui-menu-item', value: 'item-1', children: [text('Item 1')] },
        { is: 'mdui-menu-item', value: 'item-2', children: [text('Item 2')] },
      ]
    })
  },

  {
    is: 'mdui-top-app-bar',
    label: 'app-bar',
    drag: { from: [] },
    props: [
      radios('variant', [['center', 'center-aligned'], 'small', 'medium', 'large'], 'small'),
      bool('shrink'),
      { lp: 'scroll-behavior', type: 'checkbox-group', options: ['hide', 'shrink', 'elevate'], get: v => v?.split(' '), set: v => v.join(' '), el: { type: 'button' } },
      number('scroll-threshold')
    ],
    defaultProps: () => ({
      children: [
        { is: 'mdui-button-icon', icon: 'menu' },
        { is: 'mdui-top-app-bar-title', 'lcd-selectable': false, children: [text('Title')] },
      ]
    })
  },

  {
    is: 'mdui-top-app-bar-title',
    hidden: true,
  },

  {
    is: 'mdui-list-item',
    label: 'li',
    drag: false,
    slots: ['description', 'icon', 'end-icon'],
    props: props => [
      bool('rounded'),
      radios('alignment', ['start', 'center', 'right']),
      href(props),
    ],
    defaultProps: () => ({
      children: [text('Headline')]
    })
  },

  {
    is: 'mdui-navigation-bar',
    label: 'nav-bar',
    drag: { from: ['mdui-navigation-bar-item'] },
    props: [
      { lp: 'value' },
    ],
    defaultProps: () => ({
      value: 'bar-1',
      children: [
        { is: 'mdui-navigation-bar-item', value: 'bar-1', children: [text('Label 1'), { is: 'mdui-icon', slot: 'icon', name: 'place--outlined' }, { is: 'mdui-icon', slot: 'active-icon', name: 'place' }] },
        { is: 'mdui-navigation-bar-item', value: 'bar-2', children: [text('Label 2'), { is: 'mdui-icon', slot: 'icon', name: 'place--outlined' }, { is: 'mdui-icon', slot: 'active-icon', name: 'place' }] },
        { is: 'mdui-navigation-bar-item', value: 'bar-3', children: [text('Label 3'), { is: 'mdui-icon', slot: 'icon', name: 'place--outlined' }, { is: 'mdui-icon', slot: 'active-icon', name: 'place' }] },
      ]
    })
  },

  {
    is: 'mdui-navigation-bar-item',
    label: 'nav-bar-li',
    drag: { to: ['mdui-navigation-bar'] },
    hidden: true,
    props: [
      { lp: 'value' }
    ],
    defaultProps: () => ({
      value: v4(),
      children: [
        text('Label'),
        { is: 'mdui-icon',  }
      ]
    })
  },

  {
    is: 'mdui-icon',
    label: 'icon',
    slots: ['unchecked-icon', 'checked-icon', 'indeterminate-icon'],
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
  },

  {
    is: 'mdui-menu',
    label: 'menu',
    drag: { from: ['mdui-menu-item', 'mdui-divider'] },
    props: [
      { lp: 'value' },
      bool('dense'),
      radios('selects', ['single', 'multiple']),
      checkboxs('submenu-trigger', ['click', 'hover', 'focus', 'manual'], ['click', 'hover'], { get: v => v?.split(' ') || [], set: v => v?.join(' ') || '' }),
    ],
    defaultProps: () => ({
      children: [
        { is: 'mdui-menu-item', value: 1, children: [text('Item 1'), { is: 'mdui-icon', name: 'visibility', slot: 'icon' }] },
        { is: 'mdui-menu-item', value: 2, children: [text('Item 2'), { is: 'mdui-icon', name: 'visibility', slot: 'icon' }] },
        { is: 'mdui-menu-item', value: 3, children: [text('Item 3'), { is: 'mdui-icon', name: 'visibility', slot: 'icon' }] },
      ]
    })
  },

  {
    is: 'mdui-menu-item',
    label: 'menu-item',
    drag: { to: ['mdui-menu', 'mdui-menu-item'] },
    slots: ['icon', 'end-icon', 'end-text', 'selected-icon', 'submenu'],
    hidden: true,
    props: props => [
      { lp: 'value' },
      disabled,
      href(props),
    ]
  }
]