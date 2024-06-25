<template>
  <div :class="['el-collapse-item', open && 'is-active']" v-auto-animate="{ duration: 50, easing: 'linear' }">
    <div :class="['el-collapse-item__header', open && 'is-active']" flex cursor-pointer select-none :open="open" @click="open = !open">
      <div mra>{{ title }}</div>
      <slot name="extra" />
      <i-ep:arrow-up class="el-collapse-item__arrow" :rotate="open ? 180 : 90" ml8 text-12 />
    </div>

    <div v-if="open" class="el-collapse-item__wrap el-collapse-item__content">
      <slot />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { vAutoAnimate } from '@formkit/auto-animate'

const props = defineProps({
  open: Boolean,
  defaultOpen: Boolean,
  title: String
})

const open = ref(props.defaultOpen)
</script>
