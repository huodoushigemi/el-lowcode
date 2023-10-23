<script>
import { Segmented } from 'https://cdn.jsdelivr.net/npm/ant-design-vue@4.0.6/dist/antd.esm.min.js'

export default Segmented

export const el_lowcode = {
  // 组件显示名
  label: '分段',
  // 右侧的属性面板
  props: [
    { lp: 'options', scripable: true }
  ],
  // 属性默认值
  defaultProps: () => ({
    options: `{{['Daily', 'Weekly', 'Monthly', 'Quarterly', 'Yearly']}}`,
    value: '{{state.segmented}}',
    'onUpdate:value': '{{val => state.segmented = val}}'
  })
}
</script>

<style>
@import 'https://cdn.jsdelivr.net/npm/ant-design-vue@4.0.6/dist/reset.css'
</style>