import { createApp, h } from 'vue'
import ElLowcode, { ConfigProvider } from 'el-lowcode'
import DragBox from './drag-box2.vue'

const app = createApp({
  provide: {
    designerCtx: window.designerCtx
  },
  render: () => [
    h(ConfigProvider, window.designerCtx.root, () => [
      h(DragBox, { el: window.designerCtx.root })
    ])
  ]
})

app.use(ElLowcode)
app.mount('body')

if (frameElement) {
  document.addEventListener('wheel', e => {
    e.preventDefault()
    e.stopPropagation()
    frameElement.dispatchEvent(new WheelEvent(e.type, e))
  }, { passive: false })
}