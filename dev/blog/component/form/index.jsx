/*
*	Form 组件
*/
import React from 'react'
import ClassName from 'classnames'
import './style/main.less'

class Form extends React.Component {
	constructor(props) {
		super(props)
	}
	render(){
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