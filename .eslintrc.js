module.exports = {
  extends: [
    'eslint:recommended',
    'standard',
    'prettier',
    'plugin:mocha/recommended',
  ],
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
    mocha: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['import', 'node', 'promise', 'standard', 'prettier', 'mocha'],
  rules: {
    'func-names': 'off',
  },
}
