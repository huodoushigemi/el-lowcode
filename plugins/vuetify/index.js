const lib = [
  ['script', { src: 'https://unpkg.com/vuetify@3.7.4/dist/vuetify-labs.js' }],
  ['link', { href: 'https://unpkg.com/vuetify@3.7.4/dist/vuetify-labs.min.css', rel: 'stylesheet' }],
  ['link', { href: 'https://unpkg.com/@mdi/font@5.x/css/materialdesignicons.min.css', rel: 'stylesheet' }],
  ['style', {
    // todo
    innerHTML: `
      .v-progress-linear { position: absolute; }
      .v-expansion-panels { flex-direction: column; align-items: center; }
      .v-expansion-panel { width: 100% }
    `
  }]
]

await Promise.all(lib.map(e => new Promise((resolve, reject) => {
  const el = Object.assign(document.createElement(e[0]), { ...e[1], onload: resolve, onerror: reject })
  document.head.append(el)
})))

export default {
  install(app) {
    app.use(Vuetify.createVuetify({
      theme: {
        defaultTheme: 'dark'
      }
    }))
  }
}