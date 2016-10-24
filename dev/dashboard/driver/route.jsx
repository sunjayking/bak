import React from 'react'
import { browserHistory } from 'react-router'

//-- 引入对应module
import { NofoundPage } from '../page/nofoundPage'
import { BlogPage } from '../page/blogPage'
import { LoginPage } from '../page/loginPage'
import { DashboardPage } from '../page/dashboardPage'


//-- 路由入口
class AppRoute extends React.Component {
	constructor(props) {
		super(props)
	}
	//-- 渲染前，很少用到
	componentWillMount(){		
		//-- 如果访问首页，则自动跳转至blog
		this.props.routes.length==1 && browserHistory.replace('/blog')
	}
	//-- 初始
	componentDidMount(){}
	//-- 更新
	componentDidUpdate(){}
	//-- 移除
	componentWillUnmount(){}
	render(){
		return (
			<div>
				{this.props.children}
			</div>
		)
	}
}
//-- 路由分发
class HomeRoute extends React.Component {
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
		const { mod } = this.props.params
		const Mod = {
			login	: (<LoginPage {...this.props}/>),
			dashboard: (<DashboardPage {...this.props}/>),
			blog: (<BlogPage {...this.props}/>),
		}
		return (Mod[mod] || <NofoundPage />)
	}
}

export { AppRoute, HomeRoute }