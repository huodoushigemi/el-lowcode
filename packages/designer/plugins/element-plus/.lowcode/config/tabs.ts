import TabPane from './tab-pane'
import OptionsInput from '../../options-input.vue'

export default {
  is: 'ElTabs',
  label: 'tabs',
  category: '容器',
  props: props => [
    { lp: 'tab-position', type: 'radio-group', options: ['top', 'right', 'bottom', 'left'] },
    { lp: 'stretch', type: 'switch' },
    { lp: 'type', type: 'radio-group', options: [{ label: 'default', value: undefined }, 'card', 'border-card'] },
    { lp: ['tabs', 'children'], el: { is: OptionsInput, props: { V: 'name' }, new: i => ({ is: TabPane.is, ...TabPane.defaultProps(), label: `tab${i + 1}` }) } }
  ],
  defaultProps: () => ({
    children: [
      { is: TabPane.is, ...TabPane.defaultProps(), label: 'tab1' },
      { is: TabPane.is, ...TabPane.defaultProps(), label: 'tab2' },
    ]
  })
}