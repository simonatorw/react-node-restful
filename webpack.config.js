//init
const path = require('path');
const webpack = require('webpack');

//plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Visualizer = require('webpack-visualizer-plugin');

//path
const PATHS = {
	app: path.join(__dirname, 'app'),
	build: path.join(__dirname, 'build')
};

//development configuration
const devConfig = {
	entry: {
		app: PATHS.app
	},
	output: {
		path: PATHS.build,
		filename: '[name].js'
	},	
    module: {
        rules: [
            { 
                test: /\.jsx?$/, 
				include: PATHS.app, 
				use: [
					{
						loader: 'babel-loader', 
						options: {
							cacheDirectory: true,
							presets: ['react', 
								['env', {
									modules: false,
									targets: {
										browsers: ['last 2 versions']
									}
								}]						
							],
							plugins: ['transform-class-properties', 'transform-object-rest-spread'],
							env: {
								test: {
									plugins: ['transform-es2015-modules-commonjs']
								}
							}
						}
					}
				]
            },
			{
				test: /\.css$/,
				use: [
					'style-loader', 
					{ loader: 'css-loader', options: { sourceMap: true, importLoaders: 1 }}, 
					'postcss-loader'
				]
			}				
        ]
    },	
	resolve: {
		extensions: ['.js', '.jsx']
	},		
	devtool: 'eval-source-map',
	devServer: {
		historyApiFallback: true,
		stats: 'errors-only',
		host: process.env.HOST,
		port: process.env.PORT,
		overlay: {
			errors: true,
			warnings: true
		}
	},
	plugins: [
		new webpack.optimize.ModuleConcatenationPlugin(),
		new HtmlWebpackPlugin({
			title: 'React/Node/RESTful'
		})
	]	
};

//run build!
module.exports = (env) => {
	console.log('env', env);
	if (env === 'production') {
		return prodConfig;
	} else if (env === 'development') {
		return devConfig;
	}
	
};