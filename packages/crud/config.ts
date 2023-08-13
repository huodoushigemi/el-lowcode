import type { Awaitable } from '@vueuse/core'
import { PaginationProps } from 'element-plus'
import type { Fnable } from '@el-lowcode/utils'

type Type = 'list' | 'new' | 'edit' | 'del' | 'get'

export type Config = {
  request(url: string | undefined, data: any, type: Type): Awaitable<any>
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
    total: 'data.total',
    list: 'data.list'
  },
  pagination: {
    pageSize: 10
  }
}

export default config

export const setConfig = (c: Partial<Config>) => Object.assign(config, c)
