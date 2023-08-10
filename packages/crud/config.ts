import type { Awaitable } from '@vueuse/core'
import type { PaginationProps } from 'element-plus'
import type { Fnable } from '@el-lowcode/utils'

type Type = 'get' | 'post' | 'put' | 'delete'

export type Config = {
  request(url: string, data: any, type: Type): Awaitable<any>
  field: {
    page: string
    pageSize: string
    total: Fnable<string>
    list: Fnable<string>
  }
  pagination: Partial<PaginationProps>
}

export const config: Config = {
  request: () => {},
  field: {
    page: 'page.page',
    pageSize: 'page.pageSize',
    total: 'total',
    list: 'list'
  },
  pagination: {
    pageSize: 10
  }
}

export default config

export const setConfig = (c: Partial<Config>) => Object.assign(config, c)
