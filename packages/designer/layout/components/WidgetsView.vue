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
      <Widgets :state :list="groupByed[state.category]" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { defaults, groupBy } from '@el-lowcode/utils'
import Widgets from './Widgets.vue'

const props = defineProps({
  state: Object,
  list: Array
})

const state =  defaults(props.state, { category: '', cols: 2 })

const groupByed = computed(() => {
  const ret = { '': props.list, ...groupBy((props.list || []), 'category') }
  const other = ret.undefined
  delete ret.undefined
  ret.undefined = other
  return ret
})
</script>
