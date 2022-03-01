import mongoose from "mongoose"
import { GenericContainer } from "testcontainers"

/**
 * Connect to mongo container.
 */
export const connect = async (image = "mongo") => {
  const mongoContainer = await new GenericContainer(image)
    .withExposedPorts(27017)
    .start()
  const uri = `mongodb://${mongoContainer.getHost()}:${mongoContainer.getMappedPort(27017)}`
  await mongoose.connect(uri)
};

/**
 * Close db connection
 */
export const closeDatabase = async () => {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
};

/**
 * Delete db collections
 */
export const clearDatabase = async () => {
  const collections = mongoose.connection.collections
  for (const key in collections) {
    const collection = collections[key]
    await collection.deleteMany({})
  }
};
