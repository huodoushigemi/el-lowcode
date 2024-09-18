<template>
  <VueEcharts v-bind="$attrs" :option="normalizeLineOption($props)" />
</template>

<script setup>
import { normalizeLineOption } from './normalizeOption'

// 按需引入 ECharts 图表和组件
// https://echarts.apache.org/handbook/zh/basics/import#%E6%8C%89%E9%9C%80%E5%BC%95%E5%85%A5-echarts-%E5%9B%BE%E8%A1%A8%E5%92%8C%E7%BB%84%E4%BB%B6
import { use } from 'echarts/core'
import { LegendComponent, TooltipComponent, GridComponent, DatasetComponent, TransformComponent, ToolboxComponent } from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers'
import VueEcharts from 'vue-echarts'

import { LineChart, BarChart } from 'echarts/charts'

use([ LegendComponent, TooltipComponent, GridComponent, DatasetComponent, TransformComponent, ToolboxComponent, LabelLayout, UniversalTransition, CanvasRenderer, SVGRenderer ])
use([ LineChart, BarChart ])

defineProps({
  option: Object,
  seriesLayoutBy: String,
  vertical: Boolean,
  category: String
})
</script>
