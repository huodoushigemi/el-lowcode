<template>
  <component v-if="issvg(src)" :is="is ?? 'div'" v-html="unVal(fetchsvg)" class="[&>svg]:wfull [&>svg]:hfull lh-0" />
  <!-- <div v-else class="mask-icon" :style="`--mask-image: url(${unVal(src)})`" /> -->
  <img v-else :src="unVal(src)" />
</template>

<script setup>
import { isString } from '@vue/shared'
import { unVal } from '@el-lowcode/utils'

const props = defineProps(['is', 'src'])

const fetchsvg = () => {
  return fetch(props.src).then(e => e.text())
}

const aaa = v => `data:image/svg+xml;utf8,${v.replaceAll('"', "'")}`
</script>

<script>
const issvg = v => isString(v) && (v.endsWith('.svg') || v.startsWith('data:image/svg+xml;base64,'))
</script>