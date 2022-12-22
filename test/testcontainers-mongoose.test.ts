import { describe, it, test, expect } from 'vitest'
import * as dbHandler from '../src/testcontainers-mongoose'
import mongoose, { model, Schema } from 'mongoose'

describe('testcontainers-mongoose test', () => {
  it('should make mongoose connect successfully', async () => {
    const initState = mongoose.connection.readyState
    await dbHandler.connect()
    const connectedState = mongoose.connection.readyState
    await dbHandler.closeDatabase()
    const closedState = mongoose.connection.readyState

    expect(initState).toBe(0)
    expect(connectedState).toBe(1)
    expect(closedState).toBe(0)
  })

  test('clearDatabase() clear all data', async () => {
    await dbHandler.connect()
    const Cat = model(
      'Cat',
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

    const catsInit = await Cat.find()
    await Cat.create(newCat)
    const catsAfterAdd = await Cat.find()
    await dbHandler.clearDatabase()
    const catsAfterClear = await Cat.find()
    await dbHandler.closeDatabase()

    expect(catsInit).toHaveLength(0)
    expect(catsAfterAdd).toHaveLength(1)
    expect(catsAfterClear).toHaveLength(0)
  })

  test('getMongodbConnectionString()', async () => {
    await dbHandler.connect()
    const connectionString = dbHandler.getMongodbConnectionString()
    await dbHandler.closeDatabase()
    expect(connectionString).toBeTruthy()
  })
})
