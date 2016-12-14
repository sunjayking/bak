/*
*	Tab 组件
*/
import React from 'react'
import ClassName from 'classnames'
import './style/main.less'

class Tab extends React.Component {
	constructor(props) {
		super(props)
		this.state={
			token : ''
		}
	}
	tab(token,func){
		this.setState({token:token})
		func(token)
	}
	render(){
		const { list=[],func, right } = this.props
		let conlist = list.map((val,i)=>{
			let classActive = ClassName({
				'active' : this.state.token ? this.state.token == val.token : i ==0
			})
			return (
				<li key={i} className={classActive}>
					<a onClick={()=>{this.tab(val.token,func||function(){})}}>{val.name}</a>
				</li>
			)
		})
		let rightcon = right
			? (
				<a onClick={right.func} className='king-tab-right'>{right.name}</a>
			)
			: null
		return (
			<ul className='king-tab'>
				{conlist}
				{rightcon}
			</ul>
		)
	}
}


export {
	Tab,
}