<template>
  <div .editor>
    <EditorContent :editor @keydown.stop draggable="true" @dragstart.stop.prevent />
    
    <TiptapBubbleMenu v-if="editor" :editor />
  </div>
</template>

<script setup>
import { defineComponent, h, onBeforeUnmount, onMounted, onUnmounted, ref, watchEffect } from 'vue'
import { useEventListener, useVModel } from '@vueuse/core'
import { Node } from '@tiptap/core'
import { EditorContent, useEditor, nodeViewProps, NodeViewContent, NodeViewWrapper, VueNodeViewRenderer } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import TextAlign from '@tiptap/extension-text-align'
import TextStyle from '@tiptap/extension-text-style'
import Highlight from '@tiptap/extension-highlight'
import { Color } from '@tiptap/extension-color'
import Link from '@tiptap/extension-link'
import Placeholder from '@tiptap/extension-placeholder'
import Image from '@tiptap/extension-image'
// import ImageResize from 'tiptap-extension-resize-image'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'

import Moveable from 'vue3-moveable'

import TiptapBubbleMenu from './TiptapBubbleMenu.vue'

const props = defineProps(['modelValue'])
const emit = defineEmits(['change', 'update:modelValue'])
const val = useVModel(props, 'modelValue', void 0, { passive: true })

const vImageResize = defineComponent({
  props: nodeViewProps,
  setup(props) {
    const focused = ref(props.selected), img = ref()
    useEventListener('click', () => focused.value = false)
    return () => {
      const { attrs }  = props.node

      return h(NodeViewWrapper, { onClick: e => e.currentTarget == e.target || (e.stopPropagation(), focused.value = true) }, [
        h('div', { style: `position: relative; text-align: ${attrs.align}` }, [
          h(Moveable, {
            target: focused.value && props.selected ? img.value : void 0,
            draggable: false,
            resizable: true,
            origin: false,
            // hideDefaultLines: true,
            useMutationObserver: true,
            onResize: e => (e.target.style.width = `${e.width}px`, e.target.style.height = `${e.height}px`),
            onResizeEnd: e => (attrs.style = `${[e.target.style.cssText]}`, props.updateAttributes(attrs)),
          }),
          h('img', { ...attrs, ref: img, key: attrs.align, align: '' })
        ]),
      ])
    }
  }
})

const ImageResize = Node.create({
  name: 'image',
  group: 'block',
  parseHTML: () => [{ attrs: { 'data-type': 'image' } }],
  renderHTML: ({ node, HTMLAttributes: { align, ...attrs } }) => ['div', { 'data-type': 'image', style: `text-align: ${align}` }, ['img', attrs]],
  addNodeView: () => VueNodeViewRenderer(vImageResize),
  addCommands: () => ({
    setImage: attrs => ({ commands }) => commands.insertContent({ type: 'image', attrs })
  }),
  addAttributes: () => ({
    src: { default: null, parseHTML: el => el.children[0].src },
    style: { default: 'max-width: 100%; height: auto;' },
    align: { default: 'center', parseHTML: el => el.style.textAlign },
  })
})

const editor = useEditor({
  extensions: [
    StarterKit.configure({
      codeBlock: {
        HTMLAttributes: { style: 'padding: .75rem 1rem; background: #2E2B29' }
      }
    }),
    TextAlign.configure({
      types: ['heading', 'paragraph'],
    }),
    TextStyle,
    Highlight.configure({ multicolor: true }),
    Color,
    Link.configure({
      openOnClick: false,
      defaultProtocol: 'https',
    }),
    Placeholder.configure({
      placeholder: 'Type / to browse options'
    }),
    // Image.configure({ allowBase64: true, HTMLAttributes: { style: 'display: block' } }),
    // ImageResize.configure({ allowBase64: true }),
    ImageResize,
    Table.configure({
      resizable: true,
      HTMLAttributes: { style: 'border-collapse: collapse; table-layout: fixed; width: 100%;' },
    }),
    TableRow,
    TableHeader,
    TableCell,
    TaskList,
    TaskItem.configure({
      nested: true,
    }),
  ],
  onUpdate: () => val.value = editor.value.getHTML(),
  onBlur: () => emit('change', val.value),
})

watchEffect(() => {
  if (!editor.value) return
  if (editor.value.getHTML() == val.value) return
  editor.value.commands.setContent(val.value, true)
})
</script>

<style lang="scss">
.tiptap {
  --gray-1: rgb(128, 128, 128, .08);
  --gray-2: rgb(128, 128, 128, .12);
  --gray-3: rgb(128, 128, 128, .3);
  --gray-4: rgb(128, 128, 128, .3);
  --gray-5: rgb(128, 128, 128, .6);
  --purple: #6A00F5;
  --purple-contrast: #5800CC;
  --purple-light: rgba(88, 5, 255, .05);
  margin: 1em 0;
  outline: 0;

  :first-child {
    margin-top: 0;
  }
  
  /* Table-specific styling */
  table {
    border-collapse: collapse;
    margin: 0;
    overflow: hidden;
    table-layout: fixed;
    width: 100%;
  
    td,
    th {
      border: 1px solid var(--gray-3);
      box-sizing: border-box;
      min-width: 1em;
      padding: 6px 8px;
      position: relative;
      vertical-align: top;
  
      >* {
        margin-bottom: 0;
      }
    }
  
    th {
      background-color: var(--gray-1);
      font-weight: bold;
      text-align: left;
    }
  
    .selectedCell:after {
      background: var(--gray-2);
      content: "";
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      pointer-events: none;
      position: absolute;
      z-index: 2;
    }
  
    .column-resize-handle {
      background-color: var(--purple);
      bottom: -2px;
      pointer-events: none;
      position: absolute;
      right: -2px;
      top: 0;
      width: 4px;
    }
  }
  
  .tableWrapper {
    margin: 1.5rem 0;
    overflow-x: auto;
  }
  
  &.resize-cursor {
    cursor: ew-resize;
    cursor: col-resize;
  }

  img {
    // display: block;
    // height: auto;
    // margin: 1.5rem 0;
    // max-width: 100%;

    &.ProseMirror-selectednode {
      outline: 3px solid var(--purple);
    }
  }
}
</style>