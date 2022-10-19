'use strict';

/**
 * Hypertext Transfer Protocol (HTTP) response status codes.
 * @see {@link https://developer.mozilla.org/docs/Web/HTTP/Status}
 */
export const HttpStatusCodeRanges = {
  InformationalResponses: (status: number): boolean => {
    return status >= 100 && status < 200;
  },
  SuccessfulResponses: (status: number): boolean => {
    return status >= 200 && status < 300;
  },
  RedirectionResponses: (status: number): boolean => {
    return status >= 300 && status < 400;
  },
  ClientErrorResponses: (status: number): boolean => {
    return status >= 400 && status < 500;
  },
  ServerErrorResponses: (status: number): boolean => {
    return status >= 500 && status < 600;
  },
};
export default HttpStatusCodeRanges;
