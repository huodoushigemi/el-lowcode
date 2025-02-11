<template>
  <div flex="~ ">
    <div class="vs-list" b-r-1 overflow-auto>
      <div v-for="(arr, type) in groupByed" :class="['flex-shrink-0 px12 py8 vs-li truncate', category == type && 'selected']" @mouseenter="category = type">
        {{ type == 'undefined' ? '其他' : type }}
      </div>
    </div>
    <div self-start flex-1 hfull overflow-auto style="background: var(--vs-li-hover-bg);">
      <div grid="~ cols-2" gap-6 gap-y-10 p8>
        <template v-for="wgt in groupByed[category]">
          <div v-if="!wgt.hidden" class="comp-li ha" flex="~ col" :lcd-is="wgt.is" draggable="true">
            <img class="comp-cover" :src="wgt.cover || 'https://img.alicdn.com/tfs/TB1SnwliYr1gK0jSZR0XXbP8XXa-192-144.png_300x300Q90.jpg'" draggable="false" />
            <div capitalize mt2>{{ wgt.label }}</div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watchEffect, reactive } from 'vue'
import { groupBy } from '@el-lowcode/utils'

const props = defineProps({
  state: { type: Object, default: () => (reactive({})) },
  list: Array
})

const groupByed = computed(() => groupBy((props.list || []), 'category'))
const category = ref('')

watchEffect(() => category.value = Object.keys(groupByed.value)[0])
</script>

<style lang="scss" scoped>
.comp-li {
  @apply justify-center items-center cursor-move;
  &:hover .comp-cover {
    outline: 1px solid var(--vs-focus-b-c);
    outline-offset: -1px;
  }
  .comp-cover {
    @apply px4 py6 wfull hfull max-h256 min-h36 object-scale-down bg-#000/40;
  }
}
</style>