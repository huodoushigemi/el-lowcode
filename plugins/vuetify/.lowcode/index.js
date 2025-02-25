import { watchEffect } from 'vue'
import { widgets } from './widgets'
import { snippets } from './snippets'

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

export function deactivate(lcd) {
  styleEl.remove()
}

export const contributes = {
  activitybar: [
    {
      id: 'vuetify',
      title: 'Vuetify',
      icon: 'https://api.iconify.design/logos:vuetifyjs.svg'
    },
  ],
  views: {
    'widgets': [
      { id: 'widgets.vuetify', name: true, icon: true, iconClass: 'my4', is: 'WidgetsView', list: widgets }
    ],
    'vuetify': [
      { id: 'vuetify.snippets', name: true, icon: true, iconClass: 'my4', is: 'SnippetsView2', list: snippets }
    ],
  }
}