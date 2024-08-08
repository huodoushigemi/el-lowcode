<template>
  <div class="activitybar" flex="~ col" w48 bg="#333333">
    <div v-for="bar in list" :class="modelValue == bar.id ? 'op100' : 'op40'" c-white hover="op100" :title="bar.title" @click="emit('update:modelValue', modelValue == bar.id ? void 0 : bar.id)">
      <div v-if="modelValue == bar.id" absolute w1 h48 bg-white />
      <div class="activitybar_icon w48 h48" :style="`-webkit-mask-image: url(${bar.icon})`" />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: String,
  list: Array
})

const emit = defineEmits(['update:modelValue'])
</script>

<style lang="scss">
.activitybar_icon {
  background-color: currentColor;
  cursor: pointer;
  user-select: none;
  mask-position: 50% 50%;
  -webkit-mask-position: 50% 50%;
  mask-repeat: no-repeat;
  -webkit-mask-repeat: no-repeat;
  mask-size: 50% 50%;
  -webkit-mask-size: 50% 50%;
}
</style>