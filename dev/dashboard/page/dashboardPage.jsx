import React from 'react'
import { HomeMod } from '../module/homeMod'

//-- 控制台
class DashboardPage extends React.Component {
	constructor(props) {
		super(props)
	}
	//-- 初始
	componentDidMount(){
		// DOM.setAttr(DOM.getTag('body'),'style','height:100%')
	}
	//-- 更新
	componentDidUpdate(){}
	//-- 移除
	componentWillUnmount(){}
	render(){
		//-- 定义slogan
		let slogan = '游荡的Freelancer'
		//-- 定义左边导航
		let navList = [
			{ url:'/blog', name:'Blog', active:true},
			{ url:'/blog', name:'H5定制'},
			{ url:'/blog', name:'WEB定制'},
			{ url:'/blog', name:'罗曼笔记',outside:true},
		]
		//-- 定义右边客户名称
		let customer = ''
		// let customer = 'litter freddie'
		//-- 定义右边文章List
		// let linkList = null
		let linkList = [
			{url:'/s',name:'渡过生存期，才有资格谈梦想'},
			{url:'/s',name:'拿什么来拯救你，我的爱人'},
			{url:'/s',name:'原来爱情是这个样子的，蒙巴纳斯的吉吉回忆录',ouside:true},
			{url:'/s',name:'读书|尘埃落定，梦遗一场，只留下满裤裆的诗',ouside:true},
		]
		
		let artlist = [
			{ title:'读书|尘埃落定：如何去拯救一个满眼苍茫的傻子？', time:'2016年10月23日 22:00', url:'/sss', cover:'https://piccdn.luojilab.com/store-pc/image/201610/1476880191506.jpg', summary:'记得前几年有位朋友家的孩子来找我聊聊。他刚上高二，成绩颇不理想。看了他的考卷，我其实也没啥具体建议的。只是跟他说了两点：1. 对他最重要的是两年后的那次考试，之前的都毫无意义。2. 他唯一的限制就是时间有限。', qrimg:'http://img.romanote.com/web/qrcode.jpg'},
			{ title:'读书|尘埃落定：如何去拯救一个满眼苍茫的傻子？', time:'2016年10月23日 22:00', url:'/sss', cover:'https://piccdn.luojilab.com/store-pc/image/201610/1476880191506.jpg', summary:'记得前几年有位朋友家的孩子来找我聊聊。他刚上高二，成绩颇不理想。看了他的考卷，我其实也没啥具体建议的。只是跟他说了两点：1. 对他最重要的是两年后的那次考试，之前的都毫无意义。2. 他唯一的限制就是时间有限。', qrimg:'http://img.romanote.com/web/qrcode.jpg'},
			{ title:'读书|尘埃落定：如何去拯救一个满眼苍茫的傻子？', time:'2016年10月23日 22:00', url:'/sss', cover:'https://piccdn.luojilab.com/store-pc/image/201610/1476880191506.jpg', summary:'记得前几年有位朋友家的孩子来找我聊聊。他刚上高二，成绩颇不理想。看了他的考卷，我其实也没啥具体建议的。只是跟他说了两点：1. 对他最重要的是两年后的那次考试，之前的都毫无意义。2. 他唯一的限制就是时间有限。', qrimg:'http://img.romanote.com/web/qrcode.jpg'},
		]
		return (
			<HomeMod
				slogan={slogan}
				navList={navList}
				customer={customer}
				linkList={linkList}
				artlist={artlist}
			/>
		)
	}
}


export { DashboardPage }