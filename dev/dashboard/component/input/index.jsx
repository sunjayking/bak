/*
*	Input 组件
*/
import React from 'react'
import ClassName from 'classnames'
import { _ } from 'sun-king'
import './style/main.less'

class Input extends React.Component {
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
		const { label, tip, length, type, name, warn, ignore, size } = this.props
		let warnClass = ClassName({
			'king-input-warn' : true,
			'hide' : !warn,
		})
		let inputClass = ClassName({
			'king-input' : true,
			'large' : size == 'large',
			'normal' : !size || size == 'normal'
		})
		let ignoreBox = ignore
			? null
			: (<b>*</b>)
		return (
			<div className='king-input-box'>
				<label className='king-input-label'>{ignoreBox}{label} :</label>
				<input className={inputClass} placeholder={tip} maxLength={length} type={type} name={name} />
				<p className={warnClass}>{warn}</p>
			</div>
		)
	}
}

class Textarea extends React.Component {
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
		const { label, tip, length, type, name, warn, ignore } = this.props
		let warnClass = ClassName({
			'king-input-warn' : true,
			'hide' : !warn,
		})
		let ignoreBox = ignore
			? null
			: (<b>*</b>)
		return (
			<div className='king-input-box'>
				<label className='king-input-label'>{ignoreBox}{label} :</label>
				<textarea className='king-textarea' placeholder={tip} maxLength={length} name={name} ></textarea>
				<p className={warnClass}>{warn}</p>
			</div>
		)
	}
}

class Upimg extends React.Component {
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
		const { label, tip, name, ignore, width, height } = this.props
		let ignoreBox = ignore
			? null
			: (<b>*</b>)
		
		let styleBox = {
			'width' : width + 'px',
			'height' : height + 'px',
		}
		return (
			<div className='king-input-box'>
				<label className='king-input-label'>{ignoreBox}{label} :</label>
				<div className='king-upimg-box' style={styleBox}>
					<div></div>
				</div>
				<p className='king-upimg-tip'>{tip}</p>
			</div>
		)
	}
}

export {
	Input,
	Textarea,
	Upimg,
}