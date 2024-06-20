<template>
  <div class="box-model" relative wfull h150>
    <div absolute top--1 wfull h0 b-20 b-b-0 b-t="#fff/25!">
      <input-number v-model="style.marginTop" hideUnit class="top--20 left-0 h20! text-center" placeholder="0" />
    </div>
    <div absolute bottom--1 wfull h0 b-20 b-t-0 b-b="#fff/25!">
      <input-number v-model="style.marginBottom" hideUnit class="bottom--20 left-0 h20! text-center" placeholder="0" />
    </div>
    <div absolute left--1 hfull w0 b-20 b-r-0 b-l="#fff/25!">
      <input-number v-model="style.marginLeft" hideUnit class="right-0 aic w50! hfull text-right" placeholder="0" />
    </div>
    <div absolute right--1 hfull w0 b-20 b-l-0 b-r="#fff/25!">
      <input-number v-model="style.marginRight" hideUnit class="left-0 aic w50! hfull text-left" placeholder="0" />
    </div>

    <div absolute top-21 left-22 right-22 h0 b-20 b-b-0 b-t="#fff/25!">
      <input-number v-model="style.paddingTop" hideUnit class="top--20 left-0 h20! text-center" placeholder="0" />
    </div>
    <div absolute bottom-21 left-22 right-22 h0 b-20 b-t-0 b-b="#fff/25!">
      <input-number v-model="style.paddingBottom" hideUnit class="bottom--20 left-0 h20! text-center" placeholder="0" />
    </div>
    <div absolute top-22 bottom-22 left-21 w0 b-20 b-r-0 b-l="#fff/25!">
      <input-number v-model="style.paddingLeft" hideUnit class="left--20 aic w50! hfull text-left" placeholder="0" />
    </div>
    <div absolute top-22 bottom-22 right-21 w0 b-20 b-l-0 b-r="#fff/25!">
      <input-number v-model="style.paddingRight" hideUnit class="right--20 aic w50! hfull text-right" placeholder="0" />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  modelValue: Object
})

const emit = defineEmits(['update:modelValue'])

const style = computed(() => {
  return props.modelValue || new Proxy({}, {
    get: (t, p, r) => Reflect.get(t, p, r),
    set: (t, p, v, r) => emit('update:modelValue', { [p]: v })
  })
})
</script>

<style lang="scss">
.box-model {
  > div {
    border-color: transparent;
    border-style: solid;

    > .input-number {
      position: absolute;
      box-shadow: unset;
      padding: 0;
      

      > input {
        padding: 0 6px;
        text-align: inherit;
        color: #000;
        font-size: 12px;
      }
    }
  }
}
</style>