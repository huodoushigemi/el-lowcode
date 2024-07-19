<script setup lang='jsx'>
import { ref, useSlots, watchEffect } from 'vue'
import { onClickOutside, refWithControl, useEventListener } from '@vueuse/core'
import { useSortable } from '@vueuse/integrations/useSortable.mjs'
import { useEdit } from './hooks';

const props = defineProps({
  tabs: Array,
  editable: Boolean,
  new: Function,
  props: Object,
  showClose: Boolean
})

const slots = useSlots()

const active = refWithControl()
let children = []

const edit = ref(false)
const { inputRef } = useEdit(ref(), () => edit.value = false)

const navRef = ref()
const sortable = useSortable(navRef, () => props.tabs, { draggable: '.tab', animation: 100 })

watchEffect(() => sortable.option('disabled', !props.editable))

function onPlus() {
  const { tabs } = props
  if (props.new) tabs.push(props.new(tabs.length))
  else tabs.push({})
}

function onDown(e) {
  if (e.button == 1) {
    e.stopPropagation()
    e.preventDefault()
  }
}

function onTab(e, k, i) {
  switch (e.button) {
    case 0:
      active.value = k
      break;
    case 1:
      e.stopPropagation()
      e.preventDefault()
      del(i)
      break;
  }
}

function del(i) {
  const { tabs }  = props
  if (i == children.length - 1) {
    tabs.splice(i, 1)
    active.value = children[children.length - 2].props.key
  } else {
    tabs.splice(i, 1)
    active.value = children[i + 1].props.key
  }
}

defineRender(() => {
  const { tabs, editable, showClose } = props
  children = slots.default?.()
  children.forEach((e, i) => {
    e.props.key ??= e.props.label ?? `tab-${i}`
  })

  if (active.value == null) {
    active.lay(children[0].props.key)
  }

  return (
    <div class={['Tabs', editable && 'is-editable']}>
      <div class='tab_nav flex' ref={navRef}>
        {children.map((c, i) => (
          <div key={c.props.key} class={['tab', active.value == c.props.key && 'is-active']} onPointerdown={onDown} onPointerup={e => onTab(e, c.props.key, i)} onDblclick={() => edit.value = true}>
            {c.props.label}
            {active.value == c.props.key && edit.value && <input class='absolute left-0 p4 wfull lh-22 outline-0' ref={inputRef} value={c.props.label} onChange={() => {}} />}
            {showClose && <div class='i-ep-close hover:i-ep:circle-close-filled flex aic jcc ml4 -mr4 text-10' onClick={(e) => (e.stopPropagation(), del(i))} />}
          </div>
        ))}
        <div class='sticky right-0 flex aic mla px4 bg-inherit! shadow-md shadow-#000/40'>
          <div class='tab-plus' onClick={onPlus}>+</div>
        </div>
      </div>
      {children.find(e => e.props.key == active.value)}
    </div>
  )
})
</script>

<style lang="scss">
.Tabs {
  background: var(--el-fill-color-lighter);

  > .tab_nav {
    background: var(--el-fill-color-darker);
    overflow: auto;

    &::-webkit-scrollbar {
      display: none;
      width: 8px;
      height: 8px;
    }

    &::-webkit-scrollbar-thumb {
      background: #cdcdcd;
      border-radius: 2px;
    }

    > .tab {
      @apply relative flex flex-shrink-0 aic mr4 px8 text-14 lh-26 cursor-default;
      color: var(--el-text-color-secondary);
      
      &:hover {
        background: var(--el-fill-color);
      }

      &.is-active {
        background: var(--el-fill-color-lighter);
      }
    }

    .tab-plus {
      @apply flex aic jcc mla w20 h20 text-16 bg-hover cursor-pointer b-1;
    }
  }
}
</style>