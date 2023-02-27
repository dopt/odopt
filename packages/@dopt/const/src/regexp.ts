/**
 * RegExp for dopt users creating a new account
 * 1. at least one lower case character
 * 2. at least one upper case character
 * 3. at least one numeric character
 * 4. at least one special character
 * 5. password length is 8-64 total characters
 */
export const PASSWORD_REGEXP = new RegExp(
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,64}$/
);

export const URL_REGEXP = new RegExp(
  /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/
);
