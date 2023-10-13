import { el_lowcode_widgets } from '../el_lowcode_widgets'
import { parseAttrs } from '../_utils'

export default {
  is: 'ElTabs',
  label: 'tabs',
  props: [
    { lp: 'tab-position', type: 'radio-group', options: ['top', 'right', 'bottom', 'left'] },
    { lp: 'stretch', type: 'switch' },
    { lp: 'type', type: 'radio-group', options: [{ label: 'default', value: undefined }, 'card', 'border-card'] },
  ],
  defaultProps: () => ({
    children: [
      parseAttrs(el_lowcode_widgets.ElTabPane!, { label: 'tab1' }),
      parseAttrs(el_lowcode_widgets.ElTabPane!, { label: 'tab2' }),
    ]
  })
}