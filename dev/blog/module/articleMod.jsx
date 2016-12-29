import React from 'react'
import { Dialog, Img, Tip, Loading } from '../component'
import { Link } from 'react-router'
import { GET } from '../driver/api'
import { Store, _ } from 'sun-king'
import { GO } from '../driver/utils'
import './style/home.less'


//-- 文章列表 模块
class ArticlelistMod extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			list : false
		}
	}
	//-- 初始
	componentDidMount(){
		let self = this
		let type = this.props.params.mod || 'blog'
		GET({
			url : 'article',
			data : {
				status : 2,
				type:type
			},
			success : (res)=>{
				Store.set('showArticleList',res)
				self.setState({list:true})
			},
			error : (res)=>{
				Store.remove('showArticleList')
				self.setState({list:true})
			}
		})
	}
	//-- 更新
	componentDidUpdate(){}
	//-- 移除
	componentWillUnmount(){}
	render(){
		let artlist = []
		let article = Store.get('showArticleList')
		let data = article ? article.data : false
		data && data.map((val)=>{
			artlist.push({
				title : val.title,
				time : _.Time(val.createtime,'yyyy年MM月dd日 hh:mm'),
				url : '/'+(this.props.params.mod || 'blog') +'/article/'+val.id,
				cover : /\:\/\//.test(val.cover) ? val.cover : '/uploads/'+val.cover,
				summary : val.summary
			})
		})
		let content = artlist.map((value,i)=>{
			return (
				<li key={i}>
					<div className='sj-home-artlist-title'>
						<a href={value.url} target='_blank'>{value.title}</a>
						<h2>{value.time}</h2>
					</div>
					<div className='sj-home-artlist-content'>
						<a href={value.url} target='_blank'>
							<Img src={value.cover} />
							<div className='sj-home-artlist-cover'>
								<p>{value.summary}</p>
								{/*
								<div className='sj-home-artlist-qrbox'>
									<Img src={value.qrimg} />
									<b>微信扫码阅读</b>
								</div>
								*/}
							</div>
						</a>
					</div>
				</li>
			)
		})
		return data
			? (
				<ul className='sj-home-artlist'>
					{content}
				</ul>
			)
			: (<Loading con='获取文章列表...'/>)
	}
}

//-- 文章详情 模块
class ArticledetMod extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			info : 0
		}
	}
	//-- 初始
	componentDidMount(){
		console.log('article')
		let id = this.props.params.id
		!id && Dialog('无效的地址，别乱来哦！回到首页去看看吧！',{
			func : ()=>{
				GO('/blog')
			}
		})
		this.getArticle()
	}
	//-- 更新
	componentDidUpdate(){
		Store.get('showArtDet') != this.props.params.id && this.getArticle()
	}
	//-- 移除
	componentWillUnmount(){}
	//-- 获取文章详情
	getArticle(){
		console.log('getarticle')
		let id = this.props.params.id
		let self = this
		let params = _.isNumber(id)
			? {
				id : id,
				status : 2,
				view : 'view'
			}
			: {
				name : id,
				status : 2,
				view : 'view'
			}
		GET({
			url : 'article',
			data : params,
			success : (res)=>{
				Store.set('showArticle' + self.props.params.id, res.data[0])
				Store.set('showArtDet',self.props.params.id)
				self.setState({info:self.state.info+1})
			},
			error : (res)=>{
				Dialog('无效的地址，别乱来哦！回到首页去看看吧！',{
					func : ()=>{
						GO('/blog')
					}
				})
			}
		})
	}
	render(){
		let articleDet = Store.get('showArticle'+this.props.params.id)
		let article = articleDet
			? {
				title : articleDet.title,
				time : _.Time(articleDet.updatetime,'yyyy年MM月dd日 hh:mm'),
				content : articleDet.content
			}
			: {
				title : '',
				time : '',
				content : ''
			}
		return articleDet
			? (
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
			: (<Loading con='获取文章详情...'/>)
	}
}

export {
	ArticlelistMod,
	ArticledetMod,
}