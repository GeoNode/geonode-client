var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, '.');

module.exports = {
	entry: APP_DIR + '/src/viewer.jsx',
	output: {
		filename: BUILD_DIR + '/viewer.js',
    library: 'viewer',
    libraryTarget: 'umd',
    umdNamedDefine: true
	},
  node: {fs: "empty"},
	module: {
		loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.json$/, loader: "json-loader" }
    ]
	}
};
