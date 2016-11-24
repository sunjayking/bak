import React from 'react'
import { Row, Col, Img, Dialog, Tip } from '../component'
import { Link } from 'react-router'
import { GET } from '../driver/api'
import { Store } from 'sun-king'
import { GO } from '../driver/utils'
import './style/home.less'

//-- 首页模块
class HomeMod extends React.Component {
	constructor(props) {
		super(props)
	}
	render(){
		const { type,content } = this.props
		return (
			<div className='sj-fullscreen'>
				<Row>
					<Col xs={24} sm={6} md={5} lg={5}>
						<HomeLeftMod {...this.props} />
					</Col>
					<Col xs={24} sm={18} md={14} lg={14}>
						{content}
					</Col>
					<Col xs={24} sm={0} md={5} lg={5} >
						<HomeRightMod {...this.props} />
					</Col>
				</Row>
			</div>
		)
	}
}

//-- 首页Left 模块
class HomeLeftMod extends React.Component {
	constructor(props) {
		super(props)
	}
	//-- 退出
	out(){
		Dialog('你将要退出Sunjay后台。',{
			ok : {
				name : 'Logout',
				func : ()=>{
					//-- 退出
					GET({
						url : 'logout',
						success : (res)=>{
							Store.clear()
							GO('/login')
						},
						error : (res)=>{
							Tip('异常错误！退出失败！')
						}
					})
				}
			}
		})
	}
	render(){
		const { slogan, navList, login } = this.props
		let content = navList.map((value,i)=>{
			return (
				<li key={i}>
					{
						!value.outside
						? <Link to={value.url} className={value.active?'active':''}>{value.name}</Link>
						: <a href={value.url} className={value.active?'active':''} target='_blank'>{value.name}</a>
					}
				</li>
			)
		})
		let logout = !login
			? null
			: (
				<a className='sj-home-out' onClick={this.out}>
					<i className='icon-out'></i>
					<b>退出</b>
				</a>
			)
		return (
			<div className='sj-home-left'>
				<span className='sj-home-logo'>
					<Img src='http://img.romanote.com/web/sunjay_logo_word.png' />
				</span>
				<p className='sj-home-tit'>{slogan||'游荡的Freelancer'}</p>
				<ul className='sj-home-nav'>
					{content}
				</ul>
				{logout}
			</div>
		)
	}
}

//-- 首页Right 模块
class HomeRightMod extends React.Component {
	constructor(props) {
		super(props)
	}
	render(){
		const { customer, linkList } = this.props
		let title = customer ? '温馨提示' : '推荐文章'
		let tips = customer ? '亲爱的' + customer + '，<br>感谢你对Sunjay的信任。<br>一些温馨提示：<br>1、为得到最好的使用体验，推荐使用chrome浏览器访问此页。<br>2、为确保信息安全，当需要关闭此页面的时候，建议先点击屏幕左下方的退出图标。<br>3、紧急情况可拨打15625281115。非急勿扰。': ''
		let linkContent = !linkList ? null
			: linkList.map((value,i)=>{
				return (
					<li key={i}>
						<i className='icon-link'></i>
						<a href={value.url} target='_blank'>{value.name}</a>
					</li>
				)
			})
		return (
			<div className='sj-home-right'>
				<div className='sj-home-right-top'>
					<h2>{title}</h2>
					<ul>
						{linkContent}
					</ul>
					<p dangerouslySetInnerHTML={{__html:tips}}></p>
				</div>
				<div className='sj-home-footer'>
					<ol>
						<li>
							<i className='icon-wechat'></i>
							<a>sunjayking</a>
						</li>
						<li>
							<i className='icon-weibo'></i>
							<a href='http://weibo.com/sunjayking' target='_blank'>@sunjayking</a>
						</li>
						<li>
							<i className='icon-email'></i>
							<a>sunjayking007@gmail.com</a>
						</li>
					</ol>
					<div className='sj-home-footer-rights'>
						<a href='http://www.miitbeian.gov.cn/' target='_blank'>粤ICP备14011670号</a>
						<p dangerouslySetInnerHTML={{__html:'copyright &copy; sunjay.cn 版权所有'}}></p>
					</div>
				</div>
			</div>
		)
	}
}



export {
	HomeMod
}