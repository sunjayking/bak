import React from 'react'
import { LoginMod } from '../module/loginMod'

//-- 登录页
class LoginPage extends React.Component {
	constructor(props) {
		super(props)
	}
	render(){
		return (
			<LoginMod />
		)
	}
}


export { LoginPage }