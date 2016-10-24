import React from 'react'
import ReactDOM		from 'react-dom'
import { DOM } from 'sun-king'
import Action		from './driver/action'
import { Router, Route, browserHistory } from 'react-router'
import './less/init.less'

//-- 引入路由
import { AppRoute, HomeRoute } from './driver/route'

//-- 路由规则
const routes = (
	<Route path="/" component={AppRoute}>
		<Route path="/:mod"				component={HomeRoute} />
		<Route path="/:mod/:mid"			component={HomeRoute} />
		<Route path="/:mod/:mid/:id"	component={HomeRoute} />
		<Route path="/:mod/:mid/:id/:cid"	component={HomeRoute} />
	</Route>
)
//-- 初始化
setTimeout(()=>{
	Action.init(()=>{
		//-- 开启路由分发
		ReactDOM.render((
			<Router history={browserHistory} routes = {routes}></Router>
		), DOM.get('king-content'))
	})	
},1000)
// //-- 初始化
// setTimeout(()=>{
	// Action.init(()=>{
		// //-- 开启路由分发
		// ReactDOM.render((
			// <Router history={browserHistory} routes = {routes}></Router>
		// ), DOM.get('king-content'))
	// })	
// },1000)