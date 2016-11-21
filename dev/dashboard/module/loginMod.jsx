import React from 'react'
import { DOM, Store } from 'sun-king'
import { GET } from '../driver/api'
import { GO } from '../driver/utils'
import { Img, Input, Button, Form, Tip } from '../component'
import './style/login.less'

//-- 登录模块
class LoginMod extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			status : 'init'
		}
	}
	//-- 初始
	componentDidMount(){
		//-- 获取session
		GET({
			url : 'session',
			success : (res)=>{
				this.info = res.admin.info
				this.setState({status:'logined'})
				setTimeout(()=>{
					GO('/dashboard/'+res.admin.info.ename)
				},2000)
			},
			error : (res)=>{
				this.setState({status:'unlogin'})
			}
		})
	}
	//-- 更新
	componentDidUpdate(){
		this.state.status == 'unlogin' && DOM.focus('key')
	}
	//-- 移除
	componentWillUnmount(){}
	login(callback){
		let valKey = DOM.getValue('key')
		let GetData = {
			_key : valKey
		}
		GET({
			url : 'login',
			data : GetData,
			success : (res)=>{
				callback()
				Store.set('admin',res)
				GO('/dashboard/'+res.info.ename)
			},
			error : (res)=>{
				Tip(res.errdata||'未知错误')
				callback()
			}
		})
	}
	render(){
		let content
		switch(this.state.status){
			case 'init' :
				content = (<p className='sj-login-box-tip animated infinite flash'>正在检测登录...</p>)
				break
			case 'logined':
				content = (<p className='sj-login-box-tip animated pulse'>{'Dear ' + this.info.name + '，welcome back!'}</p>)
				break
			case 'unlogin':
				content = (
					<Form>
						<Input
							label='Key'
							tip='Enter sunjay`s key'
							length='24'
							type='password'
							name='key'
						/>
						<Button
							name='Entry'
							activeName='checking...'
							onClick={(callback)=>{this.login(callback)}}
							type='primary'
						/>
					</Form>
				)
				break
		}
		return (
			<div className='sj-login'>
				<span className='sj-logo-index'>
					<Img src='http://img.romanote.com/web/sunjay_logo.png' />
				</span>
				<div className='sj-login-box'>
					{content}
				</div>
			</div>
		)
	}
}


export { LoginMod }