<script setup lang="ts">
import { cloneVNode, effectScope, inject, mergeProps, watchPostEffect } from 'vue'
import { isArray } from '@vue/shared'
import { processProps } from 'el-lowcode'
import { createRender } from '@el-lowcode/render'
import type { DesignerCtx, BoxProps, DisplayNode } from '../designer/layout/interface'
import { createProcess } from './process'

type El = Element

defineOptions({
  inheritAttrs: false
})

const props = defineProps({
  root: Object
})

defineRender(() => cloneVNode(Render(props.root || { is: 'div' }), { 'lcd-root': '' }))

const lcd = inject('designerCtx') as DesignerCtx

const wm = new WeakMap()
const EMPTY = Symbol()

window.processProps = processProps

const processer = createProcess(lcd, [])

const Render = createRender({
  processProps: (_props: any, vars, { provide }) => {
    // return _props
    if (_props[EMPTY]) return _props
    if (!_props.is && _props.vFor) return processProps(_props, vars)
    if (vars.__not_index_0_in_for) return processProps(_props, vars)
    
    if (_props.vFor && vars[_props.vFor[2] || 'index'] != 0) {
      provide({ __not_index_0_in_for: true })
      return mergeProps(processProps(_props, vars), { style: 'pointer-events: none;' })
    }
    
    // return wm.get(_props)?.value || wm.set(_props, computed(() => {
      const node = lcd.keyedNode[_props._id] // todo

      if (node.vSlotName && (node.parent!.config?.getScopeIndex?.(node, vars) ?? 0) != 0) {
        provide({ __not_index_0_in_for: true })
        return mergeProps(processProps(_props, vars), { style: 'pointer-events: none;' })
      }

      node.vars = vars
      let { children, ...props } = node.$data

      const ctx = setup(node)

      if (isArray(children)) {
        if (!children.length) {
          children = [{ ref: ctx.emptyRef, is: 'div', 'lcd-id': props._id, class: 'empty-placeholder', [EMPTY]: 1 } as any]
        }
        else {
          sortAbsolute(children)
        }
      }

      // 合并属性
      props.children = children
      props = mergeProps(ctx.attrs, props)

      return props
    // })).get(_props).value
  }
})

const propsCtx = new WeakMap()

function setup(node: DisplayNode) {
  if (propsCtx.has(node)) return propsCtx.get(node)

  if (node.vSlotName) {
    const ret = { emptyRef: node.emptyRef }
    propsCtx.set(node, ret)
    return ret
  }

  const scope = effectScope()
  scope.run(() => {
    watchPostEffect(() => {
      if (node.detached) {
        propsCtx.delete(node)
        return scope?.stop()
      }
      ;([{ ...node.parent?.children as any }, node.els])

      const xxx = () => node.setAttrs({
        draggable: (!node.isAbs && !node.drag.disabled) + '',
        'lcd-id': node.id
      })

      xxx()
      setTimeout(xxx, 0) // fix: el-table-column | el-descriptions-item | el-tab-pane
    })
  })

  const ret = { emptyRef: node.emptyRef, attrs: { ref: node.ref, key: node.id } }
  propsCtx.set(node, ret)
  return ret
}

// 将 absolute 的元素移动到前面
function sortAbsolute(arr: BoxProps[]) {
  let ii = -1, bool = false
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].style?.position != 'absolute') continue
    if (i - ii > 1) { bool = true; break }
    ii = i
  }
  if (bool) {
    const c1 = arr.filter(e => e.style?.position == 'absolute')
    const c2 = arr.filter(e => e.style?.position != 'absolute')
    arr.length = 0
    arr.push(...c1, ...c2)
  }
}
</script>
