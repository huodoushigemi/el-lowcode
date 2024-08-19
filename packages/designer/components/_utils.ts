import { v4 as uuidv4 } from 'uuid'
import { Obj, unFn, treeUtils } from '@el-lowcode/utils'
import { BoxProps, Widget } from '../'
import { el_lowcode_widgets } from './el_lowcode_widgets'

export const parseAttrs = (config: Widget, extra?: Obj): BoxProps => {
  const attrs = { is: config.is } as BoxProps
  Object.assign(attrs, config.defaultProps?.(), extra)
  treeUtils.flat([attrs]).forEach(e => e._id ||= uuidv4())
  return attrs
}

export const sloveConfig = (el?: BoxProps, widgets: Record<string, Widget | undefined> = el_lowcode_widgets) => {
  if (!el) return
  const is = el.el?.is || el.is
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