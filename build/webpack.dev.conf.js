const path = require("path");
const merge = require("webpack-merge");
const webpack = require("webpack");
const webpackBaseConf = require("./webpack.base.conf");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = merge(webpackBaseConf, {
  plugins: [
    // HTML 模板
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, "../index.html")
    }),

    // 在编译出现错误时,代码将不会退出。
    new webpack.NoEmitOnErrorsPlugin()
  ]
})