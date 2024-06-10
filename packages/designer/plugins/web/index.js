import Page from './page'
import Grid from './grid'
import Code from './code'

if (typeof document != 'undefined') import('wc-appbar')
if (typeof document != 'undefined') import('wc-waterfall')

export default {
  install(app) {
    app.use(Page)
    app.use(Grid)
    app.use(Code)
  }
}