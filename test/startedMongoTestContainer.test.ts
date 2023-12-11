import { describe, it, test, expect, beforeAll, afterAll } from 'vitest'
import { startedMongoTestContainerOf, StartedMongoTestContainer } from '../src/startedMongoTestContainer'
import mongoose, { ConnectionStates, model, Schema } from 'mongoose'

describe('startedMongoTestContainerOf', () => {
  let mongoContainer: StartedMongoTestContainer

  beforeAll(async () => {
    mongoContainer = await startedMongoTestContainerOf()
  })

  afterAll(async () => {
    await mongoContainer.closeDatabase()
  })

  test('MongoContainer should be defined', async () => {
    expect(mongoContainer).toBeTruthy()
  })

  test('Mongo Connection String should not be empty', async () => {
    console.log(mongoContainer.getUri())
    expect(mongoContainer.getUri()).not.toHaveLength(0)
  })

  it('should be connected, when using mongoose to connect to mongoTestContainer', async () => {
    await mongoose.connect(mongoContainer.getUri(), { directConnection: true })
    expect(mongoose.connection.readyState).toBe(ConnectionStates.connected)
  })

  test('clearDatabase() clear all data', async () => {
    const FatCatModel = model(
      'FatCat',
      new Schema({
        name: {
          type: String,
          required: true
        },
        weight: {
          type: Number,
          default: 0
        }
      })
    )
    const newCat = {
      name: 'Fat Orange',
      weight: 6.8
    }

    const catsInit = await FatCatModel.find()
    await FatCatModel.create(newCat)
    const catsAfterAdd = await FatCatModel.find()
    await mongoContainer.clearDatabase()
    const catsAfterClear = await FatCatModel.find()

    expect(catsInit).toHaveLength(0)
    expect(catsAfterAdd).toHaveLength(1)
    expect(catsAfterClear).toHaveLength(0)
  })
})
