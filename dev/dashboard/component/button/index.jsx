/*
*	Button 组件
*/
import React from 'react'
import ClassName from 'classnames'
import { _ } from 'sun-king'
import './style/main.less'

class Button extends React.Component {
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
		const { name } = this.props
		return (
			<a className='king-button'>{name || 'Fine>'}</a>
		)
	}
}


export {
	Button,
}