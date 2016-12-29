import React from 'react'
import { HomeMod } from '../module/homeMod'
import { ArticleaddMod, ArticleeditMod } from '../module/articleMod'
import { BlogMod } from '../module/blogMod'
import { H5Mod } from '../module/h5Mod'
import { WebMod } from '../module/webMod'
import { SeoMod } from '../module/seoMod'
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
				let name = res.admin.info.name
				self.props.params.mid != name && GO('/dashboard/' + name)
			},
			error : (res)=>{
				GO('/login')
			}
		})
	}
	render(){
		const admin = Store.get('admin')
		const { id } = this.props.params
		
		let child = id || 'blog'
		const childMod = {
			blog		: (<BlogMod {...this.props}/>),
			h5		: (<H5Mod {...this.props}/>),
			web		: (<WebMod {...this.props}/>),
			seo		: (<SeoMod {...this.props}/>),
			articleadd	: (<ArticleaddMod {...this.props}/>),
			articleedit	: (<ArticleeditMod {...this.props}/>),
		}
		
		//-- 定义内容
		let content = childMod[child] || null
		//-- 定义左边导航
		let navList = [
			{url:'/dashboard/sunjay/blog',name:'古道书社',outside:false,active:id=='blog'||!id},
			{url:'/dashboard/sunjay/h5',name:'H5定制',outside:false,active:id=='h5'},
			{url:'/dashboard/sunjay/web',name:'WEB定制',outside:false,active:id=='web'},
		]
		//-- 定义右边客户名称
		let customer = 'sunjay'
		return (
			<HomeMod
				navList={navList}
				customer={customer}
				content={content}
				login
				{...this.props}
			/>
		)
	}
}


export { DashboardPage }