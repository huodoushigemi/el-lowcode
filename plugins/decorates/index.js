import { defineAsyncComponent, h } from 'vue'

export default {
  install(app) {
    app.component('border-01', defineAsyncComponent(() => import('./borders/border-01.vue')))
    app.component('border-02', defineAsyncComponent(() => import('./borders/border-02.vue')))
    app.component('border-03', defineAsyncComponent(() => import('./borders/border-03.vue')))
    app.component('border-04', defineAsyncComponent(() => import('./borders/border-04.vue')))
  }
}