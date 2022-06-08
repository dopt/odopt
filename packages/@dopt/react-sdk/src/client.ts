const URL_PREFIX = `https://api.dopt.com/`;

export default async function client(key: string, options = {}) {
  return fetch(`${URL_PREFIX}${key}`, options).then((response) =>
    response.json()
  );
}
