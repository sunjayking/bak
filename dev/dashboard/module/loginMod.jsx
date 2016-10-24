import React from 'react'
import { Row, Col, Img, Input, Button, Form } from '../component'
import './style/login.less'

//-- 登录模块
class LoginMod extends React.Component {
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
			<div className='sj-login'>
				<span className='sj-logo-index'>
					<Img src='http://img.romanote.com/web/sunjay_logo.png' />
				</span>
				<div className='sj-login-box'>
					<Form>
						<Input label='Key:' tip='Enter sunjay`s key' length='24' type='password' name='key' warn='key验证失败！'/>
						<Button name='Entry' />
					</Form>
				</div>
			</div>
		)
	}
}


export { LoginMod }