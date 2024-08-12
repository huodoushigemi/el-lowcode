<template>
  <div flex aic px8 py12 text-22 b-b="1 solid [--el-border-color]">
    <!-- 插件市场 -->
    <ElTooltip content="远程插件" placement="right"><i-ep:plus mla p6 text-24 bg-hover cursor-pointer @click="addRemotePlugin()" /></ElTooltip>
     <!-- <button class="vs-btn" flex aic mla @click="addRemotePlugin()">+ 远程插件</button> -->
  </div>
  <div class="">
    <template v-for="[url, pkg] in plugins.map(e => [e, loadPkg(e)])">
      <div v-if="pkg" :key="url" :class="['vs-li plugin-li', url == drawer.url && 'selected']" flex aic pr8 h74 :op="pkg.disabled && 40 " :title="`${pkg.name}\n\n${pkg.description}`" tabindex="0" @click="showMD(url)">
        <img :src="pkg.icon" :alt="pkg.name" mx16 w42 h42 />
        <div w0 flex-1>
          <div truncate font-700 lh-19>{{ pkg.displayName || pkg.name }}</div>
          <div class="desc" truncate lh-17>{{ pkg.description }}</div>
          <div flex aic text-12 lh-24>
            <div class="author" lh-24>{{ pkg.author?.author || pkg.author }}</div>
            <!-- <el-button v-if="!designerCtx.root.plugins?.includes(url)" class="py0! px4! rd-0!" type="info" size="small" :disabled="pkg.disabled" mla op80 style="height: 16px" @click.stop="(designerCtx.root.plugins ??= []).push(url)">install</el-button>
            <div v-else></div> -->
            <button class="vs-btn mla px5! text-11! lh-16!" :disabled="pkg.disabled" @click.stop>Install</button>
          </div>
        </div>
      </div>
    </template>
  </div>

  <!-- README -->
  <ElDrawer v-model="drawer.vis" class="[&>.el-drawer\_\_body]:p0" modal-class="bg-#000/20" size="80%" :with-header="false" destroy-on-close>
    <MD :url="drawer.url + '/.lowcode/README.md'" wfull />
  </ElDrawer>
</template>

<script setup lang="ts">
import { reactive, inject } from 'vue'
import { computedAsync } from '@vueuse/core'
import { ElLoading, ElMessage, ElMessageBox, ElDrawer, ElTooltip } from 'element-plus'

import { DesignerCtx, ElLowcodeConfig } from '@el-lowcode/designer'
import { plugins } from './data'
import MD from './MD.vue'

const designerCtx = inject<DesignerCtx>('designerCtx')!

const pkgCache = {}
function loadPkg(url) {
  return (pkgCache[url] ??= computedAsync(() => fetch(`${url}/.lowcode/package.json`).then(e => e.json()))).value
}

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

<style lang="scss">
.plugin-li {
  > div {
    > .desc, > div > .author { color: var(--vs-desc-c); }
  
  }
  &.selected > div {
    > .desc, > div > .author { color: unset; }
  }
}
</style>