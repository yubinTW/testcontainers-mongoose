import mongoose from 'mongoose'
import { StartedTestContainer } from 'testcontainers'
import { MongoDBContainer } from '@testcontainers/mongodb'

export type StartedMongoTestContainer = {
  container: StartedTestContainer
  getUri: () => string
  getConnectionString: () => string
  closeDatabase: () => Promise<void>
  clearDatabase: () => Promise<void>
  stop: () => Promise<void>
}

export const startedMongoTestContainerOf: (imageName?: string) => Promise<StartedMongoTestContainer> = async (
  imageName = 'mongo:4.4.26'
) => {
  const startedMongoTestContainer = await new MongoDBContainer(imageName).start()

  const getUri = () => startedMongoTestContainer.getConnectionString()

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

  /**
   * Stop the container
   */
  const stop = async () => {
    await startedMongoTestContainer.stop()
  }

  return {
    container: startedMongoTestContainer,
    getUri,
    getConnectionString: getUri,
    closeDatabase,
    clearDatabase,
    stop
  }
}
