import { treeUtils, uid } from '@el-lowcode/utils'
import { BoxProps, DesignerCtx, Widget } from '../'

export const sloveConfig = (el: BoxProps, widgets: Record<string, Widget | undefined>) => {
  const is = el.is
  if (!widgets[is]) console.error(`${is}: Unable to find a matching el_lowcode configuration of ${is}`, el)
  return widgets[is]
}

const importCache = {} as Record<string, Promise<any> | undefined>
export function importJs(js: string) {
  if (importCache[js]) return importCache[js]
  let url = ''
  if (/^https?:/.test(js)) {
    url = js
  } else {
    const blob = new Blob([js], { type: "text/javascript" })
    url = URL.createObjectURL(blob)
  }
  return importCache[js] = import(/* @vite-ignore */ url)
}