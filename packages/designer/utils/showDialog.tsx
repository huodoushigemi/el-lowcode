import { createApp, getCurrentInstance, camelize, capitalize, h, ref, AppContext, render, inject } from 'vue'
import { Obj } from '@el-lowcode/utils'
import { ElButton, ElDialog, ElDrawer } from 'element-plus'

interface ShowDialogOpt {
  is?: 'el-dialog' | 'el-drawer'
  okText?: string
}

type Promise2 = Promise<any> & { resolve(), reject() }

export function useShowDialog() {
  const ins = getCurrentInstance()!
  return <T extends Parameters<typeof showDialog>>(opt: T[0], slots: T[1]) => showDialog(opt, slots, ins.appContext, ins.provides)
}

export function showDialog(opt: ShowDialogOpt & Obj, slots, appContext?: AppContext, provides?: Obj): Promise2 {
  opt = { draggable: true, ...opt }
  const vis = ref(true)
  const xxx = {} as any
  const ret = new Promise<void>((resolve, reject) => {
    const comp = { ElDialog, ElDrawer }[camelize(capitalize(opt.is || 'el-dialog'))] as typeof ElDialog

    const com = {
      setup() {
        if (appContext) getCurrentInstance()!.appContext = appContext
        if (provides) getCurrentInstance()!.provides = provides
        return () => h(
          'div',
          { tabindex: 0, onKeydown },
          h(comp, { modelValue: vis.value, ...opt, is: void 0, onClosed }, {
            footer: () => [h(ElButton, { onClick: esc }, 'Esc'), h(ElButton, { type: 'primary', onClick: ok }, opt.okText ?? 'Ctrl+S')],
            ...(typeof slots == 'function' ? { default: slots } : slots)
          })
        )
      }
    }

    const el = document.createElement('div')
    render(h(com), el)
    document.body.append(el)

    function onKeydown(e: KeyboardEvent) {
      if (!(e.key.toLowerCase() == 's' && e.ctrlKey)) return
      e.preventDefault()
      e.stopPropagation()
      ok()
    }

    function ok() {
      resolve()
      vis.value = false
    }

    function esc() {
      vis.value = false
      reject()
    }

    function onClosed() {
      render(null, el)
      el.remove()
    }

    xxx.resolve = ok
    xxx.reject = esc
  }) as Promise2

  Object.assign(ret, xxx)
  
  return ret
}
