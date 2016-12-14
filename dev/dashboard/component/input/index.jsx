/*
*	Input 组件
*/
import React from 'react'
import ClassName from 'classnames'
import './style/main.less'
import {DOM} from 'sun-king'
import {Tip} from '../'
import { POST } from '../../driver/api'
import './editor/ueditor.config.js'
import './editor/ueditor.js'
import './editor/zh-cn.js'

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
		let content = length
			? (<input className={inputClass} placeholder={tip} maxLength={length} type={type} name={name} defaultValue={value} />)
			: <input className={inputClass} placeholder={tip} type={type} name={name} defaultValue={value} />
		return (
			<div className='king-input-box'>
				<label className='king-input-label'>{ignoreBox}{label} :</label>
				{content}
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

class Select extends React.Component {
	constructor(props) {
		super(props)
	}
	render(){
		const { label, options, def, name, warn, ignore, size } = this.props
		let warnClass = ClassName({
			'king-input-warn' : true,
			'hide' : !warn,
		})
		let inputClass = ClassName({
			'king-select' : true,
			'large' : size == 'large',
			'normal' : !size || size == 'normal'
		})
		let ignoreBox = ignore
			? null
			: (<b>*</b>)
		let option = options.map((val,i)=>{
			return (<option key={i} value={val.value}>{val.name}</option>)
		})
		return (
			<div className='king-input-box'>
				<label className='king-input-label'>{ignoreBox}{label} :</label>
				<select defaultValue={def} className={inputClass} name={name}>
					{option}
				</select>
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
				console.log('aaa')
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

class Editor extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
		}
	}
	//-- 初始
	componentDidMount(){
		let value = this.props.value
        let editor = UE.getEditor('editor',{
			initialFrameHeight : 500,
			initialContent:value
		})
		window.editor = this.editor = editor
	}
	//-- 更新
	componentDidUpdate(){}
	//-- 移除
	componentWillUnmount(){
		this.editor.destroy()
	}
	render(){
		const { label, name, ignore, value } = this.props
		let ignoreBox = ignore
			? null
			: (<b>*</b>)
		return (
			<div className='king-input-editorwarp'>
				<label className='king-input-label'>{ignoreBox}{label} :</label>
				<div className='king-input-editor'>
					<script id="editor" name="content" type="text/plain"></script>
				</div>
			</div>
		)
	}
}

export {
	Input,
	Select,
	Textarea,
	Upimg,
	Editor,
}