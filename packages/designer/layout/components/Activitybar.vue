<template>
  <nav class="activitybar" flex="~ col" w48>
    <Icon
      is="a"
      class="p12 w48 h48 c-inherit hover:op70"
      src="https://api.iconify.design/codicon:github.svg"
      href="https://github.com/huodoushigemi/el-lowcode"
      target="_blank"
    />
    
    <div v-for="bar in list" :class="modelValue == bar.id ? 'op100' : 'op40'" hover="op100" :title="bar.title" @click="emit('update:modelValue', bar.id)">
      <div v-if="modelValue == bar.id" absolute w1 h48 style="background: var(--vscode-activityBar-activeBorder, #fff)" />
      <Icon :src="bar.icon" w48 h48 p12 cursor-pointer />
    </div>
  </nav>
</template>

<script setup>
import Icon from '../../components/Icon.vue'

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
</style>