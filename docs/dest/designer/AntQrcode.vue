<script>
import { QRCode } from 'https://cdn.jsdelivr.net/npm/ant-design-vue@4.0.6/dist/antd.esm.min.js'

export default QRCode

export const el_lowcode = {
  // 组件显示名
  label: '二维码',
  // 右侧的属性面板
  props: [
    { lp: ['url', 'value'] },
    { lp: 'icon' },
    { lp: 'type', type: 'radio-group', displayValue: 'canvas', options: ['canvas', 'svg'] },
    { lp: 'bg-color', type: 'color-picker' },
    { lp: 'error-level', type: 'radio-group', displayValue: 'M', options: ['L', 'M', 'Q', 'H'] },
  ],
  // 属性默认值
  defaultProps: () => ({
    value: 'https://www.antdv.com/',
    icon: 'https://www.antdv.com/assets/logo.1ef800a8.svg',
    bgColor: '#ffffff80'
  })
}
</script>

<style>
@import 'https://cdn.jsdelivr.net/npm/ant-design-vue@4.0.6/dist/reset.css'
</style>