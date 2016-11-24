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