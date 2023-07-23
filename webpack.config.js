const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: "./src/main.js",
  output: {
    path: path.resolve(__dirname, "./dist"),
    filename: "js/[name].js",
    clean: true
  },
  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   loader: "./loaders/test-loader.js",
      // },
      {
        test: /\.js$/,
        // use: ['./loaders/loader-cate/sync-loader.js', './loaders/loader-cate/async-loader.js']
        // loader: './loaders/loader-cate/raw-loader.js'
        // loader: './loaders/loader-cate/pitching-loader.js'
        use: './loaders/custom-loader/clean-log-loader.js'
      },
      {
        test: /\.js$/,
        loader: './loaders/custom-loader/banner-loader',
        options: {
          author: 'nihao',
          age: 23
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "./public/index.html"),
      filename: "index.html",
      inject: "body",
    }),
  ],
  mode: "development",
};
