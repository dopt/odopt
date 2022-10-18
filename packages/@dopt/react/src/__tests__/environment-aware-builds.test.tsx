import { exec } from 'child_process';

describe('Environment-aware React SDK builds', () => {
  beforeAll((done) => {
    exec('mkdir -p ./dist && mv ./dist ./.dist', done);
  });

  afterAll((done) => {
    exec('rm -rf ./dist && mv ./.dist ./dist', done);
  });

  afterEach((done) => {
    exec('rm -rf ./dist', done);
    jest.resetModules();
  });

  it('should point the BASE_URL to production in production', (done) => {
    exec('NODE_ENV=production pnpm run build', () => {
      const code = require('../../dist/index.cjs');
      expect(code.BASE_URL).toBe('https://blocks.dopt.com');
      done();
    });
  });

  it('should point the BASE_URL to localhost in development', (done) => {
    exec('NODE_ENV=development pnpm run build', () => {
      const code = require('../../dist/index.cjs');
      expect(code.BASE_URL).toBe('http://localhost:7070');
      done();
    });
  });
});
