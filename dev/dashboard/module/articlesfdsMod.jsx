import React from 'react'
import { Row, Col, Img, Input, Button, Form, Dialog, Tip } from '../component'
import { Link } from 'react-router'
import { GET } from '../driver/api'
import { Store } from 'sun-king'
import { GO } from '../driver/utils'
import './style/home.less'


//-- 文章列表 模块
class ArtListMod extends React.Component {
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

//-- 文章详情 模块
class ArtDetMod extends React.Component {
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

export {
	ArtListMod,
	ArtDetMod
}