var webpack = require('webpack');
var webpackConfig = require('./webpack.config');
webpackConfig.plugins.push(new webpack.DefinePlugin({ 'process.env': { 'NODE_ENV': JSON.stringify('test') } }));
webpackConfig.devtool = 'inline-source-map';

module.exports = function (config) {
  config.set({
    browsers: [ 'PhantomJS' ],
    files: [
      'node_modules/babel-polyfill/dist/polyfill.js',
      'tests/tests.bundle.js',
      { pattern: 'src/**/*', watched: false, included: false, served: true, nocache: true },
      { pattern: 'dist/**/*.js', watched: false, included: false, served: true, nocache: true }
    ],
    preprocessors: {
      'tests/tests.bundle.js': [ 'webpack', 'sourcemap' ]
    },
    frameworks: ['intl-shim', 'mocha', 'chai'],
    reporters: [ 'mocha', 'coverage' ],
    webpack: webpackConfig,
    webpackServer: {
      noInfo: true
    },
    autoWatch: false,
		coverageReporter: {
      dir: 'reports',
      reporters:[
        {type: 'lcovonly', subdir: 'coverage/', file: 'lcov.info'},
      ]
    }
  });
};
