<?php
	class adminModel extends Virgin{
		//-- 查询管理员
		public function get($data){
			//-- 检查是否登录
			self::check()->login();
			//-- 检查是否有权限操作
			self::check()->right('getadmin');
			$pagenum	= isset($data['pagenum']) ? $data['pagenum'] : 20;
			$page		= isset($data['page']) ? $data['page'] : 1;
			$status		= isset($data['status']) ? $data['status'] : 1;
			if(isset($data['pagenum'])){
				unset($data['pagenum']);
			}
			if(isset($data['page'])){
				unset($data['page']);
			}
			
			$selectArr = array();
			foreach($data as $key => $val){
				array_push($selectArr,$key.'="'.$val.'"');
			}
			!isset($data['status']) && array_push($selectArr,'status='.$status);
			$select = implode(' and ',$selectArr);
			$term = $select." ORDER BY updatetime DESC limit ".($page-1)*$pagenum.",".$page*$pagenum;
			$row = self::db()->loop('s_admin',"*",$term);
			if(!$row){
				self::fail404();
			}else{
				$total 		= count($row);
				$data = $row;
				$res = self::JSON(compact('data','page','pagenum','total'));
				exit($res);
			}
		}
		//-- 新增管理员
		public function add($data){
			//-- 检查是否登录
			self::check()->login();
			//-- 检查是否有权限操作
			self::check()->right('addadmin');
			self::check()->isEmpty($data,Array('name','ename','_key'));
			$name = isset($data->name) ? $data->name : '';
			$addData = Array(
				"table" 		=> "s_admin",
				"name"			=> $name,
				"ename"			=> $data->ename,
				"_key"			=> $data->_key,
				"createtime"	=> time(),
				"updatetime"	=> time(),
			);
			$row = self::db()->add($addData);
			!$row && self::fail(40002,'数据新增失败');
		}
		//-- 更新管理员
		public function update($data){
			//-- 检查是否登录
			self::check()->login();
			//-- 检查是否有权限操作
			self::check()->right('upadmin');
			//-- 检查是否有id
			self::check()->isEmpty($data,Array('id'));
			//-- 配置数据表中字段
			$baseParams = Array('id','name','ename','_key','createtime','updatetime','status');
			$updateData = Array();
			foreach($data as $key => $val){
				in_array($key, $baseParams) && array_push($updateData, $key."='".$val."'");  
			}
			array_push($updateData,"updatetime=".time());
			$updateData = implode(',', $updateData);
			$id = $data->id;
			$row = self::db()->update('s_admin',$updateData,"id=".$id);
			!$row && self::fail(40003,'数据更新失败');
		}
		//-- 删除管理员
		public function delete($data){
			//-- 检查是否登录
			self::check()->login();
			//-- 检查是否有权限操作
			self::check()->right('deladmin');
			self::check()->isEmpty($data,Array('id'));
			$id = $data->id;
			$row = self::db()->update('s_admin',"status=0","id=".$id);
			!$row && self::fail(40004,'数据删除失败');
		}
	}