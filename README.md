# Testcontainers-mongoose

[![Node.js CI](https://github.com/yubinTW/testcontainers-mongoose/actions/workflows/node.js.yml/badge.svg)](https://github.com/yubinTW/testcontainers-mongoose/actions/workflows/node.js.yml)
[![NPM version](https://img.shields.io/npm/v/testcontainers-mongoose.svg?style=flat)](https://www.npmjs.com/package/testcontainers-mongoose)

a mongoose helper for using testcontainers with mongodb

https://www.npmjs.com/package/testcontainers-mongoose

## Installation

```
npm i -D testcontainers-mongoose
```

if using mongoose `7.x` version

```
npm i -D testcontainers-mongoose@2.2.2
```

## Configuration

[Reference](https://github.com/testcontainers/testcontainers-node#configuration)

### Logs

- `DEBUG=testcontainers` Enable testcontainers logs
- `DEBUG=testcontainers:containers` Enable container logs
- `DEBUG=testcontainers*` Enable all logs

## Testcontainers

- `TESTCONTAINERS_RYUK_DISABLED=true` Disable ryuk
- `RYUK_CONTAINER_IMAGE=registry.mycompany.com/mirror/ryuk:0.3.0` Custom image for ryuk

## Usage

Testing with Vitest

```typescript
import * as dbHandler from 'testcontainers-mongoose'
import { describe, beforeAll, afterAll, afterEach, it, expect } from 'vitest'

describe('testcontainers-mongoose test', () => {
  beforeAll(async () => {
    await dbHandler.connect('harbor.yourcompany.com/mongo:4.4.4')
    // ...
  })
  afterAll(async () => {
    await dbHandler.closeDatabase()
  })

  afterEach(async () => {
    await dbHandler.clearDatabase()
  })

  it('some test using mongoose', async () => {
    // ...
  })
})
```

## Start Mongo Container without connect with mongoose

In case you want to connect the mongo by yourself

using `startedMongoTestContainerOf`

Get the mongo connection string by `.getUri()`

Example

```typescript
import { startedMongoTestContainerOf, StartedMongoTestContainer } from 'testcontainers-mongoose'
import { describe, beforeAll, afterAll, afterEach, it, expect } from 'vitest'

describe('testcontainers-mongoose test', () => {
  let mongoTestContainer: StartedMongoTestContainer
  beforeAll(async () => {
    mongoTestContainer = await startedMongoTestContainerOf('harbor.yourcompany.com/mongo:4.4.4')
    // connect to mongoTestContainer by yourself
    // mongoTestContainer.getUri() is the connection string of the mongo container
  })
  afterAll(async () => {
    await mongoTestContainer.closeDatabase()
  })

  afterEach(async () => {
    await mongoTestContainer.clearDatabase()
  })

  it('some test case', async () => {
    // ...
  })
})
```
