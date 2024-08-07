<template>
  <div>
    <div>
      {{ activitybar?.title }}
    </div>

    <div v-for="pane in list">
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, inject, PropType } from 'vue'
import { Activitybar, Contributes, DesignerCtx } from '../interface'

const props = defineProps({
  id: String,
  activitybar: Object as PropType<Activitybar>,
  list: Array as PropType<Contributes['views'][string]>
})

const designer = inject<DesignerCtx>('designerCtx')!
// const activitybar = computed(() => designer.plugins.find(e => e.contributes.activitybar.find(e => e.id == props.id)))
</script>