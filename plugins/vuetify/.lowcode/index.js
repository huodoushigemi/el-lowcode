import { watchEffect } from 'vue'

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
    designerCtx.rootCtx.el?.ownerDocument.head.append(styleEl)
  })
}

export function deactivate(designerCtx) {
  styleEl.remove()
}


// v-expansion-panel-title__overlay

export const contributes = {
  activitybar: [

  ]
}