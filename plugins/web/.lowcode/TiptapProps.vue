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
      <button :class="['vs-btn btn', isActive({ textAlign: 'left' }) && 'is-active']" @click="exec().setTextAlign('left').run()"><i-ic:baseline-align-horizontal-left /></button>
      <button :class="['vs-btn btn', isActive({ textAlign: 'center' }) && 'is-active']" @click="exec().setTextAlign('center').run()"><i-ic:baseline-align-horizontal-center /></button>
      <button :class="['vs-btn btn', isActive({ textAlign: 'right' }) && 'is-active']" @click="exec().setTextAlign('right').run()"><i-ic:baseline-align-horizontal-right /></button>
    </div>

    <h4>Link</h4>
    <div flex="~ wrap" gap-1>
      <input class="vs-input" :value="link()?.href" @change="(e) => setLink({ ...link(), href: e.target.value })" placeholder="https://xxx" />
      <button :class="['vs-btn btn', link()?.target == '_blank' && 'is-active']" title="New Tab" @click="() => setLink({ ...link(), target: link()?.target ? '' : '_blank' })"><i-mdi:dock-window /></button>
    </div>

    <h4>Img</h4>
    <div flex="~ wrap" gap-1 gap-y-4>
      <input class="vs-input" :value="image?.src" @input="(e) => image = { ...image, src: e.target.value }" placeholder="https://xxx.png" />
      <button :class="['vs-btn', isActive('strike') && 'is-active']" @click="chooseImg({ base64: true, maxSize: 1024 * 200 }).then(src => image = { ...image, src })">
        <i-tdesign:cloud-upload />
      </button>
      <template v-if="image?.src">
        <button :class="['vs-btn btn', !image.align && 'is-active']" @click="image = { ...image, align: '' }"><i-ic:baseline-align-horizontal-left /></button>
        <button :class="['vs-btn btn', image.align == 'center' && 'is-active']" @click="image = { ...image, align: 'center' }"><i-ic:baseline-align-horizontal-center /></button>
        <button :class="['vs-btn btn', image.align == 'right' && 'is-active']" @click="image = { ...image, align: 'right' }"><i-ic:baseline-align-horizontal-right /></button>
        <div class="wfull" />
        <input class="vs-input" style="width: 60px" type="number" :value="parseInt(image.style.width)" @change="e => (image.style.width = `${e.target.value}px`, image = image)" placeholder="W" />
        <input class="vs-input" style="width: 60px" type="number" :value="parseInt(image.style.height)" @change="e => (image.style.height = `${e.target.value}px`, image = image)" placeholder="H" />
      </template>
    </div>

    <h4>Table</h4>
    <div flex="~ wrap" gap-1>
      <Scope>
        <el-popover trigger="hover" placement="bottom-start" :offset="4" :show-arrow="false" popper-style="padding: 0; width: auto; border: 0" :hide-after="0">
          <template #reference>
            <button class="btn vs-btn insert-table">Table</button>
          </template>
          <div @mousemove="e => txy = (e.target as HTMLElement).getAttribute('xy')?.split(',') || [0, 0]" @mouseleave="txy = [0, 0]" @click="txy.includes(0) ? void 0 : exec().insertTable({ rows: txy[1], cols: txy[0], withHeaderRow: true }).run()" grid style="grid-template-columns: repeat(6, minmax(0, 1fr)); border-left: 1px solid #808080; border-top: 1px solid #808080">
            <template v-for="rowi in 6">
              <div v-for="coli in 6" :class="['cell', rowi <= txy[1] && coli <= txy[0] && 'is-active']" :xy="`${coli},${rowi}`" style="width: 15px; height: 15px; border-right: 1px solid #808080; border-bottom: 1px solid #808080;" />
            </template>
          </div>
        </el-popover>
      </Scope>
      <el-popover trigger="hover" placement="bottom-start" :offset="4" :show-arrow="false" popper-style="padding: 0; width: auto; border: 0" :hide-after="0">
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
import { parseStringStyle, stringifyStyle } from '@vue/shared'
import { useTransform } from 'el-form-render'
import { Editor } from '@tiptap/vue-3'
import { chooseImg } from '@el-lowcode/utils'

const props = defineProps({
  el: Object as PropType<{ editor: Editor }>,
})

const editor = () => props.el?.editor
const isActive = (...args) => props.el?.editor?.isActive(...args)
const exec = () => editor()!.chain().focus()

const link = () => editor()?.getAttributes('link')
const setLink = v => exec().extendMarkRange('link')[v.href ? 'setLink' : 'unsetLink'](v).run()
const upLink = v => editor()!.chain().extendMarkRange('link').updateAttributes('link', { ...link(), ...v }).run()

const image = computed({
  get() { return { ...editor()?.getAttributes('image'), style: parseStringStyle(editor()?.getAttributes('image').style || '') } },
  set(v) { v.src ? editor()!.chain().setImage({ ...v, style: stringifyStyle(v.style) }).run() : exec().deleteSelection().run() }
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
  margin-left: 0;
  padding: 2px 10px;
  font-size: 16px;
  // background: #808080;
  background-color: revert;
  line-height: revert;

  &:hover {
    background-color: #909090;
  }
  &:active {
    background-color: #808080;
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