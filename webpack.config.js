const path = require('path');
const config = require('./webpack.config');

module.exports = config;
config.entry: './src/index.js',
config.output: {
	path: path.join(__dirname, "dist"),
	filename: 'paella-basic-plugins.js',
	library: 'paella-basic-plugins',
	libraryTarget: 'umd'
},