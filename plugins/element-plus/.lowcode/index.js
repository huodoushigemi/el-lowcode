import { watchEffect } from 'vue'
import widgets from './config'
export { default as widgets } from './config'

const styleEl = Object.assign(document.createElement('style'), {
  innerHTML: `
    .el-drawer__body > .empty-placeholder { height: 100% }
  `
})

export function activate(lcd) {
  watchEffect(() => {
    lcd.rootNode.el?.ownerDocument.head.append(styleEl)
  })
}

export function deactivate(lcd) {
  styleEl.remove()
}

export const contributes = (lcd) => ({
  views: {
    'widgets': [
      { id: 'widgets.element-plus', name: true, icon: true, initialSize: 600, iconClass: 'my4', is: 'WidgetsView', list: widgets }
    ],
  }
})
