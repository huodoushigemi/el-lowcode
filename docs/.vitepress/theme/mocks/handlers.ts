import { rest } from 'msw'
import { list } from './data'

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
          list: list.slice(0).splice((json.page.page - 1) * json.page.pageSize, json.page.pageSize),
          total: list.length
        }
      })
    )
  }),

  rest.post('/user/new', async (req, res, ctx) => {
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
