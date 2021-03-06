import mongoose from 'mongoose'
import { GenericContainer, StartedTestContainer } from 'testcontainers'

let mongoContainer: StartedTestContainer

/**
 * Connect to mongo container.
 */
export const connect = async (image = 'mongo') => {
  mongoContainer = await new GenericContainer(image).withExposedPorts(27017).start()
  const uri = `mongodb://${mongoContainer.getHost()}:${mongoContainer.getMappedPort(27017)}`
  await mongoose.connect(uri)
}

/**
 * Close db connection
 */
export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.disconnect()
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
