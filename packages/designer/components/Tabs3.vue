<script setup lang='jsx'>
import { onMounted, ref, useSlots, Comment, Fragment } from 'vue'
import { refWithControl } from '@vueuse/core'
// import { useSortable } from '@vueuse/integrations/useSortable.mjs'
import { set } from '@el-lowcode/utils'
import { useEdit } from './hooks'
// import Icon from './Icon.vue'

const props = defineProps({
  stretch: Boolean,
  tabs: Array,
  nav: Object,
  editable: Boolean,
  sortable: { type: Boolean, defeault: true },
  addable: { type: Boolean, default: true },
  new: Function,
  props: Object,
})

const slots = useSlots()

const active = refWithControl()
let children = []

const edit = ref(false)
const { inputRef } = useEdit(ref(), () => edit.value = false)

const navRef = ref()
// const sortable = useSortable(navRef, () => props.tabs, { draggable: '.tab', animation: 100 })

// onMounted(() => {
//   watchEffect(() => sortable.option('disabled', !(props.editable && props.sortable)))
// })

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
  const { stretch, editable, nav } = props
  children = slots.default?.()
  children = (function flat (v) { return v.flatMap(e => 
    e.type == Fragment ? flat(e.children) :
    e.type == Comment ? [] :
    e
  ) })(children)
  .filter(e => e.props)
  children.forEach((e, i) => e.key ??= i)

  if (active.value == null) {
    active.lay(children[0]?.key)
  }

  return (
    <div class={['vs-editor-group active cursor-pointer', editable && 'is-editable', stretch && 'is-stretch']} flex='~ col'>
      <div class='vs-editor-tabs flex' ref={navRef} {...nav}>
        {children.map(({ key, props: tab }, i) => (
          <div key={key} class={['tab', active.value == key && 'active']} draggable onPointerdown={onDown} onPointerup={e => onTab(e, key, i)} onDblclick={onEditLabel}>
            {/* <Icon /> */}
            <i-vscode-icons-file-type-json class='pr6 w22' />
            {tab.label}
            {active.value == key && edit.value && <input class='absolute left-0 p4 wfull lh-22 outline-0' ref={inputRef} value={tab.label} onChange={(e) => onChangeLabel(i, e.target.value)} />}
            {/* {tab.editable && showClose && <div class='i-ep-close hover:i-ep:circle-close-filled flex aic jcc ml4 -mr4 text-10' onClick={(e) => (e.stopPropagation(), del(i))} />} */}
            <div class="vs-actions flex aic sticky right-0 mla">
              {tab.closable !== false && <i-mdi-close class="vs-li mx3 p2! w18! h18!" onClick={(e) => (e.stopPropagation(), del(i))} />}
            </div>
          </div>
        ))}
        {/* <div class='sticky right-0 flex aic mla bg-inherit! shadow-md shadow-#000/40'>
          {tab.editable && tab.addable && <div class='tab-plus' onClick={onPlus}>+</div>}
          {slots.extra?.()}
        </div> */}
        <div class="vs-actions sticky right-0 mla">
          {slots.extra?.()}
        </div>
        
      </div>
      <div class="flex-1">
        {children.find(e => e.key == active.value)}
      </div>
    </div>
  )
})
</script>
