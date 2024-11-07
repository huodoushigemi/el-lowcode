const list = [
    // script
    Object.assign(document.createElement('script'), { href: 'https://cdn.jsdelivr.net/npm/vuetify@3.7.4/dist/vuetify.min.js' }),
    // style
    Object.assign(document.createElement('link'), { href: 'https://unpkg.com/mdui@2.1.3/mdui.css', rel: 'stylesheet' }),
  ]
  
  await Promise.all(list.map(e => new Promise((resolve, reject) => {
    e.onload = resolve
    e.onerror = reject
    document.head.append(e)
  })))
  
  export default {
    install(app) {
      app.use(Vuetify.createVuetify())
    }
  }