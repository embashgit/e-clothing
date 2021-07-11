/* eslint-disable import/no-extraneous-dependencies */
const path = require("path");
const webpack = require("webpack");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const CompressionWebpackPlugin = require("compression-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const BrotliPlugin = require("brotli-webpack-plugin");
const DotEnv = require("dotenv-webpack");

module.exports = {
  entry: path.resolve(__dirname, "..", "./src/index.tsx"),
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".json"],
  },
  output: {
    publicPath: "/",
    path: path.join(__dirname, "..", "dist"),
    filename: "ts/[name].bundle.min.js",
    chunkFilename: "ts/[name].bundle.js",
  },

  module: {
    rules: [
      {
        test: /\.(ts|js)x$/,
        exclude: /node_modules/,
        // loader: "ts-loader",
        use: [{ loader: "babel-loader" }, { loader: "ts-loader" }],
        // options: {
        //   plugins: [["import", { libraryName: "antd", style: true }]],
        // },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg|woff|woff2|ttf)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name]-[hash:8].[ext]",
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          {
            loader: "less-loader",
            options: {
              modifyVars: {
                "primary-color": "#219653",
                "link-color": "#219653",
                "border-radius-base": "2px",
              },
              javascriptEnabled: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new HTMLWebpackPlugin({
      // favicon: "./src/favicon.ico",
      template: path.resolve(__dirname, "..", "./src/index.html"),
      title: "E-clothing",
    }),
    // new CopyWebpackPlugin([{ from: "./src/favicon.ico" }]),
    new CompressionWebpackPlugin({
      test: /\.(html|ts|css|js|gif|svg|ico|woff|ttf|eot)$/,
      exclude: /(node_modules)/,
    }),
    // new MiniCssExtractPlugin({
    //   filename: !inProduction ? "[name].css" : "[name].[hash].css",
    //   chunkFilename: !inProduction ? "[id].css" : "[id].[hash].css",
    // }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ["Your application is running on http://localhost:4001"],
      },
    }),
    // new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ja|it/),
    // use this for a lot more compression - takes longer to bundle app though
    // new BrotliPlugin({
    //   asset: "[path].br[query]",
    //   test: /\.(js|css|html|svg)$/,
    //   threshold: 10240,
    //   minRatio: 0.8,
    // }),
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: "./src",
    port: "4001",
  },
  // optimization: {
  //   splitChunks: {
  //     cacheGroups: {
  //       commons: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: "vendor",
  //         chunks: "initial",
  //       },
  //     },
  //   },
  //   runtimeChunk: {
  //     name: "manifest",
  //   },
  // minimizer: [
  //   new UglifyJsPlugin({
  //     sourceMap: true,
  //     uglifyOptions: {
  //       ecma: 9,
  //       mangle: false,
  //       keep_classnames: true,
  //       keep_fnames: true,
  //     },
  //   }),
  // ],
  // },
};
