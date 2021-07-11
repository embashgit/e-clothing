module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'airbnb-base',
    'plugin:react/recommended',
    'plugin:import/typescript',
    'plugin:import/warnings',
    'plugin:import/errors',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:sonarjs/recommended',
  ],
  plugins: ['react', 'prettier', 'sonarjs'],
  rules: {
    'no-unused-vars': 'off',
    '@typescript-eslint/no-var-requires': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': ['error'],
    'import/no-named-as-default': 'off',
    'class-methods-use-this': 'off',
    'import/prefer-default-export': 'off',
    'no-underscore-dangle': 'off',
    'react/jsx-uses-react': 'off',
    'react/props-types': 'off',
    'react/react-in-jsx-scope': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'prettier/prettier': ['error', { singleQuote: true }],
  },
  settings: {
    react: {
      version: 'detect',
    },
  },
  env: {
    es6: true,
    browser: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      tsx: true,
      arrowFunctions: true,
    },
  },
};
