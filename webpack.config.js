const webpack = require('webpack');

module.exports = {
  context: __dirname + "/app",

  entry: {
    javascript: [
      "./App.jsx"
    ],
  },

  output: {
    filename: "timer.js",
    path: __dirname + "/public/js",
  },

  resolve: {
    extensions: ["*", ".js", ".jsx", ".json"]
  },

  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'eslint-loader',
        enforce: 'pre',
        exclude: /node_modules/
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
    ]
  },

  devtool: "#inline-source-map",
};
