<template>
  <div class="uno-icon" :style="`--un-icon: url(${src})`" />
</template>

<script setup>
defineProps(['src'])
</script>

<style>
.uno-icon {
  -webkit-mask: var(--un-icon) no-repeat;
  mask: var(--un-icon) no-repeat;
  -webkit-mask-size: 100% 100%;
  mask-size: 100% 100%;
  background-color: currentColor;
  color: inherit;
  width: 1.2em;
  height: 1.2em;
}
</style>