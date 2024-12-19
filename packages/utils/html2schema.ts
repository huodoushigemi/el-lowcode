import { parseStringStyle } from '@vue/shared'

export function html2schema(html: string) {
  const dom = new DOMParser().parseFromString(html, 'text/html')
  const schema = { is: 'Page', children: [] } as any
  const queue = [schema]
  walk(
    Array.from(dom.documentElement.children),
    (node) => {
      const parent = queue[queue.length - 1]
      parent.children ??= []
      if (node.nodeType == 3) {
        if (!node.parentElement?.children.length) parent.children = node.textContent
        else parent.children.push({ is: 'span', children: node.textContent })
      }
      else if (node.nodeType == 1) {
        const el = node as HTMLElement
        const child = { is: el.tagName.toLowerCase() } as any
        parent.children.push(child)
        Object.values(el.attributes).forEach(e => child[e.name] = e.value)
        queue.push(child)

        if (child.style) child.style = parseStringStyle(child.style)

        if (child.is == 'svg') {
          child.innerHTML = el.innerHTML.trim()
          return false
        }
      }
    },
    (node) => {
      if (node.nodeType == 1) {
        queue.pop()
      }
    }
  )
  return schema
}

function walk(arr: Node[], enter: (node: Node) => boolean | void, leave) {
  arr.forEach((node) => {
    if (node.nodeType == 3 && !node.textContent?.trim()) return
    if (node.nodeType == 8) return

    const bool = enter(node)
    if (node.nodeType == 1 && bool !== false) {
      walk(Array.from(node.childNodes), enter, leave)
    }
    leave(node)
  })
}