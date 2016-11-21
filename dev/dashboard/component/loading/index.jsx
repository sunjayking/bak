/*
*	Loading 组件
*/
import React from 'react'
import ClassName from 'classnames'
import './style/main.less'

class Loading extends React.Component {
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
		const { con } = this.props
		return (
			<p className='king-loading animated flash infinite'>
				{ con || 'wait a second...'}
			</p>
		)
	}
}


export {
	Loading,
}