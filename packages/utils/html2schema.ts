import { capitalize, isArray, isFunction, isOn, parseStringStyle } from '@vue/shared'
import { IDom, parse, stringify } from 'html-parse-string'
import { isExp, wrapExp, deepWrapExp } from './execExp'

export async function html2schema(html: string): Promise<any[]> {
  const parseExp = await deepWrapExp()
  
  const dom = parse(html)
  const schema = { is: 'div', children: [] } as any
  const queue = [schema]
  domWalk(dom, function aaa(node, parentNode) {
    const parent = queue[queue.length - 1]
    const attrs = Object.fromEntries((node.attrs ??= []).map(e => [e.name, e.value]))
    let child = {} as any
  
    if (node.type == 'text') {
      let content = node.content?.trim()
      content = isExp(content) ? wrapExp(content) : content?.trim()
      if (parentNode?.children.length == 1) {
        parent.children = isVslot(parentNode) ? [{ is: 'span', children: content }] : content
        return
      }
      else {
        child = { is: 'span', children: content }
      }
    }
    
    // v-slot
    if (isVslot(node)) {
      const name = node.attrs.find(e => e.name[0] == '#')?.name.slice(1) ?? 'default'
      parent.children = isArray(parent.children) ? { default: { children: parent.children } } : (parent.children ?? {})
      parent.children[name] = child = { scope: attrs[`#${name}`] || void 0 }
    }
    else if (parentNode?.children.some(e => isVslot(e))) {
      if (node.name == 'template') {
        if (!node.children.length) return
        parentNode.children.splice(parentNode.children.indexOf(node), 1, ...node.children)
        return aaa(node.children[0], parentNode)
      }
      child.is ??= node.name
      parent.children.default ??= { children: [] }
      parent.children.default.children.push(child)
    }
    else {
      child.is ??= node.name
      parent.children ??= []
      parent.children.push(child)
    }
    
    // props
    const props = {} as any
    node.attrs.forEach(({ name, value }) => {
      if (name == 'v-if') {
        props.vIf = wrapExp(value)
      }
      else if (name == 'v-for') {
        const [arg, exp] = value.trim().split(/\s+in\s+/)
        const [item, index] = arg[0] == '(' ? arg.slice(1, -1).split(/\s*,\s*/) : [arg]
        props.vFor = [wrapExp(exp), item, index].filter(e => e)
      }
      else if (name.startsWith('v-model')) {
        const [, key = 'modelValue'] = name.match(/v-model:?(.*)?/) as string[]
        props.vModels ??= {}
        props.vModels[key] = [value]
      }
      else if (name.startsWith('v-on:') || name[0] == '@' || isOn(name)) {
        const [, , key] = name.match(/^(v-on:|@|on)(.+)/) as string[]
        props[`on${capitalize(key)}`] = wrapExp(value)
      }
      else if (name[0] == ':' || name[0] == '.') {
        props[name.slice(1)] = parseExp(value)
      }
      else {
        if (name[0] == '#') return
        props[name] = value
      }
    })

    Object.assign(child, props)

    if (child.style) child.style = parseStringStyle(child.style)
      
    if (child.is == 'svg') {
      child.innerHTML = stringify(node.children)
      return false
    }

    if (node.voidElement === false) {
      child.children = []
    }

    queue.push(child)
    return () => queue.pop()
  })
  return JSON.parse(JSON.stringify(schema.children))
}

function isVslot(node: IDom, parent?: IDom) {
  return node.name == 'template' && node.attrs.some(e => e.name[0] == '#')
}

function domWalk(arr: IDom[], enter: (node: IDom, parent?: IDom) => any, parent?: IDom) {
  const fragments = ['html', 'body']
  for (let i = 0; i < arr.length; i++) {
    let node = arr[i]
    
    if (node.type == 'comment') continue
  
    if (fragments.includes(node.name)) {
      domWalk(Array.from(node.children), enter, node)
      continue
    }
  
    if (node.name == 'head' && !node.children.length) {
      continue
    }
  
    const ret = enter(node as any, parent)
    node = arr[i]
    if (ret !== false && node.children) {
      domWalk(Array.from(node.children), enter, node)
    }
    isFunction(ret) && ret()
  }
}
