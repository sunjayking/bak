const api = {
	session		: '/api/session',		//-- session
	login		: '/api/login',			//-- 登录
	logout		: '/api/logout',		//-- 退出
	admin		: '/api/admin',			//-- 管理员
	article		: '/api/article',		//-- 文章
	image		: '/api/image',			//-- 图片
	seo			: '/api/seo',			//-- SEO
}

import {_} from 'sun-king'
//-- ajax请求，不公开
const Ajax = () => {
	var ajax = {
		//-- 获取XML
		XML(){
			let XMLHttpReq
			try{
				XMLHttpReq = new ActiveXObject("Msxml2.XMLHTTP");
			}catch(e){
				try{
					XMLHttpReq = new ActiveXObject("Microsoft.XMLHTTP");
				}catch(e){
					XMLHttpReq = new XMLHttpRequest();
				}
			}
			return XMLHttpReq
		},
		//-- ajax请求过程
		process(XML,option){
			if(XML.readyState == 4){
				var res = XML.responseText				
				try{
					res = res ? JSON.parse(res) : ''
				}catch(e){
					__DEBUG__ && console.warn('返回数据不为JSON')
					option.error('')
					return
				}
				switch(XML.status){
					case 200 :
						option.success(res)
						break
					case 404 :
						option.error(res)
						break
					case 500 :
						option.error(res)
						break
				}
			}
		},
	}
	
	return function(option){
		var xml = ajax.XML()
		option.async		= !option.async			|| true
		option.contentType	= option.contentType	|| 'application/json'
		option.error		= option.error			|| function(){}
		option.success		= option.success		|| function(){}
		option.type			= option.type			|| 'POST'
		option.data			= option.data			|| {}
		let newapi = option.api
		
		if(option.type === 'GET'){
			let dataArr = []
			_.eachProp(option.data,function(value,name){
				dataArr.push(name+'='+value)
			})
			newapi = option.api + '/' + dataArr.join('&')
		}else{
			if(option.contentType != 'multipart/form-data'){
				option.data = JSON.stringify(option.data)
			}
		}
		
		xml.open(option.type,newapi,option.async);
		xml.setRequestHeader("Content-Type",option.contentType);
		xml.onreadystatechange = function(){
			ajax.process(xml,option)
		}
		xml.send(option.data)
	}
}
//-- AJAX实例
const AJAX = Ajax()

const ajaxing = (type,option)=>{
	const { url, data, success, error, contentType } = option
	AJAX({
		type : type,
		api : api[url],
		data : data,
		success : success,
		error : error,
		contentType : contentType
	})
}

//-- GET
const GET = (option)=>{
	ajaxing('GET',option)
}

//-- DELETE
const DELETE = (option)=>{
	ajaxing('DELETE',option)
}

//-- PUT
const PUT = (option)=>{
	ajaxing('PUT',option)
}
//-- POST
const POST = (option)=>{
	ajaxing('POST',option)
}

export { GET, DELETE, PUT, POST }