import { watchEffect } from 'vue'
import widgets from './config'
export { default as widgets } from './config'

const styleEl = Object.assign(document.createElement('style'), {
  innerHTML: `
    .el-drawer__body > .empty-placeholder { height: 100% }
  `
})

export function activate(designerCtx) {
  watchEffect(() => {
    designerCtx.rootNode.el?.ownerDocument.head.append(styleEl)
  })
}

export function deactivate(designerCtx) {
  styleEl.remove()
}

export const contributes = (designerCtx) => ({
  views: {
    'widgets': [
      { id: 'widgets.element-plus', name: true, icon: true, initialSize: 600, iconClass: 'my4', is: ['widgets', { list: widgets }] }
    ],
  }
})
