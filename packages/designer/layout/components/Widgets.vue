<template>
  <div flex>
    <div class="vs-list" b-r-1>
      <div v-for="(arr, type) in groupByed" :class="['p6 vs-li truncate', category == type && 'selected']" @mouseenter="category = type">
        {{ type == 'undefined' ? '其他' : type }}
      </div>
    </div>
    <div self-start flex-1 py20 my12 grid="~ cols-1" gap-8>
      <!-- <div v-for="(arr, category) in groupByed[category]" my12>
        <h4 mt4 mb10>{{ category == 'undefined' ? '其他' : category }}</h4>
        <div grid="~ cols-3" gap-8>
          <template v-for="wgt in arr" >
            <div v-if="!wgt.hidden" class="comp-li vs-ai" :lcd-is="wgt.is" draggable="true" truncate tabindex="0">{{ wgt.label }}</div>
          </template>
        </div>
      </div> -->
      <template v-for="wgt in groupByed[category]">
        <div v-if="!wgt.hidden" class="comp-li vs-ai" flex="~ col" :lcd-is="wgt.is" draggable="true">
          <img :src="wgt.cover || 'https://img.alicdn.com/tfs/TB1SnwliYr1gK0jSZR0XXbP8XXa-192-144.png_300x300Q90.jpg'" draggable="false" max-h-128 object-scale-down />
          {{ wgt.label }}
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect } from 'vue'
import { groupBy } from '@el-lowcode/utils'

const props = defineProps({
  list: Array
})

const groupByed = computed(() => groupBy((props.list || []), 'category'))
const category = ref('')

watchEffect(() => category.value = Object.keys(groupByed.value)[0])
</script>

<style lang="scss" scoped>
.comp-li {
  @apply px4 py6 cursor-move;
  height: max-content;
}
</style>