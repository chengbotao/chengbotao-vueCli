const path = require("path");
const webpack = require("webpack");

module.exports = {
  entry: {
    vendor: ["vue/dist/vue.esm.js"]
  },
  output: {
    path: path.join(__dirname, "../src/assets/dll"),
    filename: "[name].dll.js",
    library: "[name]_library"
  },
  plugins: [
    new webpack.DllPlugin({
      path: path.join(__dirname, "../src/assets/dll", "[name]-manifest.json"),
      name: "[name]_library",
      context: __dirname
    })
  ]
}