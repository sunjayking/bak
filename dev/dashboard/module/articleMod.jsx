import React from 'react'
import { Row, Col, Img, Input, Button, Form, Dialog, Tip, Select, Tab, Table, Loading, Textarea, Upimg, Editor } from '../component'
import { Link } from 'react-router'
import { GET, DELETE, PUT, POST } from '../driver/api'
import { Store, _, DOM } from 'sun-king'
import { GO, Back, getValue, Vaild } from '../driver/utils'
import './style/form.less'


//-- 文章管理 模块
class ArticlelistMod extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			list : false,
			tab : ''
		}
	}
	//-- 初始
	componentDidMount(){
		//-- 获取article列表（vaild）
		this.getArticleList('vaild')
	}
	//-- 更新
	componentDidUpdate(){}
	//-- 移除
	componentWillUnmount(){}
	//-- 获取article列表
	getArticleList(token){
		this.setState({list:false,tab:token})
		let dataToken = {
			'vaild' : {
				status : 2
			},
			'invaild' : {
				status : 1
			},
			'delete' : {
				status : 0
			},
			'recommend' : {
				status : 2,
				recommend : 1
			},
		}
		let self = this
		let type = this.props.params.id || 'blog'
		GET({
			url : 'article',
			data : _.mixin(dataToken[token],{type:type}),
			success : (res)=>{
				Store.set('article',res)
				self.setState({list:true})
			},
			error : (res)=>{
				Store.remove('article')
				self.setState({list:true})
			}
		})
	}
	//-- 操作
	updateArticle(val,type){
		let self = this
		const tip = {
			'publish'	: '发布',
			'cancel'	: '取消发布',
			'delete'	: '删除',
			'recommend'	: '推荐',
			'renew'		: '恢复',
			'cancelRecommend'	: '取消推荐'
		}
		let dataType = {
			publish : {
				status : 2
			},
			cancel : {
				status : 1
			},
			'delete' : {
				status : 0
			},
			renew : {
				status : 1
			},
			recommend : {
				status : 2,
				recommend : 1
			},
			cancelRecommend : {
				status : 2,
				recommend : 0
			},
		}
		let data = _.mixin(dataType[type],{id:val.id})
		Dialog(tip[type]+'文章《'+val.title+'》？',{
			ok:{				
				func : ()=>{
					PUT({
						url : 'article',
						data : data,
						success : (res)=>{
							self.getArticleList(self.state.tab || 'vaild')				
						},
						error : (res)=>{
							Tip(res.errdata)
						}
					})
				}
			}
		})
	}
	//-- 编辑
	edit(val){
		GO('/dashboard/sunjay/articleedit/'+val.id)
	}
	render(){
		//-- 定义tab列表
		let tabList = [
			{name:'已发布',token:'vaild'},
			{name:'未发布',token:'invaild'},
			{name:'推荐',token:'recommend'},
			{name:'回收站',token:'delete'},
		]
		//-- 定义tab事件
		let tabFunc = (token)=>{
			this.getArticleList(token)
		}
		//-- 定义tab特殊事件
		let tabRight = {
			name : '+写文章',
			func : function(){
				GO('/dashboard/sunjay/articleadd')
			}
		}
		
		//-- 定义table表头
		let tableHead = [
			'日期',
			'标题',
			'阅读量',
			'操作',
		]
		//-- 定义table列表
		let tableContent = []
		let articleList = Store.get('article')
		let token = this.state.tab
		let handle = (val)=>{
			switch(token){
				case 'vaild' :
					return [
						{name :'取消发布',func:()=>{this.updateArticle(val,'cancel')}},
						{name :'编辑',func:()=>{this.edit(val)}},
						val.recommend == 1
							? {name :'已推荐'}
							: {name :'推荐',func:()=>{this.updateArticle(val,'recommend')}}
					]
					break
				case 'invaild' :
					return [
						{name :'编辑',func:()=>{this.edit(val)}},
						{name :'删除',func:()=>{this.updateArticle(val,'delete')}},
						{name :'发布',func:()=>{this.updateArticle(val,'publish')}}
					]
					break
				case 'recommend' :
					return [
						{name :'取消推荐',func:()=>{this.updateArticle(val,'cancelRecommend')}}
					]
					break
				case 'delete' :
					return [
						{name :'恢复',func:()=>{this.updateArticle(val,'renew')}}
					]
					break
			}
		}
		articleList && articleList.data.map((val,i)=>{
			tableContent.push([
				_.Time(val.updatetime,'yy/MM/dd'),
				{name:val.title || '未定义标题',url:'http://sunjay.cn/blog/article/'+val.id},
				val.views,
				handle(val)
			])
		})
		let content = this.state.list ? <Table headList={tableHead} conList={tableContent} /> : <Loading con='正在加载文章列表...' />
		return (
			<div className='sj-home-conbox'>
				<div className='sj-home-title'>
					<h1>文章管理</h1>
					<h2>管理sunjay.cn上的文章</h2>
				</div>
				<div className='sj-home-content'>
					<Tab list={tabList} func={tabFunc} right={tabRight}/>
					{content}
				</div>
			</div>
		)
	}
}

//-- 新增文章管理 模块
class ArticleaddMod extends React.Component {
	constructor(props) {
		super(props)
	}
	//-- 初始
	componentDidMount(){
		DOM.focus('title')
	}
	//-- 更新
	componentDidUpdate(){}
	//-- 移除
	componentWillUnmount(){}
	//-- 新增文章
	add(callback){
		let content = editor.getContent()
		//-- 获取值
		let issueData = getValue([
			'title',
			'cover',
			'summary',
			'type',
		])
		//-- 简单的表单验证
		if(!Vaild([
			'title',
			'cover',
			'summary',
		])){
			callback(false)
			return
		}
		if(!content){
			Tip('请填写内容！')
			callback(false)
			return
		}
		_.mixin(issueData,{content:content})
		POST({
			url : 'article',
			data : issueData,
			success : (res)=>{
				callback(true)
				GO('/dashboard/sunjay');
			},
			error : (res)=>{
				Tip(res.errdata)
				callback(false)
			}
		})
	}
	//-- 取消
	cancel(){
		Back()
	}
	render(){
		let options = [
			{name : 'blog', value : 'blog'},
			{name : 'h5定制', value : 'h5'},
			{name : 'web定制', value : 'web'},
		]
		return (
			<div className='sj-home-conbox'>
				<div className='sj-home-title'>
					<h1>新增文章</h1>
					<h2>请谨慎新增，别乱来。</h2>
				</div>
				<div className='sj-home-content'>
					<Form>
						{/*
						<Input
							label='标记'
							tip='特殊标记名称，英文，请留空'
							length='20'
							type='text'
							name='name'
							ignore
						/>
						*/}
						<Select
							label='类型'
							name='type'
							options={options}
							def='blog'
						/>
						<Input
							label='标题'
							tip='标题，26字以内'
							length='26'
							type='text'
							name='title'
							size='large'
						/>
						<Upimg
							label='封面'
							tip='900*500px，1M以内，格式jpg，png，jpeg'
							name='cover'
							width='180'
							height='100'
							value={''}
							bgimg='http://asset.sunjay.cn/img/web/upimg_180-100.png'
						/>
						{/*
						<Upimg
							label='二维码'
							tip='200*200px，1M以内，格式jpg，png，jpeg'
							name='qrimg'
							width='120'
							height='120'
							bgimg='http://asset.sunjay.cn/img/web/upimg_120-120.png'
						/>
						*/}
						<Editor
							label='内容'
							name='content'
						/>
						<Textarea
							label='摘要'
							tip='摘要，120字以内。'
							length='120'
							name='summary'
						/>
						<div className='sj-form-btnbox'>
							<Button
								name='保存'
								activeName='保存中'
								doneName='已保存'
								onClick={(callback)=>{this.add(callback)}}
								type='primary'
							/>
							<Button
								name='取消'
								onClick={this.cancel}
							/>
						</div>
					</Form>
				</div>
			</div>
		)
	}
}

//-- 编辑文章管理 模块
class ArticleeditMod extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			info : false
		}
	}
	//-- 初始
	componentDidMount(){
		let self = this
		let cid = this.props.params.cid
		GET({
			url : 'article',
			data : {
				id : cid
			},
			success : (res)=>{
				Store.set('article'+cid,res)
				self.setState({info:true})
			},
			error : (res)=>{
				Store.remove('article'+cid)
				Dialog('额~~~感觉这个链接不对，还是返回上一页吧！',{
					name : '返回',
					func : ()=>{
						Back()
					}
				})
			}
		})
	}
	//-- 更新
	componentDidUpdate(){}
	//-- 移除
	componentWillUnmount(){}
	//-- 新增文章
	update(callback){
		let content = editor.getContent()
		//-- 获取值
		let issueData = getValue([
			'type',
			'title',
			'cover',
			'summary',
		])
		//-- 简单的表单验证
		if(!Vaild([
			'title',
			'cover',
			'summary',
		])){
			callback(false)
			return
		}
		if(!content){
			Tip('请填写内容！')
			callback(false)
			return
		}
		_.mixin(issueData,{content:content,id:this.props.params.cid})
		PUT({
			url : 'article',
			data : issueData,
			success : (res)=>{
				callback(true)
				GO('/dashboard/sunjay');
			},
			error : (res)=>{
				Tip(res.errdata)
				callback(false)
			}
		})
	}
	//-- 取消
	cancel(){
		Back()
	}
	render(){
		const { cid } = this.props.params
		const data = Store.get('article'+cid)
		let article = data ? data.data[0] : ''
		let options = [
			{name : 'blog', value : 'blog'},
			{name : 'h5定制', value : 'h5'},
			{name : 'web定制', value : 'web'},
		]
		let content = this.state.info ? (
				<Form>
					{/*
					<Input
						label='标记'
						tip='特殊标记名称，英文，请留空'
						length='20'
						type='text'
						name='name'
						value={article.name}
						ignore
					/>
					*/}
					<Select
						label='类型'
						name='type'
						options={options}
						def={article.type}
					/>
					<Input
						label='标题'
						tip='标题，26字以内'
						length='26'
						type='text'
						name='title'
						size='large'
						value={article.title}
					/>
					<Upimg
						label='封面'
						tip='900*500px，1M以内，格式jpg，png，jpeg'
						name='cover'
						width='180'
						height='100'
						value={article.cover}
						bgimg='http://asset.sunjay.cn/img/web/upimg_180-100.png'
					/>
					{/*
					<Upimg
						label='二维码'
						tip='200*200px，1M以内，格式jpg，png，jpeg'
						name='qrimg'
						width='120'
						height='120'
						value={article.qrimg}
						bgimg='http://asset.sunjay.cn/img/web/upimg_120-120.png'
					/>
					*/}
					<Editor
						label='内容'
						name='content'
						value={article.content}
					/>
					<Textarea
						label='摘要'
						tip='摘要，120字以内。'
						length='120'
						name='summary'
						value={article.summary}
					/>
					<div className='sj-form-btnbox'>
						<Button
							name='保存'
							activeName='保存中'
							doneName='已保存'
							onClick={(callback)=>{this.update(callback)}}
							type='primary'
						/>
						<Button
							name='取消'
							onClick={this.cancel}
						/>
					</div>
				</Form>
			)
			: (<Loading con='获取文章信息...' />)
		return (
			<div className='sj-home-conbox'>
				<div className='sj-home-title'>
					<h1>编辑文章</h1>
					<h2>请谨慎编辑，别乱来。</h2>
				</div>
				<div className='sj-home-content'>
					{content}
				</div>
			</div>
		)
	}
}

export {
	ArticlelistMod,
	ArticleaddMod,
	ArticleeditMod,
}