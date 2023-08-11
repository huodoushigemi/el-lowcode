import DefaultTheme from 'vitepress/theme'
import { EnhanceAppContext } from 'vitepress'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
// import 'virtual:uno.css'

export default {
  ...DefaultTheme,
  enhanceApp(ctx: EnhanceAppContext) {
    // DefaultTheme.enhanceApp(ctx)
    ctx.app.use(ElementPlus)
  },
}