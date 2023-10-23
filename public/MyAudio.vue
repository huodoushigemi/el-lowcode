<template>
  <div style="padding: 20px">
    <p>我是自定义的 audio 组件</p>
    <audio v-bind="$attrs" />
  </div>
</template>

<script setup>
defineOptions({ name: 'MyAudio' })
</script>

<script>
export const el_lowcode = {
  is: 'MyAudio',
  label: '音频',
  props: [
    { lp: 'src' },
    { lp: 'autoplay', type: 'switch' },
    { lp: 'loop', type: 'switch' },
    { lp: 'muted', type: 'switch' },
  ],
  defaultProps: () => ({
    controls: true,
    src: 'https://interactive-examples.mdn.mozilla.net/media/cc0-audio/t-rex-roar.mp3',
  })
}
</script>