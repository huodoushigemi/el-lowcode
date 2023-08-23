import CRUD from '@el-lowcode/crud'
import axios from 'axios'

CRUD.setConfig({
  async request(url, data, type) {
    // type = 'list' | 'new' | 'edit' | 'del'
    return (await axios.post(`${url}/${type}`, data)).data
  },
  field: {
    page: 'page.page',
    pageSize: 'page.pageSize',
    total: 'data.total',
    list: 'data.list'
  },
  pagination: {
    pageSize: 5
  }
})
