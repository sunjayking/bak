import React from 'react'
import { Img } from '../component'
import './style/warning.less'

//-- 提示的单页
class WarningMod extends React.Component {
	constructor(props) {
		super(props)
	}
	render(){
		const { title, content, link, linkName} = this.props
		return (
			<div className='sj-nofound'>
				<Img src='http://asset.sunjay.cn/img/web/sunjay_logo_word.png' />
				<h2>{title}</h2>
				<h3>{content}</h3>
				<a href={link} dangerouslySetInnerHTML={{__html:linkName}}></a>
			</div>
		)
	}
}

export { WarningMod }