import { useEventListener } from '@vueuse/core'
import { pick } from '@el-lowcode/utils'
import { Process } from '.'

/**
 * 用于将 iframe 内的事件冒泡到父窗口
 */
export const IframeEventBubble: Process = {
  mounted({ lcd }) {
    const iframe = frameElement
    if (!iframe) return

    useEventListener(['mousedown', 'mousemove', 'mouseup'], e => {
      if (e.button == 1) {
        e.preventDefault()
        e.stopPropagation()
      }
      const z = lcd.canvas.zoom
      const rect = iframe.getBoundingClientRect()
      iframe.dispatchEvent(new MouseEvent(e.type, {
        ...pick(e, [
          'button', 'buttons', 'clientX', 'clientY', 'movementX', 'movementY', 'screenX', 'screenY',
          'altKey', 'ctrlKey', 'metaKey', 'shiftKey',
          'detail', 'which',
          'bubbles', 'cancelable', 'composed'
        ]),
        clientX: e.x * z + rect.x, clientY: e.y * z + rect.y,
        bubbles: true
      }))
    })

    useEventListener(['keypress', 'keydown', 'keyup'], e => {
      if (['ArrowUp', 'ArrowLeft', 'ArrowDown', 'ArrowRight'].includes(e.key)) e.preventDefault()
      e.stopPropagation()
      iframe.dispatchEvent(new KeyboardEvent(e.type, pick(e, [
        'code', 'isComposing', 'key', 'location', 'repeat',
        'altKey', 'ctrlKey', 'metaKey', 'shiftKey',
        'detail', 'which',
        'bubbles', 'cancelable', 'composed'
      ])))
    })
  }
}
