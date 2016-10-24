//-- 引入配置文件
const config	= require("./config.js");
var colors = require('colors');
//-- 处理配置文件
var pro = config[process.env.npm_lifecycle_event];
for(var item in config.def){
	if(pro[item] === void 0){
		pro[item] = config.def[item]
	}
}

//-- 引入一些东西
var webpack = require('webpack');
var HtmlwebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CleanWebpackPlugin = require('clean-webpack-plugin');

var chunk = pro['chunk'] ? new webpack.optimize.CommonsChunkPlugin(pro['chunk']) : new webpack.BannerPlugin('');
var csstext = pro['css'] ? new ExtractTextPlugin("style.[hash].css") : new webpack.BannerPlugin('');
var cssType = pro['css'] ? {test: /\.less$/,loader:ExtractTextPlugin.extract("style-loader", "css-loader!less-loader")} : {test: /\.less$/,loaders: ['style','css','less'],}

//-- 日期版本
var time	= new Date();
var mon		= time.getMonth() + 1;
var day		= time.getDate();
var year	= time.getFullYear();
var VERSION	= [year,( mon > 9 ? mon : '0' + mon),( day > 9 ? day : '0' + day )].join('');

//-- 路径
var path	= require('path');
var ROOT_PATH	= path.resolve(__dirname);
var APP_PATH = path.resolve(ROOT_PATH, 'dev/' + pro.name);
var BUILD_PATH = path.resolve(ROOT_PATH, 'www/' + pro.name + '/' + VERSION);

console.log('')
console.log('')
console.log('||||||||||||||||||||||||||||||||||||||||||')
console.log('')
var consoleName = pro.env ? '准备发布—— ' : '即将运行——' + pro.name
var consoleVersion = '当前版本—— ' + VERSION
console.log(consoleName.bold.yellow)
console.log(consoleVersion.bold.yellow)
console.log('')
console.log('||||||||||||||||||||||||||||||||||||||||||')
console.log('')
console.log('')

module.exports = {
	//-- 项目的文件夹 可以直接用文件夹名称 默认会找index.js 也可以确定是哪个文件名字
	entry	: pro.entry,
	//-- 输出的文件名
	output: {
		path		: BUILD_PATH,
		filename	: !pro.env ? '/[name].js' : '/[name].[hash].js'
	},
	devtool	: !pro.env ? 'eval-source-map' : false,
	module: {
		loaders: [
			{
				test: /\.css$/,
				loader: ['style','css'],
			},
			cssType,
			{
				test: /\.(woff|svg|eot|ttf)\??.*$/,
				loader: 'url?limit=' + ( pro.filesize * 1024 ) + '&name=[path][name].[ext]'
			},
			{
				test: /\.jsx?$/,
				loader: 'babel',
				include: APP_PATH,
				query: {
					presets: ["react", "es2015"],
				}
			},
		]
	},
	//-- 拓展名
	resolve: {
		extensions: ['', '.js', '.jsx'],
		alias: {
          'react': 'react'
        }
	},
	plugins: [
		new HtmlwebpackPlugin({
			//-- 模板文件路径
			template	: pro.tpl,
			//-- 注入所有的资源,如果设置为 true 或者 body，所有的 javascript 资源将被放置到 body 元素的底部，'head' 将放置到 head 元素中。
			inject	: true,
			//-- 传递 html-minifier 选项给 minify 输出
			minify	: {
				//-- 是否去掉注释
				removeComments	: true,
				//-- 是否去掉空格
				collapseWhitespace : true,
				//-- 是否压缩html里的js（使用uglify-js进行的压缩）
				minifyJS : true,
				//-- 是否压缩html里的css（使用clean-css进行的压缩）
				minifyCSS : true,
			},
			hash	: true, 
		}),
		//-- 把入口文件里面的数组打包
		chunk,
		//-- 压缩js
		new webpack.optimize.UglifyJsPlugin({
			compress: {
				warnings: false
			},
			//-- 移除注释
			output: {
				comments: false, 
			},
			minimize: true
		}),		
		//-- 功能控制
		new webpack.DefinePlugin({
			'process.env': pro.env ? {
				'NODE_ENV': '"production"' 
			} : {},
			__DEBUG__: !pro.env,
		}),
		//-- 分离css
		csstext,
		//-- 发布前先清空目录
		new CleanWebpackPlugin([BUILD_PATH], {
			root: process.cwd()  
		})
	],
	//-- 【开发环境】服务器 
	devServer: {
		historyApiFallback	: true,
		hot			: true,
		inline		: true,
		progress	: true,
		// //-- 代理
		// proxy: {
			// '/api/*': {
				// "target" : {
					// "host"  : pro.host,
					// "port"	: pro.port
				// },
			// },
		// },
	},
}