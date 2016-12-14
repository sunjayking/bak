/*
*	Img 组件
*/
import React from 'react'
class Img extends React.Component {
	constructor(props) {
		super(props)
	}
	render(){
		const { src, alt } = this.props
		let defSrc = src || 'http://asset.sunjay.cn/img/web/sunjay_logo.png'
		let defAlt = alt || 'sunjay,生活美学,H5'
		return (
			<img src={defSrc} alt={defAlt} />
		)
	}
}

export {
	Img
}