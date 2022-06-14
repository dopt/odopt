const URL_PREFIX = `https://api.dopt.com`;

export default async function client(
  url: string,
  apiKey: string,
  options?: { [key: string]: any }
) {
  return fetch(`${URL_PREFIX}${url}`, {
    ...options,
    headers: {
      ...options?.headers,
      'x-api-key': apiKey,
    },
  }).then((response) => response.json());
}
