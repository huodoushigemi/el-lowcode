import { defineAsyncComponent } from 'vue'

export default {
  install(app) {
    app.component('ELine', defineAsyncComponent(() => import('./ELine.vue')))
    app.component('EBar', defineAsyncComponent(() => import('./EBar.vue')))
    app.component('EPie', defineAsyncComponent(() => import('./EPie.vue')))
    app.component('ERadar', defineAsyncComponent(() => import('./ERadar.vue')))
  }
}