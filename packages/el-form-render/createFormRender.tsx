import { ComponentObjectPropsOptions, InjectionKey, PropType, computed, defineComponent, inject, provide, ref, ExtractPropTypes, mergeProps, camelize, resolveDynamicComponent, createVNode, onUpdated, onBeforeUpdate } from 'vue'
import { objectPick } from '@vueuse/core'
import { createRender } from '@el-lowcode/render'
import { Fnable, Obj, get, ks, set, unFn, withInstall } from '@el-lowcode/utils'
import { Opt, solveOptions } from '.'

type Awaitable<T> = Promise<T> | T

type CreateFormRenderOptions<F, FI> = {
  Form: any
  formProps: F
  FormItem: any
  formItemProps: FI
  Input: any
  fields?: {
    /** @default 'label' */
    label?: string
    /** @default 'prpo' */
    prop?: string
    /** @default 'modelValue' */
    modelValue?: string | ((item) => string)
    /** @default 'rules' */
    rules?: string
  }
}

const defaultFields = {
  label: 'label',
  prop: 'prop',
  modelValue: 'modelValue',
  rules: 'rules',
}

export function createFormRender<F extends Obj, FI extends Obj>({ Form, formProps, FormItem, formItemProps, Input, fields }: CreateFormRenderOptions<F, FI>) {
  const _fields = { ...defaultFields, ...fields }
  const formItemKs = ks(formItemProps) as any[]
  const formRenderContextKey: InjectionKey<{ model: Obj } & Obj> = Symbol()

  const solveLP = (lp) => Array.isArray(lp) ? lp : (lp ? [lp, camelize(lp!)] : [])
  const _label = (item) => item[_fields.label] || solveLP(item.lp)[0]
  const _prop = (item) => item[_fields.prop] || solveLP(item.lp)[1]

  // FormItemRender ========================================================================================================

  const _formItemRenderProps = {
    lp: [String, Array],
    type: String,
    defaultValue: null,
    displayValue: null,
    hide: [Boolean, Function] as PropType<boolean | ((row: any) => boolean)>,
    get: Function as PropType<(val: any, row: any) => any>,
    set: Function as PropType<(val: any, row: any) => any>,
    out: Function as PropType<(val: any, row: any) => any>,
    options: [Array, Object, Function] as PropType<Fnable<Awaitable<Opt[]>>>,
    rules: null,
    el: Object,
  }
  const formItemRenderProps = {
    ...formItemProps,
    ..._formItemRenderProps
  }
  const FormItemRender = defineComponent({
    props: formItemRenderProps,
    setup(props: ExtractPropTypes<typeof _formItemRenderProps>, { slots }) {
      const form = inject(formRenderContextKey)
      const model = computed(() => form?.model || {})

      const calcVal = () => {
        let v = get(model.value, _prop(props))
        if (props.get) v = props.get(v, model.value)
        if (props.defaultValue !== undefined && (v === undefined || v === '')) set(model.value, _prop(props), v = unFn(props.defaultValue))
        if (props.displayValue !== undefined && (v === undefined || v === '')) v = unFn(props.displayValue)
        return v
      }

      const onInput = (val) => {
        if (props.set) set(model.value, _prop(props), props.set(val, model.value))
        else set(model.value, _prop(props), val)
        if (props.out) Object.assign(model.value!, props.out!(val, model.value))
        val = get(model.value, _prop(props))
        if (props.displayValue !== undefined && val === unFn(props.displayValue)) set(model.value, _prop(props), undefined)
      }

      return () => {
        const itemProps = {
          ...objectPick(props, formItemKs),
          [_fields.label]: _label(props),
          [_fields.prop]: _prop(props),
          [_fields.rules]: unFn(props[_fields.rules], model.value)
        }
        const elProps = mergeProps(
          {
            [unFn(_fields.modelValue, props)]: calcVal(),
            [`onUpdate:${unFn(_fields.modelValue, props)}`]: onInput
          },
          {
            ...(props.el || {}),
            disabled: unFn(props.el?.disabled, model.value)
          }
        )
        return !unFn(props.hide, model.value)
          ? (
            <FormItem {...itemProps} v-slots={slots}>
              {slots.default?.() || <Input {...props} el={elProps} />}
            </FormItem>
          )
          : undefined
      }
    }
  })

  // FormRender ========================================================================================================
  
  const _formRenderProps = {
    model: Object,
    items: Array
  }
  const formRenderProps = {
    ...formProps,
    ..._formRenderProps,
  }

  const FormRender = defineComponent({
    props: formRenderProps,
    setup(props: ExtractPropTypes<typeof _formRenderProps>, { slots, expose }) {
      const _FormItemRender = createRender({ defaultIs: FormItemRender, slots: { default: (item) => slots[_prop(item)]?.() } })
      const formRef = ref()
      
      expose(new Proxy({}, {
        get(t, k) { return formRef.value?.[k] },
        has(t, k) { return k in formRef.value! }
      }))

      provide(formRenderContextKey, props)

      return () => (
        <Form ref={formRef} {...props}>
          {props.items?.map((item: any) => (
            <_FormItemRender {...item} key={_prop(item)} />
          ))}
          {slots.default?.()}
        </Form>
      )
    }
  })

  return {
    FormRender: withInstall(FormRender, [FormItemRender]),
    formRenderProps,
    FormItemRender,
    formItemRenderProps
  }
}