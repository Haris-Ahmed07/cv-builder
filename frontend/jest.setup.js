import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';

// Add TextEncoder and TextDecoder to global scope
// This is needed for React Router v7 and other libraries that use these Web APIs
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock any global browser APIs or other modules here
// For example:
// global.fetch = require('jest-fetch-mock');

// Load environment variables from .env.test
import { config } from 'dotenv';
config({ path: '.env.test' });

// Polyfill import.meta.env for Jest
globalThis.import = globalThis.import || {};
globalThis.import.meta = globalThis.import.meta || {};
globalThis.import.meta.env = globalThis.import.meta.env || {};
globalThis.import.meta.env.VITE_BACKEND_API_BASE_URL = process.env.VITE_BACKEND_API_BASE_URL || 'http://localhost:3000/api/test';

// Add any other global mocks or configurations here
Object.defineProperty(global, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});
