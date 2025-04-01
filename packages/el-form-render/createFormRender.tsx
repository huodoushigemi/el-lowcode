import { InjectionKey, defineComponent, inject, provide, ref, ExtractPropTypes, mergeProps, camelize, renderSlot } from 'vue'
import { objectPick, toReactive } from '@vueuse/core'
import { createRender } from '@el-lowcode/render'
import { Obj, ks, unFn, withInstall } from '@el-lowcode/utils'
import { Item, formItemRenderPropsBase } from './props'
import { useTransformer } from './utils'

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

/*#__NO_SIDE_EFFECTS__*/
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

      const transformer = useTransformer(model, () => _prop(props), props)

      return () => {
        const itemProps = {
          ...objectPick(props, formItemKs),
          [_fields.label]: _label(props),
          [_fields.prop]: _prop(props),
          [_fields.rules]: _rules(props, model),
          '.__transformer': transformer
        }
        const elProps = mergeProps(
          {
            [unFn(_fields.modelValue, props)]: transformer.get(),
            [`onUpdate:${unFn(_fields.modelValue, props)}`]: transformer.set
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
                [_fields.inputSlot]: () => {
                  const vnode = renderSlot(slots, 'default')
                  if (vnode.children![0]) vnode.children![0].props = Object.assign(elProps, vnode.children![0].props)
                  else vnode.children![0] ??= Input({ ...props, el: elProps })
                  return vnode
                }
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