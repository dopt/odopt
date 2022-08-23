import HttpStatusCodeRanges from './http-status-code';

export async function errorHandler(response: Response) {
  const error = await response.clone().json();
  const errorTemplate = `${(error.code || '').toUpperCase()} : ${
    error.details
  }`;
  switch (true) {
    case HttpStatusCodeRanges.ClientErrorResponses(response.status):
      console.error(errorTemplate);
      break;
    case HttpStatusCodeRanges.ServerErrorResponses(response.status):
      console.warn(errorTemplate);
      break;
    default:
      console.log(response.text());
  }
}
