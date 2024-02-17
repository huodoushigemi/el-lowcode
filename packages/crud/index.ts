import { withInstall } from '@el-lowcode/utils'
import _CRUD from './crud.vue'
import config, { setConfig } from './config'
export * from './props'

export const CRUD = Object.assign(
  withInstall(_CRUD),
  {
    get config() { return config },
    setConfig
  }
)

export default CRUD
