'use strict'

const dogApi = require('../services/dogapi')
const errors = require('../utils/errors')

const dogRepository = require('./../repositories/dogs')

async function needDog(id) {
  const dog = await dogRepository.findById(id)
  if (!dog) {
    throw new errors.NotFoundError()
  }

  return dog
}

function getAll() {
  return dogRepository.findAll()
}

function getById(input) {
  return needDog(input.id)
}

async function createDog(input) {
  if (!input.photo) {
    input.photo = await dogApi.getRandomBreedImage(input.breed)
  }

  // For the sake of simplicity, we are not checking if photo is still null at this point.
  const dog = await dogRepository.create(input)

  return dog
}

async function updateDog(id, input) {
  const dog = await needDog(id)

  return dogRepository.patchById(dog.id, input)
}

module.exports = {
  getAll,
  getById,
  createDog,
  updateDog,
}
