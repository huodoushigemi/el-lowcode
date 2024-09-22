import mergeWith from 'lodash-es/mergeWith'
// import merge from 'lodash-es/merge'

// 定制 merge 函数提升性能
const merge = (o1, o2) => typeof o2 != 'object' && o2 !== void 0 ? o2 : mergeWith(o1, o2, mergeCustomizer)
const mergeCustomizer = (obj, src) => obj === void 0 ? src : src === void 0 ? obj : merge(obj, src)

const toArr = arr => Array.isArray(arr) ? arr : (arr == null ? [] : [arr])
const is2D = data => Array.isArray(data) && Array.isArray(data[0])

export function normalizeLineOption({ option, vertical, seriesLayoutBy, category  }, type = 'line') {
  const data = option.dataset.source
  const tKey = e => is2D(data) ? +e : e
  
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

export function normalizePieOption({ option, seriesLayoutBy = 'column' }) {
  const col = seriesLayoutBy == 'column'
  return merge({
    series: option.series?.map(e => ({
      type: 'pie',
      seriesLayoutBy,
      // encode: e.encode?.itemName != null ? { itemName: '', value: '' } : void 0
    }))
  }, option)
}

function parseEncode(data, i, col = true) {
  i = i != null ? i + 1 : void 0
  if (is2D(data)) {
    return col ? { x: data[0][0], y: i ?? data[0][1] } : { x: data[0][0], y: data[1][0] }
  } else {
    const ks = Object.keys(data[0])
    return { x: ks[0], y: ks[i ?? 1] }
  }
}

export function parseXYs(data, col = true) {
  if (is2D(data)) {
    return col ? data[0] : data.map(e => e[0])
  } else {
    const ks = Object.keys(data[0])
    return Object.keys(data?.[0] || {})
  }
}