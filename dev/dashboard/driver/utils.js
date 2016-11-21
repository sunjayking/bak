import { browserHistory } from 'react-router'

//-- 跳转
const GO = (data,type) => {
	if(type){
		browserHistory.replace(data)
	}else{		
		browserHistory.push(data)
	}
}

//-- 返回上一页
const Back = () => {
	browserHistory.goBack()
}


export {
	GO,
	Back
}