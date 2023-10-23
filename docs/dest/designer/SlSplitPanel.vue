<script>
import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.11.0/cdn/components/split-panel/split-panel.js'
import uuid from 'https://cdn.jsdelivr.net/npm/uuid/dist/esm-browser/v4.js'

export const el_lowcode = {
  is: 'sl-split-panel',
  // 组件显示名
  label: '分割面板',
  layout: true,
  // 右侧的属性面板
  props: [
    { lp: 'position', type: 'slider' },
    { lp: 'vertical', type: 'switch', displayValue: false },
    { lp: 'disabled', type: 'switch', displayValue: false },
  ],
  // 属性默认值
  defaultProps: () => ({
    children: [
      { is: 'div', _id: uuid(), slot: 'start', children: [] },
      { is: 'div', _id: uuid(), slot: 'end', children: [] },
    ]
  })
}
</script>

<style>
@import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.11.0/cdn/themes/dark.css';
</style>