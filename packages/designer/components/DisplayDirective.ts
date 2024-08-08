import { defineComponent, withDirectives, toRef, vShow, renderSlot, ref, watch, watchEffect } from 'vue'
import type { PropType } from 'vue'

export type DisplayDirectiveType = 'if' | 'show' | 'lazy:show'

const DisplayDirective = defineComponent({
  name: 'display-directive',
  props: {
    visible: Boolean,
    type: { type: String as PropType<DisplayDirectiveType>, default: 'if' }
  },
  setup(props, { slots }) {
    const untilTruthy = ref(props.visible)

    watchEffect(() => props.visible && (untilTruthy.value ||= true))

    return () => {
      const { visible } = props
      switch (props.type) {
        case 'if':
          return visible ? slots.default?.() : undefined
        case 'show':
          return withDirectives(slots.default!()[0], [[vShow, visible]])
        case 'lazy:show':
          return untilTruthy.value ? withDirectives(slots.default!()[0], [[vShow, visible]]) : undefined
      }
    }
  }
})

export default DisplayDirective