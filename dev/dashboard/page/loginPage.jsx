import React from 'react'
import { LoginMod } from '../module/loginMod'
import { DOM } from'sun-king'

//-- 登录页
class LoginPage extends React.Component {
	constructor(props) {
		super(props)
	}
	//-- 初始
	componentDidMount(){
		//-- 登录页的灰色背景
		DOM.setAttr(DOM.getTag('body'),'style','background:#f5f5f5')
		//-- 自动focus到输入框
		DOM.focus('key')
	}
	//-- 更新
	componentDidUpdate(){}
	//-- 移除
	componentWillUnmount(){}
	render(){
		return (
			<LoginMod />
		)
	}
}


export { LoginPage }