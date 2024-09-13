<template>
  <div class="input-number" :class="[isFocus && 'is-focus']" @click="inputRef.focus()">
    <input ref="inputRef" :value="_value" @input="_value = $event.target.value" type="number" :min :max :step :placeholder="placeholder" @focus="isFocus = true" @blur="isFocus = false" />
    <select v-if="!hideUnit && !noUnit" ref="selectRef" :value="unit" px4 bg-hover rd-0 appearance-none outline-0 tabindex="-1" @click.stop @change="unit = $event.target.value; _value = _value">
      <option v-for="opt in units" :value="opt">{{ opt }}</option>
    </select>
  </div>
</template>

<script setup>
import { computed, ref, watch } from 'vue'
import { isString } from '@vue/shared'
import { useSlide } from '@el-lowcode/utils'

const props = defineProps({
  modelValue: [String, Number],
  min: { type: Number, default: -Infinity },
  max: { type: Number, default: Infinity },
  step: { type: Number, default: 1 },
  unit: { type: String, default: 'px' },
  units: { type: Array, default: () => ['px', '%', 'vw', 'vh'] },
  hideUnit: Boolean,
  noUnit: Boolean,
  placeholder: String,
  label: String
})

const emit = defineEmits(['update:modelValue'])

const inputRef = ref()
const selectRef = ref()
const isFocus = ref(false)

const unit = ref('')
watch(() => props.modelValue, v => {
  if (props.noUnit) return
  unit.value = v == null ? props.unit : isString(v) ? v.match(unitReg)[1] : ''
}, { immediate: true })

const _value = computed({
  get: () => props.modelValue == null ? props.modelValue : parseFloat(props.modelValue),
  set: v => emit('update:modelValue', v === '' ? undefined : unit.value ? `${v}${unit.value}` : parseFloat(v))
})

useSlide(inputRef, _value, props)
</script>

<script>
const unitReg = /\d*([a-z%]*)$/
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