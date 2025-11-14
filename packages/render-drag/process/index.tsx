import { Component, createApp, h, onBeforeUnmount, onMounted, reactive, watchEffect } from 'vue'
import { CreateRender } from '@el-lowcode/render'
import type { DesignerCtx } from '../../designer/layout/interface'

import { FreeDrag } from './FreeDrag'
import { IframeEventBubble } from './IframeEventBubble'
import { EditText } from './EditText'
import { Resizable } from './Resizable'
import { Border } from './Border'
import { Drag } from './Drag'

export interface Process {
  store?: () => Partial<ProcessStore>
  mounted?: (store: ProcessStore) => void
  processProps?: CreateRender['processProps']
  layer?: Component<{ store: ProcessStore }>
  layer2?: Component<{ store: ProcessStore }>
}

export interface ProcessStore {
  lcd: DesignerCtx
}

export const createProcess = (lcd: DesignerCtx, process: Process[]) => {
  process = [
    IframeEventBubble,
    Border,
    EditText,
    FreeDrag,
    Resizable,
    Drag,
  ]
  const store = reactive({ lcd }) as unknown as ProcessStore
  watchEffect(() => process.forEach(e => Object.assign(store, e.store?.())))

  const processProps = (props, vars, xxx) => {
    return process.reduce((o, e) => e.processProps?.(o, vars, xxx), props)
  }

  onMounted(() => {
    process.forEach(e => e.mounted?.(store))
  })

  {
    const layers = document.createElement('div')
    layers.style = 'position: absolute; top: 0; left: 0'
    const app = createApp(() => process.filter(e => e.layer).map(e => h(e.layer!, { store })))
    app.mount(layers)
    document.body.append(layers)
    onBeforeUnmount(() => {
      layers.remove()
      app.unmount()
    })
  }

  {
    const layers = document.createElement('div')
    layers.style = 'position: absolute; transform: translate(0, 0); pointer-events: none; z-index: 1'
    // layers.style = 'position: absolute; pointer-events: none; z-index: 1'
    const app = createApp(() => process.filter(e => e.layer2).map(e => h(e.layer2!, { store })))
    app.mount(layers)
    frameElement?.before(layers)
    onBeforeUnmount(() => {
      layers.remove()
      app.unmount()
    })
  }

  return {
    store,
    processProps
  }
}