const ExtractTextPlugin = require('extract-text-webpack-plugin');
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
			},
			{
				test: /\.mp4$/,
				use: [
					{
						loader: 'file-loader',
						options: {
							name: 'videos/[hash]-[name].[ext]'
						}
					}
				]
			},
		]
	},
	resolve: {
		extensions: ['*', '.js', '.jsx', '.css', '.sass']
	},
	output: {
		path: __dirname + '/dist',
		publicPath: '/',
		// chunkFilename: "[name].js",
		filename: '[name].js'
	},
	plugins: [
		new ExtractTextPlugin('style.css'),
		new MinifyPlugin(),
	],
	// optimization: {
 //        runtimeChunk: {
 //            name: "manifest"
 //        },
 //        splitChunks: {
 //            cacheGroups: {
 //                vendor: {
 //                    test: /[\\/]node_modules[\\/]/,
 //                    name: "vendors",
 //                    priority: -20,
 //                    chunks: "all"
 //                }
 //            }
 //        }
 //   	},
	devServer: {
		historyApiFallback: true,
		contentBase: './dist',
	}
};



