<template>
  <div :class="['vs-expand', open && 'expanded']">
  <!-- v-auto-animate="{ duration: 200, easing: 'linear' }" -->
    <div :class="['vs-expand-header', open && 'expanded']" flex cursor-pointer select-none tabindex="0" role="button" @click="open = !open">
      <i-ep:arrow-up class="mx2 p1 w16 h16" :rotate="open ? 180 : 90" text-12 />
      <div class="title flex aic uppercase font-700">
        <img v-if="icon" :class="[iconClass, 'mr6 w22 hfull object-contain']" :src="icon" />
        <slot name="title">{{ title }}</slot>
      </div>
      <slot name="actions" />
    </div>

    <slot v-if="open" />
  </div>
</template>

<script setup>
import { vAutoAnimate } from '@formkit/auto-animate'
import { useVModel } from '@vueuse/core'

const props = defineProps({
  modelValue: Boolean,
  defaultValue: Boolean,
  icon: String,
  iconClass: String,
  title: String
})

const open = useVModel(props, 'modelValue', void 0, { passive: true, defaultValue: props.defaultValue })
</script>

<style lang="scss">
.vs-expand {
  @apply flex flex-col;

  &-header {
    @apply flex aic relative cursor-pointer lh-22;
    background: var(--vscode-activityBar-background, #333333);
  }

  &-header.expanded {
    &::after{
      content: '';
      position: absolute;
      top: 100%;
      width: 100%;
      height: 3px;
      box-shadow: #000 0 6px 6px -6px inset;
    }
  }

  &-body {
    @apply relative flex-1 h0 overflow-auto;
  }
}
</style>
