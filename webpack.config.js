const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
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
				test: /\.(jpg|png|ico)$/,
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 10000,
							name: 'images/[hash]-[name].[ext]'
						}
					},
					{
						loader: 'image-webpack-loader',
						options: {
							bypassOnDebug: true,
							mozjpeg: {
								progressive: true,
								quality: 65
							},
						}						
					},
				]
				// use: [
				// 	{
				// 		loader: 'url-loader',
				// 		options: {
				// 			limit: 10000,
				// 			name: 'images/[hash]-[name].[ext]'
				// 		},
				// 	},
				// ]
			},
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx', '.css', '.sass']
	},
	output: {
		path: __dirname + '/dist',
		publicPath: '/',
		filename: 'bundle.js'
	},
	plugins: [
		new ExtractTextPlugin('style.css'),
		new UglifyJSPlugin(),
	],
	devServer: {
		historyApiFallback: true,
		contentBase: './dist',
	}
};



