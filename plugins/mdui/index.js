import Tabs from './tabs'

import 'https://unpkg.com/mdui@2.1.2/mdui.global.js'

const list = [
  Object.assign(document.createElement('link'), { href: 'https://unpkg.com/mdui@2.1.2/mdui.css', rel: 'stylesheet' }),
  // icon
  Object.assign(document.createElement('link'), { href: 'https://fonts.googleapis.com/icon?family=Material+Icons', rel: 'stylesheet' }),
  Object.assign(document.createElement('link'), { href: 'https://fonts.googleapis.com/icon?family=Material+Icons+Outlined' }),
  Object.assign(document.createElement('link'), { href: 'https://fonts.googleapis.com/icon?family=Material+Icons+Round', rel: 'stylesheet' }),
  Object.assign(document.createElement('link'), { href: 'https://fonts.googleapis.com/icon?family=Material+Icons+Sharp', rel: 'stylesheet' }),
  Object.assign(document.createElement('link'), { href: 'https://fonts.googleapis.com/icon?family=Material+Icons+Two+Tone', rel: 'stylesheet' }),
]

list.forEach(el => document.head.append(el))

export default {
  install(app) {
    app.use(Tabs)
  }
}