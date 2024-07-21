<template>
  <div ref="el" :class="['pair-input', focused && 'is-focus', `pair-input--${size}`]">
    <input :value="modelValue[0]" @change="$emit('update:modelValue', [$event.target.value, modelValue[1]])" :placeholder="placeholder?.[0]" @focus="focused = true" @blur="onBlur" />
    <span>{{ separator }}</span>
    <input :value="modelValue[1]" @change="$emit('update:modelValue', [modelValue[0], $event.target.value])" :placeholder="placeholder?.[1]" @focus="focused = true" @blur="onBlur" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  modelValue: string[]
  placeholder?: string[]
  size?: 'large' | 'default' | 'small'
  separator?: string
}>()

defineEmits<{
  'update:modelValue': [string[]]
}>()

const focused = ref(false)
const el = ref<HTMLElement>()
function onBlur() {
  focused.value = el.value.contains(document.activeElement)
}
</script>

<style lang="scss">
.pair-input {
  display: inline-flex;
  width: 100%;
  height: var(--el-component-size);
  box-sizing: border-box;
  box-shadow: 0 0 0 1px var(--el-border-color) inset;

  &.is-focus {
    box-shadow: 0 0 0 1px var(--el-color-primary) inset;
  }

  &.large {
    height: var(--el-component-size-large);
  }
  &.small {
    height: var(--el-component-size-small);
    font-size: 12px;
  }

  input {
    flex: 1;
    padding: 0 11px;
    width: 0;
    outline: unset;
    border: unset;
    color: var(--el-text-color-regular);
    background: transparent;
  }
}
</style>