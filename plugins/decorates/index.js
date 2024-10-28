import { defineAsyncComponent as Async, h } from 'vue'

export default {
  install(app) {
    app.component('border-01', Async(() => import('./borders/border-01.vue')))
    app.component('border-02', Async(() => import('./borders/border-02.vue')))
    app.component('border-03', Async(() => import('./borders/border-03.vue')))
    app.component('border-04', Async(() => import('./borders/border-04.vue')))
    app.component('border-05', Async(() => import('./borders/border-05.vue')))
    app.component('border-06', Async(() => import('./borders/border-06.vue')))
    app.component('border-07', Async(() => import('./borders/border-07.vue')))
    app.component('border-08', Async(() => import('./borders/border-08.vue')))
    app.component('border-09', Async(() => import('./borders/border-09.vue')))
    app.component('border-10', Async(() => import('./borders/border-10.vue')))
    app.component('border-11', Async(() => import('./borders/border-11.vue')))
    app.component('border-12', Async(() => import('./borders/border-12.vue')))
    app.component('border-13', Async(() => import('./borders/border-13.vue')))
  }
}