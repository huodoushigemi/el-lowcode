<template>
  <VueEcharts v-bind="$attrs" :option="_option" />
</template>

<script setup>
import { computed } from 'vue'
import { merge } from 'lodash-es'

// 按需引入 ECharts 图表和组件
// https://echarts.apache.org/handbook/zh/basics/import#%E6%8C%89%E9%9C%80%E5%BC%95%E5%85%A5-echarts-%E5%9B%BE%E8%A1%A8%E5%92%8C%E7%BB%84%E4%BB%B6
import { use } from 'echarts/core'
import { TitleComponent, TooltipComponent, GridComponent, DatasetComponent, TransformComponent } from 'echarts/components'
import { LabelLayout, UniversalTransition } from 'echarts/features'
import { CanvasRenderer, SVGRenderer } from 'echarts/renderers'
import VueEcharts from 'vue-echarts'

import { LineChart } from 'echarts/charts'

use([ TitleComponent, TooltipComponent, GridComponent, DatasetComponent, TransformComponent, LabelLayout, UniversalTransition, CanvasRenderer, SVGRenderer ])
use([ LineChart ])

defineOptions({ name: 'ELine' })

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
  
<script>
export const el_lowcode = {
  is: 'ELine',
  label: '线型图',
  props: (props) => [
    { lp: 'data', script: true },
    { lp: 'fields', script: true },

    { is: 'ElFormRender', model: props.option, size: 'small', children: [
      { is: 'ElTabs', children: [
        { is: 'ElTabPane', label: 'Grid', lazy: true, children: [
          {is: 'div', class: 'grid aic text-12', style: 'grid-template-columns: 50px 1fr; gap: 4px 0;', children: [
            'top', { prop: 'grid.top', type: 'slider', script: false, class: 'mb0' },
            'right', { prop: 'grid.right', type: 'slider', script: false, class: 'mb0'  },
            'bottom', { prop: 'grid.bottom', type: 'slider', script: false, class: 'mb0'  },
            'left', { prop: 'grid.left', type: 'slider', script: false, class: 'mb0'  },
            { is: 'input', type: 'button', value: 'reset', onClick: () => props.option.grid = void 0 },
          ]}
        ] },
        { is: 'ElTabPane', label: 'Axis', lazy: true, children: [
          { is: 'ElCollapse', children: [
            { is: 'ElCollapseItem', title: 'x axis', children: [
              { is: 'h4', class: 'flex aic mb8', children: ['axis-label', { prop: 'xAxis.axisLabel.show', type: 'switch', displayValue: false, script: false, class: 'mla mb0' }] },
              { is: 'div', class: 'text-12', style: 'display: grid; grid-template-columns: 130px 1fr', children: [
                { prop: 'xAxis.axisLabel.rotate', type: 'slider', displayValue: 0, script: false, el: { min: -90, max: 90, formatTooltip: v => `rotate: ${v}°` } },
                { prop: 'xAxis.axisLabel.color', type: 'color-picker', displayValue: '#333', script: false },
                { prop: 'xAxis.axisLabel.margin', type: 'input-number', displayValue: 8, script: false }, 'gap',
                { prop: 'xAxis.axisLabel.fontSize', type: 'input-number', displayValue: 12, script: false }, 'size',
              ] },
              { is: 'h4', class: 'flex aic mb8', children: ['axis-line', { prop: 'xAxis.axisLine.show', type: 'switch', displayValue: true, script: false, class: 'mla mb0' }] },
              { is: 'div', class: 'flex aic', children: [
                { prop: 'xAxis.axisLine.lineStyle.width', type: 'input-number', displayValue: 1, script: false, el: { max: 5 } },
                { prop: 'xAxis.axisLine.lineStyle.color', type: 'color-picker', script: false, class: 'ml8' },
                { prop: 'xAxis.axisLine.lineStyle.type', options: ['solid', 'dash'], displayValue: 'solid', script: false, class: 'ml8' },
              ] },
              { is: 'h4', class: 'flex aic mb8', children: ['split-line', { prop: 'xAxis.splitLine.show', type: 'switch', displayValue: true, script: false, class: 'mla mb0' }] },
              { is: 'div', class: 'flex aic', children: [
                { prop: 'xAxis.splitLine.lineStyle.width', type: 'input-number', displayValue: 1, script: false, el: { max: 5 } },
                { prop: 'xAxis.splitLine.lineStyle.color', type: 'color-picker', defaultValue: '#484753', script: false, class: 'ml8' },
                { prop: 'xAxis.splitLine.lineStyle.type', options: ['solid', 'dash'], displayValue: 'solid', script: false },
              ] },
            ] },
            { is: 'ElCollapseItem', title: 'y axis', children: [
              { is: 'h4', class: 'flex aic mb8', children: ['axis-label', { prop: 'yAxis.axisLabel.show', type: 'switch', displayValue: true, script: false, class: 'mla mb0' }] },
              { is: 'div', class: 'text-12', style: 'display: grid; grid-template-columns: 130px 1fr', children: [
                { prop: 'yAxis.axisLabel.rotate', type: 'slider', displayValue: 0, script: false, el: { min: -90, max: 90, formatTooltip: v => `rotate: ${v}°` } },
                { prop: 'yAxis.axisLabel.color', type: 'color-picker', displayValue: '#333', script: false },
                { prop: 'yAxis.axisLabel.margin', type: 'input-number', displayValue: 8, script: false }, 'gap',
                { prop: 'yAxis.axisLabel.fontSize', type: 'input-number', displayValue: 12, script: false }, 'size',
              ] },
              { is: 'h4', class: 'flex aic mb8', children: ['axis-line', { prop: 'yAxis.axisLine.show', type: 'switch', displayValue: true, script: false, class: 'mla mb0' }] },
              { is: 'div', class: 'flex aic', children: [
                { prop: 'yAxis.axisLine.lineStyle.width', type: 'input-number', displayValue: 1, script: false, el: { max: 5 } },
                { prop: 'yAxis.axisLine.lineStyle.color', type: 'color-picker', script: false, class: 'ml8' },
                { prop: 'yAxis.axisLine.lineStyle.type', options: ['solid', 'dash'], displayValue: 'solid', script: false, class: 'ml8' },
              ] },
              { is: 'h4', class: 'flex aic mb8', children: ['split-line', { prop: 'yAxis.splitLine.show', type: 'switch', displayValue: true, script: false, class: 'mla mb0' }] },
              { is: 'div', class: 'flex aic', children: [
                { prop: 'yAxis.splitLine.lineStyle.width', type: 'input-number', displayValue: 1, script: false, el: { max: 5 } },
                { prop: 'yAxis.splitLine.lineStyle.color', type: 'color-picker', defaultValue: '#484753', script: false, class: 'ml8' },
                { prop: 'yAxis.splitLine.lineStyle.type', options: ['solid', 'dash'], displayValue: 'solid', script: false },
              ] },
            ] }
          ] },
        ] },
        { is: 'ElTabPane', label: 'Series', lazy: true, children: [
          { is: 'ElFormRender', model: props.series[0], size: 'small', children: [
            { is: 'h4', class: 'flex aic mb8', children: ['label', { prop: 'label.show', type: 'switch', script: false, class: 'mla mb0' }] },
            { is: 'div', class: 'flex aic', children: [
              { prop: 'label.size', type: 'input-number', displayValue: 12, script: false },
              { prop: 'label.color', type: 'color-picker', script: false, class: 'ml8' },
              { prop: 'label.position', options: ['top', 'left', 'right', 'bottom'], displayValue: 'top', script: false, class: 'ml8' },
            ] },
            { is: 'h4', class: 'flex aic mb8', children: ['line', { prop: 'lineStyle', type: 'switch', get: v => !!v, set: v => v ? {} : void 0, script: false, class: 'mla mb0' }] },
            { is: 'div', class: 'flex aic', children: [
              // { prop: 'areaStyle.opacity', type: 'slider', displayValue: .7, script: false, class: 'flex-1', el: { min: 0, max: 1, step: .1, formatTooltip: v => `opacity: ${v * 100} %` } },
              { prop: 'lineStyle.width', type: 'input-number', displayValue: 2, script: false },
              { prop: 'lineStyle.color', type: 'color-picker', script: false, class: 'ml8' },
              { prop: 'lineStyle.solid', options: ['solid', 'dashed', 'dotted'], displayValue: 'solid', script: false },
            ] },
            { is: 'h4', class: 'flex aic mb8', children: ['area-style', { prop: 'areaStyle', type: 'switch', get: v => !!v, set: v => v ? {} : void 0, script: false, class: 'mla mb0' }] },
            { is: 'div', class: 'flex aic', children: [
              { prop: 'areaStyle.opacity', type: 'slider', displayValue: .7, script: false, class: 'flex-1', el: { min: 0, max: 1, step: .1, formatTooltip: v => `opacity: ${v * 100} %` } },
              { prop: 'areaStyle.color', type: 'color-picker', script: false },
            ] },
            { is: 'h4', class: 'flex aic mb8', children: ['shadow', { prop: 'lineStyle.shadowColor', type: 'switch', get: v => !!v, set: v => v ? 'rgb(128, 255, 165)' : void 0, script: false, class: 'mla mb0' }] },
            { is: 'div', class: 'flex aic', children: [
              { prop: 'lineStyle.shadowBlur', type: 'input-number', displayValue: 10, script: false },
              { prop: 'lineStyle.shadowColor', type: 'color-picker', script: false, class: 'ml8' },
            ] },
            { is: 'div', class: 'flex aic text-12', children: [
              'x',
              { prop: 'lineStyle.shadowOffsetX', type: 'slider', displayValue: 'solid', script: false, class: 'flex-1' },
              'y',
              { prop: 'lineStyle.shadowOffsetY', type: 'slider', script: false, class: 'flex-1'  },
            ] },
            // { lp: 'smooth', type: 'switch' }
            { is: 'h4', class: 'flex aic mb8', children: ['smooth', { prop: 'smooth', type: 'switch', script: false, class: 'mla mb0' }] },
          ] },
        ] },
        { is: 'ElTabPane', label: 'Tooltip', lazy: true, children: [
          
        ] },
        { is: 'ElTabPane', label: 'Legend', lazy: true, children: [
          
        ] },
        { is: 'ElTabPane', label: 'Toolbox', lazy: true, children: [
          
        ] },
      ] },

    ] },

    { is: 'ElDivider' },
    { is: 'h1', children: 'Common' },
    { lp: 'autoresize', type: 'switch' },
    { lp: ['svg', 'initOptions.renderer'], type: 'switch', get: v => !!v, set: v => v ? 'svg' : void 0 },
    { lp: ['dark', 'theme'], type: 'switch', get: v => !!v, set: v => v ? 'dark' : void 0 },

    { is: 'ElDivider' },
    { is: 'h1', children: 'Event' },
    { lp: 'onFinished', script: true },
    { lp: 'onSelectchanged', displayValue: `{{() => {\n  \n}}}`, script: true },
    { lp: 'onLegendselectchanged', script: true },
    { lp: 'onLegendselected', script: true },
  ],
  defaultProps: () => ({
    data: `{{${JSON.stringify([{ x: 'Mon', y: 150 }, { x: 'Tue', y: 230 }, { x: 'Wed', y: 224 }, { x: 'Thu', y: 218 }, { x: 'Fri', y: 135 }, { x: 'Sat', y: 147 }, { x: 'Sun', y: 260 }], undefined, ' ')}}}`,
    fields: `{{{ x: 'x', y: 'y' }}}`,
    autoresize: true,
    style: { height: '300px', width: '400px' },
    option: {},
    series: [{}]
  })
}
</script>