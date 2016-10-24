const [ State, state ] = [{},{}]
//-- 初始化
State.init = (self, name) => {
	state[name] = {
		fn : self,
		refresh : 0
	}
	return {
		refresh : state[name].refresh
	}
}

//-- 更新
State.refresh = (name) => {
	const { fn, refresh} = state[name]
	fn && fn.setState({refresh:refresh+1})
}

//-- 移除
State.remove = (name) => {
	state[name] = {}
}

export default State