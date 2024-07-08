<template>
  <div flex aic px8 py12 text-22 b-b="1 solid [--el-border-color]">
    插件市场
    <el-tooltip content="远程插件"><i-ep:plus mla p6 text-24 bg-hover cursor-pointer @click="addRemotePlugin()" /></el-tooltip>
  </div>
  <div>
    <template v-for="[url, pkg] in plugins.map(e => [e, loadPkg(e)])">
      <div v-if="pkg" :key="url" :class="[url == drawer.url && 'is-active b-y-1']" flex aic pr8 py8 h74 bg-hover rd-0 cursor-pointer select-none :op="pkg.disabled && 40 " :title="`${pkg.name}\n\n${pkg.description}`" @click="showMD(url)">
        <img :src="pkg.icon" :alt="pkg.name" mx16 w42 h42 />
        <div w0 flex-1>
          <div truncate text-18>{{ pkg.name }}</div>
          <div truncate text-12 op60>{{ pkg.description }}</div>
          <div flex text-12 mt4>
            <div op40>{{ pkg.author }}</div>
            <el-button v-if="!designerCtx.root.plugins?.includes(url)" class="py0! px4! rd-0!" type="info" size="small" :disabled="pkg.disabled" mla op80 style="height: 16px" @click.stop="(designerCtx.root.plugins ??= []).push(url)">install</el-button>
            <div v-else></div>
          </div>
        </div>
      </div>
    </template>
  </div>

  <!-- README -->
  <el-drawer v-model="drawer.vis" class="[&>.el-drawer\_\_body]:p0" modal-class="bg-#000/20" size="80%" :with-header="false" destroy-on-close>
    <MD :url="drawer.url + '/README.md'" wfull />
  </el-drawer>
</template>

<script setup lang="ts">
import { computed, provide, reactive, ref, onUpdated, watch, watchEffect, inject } from 'vue'
import { isArray, isPlainObject, remove } from '@vue/shared'
import { computedAsync, unrefElement, useDebouncedRefHistory, useDropZone, useEventListener, useLocalStorage } from '@vueuse/core'
import { ElLoading, ElMessage, ElMessageBox } from 'element-plus'

import { ElLowcodeConfig } from '../../components/type'
import { plugins, builtins } from '../config'
import { DesignerCtx } from '../interface'
import MD from './MD.vue'

const designerCtx = inject<DesignerCtx>('designerCtx')!

const pkgCache = {}
function loadPkg(url) {
  return (pkgCache[url] ??= computedAsync(() => fetch(`${url}/package.json`).then(e => e.json()))).value
}

const configCache = {}
function asyncConfig(url): ElLowcodeConfig[] {
  return (configCache[url] ??= computedAsync(() => loadConfig(url))).value
}

function loadConfig(url): Promise<ElLowcodeConfig[]> {
  return import(/* @vite-ignore */ `${url}/.lowcode/config.js`).then(e => e.default)
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