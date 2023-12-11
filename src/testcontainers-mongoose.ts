import { MongoDBContainer, StartedMongoDBContainer } from '@testcontainers/mongodb'
import mongoose from 'mongoose'

let mongoContainer: StartedMongoDBContainer

/**
 * Connect to mongo container.
 */
export const connect = async (image = 'mongo:4.4.4') => {
  mongoContainer = await new MongoDBContainer(image).start()
  const uri = mongoContainer.getConnectionString()
  await mongoose.connect(uri, { directConnection: true })
}

/**
 * Close db connection
 */
export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase()
  if (mongoose.connection.readyState === 1) {
    await mongoose.disconnect()
  }
  await mongoContainer.stop()
}

/**
 * Delete db collections
 */
export const clearDatabase = async () => {
  const collections = mongoose.connection.collections
  for (const key in collections) {
    const collection = collections[key]
    await collection.deleteMany({})
  }
}

/**
 * Get Mongodb Connection String
 */
export const getMongodbConnectionString = () => mongoContainer.getConnectionString()
