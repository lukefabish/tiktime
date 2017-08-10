'use strict';

let path = require('path');
let srcPath = path.join(__dirname, '/../app/');

module.exports = {
  target: 'node',
  devtool: 'cheap-module-source-map',
  module: {
    loaders: [
      {
        test: /\.(png|jpg|gif|woff|woff2|css|sass|scss|less|styl|mp4|ogg|svg)$/,
        loader: 'null-loader'
      },
      {
        test: /\.json$/,
        loader: 'json-loader'
      },
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        query: {
          presets: [ 'airbnb' ]
        },
        include: [].concat(
          [
            path.join(__dirname, '/../app'),
            path.join(__dirname, '/../test')
          ]
        )
      }
    ]
  },
  resolve: {
    extensions: [ '.js', '.jsx', '.json' ],
    alias: {
      actions: srcPath + 'actions/',
      components: srcPath + 'components/',
      sources: srcPath + 'sources/',
      stores: srcPath + 'stores/',
      styles: srcPath + 'styles/',
      config: srcPath + 'config/' + process.env.REACT_WEBPACK_ENV,
      sinon: 'sinon/pkg/sinon.js'
    }
  },
  externals: {
    cheerio: 'window',
    jsdom: 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': 'window',
    'react-addons-test-utils': 'react-dom',
  },
  plugins: []
};
