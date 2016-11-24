<?php
	class check extends Virgin {
		// //-- 基础 是否为email
		// private function is_email($email){
			// return strlen($email) > 6 && preg_match("/^[\w\-\.]+@[\w\-]+(\.\w+)+$/", $email);
		// }
		// //-- 检查email
		// public function email($email){
			// !self::is_email($email) && self::error(10002,'email格式不正确');
		// }
		
		// public function isNum($value){
			// return preg_match('/^\d*$/',$value);
		// }
		
		// public function num($value,$name){
			// !preg_match('/^\d*$/',$value) && self::error(10011,$name);
		// }
		
		// //-- 检查状态
		// public function status($value){
			// if(strlen($value)!=1 || !self::isNum($value)){
				// self::error(10009,'状态不合法');
			// }
		// }
		
		// //-- 检查字符长度
		// public function strings($value,$mode,$name){
			// preg_match_all('/./us', $value, $match);
			// $len = count($match[0]);
			// $mode = explode(',',$mode);
			// if($len < ($mode[0]*1) || $len > ($mode[1]*1)){
				// self::error(10004,$name);
			// }
		// }
		
		//-- 检查是否有权限
		public function right($right){
			if(!isset($_SESSION["admin"])){
				self::fail(40000,'无权限操作');
			}
			if(!isset($_SESSION["admin"]['token'])){
				self::fail(40000,'无权限操作');
			}
			if($_SESSION["admin"]['token'] != self::md6(SUNJAY)){
				self::fail(40000,'无权限操作');
			}
			if($_SESSION["admin"]['info']['name']!='sunjay'){
				self::fail(40000,'无权限操作');
			}
			// if(!isset($_SESSION["admin"]['right'])){
				// self::fail(40000,'无权限操作');
			// }
			// $rightArr = $_SESSION["admin"]['right'];
			// foreach($rightArr as $key => $val){
				// !in_array($right, $val) && self::fail(40000,'无权限操作');
			// }
		}
		//-- 检查是否登录
		public function login(){
			if(!isset($_SESSION["admin"])){
				self::fail(40000,'无权限操作');
			}
			if(!isset($_SESSION["admin"]['token'])){
				self::fail(40000,'无权限操作');
			}
			if($_SESSION["admin"]['token'] != self::md6(SUNJAY)){
				self::fail(40000,'无权限操作');
			}
		}
		
		// //-- 检查key
		// public function hasKey($key){
			// $key != self::md6(SUNJAY) && self::error(10101,'非法key');
		// }
		
		//-- 检查必填项
		public function isEmpty($data,$array){
			foreach($array as $key => $v){
				!isset($data->$v) && self::fail404(40001,$v.'为空');
				$data->$v == '' && self::fail404(40001,$v.'为空');
			}
		}
	}