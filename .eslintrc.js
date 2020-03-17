module.exports = {
  extends: ['eslint:recommended', 'standard', 'prettier'],
  root: true,
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    jest: true,
    node: true,
  },
  parserOptions: {
    ecmaVersion: 8,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ['import', 'node', 'promise', 'standard', 'prettier'],
  rules: {
    'func-names': 'off',
  },
}
