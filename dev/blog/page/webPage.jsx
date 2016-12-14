import React from 'react'
import { ArticlePage } from './articlePage'

//-- 控制台
class WebPage extends React.Component {
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
		return (
			<ArticlePage {...this.props}/>
		)
	}
}

export { WebPage }