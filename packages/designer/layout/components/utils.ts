import { isArray, isBooleanAttr, isObject, isPlainObject, isString } from '@vue/shared'
import { execExp, expReg, deepClone } from '@el-lowcode/utils'
import { BoxProps, DesignerCtx } from '../interface'

export function parseTransform(str = '') {
  const matched = str.match(/translate\(([^\)]+?)\)/)
  const xy = matched?.[1].split(',').map(e => parseInt(e)) || [0, 0]
  return {
    x: xy[0],
    y: xy[1]
  }
}

export function useMoveable(desingerCtx: DesignerCtx) {
  function onDragStart(e) {
    desingerCtx.draggedId = e.target.getAttribute('_id')
  }
  function onDrag(e) {
    e.target.style.transform = e.transform
  }
  function onDragEnd(e) {
    const style = desingerCtx.active!.data.style ??= {}
    style.transform = e.target.style.getPropertyValue('transform')
    desingerCtx.draggedId = undefined
  }
  return {
    // onResizeStart,
    // onResize,
    // onResizeEnd,
    // onRotateStart,
    // onRotate,
    // onRotateEnd,
    onDragStart,
    onDrag,
    onDragEnd,
  }
}
