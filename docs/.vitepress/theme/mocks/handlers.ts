import { rest } from 'msw'
import { list } from './data'

const curry = (fn: Function, ...args) => fn.length > args.length ? (...args1) => curry(fn, ...args, ...args1) : fn(...args)
const filter = curry((query, row) => Object.entries<any>(row).every(([k, v]) => query[k] == null || v == query[k] || v?.includes?.(query[k])))

export const handlers = [
  rest.post('/user/list', async (req, res, ctx) => {
    const json = await req.json()
    return res(
      ctx.delay(100),
      ctx.status(200),
      ctx.json({
        code: 200,
        msg: 'success',
        data: {
          list: list.filter(filter(json)).splice((json.page.page - 1) * json.page.pageSize, json.page.pageSize),
          total: list.length
        }
      })
    )
  }),

  rest.post('/user/new', async (req, res, ctx) => {
    const json = await req.json()
    json.id = list.length + 1
    list.unshift(json)
    return res(
      ctx.delay(100),
      ctx.status(200),
      ctx.json({
        code: 200,
        msg: 'success'
      })
    )
  }),

  rest.post('/user/edit', async (req, res, ctx) => {
    const json = await req.json()
    list.splice(list.findIndex(e => e.id == json.id), 1, json)
    return res(
      ctx.delay(100),
      ctx.status(200),
      ctx.json({
        code: 200,
        msg: 'success'
      })
    )
  }),

  rest.post('/user/del', async (req, res, ctx) => {
    const json = await req.json()
    list.splice(list.findIndex(e => e.id == json.id), 1)
    return res(
      ctx.delay(100),
      ctx.status(200),
      ctx.json({
        code: 200,
        msg: 'success'
      })
    )
  }),
]
