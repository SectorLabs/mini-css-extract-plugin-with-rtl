const WebpackRTLPlugin = require('webpack-rtl-plugin');

const Self = require('../../');

const ENABLE_HMR =
  typeof process.env.ENABLE_HMR !== 'undefined'
    ? Boolean(process.env.ENABLE_HMR)
    : false;

const ENABLE_ES_MODULE =
  typeof process.env.ES_MODULE !== 'undefined'
    ? Boolean(process.env.ES_MODULE)
    : false;

module.exports = {
  mode: 'development',
  output: {
    chunkFilename: '[name].chunk.js',
    publicPath: '/dist/',
    crossOriginLoading: 'anonymous',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: [/\.module\.css$/i],
        use: [
          {
            loader: Self.loader,
          },
          {
            loader: 'css-loader',
            options: {
              esModule: ENABLE_ES_MODULE,
            },
          },
        ],
      },
      {
        test: /\.module\.css$/i,
        use: [
          {
            loader: Self.loader,
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              esModule: ENABLE_ES_MODULE,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new Self({
      filename: '[name].css',
      chunkFilename: '[name].chunk.css',
      rtlEnabled: true,
    }),
    new WebpackRTLPlugin(),
  ],
  devServer: {
    hot: ENABLE_HMR,
    contentBase: __dirname,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};
