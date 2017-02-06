var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, '.');

var plugins = [
  new webpack.ProvidePlugin({
    'Intl': 'imports?this=>global!exports?global.Intl!intl'
  })
];
var filename = '[name].js';
var PROD = JSON.parse(process.env.BUILD_PROD || false);
if(PROD) {
  plugins.push(new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('production') } }));
  plugins.push(new webpack.optimize.UglifyJsPlugin({ compress:{ warnings: true } }));
  filename = '[name].min.js';
}


module.exports = {
  entry: {
    Viewer: APP_DIR + '/src/viewer.jsx',
    Composer: APP_DIR + '/src/composer.jsx'
  },
  output: {
    path: BUILD_DIR,
    filename: filename,
    library: '[name]',
    libraryTarget: 'umd',
    umdNamedDefine: true,
    publicPath: "/dist/"
  },
  node: {fs: "empty"},
  plugins: plugins,
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
	module: {
		loaders: [
      {
        test: /\.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }, {
        test: /\.css$/,
        loader: "style-loader!css-loader"
      }, {
        test: /\.json$/,
        loader: "json-loader"
      }, {
        test: /\.(png|gif|jpg|jpeg|svg|otf|ttf|eot|woff)$/,
        loader: 'file-loader'
      }
    ],
    noParse: [/dist\/ol.js/, /dist\/jspdf.debug.js/]
  },
  externals: {
    'cheerio': 'window',
    'react/addons': true,
    'react/lib/ExecutionEnvironment': true,
    'react/lib/ReactContext': true
  }
};
