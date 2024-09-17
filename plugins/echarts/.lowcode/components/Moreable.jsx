import { defineComponent, nextTick, ref } from 'vue'
import { isArray } from '@vue/shared'
import { useResizeObserver } from '@vueuse/core'
import { ElPopover } from 'element-plus'

export default defineComponent({
  props: {
    line: { type: Number, default: 1 },
  },
  setup(props, { slots }) {
    const elRef = ref()
    let all = []

    const index = ref(Infinity)
    let layouting = false

    useResizeObserver(elRef, async () => {
      const el = elRef.value
      if (!el) return
      if (layouting) return
      layouting = true

      const list = [...el.children]

      index.value = Infinity
      await nextTick()
      
      const style = getComputedStyle(el)
      const pl = parseInt(style.paddingLeft), pr = parseInt(style.paddingRight), pt = parseInt(style.paddingTop), pb = parseInt(style.paddingBottom)
      let i = 0
      let x = pl, line = 1
      const rects = []
      for (; i < list.length; i++) {
        const rect = list[i].getBoundingClientRect()
        rects.push(rect)
        if (x <= rect.x) {
        } else if (line < props.line) {
          line++
        } else {
          if (el.getBoundingClientRect().right - pr - 28 >= rects[i - 1].right) {
            index.value = i
          } else {
            index.value = i - 1
          }
          break
        }
        x = rect.x
      }

      layouting = false
    })

    function flatChildren(vnodes) {
      if (!isArray(vnodes)) return []
      const ret = []
      vnodes?.forEach(e => {
        if (typeof e.type == 'symbol') ret.push(...flatChildren(e.children))
        else ret.push(e)
      })
      return ret
    }

    return () => {
      const children = flatChildren(slots.default())
      
      return (
        <div ref={elRef} class='flex flex-wrap gap-4'>
          {children.slice(0, index.value)}
          {index.value != Infinity && (
            <ElPopover trigger="click" width={250} hide-after={0} persistent={false} offset={6} teleported={false} popper-class='fixed!'>{{
              reference: () => (
                <div class='w24 h24 bg-hover'>
                  <div class='i-material-symbols-more-horiz wfull hfull op20' />
                </div>
              ),
              default: () => (
                <div class='flex flex-wrap gap-4'>
                  {children.slice(index.value)}
                </div>
              )
            }}
            </ElPopover>
          )}
        </div>
      )
    }
  }
})