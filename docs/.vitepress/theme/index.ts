import DefaultTheme from 'vitepress/theme'
import { EnhanceAppContext } from 'vitepress'
import './custom.scss'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
// import 'virtual:uno.css'

import './crud'
import './mocks'

export default {
  ...DefaultTheme,
  enhanceApp(ctx: EnhanceAppContext) {
    // DefaultTheme.enhanceApp(ctx)
    ctx.app.use(ElementPlus)
  },
}