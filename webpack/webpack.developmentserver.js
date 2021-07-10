const webpack = require('webpack');

module.exports = {
  mode: 'production',
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('developmentserver'),
      },
    }),
    new webpack.optimize.AggressiveMergingPlugin(),
  ],
};
