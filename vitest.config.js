/// <reference types="vitest" />
import { defineConfig } from 'vite';

export default defineConfig({
  test: {
    environment: 'node',
    testTimeout: 15000,
    setupFiles: ['./tests/setup.js'],
    include: ['./tests/**/*.test.js'],
    globals: true, // Provides Jest-compatible global functions (describe, it, expect, etc.)
    coverage: {
      provider: 'v8', // Use v8 instead of c8
      reporter: ['text', 'lcov', 'html'],
      include: [
        'routes/**/*.js',
        'models/**/*.js',
        'helpers/**/*.js'
      ],
      exclude: ['**/node_modules/**']
    },
    // Performance optimizations
    pool: 'threads',
    poolOptions: {
      threads: {
        maxThreads: 4,
        minThreads: 1
      }
    },
    // Database teardown handling
    teardownTimeout: 10000,
    hookTimeout: 10000
  }
});
