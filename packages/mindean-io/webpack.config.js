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
		chunkFilename: '[name].[contenthash:5].js',
		filename: 'index.js',
		library: 'mindean',
		libraryTarget: 'umd',
		libraryExport: 'default',
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
	optimization: {
		minimize: true,
		minimizer: [
			new(require('terser-webpack-plugin'))({ 
				extractComments: false, 
			}),
		],
	}
}; 