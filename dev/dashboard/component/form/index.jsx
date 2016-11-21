/*
*	Form 组件
*/
import React from 'react'
import ClassName from 'classnames'
import { _ } from 'sun-king'
import './style/main.less'

class Form extends React.Component {
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
		const { label, tip, length, type, name, warn } = this.props
		return (
			<div className='king-form-box'>
				{this.props.children}
			</div>
		)
	}
}

export {
	Form,
}