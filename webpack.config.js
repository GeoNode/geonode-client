var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, '.');

var plugins = [];
var filename = BUILD_DIR + '/[name].js';
var PROD = JSON.parse(process.env.BUILD_PROD || false);
if(PROD) {
  plugins.push(new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('production') } }));
  plugins.push(new webpack.optimize.UglifyJsPlugin({ compress:{ warnings: true } }));
  filename = BUILD_DIR + '/[name]';
}


module.exports = {
	entry: {
    Viewer: APP_DIR + '/src/viewer.jsx',
    Composer: APP_DIR + '/src/composer.jsx'
  },
	output: {
    filename: filename,
    library: '[name]',
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
      { test: /\.json$/, loader: "json-loader" }
    ]
	}
};
