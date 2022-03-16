const { VueLoaderPlugin } = require("vue-loader");
const path = require("path");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const htmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const LiveReloadPlugin = require('webpack-livereload-plugin');

const autoprefixer = require("autoprefixer");

module.exports = {
  entry: {
    main: "./src/main.js",
  },
  output: {
    path: path.resolve(__dirname, "../backend/public"),
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.vue$/,
        loader: "vue-loader",
      },
      {
        test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
        loader: "file-loader",
        options: {
          name: "[name][contenthash:8].[ext]",
        },
      },
      {
        test: /\.(png|jpe?g|gif|webm|mp4|svg)$/,
        loader: "file-loader",
        options: {
          outputPath: "assets",
          esModule: false,
        },
      },
      {
        test: /\.s?css$/,
        use: [
          "style-loader",
          MiniCssExtractPlugin.loader,
          "css-loader",
          // {
          //   loader: "postcss-loader",
          //   options: {
          //     plugins: () => [autoprefixer()],
          //   },
          // },
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new LiveReloadPlugin(),
    new VueLoaderPlugin(),
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, "public", "index.template.html"),
      // favicon: "./public/favicon.ico",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.vue'],
    alias: {
      'vue': '@vue/runtime-dom'
    }
    // alias: {
    //   vue$: "vue/dist/vue.runtime.esm.js",
    // },
    // extensions: ["*", ".js", ".vue", ".json"],
  },
};