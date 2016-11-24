import React from 'react'
import { Row, Col, Img, Input, Button, Form, Dialog, Tip, Tab, Table, Loading, Textarea, Upimg } from '../component'
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
		}
		let self = this
		GET({
			url : 'article',
			data : dataToken[token],
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
			'renew'		: '恢复'
		}
		const param = {
			'publish'	: 2,
			'cancel'	: 1,
			'delete'	: 0,
			'renew'		: 1
		}
		Dialog(tip[type]+'文章《'+val.title+'》？',{
			ok:{				
				func : ()=>{
					PUT({
						url : 'article',
						data : {
							id : val.id,
							status : param[type]
						},
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
			'操作',
		]
		
		//-- 定义table列表
		let tableContent = []
		let articleList = Store.get('article')
		articleList && articleList.data.map((val,i)=>{
			tableContent.push([
				_.Time(val.createtime,'yyyy/MM/dd hh:mm'),
				val.title || '未定义标题',
				val.status == 1
					? [
						{name :'编辑',func:()=>{this.edit(val)}},
						{name :'删除',func:()=>{this.updateArticle(val,'delete')}},
						{name :'发布',func:()=>{this.updateArticle(val,'publish')}}
					]
					: val.status == 2
						? [
							{name :'取消发布',func:()=>{this.updateArticle(val,'cancel')}},
						]
						: [
							{name :'恢复',func:()=>{this.updateArticle(val,'renew')}},
						]
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
		//-- 获取值
		let issueData = getValue([
			'name',
			'title',
			'cover',
			'qrimg',
			'content',
			'summary',
		])
		//-- 简单的表单验证
		if(!Vaild([
			'title',
			'cover',
			'qrimg',
			'content',
			'summary',
		])){
			callback(false)
			return
		}
		POST({
			url : 'article',
			data : issueData,
			success : (res)=>{
				callback(true)
				Back();
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
		return (
			<div className='sj-home-conbox'>
				<div className='sj-home-title'>
					<h1>新增文章</h1>
					<h2>请谨慎新增，别乱来。</h2>
				</div>
				<div className='sj-home-content'>
					<Form>
						<Input
							label='标记'
							tip='特殊标记名称，英文，请留空'
							length='20'
							type='text'
							name='name'
							ignore
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
							bgimg='http://img.romanote.com/web/upimg_180-100.png'
						/>
						<Upimg
							label='二维码'
							tip='200*200px，1M以内，格式jpg，png，jpeg'
							name='qrimg'
							width='120'
							height='120'
							bgimg='http://img.romanote.com/web/upimg_120-120.png'
						/>
						<Textarea
							label='内容'
							tip='摘要，120字以内。'
							length='120'
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
		//-- 获取值
		let issueData = getValue([
			'name',
			'title',
			'cover',
			'qrimg',
			'content',
			'summary',
		])
		//-- 简单的表单验证
		if(!Vaild([
			'title',
			'cover',
			'qrimg',
			'content',
			'summary',
		])){
			callback(false)
			return
		}
		_.mixin(issueData,{id:this.props.params.cid})
		PUT({
			url : 'article',
			data : issueData,
			success : (res)=>{
				callback(true)
				Back();
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
		let content = this.state.info ? (
				<Form>
					<Input
						label='标记'
						tip='特殊标记名称，英文，请留空'
						length='20'
						type='text'
						name='name'
						value={article.name}
						ignore
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
						bgimg='http://img.romanote.com/web/upimg_180-100.png'
					/>
					<Upimg
						label='二维码'
						tip='200*200px，1M以内，格式jpg，png，jpeg'
						name='qrimg'
						width='120'
						height='120'
						value={article.qrimg}
						bgimg='http://img.romanote.com/web/upimg_120-120.png'
					/>
					<Textarea
						label='内容'
						tip='摘要，120字以内。'
						length='120'
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