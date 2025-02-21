<template>
  <div flex="~ ">
    <div class="vs-list" b-r-1 overflow-auto>
      <template v-for="(arr, type) in groupByed">
        <div v-if="groupByed[type]" :class="['flex-shrink-0 px12 py8 vs-li truncate', state.category == type && 'selected']" @mouseenter="state.category = type">
          {{ { undefined: '其他', '': '所有' }[type] ?? type }}
        </div>
      </template>
    </div>
    <div self-start flex-1 hfull overflow-auto style="background: var(--vs-li-hover-bg);">
      <div :grid="`~ cols-${state.cols}`" gap-6 gap-y-10 p8 style="grid-auto-flow: row dense">
        <template v-for="wgt in groupByed[state.category]">
          <div v-if="!wgt.hidden" :class="`comp-li col-span-${min(wgt.coverSpan, state.cols)}`" flex="~ col" :lcd-snippet="wgt.id" draggable="true">
            <div class="comp-cover">
              <img :src="unVal(wgt.cover) || 'https://img.alicdn.com/tfs/TB1SnwliYr1gK0jSZR0XXbP8XXa-192-144.png_300x300Q90.jpg'" wfull hfull draggable="false" />
            </div>
            <!-- <div text-center capitalize mt2>{{ wgt.label }}</div> -->
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { defaults, groupBy, unVal } from '@el-lowcode/utils'

const props = defineProps({
  state: Object,
  list: Array
})

const state =  defaults(props.state, { category: '', cols: 1 })

const groupByed = computed(() => {
  const ret = { '': props.list, ...groupBy((props.list || []), 'category') }
  const other = ret.undefined
  delete ret.undefined
  ret.undefined = other
  return ret
})

const min = (...arg) => Math.min(...arg)
</script>
