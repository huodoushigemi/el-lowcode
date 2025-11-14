import { defineAsyncComponent, h } from 'vue'
import { Process } from '.'
import SelectedLayer from './selected-layer.vue'

export const Border: Process = {
  layer2: ({ store: { lcd } }) => <SelectedLayer lcd={lcd} />
}
