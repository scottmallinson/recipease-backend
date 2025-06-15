// Global test setup
process.env.NODE_ENV = 'test';

// Suppress console output during tests for better performance
// Using simple noop functions to suppress console output during testing
const noop = () => { };

global.console = {
  ...console,
  log: noop, // Suppress console.log
  error: noop, // Suppress console.error
  warn: noop, // Suppress console.warn
  info: noop, // Suppress console.info
  debug: noop // Suppress console.debug
};

// Store original console for restoration if needed
global.originalConsole = console;

// Optionally restore console for specific tests if needed
global.restoreConsole = () => {
  global.console = global.originalConsole;
};

// Set test-specific environment variables for performance
process.env.MONGODB_MEMORY_SERVER_OPTS = JSON.stringify({
  binary: {
    skipMD5: true
  },
  instance: {
    dbName: 'test'
  },
  autoStart: false
});
