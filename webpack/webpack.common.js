/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
const webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BrotliPlugin = require('brotli-webpack-plugin');
const DotEnv = require('dotenv-webpack');

const inProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: './src/index.js',
  output: {
    publicPath: '/',
    path: path.join(__dirname, '../', '../', 'dist'),
    filename: 'js/[name].bundle.min.js',
    chunkFilename: 'js/[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        options: {
          plugins: [['import', { libraryName: 'antd', style: true }]],
        },
      },
      {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: ["ts-loader"],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ['style-loader', 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|gif|svg|woff|woff2|ttf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[path][name]-[hash:8].[ext]',
            },
          },
        ],
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          {
            loader: 'less-loader',
            options: {
              modifyVars: {
                'primary-color': '#219653',
                'link-color': '#219653',
                'border-radius-base': '2px',
              },
              javascriptEnabled: true,
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new HTMLWebpackPlugin({
      favicon: './src/favicon.ico',
      template: './src/index.html',
      title: 'E-clothing',
    }),
    new CopyWebpackPlugin([{ from: './src/favicon.ico' }]),
    new CompressionWebpackPlugin({
      test: /\.(html|css|js|gif|svg|ico|woff|ttf|eot)$/,
      exclude: /(node_modules)/,
    }),
    new MiniCssExtractPlugin({
      filename: !inProduction ? '[name].css' : '[name].[hash].css',
      chunkFilename: !inProduction ? '[id].css' : '[id].[hash].css',
    }),
    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['Your application is running on http://localhost:4001'],
      },
    }),
    new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ja|it/),
    // use this for a lot more compression - takes longer to bundle app though
    // new BrotliPlugin({
    //   asset: '[path].br[query]',
    //   test: /\.(js|css|html|svg)$/,
    //   threshold: 10240,
    //   minRatio: 0.8,
    // }),
    new DotEnv({
      path: './.env',
      safe: false,
    }),
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: './src',
    port: '2001',
  },
  devtool: inProduction ? 'source-map' : 'inline-source-map',
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor',
          chunks: 'initial',
        },
      },
    },
    runtimeChunk: {
      name: 'manifest',
    },
    minimizer: [
      new UglifyJsPlugin({
        sourceMap: true,
        uglifyOptions: {
          ecma: 9,
          mangle: false,
          keep_classnames: true,
          keep_fnames: true,
        },
      }),
    ],
  },
};
