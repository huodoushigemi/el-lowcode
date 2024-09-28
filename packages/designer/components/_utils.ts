import { v4 as uuidv4 } from 'uuid'
import { Obj, treeUtils } from '@el-lowcode/utils'
import { BoxProps, DesignerCtx, Widget } from '../'

export const parseAttrs = (config: Widget, ctx: DesignerCtx): BoxProps => {
  const attrs = { is: config.is } as BoxProps
  Object.assign(attrs, config.defaultProps?.(ctx))
  treeUtils.flat([attrs]).forEach(e => e._id ||= uuidv4())
  return attrs
}

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