<template>
  <div flex="~ ">
    <div class="vs-list" b-r-1 overflow-auto>
      <div v-for="(arr, type) in groupByed" :class="['flex-shrink-0 px12 py8 vs-li truncate', state.category == type && 'selected']" @mouseenter="state.category = type">
        {{ { undefined: '其他', '': '所有' }[type] ?? type }}
      </div>
    </div>
    <div self-start flex-1 hfull overflow-auto style="background: var(--vs-li-hover-bg);">
      <div :grid="`~ cols-${state.cols}`" gap-6 gap-y-10 p8>
        <template v-for="wgt in groupByed[state.category]">
          <div v-if="!wgt.hidden" class="comp-li ha" flex="~ col" :lcd-is="wgt.is" draggable="true">
            <img class="comp-cover" :src="unVal(wgt.cover) || 'https://img.alicdn.com/tfs/TB1SnwliYr1gK0jSZR0XXbP8XXa-192-144.png_300x300Q90.jpg'" draggable="false" />
            <div capitalize mt2>{{ wgt.label }}</div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'
import { defaults, groupBy, unVal } from '@el-lowcode/utils'

const props = defineProps({
  state: Object,
  list: Array
})

const state =  defaults(props.state, { category: '', cols: 1 })

const groupByed = computed(() => ({ '': props.list, ...groupBy((props.list || []), 'category') }))
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