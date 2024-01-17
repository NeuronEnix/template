module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'airbnb-typescript/base'
  ],
  parserOptions: {
    project: './tsconfig.json'
  },
  rules: {
    "no-console": "off",
    "@typescript-eslint/naming-convention": "off",
    "@typescript-eslint/no-throw-literal": "off"
  },
};
