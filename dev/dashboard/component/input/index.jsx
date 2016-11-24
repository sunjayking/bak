/*
*	Input 组件
*/
import React from 'react'
import ClassName from 'classnames'
import './style/main.less'
import {DOM} from 'sun-king'
import {Tip} from '../'
import { POST } from '../../driver/api'

class Input extends React.Component {
	constructor(props) {
		super(props)
	}
	render(){
		const { label, tip, length, type, name, warn, ignore, size, value } = this.props
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
				<input className={inputClass} placeholder={tip} maxLength={length} type={type} name={name} defaultValue={value} />
				<p className={warnClass}>{warn}</p>
			</div>
		)
	}
}

class Textarea extends React.Component {
	constructor(props) {
		super(props)
	}
	render(){
		const { label, tip, length, name, warn, ignore, value } = this.props
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
				<textarea className='king-textarea' placeholder={tip} maxLength={length} name={name} defaultValue={value} ></textarea>
				<p className={warnClass}>{warn}</p>
			</div>
		)
	}
}

class Upimg extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			upimg : this.props.value
		}
	}
	//-- 初始
	componentDidMount(){
	}
	//-- 更新
	componentDidUpdate(){}
	//-- 移除
	componentWillUnmount(){}
	upimg(name){
		DOM.getName(name).click()
	}
	change(name){
		let self = this
		//-- 设置图片大小上限
		const maxsize = 1024 * 1024 * 2
		let inputfile = DOM.getName(name)
		let file = inputfile.files[0]
		//-- 限制图片大小
		if(file.size > maxsize){
			Tip('图片大小不可超过2M')
			return
		}
		POST({
			url : 'image',
			data : file,
			contentType : 'multipart/form-data',
			success : (res)=>{
				inputfile.files[0].filename = res.filename
				self.setState({upimg:res.filename})
			},
			error : (res)=>{
				console.log(res)
			}
		})
	}
	render(){
		const { label, tip, name, ignore, width, height, bgimg, value } = this.props
		let ignoreBox = ignore
			? null
			: (<b>*</b>)
		
		let styleBox = {
			'width' : width + 'px',
			'height' : height + 'px',
			'backgroundImage' : 'url('+ (!!this.state.upimg ? '/uploads/'+this.state.upimg : bgimg ) +')'
		}
		return (
			<div className='king-input-box'>
				<label className='king-input-label'>{ignoreBox}{label} :</label>
				<div className='king-upimg-box' style={styleBox}>
					<div className='king-upimg-img' onClick={()=>{this.upimg(name)}}></div>
						<form enctype='multipart/form-data' method='POST' name={'form'+name}>
							<input type='file' name={name} accept='image/jpeg,image/gif,image/png' data-filename={value} onChange={()=>{this.change(name)}} />
						</form>
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