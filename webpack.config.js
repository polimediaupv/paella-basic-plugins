const path = require('path');

module.exports = {
	entry: './src/index.js',
	output: {
		path: path.join(__dirname, "dist"),
		filename: 'paella-basic-plugins.js',
        library: 'paella-basic-plugins',
        libraryTarget: 'umd'
	},
	externals: {
        paella: {
            commonjs: 'paella-core',
            commonjs2: 'paella-core',
            amd: 'paella-core'
        }
    },
	
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /(node_modules)/,
				use: {
					loader: 'babel-loader',
					options: {
						presets: ['@babel/preset-env']
					}
				}
			},
			{
				test: /\.(svg)$/i,
				exclude: /(node_modules)/,
				use: [
					{
						loader: 'svg-inline-loader'
					}
				]
			}
		]
	},
	
	plugins: [
	]
}