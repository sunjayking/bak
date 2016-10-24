const api = {
	session			: '/api/session',			//-- 获取session
	albumdet		: '/api/album/det',			//-- 获取专辑详情
}

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
					res = JSON.parse(res)
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
		option.data			= JSON.stringify(option.data)
		let newapi = option.api
		if(option.type === 'GET'){
			var data = option.data || ''
			newapi = option.data ? option.api + '&' + option.data : option.api
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
const GET = (option)=>{
	const { url, data, success, error } = option
	AJAX({
		type : 'GET',
		api : api[url],
		data : data,
		success : success,
		error : error
	})
}

export { GET }