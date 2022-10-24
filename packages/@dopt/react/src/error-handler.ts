import { Logger } from '@dopt/logger';
import HttpStatusCodeRanges from './http-status-code';

export async function errorHandler(response: Response, log: Logger) {
  const error = await response.clone().json();
  const errorTemplate = `${(error.code || '').toUpperCase()} : ${
    error.details
  }`;
  switch (true) {
    case HttpStatusCodeRanges.ClientErrorResponses(response.status):
      log.error(errorTemplate);
      break;
    case HttpStatusCodeRanges.ServerErrorResponses(response.status):
      log.warn(errorTemplate);
      break;
    default:
      log.log(response.text());
  }
}
