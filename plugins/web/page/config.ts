import { defineComponent, h, ref, resolveComponent, watchEffect } from "vue"
import DS from './DS.vue'

const State = defineComponent({
  inheritAttrs: false,
  props: ['modelValue'],
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const get = () => JSON.stringify(props.modelValue, null, '  ')
    const val = ref(get())
    watchEffect(() => val.value = get())
    const onSave = () => {
      try {
        emit('update:modelValue', JSON.parse(val.value))
        alert('✔ OK！')
      } catch (e)  {
        alert('❌ Err！')
      }
    }
    return () => h('div', { class: 'wfull', flex: '~ col' }, [
      h(resolveComponent('MonacoEditor'), { modelValue: val.value, 'onUpdate:modelValue': v => val.value = v, onSave, style: 'height: 300px' }),
      h('button', { class: 'vs-btn', style: 'margin: -26px 0px 0 auto; z-index: 11', onClick: onSave }, 'save')
    ])
  }
})

export default {
  is: 'Page',
  label: 'page',
  hidden: true,
  drag: false,
  props: [
    { lp: 'fit', options: ['contain', 'cover', 'fill', 'scrollY', 'scrollX'] },
    // { is: 'div', class: 'my8', children: '变量' },
    // { lp: ['State', 'state'], class: 'font-bold', el: { is: State }, script: false },
    { lp: ['', 'ds.list'], size: 'default', el: { is: DS }, script: false }
  ],
  defaultProps: () => ({
    children: []
  })
}