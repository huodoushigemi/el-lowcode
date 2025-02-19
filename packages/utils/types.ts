export type Obj = Record<any, any>
export type Arrable<T> = T | T[]
export type Fnable<T> = T | ((...args) => T)
export type Assign<A, B> = Omit<A, keyof B> & B
export type AddPrefixToKeys<T, Prefix extends string> = { [K in keyof T as `${Prefix}${K & string}`]: T[K] }
