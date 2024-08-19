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

function objStringify(obj, fn) {
  if (isArray(obj)) {
    return `[${obj.map(e => objStringify(e, fn)).join(', ')}]`
  } else if (isObject(obj)) {
    let str = '{'
    for (const k in obj) str += ` ${k}: ${objStringify(obj[k], fn)},`
    str = str.replace(/,$/, '') + ' }'
    return str
  } else {
    return fn(obj)
  }
}

export function genVueCode(designer: DesignerCtx) {
  let xml = ``
  const vars = [] as any
  function parseExp(v) {
    if (isString(v)) {
      const matched = v.match(expReg)
      if (!matched) return v
      const exp = matched[1].trim()
      if (exp.includes("\n")) {
        const varname = `$_var${vars.length}`
        vars.push([varname, `() => ${exp}`])
        return `${varname}()`
      } else {
        return exp
      }
    }
    return v
  }
  function through(props: BoxProps, queue = [] as BoxProps[]) {
    const { is, _id, children, $, ...attrs } = designer.keyedCtx[props._id].config?.purify?.(props) ?? props
    const indent = '  '.repeat(queue.length)

    xml += `${indent}<${is}`

    if ($) {
      // v-if
      if ($.condition) xml += ` v-if=${JSON.stringify(parseExp($.condition).replaceAll(`"`, `'`))}`
      // todo v-for
      if ($.loop) {}
    }
    
    for (const k in attrs) {
      const v = attrs[k]
      if (isString(v)) {
        xml += expReg.test(v) ? ` :${k}=${JSON.stringify(parseExp(v))}` : ` ${k}=${JSON.stringify(v)}`
      }
      else if (typeof v == 'number') {
        xml += ` :${k}="${v}"`
      }
      else if (typeof v == 'boolean') {
        xml += v ? ` ${k}` : ` :${k}="false"`
      }
      else if (v) {
        xml += ` :${k}=${JSON.stringify(objStringify(v, v => JSON.stringify(parseExp(v))).replaceAll(`"`, `'`))}`
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
        xml += `\n${indent}  {{ ${children.match(expReg)![1]} }}\n${indent}`
      }
      else {
        xml += children.length <= 20 ? children : `\n${indent}  ${children}\n${indent}`
      }
    }
    // process end tag
    xml = children != null ? `${xml}</${is}>\n` : `${xml.slice(0, -1)} />\n`
  }

  through(designer.root)

  let js = `<script setup>
import { ref, reactive } from 'vue'`

  if (designer.root.state) {
    js += `\n\nconst state = reactive(${JSON.stringify(designer.root.state, void 0, ' ')})`
  }

  if (vars.length) {
    js += `\n\n${vars.map(e => `const ${e[0]} = ${e[1]}`).join('\n\n')}`
  }

  js += `\n</script>`
  

  return `<template>\n${xml}</template>\n\n${js}`
}

export function genJSONRenderCode(designer: DesignerCtx) {
  return `<template>
  <ConfigProvider v-bind="schema">
    <Render v-bind="schema" />
  </ConfigProvider>
</template>

<script setup>
import { ConfigProvider, Render } from 'el-lowcode'

const schema = ${JSON.stringify(designer.root)}
</script>`
}