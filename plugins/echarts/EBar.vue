<template>
  <VueEcharts ref="echarts" v-bind="$attrs" :option="_option" />
</template>

<script setup>
import { computed, ref } from 'vue'
import mergeWith from 'lodash-es/mergeWith'
// import merge from 'lodash-es/merge'

// 定制 merge 函数提升性能
const merge = (o1, o2) => typeof o2 != 'object' && o2 !== void 0 ? o2 : mergeWith(o1, o2, mergeCustomizer)
const mergeCustomizer = (obj, src) => obj === void 0 ? src : src === void 0 ? obj : merge(obj, src)

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

const props = defineProps({
  option: Object,
  seriesLayoutBy: String,
  vertical: Boolean,
  category: String
})

const echarts = ref()

const _option = computed(() => {
  const { option, vertical, seriesLayoutBy, category } = props
  
  const data = option.dataset.source
  const twoArr = Array.isArray(data) && Array.isArray(data[0])
  const tKey = e => twoArr ? +e : e
  
  return merge({
    xAxis: { type: vertical ? 'value' : 'category' },
    yAxis: { type: vertical ? 'category' : 'value' },
    series: props.option.series?.map(e => ({
      type: 'bar',
      seriesLayoutBy,
      encode: !e.$key && !category ? void 0 :{
        x: vertical ? tKey(e.$key) : category,
        y: vertical ? category : tKey(e.$key)
      }
    }))
  }, option)
})
</script>
