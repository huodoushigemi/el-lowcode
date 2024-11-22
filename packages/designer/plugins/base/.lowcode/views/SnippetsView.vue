<template>
  <div relative flex="~ col" hfull>
    <div mt1 px20 pb8 shadow-md>
      <input class="vs-input wfull" v-model="kw" placeholder="Search" />
    </div>

    <div flex-1 overflow-auto pb32 style="scrollbar-gutter: stable both-edges">
      <div v-for="(arr, category) in groupBy(snippets, 'category')" px14>
        <h4 my10 capitalize>{{ category == 'undefined' ? '其他' : category }}</h4>
        <div grid="~ cols-1" gap-12>
          <template v-for="snip in arr">
            <div class="vs-li" flex="~ col" rd-4 overflow-hidden :lcd-snippet="snip.id" draggable="true" style="border: 1px solid #36363b;">
              <img :src="fnAsync(snip.cover)" draggable="false" />
              <!-- <div class="px12 py6">{{ wgt.title }}</div> -->
            </div>
          </template>
        </div>
      </div>
    </div>

  </div>
</template>

<script setup>
import { computed, inject, ref } from 'vue'
import { computedAsync } from '@vueuse/core'
import { groupBy, unFn } from '@el-lowcode/utils'

const props = defineProps({

})

const designer = inject('designerCtx')

const kw = ref('')

const snippets = computed(() => kw.value ? designer.snippets.filter(e => e.title?.includes(kw.value) || e.category.includes(kw.value) || e.keywords?.some(e => e.includes(kw.value))) : designer.snippets)

const cache = new WeakMap()
function fnAsync(fn) {
  return (cache.get(fn) ?? cache.set(fn, computedAsync(() => unFn(fn))).get(fn)).value
}
</script>