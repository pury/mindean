/**
 * Babel configuration for ES6+ syntax transformation
 * Babel配置文件，用于ES6+语法转换
 */
module.exports = {
	presets: [
		[
			'@babel/preset-env',
			{
				targets: {
					browsers: ['> 1%', 'last 2 versions', 'not ie <= 8'],
				},
				useBuiltIns: 'usage',
				corejs: 3,
			},
		],
		[
			'@babel/preset-react',
			{
				runtime: 'automatic',
			},
		],
	],
	plugins: [
		'@babel/plugin-transform-class-properties',
		'@babel/plugin-transform-object-rest-spread',
	],
}; 