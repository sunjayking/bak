import React from 'react'
import { browserHistory } from 'react-router'

//-- 引入对应module
import { NofoundPage } from '../page/nofoundPage'
import { BlogPage } from '../page/blogPage'
import { H5Page } from '../page/h5Page'
import { WebPage } from '../page/webPage'


//-- 路由入口
class AppRoute extends React.Component {
	constructor(props) {
		super(props)
	}
	//-- 渲染前，很少用到
	componentWillMount(){		
		// //-- 如果访问首页，则自动跳转至login
		// this.props.routes.length==1 && browserHistory.replace('/b')
	}
	//-- 初始
	componentDidMount(){}
	//-- 更新
	componentDidUpdate(){}
	//-- 移除
	componentWillUnmount(){}
	render(){
		return this.props.params.mod
			? (
				<div>
					{this.props.children}
				</div>
			)
			: (<HomeRoute {...this.props}/>)
	}
}
//-- 路由分发
class HomeRoute extends React.Component {
	constructor(props) {
		super(props)
	}
	render(){
		const { mod } = this.props.params
		let newMod = mod || 'blog'
		const Mod = {
			blog	: (<BlogPage {...this.props}/>),
			h5		: (<H5Page {...this.props}/>),
			web		: (<WebPage {...this.props}/>),
		}
		return (Mod[newMod] || <NofoundPage />)
	}
}

export { AppRoute, HomeRoute }