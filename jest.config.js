
export default {
    globalSetup: './test/setup.js',
    globalTeardown: './test/teardown.js',
    testEnvironment: './test/puppeteer_environment.js',
    "preset": "jest-puppeteer",
    testMatch: ['**/test/*.spec.js'],
  };