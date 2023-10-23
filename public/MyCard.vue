<template>
  <!-- see https://shoelace.style/components/card -->
  <sl-card class="card-overview" v-bind="$attrs">
    <img slot="image" :src="cover" />

    <strong>{{ title }}</strong><br />

    {{ desc }}<br />

    <small>6 weeks old</small>

    <div slot="footer">
      <sl-button variant="primary" pill @click="onClick">More Info</sl-button>
      <sl-rating></sl-rating>
    </div>
  </sl-card>
</template>

<script setup>
import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.11.0/cdn/components/card/card.js'
import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.11.0/cdn/components/button/button.js'
import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.11.0/cdn/components/rating/rating.js'

// 组件名（必须）
defineOptions({ name: 'MyCard' })

defineProps({
  cover: String,
  title: String,
  desc: String,
})

function onClick() {
  alert('clicked')
}
</script>

<script>
export const el_lowcode = {
  // 组件显示名
  label: '卡片',
  // 右侧的属性面板
  props: [
    { lp: 'cover' },
    { lp: 'title' },
    { lp: 'desc' },
  ],
  // 属性默认值
  defaultProps: () => ({
    cover: 'https://images.unsplash.com/photo-1559209172-0ff8f6d49ff7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=80',
    title: 'Mittens',
    desc: 'This kitten is as cute as he is playful. Bring him home today'
  })
}
</script>

<style>
@import 'https://cdn.jsdelivr.net/npm/@shoelace-style/shoelace@2.11.0/cdn/themes/dark.css';

.card-overview {
  max-width: 300px;
  font-size: 16px;
  line-height: 1.8;
}

.card-overview small {
  color: var(--sl-color-neutral-500);
}

.card-overview [slot='footer'] {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>