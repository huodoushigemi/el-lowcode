const tabWgt = (is) => ({
  is,
  label: 'tab',
  hidden: true,
  drag: { to: 'md-tabs' },
  props: props => [
    { lp: ['tag', 'is'], type: 'select', options: ['md-primary-tab', 'md-secondary-tab'] },
    { lp: 'inline-icon', type: 'switch', displayValue: false, $: { if: props.is == 'md-primary-tab' } },
    { lp: 'is-tab', type: 'switch', displayValue: true },
    { lp: 'active', type: 'switch', displayValue: false },
    { lp: 'has-icon', type: 'switch', displayValue: false },
    { lp: 'icon-only', type: 'switch', displayValue: false },
    { lp: 'selected', type: 'switch' },
    { lp: ['indicator-height', 'style.--_active-indicator-height'], type: 'input-number', get: v => parseInt(v), set: v => `${v}px` },
    { lp: ['indicator-color', 'style.--_active-indicator-color'], type: 'color-picker' },
  ]
})

export const tabs = {
  is: 'md-tabs',
  label: 'tabs',
  drag: { from: ['md-primary-tab', 'md-secondary-tab'] },
  props: [
    { lp: 'auto-activate', type: 'switch', displayValue: false },
    { lp: ['tabs', 'children'], el: { is: 'OptionsInput', new: () => ({ is: 'md-primary-tab', children: [] }) } }
  ],
  defaultProps: () => ({
    children: [
      { is: 'md-primary-tab', children: [{ is: 'span', children: 'tab-1' }] },
      { is: 'md-primary-tab', children: [{ is: 'span', children: 'tab-2' }] },
      { is: 'md-primary-tab', children: [{ is: 'span', children: 'tab-3' }] },
    ]
  })
}

export const primaryTab = tabWgt('md-primary-tab')
export const secondaryTab = tabWgt('md-secondary-tab')

export default [
  tabs,
  primaryTab,
  secondaryTab,
]