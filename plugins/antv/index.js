import AntvPivotSheet from './antv-pivot-sheet.vue'

await new Promise(resolve => {
  const script = Object.assign(document.createElement('script'), {
    src: 'https://unpkg.com/@antv/s2@2.0.0-next.30/dist/index.min.js',
    onload: resolve
  })
  document.head.append(script)
})

export default {
  install(app) {
    app.component('antv-pivot-sheet', AntvPivotSheet)
  }
}