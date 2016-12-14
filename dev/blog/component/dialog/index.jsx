/*
*	Input 组件
*/
import React from 'react'
import ReactDOM		from 'react-dom'
import ClassName from 'classnames'
import { _, DOM } from 'sun-king'
import './style/main.less'

//-- 提示框组件
class Tipbox extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			hide : false
		}
	}
	//-- 初始
	componentDidMount(){
		let self = this
		setTimeout(()=>{
			self.setState({hide:true})
		},this.props.time)
	}
	render(){
		const { con } = this.props
		let classTip = ClassName({
			'animated sun-tips' : true,
			'bounceIn' : !this.state.hide,
			'fadeOut' : this.state.hide
		})
		return (
			<div className={classTip}>
				{con}
			</div>
		)
	}
}

//--Dialogbox
class Dialogbox extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			hide : false
		}
	}
	ok(func){
		this.setState({hide:true})
		setTimeout(()=>{
			DOM.removeBody(this.props.dom)
		},100)
		func()
	}
	cancel(func){
		this.setState({hide:true})
		setTimeout(()=>{
			DOM.removeBody(this.props.dom)
		},100)
		func()
	}
	render(){
		const { con, ok, cancel, doub } = this.props
		let classBg = ClassName({
			'sun-dialog' : true,
			'animatedfaster fadeOut' : this.state.hide
		})
		let classBox = ClassName({
			'sun-dialog-box' : true,
			'animatedfast zoomIn' : !this.state.hide,
			'animatedfaster zoomOut' : this.state.hide,
		})
		
		let domOk = {
			name : ok.name || '好的',
			func : ok.func || function(){}
		}
		
		let domCancel = {
			name : cancel.name || '取消',
			func : cancel.func || function(){}
		}
		
		let styleCancel = !doub ? {'display' : 'none'} : {}
		return (
			<div className={classBg}>
				<div className={classBox}>
					<p>
						{con}
					</p>
					<ol>
						<li style={styleCancel}>
							<a onClick={()=>{this.cancel(domCancel.func)}}>{domCancel.name}</a>
						</li>
						<li>
							<a onClick={()=>{this.ok(domOk.func)}}>{domOk.name}</a>
						</li>
					</ol>
				</div>
			</div>
		)
	}
}

//-- 简单的tip提示
let Tip = (txt,time=2000)=>{
	let tipbox = DOM.create();
	ReactDOM.render(<Tipbox con={txt} time={time}/>,tipbox)
	DOM.addBody(tipbox)
	setTimeout(()=>{
		DOM.removeBody(tipbox)
	},time+1000)
}

//-- 简单的tip提示
let Dialog = (first,second)=>{
	let doub = !!second
		? _.hasProp(second,'ok')
			? true
			: false
		: false
	let ok = !!second
		? _.hasProp(second,'ok')
			? {
				name : second.ok.name,
				func : second.ok.func
			}
			: {
				name : second.name,
				func : second.func
			}
		: {}
	let cancel = !!second
		? _.hasProp(second,'cancel')
			? {
				name : second.cancel.name,
				func : second.cancel.func
			}
			: {}
		: {}
	
	let dialogbox = DOM.create();
	DOM.addBody(dialogbox)
	ReactDOM.render(<Dialogbox
		con={first || '没有提示内容哦！'}
		ok={ok}
		doub={doub}
		cancel={cancel}
		dom={dialogbox}
	/>,dialogbox)
}

export {
	Dialog,
	Tip,
}