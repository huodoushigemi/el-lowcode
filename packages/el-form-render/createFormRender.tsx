import { InjectionKey, computed, defineComponent, inject, provide, ref, ExtractPropTypes, mergeProps, camelize, renderSlot, PropType } from 'vue'
import { objectPick, toReactive } from '@vueuse/core'
import { createRender } from '@el-lowcode/render'
import { Obj, get, ks, set, unFn, withInstall } from '@el-lowcode/utils'
import { Item, formItemRenderPropsBase } from './props'

type CreateFormRenderOptions<F, FI> = {
  Form: any
  formName: string
  formProps: F
  FormItem: any
  formItemName: any
  formItemProps: FI
  Input: any
  fields?: {
    /** @default 'label' */
    label?: keyof FI
    /** @default 'prpo' */
    prop?: keyof FI
    /** @default 'modelValue' */
    modelValue?: string | ((item: Item) => string)
    /** @default 'rules' */
    rules?: keyof FI
    /** @default 'default' */
    inputSlot?: string
  }
}

const defaultFields = {
  label: 'label',
  prop: 'prop',
  modelValue: 'modelValue',
  rules: 'rules',
  inputSlot: 'default'
}

export function createFormRender<F extends Obj, FI extends Obj>({ Form, formName, formProps, FormItem, formItemName, formItemProps, Input, fields }: CreateFormRenderOptions<F, FI>) {
  const _fields = { ...defaultFields, ...fields }
  const formItemKs = ks(formItemProps) as any[]
  const formRenderContextKey: InjectionKey<{ model?: Obj } & Obj> = Symbol()

  const solveLP = (lp: Item['lp']) => Array.isArray(lp) ? lp : (lp ? [lp, camelize(lp!)] : [])
  const _label = (item) => item[_fields.label] || solveLP(item.lp)[0]
  const _prop = (item) => item[_fields.prop] || solveLP(item.lp)[1]
  const _rules = (item, val) => unFn(item[_fields.rules], val)

  // FormItemRender ========================================================================================================
  
  const formItemRenderProps = {
    ...formItemProps,
    ...formItemRenderPropsBase
  }

  const FormItemRender = defineComponent({
    props: formItemRenderProps as any,
    name: formName,
    setup(props: Item, { slots }) {
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

      props.rules

      return () => {
        const itemProps = {
          ...objectPick(props, formItemKs),
          [_fields.label]: _label(props),
          [_fields.prop]: _prop(props),
          [_fields.rules]: _rules(props, model.value)
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
            <FormItem {...itemProps}>
              {{
                ...slots,
                default: undefined,
                [_fields.inputSlot]: () => (slots.default?.() || <Input {...props} el={elProps} />)
              }}
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
    name: formItemName,
    props: formRenderProps,
    setup(props: ExtractPropTypes<typeof _formRenderProps>, { slots, expose }) {
      const _FormItemRender = createRender({
        defaultIs: (item) => (
          <FormItemRender {...item}>{{ default: slots[`$${_prop(item)}`] }}</FormItemRender>
        )
      })
      
      const formRef = ref({})
      expose(toReactive(formRef))

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