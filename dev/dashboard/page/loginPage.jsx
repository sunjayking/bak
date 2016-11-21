import React from 'react'
import { LoginMod } from '../module/loginMod'
import { DOM } from'sun-king'

//-- 登录页
class LoginPage extends React.Component {
	constructor(props) {
		super(props)
	}
	//-- 初始
	componentDidMount(){}
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