const Webpack = require('webpack');
const { merge } = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const devWebpackConfig = merge(baseWebpackConfig, {
	target: 'web',
	mode: 'development',
	devtool: 'eval-cheap-module-source-map',
	devServer: {
		contentBase: baseWebpackConfig.externals.path.dist,
		port: 3000,
		overlay: true,
	},
	plugins: [
		new Webpack.SourceMapDevToolPlugin({
			filename: '[file].map',
		}),
	],
});

module.exports = new Promise((resolve) => {
	resolve(devWebpackConfig);
});
