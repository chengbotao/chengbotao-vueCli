const path = require("path");
const merge = require("webpack-merge");
const webpackBaseConf = require("./webpack.base.conf");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(webpackBaseConf, {
  plugins: [
    // HTML 模板
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, "../index.html"),
      bundleName: "./src/assets/dll/vendor.dll.js"
    })
  ]
})