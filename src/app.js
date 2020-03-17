'use strict'

const Koa = require('koa')
const koaCompress = require('koa-compress')
const koaCors = require('kcors')
const koaBody = require('koa-body')
const router = require('./router')
const config = require('./config')
const log = require('./utils/logger')

const services = {
  server: null,
}

const app = new Koa()

app.use(koaCompress())
app.use(koaCors())
app.use(koaBody())

app.use(router)

app.start = async () => {
  log.info('Starting server')

  // Start any services here:
  // e.g. database connection.

  services.server = await new Promise((resolve, reject) => {
    const listen = app.listen(config.port, err =>
      err ? reject(err) : resolve(listen)
    )
  })
}

app.stop = async () => {
  log.info('Shutting down server')

  // Stop everything now.
  // e.g. close database connection

  await services.server.close()
}

app
  .start()
  .then(() => log.info(`App is running on port ${config.port}`))
  .catch(err => log.error(err))

process.once('SIGINT', () => app.stop())
process.once('SIGTERM', () => app.stop())
