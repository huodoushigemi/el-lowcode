<template>
  <div class="lc-slider flex" :class="[isFocus && 'is-focus']" @click="inputRef.focus()">
    <label flex-1>
      <div absolute top--14 px8 op75 lh-18 cursor-w-resize select-none @mousedown="mousedown">{{ label }}</div>
      <input ref="inputRef" :value="_value" @input="_value = $event.target.value" type="number" px8 @focus="isFocus = true" @blur="isFocus = false" />
    </label>
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
  border: 1px solid var(--el-input-border-color, var(--el-border-color));
  // border-radius: var(--el-input-border-radius,var(--el-border-radius-base));

  &.is-focus {
    border-color: var(--el-color-primary);
  }

  > label {
    > input {
      outline: 0;

      &::-webkit-inner-spin-button, &::-webkit-outer-spin-button {
        -webkit-appearance: none;
        margin: 0;
      }
    }
  }
}
</style>