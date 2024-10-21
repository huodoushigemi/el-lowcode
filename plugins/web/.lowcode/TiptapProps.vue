<template>
  <div>
    <h4>Heading</h4>
    <button :class="['vs-btn btn', isActive('heading', { level: 1 }) && 'is-active']" @click="exec().toggleHeading({ level: 1 }).run()">H1</button>
    <button :class="['vs-btn btn', isActive('heading', { level: 2 }) && 'is-active']" @click="exec().toggleHeading({ level: 2 }).run()">H2</button>
    <button :class="['vs-btn btn', isActive('heading', { level: 3 }) && 'is-active']" @click="exec().toggleHeading({ level: 3 }).run()">H3</button>
    <button :class="['vs-btn btn', isActive('heading', { level: 4 }) && 'is-active']" @click="exec().toggleHeading({ level: 4 }).run()">H4</button>

    <h4>Text</h4>
    <button class="btn">P</button>
    <button class="btn">B</button>
    <button class="btn">I</button>
    <button class="btn">U</button>
    <button class="btn"><s>S</s></button>

    <h4>Align</h4>
    <button class="btn">L</button>
    <button class="btn">C</button>
    <button class="btn">R</button>

    <h4>Table</h4>
    <button class="vsn-btn btn" @click="exec().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()">Table</button>

    <h4>List</h4>
    <button :class="['vs-btn btn', isActive('bulletList') && 'is-active']" @click="exec().toggleBulletList().run()">Bullet list</button>
    <button :class="['vs-btn btn', isActive('orderedList') && 'is-active']" @click="exec().toggleOrderedList().run()">Ordered list</button>
    
    <h4>Task</h4>
    <button :class="['vs-btn btn', isActive('taskList') && 'is-active']" @click="exec().toggleTaskList().run()">Task</button>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'
import { Editor } from '@tiptap/vue-3'

const props = defineProps({
  el: Object as PropType<{ editor: Editor }>,
})

const isActive = (...args) => props.el?.editor?.isActive(...args)
const exec = () => props.el.editor!.chain().focus()
</script>

<style scoped lang="scss">
h4 {
  margin: 20px 0 14px 0;
}
.btn {
  padding: 2px 10px;
  font-size: 16px;
  // background: #808080;
  background-color: revert;
  cursor: pointer;
  line-height: revert;

  &:hover {
    background-color: #909090;
  }
  &:active {
    background-color: #808080;
  }

  & + & {
    margin-left: 1px
  }
}

.is-active {
  background-color: var(--vs-btn-bg);

  &:hover {
    background-color: var(--vs-btn-hover-bg);
  }
}
</style>