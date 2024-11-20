<template>
  <div>
    <input class="vs-input" />

    <div v-for="(arr, category) in groupBy(designer.snippets, 'category')">
      <h4 mt4 mb10>{{ category == 'undefined' ? '其他' : category }}</h4>
      <div grid="~ cols-2" gap-8>
        <template v-for="snip in arr" >
          <div v-if="!snip.hidden" class="vs-ai" flex="~ col" :lcd-snippet="snip.id" draggable="true" style="border: 1px solid #36363b; border-radius: 4px; background-color: #242428;">
            <img class="-m1" :src="snip.cover" draggable="false" />
            <!-- <div class="px12 py6">{{ wgt.title }}</div> -->
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({

})

const designer = inject('designerCtx')
</script>