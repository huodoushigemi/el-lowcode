<template>
  <div class="lc-slider flex" :class="[isFocus && 'is-focus']" @click="inputRef.focus()">
    <div w8 cursor-w-resize select-none @mousedown="mousedown"></div>
    <input ref="inputRef" :value="_value" @input="_value = $event.target.value" type="number" @focus="isFocus = true" @blur="isFocus = false" />
    <select ref="selectRef" :value="unit" px8 bg-hover rd-0 appearance-none outline-0 @click.stop @change="unit = $event.target.value; _value = _value">
      <option v-for="opt in units" :value="opt">{{ opt }}</option>
    </select>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { isString } from '@vue/shared'
import { useEventListener } from '@vueuse/core'

const props = defineProps({
  modelValue: [String, Number],
  min: { type: Number, default: -Infinity },
  max: { type: Number, default: Infinity },
  step: { type: Number, default: 1 },
  unit: { type: String, default: 'px' },
  units: { type: Array, default: () => ['px', '%', 'vw', 'vh'] },
  label: String
})

const emit = defineEmits(['update:modelValue'])

const inputRef = ref()
const selectRef = ref()
const isFocus = ref(false)

const unit = ref('')
watch(() => props.modelValue, v => {
  unit.value = v == null ? props.unit : isString(v) ? v.match(/\d*([a-z%]*)$/)[1] : ''
}, { immediate: true })

const _value = computed({
  get: () => clamp(parseFloat(props.modelValue)),
  set: v => emit('update:modelValue', unit.value ? `${clamp(v)}${unit.value}` : clamp(v))
})

const clamp = (v, min = props.min, max = props.max) => Math.max(min, Math.min(max, +(v || 0)))

let sv = 0, sx = 0
function mousedown(e) {
  sv = _value.value
  sx = e.pageX
  const stop = useEventListener('mousemove', e => {
    _value.value = sv + (e.pageX - sx) * props.step
    console.log(sv + (e.pageX - sx) * props.step);
  })
  const stop2 = useEventListener('mouseup', e => {
    stop()
    stop2()
  })
}
</script>

<style lang="scss">
.lc-slider {
  color: var(--el-text-color-regular);
  border-radius: var(--el-input-border-radius,var(--el-border-radius-base));
  padding: 2px 2px 2px 0;
  box-sizing: border-box;
  width: 100%;
  height: 24px;
  line-height: 20px;
  box-shadow: 0 0 0 1px var(--el-border-color) inset;

  &.is-focus {
    border-color: var(--el-color-primary);
  }

  > input {
    background: none;
    padding: 0 8px 0 0;
    flex: 1;
    &::-webkit-inner-spin-button, &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  > select, > input {
    color: inherit;
    outline: none;
    border: none;
  }
}
</style>