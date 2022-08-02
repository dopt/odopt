// '.*secret' finds the key secret at any depth except root
const userSecrets = Object.freeze([
  '*.password',
  '*.secret',
  '*.email',
  '*.key',
  '*.refreshToken',
  '*.accessToken',
  '*.gToken',
  '*.g_state',
  '*.address',
  '*.line1',
  '*.line2',
  '*.city',
  '*.state',
  '*.country',
  '*.zip',
  '*.zipcode',
  '*.zipCode',
  '*._csrf',
  'req.headers["x-api-key"]',
  'req.headers["X-Api-Key"]',
]);

const serverSecrets = Object.freeze([
  '*.apiKey',
  '*.GOOGLE_CLIENT_ID',
  '*.COOKIE_SECRET',
  '*.JWT_SECRET',
  '*.POSTGRES_PASSWD',
  '*.DATABASE_URL',
  '*.POSTGRES_URL',
  '*.POSTGRES_DB',
  '*.POSTGRES_USER',
  '*.csrfToken',
]);

export const secrets: readonly string[] = makeSecrets();

// Creates patterns to find secrets at root from wildcard secrets.
function makeSecrets() {
  const secrets: string[] = [];
  for (const secret of userSecrets) {
    if (secret.startsWith('*.')) {
      secrets.push(secret.substring(2));
    }
  }
  for (const secret of serverSecrets) {
    if (secret.startsWith('*.')) {
      secrets.push(secret.substring(2));
    }
  }
  return Object.freeze([...secrets, ...userSecrets, ...serverSecrets]);
}
