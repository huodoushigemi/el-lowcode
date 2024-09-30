const TabPane = {
  is: 'ElTabPane',
  label: 'tab-pane',
  hidden: true,
  drag: { to: 'ElTabs' },
  props: [
    { lp: 'label' },
    { lp: 'name' },
    { lp: 'disabled', type: 'switch' },
    { lp: 'lazy', type: 'switch' },
  ],
  defaultProps: () => ({
    children: [
      { is: 'h1', children: (Math.random() * 100).toFixed() }
    ]
  })
}

export default [
  {
    is: 'ElTabs',
    label: 'tabs',
    category: '容器',
    drag: { from: 'ElTabPane' },
    props: props => [
      { lp: 'tab-position', type: 'radio-group', options: ['top', 'right', 'bottom', 'left'] },
      { lp: 'stretch', type: 'switch' },
      { lp: 'type', type: 'radio-group', options: [{ label: 'default', value: undefined }, 'card', 'border-card'] },
      { lp: ['tabs', 'children'], el: { is: 'OptionsInput', props: { V: 'name' }, new: i => ({ is: TabPane.is, ...TabPane.defaultProps(), label: `tab${i + 1}` }) } }
    ],
    defaultProps: () => ({
      children: [
        { is: TabPane.is, ...TabPane.defaultProps(), label: 'tab1' },
        { is: TabPane.is, ...TabPane.defaultProps(), label: 'tab2' },
      ]
    })
  },
  TabPane
]