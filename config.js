var path	= require('path');
var DEV_PATH	= path.resolve(__dirname) + '/dev';
var conf = {
	//-- 默认值
	def : {
		filesize	: 1,		//-- 单位kb，图片、字体的压缩上线，超过此值的不压缩
		port		: 80,		//-- 端口
		host		: 'zi.on',	//-- 这个基本上不会变了	
		tpl			: path.resolve(DEV_PATH, 'asset/template/tpl.html'),
		css			: false,
		chunk		: false,
	},
    build_zion : {
		env		: true,
		name	: 'dashboard',
		tpl			: path.resolve(DEV_PATH, 'asset/template/zion.html'),
		entry	: {			//-- 入口文件	
			app		: path.resolve(DEV_PATH, 'dashboard/port.jsx'),
			utils	: [
				'sun-king',
				'classnames',
				'react',
				'react-router',
				'react-dom'
			],
		},
		chunk	: {names:['utils'],filename:'/[name].[hash].js'},
		css : true
	},
    start_zion : {
		env		: false,
		name	: 'dashboard',
		entry	: path.resolve(DEV_PATH, 'dashboard/port.jsx'),
		tpl			: path.resolve(DEV_PATH, 'asset/template/zion.html'),
	},
	build_app : {
		env		: true,
		name	: 'roman_app',
		entry	: {			//-- 入口文件	
			app		: path.resolve(DEV_PATH, 'port.jsx'),
			react	: ['react','react-dom','react-router'],
			utils	: [
				path.resolve(DEV_PATH, 'drivers/action.js'),
				path.resolve(DEV_PATH, 'utils/dom.js'),
				path.resolve(DEV_PATH, 'utils/store.js'),
				'fastclick'
			],
		},
		chunk	: {names:['react','utils'],filename:'/[name].[hash].js'},
	},
}


module.exports = conf;