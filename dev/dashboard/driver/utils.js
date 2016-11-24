import { browserHistory } from 'react-router'
import { Tip } from '../component'
import { DOM } from 'sun-king'

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

//-- 获取表单值
const getValue = (issueInput=[])=>{
	let result = {}
	issueInput.map((val,i)=>{
		let input = DOM.getName(val)
		let value
		if(input.type == 'file'){
			if(input.files[0]){
				value = input.files[0].filename
			}else{
				if(input.getAttribute('data-filename')){
					value = input.getAttribute('data-filename')
				}else{
					value = ''
				}
			}
		}else{
			value = input.value
		}
		result[val] = value
	})
	return result
}

//-- 简单的表单验证
const Vaild = (list=[])=>{
	for(let i = 0, len = list.length;i<len;i++){
		let val = list[i]
		let input = DOM.getName(val)
		let value
		if(input.type == 'file'){
			if(input.files[0]){
				value = input.files[0]
			}else{
				if(input.getAttribute('data-filename')){
					value = input.getAttribute('data-filename')
				}else{
					value = ''
				}
			}
		}else{
			value = input.value
		}
		if(!value){
			Tip(val + '不能为空！')
			DOM.focus(val)
			return false
		}
	}
	return true
}

export {
	GO,
	Back,
	getValue,
	Vaild
}