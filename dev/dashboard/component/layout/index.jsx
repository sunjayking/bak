/*
*	Layout 组件
*/
import React from 'react'
import ClassName from 'classnames'
import './style/main.less'

class Row extends React.Component {
	constructor(props) {
		super(props)
	}
	render(){
		return (
			<div className='king-row'>
				{this.props.children}
			</div>
		)
	}
}


class Col extends React.Component {
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
		const { span, xs, sm, md, lg } = this.props
		let classCol = ClassName(
			'king-col',
			'king-col-' + span,
			'king-col-xs-' + xs,
			'king-col-sm-' + sm,
			'king-col-md-' + md,
			'king-col-lg-' + lg,
		)
		return (
			<div className={classCol} >
				{this.props.children}
			</div>
		)
	}
}

export {
	Row,
	Col
}