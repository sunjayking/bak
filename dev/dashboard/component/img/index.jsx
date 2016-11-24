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
		let defSrc = src || 'http://img.romanote.com/web/romanote_logo.png'
		let defAlt = alt || 'romanote,sunjay,罗曼笔记,生活美学'
		return (
			<img src={defSrc} alt={defAlt} />
		)
	}
}

export {
	Img
}