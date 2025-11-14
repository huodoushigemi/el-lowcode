import { createApp, defineAsyncComponent, defineComponent, h, nextTick, onBeforeUnmount, toRaw, toRef, triggerRef, watchEffect } from 'vue'
import { Process } from '.'

/**
 * 文本元素 开启编辑模式
 */
export const EditText: Process = {
  mounted({ lcd }) {
    watchEffect(cleaup => {
      const node = lcd.active
      if (!node?.el || !node?.text) return
      const { el } = node
      const addEvent = (event, cb, opt?) => { el.addEventListener(event, cb, opt); cleaup(() => el.removeEventListener(event, cb)) }
      const addAttr = (k, v) => { el.setAttribute(k, v); cleaup(() => el.removeAttribute(k)) }

      addEvent('click', () => {
        const text = el.innerText
        addAttr('lcd-text', '')
        addAttr('contenteditable', 'plaintext-only')
        addAttr('spellcheck', 'false')
        cleaup(() => el.ownerDocument.getSelection()?.empty())
        cleaup(() => el.innerText != text && triggerRef(toRef(node.data, 'children')))
        
        addEvent('input', (e) => {
          e.stopPropagation()
          toRaw(node.data).children = el.innerText
        })
        addEvent('keydown', async (e) => {
          if (e.key == 'Enter') {
            e.preventDefault()
            lcd.activeId = void 0
            await nextTick()
            lcd.activeId = node.id
          }
          e.stopPropagation()
        })
        addEvent('click', (e) => {
          e.preventDefault()
          e.stopPropagation()
        })
      }, { once: true })
    })
  }
}
