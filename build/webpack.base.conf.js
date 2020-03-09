const path = require("path");
const HappyPack = require("happypack");
const os = require("os");
const VueLoaderPlugin = require("vue-loader/lib/plugin");

// 开启多线程
const happyThreadPool = HappyPack.ThreadPool({
  size: os.cpus().length
});

module.exports = {
  mode: process.env.NODE_ENV==="development" ? "development" : "production",
  entry: path.resolve(__dirname, "../src/main.js"),
  output: {
    path: path.resolve(__dirname, "../dist"),
    filename: "bundle.js"
  },

  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      "vue": "vue/dist/vue.esm"
    }
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader"
      },
      // 它会应用到普通的 `.js` 文件
      // 以及 `.vue` 文件中的 `<script>` 块
      {
        test: /\.js$/,
        loader: "happypack/loader?id=happybabel",
      },
      // 它会应用到普通的 `.css` 文件
      // 以及 `.vue` 文件中的 `<style>` 块
      {
        test: /\.css$/,
        use: ["vue-style-loader", "style-loader", "css-loader"]
      },
      
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: "[name].[ext]"
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: "[name].[ext]"
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
        }
      }
    ]
  },

  plugins: [
    new VueLoaderPlugin(),

    new HappyPack({
      id: "happybabel",
      loaders: ["babel-loader?cacheDirectory=true"],
      threadPool: happyThreadPool
    })
  ]
}