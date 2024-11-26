<template>
  <div flex aic px8 py12 text-22 b-b="1 solid [--el-border-color]">
    <!-- 插件市场 -->
    <ElTooltip content="远程插件" placement="right"><i-ep:plus class="vs-ai" mla p6 text-24 rd-6 @click="addRemotePlugin()" /></ElTooltip>
     <!-- <button class="vs-btn" flex aic mla @click="addRemotePlugin()">+ 远程插件</button> -->
  </div>
  <div :class="['vs-ul', drawer.url && 'element-selection']" tabindex="0" v-list-focus>
    <Async v-for="(url, i) in designerCtx.dict.plugins" :load="loadPkg(url)">
      <template #default="{ data: pkg }">
        <div :class="['vs-li plugin-li flex aic pr8 h74', url == drawer.url && 'selected']" :op="pkg.disabled && 40 " :title="`${pkg.name}\n\n${pkg.description}`" :data-index="i" @click="showMD(url)">
          <img :src="pkg.icon" :alt="pkg.name" mx16 w42 h42 />
          <div w0 flex-1>
            <div truncate font-700 lh-19>{{ pkg.displayName || pkg.name }}</div>
            <div class="desc" :c="url == drawer.url ? 'inherit' : '[--vs-desc-c]'" truncate lh-17>{{ pkg.description }}</div>
            <div flex aic text-12 lh-24>
              <div class="author" :c="url == drawer.url ? 'inherit' : '[--vs-desc-c]'" lh-24>{{ pkg.author?.author || pkg.author }}</div>
              <button v-if="!designerCtx.root.plugins?.includes(url)" class="vs-btn mla px5! text-11! lh-16!" :disabled="pkg.disabled" @click.stop="(designerCtx.root.plugins ??= []).push(url)">Install</button>
            </div>
          </div>
        </div>
      </template>
      <template #loading>
        <div flex jcc aic h74>
          <i-mingcute:loading-fill animate-spin />
        </div>
      </template>
    </Async>
  </div>

  <!-- README -->
  <ElDrawer v-model="drawer.vis" class="[&>.el-drawer\_\_body]:p0" modal-class="bg-#000/20" size="80%" :with-header="false" destroy-on-close>
    <MD :url="drawer.url + '/.lowcode/README.md'" wfull select-text />
  </ElDrawer>
</template>

<script setup lang="ts">
import { reactive, inject, defineComponent, h } from 'vue'
import { computedAsync } from '@vueuse/core'
import { ElMessage, ElMessageBox, ElDrawer, ElTooltip } from 'element-plus'

import { DesignerCtx } from '@el-lowcode/designer'
import { vListFocus } from '@el-lowcode/utils'
import MD from './MD.vue'

const designerCtx = inject<DesignerCtx>('designerCtx')!

const cache = {}
function loadPkg(url) {
  return cache[url] ??= () => fetch(`${url}/.lowcode/package.json`).then(e => e.json())
}

const Async = defineComponent({
  props: ['load'],
  setup(props, { slots }) {
    const ret = computedAsync(props.load)
    return () => ret.value ? slots.default!({ data: ret.value }) : slots.loading!()
  }
})

async function addRemotePlugin(url?) {
  const { value } = await ElMessageBox.prompt('', '远程插件', { inputValue: url, inputPlaceholder: 'http://xxx' })
  if (!/https?:\/\//.test(value)) return ElMessage.error({ message: '地址错误' })
  const plugins = designerCtx.root.plugins ??= []
  plugins.push(value)
}


const drawer = reactive({
  vis: false,
  url: ''
})

function showMD(url) {
  drawer.vis = true
  drawer.url = url
}
</script>