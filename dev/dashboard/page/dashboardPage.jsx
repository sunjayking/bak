import React from 'react'
import { HomeMod } from '../module/homeMod'
import { ArticlelistMod, ArticleaddMod } from '../module/articleMod'
import { Store } from 'sun-king'
import { GET } from '../driver/api'
import { GO } from '../driver/utils'

//-- 控制台
class DashboardPage extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			status : 'init'
		}
	}
	//-- 初始
	componentDidMount(){
		let self = this
		//-- 获取session
		GET({
			url : 'session',
			success : (res)=>{
				self.props.params.mid != res.admin.info.name && GO('/dashboard/' + res.admin.info.name)
			},
			error : (res)=>{
				GO('/login')
			}
		})
	}
	//-- 更新
	componentDidUpdate(){}
	//-- 移除
	componentWillUnmount(){}
	render(){
		const admin = Store.get('admin')
		const { id } = this.props.params
		
		let child = id || 'article'
		const childMod = {
			article		: (<ArticlelistMod {...this.props}/>),
			articleadd	: (<ArticleaddMod {...this.props}/>),
		}
		
		//-- 定义内容
		let content = childMod[child] || null
		//-- 定义左边导航
		let navList = [
			{url:'/dashboard/sunjay/article',name:'文章管理',outside:false,active:true}
		]
		//-- 定义右边客户名称
		let customer = 'sunjay'
		return (
			<HomeMod
				navList={navList}
				customer={customer}
				content={content}
				login
			/>
		)
	}
}


export { DashboardPage }