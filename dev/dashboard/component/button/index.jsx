/*
*	Button 组件
*/
import React from 'react'
import ClassName from 'classnames'
import { _ } from 'sun-king'
import './style/main.less'

class Button extends React.Component {
	constructor(props) {
		super(props)
		this.state={
			status : 'init'
		}
	}
	done(){
		this.props.activeName && this.setState({status:'done'})
	}
	fail(){
		this.setState({status:'init'})
	}
	click(){
		if(this.state.status == 'init'){
			this.props.activeName && this.setState({status:'active'})
			this.props.onClick((type)=>{
				if(type){
					this.done()
				}else{
					this.fail()
				}
			})
		}
	}
	render(){
		const { name, onClick, activeName, doneName, type } = this.props
		let btnName
		switch(this.state.status){
			case 'active' :
				btnName = activeName || name || 'Fine>'
				break;
			case 'done' : 
				btnName = doneName || name || 'Fine>'
				break;
			case 'init' :
				btnName = name || 'Fine>'
				break;
		}
		let btnClass = ClassName({
			'king-button' : true,
			'king-button-hover' : this.state.status != 'active',
			'animated infinite flash' : this.state.status == 'active',
			'primary' : type == 'primary',
			'default' : !type || type == 'default',
		})
		return (
			<a className={btnClass} onClick={()=>{this.click()}}>{btnName}</a>
		)
	}
}


export {
	Button,
}