/* eslint-disable @typescript-eslint/no-var-requires */
const path = require("path");

module.exports = {
  entry: path.resolve(__dirname, "src/index.tsx"),

  output: {
    path: path.resolve(__dirname, "public"),
    filename: "bundle.js"
  },

  module: {
    rules: [
      { test: /\.tsx?$/, loader: "ts-loader" },
      { test: /\.png$/, loaders: "url-loader" }
    ]
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },

  devServer: {
    contentBase: path.resolve(__dirname, "public")
  }
};
