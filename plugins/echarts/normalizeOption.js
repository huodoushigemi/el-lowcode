import mergeWith from 'lodash-es/mergeWith'
// import merge from 'lodash-es/merge'

// 定制 merge 函数提升性能
const merge = (o1, o2) => typeof o2 != 'object' && o2 !== void 0 ? o2 : mergeWith(o1, o2, mergeCustomizer)
const mergeCustomizer = (obj, src) => obj === void 0 ? src : src === void 0 ? obj : merge(obj, src)

const toArr = (arr) => Array.isArray(arr) ? arr : (arr == null ? [] : [arr])

export function normalizeLineOption({ option, vertical, seriesLayoutBy, category  }, type = 'line') {
  const data = option.dataset.source
  const arr2d = Array.isArray(data) && Array.isArray(data[0])
  const tKey = e => arr2d ? +e : e
  
  return merge({
    [vertical ? 'yAxis' : 'xAxis']: option.xAxis?.map(e => ({ ...e, type: 'category' })),
    [vertical ? 'xAxis' : 'yAxis']: option.yAxis?.map(e => ({ ...e, type: 'value', alignTicks: true })),
    series: option.series?.map(e => ({
      type,
      seriesLayoutBy,
      [vertical ? 'xAxisIndex' : 'yAxisIndex']: e.$axis || 0,
      encode: !e.$key && !category ? void 0 :{
        x: vertical ? tKey(e.$key) : category,
        y: vertical ? category : tKey(e.$key)
      }
    }))
  }, {
    ...option,
    xAxis: void 0,
    yAxis: void 0,
  })
}

export function normalizeBarOption(props) {
  console.log(normalizeLineOption(props, 'bar'));
  
  return normalizeLineOption(props, 'bar')
}