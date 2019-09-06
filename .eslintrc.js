module.exports = {
  extends: [
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
    "plugin:react/recommended",
    "prettier/@typescript-eslint"
  ],
  plugins: [
    "react",
    "@typescript-eslint",
    "prettier"
  ],
  parser: "@typescript-eslint/parser",
  env: { "browser": true, "node": true, "es6": true },
  parserOptions: {
    sourceType: "module",
    ecmaFeatures: {
      jsx: true
    }
  },
  settings: {
    react: {
      pragma: "React",
      version: "detect"
    }
  },
  rules: {
    "react/jsx-no-target-blank": "error",
    "react/prop-types": "off"
  }
};
