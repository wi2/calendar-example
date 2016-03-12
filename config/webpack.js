var webpack = require('webpack');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var path = require('path')

// compile js assets into a single bundle file
module.exports.webpack = {
  options: {
    target: 'web',
    cache: false,
    devtool: 'eval',
    entry: {
      front: path.resolve(__dirname, '../components/front/app'),
      admin: path.resolve(__dirname, '../components/admin/app'),
      common: ['react', 'react-dom', 'react-router', 'newforms', 'newforms-bootstrap', 'lodash', 'react-motion']
    },
    output: {
      path: path.resolve(__dirname, '../.tmp/public/js'),
      filename: '[name].js'
    },
    plugins: [
      new webpack.optimize.CommonsChunkPlugin('common.js'),
      new CopyWebpackPlugin([
        {
          from: 'assets/js/dependencies',
          to: 'dependencies',
          force: true
        }
      ]),
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ],
    module: {
      loaders: [
        // requires "npm install --save-dev babel-loader"
        {
          test: /\.js$/,
          exclude: /node_modules/,
          loader: 'babel',
          query: {
            presets: ['react', 'es2015', 'stage-2']
          }
        },
        {
          test: /\.css$/,
          loader: 'style!css!less'
        }
      ]
    }
  },

  // docs: https://webpack.github.io/docs/node.js-api.html#compiler
  watchOptions: {
    aggregateTimeout: 300
  }
};
