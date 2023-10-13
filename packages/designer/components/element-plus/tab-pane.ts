import { el_lowcode_widgets } from '../el_lowcode_widgets'
import { parseAttrs } from '../_utils'

export default {
  is: 'ElTabPane',
  label: 'tab-pane',
  layout: true,
  drag: false,
  props: [
    { lp: 'label' },
    { lp: 'name' },
    { lp: 'disabled', type: 'switch' },
    { lp: 'lazy', type: 'switch' },
  ],
  defaultProps: () => ({
    children: [
      parseAttrs(el_lowcode_widgets.h1!, { children: (Math.random() * 100).toFixed() })
    ]
  })
}