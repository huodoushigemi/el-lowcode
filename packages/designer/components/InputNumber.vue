<template>
  <div class="input-number" :class="[isFocus && 'is-focus']" @click="inputRef.focus()">
    <input ref="inputRef" :value="_value" @input="_value = $event.target.value" type="number" :class="[wresize && 'cursor-w-resize']" :placeholder="placeholder" @focus="isFocus = true" @blur="isFocus = false" />
    <select v-if="!hideUnit" ref="selectRef" :value="unit" px8 bg-hover rd-0 appearance-none outline-0 tabindex="-1" @click.stop @change="unit = $event.target.value; _value = _value">
      <option v-for="opt in units" :value="opt">{{ opt }}</option>
    </select>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { isString } from '@vue/shared'
import { useEventListener, useMagicKeys } from '@vueuse/core'
import { watchEffect } from 'vue'

const props = defineProps({
  modelValue: [String, Number],
  min: { type: Number, default: -Infinity },
  max: { type: Number, default: Infinity },
  step: { type: Number, default: 1 },
  unit: { type: String, default: 'px' },
  units: { type: Array, default: () => ['px', '%', 'vw', 'vh'] },
  hideUnit: Boolean,
  placeholder: String,
  label: String
})

const emit = defineEmits(['update:modelValue'])

const inputRef = ref()
const selectRef = ref()
const isFocus = ref(false)
const controlMousedown = ref(false)
const wresize = computed(() => (control.value && isMouseenter.value) || controlMousedown.value)

const unit = ref('')
watch(() => props.modelValue, v => {
  unit.value = v == null ? props.unit : isString(v) ? v.match(unitReg)[1] : ''
}, { immediate: true })

const _value = computed({
  get: () => props.modelValue == null ? props.modelValue : clamp(parseFloat(props.modelValue)),
  set: v => emit('update:modelValue', v === '' ? undefined : unit.value ? `${clamp(v)}${unit.value}` : clamp(v))
})

const clamp = (v, min = props.min, max = props.max) => Math.max(min, Math.min(max, +(v || 0)))

let sv = 0, sx = 0
function mousedown(e) {
  if (!control.value) return
  controlMousedown.value = true
  e.preventDefault()
  sv = _value.value || 0
  sx = e.pageX
  const stop = useEventListener('mousemove', e => {
    _value.value = sv + (e.pageX - sx) * props.step
  })
  useEventListener('mouseup', e => {
    stop()
    controlMousedown.value = false
  }, { once: true })
}

const { control } = useMagicKeys()
const isMouseenter = ref(false)
useEventListener(inputRef, 'mouseenter', e => isMouseenter.value = true)
useEventListener(inputRef, 'mouseleave', e => isMouseenter.value = false)
useEventListener(inputRef, 'mousedown', mousedown)

watch(() => isMouseenter.value && control.value, v => {
  count.value += v ? 1 : -1
})
watch(controlMousedown, v => {
  count.value += v ? 1 : -1
})
</script>

<script>
const unitReg = /\d*([a-z%]*)$/
const count = ref(0)

watchEffect(() => {
  if (count.value) document.body.classList.add('cursor-w-resize')
  else document.body.classList.remove('cursor-w-resize')
})

// defineExpose({
//   focus: () => inputRef.focus(),
//   blur: () => inputRef.blur(),
// })
</script>

<style lang="scss">
.input-number {
  display: flex;
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
    padding: 0 2px 0 8px;
    flex: 1 1;
    width: 0;
    &::-webkit-inner-spin-button, &::-webkit-outer-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }

  > select, > input {
    color: inherit;
    outline: none;
    border: none;
    line-height: inherit;
  }
}
</style>