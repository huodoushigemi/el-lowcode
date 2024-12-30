import { isArray, isObject, isPlainObject, isString, objectToString, stringifyStyle } from '@vue/shared'
import { expReg, isExp, omit, unExp } from '@el-lowcode/utils'
import { BoxProps, DesignerCtx } from '../../layout/interface'
import { objStringify } from '../index'

export async function vue(ctx: DesignerCtx): Promise<string> {
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

  let deep = 0
  const indent = () => '  '.repeat(deep)
  
  function through(props: BoxProps, queue = [] as BoxProps[]) {
    props = ctx.keyedNode[props._id!].config?.purify?.(props) ?? props

    const atChildren = queue[queue.length - 1]?.children

    // transform style
    if (props.style) {
      if (Object.keys(props.style).length == 0) delete props.style
      else if (Object.values(props.style).every(e => !isExp(e))) props.style = stringifyStyle(props.style).replaceAll(';', '; ').trim()
    }

    // pure text
    if (isArray(props.children) && props.children.length == 1) {
      const el = props.children[0]
      if (el.is == 'span' && isString(el.children) && Object.keys(omit(el, ['is', '_id'])).length == 1) {
        props.children = el.children
      }
    }
    
    const { is = 'template', _id, vFor, vIf, vModels, vSlot, children, ...attrs } = props

    // process v-for
    if (vFor) {
      xml += `${indent()}<template v-for="(${vFor[1]}, ${vFor[2]}) in ${unExp(vFor[0])}">`
      deep += 1
      through({ ...props, vFor: void 0 }, queue)
      deep -= 1
      xml += `${indent()}</template>`
    }
    
    xml += `${indent()}<${is}`
    
    // process v-if
    if (vIf) xml += ` v-if=${JSON.stringify(parseExp(vIf).replaceAll(`"`, `'`))}`

    // process v-model
    for (let k in vModels) {
      let [exp, modifiers, event] = vModels[k]
      if (event) {
        xml += ` :${k}=${JSON.stringify(unExp(exp))} :${event[0]}=${JSON.stringify(`v => ${unExp(exp)} = (${event[1]})(v)`)}`
      } else {
        k = k == 'modelValue' ? '' : `:${k}`
        xml += ` v-model${k}${modifiers?.length ? '.' + modifiers.join('.') : ''}=${JSON.stringify(unExp(exp))}`
      }
    }
    
    for (const k in attrs) {
      const v = attrs[k]
      if (k.includes('lcd-')) {
        continue
      }
      else if (isString(v)) {
        xml += isExp(v) ? ` :${k}=${JSON.stringify(parseExp(v).replaceAll(`"`, `'`))}` : ` ${k}=${JSON.stringify(v)}`
      }
      else if (typeof v == 'number') {
        xml += ` :${k}="${v}"`
      }
      else if (typeof v == 'boolean') {
        xml += v ? ` ${k}` : ` :${k}="false"`
      }
      else if (v) {
        xml += ` :${k}=${JSON.stringify(objStringify(v, v => isExp(v) ? parseExp(v) : JSON.stringify(v)).replaceAll(`"`, `'`))}`
      }
    }

    // process v-slot
    if (isPlainObject(atChildren)) {
      const key = Object.keys(atChildren).find(e => atChildren[e]._id == _id)
      xml += vSlot ? ` #${key}="${vSlot}"` : ` #${key}`
    }

    xml += `>`
    if (isObject(children)) {
      xml += '\n'
      queue.push(props)
      deep += 1
      Object.values(children).forEach(e => through(e, queue))
      deep -= 1
      queue.pop()
      xml += indent()
    }
    else if (isString(children)) {
      if (isExp(children)) {
        xml += `\n${indent()}  {{ ${unExp(children)} }}\n${indent()}`
      }
      else {
        xml += children
      }
    }
    // process end tag
    xml = children != null ? `${xml}</${is}>\n` : `${xml.slice(0, -1)} />\n`
  }

  const { designer, state, ds, css, plugins, ...root } = JSON.parse(JSON.stringify(ctx.root))
  
  through(root)

  let js = `<script setup>\nimport { reactive, computed } from 'vue'\nimport { useConfigProvider } from 'el-lowcode'`

  let params = objStringify(JSON.parse(JSON.stringify({ state, ds, css, plugins })), v => {
    return (
      isExp(v) ? `computed(() => ${unExp(v)})` :
      isString(v) ? JSON.stringify(v) :
      v
    )
  })

  // const prettier = await import('https://unpkg.com/prettier@3.4.2/standalone.mjs')
  // params = await prettier.format(`reactive(${params})`, { semi: false, singleQuote: false })
  
  js += `\n\nconst { state, ds } = useConfigProvider(${params})`

  if (vars.length) {
    js += `\n\n${vars.map(e => `const ${e[0]} = ${e[1]}`).join('\n\n')}`
  }

  js += `\n</script>`
  

  return `<template>\n${xml}</template>\n\n${js}`
}

export function jsonRender(ctx: DesignerCtx) {
  const omitKey = new Set(['_id', 'data-absolute-layout'])
  return `<template>
  <Render v-bind="schema" />
</template>

<script setup>
import { Render } from 'el-lowcode'

const schema = ${JSON.stringify(ctx.root, (k, v) => omitKey.has(k) ? void 0 : v)}
</script>`
}