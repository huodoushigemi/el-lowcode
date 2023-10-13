<script setup lang="ts">
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import Designer from '@el-lowcode/designer'
import { computedAsync } from '@vueuse/core'

const router = useRouter()

const designer = ref()
const encodeSchema = (schema) => encodeURIComponent(JSON.stringify(schema))
const schema = computed(() => encodeSchema(designer.value.root))

const templateModules = Object.values(import.meta.glob('../template/*.ts'))
const templates = computedAsync(async () => ((await Promise.all(templateModules.map(e => e()))).map(e => e.default).filter(e => e)))

function onEdit(item) {
  designer.value.root = item.schema()
}
function demoUrl(schema) {
  return router.resolve({ path: '/demo', query: { schema: encodeSchema(schema) } })
}
</script>

<template>
  <div h100vh>
    <Designer ref="designer" h100vh>
      <!-- 额外按钮 -->
      <template #actions>
        <el-tooltip content="preview"><i-mdi:play-circle-outline bg-hover @click="$router.push(demoUrl(designer.root).fullPath)" /></el-tooltip>
        <a href="https://github.com/huodoushigemi/el-lowcode" target="_blank" c="unset" bg-hover><i-bytesize:github wfull hfull /></a>
      </template>
      
      <!-- 在线模板 -->
      <template #activity-bar>
        <el-tab-pane lazy w256>
          <template #label><el-tooltip content="在线模板" placement="right" :hide-after="0"><i-mdi:shopping-outline w22 h22 /></el-tooltip></template>
          <div px8 py12 text-22 b-b="1 solid [--el-border-color]">在线模板</div>
          <div pl12 pr8 overflow-overlay>
            <el-card v-for="item in templates" shadow="hover" body-class="p0" my12>
              <el-image :src="item.cover" :preview-src-list="[item.cover]" />
              <div py8 px12>
                <div font-bold>{{ item.title }}</div>
                <div text-right>
                  <el-button size="default" type="primary" title="预览" plain text bg tag="a" :href="demoUrl(item.schema()).href" target="_blank" p8 decoration-none><i-mdi:eye-outline text-1.2em /></el-button>
                  <el-button size="default" type="primary" title="导入" plain text bg p8 @click="onEdit(item)"><i-mdi:application-import text-1.2em /></el-button>
                </div>
              </div>
            </el-card>
          </div>
        </el-tab-pane>
      </template>
    </Designer>
  </div>
</template>
