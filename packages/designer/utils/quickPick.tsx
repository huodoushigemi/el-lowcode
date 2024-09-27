import { createApp, ref, nextTick } from 'vue'
import { onClickOutside } from '@vueuse/core'
import { ElOption, ElSelect } from 'element-plus'
import { eq } from '@el-lowcode/utils'

interface QuickPickOptions {
  title?: string
  placeholder?: string
  items: Opt[]
  value?: any
}

type Opt = {
  label: string
  value: any
  description?: string
}

export function quickPick({ title, placeholder = '请选择', items, value }: QuickPickOptions) {
  return new Promise((resolve) => {
    const val = ref(value || items[0].value)
    const elRef = ref()
    const inputRef = ref()
    const stop = onClickOutside(elRef, close, { detectIframe: true })

    const app = createApp(() => <div ref={elRef} class='vs-base vs-quick'>
      <input class='vs-input sticky top-0 my8 mx6' ref={inputRef} placeholder={placeholder} />
      <div class='vs-ul element-selection px6 pb8 max-h360 overflow-auto outline-none' tabindex={1}>
        {items.map(e => (
          <div class={['vs-li flex aic h22 px12', eq(e.value, val.value) && 'selected']} onClick={() => select(e.value)}>
            {e.label}
            {e.description && <div class='mx4 op40'>{e.description}</div>}
          </div>
        ))}
      </div>
    </div>)

    function select(v) {
      resolve(v)
      close()
    }

    function close() {
      div.remove()
      app.unmount()
      stop()
    }
    
    const div = document.createElement('div')
    app.mount(div)
    document.body.appendChild(div)

    nextTick().then(() => inputRef.value.focus())
  })
}
