import { execSync } from 'child_process';

describe('Environment-aware React SDK builds', () => {
  beforeAll(() => {
    execSync('mkdir -p ./dist && mv ./dist ./.dist');
  });

  afterAll(() => {
    execSync('rm -rf ./dist && mv ./.dist ./dist');
  });

  afterEach(() => {
    jest.resetModules();
  });

  it('should point the BASE_URL to production by default', (done) => {
    execSync('pnpm run build');
    const code = require('../../dist/index.cjs');
    expect(code.BASE_URL).toBe('https://blocks.dopt.com');
    done();
  });

  it('should point the BASE_URL to production in production', (done) => {
    execSync('NODE_ENV=production pnpm run build');
    const code = require('../../dist/index.cjs');
    expect(code.BASE_URL).toBe('https://blocks.dopt.com');
    done();
  });

  it('should point the BASE_URL to localhost in development', (done) => {
    execSync('NODE_ENV=development pnpm run build');
    const code = require('../../dist/index.cjs');
    expect(code.BASE_URL).toBe('http://localhost:7070');
    done();
  });
});
