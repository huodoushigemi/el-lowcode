import { v4 } from 'uuid'

const buttons = [
  'md-elevated-button',
  'md-filled-button',
  'md-filled-tonal-button',
  'md-outlined-button',
  'md-text-button',
]

const iconButtons = [
  'md-icon-button',
  'md-filled-icon-button',
  'md-filled-tonal-icon-button',
  'md-outlined-icon-button',
]

const icons = ['settings', 'search', 'done', 'add', 'visibility_off', 'pause', 'expand_less', 'close', 'home', 'open_in_new', 'download', 'logout']

const button = (is, sortablePull = false) => ({
  is,
  label: 'button',
  // sortablePull,
  props: [
    { lp: ['text', 'children'] },
    { lp: ['type', 'is'], type: 'select', options: buttons },
    { lp: 'disabled', displayValue: false },
    { lp: 'href', el: { placeholder: 'http://……' } },
    { lp: 'type', type: 'select', options: ['text', 'reset', 'submit'], displayValue: 'submit' }
  ],
})

const iconButton = (is, sortablePull = false) => ({
  is,
  label: 'icon-button',
  layout: true,
  sortablePut: false,
  // sortablePull,
  props: props => [
    { is: 'div', class: 'flex', children: [
      { lp: ['icon', 'children.0'], class: 'flex-1', type: 'select', options: icons, get: v => props.children[0]?.children, set: v => ({ is: 'md-icon', _id: v4(), ...props.children[0], children: v }) },
      props.toggle && { lp: ['icon', 'children.1'], type: 'select', options: icons, get: v => props.children[1]?.children, set: v => ({ is: 'md-icon', _id: v4(), ...props.children[1], children: v, slot: 'selected' }) },
    ] },
    { lp: ['type', 'is'], type: 'select', options: iconButtons },
    { lp: 'toggle', type: 'switch', displayValue: false },
    { lp: 'selected', type: 'switch', hide: props => !props.toggle, displayValue: false },
    { lp: 'disabled', type: 'switch', displayValue: false },
    { lp: 'href', el: { placeholder: 'http://……' } },
    { lp: 'type', type: 'select', options: ['text', 'reset', 'submit'], displayValue: 'submit' }
  ],
  defaultProps: () => ({
    children: [
      { is: 'md-icon', children: 'check' }
    ]
  })
})

export default [
  ...buttons.map(e => button(e)),
  button(buttons[0], true),

  ...iconButtons.map(e => iconButton(e)),
  iconButton(iconButtons[0], true),

  {
    is: 'md-icon',
    label: 'icon',
    props: [
      { lp: ['icon', 'children'], type: 'select', options: icons }
    ],
    defaultProps: () => ({
      children: 'check'
    })
  },

  {
    is: 'md-slider',
    label: 'slider',
    props: [
      { lp: 'value' },
      { lp: 'name' },
      { lp: 'min', type: 'input-number' },
      { lp: 'max', type: 'input-number' },
      { lp: 'step', type: 'input-number' },
      { lp: 'labeled', type: 'switch' },
      { lp: 'ticks', type: 'switch' },
      { lp: 'disabled', type: 'switch', displayValue: false },
      { lp: 'range', type: 'switch' },
      // todo
      // nameStart
      // nameEnd
      // valueStart
      // valueEnd
      { is: 'el-divider' },
      { lp: 'onChange' },
      { lp: 'onInput' },
    ]
  },

  {
    is: 'md-switch',
    label: 'switch',
    props: [
      { lp: ['value', 'selected'], type: 'switch' },
      { lp: 'name' },
      { lp: 'required', type: 'switch', displayValue: false },
      { lp: 'disabled', type: 'switch', displayValue: false },
      { lp: 'icons', type: 'switch' },
      // todo
      // nameStart
      // nameEnd
      // valueStart
      // valueEnd
      { is: 'el-divider' },
      { lp: 'onChange' },
      { lp: 'onInput' },
    ]
  },


]