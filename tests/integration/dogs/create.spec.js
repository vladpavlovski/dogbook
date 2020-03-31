'use strict'

const request = require('supertest-koa-agent')
const { expect } = require('chai')
const sinon = require('sinon')
const app = require('../../../src/app')
const { resetDb } = require('../../helpers')
const dogApi = require('../../../src/services/dogapi')

const sandbox = sinon.createSandbox()

describe('Dogs', function () {
  beforeEach(resetDb)

  context('POST /dogs', function () {
    let userToken

    beforeEach(async function () {
      const res = await request(app)
        .post('/users')
        .send({
          email: 'mail@sfs.cz',
          name: 'david',
          password: '11111111',
        })
        .expect(201)

      userToken = res.body.accessToken
      sandbox
        .stub(dogApi, 'getRandomBreedImage')
        .returns(Promise.resolve('http://domain.com/image.jpg'))
    })

    it('responds with newly created dog', async function () {
      sinon.mock(dogApi)
      const dogData = {
        name: 'Azor',
        breed: 'chihuahua',
        birthYear: 2000,
      }

      const res = await request(app)
        .post('/dogs')
        .set('Authorization', `jwt ${userToken}`)
        .send(dogData)
        .expect(201)

      expect(res.body).to.deep.include({
        ...dogData,
      })

      expect(res.body.photo).to.be.a('string')

      expect(res.body.photo).to.not.be.empty // eslint-disable-line no-unused-expressions

      expect(res.body).to.have.all.keys([
        'name',
        'createdAt',
        'updatedAt',
        'userId',
        'id',
        'breed',
        'birthYear',
        'photo',
      ])
    })

    afterEach(function () {
      return sandbox.restore()
    })
  })
})
