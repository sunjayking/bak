import React from 'react'
import { Row, Col, Img, Input, Button, Form } from '../component'
import { Link } from 'react-router'
import './style/home.less'

//-- 首页模块
class HomeMod extends React.Component {
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
		const { type } = this.props
		const typeBox = {
			list : (<HomeArtListMod {...this.props} />),
			detail : (<HomeArtDetMod {...this.props} />)
		}
		let content = typeBox[type]
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
	//-- 初始
	componentDidMount(){}
	//-- 更新
	componentDidUpdate(){}
	//-- 移除
	componentWillUnmount(){}
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
				<a className='sj-home-out'>
					<i className='icon-out'></i>
					<b>退出</b>
				</a>
			)
		return (
			<div className='sj-home-left'>
				<span className='sj-home-logo'>
					<Img src='http://img.romanote.com/web/sunjay_logo_word.png' />
				</span>
				<p className='sj-home-tit'>{slogan}</p>
				<ul className='sj-home-nav'>
					{content}
				</ul>
				{logout}
			</div>
		)
	}
}

//-- 首页文章列表 模块
class HomeArtListMod extends React.Component {
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
		const { artlist } = this.props
		let content = artlist.map((value,i)=>{
			return (
				<li key={i}>
					<div className='sj-home-artlist-title'>
						<h1>{value.title}</h1>
						<h2>{value.time}</h2>
					</div>
					<div className='sj-home-artlist-content'>
						<a href={value.url} target='_blank'>
							<Img src={value.cover} />
							<div className='sj-home-artlist-cover'>
								<p>{value.summary}</p>
								<div className='sj-home-artlist-qrbox'>
									<Img src={value.qrimg} />
									<b>微信扫码阅读</b>
								</div>
							</div>
						</a>
					</div>
				</li>
			)
		})
		return (
			<ul className='sj-home-artlist'>
				{content}
			</ul>
		)
	}
}

//-- 首页文章详情 模块
class HomeArtDetMod extends React.Component {
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
		const { article } = this.props
		return (
			<div className='sj-home-conbox'>
				<div className='sj-home-title'>
					<h1>{article.title}</h1>
					<h2>{article.time}</h2>
				</div>
				<div className='sj-home-content'>
					<div dangerouslySetInnerHTML={{__html:article.content}}></div>
				</div>
			</div>
		)
	}
}

//-- 首页Right 模块
class HomeRightMod extends React.Component {
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
		const { customer, linkList } = this.props
		let title = customer ? '温馨提示' : '推荐文章'
		let tips = customer ? '亲爱的' + customer + '，<br>感谢你对Sunjay的信任。<br>一些温馨提示：<br>1、为确保信息安全，当需要关闭此页面的时候，建议先点击屏幕左下方的退出图标。<br>2、所有数据为真实统计数，不提供任何形式的数据更改服务。<br>3、当你能看到这里的时候，说明项目已经交付了。不再提供任何形式的修改。<br>4、紧急情况可拨打15625281115。非急勿扰。': ''
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