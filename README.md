# Testcontainers-mongoose

a mongoose helper for using testcontainer with mongodb

https://www.npmjs.com/package/testcontainers-mongoose

## Installation

```
npm i -D testcontainers-mongoose
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

Testing with Jest

```typescript
import * as dbHandler from 'testcontainers-mongoose'

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