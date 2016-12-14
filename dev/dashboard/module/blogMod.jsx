import React from 'react'
import { ArticlelistMod } from './articleMod'
import './style/form.less'


//-- Blog 模块
class BlogMod extends React.Component {
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
		return (<ArticlelistMod {...this.props} />)
	}
}

export {
	BlogMod
}