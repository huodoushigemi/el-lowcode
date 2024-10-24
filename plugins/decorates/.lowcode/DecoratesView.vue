<template>
  <div px20>
    <div v-for="(arr, category) in groupBy(widgets, 'category')">
      <h4 mt4 mb10>{{ category == 'undefined' ? '其他' : category }}</h4>
      <div grid="~ cols-2" gap-8>
        <template v-for="wgt in arr" >
          <div v-if="!wgt.hidden" class="vs-ai" flex="~ col" :lcd-is="wgt.is" draggable="true" style="border: 1px solid #36363b; border-radius: 4px; background-color: #242428;">
            <img class="-m1" :src="wgt.cover" draggable="false" />
            <div class="px12 py6">{{ wgt.label }}</div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { widgets } from './index'
import { groupBy } from '@el-lowcode/utils'


</script>