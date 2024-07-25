// jest.config.js
module.exports = {
    preset: 'ts-jest/presets/js-with-babel',
    testEnvironment: 'jest-environment-jsdom',
    transform: {
      '^.+\\.vue$': 'vue-jest',
      '^.+\\.ts$': 'ts-jest'
    },
    moduleFileExtensions: ['ts', 'js', 'vue', 'json'],
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/src/$1'
    }
  };
  