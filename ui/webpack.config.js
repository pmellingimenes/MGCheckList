'use strict';

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');
const merge = require('webpack-merge');

const webpackCommon = {
  entry: {
    app: ['./app/initialize']
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader?presets[]=es2015'
          }
        ]
      },
      {
        test: /\.jst$/,
        use: {
          loader: 'underscore-template-loader'
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?name=images/[name].[ext]',
          'image-webpack-loader?bypassOnDebug'
        ]
      },
      {
        test: /\.(woff2?)$/,
        use: 'url-loader?limit=10000&name=fonts/[name].[ext]'
      },
      { test: /\.(ttf|eot)$/, use: 'file-loader?name=fonts/[name].[ext]' },
      // Bootstrap 3
      {
        test: /bootstrap-sass[\/\\]assets[\/\\]javascripts[\/\\]/,
        use: 'imports-loader?jQuery=jquery'
      }
    ]
  },
  output: {
    filename: 'app.js',
    path: path.join(__dirname, './public'),
    publicPath: '/'
  },
  plugins: [
    new ExtractTextPlugin('app.css'),
    new CopyWebpackPlugin([
      {
        from: './app/assets/index.html',
        to: './index.html'
      }
    ]),
    new webpack.ProvidePlugin({
      $: 'jquery',
      _: 'underscore'
    })
  ],
  resolve: {
    modules: [
      path.join(__dirname, './node_modules'),
      path.join(__dirname, './app')
    ]
  },
  resolveLoader: {
    modules: [path.join(__dirname, './node_modules')]
  }
};

switch (process.env.npm_lifecycle_event) {
  case 'start':
  case 'dev':
    module.exports = merge(webpackCommon, {
      devtool: '#inline-source-map',
      devServer: {
        contentBase: path.join(__dirname, 'public'),
        compress: true,
        port: 9000
      }
    });
    break;
  default:
    module.exports = merge(webpackCommon, {
      devtool: 'source-map'
    });
    break;
}
