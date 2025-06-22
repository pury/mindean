/**
 * Webpack configuration for mindean-io library
 * mindean-io库的webpack配置
 */
const path = require('path');

module.exports = {
	mode: 'production',
	entry: './src/index.js',
	output: {
		path: path.resolve(__dirname, 'dist'),
		filename: 'index.js',
		library: 'MindeanIO',
		libraryTarget: 'umd',
		clean: true,
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: {
					loader: 'babel-loader',
				},
			},
		],
	},
	resolve: {
		extensions: ['.js'],
	},
	externals: {
		lodash: 'lodash',
	},
}; 