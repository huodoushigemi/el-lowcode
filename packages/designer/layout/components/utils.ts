import { isArray, isBooleanAttr, isPlainObject, isString } from '@vue/shared'
import { BoxProps, DesignerCtx } from '../interface'
import { execExp, expReg } from '@el-lowcode/utils'

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
    const style = desingerCtx.active.style ??= {}
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

export function genVueCode(designer: DesignerCtx) {
  let xml = ``
  const vars = []
  function through(props: BoxProps, queue = [] as BoxProps[]) {
    const { is, _id, children, $, ...attrs } = props
    const indent = '  '.repeat(queue.length)

    xml += `${indent}<${is}`
    for (const k in attrs) {
      const v = attrs[k]
      if (isString(v)) {
        if (expReg.test(v)) {
          xml += ` :${k}="${JSON.stringify(v.match(expReg)![1])}"`
        }
        else {
          xml += ` ${k}=${JSON.stringify(v)}`
        }
      }
      else if (typeof v == 'number') {
        xml += ` :${k}="${v}"`
      }
      else if (typeof v == 'boolean') {
        xml += v ? ` ${k}` : ` :${k}="false"`
      }
      else if (v) {
        xml += ` :${k}=${JSON.stringify(JSON.stringify(v))}`
      }
    }

    xml += `>`
    if (isArray(children)) {
      xml += '\n'
      queue.push(props)
      children.forEach(e => through(e, queue))
      queue.pop()
      xml += indent
    }
    else if (isPlainObject(children)) {
      
    }
    else if (isString(children)) {
      if (expReg.test(children)) {
        xml += `\n${indent}  {{ ${JSON.stringify(children.match(expReg)![1])} }}\n${indent}`
      }
      else {
        xml += children.length <= 20 ? children : `\n${indent}  ${children}\n${indent}`
      }
    }
    // process end tag
    xml = children != null ? `${xml}</${is}>\n` : `${xml.slice(0, -1)} />\n`
  }

  through(designer.root)

  return `<template>
${xml}</template>

<script setup>

</script>`
}