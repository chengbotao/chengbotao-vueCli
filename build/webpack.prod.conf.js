const path = require("path");
const fs = require("fs");
const merge = require("webpack-merge");
const webpackBaseConf = require("./webpack.base.conf");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const copyWebpackPlugin = require("copy-webpack-plugin");

module.exports = merge(webpackBaseConf, {
  plugins: [
    // HTML 模板
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, "../index.html"),
      bundleName: "./assets/dll/vendor.dll.js"
    }),

    // 每次 build 先删除的已经存在的打包好的文件
    new CleanWebpackPlugin({
      verbose: true,
      dry: false
    }),

    // copy 静态文件夹
    new copyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../src/assets'),
        to: "assets",
        ignore: ['.*']
      },
      {
        from: path.resolve(__dirname, '../static'),
        to: "static",
        ignore: ['.*']
      }
    ]),
  ]
})