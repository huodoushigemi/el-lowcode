<script>
import { Button } from 'https://cdn.jsdelivr.net/npm/ant-design-vue@4.0.6/dist/antd.esm.min.js'

export default Button

export const el_lowcode = {
  // 组件显示名
  label: '按钮',
  // 右侧的属性面板
  props: [
    { lp: 'children' },
    { lp: 'type', type: 'radio-group', options: ['primary', 'ghost', 'dashed', 'default'], el: { type: '' } },
    { lp: 'block', type: 'switch' },
    { lp: 'disabled', type: 'switch' },
    { lp: 'ghost', type: 'switch' },
    { lp: 'danger', type: 'switch' },
  ],
  // 属性默认值
  defaultProps: () => ({
    children: 'Primary Button',
    type: 'primary',
  })
}
</script>

<style>
@import 'https://cdn.jsdelivr.net/npm/ant-design-vue@4.0.6/dist/reset.css'
</style>