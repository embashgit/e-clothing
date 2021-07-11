module.exports = {
  parser: "babel-eslint",
  extends: [
    "airbnb-base",
    "plugin:react/recommended",
    "plugin:sonarjs/recommended",
  ],
  plugins: ["react", "prettier", "sonarjs"],
  rules: {
    "react/jsx-filename-extension": [1, { extensions: [".js", ".ts", ".tsx"] }],
    "no-unused-vars": ["error", { varsIgnorePattern: "history" }],
    "import/no-named-as-default": "off",
    "class-methods-use-this": "off",
    "import/prefer-default-export": "off",
    "no-underscore-dangle": "off",
    "react/display-name": "off",
    "prettier/prettier": ["error", { singleQuote: true }],
  },
  env: {
    es6: true,
    browser: true,
    jest: true,
  },
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
      arrowFunctions: true,
    },
  },
};
