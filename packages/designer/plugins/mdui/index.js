import Tabs from './tabs'

import 'https://unpkg.com/mdui@2/mdui.global.js'

const list = [
  Object.assign(document.createElement('link'), { href: 'https://unpkg.com/mdui@2/mdui.css', rel: 'stylesheet' }),
]

list.forEach(el => document.head.append(el))

export default {
  install(app) {
    app.use(Tabs)
  }
}