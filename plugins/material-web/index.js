import 'https://cdn.jsdelivr.net/npm/@material/web/all.js/+esm'

const list = [
  // Object.assign(document.createElement('script'), {
  //   type: 'importmap',
  //   innerHtml: JSON.stringify({ imports: { "@material/web/": "https://esm.run/@material/web/" } })
  // }),
  Object.assign(document.createElement('link'), {
    href: 'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500;700&display=swap',
    rel: 'stylesheet'
  }),
]

list.forEach(el => document.head.append(el))

// todo 'lit'
// const { styles } = await import('https://cdn.jsdelivr.net/npm/@material/web/typography/md-typescale-styles.js')
// console.log(styles);
// document.adoptedStyleSheets.push(styles.styleSheet)

export default {
  install(app) {
    
  }
}