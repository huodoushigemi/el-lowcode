import { isArray, isPlainObject, isString } from '@vue/shared'
import { expReg } from '@el-lowcode/utils'
import { BoxProps, DesignerCtx } from '../../layout/interface'
import { objStringify } from '../index'

export function vue(ctx: DesignerCtx) {
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
    const { is, _id, children, $, ...attrs } = ctx.keyedCtx[props._id].config?.purify?.(props) ?? props
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
        xml += expReg.test(v) ? ` :${k}=${JSON.stringify(parseExp(v).replaceAll(`"`, `'`))}` : ` ${k}=${JSON.stringify(v)}`
      }
      else if (typeof v == 'number') {
        xml += ` :${k}="${v}"`
      }
      else if (typeof v == 'boolean') {
        xml += v ? ` ${k}` : ` :${k}="false"`
      }
      else if (v) {
        xml += ` :${k}=${JSON.stringify(objStringify(v, v => expReg.test(v) ? parseExp(v) : JSON.stringify(v)).replaceAll(`"`, `'`))}`
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
      // todo
    }
    else if (isString(children)) {
      if (expReg.test(children)) {
        xml += `\n${indent}  {{ ${parseExp(children)} }}\n${indent}`
      }
      else {
        xml += children.length <= 20 ? children : `\n${indent}  ${children}\n${indent}`
      }
    }
    // process end tag
    xml = children != null ? `${xml}</${is}>\n` : `${xml.slice(0, -1)} />\n`
  }

  const { designer, state, plugins, ...root } = ctx.root
  
  through(root)

  let js = `<script setup>
import { reactive, getCurrentInstance } from 'vue'

const app = getCurrentInstance().appContext.app
${plugins.map(url => `import(/* @vite-ignore */ '${url}/index.js').then(e => app.use(e.default))`).join('\n')}`

  if (ctx.root.state) {
    js += `\n\nconst state = reactive(${JSON.stringify(ctx.root.state, void 0, ' ')})`
  }

  if (vars.length) {
    js += `\n\n${vars.map(e => `const ${e[0]} = ${e[1]}`).join('\n\n')}`
  }

  js += `\n</script>`
  

  return `<template>\n${xml}</template>\n\n${js}`
}

export function jsonRender(ctx: DesignerCtx) {
  const omitKey = new Set(['_id', 'data-absolute-layout'])
  return `<template>
  <ConfigProvider v-bind="schema">
    <Render v-bind="schema" />
  </ConfigProvider>
</template>

<script setup>
import { ConfigProvider, Render } from 'el-lowcode'

const schema = ${JSON.stringify(ctx.root, (k, v) => omitKey.has(k) ? void 0 : v)}
</script>`
}