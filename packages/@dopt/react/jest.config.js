module.exports = {
  roots: ['./'],
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/src/__tests__/scripts/',
  ],
};
