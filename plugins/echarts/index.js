import ELine from './ELine.vue'
import EBar from './EBar.vue'
import EPie from './EPie.vue'
import ERadar from './ERadar.vue'

export default {
  install(app) {
    app.component(ELine.__name, ELine)
    app.component(EBar.__name, EBar)
    app.component(EPie.__name, EPie)
    app.component(ERadar.__name, ERadar)
  }
}