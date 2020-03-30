'use strict'

const R = require('ramda')
const Base = require('./base')

class User extends Base {
  static get tableName() {
    return 'users'
  }

  static get jsonSchema() {
    return {
      type: 'object',
      required: ['email', 'name', 'password'],

      properties: {
        id: {
          type: 'integer',
        },
        email: {
          type: 'string',
        },
        name: {
          type: 'string',
        },
        password: {
          type: 'string',
        },
        disabled: {
          type: 'boolean',
        },
      },
    }
  }

  toJSON() {
    return R.omit(['password', 'updatedAt'], super.toJSON())
  }
}

module.exports = User
