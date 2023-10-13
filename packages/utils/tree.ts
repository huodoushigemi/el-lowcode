import { isArray } from '@vue/shared'

const PROPS = {
  key: 'key',
  children: 'children',
}

function find<T>(tree: T[], val: any, props: Partial<typeof PROPS>) {
  const attrs = { ...PROPS, ...props }
  const queue = [...tree] as T[]
  for (let i = 0; i < queue.length; i++) {
    const item = queue[i]
    if (item[attrs.key] === val) return item
    isArray(item[attrs.children]) && queue.push(...item[attrs.children])
  }
}
function flat<T>(tree: T[], childrenKey = PROPS.children) {
  const queue = [...tree]
  for (let i = 0; i < queue.length; i++) {
    const item = queue[i]
    isArray(item[childrenKey]) && queue.push(...item[childrenKey])
  }
  return queue
}

function changeProp<T>(tree: T[], replaces: [string, string, ((val: any, item: T) => any)?][], childrenKey = PROPS.children) {
  const clone = (tree: T[]) => tree.map(e => {
    const cloned = { ...e }
    replaces.forEach(([key, finalKey, fn]) => {
      delete cloned[key]
      cloned[finalKey] = fn ? fn(e[key], e) : e[key]
    })
    if (isArray(cloned[childrenKey])) cloned[childrenKey] = clone(cloned[childrenKey])
    return cloned
  })
  return clone(tree)
}

export const treeUtils = {
  find,
  flat,
  changeProp
}
