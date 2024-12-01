import { watchEffect } from 'vue'
import { widgets } from './widgets'

export * from './widgets'
export * from './snippets'

const styleEl = Object.assign(document.createElement('style'), {
  innerHTML: `
    .v-expansion-panel-title__overlay { pointer-events: none; }
    .v-navigation-drawer__scrim { position: fixed }
    .v-progress-linear { transition: none }
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
      { id: 'widgets.vuetify', name: true, icon: true, iconClass: 'my4', is: ['widgets', { list: widgets }] }
    ],
  }
})