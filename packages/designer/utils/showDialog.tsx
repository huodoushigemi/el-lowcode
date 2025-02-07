import { createApp, getCurrentInstance, camelize, capitalize, h, ref } from 'vue'
import { Obj } from '@el-lowcode/utils'
import { ElButton, ElDialog, ElDrawer } from 'element-plus'

interface ShowDialogOpt {
  is?: 'el-dialog' | 'el-drawer'
}

type Promise2 = Promise<any> & { resolve(), reject() }

export function showDialog(opt: ShowDialogOpt & Obj, slots): Promise2 {
  opt = { draggable: true, ...opt }
  const vis = ref(true)
  const xxx = {} as any
  const ret = new Promise<void>((resolve, reject) => {
    const comp = { ElDialog, ElDrawer }[camelize(capitalize(opt.is || 'el-dialog'))] as typeof ElDialog

    const app = createApp(() => h('div', { tabindex: 0, onKeydown },
      h(comp, { modelValue: vis.value, ...opt, is: void 0, onClosed }, {
        footer: () => [h(ElButton, { onClick: esc }, 'Esc'), h(ElButton, { type: 'primary', onClick: ok }, 'Ctrl+S')],
        ...(typeof slots == 'function' ? { default: slots } : slots)
      }))
    )

    function onKeydown(e: KeyboardEvent) {
      if (!(e.key.toLowerCase() == 's' && e.ctrlKey)) return
      e.preventDefault()
      e.stopPropagation()
      ok()
    }

    const el = document.createElement('div')
    app.mount(el)
    document.body.append(el)

    function ok() {
      resolve()
      vis.value = false
    }

    function esc() {
      vis.value = false
      reject()
    }

    function onClosed() {
      el.remove()
      app.unmount()
    }

    xxx.resolve = ok
    xxx.reject = esc
  }) as Promise2

  Object.assign(ret, xxx)
  
  return ret
}
