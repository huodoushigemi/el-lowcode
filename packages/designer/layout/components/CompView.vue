<template>
  <div px20>
    <div v-for="(arr, category) in groupBy(list || [], 'category')" py8>
      <h3 mt4 mb10>{{ category == 'undefined' ? '其他' : category }}</h3>
      <div grid="~ cols-2" gap-8>
        <div v-for="wgt in arr.filter(e => e.drag != false)" class="comp-li vs-li" :data-is="wgt.is" draggable="true" text-14 truncate tabindex="0">{{ wgt.label }}</div>
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

<style>
.comp-li {
  display: flex;
  justify-content: center;
  padding: 4px 6px;
  height: max-content;
  border: 1px dashed var(--el-border-color);
  cursor: move;
}
</style>