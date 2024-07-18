import { mergeWith } from 'lodash-es'

const merge = (o1, o2) => mergeWith(o1, o2, mergeCustomizer)
// const mergeCustomizer = (obj, src) =>  obj === void 0 ? src : src === void 0 ? obj : merge(obj, src))
const mergeCustomizer = (obj, src) => 
  obj === void 0 ? src :
  src === void 0 ? obj :
  typeof src != 'object' && src !== void 0 ? src : merge(obj, src)


const a = {
  xxx: 1,
  a: {}
}

const b = {
  xxx: 2,
  b: {},
}

merge(b, a)

a.a.dsfa=  123

console.log(
  b
)