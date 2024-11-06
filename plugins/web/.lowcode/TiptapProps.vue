<template>
  <div>
    <h4>Link</h4>
    <div flex="~ wrap" gap-1>
      <input class="vs-input" :value="link()?.href" @change="(e) => setLink({ ...link(), href: e.target.value })" placeholder="https://xxx" />
      <button :class="['vs-btn btn', isActive({ target: '_blank' }) && 'is-active']" title="New Tab" @click="() => setLink({ ...link(), target: link()?.target ? '' : '_blank' })"><i-mdi:dock-window /></button>
    </div>

    <h4>Img</h4>
    <div flex="~ wrap" gap-1 gap-y-4>
      <input class="vs-input" :value="image().src" @input="(e) => setImage({ ...image(), src: e.target.value })" placeholder="https://xxx.png" />
      <button :class="['vs-btn']" title="Upload" @click="chooseImg({ base64: true, maxSize: 1024 * 200 }).then(src => setImage({ ...image(), src }))">
        <i-tdesign:cloud-upload />
      </button>
      <template v-if="isActive('image')">
        <button :class="['vs-btn btn', isActive({ align: '' }) && 'is-active']" @click="setImage({ ...image(), align: '' })"><i-ic:baseline-align-horizontal-left /></button>
        <button :class="['vs-btn btn', isActive({ align: 'center' }) && 'is-active']" @click="setImage({ ...image(), align: 'center' })"><i-ic:baseline-align-horizontal-center /></button>
        <button :class="['vs-btn btn', isActive({ align: 'right' }) && 'is-active']" @click="setImage({ ...image(), align: 'right' })"><i-ic:baseline-align-horizontal-right /></button>
        <div class="wfull" />
        <input class="vs-input" style="width: 60px" type="number" :value="parseInt(image().style.width)" @change="e => setImageW(e.target.value)" placeholder="W" />
        <input class="vs-input" style="width: 60px" type="number" :value="parseInt(image().style.height)" @change="e => setImageH(e.target.value)" placeholder="H" />
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent, PropType, ref, getCurrentInstance } from 'vue'
import { parseStringStyle, stringifyStyle, normalizeStyle } from '@vue/shared'
import { Editor } from '@tiptap/vue-3'
import { chooseImg } from '@el-lowcode/utils'

const props = defineProps({
  el: Object as PropType<{ editor: Editor }>,
})

const { proxy } = getCurrentInstance()!
const fu = () => proxy!.$forceUpdate()

const editor = () => props.el?.editor
const isActive = (...args) => editor()?.isActive(...args)
const exec = () => editor()!.chain().focus()

const link = () => editor()?.getAttributes('link')
const setLink = v => (exec().extendMarkRange('link')[v.href ? 'setLink' : 'unsetLink'](v).run(), fu())

const image = () => ({ ...editor()?.getAttributes('image'), style: parseStringStyle(editor()?.getAttributes('image')?.style || '') })
const setImage = (v) => { v.src ? exec().setImage({ ...v, style: stringifyStyle(v.style) }).run() : exec().deleteSelection().run(); fu() }
const setImageW = (v) => setImage({ ...image(), style: { ...image().style, width: v ? `${v}px` : void 0 } })
const setImageH = (v) => setImage({ ...image(), style: { ...image().style, height: v ? `${v}px` : void 0 } })

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