import mongoose from 'mongoose'
import { GenericContainer, StartedTestContainer } from 'testcontainers'

export type StartedMongoTestContainer = {
  container: StartedTestContainer
  getUri: () => string
  closeDatabase: () => Promise<void>
  clearDatabase: () => Promise<void>
}

export const startedMongoTestContainerOf: (imageName?: string) => Promise<StartedMongoTestContainer> = async (
  imageName = 'mongo:latest'
) => {
  const startedMongoTestContainer = await new GenericContainer(imageName).withExposedPorts(27017).start()
  const uri = `mongodb://${startedMongoTestContainer.getHost()}:${startedMongoTestContainer.getMappedPort(27017)}`
  const getUri = () => uri
  /**
   * Close db connection
   */
  const closeDatabase = async () => {
    if (mongoose.connection.readyState === 1) {
      await mongoose.connection.dropDatabase()
      await mongoose.disconnect()
    }
    await startedMongoTestContainer.stop()
  }

  /**
   * Delete db collections
   */
  const clearDatabase = async () => {
    const collections = mongoose.connection.collections
    for (const key in collections) {
      const collection = collections[key]
      await collection.deleteMany({})
    }
  }

  return {
    container: startedMongoTestContainer,
    getUri,
    closeDatabase,
    clearDatabase
  }
}
