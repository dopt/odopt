export function validateJSON(json: string): boolean {
  try {
    JSON.parse(json);
    return true;
  } catch (e) {
    return false;
  }
}

export function validateHeaders(headers: string): boolean {
  const lines = headers.split(/\n/).length;
  const matches = headers.match(/[^\s]+:\s*.+/g) || [];

  return lines == matches.length;
}
