<?php
	class loginModel extends Virgin{
		//-- 用户登录
		public function login($data){
			(!isset($data['_key']) || !$data['_key']) && self::fail(40001,'_key为空');
			$key = $data['_key'];
			$row = self::db()->fetch('s_admin','*',"_key='$key'");
			if(!$row){
				self::fail404(40000,'key不正确，请输入正确的key！');
			}else{
				$info = $row;
				$res = self::JSON(compact('info'));
				//-- 存Session
				$token = self::md6(SUNJAY);
				$_SESSION['admin']	= Array('info'=>$info,'token'=>$token);
				exit($res);
			}
		}
	}