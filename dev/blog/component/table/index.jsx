/*
*	Table 组件
*/
import React from 'react'
import ClassName from 'classnames'
import { _ } from 'sun-king'
import './style/main.less'

class Table extends React.Component {
	constructor(props) {
		super(props)
		this.state={
			token : ''
		}
	}
	render(){
		const { headList=[], conList=[] } = this.props
		let head = headList.map((val,i)=>{
			return (
				<th key={i}>{val}</th>
			)
		})
		let content = null
		if(conList.length>0){
			content = conList.map((val,i)=>{
				let child = val.map((value,j)=>{
					let handle
					if(_.isArray(value)){
						handle = value.map((v,k)=>{
							return (
								<a onClick={v.func} key={k}>{v.name}</a>
							)
						})
					}else{
						handle = value
					}
					return (
							<td key={j}>{handle}</td>
						)
				})
				return (
					<tr key={i}>
						{child}
					</tr>
				)
			})
		}else{
			content = (
				<tr>
					<td colSpan={headList.length} className='king-table-empty'>暂无数据</td>
				</tr>
			)
		}
		return (
			<table className='king-table' cellSpacing="0">
				<thead>
					<tr>
						{head}
					</tr>
				</thead>
				<tbody>
					{content}
				</tbody>
			</table>
		)
	}
}


export {
	Table,
}