const Router = require('koa-router')
const { validate } = require('./utils/validations')
const router = new Router()

const dogs = [
  {
    id: 1,
    name: 'dog1',
  },
  {
    id: 2,
    name: 'dog2',
  },
]

router.get('/', ctx => {
  ctx.body = 'Hello world from router!'
})

router.get('/dogs', ctx => {
  ctx.body = dogs
})

router.get('/dogs/:id', ctx => {
  const dog = dogs.find(item => item.id === Number(ctx.params.id))
  if (!dog) {
    ctx.status = 404
    return
  }
  ctx.body = dog
})

router.post('/dogs', ctx => {
  const schema = {
    type: 'Object',
    requires: true,
    properties: {
      name: {
        type: 'string',
        required: true,
      },
    },
  }

  const validation = validate(ctx.request.body, schema)
  if (!validation.valid) {
    ctx.status = 400
    ctx.body = {
      errors: validation.errors,
    }
    return
  }
  dogs.push(ctx.request.body)

  ctx.body = dogs
})

module.exports = router.routes()
