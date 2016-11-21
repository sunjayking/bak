import React from 'react'
import { Img } from '../component'
import { Link } from 'react-router'
import './style/warning.less'

//-- 提示的单页
class WarningMod extends React.Component {
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
		const { title, content, link, linkName} = this.props
		return (
			<div className='sj-nofound'>
				<Img src='http://img.romanote.com/web/sunjay_logo_word.png' />
				<h2>{title}</h2>
				<h3>{content}</h3>
				<a href={link} dangerouslySetInnerHTML={{__html:linkName}}></a>
			</div>
		)
	}
}

export { WarningMod }