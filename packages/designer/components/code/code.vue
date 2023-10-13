<template>
  <pre class="Code"><code><slot></slot></code></pre>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Code'
})
</script>

<style lang="scss">
.Code {
  padding: 1em;
  background-color: var(--el-fill-color-light);
}
</style>