<template>
  <div>
    <h4>Heading</h4>
    <div flex="~ wrap" gap-1>
      <button :class="['vs-btn btn', isActive('heading', { level: 1 }) && 'is-active']" @click="exec().toggleHeading({ level: 1 }).run()">H1</button>
      <button :class="['vs-btn btn', isActive('heading', { level: 2 }) && 'is-active']" @click="exec().toggleHeading({ level: 2 }).run()">H2</button>
      <button :class="['vs-btn btn', isActive('heading', { level: 3 }) && 'is-active']" @click="exec().toggleHeading({ level: 3 }).run()">H3</button>
      <button :class="['vs-btn btn', isActive('heading', { level: 4 }) && 'is-active']" @click="exec().toggleHeading({ level: 4 }).run()">H4</button>
    </div>

    <h4>Text</h4>
    <div flex="~ wrap" gap-1>
      <button :class="['vs-btn btn', isActive('paragraph') && 'is-active']" @click="exec().setParagraph().run()">P</button>
      <button :class="['vs-btn btn', isActive('bold') && 'is-active']" @click="exec().toggleBold().run()">B</button>
      <button :class="['vs-btn btn', isActive('italic') && 'is-active']" @click="exec().toggleItalic().run()">I</button>
      <button :class="['vs-btn btn', isActive('underline') && 'is-active']" @click="exec().toggleUnderline().run()">U</button>
      <button :class="['vs-btn btn', isActive('strike') && 'is-active']" @click="exec().toggleStrike().run()"><s>S</s></button>

      <div wfull mt2 />
      <!-- <el-color-picker :modelValue="editor?.getAttributes('textStyle').color" @update:modelValue="v => exec().setColor(v).run()" /> -->
      <input type="color" :value="editor()?.getAttributes('textStyle').color" @change="({ target: { value: v } }) => exec().setColor(v).run()" />
    </div>

    <h4>Align</h4>
    <div flex="~ wrap" gap-1>
      <button :class="['vs-btn btn', isActive({ textAlign: 'left' }) && 'is-active']" @click="exec().setTextAlign('left').run()">L</button>
      <button :class="['vs-btn btn', isActive({ textAlign: 'center' }) && 'is-active']" @click="exec().setTextAlign('center').run()">C</button>
      <button :class="['vs-btn btn', isActive({ textAlign: 'right' }) && 'is-active']" @click="exec().setTextAlign('right').run()">R</button>
    </div>

    <h4>Link</h4>
    <div flex="~ wrap" gap-1>
      <input class="vs-input" :value="link?.href" @input="(e) => link = { ...link, href: e.target.value }" placeholder="https://xxx" />
      <!-- <button :class="['vs-btn btn', isActive('strike') && 'is-active']">_blank</button> -->
    </div>

    <h4>Img</h4>
    <div flex="~ wrap" gap-1>
      <input class="vs-input" :value="image?.src" @input="(e) => image = { ...image, src: e.target.value }" placeholder="https://xxx.png" />
      <button :class="['vs-btn mt4', isActive('strike') && 'is-active']" @click="chooseImg({ base64: true, maxSize: 1024 * 200 }).then(src => image = { ...image, src })">
        <i-tdesign:cloud-upload mr4 />
        upload
      </button>
    </div>

    <h4>Table</h4>
    <div flex="~ wrap" gap-1>
      <Scope>
        <el-popover trigger="click" placement="bottom-start" :offset="4" :show-arrow="false" popper-style="padding: 0; width: auto; border: 0" :hide-after="0">
          <template #reference>
            <button class="btn vs-btn insert-table">Table</button>
          </template>
          <div @mousemove="e => txy = (e.target as HTMLElement).getAttribute('xy')?.split(',')" @mouseleave="txy = [0, 0]" @click="txy.includes(0) ? void 0 : exec().insertTable({ rows: txy[1], cols: txy[0], withHeaderRow: true }).run()" grid style="grid-template-columns: repeat(6, minmax(0, 1fr)); border-left: 1px solid #808080; border-top: 1px solid #808080">
            <template v-for="rowi in 6">
              <div v-for="coli in 6" :class="['cell', rowi <= txy[1] && coli <= txy[0] && 'is-active']" :xy="`${coli},${rowi}`" style="width: 15px; height: 15px; border-right: 1px solid #808080; border-bottom: 1px solid #808080;" />
            </template>
          </div>
        </el-popover>
      </Scope>
      <el-popover trigger="click" placement="bottom-start" :offset="4" :show-arrow="false" popper-style="padding: 0; width: auto; border: 0" :hide-after="0">
        <template #reference>
          <button class="btn vs-btn insert-table">row / col</button>
        </template>
        <div class="flex flex-col jcc">
          <button class="vs-btn btn" @click="exec().addRowBefore().run()">+</button>
          <div flex jcc>
            <button class="vs-btn btn" @click="exec().addColumnBefore().run()">+</button>
            <button class="vs-btn btn" @click="exec().addColumnAfter().run()">+</button>
          </div>
          <button class="vs-btn btn" @click="exec().addRowAfter().run()">+</button>
        </div>
      </el-popover>
    </div>
    <!-- <button class="vs-btn btn" @click="exec().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()"><i-tabler:arrow-bar-right /></button>
    <button class="vs-btn btn" @click="exec().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()"><i-tabler:arrow-bar-left /></button> -->

    <h4>List</h4>
    <div flex="~ wrap" gap-1>
      <button :class="['vs-btn btn', isActive('bulletList') && 'is-active']" @click="exec().toggleBulletList().run()">Bullet list</button>
      <button :class="['vs-btn btn', isActive('orderedList') && 'is-active']" @click="exec().toggleOrderedList().run()">Ordered list</button>
    </div>
    
    <h4>Task</h4>
    <div flex="~ wrap" gap-1>
      <button :class="['vs-btn btn', isActive('taskList') && 'is-active']" @click="exec().toggleTaskList().run()">Task</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent, PropType, ref } from 'vue'
import { Editor } from '@tiptap/vue-3'
import { chooseImg } from '@el-lowcode/utils'

const props = defineProps({
  el: Object as PropType<{ editor: Editor }>,
})

const editor = () => props.el?.editor
const isActive = (...args) => props.el?.editor?.isActive(...args)
const exec = () => editor()!.chain().focus()

const link = computed({
  get() { return editor()?.getAttributes('link') },
  set(v) { editor()?.chain().extendMarkRange('link')[v.href ? 'setLink' : 'unsetLink'](v).run() }
})

const image = computed({
  get() { return editor()?.getAttributes('image') },
  set(v) { exec().setImage(v).run() }
})

const txy = ref([])

const Scope = defineComponent({
  setup: (_, { slots }) => () => slots.default!()
})
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
    margin-left: 0 !important;
  }
}

.cell {

}

.is-active {
  background-color: var(--vs-btn-bg);

  &:hover {
    background-color: var(--vs-btn-hover-bg);
  }
}

</style>