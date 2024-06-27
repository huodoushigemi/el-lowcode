import ELine from './ELine.vue'
import EBar from './EBar.vue'
import EPie from './EPie.vue'

export default {
  install(app) {
    app.component(ELine.__name, ELine)
    app.component(EBar.__name, EBar)
    app.component(EPie.__name, EPie)
  }
}