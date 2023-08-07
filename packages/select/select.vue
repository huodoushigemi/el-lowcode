<!-- <template>
  <el-select v-if="!$slots.default" v-bind="{ ...props, ...$attrs }" :model-value="_modelValue" @update:model-value="e => emit('update:modelValue', e)">
    <el-option v-for="item in _options" :key="item.value" v-bind="item" />
  </el-select>

  <div v-else v-bind="$attrs" @click="dialogVisible = true">
    <slot />
  </div>
  
  <el-dialog v-model="dialogVisible" destroy-on-close append-to-body>
    <DataTable
      :url="url"
      :extraQuery="extraQuery"
      :searchItems="searchItems"
      :columns="columns || [
        { label: replace.value, prop: replace.value },
        { label: replace.label, prop: replace.label },
      ]"
      showSelect
      :multiple="multiple"
      :selectable="selectable"
      :row-key="replace.value"
      :selected="_modelValue.map(e => ({ [replace.value]: e }))"
      :hprops.replaceel="false"
      :hasNew="false"
      :hasEdit="false"
      :hasDel="false"
      @select="onSelect"
    >
      <template #header:after>
        <div>
          已选中
          <el-tag v-for="(e, i) in _modelValue" :key="e" style="margin: 0 4px;" :closable="!props.disabled" @close="_modelValue.splice(i, 1)">{{ e }}</el-tag>
        </div>
        <br />
      </template>
    </DataTable>
  </el-dialog>
</template>

<script setup lang="ts">
const post = () => {}
import { ElSelect } from 'element-plus'
import DataTable, { Column } from '../DataTable/DataTable.vue';
import { Awaitable, computedAsync } from '@vueuse/core';
import { Arrayable } from 'element-plus/es/utils';
const castArray = (e) => Array.isArray(e) ? e : (e != null ? [e] : [])

type Option = { label: string, value: string }

const props = defineProps({
  ...ElSelect.props,
  options: [Array, Function] as PropType<Option[] | ((query: Record<string, any>) => Awaitable<Option[]>)>,
  url: String,
  getVal: Function as PropType<() => Awaitable<Arrayable<any>>>,
  searchItems: Array,
  extraQuery: Object,
  replace: { type: Object as PropType<Option>, default: () => ({ label: 'label', value: 'value' }) },
  columns: Array as PropType<Column[]>,
  selectable: Function as PropType<(row, i) => boolean>
})

const emit = defineEmits(['update:modelValue'])

function onSelect(e) {
  e = e.map(e => e[props.replace.value])
  e = [...new Set(e)]
  setTimeout(() => {
    _modelValue.value = e
    console.log([..._modelValue.value]);
    
  }, 100);
  emit('update:modelValue', props.multiple ? e : e[0])
  dialogVisible.value = props.multiple
}

const dialogVisible = ref(false)

const _options = computedAsync(async () => {
  const list =
    typeof props.options === 'function' ? await props.options(props.extraQuery) :
    props.url ? (await post(props.url, props.extraQuery)).data :
    props.options
    
  return list.map((e) => ({ label: e[props.replace.label], value: e[props.replace.value] }))
}, null, { lazy: true })

const _modelValue = ref(castArray(props.modelValue))
watch(() => props.modelValue, val => _modelValue.value = castArray(val))
watch(() => props.getVal, async val => val && (_modelValue.value = castArray(await props.getVal())), { immediate: true })
</script> -->