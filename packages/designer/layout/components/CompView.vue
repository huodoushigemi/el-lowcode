<template>
  <div px20>
    <div v-for="(arr, category) in groupBy((list || []).filter(e => !e.hide), 'category')" my12>
      <h4 mt4 mb10>{{ category == 'undefined' ? '其他' : category }}</h4>
      <div grid="~ cols-2" gap-8>
        <div v-for="wgt in arr.filter(e => e.drag != false)" class="comp-li vs-ai" :data-is="wgt.is" draggable="true" text-14 truncate tabindex="0">{{ wgt.label }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { groupBy } from '@el-lowcode/utils'

defineProps({
  list: Array
})
</script>

<style lang="scss">
.comp-li {
  display: flex;
  justify-content: center;
  padding: 4px 6px;
  height: max-content;
  border: 1px dashed var(--vscode-dropdown-border, #3c3c3c);
  cursor: move;
}
</style>