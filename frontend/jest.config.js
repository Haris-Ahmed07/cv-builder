export default {
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    '^@/(.*)$': '<rootDir>/src/$1',
    // Alias env.js to env.jest.js for Jest (all possible import styles)
    '^../utils/env$': '<rootDir>/src/utils/env.jest.js',
    '^\.\./utils/env$': '<rootDir>/src/utils/env.jest.js',
    '^\.\./utils/env\.js$': '<rootDir>/src/utils/env.jest.js',
    '^@/utils/env$': '<rootDir>/src/utils/env.jest.js',
    '^@/utils/env.js$': '<rootDir>/src/utils/env.jest.js',
  },
  testMatch: [
    '**/__test__/**/*.test.[jt]s?(x)',
    '**/?(*.)+(spec|test).[jt]s?(x)'
  ],
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
  moduleFileExtensions: ['js', 'jsx', 'json', 'node'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  collectCoverage: true,
  collectCoverageFrom: [
    'src/**/*.{js,jsx}',
    '!src/index.js',
    '!src/reportWebVitals.js',
    '!**/node_modules/**',
    '!**/vendor/**',
  ],
  transformIgnorePatterns: [
    '/node_modules/(?!@babel/runtime)',
  ],
  testEnvironmentOptions: {
    url: 'http://localhost:3000',
  },
  verbose: true,
};
