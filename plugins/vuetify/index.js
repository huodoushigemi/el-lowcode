const lib = [
  ['script', { src: 'https://unpkg.com/vuetify@3.7.4/dist/vuetify.min.js' }],
  ['link', { href: 'https://unpkg.com/vuetify@3.7.4/dist/vuetify.min.css', rel: 'stylesheet' }],
]

await Promise.all(lib.map(e => new Promise((resolve, reject) => {
  const el = Object.assign(document.createElement(e[0]), { ...e[1], onload: resolve, onerror: reject })
  document.head.append(el)
})))

export default {
  install(app) {
    app.use(Vuetify.createVuetify())
  }
}