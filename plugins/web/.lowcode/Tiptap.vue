<template>
  <EditorContent class="tiptap" :editor .editor .vIns="ins" @keydown.stop />
</template>

<script setup>
import { getCurrentInstance, watchEffect } from 'vue'
import { useVModel } from '@vueuse/core'
import { EditorContent, useEditor } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import TaskItem from '@tiptap/extension-task-item'
import TaskList from '@tiptap/extension-task-list'

const props = defineProps(['modelValue'])
const val = useVModel(props, 'modelValue', void 0, { passive: true })

const ins = getCurrentInstance()

const editor = useEditor({
  extensions: [
    StarterKit,
    Table.configure({
      resizable: true,
    }),
    TableRow,
    TableHeader,
    TableCell,
    TaskList,
    TaskItem.configure({
      nested: true,
    }),
  ],
  onUpdate: () => val.value = editor.value.getHTML()
})

watchEffect(() => {
  if (!editor.value) return
  if (editor.value.getHTML() == val.value) return
  editor.value.commands.setContent(val.value, false)
})
</script>

<style lang="scss">
.tiptap {
  --purple: #6A00F5;
  --purple-contrast: #5800CC;
  --purple-light: rgba(88, 5, 255, .05);
  
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
}
</style>