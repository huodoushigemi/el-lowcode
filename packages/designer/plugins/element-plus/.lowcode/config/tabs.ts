import TabPane from './tab-pane'

export default {
  is: 'ElTabs',
  label: 'tabs',
  category: '容器',
  props: [
    { lp: 'tab-position', type: 'radio-group', options: ['top', 'right', 'bottom', 'left'] },
    { lp: 'stretch', type: 'switch' },
    { lp: 'type', type: 'radio-group', options: [{ label: 'default', value: undefined }, 'card', 'border-card'] },
  ],
  defaultProps: () => ({
    children: [
      { is: TabPane.is, ...TabPane.defaultProps(), label: 'tab1' },
      { is: TabPane.is, ...TabPane.defaultProps(), label: 'tab2' },
    ]
  })
}