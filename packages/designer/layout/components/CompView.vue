<template>
  <div px20>
    <div v-for="(arr, category) in groupBy((list || []).filter(e => !e.hide), 'category')" my12>
      <h4 mt4 mb10>{{ category == 'undefined' ? '其他' : category }}</h4>
      <div grid="~ cols-2" gap-8>
        <template v-for="wgt in arr" >
          <div v-if="!wgt.hidden" class="comp-li vs-ai" :lcd-is="wgt.is" draggable="true" truncate tabindex="0">{{ wgt.label }}</div>
        </template>
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