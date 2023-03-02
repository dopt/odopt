const userSecrets = Object.freeze([
  'password',
  'secret',
  'email',
  'key',
  'refreshToken',
  'accessToken',
  'gToken',
  'g_state',
  'address',
  'line1',
  'line2',
  'city',
  'state',
  'country',
  'zip',
  'zipcode',
  'zipCode',
  '_csrf',
]);

const requestFields = Object.freeze([
  'req.headers["x-api-key"]',
  'req.headers["X-Api-Key"]',
]);

const serverSecrets = Object.freeze([
  'apiKey',
  'GOOGLE_CLIENT_ID',
  'COOKIE_SECRET',
  'JWT_SECRET',
  'POSTGRES_PASSWD',
  'POSTGRES_PASSWORD',
  'SENTINEL_PASS',
  'REDIS_WORKER_PASS',
  'REDIS_REPLICATION_PASS',
  'REDIS_DEFAULT_PASS',
  'APP_POSTGRES_PASSWD',
  'APP_POSTGRES_DB',
  'APP_POSTGRES_URL',
  'BLOCK_POSTGRES_PASSWD',
  'BLOCK_POSTGRES_DB',
  'BLOCK_POSTGRES_URL',
  'USERS_POSTGRES_PASSWD',
  'USERS_POSTGRES_DB',
  'USERS_POSTGRES_URL',
  'USERS_EXTERNAL_API_KEY',
  'INTERNAL_API_KEY',
  'DATABASE_URL',
  'POSTGRES_URL',
  'POSTGRES_DB',
  'POSTGRES_USER',
  'csrfToken',
]);

export const secrets: readonly string[] = makeSecrets();

// Creates patterns to find secrets up to depth 5 which is the point where pino truncates logs.
function makeSecrets() {
  const secrets: string[] = [];
  for (const secret of userSecrets) {
    let nDepthSecret = secret;
    for (let i = 0; i <= 5; i++) {
      secrets.push(nDepthSecret);
      nDepthSecret = '*.' + nDepthSecret;
    }
  }
  for (const secret of requestFields) {
    secrets.push(secret);
  }

  for (const secret of serverSecrets) {
    let nDepthSecret = secret;
    for (let i = 0; i <= 5; i++) {
      secrets.push(nDepthSecret);
      nDepthSecret = '*.' + nDepthSecret;
    }
  }
  return Object.freeze([...secrets, ...userSecrets, ...serverSecrets]);
}
