import { InjectionKey, computed, defineComponent, inject, provide, ref, ExtractPropTypes, mergeProps, camelize, renderSlot, PropType } from 'vue'
import { objectPick, toReactive } from '@vueuse/core'
import { createRender } from '@el-lowcode/render'
import { Obj, get, set, ks, unFn, withInstall } from '@el-lowcode/utils'
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
    name: formItemName,
    setup(props: Item, { slots }) {
      const form = inject(formRenderContextKey)
      const model = new Proxy({}, { get: (t, k: string) => form?.model?.[k], set: (t, k: string, v) => (form?.model && (form.model[k] = v), true) })

      const calcVal = () => {
        let v = get(model, _prop(props))
        if (props.get) v = props.get(v, model)
        if (props.defaultValue !== undefined && (v === undefined || v === '')) set(model, _prop(props), v = unFn(props.defaultValue))
        if (props.displayValue !== undefined && (v === undefined || v === '')) v = unFn(props.displayValue)
        return v
      }

      const onInput = (val) => {
        if (props.set) set(model, _prop(props), props.set(val, model))
        else set(model, _prop(props), val)
        if (props.out) Object.assign(model, props.out!(val, model))
        val = get(model, _prop(props))
        if (props.displayValue !== undefined && val === unFn(props.displayValue)) set(model, _prop(props), undefined)
      }

      return () => {
        const itemProps = {
          ...objectPick(props, formItemKs),
          [_fields.label]: _label(props),
          [_fields.prop]: _prop(props),
          [_fields.rules]: _rules(props, model)
        }
        const elProps = mergeProps(
          {
            [unFn(_fields.modelValue, props)]: calcVal(),
            [`onUpdate:${unFn(_fields.modelValue, props)}`]: onInput
          },
          {
            ...(props.el || {}),
            disabled: unFn(props.el?.disabled, model)
          }
        )
        
        return !unFn(props.hide, model)
          ? (
            <FormItem {...itemProps}>
              {{
                ...slots,
                default: undefined,
                // [_fields.inputSlot]: () => (console.log(slots.default?.()), slots.default?.() || <Input {...props} el={elProps} />)
                [_fields.inputSlot]: () => renderSlot(slots, 'default', undefined, () => [<Input {...props} el={elProps} />])
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
    name: formName,
    props: formRenderProps,
    setup(props: ExtractPropTypes<typeof _formRenderProps>, { attrs, slots, expose }) {
      const _FormItemRender = createRender({
        defaultIs: (item) => (
          <FormItemRender {...item}>{{ default: slots[`$${_prop(item)}`] }}</FormItemRender>
        )
      })
      
      const formRef = ref({})
      expose(toReactive(formRef))

      provide(formRenderContextKey, props)

      return () => (
        <Form ref={formRef} {...{...props, ...attrs}}>
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