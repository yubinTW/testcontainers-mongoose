import { describe, it, test, expect, beforeAll, afterAll } from 'vitest'
import { startedMongoTestContainerOf, StartedMongoTestContainer } from '../src/startedMongoTestContainer'
import mongoose, { ConnectionStates } from 'mongoose'

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
    expect(mongoContainer.uri).not.toHaveLength(0)
  })

  it('should be connected, when using mongoose to connect to mongoTestContainer', async () => {
    await mongoose.connect(mongoContainer.uri)
    expect(mongoose.connection.readyState).toBe(ConnectionStates.connected)
  })
})
