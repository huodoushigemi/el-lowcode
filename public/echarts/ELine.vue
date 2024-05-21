<template>
  <VueEcharts v-bind="$attrs" :option="_option" />
</template>

<script setup>
import { computed } from 'vue'
import merge from 'lodash-es/merge'
// import { merge } from 'lodash-es'

// 按需引入 ECharts 图表和组件
// https://echarts.apache.org/handbook/zh/basics/import#%E6%8C%89%E9%9C%80%E5%BC%95%E5%85%A5-echarts-%E5%9B%BE%E8%A1%A8%E5%92%8C%E7%BB%84%E4%BB%B6
import { use } from 'echarts/core'
import { LegendComponent, TooltipComponent, GridComponent, DatasetComponent, TransformComponent, ToolboxComponent } from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers'
import VueEcharts from 'vue-echarts'

import { LineChart } from 'echarts/charts'

use([ LegendComponent, TooltipComponent, GridComponent, DatasetComponent, TransformComponent, ToolboxComponent, LabelLayout, UniversalTransition, CanvasRenderer, SVGRenderer ])
use([ LineChart ])

const props = defineProps({
  data: Array,
  fields: { type: Object, default: () => ({ x: 'x', y: 'y' }) },
  option: Object
})

const _option = computed(() => {
  return merge(props.option, {
    xAxis: {
      type: 'category',
      data: props.data?.map(item => item[props.fields.x]) || []
    },
    yAxis: {
      type: 'value'
    },
    series: [
      {
        data: props.data?.map(item => item[props.fields.y]) || [],
        type: 'line'
      }
    ]
  })
})
</script>
