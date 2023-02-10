export const SAVE_BLOCK_FAIL_MSG = 'Could not save block. Please try again.';
export const DELETE_FAIL_MSG = 'Could not delete block. Please try again.';
export const RESET_FAIL_MSG = 'Could not reset flow. Please try again.';
export const VERSION_RESTORE_FAIL_MSG =
  'Could not restore version. Please try again.';
export const INVALID_EMAIL_MSG =
  'Your email address is not allowed. Please try a different one.';
export const REGENERATE_APIKEY_FAIL_MSG =
  'Could not regenerate API key. Please try again.';

export const TRY_AGAIN_MSG = 'Please try again';
export const EXP_END_OF_INPUT_MSG =
  'Expected expression but end of input found.';
export const LOGOUT_FAIL_MSG = 'Could not log out';
export const LOGIN_FAIL_MSG = 'Could not log in. Please try again.';
export const SIGNUP_FAIL_MSG = 'Could not sign up. Please try again.';
export const GENERATE_APIKEY_FAIL_MSG =
  'Could not generate API key. Please try again.';
export const FETCH_APIKEY_FAIL_MSG =
  'Could not find API key. Please try again.';
export const JOURNEY_CTA_FAIL_MSG = 'Could not create flow. Please try again.';

export const ADD_BLOCK_FAIL_MSG = 'Could not add block';
export const MOVE_BLOCK_FAIL_MSG = 'Could not move block';
export const CONNECT_EDGE_FAIL_MSG = 'Could not connect blocks';
export const DELETE_EDGE_FAIL_MSG = 'Could not delete edge';
export const REMOVE_BLOCK_FROM_SET_FAIL_MSG =
  'Could not remove block from group';

export const JOURNEY_COMMIT_DESC =
  'A new version of this flow will be created once you commit these changes.';

export const JOURNEY_COMMIT_FAIL_MSG =
  'Could not create commit. Please try again.';
export const TARGETING_SAVE_FAIL = 'Could not save changes. Please try again.';

export const FIELD_VALUE_SAVE_FAIL_MSG =
  'Could not save field value. Please try again.';

export const FIELD_DEFINITION_SAVE_FAIL_MSG =
  'Could not save field. Please try again.';

export const DEPLOY_SUCCESS_MSG = 'Changes deployed';

export const DEPLOY_FAIL_MSG = 'Could not deploy changes';

export const renameFailMessage = (model: string) =>
  `Could not rename ${model}. Please try again.`;

export const enableFailMessage = (action: string) =>
  `Could not ${action} flow. Please try again.`;

export const archiveFailMessage = (model: string) =>
  `Could not archive ${model}. Please try again.`;

export const deleteFailMessage = (model: string) =>
  `Could not delete ${model}. Please try again.`;
