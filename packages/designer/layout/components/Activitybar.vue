<template>
  <div class="activitybar" flex="~ col" w48>
    <div v-for="bar in list" :class="modelValue == bar.id ? 'op100' : 'op40'" hover="op100" :title="bar.title" @click="emit('update:modelValue', bar.id)">
      <div v-if="modelValue == bar.id" absolute w1 h48 style="background: var(--vscode-activityBar-activeBorder, #fff)" />

      <div v-if="bar.icon.includes('.svg')" class="activitybar_icon w48 h48" :style="`-webkit-mask-image: url(${bar.icon})`" />
      <img v-else :src="bar.icon" w48 h48 p12 cursor-pointer />
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
.activitybar {
  color: var(--vscode-activityBar-foreground, #fff);
  background: var(--vscode-activityBar-background, #333333);
}
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