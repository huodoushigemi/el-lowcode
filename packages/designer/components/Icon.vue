<template>
  <div class="mask-icon" :style="`--mask-image: url(${src})`" />
</template>

<script setup>
defineProps(['src'])
</script>