module.exports = {
  root: true,
  env: {
    jest: true,
  },
  extends: 'next/core-web-vitals',
  rules: {
    'no-underscore-dangle': 0,
    'no-param-reassign': 0,
    'no-return-assign': 0,
    camelcase: 0,
  },
};
