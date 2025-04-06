<script setup lang='jsx'>
import { onMounted, ref, useSlots, watchEffect } from 'vue'
import { refWithControl } from '@vueuse/core'
import { useSortable } from '@vueuse/integrations/useSortable.mjs'
import { set } from '@el-lowcode/utils'
import { useEdit } from './hooks'

const props = defineProps({
  stretch: Boolean,
  tabs: Array,
  nav: Object,
  editable: Boolean,
  sortable: { type: Boolean, defeault: true },
  addable: { type: Boolean, default: true },
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

onMounted(() => {
  watchEffect(() => sortable.option('disabled', !(props.editable && props.sortable)))
})

function onPlus() {
  const { tabs } = props
  if (props.new) tabs.push(props.new(tabs.length))
  else tabs.push({})
}

function onDown(e) {
  if (e.button == 1) {
    if (!props.editable) return
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
      if (!props.editable) return
      e.stopPropagation()
      e.preventDefault()
      del(i)
      break;
  }
}

function onEditLabel() {
  if (!props.editable) return
  edit.value = true
}

function onChangeLabel(i, v) {
  set(props.tabs[i], props.props.label, v)
  edit.value = false
}

function del(i) {
  const { tabs }  = props
  if (i == children.length - 1) {
    tabs.splice(i, 1)
    active.value = children[children.length - 2].key
  } else {
    tabs.splice(i, 1)
    active.value = children[i + 1].key
  }
}

defineRender(() => {
  const { stretch, editable, showClose, nav } = props
  children = slots.default?.()
  children.forEach((e, i) => e.key ??= i)

  if (active.value == null) {
    active.lay(children[0].key)
  }

  return (
    <div class={['Tabs', editable && 'is-editable', stretch && 'is-stretch']}>
      <div class='tab_nav flex' ref={navRef} {...nav}>
        {children.map((c, i) => (
          <div key={c.key} class={['tab', active.value == c.key && 'is-active']} onPointerdown={onDown} onPointerup={e => onTab(e, c.key, i)} onDblclick={onEditLabel}>
            {c.props.label}
            {active.value == c.key && edit.value && <input class='absolute left-0 p4 wfull lh-22 outline-0' ref={inputRef} value={c.props.label} onChange={(e) => onChangeLabel(i, e.target.value)} />}
            {props.editable && showClose && <div class='i-ep-close hover:i-ep:circle-close-filled flex aic jcc ml4 -mr4 text-10' onClick={(e) => (e.stopPropagation(), del(i))} />}
          </div>
        ))}
        <div class='sticky right-0 flex aic mla bg-inherit! shadow-md shadow-#000/40'>
          {props.editable && props.addable && <div class='tab-plus' onClick={onPlus}>+</div>}
          {slots.extra?.()}
        </div>
        
      </div>
      {children.find(e => e.key == active.value)}
    </div>
  )
})
</script>

<style lang="scss">
.Tabs {
  background: var(--bg, var(--el-fill-color-lighter));
  color: var(--el-text-color-primary);

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
      @apply flex-shrink-0 relative px8 max-w6em min-w2em text-12 lh-26 cursor-default truncate text-center;
      color: var(--el-text-color-secondary);

      & + .tab {
        @apply ml4;
      }

      &:hover {
        background: var(--el-fill-color);
      }

      &.is-active {
        background: var(--bg, var(--el-fill-color-lighter));
      }
    }

    .tab-plus {
      @apply flex aic jcc mx4 w20 h20 text-16 bg-hover cursor-pointer b-1;
    }
  }

  &.is-stretch > .tab_nav > .tab {
    @apply max-wunset flex-1;
  }
}
</style>