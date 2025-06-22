/**
 * Development webpack configuration for @mindean/app
 */
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');

module.exports = merge(common, {
	mode: 'development',
	devtool: 'inline-source-map',
	devServer: {
		static: './dist',
		hot: true,
		open: true,
		port: 3000,
		historyApiFallback: true,
		compress: true,
		client: {
			overlay: {
				errors: true,
				warnings: false,
			},
		},
	},
	output: {
		filename: '[name].bundle.js',
		publicPath: '/',
	},
}); 