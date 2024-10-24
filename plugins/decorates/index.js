import { defineAsyncComponent, h } from 'vue'

export default {
  install(app) {
    app.component('border-01', defineAsyncComponent(() => import('./borders/border-01.vue')))
  }
}