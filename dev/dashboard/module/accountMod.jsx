import React from 'react'
import { Row, Col, Img, Input, Button, Form, Dialog, Tip, Tab, Table } from '../component'
import { Link } from 'react-router'
import { GET } from '../driver/api'
import { Store } from 'sun-king'
import { GO } from '../driver/utils'
import './style/home.less'


//-- 账户管理 模块
class AccountMod extends React.Component {
	constructor(props) {
		super(props)
	}
	//-- 初始
	componentDidMount(){
		//-- 获取账号列表
		GET({
			url : 'admin',
			success : (res)=>{
				console.log(res)
				// this.info = res.admin.info
				// this.setState({status:'logined'})
				// setTimeout(()=>{
					// GO('/dashboard/'+res.admin.info.ename)
				// },2000)
			},
			error : (res)=>{
				console.log(res)
				// this.setState({status:'unlogin'})
			}
		})
	}
	//-- 更新
	componentDidUpdate(){}
	//-- 移除
	componentWillUnmount(){}
	render(){
		//-- 定义tab列表
		let tabList = [
			{name:'有效账户',token:'vaild'},
			{name:'禁用账户',token:'invaild'},
		]
		//-- 定义tab事件
		let tabFunc = (token)=>{
			console.log(token)
		}
		//-- 定义tab特殊事件
		let tabRight = {
			name : '+新增账户',
			func : function(){
				alert('add account')
			}
		}
		
		//-- 定义table表头
		let tableHead = [
			'名称',
			'简称',
			'Key',
			'操作',
		]
		//-- 定义table列表
		let tableContent = [
			// [
				// '孙文',
				// 'sunjay',
				// 'sunjayking798',
				// [
					// {name :'权限',func:function(){alert('right')}},
					// {name :'编辑',func:function(){alert('edit')}},
				// ]
			// ],
			// [
				// '孙文',
				// 'sunjay',
				// 'sunjayking798',
				// [
					// {name :'权限',func:function(){alert('right')}},
					// {name :'编辑',func:function(){alert('edit')}},
				// ]
			// ],
		]
		return (
			<div className='sj-home-conbox'>
				<div className='sj-home-title'>
					<h1>账户管理</h1>
					<h2>管理所有sunjay后台的管理员账号</h2>
				</div>
				<div className='sj-home-content'>
					<Tab list={tabList} func={tabFunc} right={tabRight}/>
					<Table headList={tableHead} conList={tableContent} />
				</div>
			</div>
		)
	}
}

export {
	AccountMod
}