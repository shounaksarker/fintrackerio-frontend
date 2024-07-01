module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  // Configuration for JavaScript files
  root: true,
  plugins: ['eslint-plugin', 'import', 'unused-imports', 'prettier', 'simple-import-sort', 'tailwindcss'],
  extends: [
    'airbnb-base',
    'eslint:recommended',
    'next',
    'next/core-web-vitals',
    'plugin:eslint-plugin/recommended',
    'next/core-web-vitals',
    'prettier',
  ],
  rules: {
    'prettier/prettier': 'warn',
    'no-unused-vars': 'warn',
    'no-plusplus': ['error', { allowForLoopAfterthoughts: true }],
    'no-param-reassign': 'off',
    'no-use-before-define': [
      'error',
      {
        functions: true,
      },
    ],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'unused-imports/no-unused-imports': 'warn',
    'import/prefer-default-export': 'off',
    'consistent-return': 'off',
    'tailwindcss/classnames-order': 'warn',
    'tailwindcss/enforces-shorthand': 'warn',
    'tailwindcss/no-contradicting-classname': 'warn',
    'arrow-body-style': 0,
    'no-trailing-spaces': 0,
    'eol-last': 0,
    'comma-dangle': 0,
    'import/extensions': 'off',
    'import/no-unresolved': ['error', { ignore: ['^@/'] }],
    'react-hooks/exhaustive-deps': 'off',

    'space-before-function-paren': [
      'warn',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
  },
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
};
