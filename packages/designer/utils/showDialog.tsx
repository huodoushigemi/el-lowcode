import { createApp, getCurrentInstance, camelize, capitalize, h, ref } from 'vue'
import { Obj } from '@el-lowcode/utils'
import { ElButton, ElDialog, ElDrawer } from 'element-plus'

interface ShowDialogOpt {
  is?: 'el-dialog' | 'el-drawer'
}

export function showDialog(opt: ShowDialogOpt & Obj, slots) {
  opt = { draggable: true, ...opt }
  const vis = ref(true)
  return new Promise<void>((resolve, reject) => {
    const comp = { ElDialog, ElDrawer }[camelize(capitalize(opt.is || 'el-dialog'))] as typeof ElDialog

    const app = createApp(() => h('div', { tabindex: 0, onKeydown },
      h(comp, { modelValue: vis.value, ...opt, is: void 0, onClosed }, {
        footer: () => [h(ElButton, { onClick: esc }, 'Esc'), h(ElButton, { type: 'primary', onClick: () => resolve() }, 'Ctrl+S')],
        ...(typeof slots == 'function' ? { default: slots } : slots)
      }))
    )

    function onKeydown(e: KeyboardEvent) {
      if (!(e.key.toLowerCase() == 's' && e.ctrlKey)) return
      e.preventDefault()
      e.stopPropagation()
      resolve()
      vis.value = false
    }

    const el = document.createElement('div')
    app.mount(el)
    document.body.append(el)

    function esc() {
      vis.value = false
      reject()
    }

    function onClosed() {
      el.remove()
      app.unmount()
    }
  })
}
