<template>
  <div :grid="`~ cols-${state.cols}`" gap-6 gap-y-10 p8 style="grid-auto-flow: row dense">
    <template v-for="wgt in list">
      <div v-if="!wgt.hidden" :class="`comp-li col-span-${min(wgt.coverSpan, state.cols)}`" flex="~ col" :lcd-is="wgt.is" draggable="true">
        <div class="comp-cover">
          <img :src="unVal(wgt.cover) || 'https://img.alicdn.com/tfs/TB1SnwliYr1gK0jSZR0XXbP8XXa-192-144.png_300x300Q90.jpg'" wfull draggable="false" />
        </div>
        <div text-center capitalize mt2>{{ wgt.label }}</div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { unVal } from '@el-lowcode/utils'

const props = defineProps({
  state: Object,
  list: Array
})

const min = (...arg) => Math.min(...arg)
</script>

<style lang="scss">
.comp-li {
  @apply justify-center cursor-move;
  &:hover .comp-cover {
    // @apply [&>img]:scale-125;
    outline: 1px solid var(--vs-focus-b-c);
    outline-offset: -1px;
  }
  .comp-cover {
    @apply flex jcc aic p4 wfull hfull max-h256 min-h36 bg-#000/40 overflow-hidden;
    & > img {
      @apply transition-all object-scale-down;
    }
  }
}
</style>