export function parseTransform(str = '') {
  const matched = str.match(/translate\(([^\)]+?)\)/)
  const xy = matched?.[1].split(',').map(e => parseInt(e)) || [0, 0]
  return {
    x: xy[0],
    y: xy[1]
  }
}

export function useMoveable(desingerCtx) {
  function onDragStart(e) {
    designerCtx.draggedId = e.target.getAttribute('_id')
  }
  function onDrag(e) {
    e.target.style.transform = e.transform
  }
  function onDragEnd(e) {
    const style = designerCtx.active.style ??= {}
    style.transform = e.target.style.getPropertyValue('transform')
    designerCtx.draggedId = undefined
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