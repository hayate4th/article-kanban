module.exports = {
  extends: "airbnb-typescript-prettier",
  rules: {
    "import/no-extraneous-dependencies": ["error", {
      devDependencies: ["**/*.stories.tsx"],
      peerDependencies: false
    }]
  }
};
