export type Arrable<T> = T | T[]
export type Fnable<T> = T | ((...args) => T)
export type Assign<A, B> = Omit<A, keyof B> & B