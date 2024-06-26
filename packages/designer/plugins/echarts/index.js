import ELine from './ELine.vue'
import EBar from './EBar.vue'

export default {
  install(app) {
    app.component(ELine.__name, ELine)
    app.component(EBar.__name, EBar)
  }
}