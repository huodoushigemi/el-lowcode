import { ElCollapse, ElCollapseItem } from 'element-plus'
import { v4 as uuidv4 } from 'uuid'
import { Obj, unFn, treeUtils } from '@el-lowcode/utils'
import { normalizeItem } from 'el-form-render'
import { ENUM_SIZE } from '../const'
import { BoxProps, ElLowcodeConfig } from './type'
import { el_lowcode_widgets } from './el_lowcode_widgets'

export const parseAttrs = (config: ElLowcodeConfig, extra?: Obj): BoxProps => {
  const attrs = { is: config.is } as BoxProps
  Object.assign(attrs, config.defaultProps?.(), extra)
  treeUtils.flat([attrs]).forEach(e => e._id ||= uuidv4())
  return attrs
}

export const sloveConfig = (el?: BoxProps) => {
  if (!el) return
  const is = el.el?.is || el.is
  if (!el_lowcode_widgets[is]) console.error(`${is}: Unable to find a matching el_lowcode configuration of ${is}`, el)
  return unFn(el_lowcode_widgets[is])
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