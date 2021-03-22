const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserWebpackplugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const PATH = {
	src: path.join(__dirname, '../src'),
	dist: path.join(__dirname, '../dist'),
	assets: 'assets/',
}

module.exports = {
	context: `${PATH.src}`,
	externals: {
		path: PATH,
	},
	entry: {
		app: PATH.src,
	},
	output: {
		filename: `${PATH.assets}js/[name].[hash].js`,
		path: PATH.dist,
		assetModuleFilename: `[path][name][ext][query]`,
	},
	optimization: {
		splitChunks: {
			cacheGroups: {
				vendor: {
					name: 'vendors',
					test: /node_modules/,
					chunks: 'all',
					enforce: true,
				},
			},
		},
		minimizer: [
			new TerserWebpackplugin(),
		],
	},
	module: {
		rules: [{
			test: /\.js$/,
			use: [
				'babel-loader', 'eslint-loader',
			],
			exclude: '/node_modules/',
		}, {
			test: /\.(jpg|jpeg|png|svg|gif|woff2|woff|ttf|eot)$/,
			type: 'asset/resource',
		}, {
			test: /\.css$/,
			use: [
				{
					loader: MiniCssExtractPlugin.loader,
					options: { publicPath: '../../' },
				},
				'css-loader',
				{
					loader: 'postcss-loader',
					options: {
						sourceMap: true,
						postcssOptions: {
							config: path.resolve(__dirname, `${PATH.src}/${PATH.assets}js/postcss.config.js`),
						},
					},
				},
			],
		}, {
			test: /\.s[ac]ss$/,
			use: [
				{
					loader: MiniCssExtractPlugin.loader,
					options: { publicPath: '../../' },
				},
				'css-loader',
				{
					loader: 'postcss-loader',
					options: {
						sourceMap: true,
						postcssOptions: {
							config: path.resolve(__dirname, `${PATH.src}/${PATH.assets}js/postcss.config.js`),
						},
					},
				},
				'sass-loader',
			],
		}],
	},
	plugins: [
		new CleanWebpackPlugin(),
		new MiniCssExtractPlugin({
			filename: `${PATH.assets}css/[name].[hash].css`,
		}),
		new HtmlWebpackPlugin({
			template: `${PATH.src}/index.html`,
			filename: './index.html',
			inject: false,
			files: {
				css: [ '[name].[hash].css' ],
				js: [ '[name].[hash].js' ],
			},
		}),
		new CopyWebpackPlugin({
			patterns: [
				{ from: `${PATH.src}/${PATH.assets}img`, to: `${PATH.assets}img` },
			],
		}),
	],
}
