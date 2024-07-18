<template>
  <VueEcharts ref="echarts" v-bind="$attrs" :option="_option" />
</template>

<script setup>
import { computed, ref } from 'vue'
import merge from 'lodash-es/merge'
import pick from 'lodash-es/pick'

// 按需引入 ECharts 图表和组件
// https://echarts.apache.org/handbook/zh/basics/import#%E6%8C%89%E9%9C%80%E5%BC%95%E5%85%A5-echarts-%E5%9B%BE%E8%A1%A8%E5%92%8C%E7%BB%84%E4%BB%B6
import { use } from 'echarts/core'
import { LegendComponent, TooltipComponent, GridComponent, DatasetComponent, TransformComponent, ToolboxComponent } from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers'
import VueEcharts from 'vue-echarts'

import { RadarChart } from 'echarts/charts'

use([ LegendComponent, TooltipComponent, GridComponent, DatasetComponent, TransformComponent, ToolboxComponent, LabelLayout, UniversalTransition, CanvasRenderer, SVGRenderer ])
use([ RadarChart ])

const props = defineProps({
  data: Array,
  option: Object
})

const echarts = ref()

const _option = computed(() => {
  const indicator = props.option.radar.indicator
  const originData = props.option.series.data
  const option = merge({ ...props.option }, {
    radar: {},
    series: { type: 'radar' }
  })
  option.series.data = props.data?.map((e, i) => merge({ value: Object.values(pick(e, indicator.map(e => e.key))) }, originData[i]))
  return option
})
</script>
