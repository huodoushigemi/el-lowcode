<template>
  <BubbleMenu :editor :tippyOptions="{ maxWidth: 400 }" :updateDelay="100">
    <div v-if="inNode('codeBlock')" class="tiptap-bubble">

    </div>
    <div v-else-if="selection.from != selection.to && (selection instanceof TextSelection)" class="tiptap-bubble">
      <button :class="['tiptap-bubble-li', toggleNodes.find(e => e.isActive()) && 'selected']">
        <div style="line-height: 0">
          <component :is="(toggleNodes.find(e => e.isActive()) || toggleNodes[0]).icon" />
        </div>
        <Tippy :extra="{ interactive: true, offset: [0, 0], trigger: 'click', placement: 'auto-start', appendTo: 'parent' }">
          <div class="tiptap-bubble" style="flex-direction: column; align-items: stretch;">
            <div v-for="e in toggleNodes" :class="['tiptap-bubble-li', e.isActive() && 'selected']" style="display: flex; align-items: center;" @click="e.active">
              <component :is="e.icon" style="margin-right: 6px;" />
              {{ e.label }}
            </div>
          </div>
        </Tippy>
      </button>
      <button :class="['tiptap-bubble-li', isActive('bold') && 'selected']" @click="exec().toggleBold().run()"><i-lucide:bold /></button>
      <button :class="['tiptap-bubble-li', isActive('italic') && 'selected']" @click="exec().toggleItalic().run()"><i-lucide:italic /></button>
      <button :class="['tiptap-bubble-li', isActive('underline') && 'selected']" @click="exec().toggleUnderline().run()"><i-lucide:underline /></button>
      <button :class="['tiptap-bubble-li', isActive('strike') && 'selected']" @click="exec().toggleStrike().run()"><i-lucide:strikethrough /></button>

      <button :class="['tiptap-bubble-li', isActive('link') && 'selected']">
        <i-lucide:link />
        <Tippy :extra="{ interactive: true, onCreate: v => linkTippy = v, offset: [0, 0], trigger: 'click', appendTo: 'parent' }">
          <TiptapLinkEdit class="tiptap-bubble" style="padding: 10px; align-items: start;" :attrs="link()" @update:attrs="v => (setLink(v), linkTippy.hide())" />
        </Tippy>
      </button>

      <button :class="['tiptap-bubble-li', isActive('code') && 'selected']" @click="exec().toggleCode().run()"><i-lucide:code /></button>
      
      <button :class="['tiptap-bubble-li']" :style="{ color: editor.getAttributes('textStyle').color }">
        <i-lucide:palette />
        <Tippy :extra="{ interactive: true, offset: [0, 0], trigger: 'click' }">
          <sl-color-picker :value="editor.getAttributes('textStyle').color" @sl-change="e => editor.commands.setColor(e.target.value)" size="small" style="--sl-input-width-small: 24px; --sl-input-height-small: 24px;" opacity inline />
        </Tippy>
      </button>

      <sl-color-picker :value="bgc()" @sl-change="e => setBgc(e.target.value)" size="small" style="--sl-input-width-small: 24px; --sl-input-height-small: 24px;" opacity />
      
      <button class="tiptap-bubble-li">
        <i-lucide:ellipsis-vertical />
        <Tippy :extra="{ interactive: true, offset: [0, 0], trigger: 'click' }">
          <div class="tiptap-bubble">
            <div style="display: flex; gap: 2px;">
              <button :class="['tiptap-bubble-li', isActive({ textAlign: 'left' }) && '']" @click="exec().setTextAlign('left').run()"><i-ic:baseline-align-horizontal-left /></button>
              <button :class="['tiptap-bubble-li', isActive({ textAlign: 'center' }) && 'selected']" @click="exec().setTextAlign('center').run()"><i-ic:baseline-align-horizontal-center /></button>
              <button :class="['tiptap-bubble-li', isActive({ textAlign: 'right' }) && 'selected']" @click="exec().setTextAlign('right').run()"><i-ic:baseline-align-horizontal-right /></button>
              <button class="tiptap-bubble-li" @click="exec().clearNodes().unsetAllMarks().run()"><i-ant-design:clear-outlined /></button>
            </div>
          </div>
        </Tippy>
      </button>
    </div>
  </BubbleMenu>
  
  <!-- Table -->
  <Tippy v-if="inTable()" :target="editor.view.dom.ownerDocument.body" :extra="{ interactive: true, showOnCreate: true, hideOnClick: false, maxWidth: 400, offset: [0, 0], getReferenceClientRect: () => getDom(inTable())?.getBoundingClientRect(), placement: 'top-end' }">
    <div class="tiptap-bubble">
      <button class="tiptap-bubble-li">
        <i-lucide:plus />
        <Tippy :extra="{ interactive: true, offset: [0, 0], delay: [0, 100] }">
          <div class="tiptap-bubble" style="display: grid; grid-template-columns: repeat(3, minmax(auto,  1fr));">
            <button class="tiptap-bubble-li" style="grid-area: 1 / 2 / span 1 / span 1;" @click="exec().addRowBefore().run()"><i-lucide:arrow-up-from-line /></button>
            <button class="tiptap-bubble-li" style="grid-area: 2 / 1 / span 1 / span 1;" @click="exec().addColumnBefore().run()"><i-lucide:arrow-left-from-line /></button>
            <button class="tiptap-bubble-li" style="grid-area: 2 / 3 / span 1 / span 1;" @click="exec().addColumnAfter().run()"><i-lucide:arrow-right-from-line /></button>
            <button class="tiptap-bubble-li" style="grid-area: 3 / 2 / span 1 / span 1;" @click="exec().addRowAfter().run()"><i-lucide:arrow-down-from-line /></button>
          </div>
        </Tippy>
      </button>
      <button class="tiptap-bubble-li">
        <i-lucide:trash-2 />
        <Tippy :extra="{ interactive: true, offset: [0, 0], placement: 'bottom-end', delay: [0, 100] }">
          <div class="tiptap-bubble" style="display: flex; flex-direction: column; align-items: stretch;">
            <button class="tiptap-bubble-li" @click="exec().deleteRow().run()"><i-lucide:trash-2 style="margin-right: 4px;" />Row</button>
            <button class="tiptap-bubble-li" @click="exec().deleteColumn().run()"><i-lucide:trash-2 style="margin-right: 4px;" />Col</button>
          </div>
        </Tippy>
      </button>
      <button v-if="selection instanceof CellSelection && selection.$anchorCell !== selection.$headCell" class="tiptap-bubble-li" @click="exec().mergeCells().run()" title="merge"><i-material-symbols:cell-merge /></button>
      <button v-if="isMergedCell()" class="tiptap-bubble-li" @click="exec().splitCell().run()" title="split"><i-ant-design:split-cells-outlined /></button>
    </div>
  </Tippy>

  <!-- Type / to browse options -->
  <Tippy v-if="isActive('paragraph') && selection.$anchor.nodeBefore?.text == '/'" :target="editor.view.dom.ownerDocument.body" :extra="{ interactive: true, showOnCreate: true, hideOnClick: false, getReferenceClientRect: rect, offset: [0, 4], placement: 'bottom-start' }">
    <div class="tiptap-bubble" style="flex-direction: column; align-items: stretch; min-width: 128px;" v-list-focus="{ target: editor.view.dom, defaultFirst: true }">
      <div v-for="(e, i) in newNodes" :class="['tiptap-bubble-li']" style="display: flex; align-items: center;" :data-index="i" @click="e.active">
        <component :is="e.icon" style="margin-right: 6px;" />
        {{ e.label }}
      </div>
    </div>
  </Tippy>
</template>

<script setup lang="tsx">
import { computed, defineComponent, PropType, ref, getCurrentInstance, watchEffect, h } from 'vue'
import { parseStringStyle, stringifyStyle } from '@vue/shared'
import { Node } from '@tiptap/pm/model'
import { TextSelection, AllSelection, Selection } from '@tiptap/pm/state'
import { CellSelection } from '@tiptap/pm/tables'
import { Editor, BubbleMenu } from '@tiptap/vue-3'
import Tippy from '../tippy.vue'
import { chooseImg, vListFocus } from '@el-lowcode/utils'

import TiptapLinkEdit from '../tiptap/TiptapLinkEdit.vue'

document.head.append(Object.assign(document.createElement('link'), { rel: 'stylesheet', href: 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace/cdn/themes/dark.css' }))
import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace/cdn/components/color-picker/color-picker.js'

const props = defineProps({
  editor: { type: Object as PropType<Editor>, required: true },
})

const { proxy } = getCurrentInstance()!
const fu = () => proxy!.$forceUpdate()

const isActive = (...args) => props.editor.isActive(...args)
const exec = () => props.editor.chain().focus()
const rect = () => {
  const coords = props.editor.view.coordsAtPos(selection.value.from)
  return DOMRect.fromRect({ x: coords.left, y: coords.top, width: coords.right - coords.left, height: coords.bottom - coords.top })
}

const toggleNodes = [
  { label: 'Paragraph', icon: () => <i-lucide-pilcrow />, isActive: () => isActive('paragraph'), active: () => exec().setParagraph().run() },
  { label: 'Heading 1', icon: () => <i-lucide-heading-1 />, isActive: () => isActive('heading', { level: 1 }), active: () => exec().toggleHeading({ level: 1 }).run() },
  { label: 'Heading 2', icon: () => <i-lucide-heading-2 />, isActive: () => isActive('heading', { level: 2 }), active: () => exec().toggleHeading({ level: 2 }).run() },
  { label: 'Heading 3', icon: () => <i-lucide-heading-3 />, isActive: () => isActive('heading', { level: 3 }), active: () => exec().toggleHeading({ level: 3 }).run() },
  { label: 'Bullet list', icon: () => <i-mdi-format-list-bulleted-square />, isActive: () => isActive('bulletList'), active: () => exec().toggleBulletList().run() },
  { label: 'Numbered list', icon: () => <i-mdi-order-numeric-ascending />, isActive: () => isActive('orderedList'), active: () => exec().toggleOrderedList().run() },
  { label: 'Todo list', icon: () => <i-mdi-format-list-checks />, isActive: () => isActive('taskList'), active: () => exec().toggleTaskList().run() },
] 
const newNodes = [
  { label: 'Heading 1', icon: () => <i-lucide-heading-1 />, active: () => exec().selectParentNode().deleteSelection().insertContent('<p></p>').toggleHeading({ level: 1 }).run() },
  { label: 'Heading 2', icon: () => <i-lucide-heading-2 />, active: () => exec().selectParentNode().deleteSelection().insertContent('<p></p>').toggleHeading({ level: 2 }).run() },
  { label: 'Heading 3', icon: () => <i-lucide-heading-3 />, active: () => exec().selectParentNode().deleteSelection().insertContent('<p></p>').toggleHeading({ level: 3 }).run() },
  { label: 'Table', icon: () => <i-lucide-table />, active: () => exec().selectParentNode().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run() },
  { label: 'Image', icon: () => <i-lucide-image />, active: () => chooseImg({ base64: true, maxSize: 1024 * 200 }).then(src => exec().selectParentNode().setImage({ src }).run()) },
]

const link = () => props.editor.getAttributes('link')
const setLink = v => (exec()[v.href ? 'setLink' : 'unsetLink'](v).run(), fu())

const image = () => ({ ...props.editor.getAttributes('image'), style: parseStringStyle(props.editor.getAttributes('image')?.style || '') })
const setImage = (v) => { v.src ? exec().setImage({ ...v, style: stringifyStyle(v.style) }).run() : exec().deleteSelection().run(); fu() }
const setImageW = (v) => setImage({ ...image(), style: { ...image().style, width: v ? `${v}px` : void 0 } })
const setImageH = (v) => setImage({ ...image(), style: { ...image().style, height: v ? `${v}px` : void 0 } })

const bgc = () => getNodes(props.editor.state.selection).flatMap(e => e.marks.find(m => m.type.name == 'highlight') || [])[0]?.attrs.color
const setBgc = v => props.editor.commands[v ? 'setHighlight' : 'unsetHighlight']({ color: v })

const log = (xx) => (console.log(xx), xx)
const getNodes = ({ from, to }) => {
  const nodes = [] as Node[]
  props.editor.state.doc.nodesBetween(from, to, node => { nodes.push(node) })
  return nodes
}
const inNode = (name, { $from, $to } = props.editor.state.selection) => $from.parent == $to.parent && $to.parent.type.name == name
const inTable = () => {
  const { $from } = props.editor.state.selection
  return Array(4).fill(0).flatMap((e, i) => $from.node(-i)?.type.name == 'table' ? $from.node(-i) : [])[0]
}
const isMergedCell = () => {
  const cell = selection.value.$from.node(-1)
  if (cell.type.name != 'tableCell' && cell.type.name != 'tableHeader') return
  return cell.attrs.rowspan > 1 || cell.attrs.colspan > 1
}

function findNodePos(node): number | void {
  let pos = undefined
  props.editor.state.doc.descendants((e, nodePos) => {
    if (e == node) {
      pos = nodePos
      return false; // 找到节点后提前停止搜索
    }
  })
  return pos
}
function getDom(pos: Node | number) {
  pos = typeof pos == 'number' ? pos : findNodePos(pos) as number
  return pos != null ? props.editor.view.nodeDOM(pos) : void 0
}

const selection = computed(() => props.editor.state.selection)
watchEffect(() => log(selection.value))

const linkTippy = ref()

const Scope = defineComponent({
  setup: (_, { slots }) => () => slots.default!()
})
</script>

<style scoped lang="scss">
.tiptap-bubble {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  align-items: center;
  gap: 2px;
  background-color: #252526;
  box-shadow: 0 0 12px #00000080;

  > svg {
    width: 1rem;
    height: 1rem;
  }
}

.tiptap-bubble-li {
  display: flex;
  align-items: center;
  padding: 0 8px;
  height: 32px;
  border: 0;
  font-size: 14px;
  color: #ccc;
  background-color: transparent;
  cursor: pointer;
  
  &.focused, &:hover {
    color: #fff;
    background-color: #2a2d2e;
    // background-color: #03395d;
  }
}

.selected {
  color: #fff;
  background-color: #0e639c !important;
}
</style>