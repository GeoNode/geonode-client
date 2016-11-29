var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, '.');

var plugins = [];
var filename = BUILD_DIR + '/viewer.js';
var PROD = JSON.parse(process.env.BUILD_PROD || false);
if(PROD) {
  plugins.push(new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('production') } }));
  plugins.push(new webpack.optimize.UglifyJsPlugin({ compress:{ warnings: true } }));
  filename = BUILD_DIR + '/viewer.min.js';
}

module.exports = {
	entry: APP_DIR + '/src/viewer.jsx',
	output: {
    filename: filename,
    library: 'viewer',
    libraryTarget: 'umd',
    umdNamedDefine: true
	},
  node: {fs: "empty"},
  plugins: plugins,
	module: {
		loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.json$/, loader: "json-loader" },
      { test: /\.(png|gif|jpg|jpeg|svg|otf|ttf|eot|woff)$/, loader: 'file-loader' }
    ]
	}
};
