const { DefinePlugin } = require("webpack");
const ReactRefreshWebpackPlugin = require("@pmmmwh/react-refresh-webpack-plugin");
module.exports = {
  mode: "development",
  devtool: "inline-source-map",
  devServer: {
    hot: true,
    open: true,
  },
  plugins: [
    new DefinePlugin({
      "process.env": {
        NODE_ENV: JSON.stringify("development"),
      },
    }),
    new ReactRefreshWebpackPlugin(),
  ],
};
