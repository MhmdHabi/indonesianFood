/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

/** @type {import('jest').Config} */
const config = {
  testMatch: ['**/tests/**/*.test.[jt]s?(x)'],

  setupFiles: ['fake-indexeddb/auto'],

  testEnvironment: 'jsdom',

  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },

  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'], // Ensure these extensions are recognized

  // Updated this line
  extensionsToTreatAsEsm: ['.ts'], // Only include .ts
};

module.exports = config;
