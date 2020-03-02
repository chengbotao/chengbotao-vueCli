const path = require("path");
const fs = require("fs");
const merge = require("webpack-merge");
const webpack = require("webpack");
const webpackBaseConf = require("./webpack.base.conf");
const webpackDllConf = require("./webpack.dll.conf");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const copyWebpackPlugin = require("copy-webpack-plugin");

const webpackProdConf = merge(webpackBaseConf, {
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

    // 保持 module 文档
    new webpack.HashedModuleIdsPlugin(),
  ]
})

module.exports = new Promise((resolve, reject) => {
  if (!fs.existsSync(path.join(__dirname, "../src/assets/dll/vendor-manifest.json"))) {
    webpack(webpackDllConf, (err, stats) => {
      if (err) throw err;
      resolve(merge(webpackProdConf, {
        plugins: [
          // dll 打包优化
          new webpack.DllReferencePlugin({
            context: __dirname,
            manifest: require("../src/assets/dll/vendor-manifest.json")
          }),
        ]
      }));
    })
  } else {
    resolve(merge(webpackProdConf, {
      plugins: [
        // dll 打包优化
        new webpack.DllReferencePlugin({
          context: __dirname,
          manifest: require("../src/assets/dll/vendor-manifest.json")
        }),
      ]
    }));
  }
})