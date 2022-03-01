import * as dbHandler from './testcontainers-mongoose'
import mongoose from 'mongoose'

describe('testcontainers-mongoose test', () => {
  afterAll(async () => {
    await dbHandler.closeDatabase()
  })

  afterEach(async () => {
    await dbHandler.clearDatabase()
  })

  it('should make mongoose connect successfully', async () => {
    expect(mongoose.connection.readyState).toBe(0)
    await dbHandler.connect()
    expect(mongoose.connection.readyState).toBe(1)
  })
})
