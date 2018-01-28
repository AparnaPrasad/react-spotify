var webpack = require('webpack');
var path = require('path');
var BUILD_DIR = path.resolve(__dirname, 'dist');
var APP_DIR = path.resolve(__dirname, 'client_code/my-app/src');
var config = {
  entry: APP_DIR + '/index.js',
  output: {
    path: BUILD_DIR,
    filename: 'bundle.js',
    publicPath: '/client_code'
  },
  modules: {
  	loader: [
  		{
  			test: /\.js?/,
  			include: APP_DIR,
  			loader: babel-loader,
  			query:{
  				presets:[""]
  			}
  		}
  	]
  }
};
module.exports = config;