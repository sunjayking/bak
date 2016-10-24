import { Store, _, DOM } from 'sun-king'
import State from '../driver/state'
import { GET } from '../driver/api'
import { GO } from '../driver/utils'

const Action = {}

//-- 初始化app
Action.init = (callback)=>{
	callback()
	// //-- 获取是否有session
	// GET({
		// url : 'session',
		// success : (res)=>{
			// console.log('success')
			// //-- 存入缓存
			// Store.set('session',res)
			// //-- 开始渲染页面
			// callback()
		// },
		// error : (err)=>{
			// console.log('未登录')
			// GO('/login')
			// callback()
		// }
	// })
}




export default Action