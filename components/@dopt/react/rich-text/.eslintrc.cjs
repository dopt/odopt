const { eslint } = require('@dopt/config');

eslint.overrides[0].rules = {
  ...eslint.overrides[0].rules,
  'react/react-in-jsx-scope': 2,
  'react/jsx-uses-react': 2,
};

module.exports = {
  ...eslint,
};
