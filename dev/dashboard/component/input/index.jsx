/*
*	Input 组件
*/
import React from 'react'
import ClassName from 'classnames'
import { _ } from 'sun-king'
import './style/main.less'

class Input extends React.Component {
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
			<div>
				<label className='king-input-label'>{label}</label>
				<input className='king-input' placeholder={tip} maxLength={length} type={type} name={name} />
				<p className='king-input-warn'>{warn}</p>
			</div>
		)
	}
}

export {
	Input,
}