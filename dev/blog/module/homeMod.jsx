import React from 'react'
import { Row, Col, Img, Dialog, Tip, Loading } from '../component'
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
	render(){
		const { slogan, navList, login } = this.props
		let pathname = this.props.location.pathname
		let content = navList.map((value,i)=>{
			return (
				<li key={i}>
					{
						!value.outside
						? value.url == pathname
							? <a className={value.active?'active':''}>{value.name}</a>
							: <Link to={value.url} className={value.active?'active':''}>{value.name}</Link>
						: <a href={value.url} className={value.active?'active':''} target='_blank'>{value.name}</a>
					}
				</li>
			)
		})
		return (
			<div className='sj-home-left'>
				<span className='sj-home-logo'>
					<Img src='http://asset.sunjay.cn/img/web/sunjay_logo_word.png' />
				</span>
				<p className='sj-home-tit'>{slogan||'游荡的Freelancer'}</p>
				<ul className='sj-home-nav'>
					{content}
				</ul>
			</div>
		)
	}
}

//-- 首页Right 模块
class HomeRightMod extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			recommend : false
		}
	}
	//-- 初始
	componentDidMount(){
		let self = this
		//-- 获取推荐文章
		GET({
			url : 'article',
			data : {
				status : 2,
				recommend : 1,
				pagenum: 5
			},
			success : (res)=>{
				Store.set('recommend',res)
				self.setState({recommend:true})
			},
			error : (res)=>{
				Store.remove('recommend')
				self.setState({recommend:true})
			}
		})
	}
	
	render(){
		const { customer } = this.props
		let recommend = Store.get('recommend')
		let data = recommend ? recommend.data : false
		let title = '推荐文章'
		//-- 文章List
		let linkList = []
		data && data.map((val,i)=>{
			linkList.push({
				url : '/blog/article/'+val.id,
				name : val.title,
			})
		})
		let linkContent = !this.state.recommend
			? (<Loading con='获取推荐文章...' />)
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
				</div>
				<div className='sj-home-footer'>
					<ol>
						<span className='sj-footer-showqr'>
							<Img src='http://asset.sunjay.cn/img/web/sunjayking_wechat.jpg' />
						</span>
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