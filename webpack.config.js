const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MinifyPlugin = require("babel-minify-webpack-plugin");
const webpack = require('webpack');

module.exports = {
	entry: './src/index.js',
	module: {
		rules: [
			{
				test: /\.(js|jsx)$/,
				exclude: /node_modules/,
				use: ['babel-loader']
			},
			{
				test: /\.sass$/,
				use: ExtractTextPlugin.extract({
					fallback: 'style-loader',
					use: [
						{ 
							loader: 'css-loader', 
							options: { minimize: true }
						},
						'sass-loader'
					]
				})
			},
			{
				test: /\.(ttf|woff|woff2)$/,
				use: {
					loader: "url-loader",
					options: {
						limit: 50000,
						name: "fonts/[name].[ext]",
					},
				},
			},
			{
				test: /\.(jpg|png|ico)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							publicPath: '/byParallax/',
							name: 'images/[hash]-[name].[ext]'
						}
					},
					{
						loader: 'image-webpack-loader',
						options: {
							bypassOnDebug: true,
							mozjpeg: {
								progressive: true,
								quality: 80
							},
						}
					},
				]
			},
			{
				test: /\.mp4$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							publicPath: '/byParallax/',
							name: 'videos/[hash]-[name].[ext]'
						}
					}
				]
			},
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx']
	},
	output: {
		path: __dirname + '/docs',
		publicPath: '/byParallax',
		filename: '[name].js'
	},
	plugins: [
		new ExtractTextPlugin('style.css'),
		new MinifyPlugin(),
		new HtmlWebpackPlugin({
			title: 'By Parallax',
			template: './src/index.html'
		})
	],
	devServer: {
		port: 8080,
		historyApiFallback: {
			index: 'index.html',
			rewrites: [
				{ from: /\/projects/, to: '/index.html'}
			]
		},
		contentBase: './docs',
	}
};