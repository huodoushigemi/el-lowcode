<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { computedAsync } from '@vueuse/core'
import { useRouteQuery } from '@vueuse/router'
import Designer from '@el-lowcode/designer'
import { download } from '@el-lowcode/utils'

const router = useRouter()
const route = useRoute()

const designer = ref()
const encodeSchema = (schema) => encodeURIComponent(JSON.stringify(schema))

const templateModules = Object.values(import.meta.glob('../template/*.ts'))
const templatesPromise = async () => ((await Promise.all(templateModules.map(e => e()))).map(e => e.default).filter(e => e))
const templates = computedAsync(templatesPromise)

// query.templateId
templatesPromise().then(async templates => {
  watch(() => route.query.templateId, id => {
    const temp = templates.find(e => e.id == id)
    if (temp) onEdit(temp)
    router.replace({ query: { ...route.query, templateId: null } })
  }, { immediate: true, flush: 'post' })
})

// query.schema
const schema = useRouteQuery<string | undefined>('schema')
watch(schema, val => {
  if (!val) return
  const json = JSON.parse(val)
  designer.value.root = json
  schema.value = undefined
}, { immediate: true, flush: 'post' })

function onEdit(item) {
  designer.value.root = item.schema()
}
function demoUrl(schema) {
  return router.resolve({ path: '/demo', query: { schema: encodeSchema(schema) } })
}

function onDownload() {
  const html = `<script>
  window.location.href = \`http://httpsgiteecomepalserver.gitee.io/el-lowcode/designer/#/?schema=${encodeSchema(designer.value.root)}\`
<\/script>`
  download(html, `el-lowcode-${+new Date}.html`)
}
</script>

<template>
  <div h100vh>
    <Designer ref="designer" h100vh>
      <!-- 额外按钮 -->
      <template #actions>
        <el-tooltip content="preview"><i-mdi:play-circle-outline bg-hover @click="$router.push(demoUrl(designer.root).fullPath)" /></el-tooltip>
        <el-tooltip content="download"><i-mdi:folder-download bg-hover @click="onDownload" /></el-tooltip>
        <a href="https://github.com/huodoushigemi/el-lowcode" target="_blank" c="unset" bg-hover><i-bytesize:github wfull hfull /></a>
      </template>
      
      <!-- 在线模板 -->
      <template #activity-bar>
        <el-tab-pane lazy w256>
          <template #label><el-tooltip content="在线模板" placement="right" :hide-after="0"><i-mdi:shopping-outline w22 h22 /></el-tooltip></template>
          <div px8 py12 text-22 b-b="1 solid [--el-border-color]">在线模板</div>
          <div pl12 pr8 overflow-overlay>
            <el-card v-for="item in templates" shadow="hover" body-class="p0" my12>
              <el-image v-if="item.cover" :src="item.cover" :preview-src-list="[item.cover]" />
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
