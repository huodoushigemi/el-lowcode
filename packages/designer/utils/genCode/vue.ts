import { hyphenate, isArray, isObject, isOn, isPlainObject, isString, stringifyStyle } from '@vue/shared'
import { isExp, omit, unExp } from '@el-lowcode/utils'
import { BoxProps, DesignerCtx, DisplayNode } from '../../layout/interface'
import { objStringify } from '../index'

export async function vue(ctx: DesignerCtx): Promise<string> {
  const { template, script } = await vue$(ctx.rootNode)
  return `<template>\n${template}</template>\n\n<script setup>${script}</script>`
}

export function jsonRender(ctx: DesignerCtx) {
  const omitKey = new Set(['_id', 'lcd-absolute-layout'])
  return `<template>
  <Render v-bind="schema" />
</template>

<script setup>
import { Render } from 'el-lowcode'

const schema = ${JSON.stringify(ctx.root, (k, v) => omitKey.has(k) ? void 0 : v)}
</script>`
}

export async function vue$(rootNode: DisplayNode) {
  let xml = ``

  let deep = 0
  const indent = () => '  '.repeat(deep)
  
  function through(props: BoxProps, queue = [] as BoxProps[]) {
    const node = rootNode.keyed[props._id!]
    props = { ...props, ...node.config?.purify?.(props) }

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
    
    const { is = 'template', _id, vFor, vIf, vModels, scope, children, ...attrs } = props

    // process v-for
    if (vFor) {
      xml += `${indent()}<template v-for="(${vFor[1] || 'item'}, ${vFor[2] || 'index'}) in ${unExp(vFor[0])}">\n`
      deep += 1
      through({ ...props, vFor: void 0 }, queue)
      deep -= 1
      xml += `${indent()}</template>\n`
      return
    }
    
    xml += `${indent()}<${hyphenate(is)}` 
    
    // process v-if
    if (vIf) xml += ` v-if="${unExp(vIf)}"`

    // process v-model
    for (let k in vModels) {
      let [exp, modifiers, event] = vModels[k]
      if (event) {
        xml += ` :${k}="${unExp(exp)}" :${event[0]}="${`v => ${unExp(exp)} = (${unExp(event[1])})(v)`}"`
      } else {
        k = k == 'modelValue' ? '' : `:${k}`
        xml += ` v-model${k}${modifiers?.length ? '.' + modifiers.join('.') : ''}="${unExp(exp).replaceAll('?.', '.')}"`
      }
    }
    
    for (let k in attrs) {
      let v = attrs[k]
      // k = isOn(k) ? `@${hyphenate(k).slice(3)}` : k
      if (k.includes('lcd-')) {
        continue
      }
      else if (isString(v)) {
        if (isExp(v)) {
          k = isOn(k) ? `@${hyphenate(k).slice(3)}` : `:${k}`
          v = v.replaceAll('\n', `\n${indent()}`)
          xml += ` ${k}="${unExp(v)}"`
        } else {
          xml += ` ${k}="${v}"`
        }
      }
      else if (typeof v == 'number') {
        xml += ` :${k}="${v}"`
      }
      else if (typeof v == 'boolean') {
        xml += v ? ` ${k}` : ` :${k}="false"`
      }
      else if (v) {
        xml += ` :${k}="${objStringify(v, v => isExp(v) ? unExp(v) : JSON.stringify(v).replaceAll('"', "'"))}"`
      }
    }

    // process v-slot
    if (isPlainObject(atChildren)) {
      const key = Object.keys(atChildren).find(e => atChildren[e]._id == _id)
      xml += scope ? ` #${key}="${scope}"` : ` #${key}`
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
        xml += `\n${indent()}  {{ ${unExp(children).trim()} }}\n${indent()}`
      }
      else {
        xml += children
      }
    }
    // process end tag
    xml = children != null ? `${xml}</${hyphenate(is)}>\n` : `${xml.slice(0, -1)} />\n`
  }

  const { designer, state, ds, css, plugins, ...root } = JSON.parse(JSON.stringify(rootNode.data))
  
  through(root)

  let js = `\nimport { reactive, computed, toRef } from 'vue'\nimport { useConfigProvider } from 'el-lowcode'`

  let params = objStringify(JSON.parse(JSON.stringify({ state, ds, css, plugins })), v => {
    return (
      isExp(v) ? `toRef(() => ${unExp(v)})` :
      isString(v) ? JSON.stringify(v) :
      v
    )
  })

  params = await format(`const { state, ds } = useConfigProvider(${params})`)
  
  js += `\n\n${params.trim()}`
  
  return { template: xml, script: js  }
}

async function format(code) {
  const prettier = await import('https://unpkg.com/prettier@3.4.2/standalone.mjs')
  const Babel = await import('https://unpkg.com/prettier@3.4.2/plugins/babel.mjs').then(e => e.default)
  const Estree = await import('https://unpkg.com/prettier@3.4.2/plugins/estree.mjs').then(e => e.default)
  return await prettier.format(code, { parser: 'babel', semi: false, singleQuote: true, plugins: [Babel, Estree] })
}