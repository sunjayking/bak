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
	
//==============================================================================================
	//-- sunjay后台发布
    build_zion : {
		env		: true,
		name	: 'dashboard',
		tpl			: path.resolve(DEV_PATH, 'asset/template/sunjay.html'),
		entry	: {			//-- 入口文件	
			app		: path.resolve(DEV_PATH, 'dashboard/port.jsx'),
			utils	: [
				'sun-king',
				'classnames',
				'react',
				'react-router',
				'react-dom'
			],
			editor	: [
				path.resolve(DEV_PATH, 'dashboard/component/input/editor/ueditor.config.js'),
				path.resolve(DEV_PATH, 'dashboard/component/input/editor/ueditor.js'),
				path.resolve(DEV_PATH, 'dashboard/component/input/editor/zh-cn.js')
			]
		},
		chunk	: {names:['utils','editor'],filename:'/[name].[hash].js'},
		css : true
	},
	//-- sunjay后台开发
    start_zion : {
		env		: false,
		name	: 'dashboard',
		entry	: path.resolve(DEV_PATH, 'dashboard/port.jsx'),
		tpl			: path.resolve(DEV_PATH, 'asset/template/sunjay.html'),
	},
	
//==============================================================================================
	//-- sunjay官网发布
    build_blog : {
		env		: true,
		name	: 'blog',
		tpl			: path.resolve(DEV_PATH, 'asset/template/sunjay.html'),
		entry	: {			//-- 入口文件	
			app		: path.resolve(DEV_PATH, 'blog/port.jsx'),
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
	//-- sunjay官网开发
    start_blog : {
		env		: false,
		name	: 'blog',
		entry	: path.resolve(DEV_PATH, 'blog/port.jsx'),
		tpl			: path.resolve(DEV_PATH, 'asset/template/sunjay.html'),
	},
	
//==============================================================================================
	//-- romanote官网发布
    build_romanote : {
		env		: true,
		name	: 'romanote',
		tpl			: path.resolve(DEV_PATH, 'asset/template/romanote.html'),
		entry	: path.resolve(DEV_PATH, 'romanote/port.jsx'),
		// css : true
	},
	//-- romanote官网开发
    start_romanote : {
		env		: false,
		name	: 'romanote',
		entry	: path.resolve(DEV_PATH, 'romanote/port.jsx'),
		tpl			: path.resolve(DEV_PATH, 'asset/template/romanote.html'),
	},
	
	
	
	
}


module.exports = conf;