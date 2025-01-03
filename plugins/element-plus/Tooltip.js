import { defineComponent, h } from 'vue'
import { ElTooltip } from 'element-plus'
import { omit, withInstall } from '@el-lowcode/utils'

const Tooltip = defineComponent({
  name: 'ElTooltip-lcd',
  props: omit(ElTooltip.props, ['id', 'class', 'style']),
  setup(props, { attrs, slots }) {
    // return () => h('div', { style: 'display: contents' }, h(ElTooltip, props, h('div', void 0, slots)))
    // todo
    return () => h('div', { style: 'display: contents' }, h(ElTooltip, props, slots))
  }
})

export default withInstall(Tooltip)