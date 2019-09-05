module.exports = {
  extends: "airbnb-typescript-prettier",
  plugins: [
    "@typescript-eslint"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  rules: {
    "import/no-extraneous-dependencies": ["error", {
      devDependencies: ["**/*.stories.tsx"],
      peerDependencies: false
    }]
  }
};
