# Testcontainers-mongoose

```typescript
import * as dbHandler from './testcontainers-mongoose'

describe('testcontainers-mongoose test', () => {
  beforeAll(async () => {
    await dbHandler.connect('mongo:4.4.4')
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