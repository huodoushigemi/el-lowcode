<template>
  <div wfull>
    <el-slider v-model="size" class="mb8 wunset!" :min="12" :max="64" />
    <div flex>
      <el-color-picker v-model="style.color" showAlpha size="default" />

      <!-- align -->
      <div flex mla space-x-2>
        <i-material-symbols-light:align-horizontal-left v-bind="useToggle('align', 'left')" />
        <i-material-symbols-light:align-horizontal-center v-bind="useToggle('align', 'center')" />
        <i-material-symbols-light:align-horizontal-right v-bind="useToggle('align', 'right')" />
      </div>

      <div flex mla space-x-2>
        <i-material-symbols-light:format-bold v-bind="useToggle('fontWeight', 'bold')" />
        <i-material-symbols-light:format-italic v-bind="useToggle('fontStyle', 'italic')" />
        <i-material-symbols-light:format-underlined v-bind="useToggle('textDecoration', 'underlined')" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useTransformer } from 'el-form-render'

const props = defineProps({
  modelValue: Object,
})

const emit = defineEmits(['update:modelValue'])

const style = computed(() => {
  return props.modelValue || new Proxy({}, {
    get: (t, p, r) => Reflect.get(t, p, r), 
    set: (t, p, v, r) => emit('update:modelValue', { [p]: v })
  })
})

const size = useTransformer(style, 'fontSize', { get: v => parseInt(v), set: v => v + 'px' })

function useToggle(prop, v) {
  return {
    class: 'bg-hover w28 h28 p2',
    style: style.value[prop] == v && 'background: #404040',
    onClick: () => style.value[prop] = style.value[prop] == v ? void 0 : v
  }
}
</script>