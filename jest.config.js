module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleFileExtensions: ['ts', 'tsx', 'js'],
    testMatch: ['**/?(*.)+(spec|test).ts'],
    transform: {
      '^.+\.(ts|tsx)$': 'ts-jest'
    },
    globals: {
      'ts-jest': {
        tsconfig: 'tsconfig.json'
      }
    },
    coverageDirectory: 'coverage',
    collectCoverageFrom: ['src/**/*.ts', '!src/**/*.d.ts']
  };
  