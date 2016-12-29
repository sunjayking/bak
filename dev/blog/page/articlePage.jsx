import React from 'react'
import { HomeMod } from '../module/homeMod'
import { ArticlelistMod, ArticledetMod } from '../module/articleMod'
import { browserHistory } from 'react-router'
import { DOM } from 'sun-king'

//-- 控制台
class ArticlePage extends React.Component {
	constructor(props) {
		super(props)
	}
	//-- 渲染前，很少用到
	componentWillMount(){}
	//-- 初始
	componentDidMount(){}
	//-- 更新
	componentDidUpdate(){}
	//-- 移除
	componentWillUnmount(){}
	render(){
		const { mod, mid, id, cid} = this.props.params
		//-- 定义左边导航
		let navList = [
			{ url:'/blog', name:'古道书社', active:mod=='blog'||!mod},
			{ url:'/h5', name:'H5定制', active:mod=='h5'},
			{ url:'/web', name:'WEB定制', active:mod=='web'},
			// { url:'http://romanote.com', name:'罗曼笔记',outside:true},
		]
		let child = mid || 'list'
		const childMod = {
			list		: (<ArticlelistMod {...this.props}/>),
			article		: (<ArticledetMod {...this.props}/>)
		}
		//-- 定义内容
		this.content = childMod[child] || null
		return (
			<HomeMod
				navList={navList}
				{...this.props}
				content={this.content}
			/>
		)
	}
}

export { ArticlePage }