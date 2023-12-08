import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    pool: 'forks',
    hookTimeout: 60_000,
    testTimeout: 60_000
  }
})
