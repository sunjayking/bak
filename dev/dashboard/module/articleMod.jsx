import React from 'react'
import { Row, Col, Img, Input, Button, Form, Dialog, Tip, Tab, Table, Loading, Textarea, Upimg } from '../component'
import { Link } from 'react-router'
import { GET, DELETE, PUT } from '../driver/api'
import { Store, _, DOM } from 'sun-king'
import { GO, Back } from '../driver/utils'
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
			'vaild' : {},
			'invaild' : {
				status : 0
			}
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
	//-- 删除
	deleteArticle(val){
		let self = this
		Dialog('删除文章《'+val.title+'》？',{
			ok:{				
				func : ()=>{
					DELETE({
						url : 'article',
						data : {
							id : val.id
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
	//-- 恢复
	renewArticle(val){
		let self = this
		Dialog('恢复文章《'+val.title+'》？',{
			ok:{				
				func : ()=>{
					PUT({
						url : 'article',
						data : {
							id : val.id,
							status : 1
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
	render(){
		//-- 定义tab列表
		let tabList = [
			{name:'Vail',token:'vaild'},
			{name:'Invaild',token:'invaild'},
		]
		//-- 定义tab事件
		let tabFunc = (token)=>{
			this.getArticleList(token)
		}
		//-- 定义tab特殊事件
		let tabRight = {
			name : '+Add',
			func : function(){
				GO('/dashboard/sunjay/articleadd')
			}
		}
		
		//-- 定义table表头
		let tableHead = [
			'Date',
			'Title',
			'Oparate',
		]
		
		//-- 定义table列表
		let tableContent = []
		let articleList = Store.get('article')
		articleList && articleList.data.map((val,i)=>{
			tableContent.push([
				_.Time(val.createtime,'yyyy/MM/dd hh:mm'),
				val.title || '未定义标题',
				[
					{name :'Edit',func:function(){alert('edit')}},
					val.status == 1
						? {name :'Delete',func:()=>{this.deleteArticle(val)}}
						: {name :'Renew',func:()=>{this.renewArticle(val)}},
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
		console.log('add')
		console.log(callback)
		setTimeout(()=>{
			// callback(false)
			callback(true)
		},2000)
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
							tip='500*300px，1M以内，格式jpg，png，jpeg'
							name='cover'
							width='250'
							height='150'
						/>
						<Upimg
							label='二维码'
							tip='200*200px，1M以内，格式jpg，png，jpeg'
							name='qrimg'
							width='200'
							height='200'
						/>
						<Textarea
							label='内容'
							tip='摘要，120字以内。'
							length='120'
							name='summary'
						/>
						<Textarea
							label='摘要'
							tip='摘要，120字以内。'
							length='120'
							name='summary'
						/>
						<div className='sj-form-btnbox'>
							<Button
								name='Add'
								activeName='Adding'
								doneName='Added'
								onClick={(callback)=>{this.add(callback)}}
								type='primary'
							/>
							<Button
								name='Cancel'
								onClick={this.cancel}
							/>
						</div>
					</Form>
				</div>
			</div>
		)
	}
}

export {
	ArticlelistMod,
	ArticleaddMod,
}